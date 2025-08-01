import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    // Next.js injects the current locale here when using i18n routing
    const nextLocale = this.props.__NEXT_DATA__.locale || "en";
    // Map to short code for lang attribute
    const lang = nextLocale.startsWith("es") ? "es" : "en";
    
    return (
      <Html lang={lang}>
          <Head>
            <link rel="icon" type="image/png" href="/favicon.ico" />
            <meta name="theme-color" content="#6610F2" />
            <meta name="format-detection" content="telephone=no" />
            <link rel="apple-touch-icon" href="/favicon.ico" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
              integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </Head>
          <body>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-accent focus:text-white"
            >
              Skip to main content
            </a>
            <Main />
            <NextScript />
          </body>
        </Html>
    );
  }
}

export default MyDocument;
