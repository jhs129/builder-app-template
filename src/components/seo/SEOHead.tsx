import Head from "next/head";
import { ReactNode } from "react";
import { useSiteContext } from "@/contexts/SiteContextProvider";
import { useRouter } from "next/router";
import {
  OrganizationSchemaData,
  WebsiteSchemaData,
  WebPageSchemaData,
} from "@/components/seo";

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "event" | "product" | "profile" | "place";
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
  keywords?: string | string[];
  children?: ReactNode;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  image,
  url,
  type = "website",
  publishedDate,
  modifiedDate,
  author,
  keywords,
  children,
}) => {
  const { siteContext } = useSiteContext();
  const router = useRouter();
  const pathname = router.asPath;
  const currentUrl = url || `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`;

  const fullTitle = `${siteContext?.data.siteName} | ${title}`;

  let isRoot = false;
  if (pathname === "/") {
    isRoot = true;
  }

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteContext?.data.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Article specific meta tags */}
      {type === "article" && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {type === "article" && (
        <meta
          property="article:author"
          content={
            author ||
            siteContext?.data?.organization?.name ||
            "[siteContext.data.organization.name]"
          }
        />
      )}

      {/* Additional head content (e.g., schema data) */}
      {!isRoot && (
        <>
          <OrganizationSchemaData
            name={
              siteContext?.data?.organization?.name ||
              "[siteContext.data.organization.name]"
            }
            url={process.env.NEXT_PUBLIC_SITE_URL || "env.NEXT_PUBLIC_SITE_URL"}
            description={
              siteContext?.data?.organization?.description ||
              "[siteContext.data.organization.description]"
            }
            sameAs={siteContext?.data?.socialNetworks?.map(
              (network) => network.href
            )}
          />
          <WebsiteSchemaData
            name={siteContext?.data?.siteName || "[siteContext.data.siteName]"}
            url={process.env.NEXT_PUBLIC_SITE_URL || "env.NEXT_PUBLIC_SITE_URL"}
            description={
              siteContext?.data?.organization?.description ||
              "[siteContext.data.organization.description]"
            }
            publisher={{
              name:
                siteContext?.data?.siteName || "[siteContext.data.siteName]",
              url:
                process.env.NEXT_PUBLIC_SITE_URL || "env.NEXT_PUBLIC_SITE_URL",
            }}
            inLanguage={"en-US"}
          />
        </>
      )}

      <WebPageSchemaData
        name={fullTitle}
        url={process.env.NEXT_PUBLIC_SITE_URL || "env.NEXT_PUBLIC_SITE_URL"}
        description={description}
        datePublished={publishedDate || new Date().toISOString()}
        dateModified={modifiedDate || new Date().toISOString()}
        inLanguage="en-US"
        isPartOf={
          process.env.NEXT_PUBLIC_SITE_URL || "env.NEXT_PUBLIC_SITE_URL"
        }
        image={image}
        keywords={
          Array.isArray(keywords) ? keywords : keywords ? [keywords] : undefined
        }
        lastReviewed={modifiedDate || new Date().toISOString()}
      />

      {children}
    </Head>
  );
};

