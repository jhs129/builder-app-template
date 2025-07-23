import { FC } from "react";
import { Navigation, Themeable } from "@/types";
import { ThemeProvider } from "@/components/common/ThemeProvider";

interface VerticalNavProps extends Themeable {
  navigation?: Navigation;
  className?: string;
}

const VerticalNavigation: FC<VerticalNavProps> = ({
  navigation,
  className = "",
  theme = "light",
  inheritTheme = false,
}) => {
  if (!navigation?.data?.level1?.length) return null;

  const content = (
    <nav
      className={`bg-theme-bg/95 backdrop-blur-sm p-8 rounded-lg text-theme-text ${className}`}
    >
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
