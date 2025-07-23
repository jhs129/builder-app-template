import React from "react";
import Image from "next/image";
import { Themeable, Heroic } from "@/types";
import { ThemeProvider } from "@/components/common/ThemeProvider";

interface MediaLogo {
  name: string;
  imageUrl: string;
  websiteUrl?: string;
}

interface MediaMentionsProps extends Themeable, Heroic {
  subtitle?: string;
  logos?: MediaLogo[];
  backgroundColor?: string;
  className?: string;
}

export const MediaMentions: React.FC<MediaMentionsProps> = ({
  headline = "FEATURED IN",
  subtitle = "As seen in these leading publications",
  logos = [
    {
      name: "Forbes",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F3237eecbbb744c568763d94f250d4536%2F9eb3c2e4a97c41a697f78867aff2d6fe?format=webp&width=120",
    },
    {
      name: "Entrepreneur",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F3237eecbbb744c568763d94f250d4536%2F9eb3c2e4a97c41a697f78867aff2d6fe?format=webp&width=120",
    },
    {
      name: "Inc.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F3237eecbbb744c568763d94f250d4536%2F9eb3c2e4a97c41a697f78867aff2d6fe?format=webp&width=120",
    },
    {
      name: "Mindful",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F3237eecbbb744c568763d94f250d4536%2F9eb3c2e4a97c41a697f78867aff2d6fe?format=webp&width=120",
    },
    {
      name: "Psychology Today",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F3237eecbbb744c568763d94f250d4536%2F9eb3c2e4a97c41a697f78867aff2d6fe?format=webp&width=120",
    },
  ],
  backgroundColor = "bg-white",
  theme = "light",
  inheritTheme = false,
  isHero = false,
  className = "",
}) => {
  const content = (
    <section className={`component-section py-12 md:py-16 ${backgroundColor} ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Header */}
          <div className="space-y-2">
            {isHero ? <h1 className="text-sm md:text-base font-semibold text-primary-accent tracking-wider uppercase">{headline}</h1> : <h2 className="text-sm md:text-base font-semibold text-primary-accent tracking-wider uppercase">{headline}</h2>}
            {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
          </div>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center">
            {logos.map((logo, index) => (
              <div key={index} className="relative w-32 h-12">
                {logo.websiteUrl ? (
                  <a
                    href={logo.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full transition-all duration-300 hover:scale-105"
                  >
                    <Image
                      src={logo.imageUrl}
                      alt={`${logo.name} logo`}
                      fill
                      sizes="128px"
                      style={{
                        objectFit: "contain",
                      }}
                      className="grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                    />
                  </a>
                ) : (
                  <Image
                    src={logo.imageUrl}
                    alt={`${logo.name} logo`}
                    fill
                    sizes="128px"
                    style={{
                      objectFit: "contain",
                    }}
                    className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Divider line */}
          <div className="pt-8">
            <div className="w-20 h-px bg-gradient-to-r from-primary-accent to-accent-green mx-auto"></div>
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

export default MediaMentions;
