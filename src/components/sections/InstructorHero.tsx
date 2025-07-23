import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Themeable, Heroic } from "@/types";
import { ThemeProvider } from "@/components/common/ThemeProvider";

interface InstructorHeroProps extends Themeable, Heroic {
  greeting?: string;
  tagline?: string;
  description?: string;
  instructorImage?: string;
  ctaText?: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  className?: string;
}

export const InstructorHero: React.FC<InstructorHeroProps> = ({
  greeting = "Hey there",
  headline = "I'm Your Instructor!",
  tagline = "I help students unlock their mind's potential through Silva Method techniques.",
  description = "With years of experience in meditation and mindfulness training, I guide students through transformative Silva Method practices that have changed millions of lives worldwide.",
  instructorImage = "https://placehold.co/600x400.png",
  ctaText = "Start Your Journey",
  ctaUrl = "/get-started",
  secondaryCtaText = "Learn About Silva Method",
  secondaryCtaUrl = "/about",
  theme = "light",
  inheritTheme = false,
  isHero = true,
  className = "",
}) => {
  const content = (
    <section
      className={`component-section py-12 md:py-20 lg:py-24 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 space-y-6">
            <div className="space-y-4">
              <h5>{greeting}</h5>
              {isHero ? <h1>{headline}</h1> : <h2>{headline}</h2>}
              <p>{tagline}</p>
            </div>

            {description && <p>{description}</p>}

            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 pt-6">
              <Button label={ctaText} href={ctaUrl} />
              {secondaryCtaText && (
                <Button
                  label={secondaryCtaText}
                  href={secondaryCtaUrl}
                  outlined
                />
              )}
            </div>
          </div>

          {/* Instructor Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] relative">
                <Image
                  src={instructorImage}
                  alt={`${headline.replace("I'm ", "")} - Instructor`}
                  fill
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
                  priority
                  className="object-cover"
                  quality={90}
                />
              </div>
            </div>
          </div>
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

export default InstructorHero;
