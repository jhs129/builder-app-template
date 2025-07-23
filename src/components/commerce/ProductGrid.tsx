import React from "react";
import ProductCard from "./ProductCard";
import { CommerceCollectionProduct, Themeable, Opaque, Alignable } from "@/types";
import { ThemeProvider } from "@/components/common/ThemeProvider";

interface ProductGridProps extends Themeable, Opaque, Alignable {
  products: Array<{
    node: CommerceCollectionProduct;
  }>;
  limit?: number;
  sortKey?: "TITLE" | "PRICE" | "CREATED" | "BEST_SELLING";
  reverse?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products: initialProducts,
  limit = 250,
  sortKey = "CREATED",
  reverse = false,
  theme = "light",
  inheritTheme = false,
  maskOpacity = 0,
  alignment = "center",
}) => {
  let products = [...initialProducts];

  // Sort products
  products.sort((a, b) => {
    switch (sortKey) {
      case "TITLE":
        return a.node.title.localeCompare(b.node.title);
      case "PRICE":
        // Primary sort: by offering name (to group offerings together)
        const offeringA = a.node.metadata?.offering?.name || "";
        const offeringB = b.node.metadata?.offering?.name || "";
        const offeringDiff = offeringA.localeCompare(offeringB);
        
        // Secondary sort: by price within each offering group
        if (offeringDiff === 0) {
          const priceA = parseFloat(a.node.priceRange.minVariantPrice.amount);
          const priceB = parseFloat(b.node.priceRange.minVariantPrice.amount);
          return priceA - priceB;
        }
        
        return offeringDiff;
      case "CREATED":
      case "BEST_SELLING":
      default:
        return 0;
    }
  });

  // Reverse if needed
  if (reverse) {
    products.reverse();
  }

  // Apply limit
  products = products.slice(0, limit);

  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  if (products.length === 0) {
    return (
      <div className={`${alignmentClasses[alignment]} py-20`}>
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-theme-bg to-theme-text-muted/20 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-theme-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-theme-heading mb-3">
            No Products Found
          </h2>
          <p className="text-theme-text-muted">
            This collection doesn&apos;t have any products yet. Check back soon
            for updates!
          </p>
        </div>
      </div>
    );
  }

  const content = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {products.map(({ node: product }) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.metadata?.studentType?.name || "[Student Type]"}
          eyebrow={product.metadata?.offering?.name || "[Offering]"}
          handle={product.handle}
          price={product.priceRange.minVariantPrice}
          image={product.images.edges[0]?.node}
          theme="accent"
          inheritTheme={false}
          maskOpacity={maskOpacity}
          alignment={alignment}
        />
      ))}
    </div>
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

export default ProductGrid;
