import { ReactNode } from "react";
import { SEOHead } from "./SEOHead";
import { Page } from "@repo/types";
import { useRouter } from "next/router";

interface PageSEOHeadProps {
  page: Page;
  image?: string;
  url?: string;
  type?: "website" | "article" | "event" | "product" | "profile" | "place";
  publishedDate?: string;
  author?: string;
  children?: ReactNode;
}

export const PageSEOHead: React.FC<PageSEOHeadProps> = ({
  page,
  children,
  image,
  url,
  type = "website",
  publishedDate,
  author,
}) => {
  const router = useRouter();
  const fullUrl = url || `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;
  return (
    <SEOHead
      title={page?.data.title || "[page.data.title]"}
      description={page?.data.metadata?.description || "[page.data.metadata.description]"}
      image={image || page?.data.image}
      url={fullUrl}
      type={type}
      publishedDate={publishedDate || page?.firstPublished?.toString()}
      modifiedDate={page?.lastUpdated?.toString()}
      author={author}
      keywords={page?.data?.metadata?.keywords}
    >
      {children}
    </SEOHead>
  );
};

export default PageSEOHead;
