export interface CommerceImage {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface CommercePrice {
  amount: string;
  currencyCode: string;
}

export interface CommerceCollectionProduct {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: CommercePrice;
  };
  images: {
    edges: {
      node: CommerceImage;
    }[];
  };
  metafields?: CommerceMetafield[];  // Raw Shopify metafields
  metadata?: ProductMetadata;        // Parsed, clean metadata
}

export interface CommerceMetaobjectField {
  key: string;
  value: string;
  type: string;
}

export interface CommerceMetaobject {
  handle: string;
  type: string;
  fields: CommerceMetaobjectField[];
}

// Enhanced metafield interface supporting all Shopify types
export interface CommerceMetafield {
  key: string;
  namespace: string;
  value: string;
  type: string;
  reference?: CommerceMetaobject;
  // Additional fields for enhanced metafield support
  id?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Specific metafield value types for better type safety
export type MetafieldValueType = 
  | 'single_line_text_field'
  | 'multi_line_text_field' 
  | 'rich_text'
  | 'number_integer'
  | 'number_decimal'
  | 'date'
  | 'date_time'
  | 'boolean'
  | 'url'
  | 'json'
  | 'color'
  | 'weight'
  | 'volume'
  | 'dimension'
  | 'rating'
  | 'file_reference'
  | 'page_reference'
  | 'product_reference'
  | 'variant_reference'
  | 'collection_reference'
  | 'metaobject_reference'
  | 'mixed_reference'
  | 'list.single_line_text_field'
  | 'list.number_integer'
  | 'list.number_decimal'
  | 'list.date'
  | 'list.date_time'
  | 'list.url'
  | 'list.color'
  | 'list.file_reference'
  | 'list.page_reference'
  | 'list.product_reference'
  | 'list.variant_reference'
  | 'list.collection_reference'
  | 'list.metaobject_reference'
  | 'list.mixed_reference';

// Enhanced metafield interface with typed values
export interface EnhancedCommerceMetafield extends CommerceMetafield {
  type: MetafieldValueType;
  parsedValue?: any; // Parsed value based on type
}

// Legacy collection metafields (keeping for backward compatibility)
export interface CollectionMetafields {
  location?: string;
  startDate?: string;
  startTime?: string;
  endTime?: string;
  endDate?: string;
  testimonials?: CommerceMetaobject;
  multicolumn1?: CommerceMetaobject;
  [key: string]: any; // Allow dynamic metafields
}

// Enhanced collection metafields with full metafield support
export interface EnhancedCollectionMetafields {
  // Common event/course metafields
  location?: string;
  startDate?: string;
  startTime?: string;
  endTime?: string;
  endDate?: string;
  testimonials?: CommerceMetaobject;
  multicolumn1?: CommerceMetaobject;
  
  // Additional potential metafields
  price?: string;
  capacity?: number;
  instructor?: string;
  difficulty?: string;
  duration?: string;
  requirements?: string;
  benefits?: string[];
  tags?: string[];
  featured?: boolean;
  categoryType?: string;
  
  // Dynamic metafields from Shopify
  [key: string]: any;
}

// Product metafields interface
export interface ProductMetafields {
  // Current known product metafields
  requirements?: string;
  location?: string;
  details?: string;
  hotel_booking_url?: string;
  city?: string;
  state?: string;
  
  // Additional potential product metafields
  instructor?: string;
  duration?: string;
  difficulty?: string;
  certification?: boolean;
  materials?: string[];
  prerequisites?: string[];
  objectives?: string[];
  features?: string[];
  
  // Dynamic metafields from Shopify
  [key: string]: any;
}

export interface CommerceProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  publishedAt: string | null;
  availableForSale: boolean;
  images: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText: string | null;
        width: number;
        height: number;
      };
    }>;
  };
  metafields?: CommerceMetafield[];  // Raw Shopify metafields
  metadata?: ProductMetadata;        // Parsed, clean metadata
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice: {
          amount: string;
          currencyCode: string;
        } | null;
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
        metafields?: CommerceMetafield[];
      };
    }>;
  };
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
}

// Enhanced product interface with parsed metafields
export interface EnhancedCommerceProduct extends Omit<CommerceProduct, 'metafields'> {
  metafields?: EnhancedCommerceMetafield[];
  parsedMetafields?: ProductMetafields;
}

export interface CommercePublication {
  name: string;
  id: string;
  publishedAt: string | null;
}

export interface CommercePublicationConnection {
  edges: Array<{
    node: CommercePublication;
  }>;
}

export interface CommerceCollection {
  id: string;
  title: string;
  description: string;
  handle: string;
  image?: {
    id: string;
    url: string;
    altText: string | null;
    width: number;
    height: number;
  };
  metafields?: CommerceMetafield[];   // Raw Shopify metafields
  metadata?: CollectionMetadata;      // Parsed, clean metadata
  products: {
    edges: Array<{
      node: CommerceProduct;
    }>;
  };
}

// Enhanced collection interface with parsed metafields
export interface EnhancedCommerceCollection extends Omit<CommerceCollection, 'metafields'> {
  metafields?: EnhancedCommerceMetafield[];
  parsedMetafields?: EnhancedCollectionMetafields;
}

export interface CommerceVariant {
  id: string;
  title: string;
  price: CommercePrice;
  compareAtPrice: CommercePrice | null;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface ProductResponse {
  product: CommerceProduct;
}

export interface ProductsResponse {
  products: {
    edges: Array<{
      node: {
        handle: string;
        publishedAt: string | null;
        availableForSale: boolean;
      };
    }>;
  };
}

export interface CollectionResponse {
  collection: CommerceCollection;
}

export interface CollectionsResponse {
  collections: {
    edges: Array<{
      node: {
        handle: string;
        publications?: CommercePublicationConnection;
      };
    }>;
  };
}

// New comprehensive product metadata interfaces
export interface ProductOffering {
  key: string;              // "manifesting", "love-yourself-heal-your-life"
  name: string;             // "Silva Manifesting"
  handle: string;           // "manifesting"
}

export interface ProductStudentType {
  name: string;             // "Reviewer", "New Student"
  handle: string;           // "reviewer", "new-student"
}

export interface ProductRequirements {
  name: string;             // "Silva Manifesting Graduate Reviewer"
  details: string;          // "Must show copy of certificate"
  handle: string;           // "silva-manifesting-graduate-reviewer"
}

export interface ProductLocation {
  name: string;             // "Doubletree by Hilton Atlanta/Alpharetta"
  handle: string;           // "doubletree-by-hilton-atlanta-alpharetta"
  address1: string;         // "2925 Jordan Court"
  city: string;             // "Alpharetta"
  state: string;            // "GA" or "Georgia"
  zipcode: string;          // "30004"
  country: string;          // "United States"
  phone: string;            // "678-347-0022"
  website: string;          // Full URL
  imageId?: string;         // Shopify media ID
}

export interface ProductEventDay {
  date: string;             // "2025-08-30" (ISO date string)
  startTime: string;        // "9AM"
  endTime: string;          // "7PM"
  dayNumber: number;        // 1, 2, 3, 4
}

export interface ProductEventDetails {
  name: string;             // "Silva Manifesting + Love Yourself Heal Your Life Workshop"
  handle: string;           // "silva-manifesting-love-yourself-heal-your-life-workshop"
  days: ProductEventDay[];  // Array of event days
  startDate?: string;       // First day date: "2025-08-30"
  endDate?: string;         // Last day date: "2025-09-02"
  duration?: number;        // Number of days: 4
}

export interface ProductAccounting {
  tag: string;              // "GA-25-08-Manifesting"
  handle: string;           // "ga-25-08-manifesting"
}

// Comprehensive product metadata interface
export interface ProductMetadata {
  // Basic location info (always available)
  city?: string;                        // "Alpharetta"
  state?: string;                       // "GA"
  
  // Offering information
  offering?: ProductOffering;
  
  // Student type
  studentType?: ProductStudentType;
  
  // Requirements (when applicable)
  requirements?: ProductRequirements;
  
  // Venue/Location details
  location?: ProductLocation;
  
  // Event Details with Dates
  eventDetails?: ProductEventDetails;
  
  // Accounting
  accounting?: ProductAccounting;
  
  // Future extensibility
  [key: string]: any;
}

// Collection-specific metadata interfaces
export interface CollectionLocation {
  value: string;                        // Location metafield value
}

export interface CollectionEventDates {
  startDate?: string;                   // "2025-08-30"
  startTime?: string;                   // "9AM"
  endDate?: string;                     // "2025-09-02"
  endTime?: string;                     // "7PM"
}

export interface CollectionTestimonials {
  handle: string;                       // Metaobject handle
  type: string;                         // "testimonials"
  fields: any[];                        // Array of testimonial fields
}

export interface CollectionMultiColumn {
  handle: string;                       // Metaobject handle
  type: string;                         // "multicolumn"
  fields: any[];                        // Array of multicolumn fields
}

export interface CollectionInstructor {
  name?: string;                        // Instructor name
  value?: string;                       // Raw instructor value
}

export interface CollectionCourse {
  price?: string;                       // Course price
  capacity?: number;                    // Maximum capacity
  difficulty?: string;                  // Difficulty level
  duration?: string;                    // Course duration
  benefits?: string[];                  // List of benefits
  tags?: string[];                      // Course tags
  featured?: boolean;                   // Featured status
  categoryType?: string;                // Category type
}

// Comprehensive collection metadata interface
export interface CollectionMetadata {
  // Location information
  location?: CollectionLocation;
  
  // Event timing
  eventDates?: CollectionEventDates;
  
  // Content blocks
  testimonials?: CollectionTestimonials;
  multiColumn?: CollectionMultiColumn;
  
  // Instructor information
  instructor?: CollectionInstructor;
  
  // Course details
  course?: CollectionCourse;
  
  // Future extensibility
  [key: string]: any;
}
