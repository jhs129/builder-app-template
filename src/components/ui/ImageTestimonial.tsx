import { FC, ReactNode } from "react";
import Image from "next/image";
import { Themeable } from "../../types/cms";
import { ThemeProvider } from "@/components/common/ThemeProvider";

interface ImageTestimonialProps extends Themeable {
  eyebrow?: string;
  image?: string | File | { url: string };
  name: string;
  title: string;
  quote: string;
  children?: ReactNode;
  className?: string;
}

const ImageTestimonial: FC<ImageTestimonialProps> = ({
  eyebrow,
  image,
  name,
  title,
  quote,
  children,
  className = "",
  theme = "light",
  inheritTheme = false,
}) => {
  const getImageUrl = (img?: string | File | { url: string }): string => {
    if (!img)
      return "https://placehold.co/400x500/e5e7eb/6b7280.png?text=Testimonial+Image";
    if (typeof img === "string") return img;
    if (img instanceof File) return URL.createObjectURL(img);
    return img.url;
  };

  const imageUrl = getImageUrl(image);

  const content = (
    <div className={`flex justify-center items-center p-8 ${className}`}>
      <div id="testimonial-container" className="relative w-full max-w-[420px]">
        {eyebrow && (
          <div
            id="testimonial-eyebrow"
            className="mb-4 md:absolute md:-top-4 md:left-1/2 md:transform md:-translate-x-1/2 z-20"
          >
            <h6 className="md:absolute md:-left-96 md:mt-4">{eyebrow}</h6>
          </div>
        )}

        {/* Image container - stacked on mobile, overlapped on desktop */}
        <div
          id="testimonial-image"
          className="relative w-full h-60 md:absolute md:-left-48 md:top-8 md:w-60 md:h-80 md:overflow-hidden md:z-10 md:shadow-xl"
        >
          <Image
            src={imageUrl}
            alt={`${name} testimonial`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 160px"
          />
        </div>

        {/* Content area with background */}
        <div id="testimonial-card" className="min-h-[24rem] bg-theme-bg-alt text-theme-text-alt">
          <div
            id="testimonial-content"
            className="p-6 flex flex-col justify-center md:p-20 md:h-full"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <h6 className="text-theme-heading-alt">
                  <span className="font-accent">{name}</span> - {title}
                </h6>
              </div>
              <blockquote className="text-lg leading-tight pl-4 font-light text-theme-text-alt">
                &ldquo;{quote}&rdquo;
              </blockquote>
            </div>
            {children && <div className="mt-auto">{children}</div>}
          </div>
        </div>
      </div>
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

export default ImageTestimonial;
