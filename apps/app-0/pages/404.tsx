import React from "react";
import { useEffect, useState } from "react";
import { builder, BuilderComponent } from "@builder.io/react";
import { Footer } from "@repo/components";
import { DefaultHeader } from "@repo/components";
import { NotFoundContent } from "@repo/components";

interface Custom404Props {
  requestedPath?: string;
}

const Custom404: React.FC<Custom404Props> = ({ requestedPath }) => {
  const [pageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    async function fetch404Page() {
      try {
        const page = await builder
          .get("page", {
            userAttributes: {
              urlPath: "/404",
            },
          })
          .promise();

        setPageContent(page || null);
      } catch (error) {
        console.error("Error fetching 404 page:", error);
        setPageContent(null);
      }
    }

    fetch404Page();
  }, []);

  return (
    <>
      <DefaultHeader />
      <main className="container mx-auto flex lg:min-h-[550px] items-center justify-center">
        {pageContent ? (
          <div className="w-full">
            <BuilderComponent
              model="page"
              content={pageContent}
              data={{
                urlPath: requestedPath,
              }}
            />
          </div>
        ) : (
          <NotFoundContent
            requestedPath={requestedPath}
            errorCode="404"
            title="Page Not Found"
            description="The page you're looking for doesn't exist or has been moved..."
            backButtonText="Go Back"
            homeButtonText="Return Home"
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Custom404;
