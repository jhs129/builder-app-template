import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CommerceImage, CommercePrice, Themeable, Opaque, Alignable, TextAlignments } from "@/types";
import { ThemeProvider } from "@/components/common/ThemeProvider";

interface ProductCardProps extends Themeable, Opaque, Alignable {
  id: string;
  title: string;
  handle: string;
  price: CommercePrice;
  image?: CommerceImage;
  eyebrow?: string;
}

const formatPrice = (amount: string, currencyCode: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
};

const alignmentClasses: Record<TextAlignments, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
} as const;

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  eyebrow,
  handle,
  theme = "light",
  inheritTheme = false,
  maskOpacity = 0,
  alignment = "center",
}) => {


  const cardContent = (
    <Link href={`/products/${handle}`} className="block group">
      <div className="component-card flex flex-col rounded-lg overflow-hidden bg-theme-bg text-theme-text group-hover:shadow-lg transition-shadow">
          {/* Image */}
          {image && (
            <div className="aspect-[4/3] w-full overflow-hidden relative">
              <Image
                src={image.url}
                alt={image.altText || title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 380px) 100vw, 380px"
              />
              {maskOpacity > 0 && (
                <div 
                  className="absolute inset-0 bg-black" 
                  style={{ opacity: maskOpacity / 100 }}
                />
              )}
            </div>
          )}

          {/* Content */}
          <div className={`p-6 flex flex-col flex-grow ${alignmentClasses[alignment]}`}>
            {/* Eyebrow */}
            {eyebrow && (
              <h6 className="mb-2 text-sm font-semibold uppercase tracking-wide text-theme-heading-alt">
                {eyebrow}
              </h6>
            )}

            {/* Title */}
            <h3 className="mb-4 text-xl font-bold leading-tight flex-grow text-theme-heading">
              {title}
            </h3>

            {/* Price Display */}
            <div className="btn btn-primary group-hover:btn-primary-hover">
              {formatPrice(price.amount, price.currencyCode)}
            </div>
          </div>
        </div>
    </Link>
  );

  const content = cardContent;
  // Only wrap in ThemeProvider if we have an explicit theme and inheritTheme is false
  if (inheritTheme || !theme) {
    return content;
  }

  return (
    <ThemeProvider theme={theme} inheritTheme={false} className="contents">
      {content}
    </ThemeProvider>
  );
};

export default ProductCard;
