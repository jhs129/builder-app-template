import { GraphQLClient } from "graphql-request";
import {
  CommerceCollection,
  CommerceProduct,
  CommerceMetafield,
  CommerceMetaobject,
  CommerceMetaobjectField,
  CollectionMetafields,
  ProductMetafields,
  EnhancedCommerceMetafield,
  EnhancedCommerceCollection,
  EnhancedCommerceProduct,
  MetafieldValueType,
  ProductMetadata,
  ProductOffering,
  ProductStudentType,
  ProductRequirements,
  ProductLocation,
  ProductEventDetails,
  ProductEventDay,
  ProductAccounting,
  CollectionMetadata,
  CollectionLocation,
  CollectionEventDates,
  CollectionTestimonials,
  CollectionMultiColumn,
  CollectionInstructor,
  CollectionCourse,
} from "@/types";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

// Validate environment variables
if (!domain || !storefrontAccessToken || !apiVersion) {
  console.error(
    "Missing required Shopify environment variables:",
    !domain ? "NEXT_PUBLIC_SHOPIFY_DOMAIN" : "",
    !storefrontAccessToken ? "NEXT_PUBLIC_SHOPIFY_TOKEN" : "",
    !apiVersion ? "NEXT_PUBLIC_API_VERSION" : ""
  );
}

const shopifyClient = new GraphQLClient(
  `https://${domain}/api/${apiVersion}/graphql.json`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      "Content-Type": "application/json",
    },
  }
);

// Helper function to get the Shopify store URL
export const getShopifyDomain = () => {
  return `https://${domain}`;
};

interface CollectionResponse {
  collection: CommerceCollection;
}

interface CollectionsResponse {
  collections: {
    edges: Array<{
      node: {
        handle: string;
        publications?: {
          edges: Array<{
            node: {
              name: string;
              id: string;
              publishedAt: string;
            };
          }>;
        };
      };
    }>;
  };
}

interface ProductResponse {
  product: CommerceProduct;
}

interface ProductsResponse {
  products: {
    edges: Array<{
      node: {
        handle: string;
        status: "ACTIVE" | "ARCHIVED" | "DRAFT";
        publishedAt: string | null;
      };
    }>;
  };
}

interface CreateCheckoutResponse {
  checkoutCreate: {
    checkout: {
      webUrl: string;
    };
    checkoutUserErrors: Array<{
      code: string;
      field: string[];
      message: string;
    }>;
  };
}

// Common GraphQL fragments to reduce duplication
const IMAGE_FRAGMENT = `
  image {
    id
    url
    altText
    width
    height
  }
`;

const PRICE_RANGE_FRAGMENT = `
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
`;

const METAOBJECT_REFERENCE_FRAGMENT = `
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
`;

const COMMON_METAFIELDS_IDENTIFIERS = `
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
`;

const PRODUCT_SPECIFIC_METAFIELDS_IDENTIFIERS = `
  {namespace: "custom", key: "offering"},
  {namespace: "custom", key: "studenttype"},
  {namespace: "custom", key: "details"},
  {namespace: "custom", key: "hotel_booking_url"},
  {namespace: "custom", key: "city"},
  {namespace: "custom", key: "state"},
  {namespace: "custom", key: "accounting"}
`;

const METAFIELDS_FRAGMENT = `
  metafields(
    identifiers: [
      ${COMMON_METAFIELDS_IDENTIFIERS}
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
    ${METAOBJECT_REFERENCE_FRAGMENT}
  }
`;

const PRODUCT_METAFIELDS_FRAGMENT = `
  metafields(
    identifiers: [
      ${COMMON_METAFIELDS_IDENTIFIERS},
      ${PRODUCT_SPECIFIC_METAFIELDS_IDENTIFIERS}
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
    ${METAOBJECT_REFERENCE_FRAGMENT}
  }
`;

export const getCollectionByHandle = async (handle: string) => {
  if (!domain || !storefrontAccessToken || !apiVersion) {
    console.error("Missing required Shopify environment variables");
    return null;
  }

  const query = `
    query GetCollectionByHandle($handle: String!) {
      collection(handle: $handle) {
        id
        title
        description
        handle
        ${IMAGE_FRAGMENT}
        ${METAFIELDS_FRAGMENT}
        products(first: 250, sortKey: BEST_SELLING, reverse: true) {
          edges {
            node {
              id
              title
              handle
              publishedAt
              ${PRICE_RANGE_FRAGMENT}
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
              ${PRODUCT_METAFIELDS_FRAGMENT}
            }
          }
        }
      }
    }
  `;

  const variables = {
    handle,
  };

  try {
    const response = await shopifyClient.request<CollectionResponse>(
      query,
      variables
    );

    // Filter out unpublished products and add metadata
    if (response.collection?.products?.edges) {
      response.collection.products.edges =
        response.collection.products.edges.filter(
          (edge: { node: { publishedAt: string | null } }) =>
            edge.node.publishedAt != null
        );
      
      // Add parsed metadata to each product with error handling
      response.collection.products.edges.forEach((edge) => {
        if (edge.node.metafields) {
          try {
            edge.node.metadata = parseProductMetadata(edge.node.metafields);
          } catch (error) {
            console.warn(`Failed to parse metadata for product ${edge.node.id}:`, error);
            edge.node.metadata = {}; // Provide empty metadata as fallback
          }
        }
      });
    }

    // Add parsed metadata to the collection with error handling
    if (response.collection?.metafields) {
      try {
        response.collection.metadata = parseCollectionMetadata(response.collection.metafields);
      } catch (error) {
        console.warn(`Failed to parse metadata for collection ${response.collection.id}:`, error);
        response.collection.metadata = {}; // Provide empty metadata as fallback
      }
    }

    return response.collection;
  } catch (error) {
    console.error("Error fetching collection:", error);
    return null;
  }
};

export const getAllCollectionHandles = async () => {
  if (!domain || !storefrontAccessToken || !apiVersion) {
    console.error("Missing required Shopify environment variables");
    return [];
  }

  const query = `
    query GetAllCollections {
      collections(first: 250) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.request<CollectionsResponse>(query);
    return response.collections.edges.map((edge) => edge.node.handle);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
};

export const getProductByHandle = async (handle: string) => {
  if (!domain || !storefrontAccessToken || !apiVersion) {
    console.error("Missing required Shopify environment variables");
    return null;
  }

  const query = `
    query GetProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        handle
        publishedAt
        availableForSale
        images(first: 10) {
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
        ${PRODUCT_METAFIELDS_FRAGMENT}
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
              metafields(
                identifiers: [
                  {namespace: "custom", key: "variant_specific_field"},
                  {namespace: "custom", key: "size"},
                  {namespace: "custom", key: "color"},
                  {namespace: "custom", key: "material"}
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
            }
          }
        }
        options {
          id
          name
          values
        }
      }
    }
  `;

  const variables = {
    handle,
  };

  try {
    const response = await shopifyClient.request<ProductResponse>(
      query,
      variables
    );

    // Return null if the product is not published or not available
    if (!response.product?.publishedAt) {
      return null;
    }

    // Add parsed metadata to the product with error handling
    if (response.product.metafields) {
      try {
        response.product.metadata = parseProductMetadata(response.product.metafields);
      } catch (error) {
        console.warn(`Failed to parse metadata for product ${response.product.id}:`, error);
        response.product.metadata = {}; // Provide empty metadata as fallback
      }
    }

    return response.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const getAllProductHandles = async () => {
  if (!domain || !storefrontAccessToken || !apiVersion) {
    console.error("Missing required Shopify environment variables");
    return [];
  }

  const query = `
    query GetAllProducts {
      products(first: 250, sortKey: UPDATED_AT, reverse: true) {
        edges {
          node {
            handle
            publishedAt
            availableForSale
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.request<ProductsResponse>(query);
    // Filter to only return handles of published products
    return response.products.edges
      .filter((edge) => edge.node.publishedAt != null)
      .map((edge) => edge.node.handle);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const createCheckout = async (variantId: string) => {
  if (!domain || !storefrontAccessToken || !apiVersion) {
    console.error("Missing required Shopify environment variables");
    return null;
  }

  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems: [{ variantId, quantity: 1 }],
    },
  };

  try {
    const response = await shopifyClient.request<CreateCheckoutResponse>(
      mutation,
      variables
    );

    if (response.checkoutCreate.checkoutUserErrors.length > 0) {
      console.error(
        "Checkout errors:",
        response.checkoutCreate.checkoutUserErrors
      );
      return null;
    }

    return response.checkoutCreate.checkout.webUrl;
  } catch (error) {
    console.error("Error creating checkout:", error);
    return null;
  }
};

// Enhanced metafield parsing function that handles all types
export function parseMetafieldValue(metafield: CommerceMetafield): any {
  const { type, value } = metafield;
  
  try {
    switch (type as MetafieldValueType) {
      case 'number_integer':
        return parseInt(value, 10);
      case 'number_decimal':
        return parseFloat(value);
      case 'boolean':
        return value.toLowerCase() === 'true';
      case 'date':
      case 'date_time':
        const date = new Date(value);
        return isNaN(date.getTime()) ? new Date() : date;
      case 'json':
        try {
          return JSON.parse(value);
        } catch (error) {
          console.warn(`Failed to parse JSON metafield value: ${value}`, error);
          return value;
        }
      case 'url':
        return value; // URLs are strings but could be validated
      case 'color':
        return value; // Hex color codes
      case 'list.single_line_text_field':
      case 'list.url':
      case 'list.color':
        try {
          return JSON.parse(value); // Lists are stored as JSON arrays
        } catch (error) {
          console.warn(`Failed to parse list metafield value: ${value}`, error);
          return [value];
        }
      case 'list.number_integer':
        try {
          return JSON.parse(value).map((v: string) => parseInt(v, 10));
        } catch (error) {
          console.warn(`Failed to parse integer list metafield value: ${value}`, error);
          const parsed = parseInt(value, 10);
          return isNaN(parsed) ? [] : [parsed];
        }
      case 'list.number_decimal':
        try {
          return JSON.parse(value).map((v: string) => parseFloat(v));
        } catch (error) {
          console.warn(`Failed to parse decimal list metafield value: ${value}`, error);
          const parsed = parseFloat(value);
          return isNaN(parsed) ? [] : [parsed];
        }
      case 'list.date':
      case 'list.date_time':
        try {
          return JSON.parse(value).map((v: string) => {
            const date = new Date(v);
            return isNaN(date.getTime()) ? new Date() : date;
          });
        } catch (error) {
          console.warn(`Failed to parse date list metafield value: ${value}`, error);
          const date = new Date(value);
          return isNaN(date.getTime()) ? [] : [date];
        }
      case 'metaobject_reference':
      case 'product_reference':
      case 'collection_reference':
      case 'page_reference':
      case 'file_reference':
      case 'variant_reference':
        return metafield.reference || value;
      case 'list.metaobject_reference':
      case 'list.product_reference':
      case 'list.collection_reference':
      case 'list.page_reference':
      case 'list.file_reference':
      case 'list.variant_reference':
      case 'list.mixed_reference':
        // For list references, we'd need the reference objects
        return metafield.reference ? [metafield.reference] : JSON.parse(value);
      case 'single_line_text_field':
      case 'multi_line_text_field':
      case 'rich_text':
      case 'weight':
      case 'volume':
      case 'dimension':
      case 'rating':
      case 'mixed_reference':
      default:
        return value; // Return as string for text fields and unknown types
    }
  } catch (error) {
    console.warn(`Failed to parse metafield ${metafield.key}:`, error);
    return value; // Fallback to raw value
  }
}

// Enhanced collection metafields parser
export function parseCollectionMetafields(
  metafields: CommerceMetafield[]
): CollectionMetafields {
  const result: CollectionMetafields = {};

  metafields.forEach((metafield) => {
    const parsedValue = parseMetafieldValue(metafield);
    
    // Handle known fields with type safety
    switch (metafield.key) {
      case "location":
        result.location = parsedValue;
        break;
      case "startDate":
        result.startDate = parsedValue;
        break;
      case "startTime":
        result.startTime = parsedValue;
        break;
      case "endTime":
        result.endTime = parsedValue;
        break;
      case "endDate":
        result.endDate = parsedValue;
        break;
      case "testimonials":
        result.testimonials = metafield.reference;
        break;
      case "multicolumn1":
        result.multicolumn1 = metafield.reference;
        break;
      default:
        // Store all other metafields dynamically
        result[metafield.key] = parsedValue;
        break;
    }
  });

  return result;
}

// New product metafields parser
export function parseProductMetafields(
  metafields: CommerceMetafield[]
): ProductMetafields {
  const result: ProductMetafields = {};

  metafields.forEach((metafield) => {
    const parsedValue = parseMetafieldValue(metafield);
    
    // Handle known fields with type safety
    switch (metafield.key) {
      case "requirements":
        result.requirements = parsedValue;
        break;
      case "location":
        result.location = parsedValue;
        break;
      case "details":
        result.details = parsedValue;
        break;
      case "hotel_booking_url":
        result.hotel_booking_url = parsedValue;
        break;
      case "city":
        result.city = parsedValue;
        break;
      case "state":
        result.state = parsedValue;
        break;
      case "instructor":
        result.instructor = parsedValue;
        break;
      case "duration":
        result.duration = parsedValue;
        break;
      case "difficulty":
        result.difficulty = parsedValue;
        break;
      case "certification":
        result.certification = parsedValue;
        break;
      case "materials":
        result.materials = Array.isArray(parsedValue) ? parsedValue : [parsedValue];
        break;
      case "prerequisites":
        result.prerequisites = Array.isArray(parsedValue) ? parsedValue : [parsedValue];
        break;
      case "objectives":
        result.objectives = Array.isArray(parsedValue) ? parsedValue : [parsedValue];
        break;
      case "features":
        result.features = Array.isArray(parsedValue) ? parsedValue : [parsedValue];
        break;
      default:
        // Store all other metafields dynamically
        result[metafield.key] = parsedValue;
        break;
    }
  });

  return result;
}

// Enhanced collection retrieval with parsed metafields
export const getEnhancedCollectionByHandle = async (handle: string): Promise<EnhancedCommerceCollection | null> => {
  const collection = await getCollectionByHandle(handle);
  if (!collection) return null;

  const parsedMetafields = collection.metafields ? parseCollectionMetafields(collection.metafields) : undefined;
  
  return {
    ...collection,
    metafields: toEnhancedMetafields(collection.metafields),
    parsedMetafields,
  };
};

// Enhanced product retrieval with parsed metafields
export const getEnhancedProductByHandle = async (handle: string): Promise<EnhancedCommerceProduct | null> => {
  const product = await getProductByHandle(handle);
  if (!product) return null;

  const parsedMetafields = product.metafields ? parseProductMetafields(product.metafields) : undefined;
  
  return {
    ...product,
    metafields: toEnhancedMetafields(product.metafields),
    parsedMetafields,
  };
};

// Helper function to extract value from metaobject fields
function getMetaobjectFieldValue(fields: CommerceMetaobjectField[], key: string): string | undefined {
  const field = fields.find(f => f.key === key);
  return field?.value;
}

// Type guard function to validate metafields as EnhancedCommerceMetafield[]
function isEnhancedCommerceMetafield(metafield: any): metafield is EnhancedCommerceMetafield {
  return metafield && 
         typeof metafield.key === 'string' && 
         typeof metafield.namespace === 'string' && 
         typeof metafield.value === 'string' && 
         typeof metafield.type === 'string';
}

// Helper function to safely convert metafields to enhanced metafields
function toEnhancedMetafields(metafields: CommerceMetafield[] | undefined): EnhancedCommerceMetafield[] {
  if (!metafields) return [];
  return metafields.filter(isEnhancedCommerceMetafield);
}

// Helper functions for parsing specific metaobject types
function parseOfferingMetaobject(metaobject: CommerceMetaobject): ProductOffering {
  return {
    key: getMetaobjectFieldValue(metaobject.fields, "key") || "",
    name: getMetaobjectFieldValue(metaobject.fields, "name") || "",
    handle: metaobject.handle || "",
  };
}

function parseStudentTypeMetaobject(metaobject: CommerceMetaobject): ProductStudentType {
  return {
    name: getMetaobjectFieldValue(metaobject.fields, "name") || "",
    handle: metaobject.handle || "",
  };
}

function parseRequirementsMetaobject(metaobject: CommerceMetaobject): ProductRequirements {
  return {
    name: getMetaobjectFieldValue(metaobject.fields, "name") || "",
    details: getMetaobjectFieldValue(metaobject.fields, "details") || "",
    handle: metaobject.handle || "",
  };
}

function parseLocationMetaobject(metaobject: CommerceMetaobject): ProductLocation {
  return {
    name: getMetaobjectFieldValue(metaobject.fields, "name") || "",
    handle: metaobject.handle || "",
    address1: getMetaobjectFieldValue(metaobject.fields, "address_1") || "",
    city: getMetaobjectFieldValue(metaobject.fields, "city") || "",
    state: getMetaobjectFieldValue(metaobject.fields, "state") || "",
    zipcode: getMetaobjectFieldValue(metaobject.fields, "zipcode") || "",
    country: getMetaobjectFieldValue(metaobject.fields, "country") || "",
    phone: getMetaobjectFieldValue(metaobject.fields, "phone") || "",
    website: getMetaobjectFieldValue(metaobject.fields, "website") || "",
    imageId: getMetaobjectFieldValue(metaobject.fields, "image"),
  };
}

function parseEventDetailsMetaobject(metaobject: CommerceMetaobject): ProductEventDetails | null {
  const fields = metaobject.fields;
  const days: ProductEventDay[] = [];
  
  // Extract day information
  for (let i = 1; i <= 4; i++) {
    const date = getMetaobjectFieldValue(fields, `day_${i}_date`);
    const startTime = getMetaobjectFieldValue(fields, `day_${i}_start_time`);
    const endTime = getMetaobjectFieldValue(fields, `day_${i}_end_time`);
    
    if (date && startTime && endTime) {
      days.push({
        date,
        startTime,
        endTime,
        dayNumber: i,
      });
    }
  }
  
  if (days.length === 0) {
    return null;
  }
  
  return {
    name: getMetaobjectFieldValue(fields, "name") || "",
    handle: metaobject.handle || "",
    days,
    startDate: days[0]?.date,
    endDate: days[days.length - 1]?.date,
    duration: days.length,
  };
}

function parseAccountingMetaobject(metaobject: CommerceMetaobject): ProductAccounting {
  return {
    tag: getMetaobjectFieldValue(metaobject.fields, "tag") || "",
    handle: metaobject.handle || "",
  };
}

// New comprehensive product metadata parser (refactored for better maintainability)
export function parseProductMetadata(metafields: CommerceMetafield[]): ProductMetadata {
  const metadata: ProductMetadata = {};
  
  // Filter out null metafields
  const validMetafields = metafields.filter(field => field !== null);
  
  validMetafields.forEach((metafield) => {
    switch (metafield.key) {
      case "city":
        metadata.city = metafield.value;
        break;
        
      case "state":
        metadata.state = metafield.value;
        break;
        
      case "offering":
        if (metafield.reference) {
          metadata.offering = parseOfferingMetaobject(metafield.reference);
        }
        break;
        
      case "studenttype":
        if (metafield.reference) {
          metadata.studentType = parseStudentTypeMetaobject(metafield.reference);
        }
        break;
        
      case "requirements":
        if (metafield.reference) {
          metadata.requirements = parseRequirementsMetaobject(metafield.reference);
        }
        break;
        
      case "location":
        if (metafield.reference) {
          metadata.location = parseLocationMetaobject(metafield.reference);
        }
        break;
        
      case "details":
        if (metafield.reference) {
          const eventDetails = parseEventDetailsMetaobject(metafield.reference);
          if (eventDetails) {
            metadata.eventDetails = eventDetails;
          }
        }
        break;
        
      case "accounting":
        if (metafield.reference) {
          metadata.accounting = parseAccountingMetaobject(metafield.reference);
        }
        break;
        
      default:
        // Store any other metafields for extensibility, but keep dates as strings for JSON serialization
        const parsedValue = parseMetafieldValue(metafield);
        metadata[metafield.key] = parsedValue instanceof Date ? parsedValue.toISOString() : parsedValue;
        break;
    }
  });
  
  return metadata;
}

// Collection metadata parser
export function parseCollectionMetadata(metafields: CommerceMetafield[]): CollectionMetadata {
  const metadata: CollectionMetadata = {};
  
  // Filter out null metafields
  const validMetafields = metafields.filter(field => field !== null);
  
  // Initialize nested objects
  const eventDates: Partial<CollectionEventDates> = {};
  const course: Partial<CollectionCourse> = {};
  
  validMetafields.forEach((metafield) => {
    switch (metafield.key) {
      case "location":
        metadata.location = {
          value: metafield.value,
        } as CollectionLocation;
        break;
        
      case "startDate":
        eventDates.startDate = metafield.value;
        break;
        
      case "startTime":
        eventDates.startTime = metafield.value;
        break;
        
      case "endDate":
        eventDates.endDate = metafield.value;
        break;
        
      case "endTime":
        eventDates.endTime = metafield.value;
        break;
        
      case "testimonials":
        if (metafield.reference) {
          metadata.testimonials = {
            handle: metafield.reference.handle || "",
            type: metafield.reference.type || "",
            fields: metafield.reference.fields || [],
          } as CollectionTestimonials;
        }
        break;
        
      case "multicolumn1":
        if (metafield.reference) {
          metadata.multiColumn = {
            handle: metafield.reference.handle || "",
            type: metafield.reference.type || "",
            fields: metafield.reference.fields || [],
          } as CollectionMultiColumn;
        }
        break;
        
      case "instructor":
        metadata.instructor = {
          value: metafield.value,
          name: metafield.value, // For now, assume value is the name
        } as CollectionInstructor;
        break;
        
      case "price":
        course.price = metafield.value;
        break;
        
      case "capacity":
        course.capacity = parseInt(metafield.value, 10) || undefined;
        break;
        
      case "difficulty":
        course.difficulty = metafield.value;
        break;
        
      case "duration":
        course.duration = metafield.value;
        break;
        
      case "benefits":
        try {
          const parsed = JSON.parse(metafield.value);
          course.benefits = Array.isArray(parsed) ? parsed : [parsed];
        } catch (error) {
          console.warn(`Failed to parse benefits metafield: ${metafield.value}`, error);
          course.benefits = [metafield.value];
        }
        break;
        
      case "tags":
        try {
          const parsed = JSON.parse(metafield.value);
          course.tags = Array.isArray(parsed) ? parsed : [parsed];
        } catch (error) {
          console.warn(`Failed to parse tags metafield: ${metafield.value}`, error);
          course.tags = [metafield.value];
        }
        break;
        
      case "featured":
        course.featured = metafield.value.toLowerCase() === 'true';
        break;
        
      case "categoryType":
        course.categoryType = metafield.value;
        break;
        
      default:
        // Store any other metafields for extensibility, but keep dates as strings for JSON serialization
        const parsedValue = parseMetafieldValue(metafield);
        metadata[metafield.key] = parsedValue instanceof Date ? parsedValue.toISOString() : parsedValue;
        break;
    }
  });
  
  // Only add eventDates if we have at least one date field
  if (Object.keys(eventDates).length > 0) {
    metadata.eventDates = eventDates as CollectionEventDates;
  }
  
  // Only add course if we have at least one course field
  if (Object.keys(course).length > 0) {
    metadata.course = course as CollectionCourse;
  }
  
  return metadata;
}
