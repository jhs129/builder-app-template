"use client";

import React, { useMemo } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import DefaultGlobalHeader from "@/components/navigation/DefaultHeader";
import Footer from "@/components/navigation/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import EventSchemaData from "@/components/seo/EventSchemaData";
import Custom404 from "../404";
import { getCollectionByHandle, getAllCollectionHandles } from "@/lib/shopify";
import { CommerceCollection, SiteContext, Collection } from "@/types";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import "@/builder-registry";
import ProductGrid from "@/components/commerce/ProductGrid";
import CollectionHero from "@/components/sections/CollectionHero";

interface CollectionPageProps {
  collection: CommerceCollection | null;
  content?: any;
  siteContext: SiteContext | null;
}

export const getStaticProps: GetStaticProps<CollectionPageProps> = async ({
  params,
}) => {
  const handle = params?.handle as string;
  const siteContextName = process.env.NEXT_PUBLIC_SITE_CONTEXT_NAME || "sma";

  const [collection, collectionContent, siteContext] = await Promise.all([
    getCollectionByHandle(handle),
    builder
      .get("collection", {
        query: {
          "data.handle": handle,
        },
      })
      .toPromise(),
    builder
      .get("site-context", {
        query: {
          name: siteContextName,
        },
        options: {
          enrich: true,
          includeRefs: true,
        },
      })
      .toPromise(),
  ]);

  if (!collection) {
    return {
      notFound: true,
    };
  }


  return {
    props: {
      collection,
      content: collectionContent || null,
      siteContext: siteContext || null,
    },
    revalidate: 60, // Revalidate every minute
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const handles: string[] = await getAllCollectionHandles();

  return {
    paths: handles.map((handle) => ({
      params: { handle },
    })),
    fallback: "blocking",
  };
};

// Function to map Collection.eventInfo.attendanceMode to EventSchemaData format
const mapAttendanceMode = (mode: string | undefined): "OnlineEventAttendanceMode" | "OfflineEventAttendanceMode" | "MixedEventAttendanceMode" => {
  switch (mode) {
    case "Online Event":
      return "OnlineEventAttendanceMode";
    case "In-Person Event":
      return "OfflineEventAttendanceMode";
    case "Hybrid Event":
      return "MixedEventAttendanceMode";
    default:
      return "OfflineEventAttendanceMode";
  }
};

// Function to create EventSchemaData props from Collection
const createEventSchemaProps = (collection: CommerceCollection, content: Collection | null, location?: any) => {
  if (!content?.data?.isEvent || !content?.data?.eventInfo) {
    return null;
  }

  const eventInfo = content.data.eventInfo;
  
  // Create offers based on collection products
  const offers = collection?.products?.edges?.map((productEdge) => {
    const product = productEdge.node;
    const minPrice = product.priceRange?.minVariantPrice;
    if (!minPrice) return null;
    
    return {
      name: product.title,
      price: minPrice.amount,
      priceCurrency: minPrice.currencyCode,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://silvamethod.com'}/products/${product.handle}`,
      availability: "InStock" as const, // Default to InStock
    };
  }).filter((offer): offer is NonNullable<typeof offer> => offer !== null) || [];
  
  // Map location data to EventSchemaData format
  const mappedLocation = location.data ? {
    type: location.data.type || "Place",
    name: location.data.name,
    url: location.data.url,
    address: location.data.address,
  } : undefined;


  return {
    eventId: `${process.env.NEXT_PUBLIC_SITE_URL || 'env.NEXT_PUBLIC_SITE_URL'}/collections/${content.data.handle}#event`,
    name: collection?.title || content.data.handle,
    description: collection?.description || "",
    image: collection?.image?.url,
    startDate: eventInfo.startDate,
    endDate: eventInfo.endDate,
    teaches: eventInfo.teaches,
    eventAttendanceMode: mapAttendanceMode(eventInfo.attendanceMode),
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://silvamethod.com'}/collections/${content.data.handle}`,
    offers: offers.length > 0 ? offers : undefined,
    location: mappedLocation,
  };
};

const CollectionPage: React.FC<CollectionPageProps> = ({
  collection,
  content,
}) => {
  const isPreviewing = useIsPreviewing();
  
  const location: Location = content?.data?.location?.value;
  
  // Create event schema props if this is an event collection
  const eventSchemaProps = useMemo(() => {
    return collection && content 
      ? createEventSchemaProps(collection, content as Collection, location) 
      : null;
  }, [collection, content, location]);

  if (!collection && !isPreviewing) {
    return <Custom404 />;
  }

  return (
    <>
      <SEOHead
        title={collection?.title || "Collection"}
        description={collection?.description || "" }
      >
        {eventSchemaProps && <EventSchemaData {...eventSchemaProps} />}
      </SEOHead>
      <DefaultGlobalHeader />

      {/* Hero Section */}
      <CollectionHero
        collection={collection}
        headline="Silva Manifesting & Love Yourself Heal Your Life"
      />

      <main className="relative container mx-auto">
        {/* Products Section */}
        {collection && collection.products.edges.length > 0 && (
          <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                  Explore Our Collection
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover transformative products designed to enhance your
                  journey of personal growth and mindfulness.
                </p>
              </div>

              <ProductGrid
                products={collection.products.edges}
                sortKey="PRICE"
                reverse={false}
                limit={250}
              />
            </div>
          </section>
        )}

        {/* Builder Content - Collection Description & Custom Sections */}
        {(content || isPreviewing) && (
          <section className="bg-primary-light py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div id="builder-content">
                <BuilderComponent
                  model="collection"
                  content={content}
                  data={{ ecommCollection: collection, location: location, content: content }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Fallback content when no Builder content */}
        {!content && !isPreviewing && (
          <section className="bg-white py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                About This Collection
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                {collection?.description ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: collection.description }}
                  />
                ) : (
                  <p>
                    This collection features carefully curated products designed
                    to support your personal development journey. Each item has
                    been selected to help you develop the skills and mindset
                    needed for lasting transformation.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Additional Content Section */}
        <section className="py-20 bg-primary-dark text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Transform Your Life Today
            </h3>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Join thousands who have discovered the power of The Silva Method.
              Start your journey towards enhanced intuition, creativity, and
              personal transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent-green hover:bg-accent-green/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
              <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CollectionPage;
