import { FC, ReactNode } from "react";
import { BuilderBlocks, type BuilderElement } from "@builder.io/react";
import { Navigation, Themeable, Alignable, Heroic } from "@repo/types";
import { TileContent } from "@repo/components";
import { ThemeProvider } from "../common/ThemeProvider";

interface VerticalNavProps extends Themeable, Alignable, Heroic {
  navigation?: Navigation;
  className?: string;
  children?: ReactNode;
  content?: { blocks: BuilderElement[] };
  builderBlock?: BuilderElement;
}

const VerticalNavigation: FC<VerticalNavProps> = ({
  navigation,
  className = "",
  theme = "light",
  inheritTheme = false,
  alignment = "center",
  headline,
  isHero = true,
  children,
  content,
  builderBlock,
}) => {
  const alignmentClass = alignment === "left" ? "text-left" : alignment === "right" ? "text-right" : "text-center";
  const TitleTag = isHero ? "h1" : "h2";

  const layoutContent = (
    <div className={`vertical-navigation w-full ${className}`}>
      {/* Full-width headline section */}
      {headline && (
        <div className={`mb-8 px-4 ${alignmentClass}`}>
          <TitleTag>
            {headline}
          </TitleTag>
        </div>
      )}
      
      {/* Main layout container */}
      <div className={`flex flex-col gap-8 ${alignment === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
        {/* Navigation sidebar */}
        {navigation?.data?.level1?.length && (
          <div className="lg:w-1/4 lg:min-w-[250px] flex-shrink-0">
            <nav className="bg-theme-bg/95 backdrop-blur-sm p-6 rounded-lg text-theme-text sticky top-4">
              <ul>
                {navigation.data.level1.map((item) => (
                  <li key={item.text}>
                    <a
                      href={item.href}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
        
        {/* Content area */}
        <div className="flex-1 min-h-[400px]">
          {content?.blocks ? (
            <BuilderBlocks
              parentElementId={builderBlock?.id}
              dataPath="content.blocks"
              blocks={content.blocks}
            />
          ) : children ? (
            children
          ) : (
            <div className="bg-theme-bg/50 rounded-lg p-8 text-center text-theme-text">
              <p className="text-lg mb-4">Content Area</p>
              <p className="text-sm opacity-75">
                Add content blocks in Builder.io or pass children to this component.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Only wrap in ThemeProvider if we have an explicit theme and inheritTheme is false
  if (inheritTheme || !theme) {
    return layoutContent;
  }

  return (
    <ThemeProvider theme={theme} inheritTheme={false}>
      {layoutContent}
    </ThemeProvider>
  );
};

export { VerticalNavigation };
export default VerticalNavigation;
