import React from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import "@repo/components/builder-registry";
import { Header } from "@repo/components";
import { Footer } from "@repo/components";
import { PageSEOHead } from "@repo/components";
import { GetStaticProps, GetStaticPaths } from "next";
import Custom404 from "./404";
import { SiteContext } from "@repo/types";
import { useRouter } from "next/router";


interface PageProps {
  page: any;
  siteContext: SiteContext | null;
}

// Directories that have their own page implementations
const EXCLUDED_DIRECTORIES = ["/blogs"];

// Pages that have their own implementations
const STANDALONE_PAGES = ["/404"];

// Helper function to check if a path should be excluded
const shouldExcludePath = (url: string): boolean => {
  if (!url) return true;

  // Check if the path starts with any of the excluded directories
  const isExcludedDirectory = EXCLUDED_DIRECTORIES.some((dir) =>
    url.startsWith(dir)
  );

  // Check if it's a standalone page
  const isStandalonePage = STANDALONE_PAGES.includes(url);

  return isExcludedDirectory || isStandalonePage;
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const siteContextName = process.env.NEXT_PUBLIC_SITE_CONTEXT_NAME || "sma";

  if (!siteContextName) {
    console.error("No site context name found in environment variable: NEXT_PUBLIC_SITE_CONTEXT_NAME");
  }

  const page = await builder
      .get("page", {
        userAttributes: {
          urlPath:
            "/" +
            (Array.isArray(params?.page)
              ? params.page.join("/")
              : params?.page || ""),
        },
        options: {
          enrich: true,
          includeRefs: true,
        },
      })
      .toPromise();

    const siteContext = await builder
      .get("site-context", {
        query: {
          name: siteContextName,
        },
        options: {
          enrich: true,
          includeRefs: true,
          noTargeting: true,
        },
      })
      .toPromise();

  if (!siteContext) {
    console.error("ERROR: No site context found for name:", siteContextName);
  }
  
  return {
    props: {
      page: page || null,
      siteContext: siteContext || null,
    },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await builder.getAll("page", {
    fields: "data.url",
    options: { noTargeting: true },
  });

  return {
    paths: pages
      .map((page) => String(page.data?.url))
      .filter((url) => !shouldExcludePath(url)),
    fallback: "blocking",
  };
};

const Page: React.FC<PageProps> = ({ page, siteContext }) => {
  const isPreviewing = useIsPreviewing();
  const router = useRouter();

  const formatLastUpdatedDate = (dateInput: any): string => {
    if (!dateInput) return "Date not available";

    const date = new Date(dateInput);

    // Check if date is valid
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const lastUpdatedDate = formatLastUpdatedDate(page?.lastUpdated);

  if (!page && !isPreviewing) {
    return <Custom404 />;
  }

  return (
    <>
      <PageSEOHead page={page} type="website">
        <meta name="robots" content="noindex" />
      </PageSEOHead>
      <div className="flex flex-col min-h-screen">
        <Header
          navigation1={page?.data?.headerNavigation1?.value}
          navigation2={page?.data?.headerNavigation2?.value}
        />
        <main id="main-content" className="flex-grow" role="main">
          <BuilderComponent
            model="page"
            content={page || undefined}
            options={{
              locale: router.locale,
              enrich: true,
            }}
            data={{
              siteContext: siteContext,
              content: page,
              lastUpdatedDate: lastUpdatedDate,
            }}
          />
        </main>
        <Footer navigation={page?.data?.footerNavigation?.value} />
      </div>
    </>
  );
};

export default Page;
