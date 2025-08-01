import type { AppProps } from "next/app";
import { Poppins, Nothing_You_Could_Do } from "next/font/google";
import "../styles/globals.css";
import { builder } from "@builder.io/react";
import Head from "next/head";
import { SiteContextProvider } from "@repo/components";
import { initializeBuilder } from "../lib/builder-config";

const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const fontAccent = Nothing_You_Could_Do({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-accent",
  display: "swap",
});

// Initialize Builder only once at the module level
const initBuilder = async () => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

    if (!apiKey) {
      console.error("Builder API key is not defined");
      return;
    }

    if (!builder.apiKey) {
      builder.init(apiKey);
    }

    // Initialize Builder.io with app-specific configuration
    await initializeBuilder();
  } catch (error) {
    console.error("Error initializing Builder.io:", error);
  }
};

// Initialize Builder outside of React lifecycle
initBuilder();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={`${fontSans.variable} ${fontAccent.variable} antialiased`}>
        <SiteContextProvider siteContext={pageProps.siteContext || null}>
          <Component {...pageProps} />
        </SiteContextProvider>
      </div>
    </>
  );
}
