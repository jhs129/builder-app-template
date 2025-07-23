import Image from "next/image";
import Button from "../ui/Button";
import { Themeable, Alignable, Opaque, TextAlignments, Heroic } from "@/types";
import { ThemeProvider } from "@/components/common/ThemeProvider";

interface CollectionTileProps extends Themeable, Alignable, Opaque, Heroic {
  description?: string;
  imageUrl: string;
  subheadline: string;
  location?: string;
  ctaText: string;
  href?: string;
  outlined?: boolean;
}

const alignmentClasses: Record<TextAlignments, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
} as const;

export default function CollectionTile({
  headline,
  description,
  imageUrl,
  subheadline,
  location,
  ctaText,
  href = "#",
  theme = "light",
  inheritTheme = false,
  alignment = "left",
  maskOpacity = 0.3,
  outlined = true,
  isHero = false,
}: CollectionTileProps) {
  const content = (
    <div className={`component-tile ${isHero ? "hero-tile" : ""} bg-theme-bg`}>
      {/* Image */}
      <div className="relative h-[320px] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={headline || "Image Alt Text"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          quality={85}
        />
        <div
          className="absolute inset-0 bg-theme-bg-alt"
          style={{ opacity: maskOpacity }}
        />
        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-primary-light">{headline}</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 flex flex-col ${alignmentClasses[alignment]}`}>
        {location && typeof location === "string" && location.trim() && (
          <h5>{location}</h5>
        )}
        <h6 className="text-theme-text">{subheadline}</h6>
        {description &&
          typeof description === "string" &&
          description.trim() && (
            <div
              className="h-[120px] md:h-20 line-clamp-5 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

        <div className="mt-4">
          <Button
            href={`/collections/${href}`}
            label={ctaText}
            inheritTheme={true}
            outlined={outlined}
          />
        </div>
      </div>
    </div>
  );

  // Only wrap in ThemeProvider if we have an explicit theme and inheritTheme is false
  if (inheritTheme || !theme) {
    return content;
  }

  return (
    <ThemeProvider
      theme={theme}
      inheritTheme={false}
      className="rounded-xl shadow-xl"
    >
      {content}
    </ThemeProvider>
  );
}
