import { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient } from "graphql-request";
import { CommerceCollection } from "@/types";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

const shopifyClient = new GraphQLClient(
  `https://${domain}/api/${apiVersion}/graphql.json`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      "Content-Type": "application/json",
    },
  }
);

interface CollectionsResponse {
  collections: {
    edges: Array<{
      node: CommerceCollection;
    }>;
  };
}

interface MinimalCollectionsResponse {
  collections: {
    edges: Array<{
      node: {
        id: string;
        handle: string;
      };
    }>;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!domain || !storefrontAccessToken || !apiVersion) {
    return res
      .status(500)
      .json({ message: "Missing required Shopify environment variables" });
  }

  const minimal = req.query.minimal === "true";

  const minimalQuery = `
    query GetAllCollections {
      collections(first: 250) {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `;

  const fullQuery = `
    query GetAllCollections {
      collections(first: 250) {
        edges {
          node {
            id
            title
            description
            handle
            image {
              id
              url
              altText
              width
              height
            }
            metafields(
              identifiers: [
                {namespace: "custom", key: "location"},
                {namespace: "custom", key: "startDate"},
                {namespace: "custom", key: "startTime"},
                {namespace: "custom", key: "endTime"},
                {namespace: "custom", key: "endDate"},
                {namespace: "custom", key: "testimonials"},
                {namespace: "custom", key: "multicolumn1"},
                {namespace: "custom", key: "price"},
                {namespace: "custom", key: "capacity"},
                {namespace: "custom", key: "instructor"},
                {namespace: "custom", key: "difficulty"},
                {namespace: "custom", key: "duration"},
                {namespace: "custom", key: "requirements"},
                {namespace: "custom", key: "benefits"},
                {namespace: "custom", key: "tags"},
                {namespace: "custom", key: "featured"},
                {namespace: "custom", key: "categoryType"}
              ]
            ) {
              id
              key
              namespace
              value
              type
              description
              createdAt
              updatedAt
              reference {
                ... on Metaobject {
                  handle
                  type
                  fields {
                    key
                    value
                    type
                  }
                }
              }
            }
            products(first: 250, sortKey: BEST_SELLING, reverse: true) {
              edges {
                node {
                  id
                  title
                  handle
                  publishedAt
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        id
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    if (minimal) {
      const response =
        await shopifyClient.request<MinimalCollectionsResponse>(minimalQuery);
      const collections = response.collections.edges.map(({ node }) => node);
      return res.status(200).json(collections);
    } else {
      const response =
        await shopifyClient.request<CollectionsResponse>(fullQuery);
      // Filter out unpublished products from each collection
      const collections = response.collections.edges.map(({ node }) => {
        if (node.products?.edges) {
          node.products.edges = node.products.edges.filter(
            (edge) => edge.node.publishedAt != null
          );
        }
        return node;
      });
      return res.status(200).json(collections);
    }
  } catch (error) {
    console.error("Error fetching collections:", error);
    return res.status(500).json({ message: "Error fetching collections" });
  }
}
