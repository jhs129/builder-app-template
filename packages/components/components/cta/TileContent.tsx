import { FC, ReactNode } from "react";
import { Themeable, Alignable, TextAlignments, Heroic } from "@repo/types";
import { ThemeProvider } from "../common/ThemeProvider";

interface TileContentProps extends Themeable, Alignable, Heroic {
  description: string;
  className?: string;
  children?: ReactNode;
}

const alignmentClasses: Record<TextAlignments, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
} as const;

const childrenAlignmentClasses: Record<TextAlignments, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
} as const;

const TileContent: FC<TileContentProps> = ({
  headline,
  isHero = false,
  description,
  alignment = "center",
  theme = "light",
  inheritTheme = false,
  className = "",
  children,
}) => {
  const TitleTag = isHero ? "h1" : "h2";

  const content = (
    <div
      className={`component-tile flex flex-col rounded-lg p-8 ${alignmentClasses[alignment]} bg-theme-bg text-theme-text ${className}`}
    >
      {/* Title */}
      <TitleTag className="mb-4 font-bold leading-tight text-theme-heading">
        {headline}
      </TitleTag>

      {/* Description */}
      <div
        className="mb-6 text-base leading-relaxed text-theme-text"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {/* Children (Buttons) */}
      {children && (
        <div className={`flex flex-col sm:flex-row gap-4 w-full ${childrenAlignmentClasses[alignment]}`}>
          {children}
        </div>
      )}
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

export { TileContent };
export default TileContent;