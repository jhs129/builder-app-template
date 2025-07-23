import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CommerceCollection, Themeable, Heroic } from "@/types";
import { ThemeProvider } from "@/components/common/ThemeProvider";

interface CollectionHeroProps extends Themeable, Heroic {
  // Builder.io editable props with Shopify collection as fallback
  breadcrumbText?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  heroImage?: string;
  heroImageAlt?: string;
  productCountText?: string;

  // Collection data passed from page (used as fallback)
  collection?: CommerceCollection | null;
}

const CollectionHero: React.FC<CollectionHeroProps> = ({
  breadcrumbText,
  headline,
  description,
  buttonText = "Explore Collection",
  buttonUrl = "#products",
  heroImage,
  heroImageAlt,
  productCountText,
  theme = "light",
  inheritTheme = false,
  isHero = true,
  collection,
}) => {
  // Use Builder.io values or fallback to collection data
  const displayBreadcrumb = breadcrumbText || collection?.title || "Collection";
  const displayTitle = headline || collection?.title || "Collection";
  const displayDescription =
    description ||
    "Transform your life with proven techniques and powerful insights designed to unlock your full potential. Join thousands who have discovered the path to enhanced intuition, creativity, and personal growth.";
  const displayImage = heroImage || collection?.image?.url;
  const displayImageAlt =
    heroImageAlt ||
    collection?.image?.altText ||
    collection?.title ||
    "Collection image";
  const productCount = collection?.products?.edges?.length || 0;
  const displayProductText =
    productCountText ||
    `${productCount} ${productCount === 1 ? "Product" : "Products"} Available`;

  const isHashLink = buttonUrl.startsWith("#");

  const content = (
    <section className="component-section relative bg-gradient-to-br from-primary-accent via-accent-purple to-primary-dark py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent-green/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-white/70 mb-8">{displayBreadcrumb}</nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {isHero ? (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {displayTitle}
              </h1>
            ) : (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {displayTitle}
              </h2>
            )}

            <div className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              <p className="mb-4">{displayDescription}</p>
            </div>

            {collection && productCount > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start lg:justify-start justify-center">
                <span className="inline-flex items-center px-6 py-3 bg-white/15 backdrop-blur-sm rounded-full text-white border border-white/20 font-medium">
                  {displayProductText}
                </span>
                {isHashLink ? (
                  <button
                    onClick={() => {
                      const element = document.querySelector(buttonUrl);
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-accent-green hover:bg-accent-green/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                  >
                    {buttonText}
                  </button>
                ) : (
                  <Link
                    href={buttonUrl}
                    className="bg-accent-green hover:bg-accent-green/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                  >
                    {buttonText}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Collection Image */}
          {displayImage && (
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto lg:max-w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-accent-teal/20 rounded-3xl transform rotate-6" />
                <div className="relative bg-white p-2 rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src={displayImage}
                    alt={displayImageAlt}
                    width={500}
                    height={500}
                    className="object-cover rounded-xl w-full h-full"
                    priority
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );

  // Only wrap in ThemeProvider if we have an explicit theme and inheritTheme is false
  if (inheritTheme || !theme) {
    return content;
  }

  return (
    <ThemeProvider theme={theme} inheritTheme={false}>
      {content}
    </ThemeProvider>
  );
};

export default CollectionHero;
