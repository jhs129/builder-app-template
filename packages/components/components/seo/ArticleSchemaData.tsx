import React from "react";
import type { ArticleSchema } from "@repo/types";

export type ArticleSchemaDataProps = Omit<
  ArticleSchema,
  "@context" | "@type" | "@id"
> & {
  "@type"?: "Article" | "BlogPosting" | "NewsArticle";
  id: string;
  publisher?: Omit<NonNullable<ArticleSchema["publisher"]>, "@type"> & {
    logo?: Omit<
      NonNullable<NonNullable<ArticleSchema["publisher"]>["logo"]>,
      "@type"
    >;
  };
  author?: Array<Omit<NonNullable<ArticleSchema["author"]>[number], "@type">>;
  mainEntityOfPage?: Omit<
    NonNullable<ArticleSchema["mainEntityOfPage"]>,
    "@type"
  >;
  isPartOf?: Omit<NonNullable<ArticleSchema["isPartOf"]>, "@type">;
  about?: Array<Omit<NonNullable<ArticleSchema["about"]>[number], "@type">>;
};

export const ArticleSchemaData: React.FC<ArticleSchemaDataProps> = ({
  "@type": schemaType = "BlogPosting",
  id,
  headline,
  alternativeHeadline,
  description,
  image,
  author,
  publisher,
  datePublished,
  dateModified,
  url,
  mainEntityOfPage,
  keywords,
  articleSection,
  wordCount,
  inLanguage,
  isPartOf,
  about,
}) => {
  const schemaData: ArticleSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": id,
    headline,
    url,
    datePublished,
    ...(alternativeHeadline && { alternativeHeadline }),
    ...(description && { description }),
    ...(image && { image }),
    ...(dateModified && { dateModified }),
    ...(keywords && { keywords }),
    ...(articleSection && { articleSection }),
    ...(wordCount && { wordCount }),
    ...(inLanguage && { inLanguage }),
    ...(author && {
      author: author.map((auth) => ({
        "@type": "Person",
        name: auth.name,
        ...(auth.url && { url: auth.url }),
        ...(auth.image && { image: auth.image }),
        ...(auth.sameAs && { sameAs: auth.sameAs }),
      })),
    }),
    ...(publisher && {
      publisher: {
        "@type": "Organization",
        name: publisher.name,
        ...(publisher.url && { url: publisher.url }),
        ...(publisher.logo && {
          logo: {
            "@type": "ImageObject",
            url: publisher.logo.url,
            ...(publisher.logo.width && { width: publisher.logo.width }),
            ...(publisher.logo.height && { height: publisher.logo.height }),
          },
        }),
      },
    }),
    ...(mainEntityOfPage && {
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": mainEntityOfPage["@id"],
      },
    }),
    ...(isPartOf && {
      isPartOf: {
        "@type": "WebSite",
        "@id": isPartOf["@id"],
        ...(isPartOf.name && { name: isPartOf.name }),
        ...(isPartOf.url && { url: isPartOf.url }),
      },
    }),
    ...(about && {
      about: about.map((topic) => ({
        "@type": "Thing",
        name: topic.name,
        ...(topic.url && { url: topic.url }),
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
};
