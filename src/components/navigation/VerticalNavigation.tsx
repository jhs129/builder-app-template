import { FC } from "react";
import { Navigation, Themeable, Heroic, Alignable } from "@/types";
import { ThemeProvider } from "@/components/common/ThemeProvider";

interface VerticalNavProps extends Themeable, Heroic, Alignable {
  navigation?: Navigation;
  className?: string;
}

const VerticalNavigation: FC<VerticalNavProps> = ({
  navigation,
  className = "",
  theme = "light",
  inheritTheme = false,
  headline,
  isHero = true,
  alignment = "center",
}) => {
  if (!navigation?.data?.level1?.length) return null;

  const alignmentClass = alignment === "left" ? "text-left" : alignment === "right" ? "text-right" : "text-center";

  const content = (
    <div className={`${className} ${alignmentClass}`}>
      {headline && (
        <div className="mb-6">
          {isHero ? (
            <h1 className="text-2xl font-bold text-theme-heading">{headline}</h1>
          ) : (
            <h2 className="text-2xl font-bold text-theme-heading">{headline}</h2>
          )}
        </div>
      )}
      <nav className="bg-theme-bg/95 backdrop-blur-sm p-8 rounded-lg text-theme-text">
        <ul className="space-y-6">
          {navigation.data.level1.map((item) => (
            <li key={item.text}>
              <a
                href={item.href}
                className="font-bold text-[11px] tracking-[2.2px] uppercase transition-colors text-theme-text hover:text-theme-link-hover"
              >
                {item.text} →
              </a>
            </li>
          ))}
        </ul>
      </nav>
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

export default VerticalNavigation;
