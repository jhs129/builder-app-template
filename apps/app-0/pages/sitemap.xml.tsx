import type { GetServerSideProps } from "next";
import { builder } from "@builder.io/react";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (!res) {
    return { props: {} };
  }

  // Add cache headers for better performance
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

  // Parse excluded paths from environment variable
  const excludedPaths = process.env.SITEMAP_EXCLUDED_PATHS
    ? process.env.SITEMAP_EXCLUDED_PATHS.split(",").map((path) => path.trim())
    : ["/do-not-publish/"]; // Default fallback

  const locale = "en_US";
  let pages: any[] = [];
  let posts: any[] = [];

  try {
    // Get data from all sources in parallel with error handling
    const results = await Promise.allSettled([
      // Get pages from Builder.io
      builder.getAll("page", {
        locale: locale,
        fields: "data.url,lastUpdated",
        options: { noTargeting: true },
      }),
      // Get blog posts from Builder.io
      builder.getAll("article", {
        locale: locale,
        fields: "data.handle,lastUpdated",
        options: { noTargeting: true },
      }),
    ]);

    // Extract results, using empty arrays as fallbacks
    pages = results[0].status === "fulfilled" ? results[0].value || [] : [];
    posts = results[1].status === "fulfilled" ? results[1].value || [] : [];

    // Log any failures for debugging
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        const sources = [
          "Builder.io pages",
          "Builder.io articles",
          "Builder.io collections",
        ];
        console.error(`Failed to fetch ${sources[index]}:`, result.reason);
      }
    });
  } catch (error) {
    console.error("Unexpected error in sitemap generation:", error);
    // Continue with empty arrays - better to have a partial sitemap than none
  }

  // Helper function to check if a path should be excluded
  const shouldExcludePath = (path: string): boolean => {
    return excludedPaths.some((excludedPath) => path.includes(excludedPath));
  };

  // Combine all URLs and filter out excluded pages and 404
  const urls = [
    // Add pages (excluding configured paths and 404) with null checks
    ...(pages || [])
      .filter(
        (page) =>
          page?.data?.url &&
          !shouldExcludePath(page.data.url) &&
          page.data.url !== "/404"
      )
      .map((page) => ({
        url: page.data.url,
        lastUpdated: new Date(page.lastUpdated || Date.now())
          .toISOString()
          .split("T")[0],
      })),
    // Add main blog page
    { url: "blogs", lastUpdated: new Date().toISOString().split("T")[0] },
    // Add blog posts (excluding configured paths and empty handles)
    ...(posts || [])
      .filter(
        (post) => post?.data?.handle && !shouldExcludePath(post.data.handle)
      )
      .map((post) => ({
        url: `blogs/${post.data.handle}`,
        lastUpdated: new Date(post.lastUpdated || Date.now())
          .toISOString()
          .split("T")[0],
      })),
  ];

  const sitemap = generateSiteMap(urls);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

function generateSiteMap(urls: Array<{ url: string; lastUpdated: string }>) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "") ||
    "http://localhost:3000";

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  urls.forEach((path) => {
    const cleanUrl = path.url.replace(/^\/+/, "");
    xml += `  <url>\n`;
    xml += `    <loc>${base}/${cleanUrl}</loc>\n`;
    xml += `    <lastmod>${path.lastUpdated}</lastmod>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;
  return xml;
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}
