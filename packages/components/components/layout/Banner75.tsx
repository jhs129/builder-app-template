import { BuilderBlocks, type BuilderElement } from "@builder.io/react";
import { Themeable, Alignable, Reversible, TextAlignments, Opaque, getLayoutReversalClasses } from "@repo/types";
import { ReactNode } from "react";
import { ThemeProvider } from "../common/ThemeProvider";
import Banner100 from "./Banner100";

interface Banner75Props extends Themeable, Alignable, Reversible, Opaque {
  builderBlock?: BuilderElement;
  column1?: { blocks: BuilderElement[] };
  column2?: { blocks: BuilderElement[] };
  backgroundType?: "none" | "image" | "video" | "youtube";
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundVideoId?: string;
  children?: ReactNode;
  fullWidth?: boolean;
  // Keep legacy prop for backward compatibility
  reverseLayout?: boolean;
}

const alignmentClasses: Record<TextAlignments, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
} as const;

const Banner75: React.FC<Banner75Props> = ({
  builderBlock,
  column1,
  column2,
  backgroundType = "none",
  backgroundImage,
  backgroundVideo: videoFile,
  backgroundVideoId: videoEmbedId,
  maskOpacity = 0.4,
  children,
  fullWidth,
  reverseLayout = false,
  layoutReversal,
  alignment = "center",
  theme = "light",
  inheritTheme = false,
}) => {
  // Handle backward compatibility: if reverseLayout is true but no layoutReversal is set
  const effectiveLayoutReversal = layoutReversal || (reverseLayout ? "mobile-only" : "none");
  const bannerContent = (
    <Banner100
      backgroundType={backgroundType}
      backgroundImage={backgroundImage}
      backgroundVideo={videoFile}
      backgroundVideoId={videoEmbedId}
      maskOpacity={maskOpacity}
      fullWidth={fullWidth}
      alignment={alignment}
      inheritTheme={true}
    >
      <div
        className={`flex h-full w-full ${getLayoutReversalClasses(effectiveLayoutReversal)} ${alignmentClasses[alignment]}`}
      >
        {/* Column 1 - 75% width */}
        <div className="w-full md:w-3/4 flex justify-center overflow-hidden">
          {builderBlock && column1 ? (
            <BuilderBlocks
              className="w-full h-full flex items-center justify-center"
              parentElementId={builderBlock.id}
              dataPath="column1.blocks"
              blocks={column1.blocks}
              fieldName="column1"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="max-w-2xl text-center">
                <h1 className="text-theme-heading mb-6">75% Content Column</h1>
                <p className="text-theme-text mb-6">
                  This is the main content area that takes up 75% of the banner width on desktop.
                  It&apos;s designed for primary content like headlines, descriptions, and call-to-action buttons.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Column 2 - 25% width */}
        <div className="w-full md:w-1/4 flex justify-center overflow-hidden">
          {builderBlock && column2 ? (
            <BuilderBlocks
              className="w-full h-full flex items-center justify-center"
              parentElementId={builderBlock.id}
              dataPath="column2.blocks"
              blocks={column2.blocks}
              fieldName="column2"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center">
                <h3 className="text-theme-heading-alt mb-4">25% Column</h3>
                <p className="text-theme-text text-sm">
                  Secondary content area for supporting elements like images or additional information.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Render children if no columns are provided */}
      {!column1 && !column2 && children}
    </Banner100>
  );

  // Only wrap in ThemeProvider if we have an explicit theme and inheritTheme is false
  if (inheritTheme || !theme) {
    return bannerContent;
  }

  return (
    <ThemeProvider theme={theme} inheritTheme={false}>
      {bannerContent}
    </ThemeProvider>
  );
};

export { Banner75 };
export default Banner75;