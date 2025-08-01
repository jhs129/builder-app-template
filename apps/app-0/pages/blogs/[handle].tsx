import React from "react";
import {
  BuilderComponent,
  BuilderContent,
  builder,
  useIsPreviewing,
} from "@builder.io/react";
import { DefaultHeader } from "@repo/components";
import { DefaultFooter } from "@repo/components";
import { Banner100 } from "@repo/components";
import { PageSEOHead } from "@repo/components";
import { GetStaticProps, GetStaticPaths } from "next";
import Custom404 from "../404";
import { SiteContext } from "@repo/types";
import { ThemeProvider } from "@repo/components";
import { TileCTA } from "@repo/components";
import { ArticleSchemaData } from "@repo/components";
import { articleToSchemaData } from "@repo/components";

interface BlogPageProps {
  article: any;
  siteContext: SiteContext | null;
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({
  params,
}) => {
  const handle = params?.handle as string;

  const [article, siteContext] = await Promise.all([
    builder
      .get("article", {
        query: {
          "data.handle": handle,
        },
        options: {
          enrich: true,
          includeRefs: true,
        },
      })
      .toPromise(),
    builder
      .get("site-context", {
        query: {
          name: process.env.NEXT_PUBLIC_SITE_CONTEXT_NAME || "sma",
        },
        options: {
          enrich: true,
          includeRefs: true,
        },
      })
      .toPromise(),
  ]);

  return {
    props: {
      article: article || null,
      siteContext: siteContext || null,
    },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await builder.getAll("article", {
    fields: "data.handle",
    options: { noTargeting: true },
  });

  return {
    paths: articles
      .map((article) => `/blogs/${article.data?.handle}`)
      .filter((path) => path.includes("/blogs/")),
    fallback: "blocking",
  };
};

const formatDate = (timestamp: number) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogPage: React.FC<BlogPageProps> = ({ article, siteContext }) => {
  const isPreviewing = useIsPreviewing();

  if (!article && !isPreviewing) {
    return <Custom404 />;
  }

  const publishedDate = formatDate(
    article?.data?.publishDate || article?.lastUpdated
  );

  // Generate article schema data
  const schemaProps = article
    ? articleToSchemaData(
        {
          handle: article.data?.handle || "",
          title: article.data?.title || "",
          subtitle: article.data?.subtitle || "",
          image: article.data?.image || "",
          excerpt: article.data?.excerpt || "",
          metadata: {
            description:
              article.data?.description || article.data?.excerpt || "",
            keywords: article.data?.keywords || [],
          },
          publishDate: new Date(
            article.data?.publishDate || article.lastUpdated || Date.now()
          ).toISOString(),
          blocks: article.data?.blocks || [],
        },
        siteContext || undefined,
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_SITE_URL
      )
    : null;

  return (
    <>
      <PageSEOHead page={article} type="article">
        {schemaProps && <ArticleSchemaData {...(schemaProps as any)} />}
      </PageSEOHead>
      <div className="flex flex-col min-h-screen">
        <DefaultHeader />
        <main id="main-content" className="flex-grow" role="main">
          <ThemeProvider>
            <BuilderContent model="article" content={article || undefined}>
              {(content, loading, fullContent) => (
                <>
                  <Banner100
                    backgroundImage={
                      fullContent?.data?.image ||
                      "https://placehold.co/800x600/EEE/5ce1e6.png"
                    }
                    backgroundType="image"
                    alignment="center"
                    theme="accent"
                    maskOpacity={0}
                  >
                    <TileCTA
                      eyebrow={fullContent?.data?.subtitle || ""}
                      headline={fullContent?.data?.title || ""}
                      description={fullContent?.data?.excerpt || ""}
                      theme="transparent-dark"
                      isHero={true}
                      alignment="left"
                      maskOpacity={0.1}
                      inheritTheme={false}
                    />
                  </Banner100>
                  <article className="container mx-auto px-4 py-8">
                    <h6>Published: {publishedDate}</h6>

                    <BuilderComponent
                      model="article"
                      content={fullContent}
                      options={{
                        enrich: true,
                      }}
                    />
                  </article>
                </>
              )}
            </BuilderContent>
          </ThemeProvider>
        </main>
        <DefaultFooter />
      </div>
    </>
  );
};

export default BlogPage;
