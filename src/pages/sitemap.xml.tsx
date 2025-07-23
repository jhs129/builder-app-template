import type { GetServerSideProps } from "next";
import { builder } from "@builder.io/react";
import { getCollectionByHandle } from "@/lib/shopify";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (!res) {
    return { props: {} };
  }

  // Add cache headers for better performance
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  const locale = "en_US";
  let pages: any[] = [];
  let posts: any[] = [];
  let collections: any[] = [];

  try {
    // Get data from all sources in parallel with error handling
    const results = await Promise.allSettled([
      // Get pages from Builder.io
      builder.getAll("page", {
        locale: locale,
        fields: "data.url,lastUpdated",
        options: { noTargeting: true },
      }),
      // Get blog posts from Builder.io
      builder.getAll("article", {
        locale: locale,
        fields: "data.handle,lastUpdated",
        options: { noTargeting: true },
      }),
      // Get collection models from Builder.io
      builder.getAll("collection", {
        locale: locale,
        fields: "data.handle,lastUpdated",
        options: { noTargeting: true },
      }),
    ]);

    // Extract results, using empty arrays as fallbacks
    pages = results[0].status === 'fulfilled' ? results[0].value || [] : [];
    posts = results[1].status === 'fulfilled' ? results[1].value || [] : [];
    collections = results[2].status === 'fulfilled' ? results[2].value || [] : [];

    // Log any failures for debugging
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const sources = ['Builder.io pages', 'Builder.io articles', 'Builder.io collections'];
        console.error(`Failed to fetch ${sources[index]}:`, result.reason);
      }
    });
  } catch (error) {
    console.error('Unexpected error in sitemap generation:', error);
    // Continue with empty arrays - better to have a partial sitemap than none
  }

  // Fetch Shopify collection data and extract products with their dates
  const allProducts: Array<{ handle: string; updatedAt?: string; publishedAt?: string }> = [];
  const collectionHandles: string[] = [];

  try {
    // Get Shopify collections and their products
    const collectionPromises = collections
      .filter((collection) => collection?.data?.handle)
      .map(async (collection) => {
        try {
          const shopifyCollection = await getCollectionByHandle(collection.data.handle);
          return {
            handle: collection.data.handle,
            products: shopifyCollection?.products?.edges || [],
          };
        } catch (error) {
          console.error(`Failed to fetch Shopify collection ${collection.data.handle}:`, error);
          return { handle: collection.data.handle, products: [] };
        }
      });

    const collectionResults = await Promise.allSettled(collectionPromises);
    
    collectionResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        // Add collection handle
        collectionHandles.push(result.value.handle);
        
        // Extract product data (handle + dates) from collection
        result.value.products.forEach((productEdge: any) => {
          const product = productEdge?.node;
          const productHandle = product?.handle;
          if (productHandle && !allProducts.some(p => p.handle === productHandle)) {
            allProducts.push({
              handle: productHandle,
              updatedAt: product?.updatedAt,
              publishedAt: product?.publishedAt,
            });
          }
        });
      }
    });
  } catch (error) {
    console.error('Error fetching collection data from Shopify:', error);
  }

  // Combine all URLs and filter out do-not-publish pages and 404
  const urls = [
    // Add pages (excluding do-not-publish and 404) with null checks
    ...(pages || [])
      .filter((page) => page?.data?.url && !page.data.url.includes('/do-not-publish/') && page.data.url !== '/404')
      .map((page) => ({
        url: page.data.url,
        lastUpdated: new Date(page.lastUpdated || Date.now())
          .toISOString()
          .split("T")[0],
      })),
    // Add main blog page
    { url: "blogs", lastUpdated: new Date().toISOString().split("T")[0] },
    // Add blog posts (excluding do-not-publish and empty handles)
    ...(posts || [])
      .filter((post) => post?.data?.handle && !post.data.handle.includes('do-not-publish'))
      .map((post) => ({
        url: `blogs/${post.data.handle}`,
        lastUpdated: new Date(post.lastUpdated || Date.now())
          .toISOString()
          .split("T")[0],
      })),
    // Add product pages (from collection products, using Shopify dates)
    ...(allProducts || [])
      .filter((product) => product.handle && product.handle.trim().length > 0)
      .map((product) => {
        // Use updatedAt if available, fallback to publishedAt, then current date
        const dateToUse = product.updatedAt || product.publishedAt || new Date().toISOString();
        return {
          url: `products/${product.handle}`,
          lastUpdated: new Date(dateToUse).toISOString().split("T")[0],
        };
      }),
    // Add collection pages (from Builder.io collections, filter out empty handles)
    ...(collectionHandles || [])
      .filter((handle) => handle && handle.trim().length > 0)
      .map((handle) => ({
        url: `collections/${handle}`,
        lastUpdated: new Date().toISOString().split("T")[0],
      })),
  ];

  const sitemap = generateSiteMap(urls);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

function generateSiteMap(urls: Array<{ url: string; lastUpdated: string }>) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "") ||
    "http://localhost:3000";

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  urls.forEach((path) => {
    const cleanUrl = path.url.replace(/^\/+/, "");
    xml += `  <url>\n`;
    xml += `    <loc>${base}/${cleanUrl}</loc>\n`;
    xml += `    <lastmod>${path.lastUpdated}</lastmod>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;
  return xml;
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}
