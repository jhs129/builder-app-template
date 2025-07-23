"use client";

import React, { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import DefaultGlobalHeader from "@/components/navigation/DefaultHeader";
import Footer from "@/components/navigation/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import Custom404 from "../404";
import {
  getProductByHandle,
  getAllProductHandles,
  getShopifyDomain,
} from "@/lib/shopify";
import { CommerceProduct, CommerceVariant, SiteContext } from "@/types";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";

import "@/builder-registry";

interface ProductPageProps {
  product: CommerceProduct | null;
  content?: any;
  siteContext: SiteContext | null;
}

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({
  params,
}) => {
  const handle = params?.handle as string;
  const siteContextName = process.env.NEXT_PUBLIC_SITE_CONTEXT_NAME || "sma";


  const [product, productContent, siteContext] = await Promise.all([
    getProductByHandle(handle),
    builder
      .get("product", {
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

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
      content: productContent || null,
      siteContext: siteContext || null,
    },
    revalidate: 60, // Revalidate every minute
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const handles = await getAllProductHandles();

  return {
    paths: handles.map((handle) => ({
      params: { handle },
    })),
    fallback: "blocking",
  };
};

const formatPrice = (amount: string, currencyCode: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
};

const ProductPage: React.FC<ProductPageProps> = ({ product, content }) => {
  const isPreviewing = useIsPreviewing();

  const [selectedVariant, setSelectedVariant] =
    useState<CommerceVariant | null>(product?.variants.edges[0]?.node || null);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(() => {
    const options: Record<string, string> = {};
    product?.options?.forEach((option: { name: string; values: string[] }) => {
      options[option.name] = option.values[0];
    });
    return options;
  });

  // Only show 404 if we have no data from anywhere and we're not in preview mode
  if (!product && !content && !isPreviewing) {
    return <Custom404 />;
  }

  const findVariantByOptions = (options: Record<string, string>) => {
    if (!product) return null;
    return product.variants.edges.find((edge: { node: CommerceVariant }) => {
      return edge.node.selectedOptions.every(
        (option: { name: string; value: string }) =>
          options[option.name] === option.value
      );
    })?.node;
  };

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);
    const newVariant = findVariantByOptions(newOptions);
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  const handleBuyNow = () => {
    if (!selectedVariant) return;

    // Get variant ID without the 'gid://' prefix that Shopify adds
    const variantId = selectedVariant.id.split("/").pop();
    if (!variantId) return;

    // Redirect to Shopify's checkout
    const shopifyDomain = getShopifyDomain();
    window.location.href = `${shopifyDomain}/cart/${variantId}:1`;
  };

  // If we're in preview mode and don't have a product, only show the Builder content
  if (!product && isPreviewing) {
    return (
      <>
        <SEOHead title="Product Preview" description="Product preview page" />
        <DefaultGlobalHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div id="builder-content">
              <BuilderComponent model="product" content={content} data={{ myVar: 'Hello' }}/>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={product?.title || "Product"}
        description={product?.description || ""}
      />
      <DefaultGlobalHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="relative aspect-square">
              {product?.images.edges[0]?.node && (
                <Image
                  src={product.images.edges[0].node.url}
                  alt={product.images.edges[0].node.altText || product.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              )}
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>

              {/* Price */}
              <div className="mb-6">
                {selectedVariant ? (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {formatPrice(
                        selectedVariant.price.amount,
                        selectedVariant.price.currencyCode
                      )}
                    </span>
                    {selectedVariant.compareAtPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(
                          selectedVariant.compareAtPrice.amount,
                          selectedVariant.compareAtPrice.currencyCode
                        )}
                      </span>
                    )}
                  </div>
                ) : (
                  product?.priceRange && (
                    <span className="text-2xl font-bold">
                      From{" "}
                      {formatPrice(
                        product.priceRange.minVariantPrice.amount,
                        product.priceRange.minVariantPrice.currencyCode
                      )}
                    </span>
                  )
                )}
              </div>

              {/* Product Options */}
              {product?.options.map(
                (option: { id: string; name: string; values: string[] }) => (
                  <div key={option.id} className="mb-6">
                    <h3 className="text-sm font-medium mb-2">{option.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value: string) => (
                        <button
                          key={value}
                          className={`px-4 py-2 border rounded-md ${
                            selectedOptions[option.name] === value
                              ? "border-black bg-black text-white"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => handleOptionChange(option.name, value)}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className={`w-full py-3 px-6 rounded-md text-white font-medium ${
                  selectedVariant?.availableForSale
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!selectedVariant?.availableForSale}
              >
                {selectedVariant?.availableForSale ? "Buy Now" : "Out of Stock"}
              </button>

              {/* Product Description */}
              {product?.description && (
                <div className="mt-8 prose max-w-none">
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Builder Content */}
          {(content || isPreviewing) && (
            <div id="builder-content">
              <BuilderComponent model="product" content={content} data={{ myVar: 'Hello', shopifyProduct: product }} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;
