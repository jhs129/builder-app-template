import { FC } from "react";
import TileCTA from "../cta/TileCTA";
import { Navigation, Themeable, Opaque, Heroic, ModelReference } from "@/types";
import Image from "next/image";
import VerticalNavigation from "../navigation/VerticalNavigation";
import { ThemeProvider } from "@/components/common/ThemeProvider";

interface TileHeroProps extends Themeable, Opaque, Heroic {
  eyebrow?: string;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
  heroImage: string;
  navigation?: Navigation | ModelReference;
}

const isModelReference = (
  nav: Navigation | ModelReference | undefined
): nav is ModelReference => {
  return nav !== undefined && "@type" in nav && "value" in nav;
};

const TileHero: FC<TileHeroProps> = ({
  eyebrow,
  headline,
  description,
  buttonLabel,
  buttonHref,
  heroImage,
  navigation,
  theme = "light",
  inheritTheme = false,
  isHero = true,
  maskOpacity = 0.3,
}) => {
  const navigationData = isModelReference(navigation)
    ? (navigation.value as Navigation)
    : navigation;

  const content = (
    <section className="component-section">
      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden">
        <div className="relative h-[300px] w-full">
          <Image
            src={heroImage}
            alt="Hero background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div 
            className="absolute inset-0 bg-theme-bg"
            style={{ opacity: maskOpacity }}
          />
        </div>
        <div className="p-6">
          <TileCTA
            eyebrow={eyebrow || "HEY FRIEND"}
            headline={headline || "Let's Launch Your Day Dream"}
            description={description}
            buttonLabel={buttonLabel || "LEARN MORE"}
            buttonHref={buttonHref || "#"}
            isHero={isHero}
            inheritTheme={true}
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block relative min-h-[600px]">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={heroImage}
            alt="Hero background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div 
            className="absolute inset-0 bg-theme-bg"
            style={{ opacity: maskOpacity }}
          />
        </div>
        <div className="relative min-h-[600px] flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 items-center">
              <TileCTA
                eyebrow={eyebrow || "HEY FRIEND"}
                headline={headline || "Let's Launch Your Day Dream"}
                isHero={isHero}
                description={description}
                buttonLabel={buttonLabel || "LEARN MORE"}
                buttonHref={buttonHref || "#"}
                inheritTheme={true}
              />
              {navigationData && (
                <div className="hidden lg:flex justify-end">
                  <VerticalNavigation
                    navigation={navigationData}
                    theme="light"
                  />
                </div>
              )}
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

export default TileHero;
