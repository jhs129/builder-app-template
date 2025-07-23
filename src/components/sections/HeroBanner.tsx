import React from "react";
import Button from "@/components/ui/Button";
import { Opaque, Themeable, Heroic } from "@/types";

interface FeatureItemProps {
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <div className="flex items-center gap-2">
    <svg
      className="w-5 h-5 text-accent-green"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
    <span>{text}</span>
  </div>
);

interface HeroBannerProps extends Opaque, Themeable, Heroic {
  subheadline?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  textAlignment?: "left" | "center" | "right";
  className?: string;
  features?: (string | { text: string })[] | null;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  headline: title = "Unlock Your Mind's Extraordinary Potential",
  subheadline: subtitle = "Silva Method Atlanta & Western North Carolina",
  isHero = true,
  description = "Learn the proven Silva Method meditation techniques that have transformed millions of lives. Develop your intuition, enhance focus, and achieve lasting inner peace through our guided programs.",
  ctaText = "Book Your First Class",
  ctaUrl = "/book-class",
  secondaryCtaText = "Learn More",
  secondaryCtaUrl = "/about",
  backgroundImage = "https://images.pexels.com/photos/13865962/pexels-photo-13865962.jpeg",
  backgroundVideo,
  maskOpacity = 0.6,
  textAlignment = "left",
  className = "",
  features,
}) => {
  const backgroundStyle = backgroundVideo
    ? {}
    : {
        backgroundImage: `linear-gradient(rgba(29, 15, 52, ${maskOpacity}), rgba(102, 16, 242, ${maskOpacity * 0.5})), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };

  const textAlignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[textAlignment];

  const Headline = isHero ? "h1" : "h2";

  return (
    <section
      className={`component-section relative min-h-[50vh] md:min-h-[55vh] lg:min-h-[70vh] flex items-center justify-center py-8 md:py-12 lg:py-16 px-4 ${className}`}
      style={backgroundStyle}
    >
      {backgroundVideo && (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary-accent"
            style={{ opacity: maskOpacity }}
          />
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto">
        <div
          className={`space-y-4 md:space-y-5 lg:space-y-6 ${textAlignmentClass}`}
        >
          {subtitle && (
            <p className="text-theme-accent font-medium text-base md:text-lg tracking-wide uppercase">
              {subtitle}
            </p>
          )}

          <Headline className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
            {title}
          </Headline>

          {description && (
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl leading-relaxed">
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
            <Button label={ctaText} href={ctaUrl} />

            {secondaryCtaText && (
              <Button label={secondaryCtaText} href={secondaryCtaUrl} />
            )}
          </div>

          {features && features.length > 0 && (
            <div className="pt-4 md:pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 text-gray-300">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  text={typeof feature === "string" ? feature : feature.text}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce bg-white/20 rounded-full p-2">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
