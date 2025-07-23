import React from "react";
import { Themeable, Heroic } from "@/types";
import { ThemeProvider } from "@/components/common/ThemeProvider";

interface Stat {
  number: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

interface StatsCounterProps extends Themeable, Heroic {
  description?: string;
  stats?: Stat[];
  description2?: string;
  className?: string;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({
  headline = "IN THE LAST 15 YEARS AS A SILVA METHOD INSTRUCTOR...",
  description = "I've had the privilege of guiding thousands of students through transformative meditation experiences.",
  stats = [
    {
      prefix: "I've served",
      number: "10,000",
      suffix: "+",
      label: "students.",
    },
    {
      number: "500",
      suffix: "+",
      label: "meditation classes taught",
    },
    {
      number: "95",
      suffix: "%",
      label: "student satisfaction rate",
    },
    {
      number: "15",
      suffix: "+",
      label: "years of teaching experience",
    },
  ],
  theme = "light",
  inheritTheme = false,
  isHero = false,
  description2 = "Every number represents real people who have discovered the power of Silva Method meditation and transformed their lives through mindfulness and intuitive development.",
  className = "",
}) => {
  const content = (
    <section
      className={`component-section py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:space-y-12">
          {/* Header */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {isHero ? <h1>{headline}</h1> : <h2>{headline}</h2>}
            {description && (
              <p className={`text-lg md:text-xl leading-relaxed`}>
                {description}
              </p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center flex flex-col items-center justify-center min-h-[160px]"
              >
                <div className="flex flex-col items-center space-y-2">
                  {stat.prefix && (
                    <p
                      className={`text-lg md:text-xl text-theme-text font-medium`}
                    >
                      {stat.prefix}
                    </p>
                  )}
                  <div
                    className={`text-4xl md:text-5xl lg:text-6xl font-bold text-theme-accent flex items-center`}
                  >
                    {stat.number}
                    {stat.suffix && (
                      <span className="text-theme-heading-alt">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-lg md:text-xl font-medium leading-relaxed`}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call-out text */}
          <div>{description2 && <p>{description2}</p>}</div>
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

export default StatsCounter;
