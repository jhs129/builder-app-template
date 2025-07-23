import { useEffect, useState } from "react";
import { builder } from "@builder.io/react";
import { Navigation } from "@/types";

const defaultNavigation: Navigation = {
  data: {
    level1: [
      { text: "ABOUT", href: "/about" },
      { text: "SERVICES", href: "/services" },
      { text: "PODCAST", href: "/podcast" },
      { text: "INQUIRE", href: "/contact" },
    ],
  },
  ownerId: "",
  lastUpdateBy: null,
  createdDate: 0,
  id: "default",
  "@version": 1,
  name: "Hero Navigation",
  modelId: "navigation",
  published: "published",
  priority: 0,
  query: [],
  lastUpdated: 0,
  firstPublished: 0,
  testRatio: 0,
  createdBy: "",
  lastUpdatedBy: "",
};

interface HeroNavigationProps {
  onNavigationLoaded?: (navigation: Navigation) => void;
}

export default function HeroNavigation({
  onNavigationLoaded,
}: HeroNavigationProps) {
  const [, setNavigation] = useState<Navigation>(defaultNavigation);

  useEffect(() => {
    async function fetchNavigation() {
      try {
        const nav = await builder
          .get("navigation", {
            query: {
              name: "hero-nav",
            },
          })
          .promise();

        const loadedNav = nav || defaultNavigation;
        setNavigation(loadedNav);
        onNavigationLoaded?.(loadedNav);
      } catch (error) {
        console.error("Error fetching navigation:", error);
        setNavigation(defaultNavigation);
        onNavigationLoaded?.(defaultNavigation);
      }
    }

    fetchNavigation();
  }, [onNavigationLoaded]);

  return null; // This component only manages state
}
