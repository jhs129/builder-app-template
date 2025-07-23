import { Builder, withChildren } from "@builder.io/react";
import {
  backgroundTypes,
  themeableInputs,
  heroicInputs,
  alignableInputs,
  reversibleInputs,
  opacityInputs,
  commonInputs,
} from "@/types";
import dynamic from "next/dynamic";

// Hero Banner
Builder.registerComponent(
  dynamic(() => import("@/components/sections/HeroBanner")),
  {
    name: "HeroBanner",
    friendlyName: "Hero Banner",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      {
        name: "title",
        type: "string",
        defaultValue: "Unlock Your Mind's Extraordinary Potential",
        helperText: "Main headline text",
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue: "Silva Method Atlanta & Western North Carolina",
        helperText: "Small text above the main title",
      },
      {
        name: "description",
        type: "longText",
        defaultValue:
          "Learn the proven Silva Method meditation techniques that have transformed millions of lives. Develop your intuition, enhance focus, and achieve lasting inner peace through our guided programs.",
        helperText: "Supporting description text",
      },
      {
        name: "ctaText",
        type: "string",
        defaultValue: "Book Your First Class",
        helperText: "Primary call-to-action button text",
      },
      {
        name: "ctaUrl",
        type: "string",
        defaultValue: "/book-class",
        helperText: "Primary call-to-action URL",
      },
      {
        name: "secondaryCtaText",
        type: "string",
        defaultValue: "Learn More",
        helperText: "Secondary call-to-action button text (optional)",
      },
      {
        name: "secondaryCtaUrl",
        type: "string",
        defaultValue: "/about",
        helperText: "Secondary call-to-action URL",
      },
      {
        name: "backgroundImage",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp", "avif"],
        defaultValue:
          "https://images.pexels.com/photos/13865962/pexels-photo-13865962.jpeg",
        helperText: "Background image for the hero section",
      },
      {
        name: "backgroundVideo",
        type: "file",
        allowedFileTypes: ["mp4", "webm"],
        helperText:
          "Optional background video (will override image if provided)",
      },
      ...opacityInputs,
      {
        name: "textAlignment",
        type: "string",
        enum: ["left", "center", "right"],
        defaultValue: "left",
        helperText: "Text alignment for the hero content",
      },
      {
        name: "features",
        type: "list",
        defaultValue: [
          "Proven 60+ Year Methodology",
          "Millions of Students Worldwide",
          "Live Interactive Classes",
        ],
        subFields: [
          {
            name: "text",
            type: "string",
            defaultValue: "",
            helperText: "Feature text to display",
          },
        ],
        helperText:
          "List of features to display at the bottom of the hero section",
      },
    ],
    defaultStyles: {
      display: "block",
    },
  }
);

// Instructor Hero
Builder.registerComponent(
  dynamic(() => import("@/components/sections/InstructorHero")),
  {
    name: "InstructorHero",
    friendlyName: "Instructor Hero",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      ...heroicInputs,
      {
        name: "greeting",
        type: "string",
        defaultValue: "Hey there",
        helperText: "Greeting text above instructor name",
      },
      {
        name: "instructorImage",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp", "avif"],
        defaultValue: "https://placehold.co/600x400.png",
        helperText: "Professional photo of the instructor",
      },
      {
        name: "description",
        type: "string",
        defaultValue:
          "Certified Silva Method Instructor with over 10 years of experience",
        helperText: "Brief description or bio",
      },
      {
        name: "ctaText",
        type: "string",
        defaultValue: "Learn More",
        helperText: "Primary call-to-action text",
      },
      {
        name: "ctaUrl",
        type: "string",
        defaultValue: "/instructor",
        helperText: "Primary call-to-action URL",
      },
      {
        name: "secondaryCtaText",
        type: "string",
        defaultValue: "View Courses",
        helperText: "Secondary call-to-action text",
      },
      {
        name: "secondaryCtaUrl",
        type: "string",
        defaultValue: "/about",
        helperText: "Secondary call-to-action URL",
      },
      ...commonInputs,
    ],
    defaultStyles: {
      display: "block",
    },
  }
);

// Media Mentions
Builder.registerComponent(
  dynamic(() => import("@/components/sections/MediaMentions")),
  {
    name: "MediaMentions",
    friendlyName: "Media Mentions",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      ...heroicInputs,
      {
        name: "subtitle",
        type: "string",
        defaultValue: "As seen in these leading publications",
        helperText: "Optional subtitle",
      },
      {
        name: "logos",
        type: "list",
        defaultValue: [
          {
            name: "Forbes",
            imageUrl:
              "https://cdn.builder.io/api/v1/image/assets%2F3237eecbbb744c568763d94f250d4536%2F9eb3c2e4a97c41a697f78867aff2d6fe?format=webp&width=120",
          },
          {
            name: "Entrepreneur",
            imageUrl:
              "https://cdn.builder.io/api/v1/image/assets%2F3237eecbbb744c568763d94f250d4536%2F9eb3c2e4a97c41a697f78867aff2d6fe?format=webp&width=120",
          },
          {
            name: "Inc.",
            imageUrl:
              "https://cdn.builder.io/api/v1/image/assets%2F3237eecbbb744c568763d94f250d4536%2F9eb3c2e4a97c41a697f78867aff2d6fe?format=webp&width=120",
          },
        ],
        subFields: [
          {
            name: "name",
            type: "string",
            defaultValue: "",
            helperText: "Publication or media name",
          },
          {
            name: "imageUrl",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "webp", "avif", "svg"],
            defaultValue: "",
            helperText: "Logo image",
          },
          {
            name: "websiteUrl",
            type: "string",
            defaultValue: "",
            helperText: "Optional link to publication website",
          },
        ],
        helperText: "List of media logos to display",
      },
    ],
    defaultStyles: {
      display: "block",
    },
  }
);

// Stats Counter
Builder.registerComponent(
  dynamic(() => import("@/components/sections/StatsCounter")),
  {
    name: "StatsCounter",
    friendlyName: "Stats Counter",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      ...heroicInputs,
      {
        name: "description",
        type: "longText",
        defaultValue:
          "I've had the privilege of guiding thousands of students through transformative meditation experiences.",
        helperText: "Section description",
      },
      {
        name: "stats",
        type: "list",
        defaultValue: [
          {
            prefix: "I've served",
            number: "10,000",
            suffix: "+",
            label: "students.",
          },
          {
            number: "500",
            suffix: "+",
            label: "meditation classes taught",
          },
          {
            number: "95",
            suffix: "%",
            label: "student satisfaction rate",
          },
          {
            number: "15",
            suffix: "+",
            label: "years of teaching experience",
          },
        ],
        subFields: [
          {
            name: "prefix",
            type: "string",
            defaultValue: "",
            helperText: "Optional text before the number",
          },
          {
            name: "number",
            type: "string",
            defaultValue: "",
            helperText: "The main statistic number",
          },
          {
            name: "suffix",
            type: "string",
            defaultValue: "",
            helperText: "Optional suffix like '+' or '%'",
          },
          {
            name: "label",
            type: "string",
            defaultValue: "",
            helperText: "Description of what the statistic represents",
          },
        ],
        helperText: "List of statistics to display",
      },
    ],
    defaultStyles: {
      display: "block",
    },
  }
);


// Collection Hero
Builder.registerComponent(
  dynamic(() => import("@/components/sections/CollectionHero")),
  {
    name: "CollectionHero",
    friendlyName: "Collection Hero",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      ...heroicInputs,
      {
        name: "breadcrumbText",
        type: "string",
        helperText:
          "Breadcrumb text (defaults to collection title if not provided)",
      },
      {
        name: "description",
        type: "longText",
        helperText:
          "Hero description text (defaults to generic text if not provided)",
      },
      {
        name: "description2",
        type: "longText",
        defaultValue:
          "Every number represents real people who have discovered the power of Silva Method meditation and transformed their lives through mindfulness and intuitive development.",
        helperText:
          "Hero description text 2 (defaults to generic text if not provided)",
      },
      {
        name: "buttonText",
        type: "string",
        defaultValue: "Explore Collection",
        helperText: "Call-to-action button text",
      },
      {
        name: "buttonUrl",
        type: "string",
        helperText: "Call-to-action button URL (optional)",
      },
      {
        name: "heroImage",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp", "avif"],
        helperText: "Hero image (defaults to collection image if not provided)",
      },
      {
        name: "heroImageAlt",
        type: "string",
        helperText:
          "Alt text for hero image (defaults to collection title if not provided)",
      },
      {
        name: "productCountText",
        type: "string",
        helperText:
          "Product count text (defaults to auto-generated count if not provided)",
      },
    ],
    defaultStyles: {
      display: "block",
    },
  }
);

// Tile Hero
Builder.registerComponent(
  dynamic(() => import("@/components/sections/TileHero")),
  {
    name: "TileHero",
    friendlyName: "Tile Hero",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      ...opacityInputs,
      ...heroicInputs,
      {
        name: "eyebrow",
        type: "string",
        defaultValue: "HEY FRIEND",
        helperText: "Small text above the main title",
      },
      {
        name: "description",
        type: "longText",
        defaultValue:
          "Poke fixie kickstarter fashion axe mixtape brunch. Small batch bushwick master cleanse waistcoat, everyday carry chillwave la croix.",
        helperText: "Supporting description text",
      },
      {
        name: "buttonLabel",
        type: "string",
        defaultValue: "LEARN MORE",
        helperText: "Call-to-action button text",
      },
      {
        name: "buttonHref",
        type: "string",
        defaultValue: "#",
        helperText: "Call-to-action button URL",
      },
      {
        name: "heroImage",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp", "avif"],
        helperText: "Background hero image",
      },
      {
        name: "navigation",
        type: "reference",
        model: "navigation",
        helperText: "Reference to a navigation model",
      },
    ],
    defaultStyles: {
      display: "block",
    },
  }
);

// Banner 100
Builder.registerComponent(
  dynamic(() => import("@/components/sections/Banner100")),
  {
    name: "Banner100",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      ...alignableInputs,
      {
        name: "backgroundType",
        type: "string",
        required: true,
        enum: backgroundTypes,
        defaultValue: "none",
      },
      {
        name: "backgroundImage",
        type: "file",
        showIf: (options) => options.get("backgroundType") === "image",
      },
      {
        name: "backgroundVideoFile",
        type: "file",
        allowedFileTypes: ["mp4", "webm"],
        showIf: (options) => options.get("backgroundType") === "video",
      },
      {
        name: "backgroundVideoId",
        type: "string",
        helperText: "Enter the video ID from YouTube",
        showIf: (options) => options.get("backgroundType") === "youtube",
      },
      {
        name: "maskOpacity",
        type: "number",
        required: false,
        defaultValue: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        helperText: "Opacity of the overlay mask (0-1)",
        showIf: (options) => options.get("backgroundType") !== "none",
      },
      {
        name: "content",
        type: "uiBlocks",
        hideFromUI: true,
        defaultValue: {
          blocks: [],
        },
      },
      {
        name: "fullWidth",
        type: "boolean",
        required: false,
        defaultValue: true,
      },
    ],
    defaultStyles: {
      display: "block",
    },
  }
);

// Banner 75
Builder.registerComponent(
  withChildren(dynamic(() => import("@/components/sections/Banner75"))),
  {
    name: "Banner75",
    friendlyName: "Banner 75/25",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      ...alignableInputs,
      {
        name: "backgroundType",
        type: "string",
        required: true,
        enum: backgroundTypes,
        defaultValue: "none",
      },
      {
        name: "backgroundImage",
        type: "file",
        showIf: (options) => options.get("backgroundType") === "image",
      },
      {
        name: "backgroundVideoFile",
        type: "file",
        allowedFileTypes: ["mp4", "webm"],
        showIf: (options) => options.get("backgroundType") === "video",
      },
      {
        name: "backgroundVideoId",
        type: "string",
        helperText: "Enter the video ID from YouTube",
        showIf: (options) => options.get("backgroundType") === "youtube",
      },
      {
        name: "maskOpacity",
        type: "number",
        required: false,
        defaultValue: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        helperText: "Opacity of the overlay mask (0-1)",
        showIf: (options) => options.get("backgroundType") !== "none",
      },
      ...reversibleInputs,
      {
        name: "reverseLayout",
        type: "boolean",
        required: false,
        defaultValue: false,
        helperText:
          "Legacy: Reverse column order on mobile (use layoutReversal instead)",
        hideFromUI: true,
      },
      {
        name: "fullWidth",
        type: "boolean",
        required: false,
        defaultValue: true,
      },
      {
        name: "column1",
        type: "uiBlocks",
        hideFromUI: true,
        helperText: "75% width column for main content",
        defaultValue: {
          blocks: [],
        },
      },
      {
        name: "column2",
        type: "uiBlocks",
        hideFromUI: true,
        helperText: "25% width column for secondary content",
        defaultValue: {
          blocks: [],
        },
      },
    ],
    defaultStyles: {
      display: "block",
      // Add gap between columns that users can customize in Builder.io
    },
  }
);

// Banner 50
Builder.registerComponent(
  withChildren(dynamic(() => import("@/components/sections/Banner50"))),
  {
    name: "Banner50",
    friendlyName: "Banner 50/50",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      ...alignableInputs,
      {
        name: "backgroundType",
        type: "string",
        required: true,
        enum: backgroundTypes,
        defaultValue: "none",
      },
      {
        name: "backgroundImage",
        type: "file",
        showIf: (options) => options.get("backgroundType") === "image",
      },
      {
        name: "backgroundVideoFile",
        type: "file",
        allowedFileTypes: ["mp4", "webm"],
        showIf: (options) => options.get("backgroundType") === "video",
      },
      {
        name: "backgroundVideoId",
        type: "string",
        helperText: "Enter the video ID from YouTube",
        showIf: (options) => options.get("backgroundType") === "youtube",
      },
      {
        name: "maskOpacity",
        type: "number",
        required: false,
        defaultValue: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        helperText: "Opacity of the overlay mask (0-1)",
        showIf: (options) => options.get("backgroundType") !== "none",
      },
      ...reversibleInputs,
      {
        name: "reverseLayout",
        type: "boolean",
        required: false,
        defaultValue: false,
        helperText:
          "Legacy: Reverse column order on mobile (use layoutReversal instead)",
        hideFromUI: true,
      },
      {
        name: "fullWidth",
        type: "boolean",
        required: false,
        defaultValue: true,
      },
      {
        name: "column1",
        type: "uiBlocks",
        hideFromUI: true,
        helperText: "50% width column for first content area",
        defaultValue: {
          blocks: [],
        },
      },
      {
        name: "column2",
        type: "uiBlocks",
        hideFromUI: true,
        helperText: "50% width column for second content area",
        defaultValue: {
          blocks: [],
        },
      },
    ],
    defaultStyles: {
      display: "block",
      // Add gap between columns that users can customize in Builder.io
      gap: "2rem", // 32px gap between columns
    },
  }
);

// Carousel
Builder.registerComponent(
  withChildren(dynamic(() => import("@/components/sections/Carousel"))),
  {
    name: "Carousel",
    friendlyName: "Carousel",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      {
        name: "headline",
        type: "string",
        defaultValue: "Featured Content",
        helperText: "Main headline for the carousel section",
      },
      {
        name: "headlineLevel",
        type: "string",
        enum: ["h1", "h2", "h3", "h4", "h5", "h6"],
        defaultValue: "h2",
        helperText: "HTML heading level for SEO and accessibility",
      },
      {
        name: "description",
        type: "string",
        defaultValue: "Discover our amazing collection",
        helperText: "Optional description text below the headline",
      },
      {
        name: "maskOpacity",
        type: "number",
        defaultValue: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        helperText: "Opacity of the overlay mask (0-1)",
      },
      ...alignableInputs,
      {
        name: "rowSize",
        type: "number",
        defaultValue: 3,
        min: 1,
        max: 10,
        helperText: "Number of items to show before scrolling appears",
      },
      {
        name: "navStyle",
        type: "string",
        enum: ["arrows", "dots", "both", "none"],
        defaultValue: "arrows",
        helperText: "Navigation style: arrows, dots, both, or none",
      },
    ],
    defaultStyles: {
      display: "block",
    },
  }
);

// Tabs
Builder.registerComponent(
  dynamic(() => import("@/components/sections/Tabs")),
  {
    name: "Tabs",
    friendlyName: "Tabs",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      ...heroicInputs,
      {
        name: "tabs",
        type: "list",
        defaultValue: [
          {
            headline: "Tab 1",
            type: "content",
            content: { blocks: [] },
          },
          {
            headline: "Tab 2",
            type: "content",
            content: { blocks: [] },
          },
          {
            headline: "Tab 3",
            type: "content",
            content: { blocks: [] },
          },
        ],
        subFields: [
          {
            name: "headline",
            type: "string",
            defaultValue: "Tab Title",
            helperText: "Tab title displayed in navigation",
          },
          {
            name: "type",
            type: "string",
            enum: ["content", "link"],
            defaultValue: "content",
            helperText: "Tab type: content (shows blocks) or link (navigates to URL)",
          },
          {
            name: "content",
            type: "uiBlocks",
            hideFromUI: true,
            showIf: (options) => options.get("type") === "content",
            defaultValue: {
              blocks: [],
            },
            helperText: "Content blocks to display when tab is active",
          },
          {
            name: "href",
            type: "string",
            showIf: (options) => options.get("type") === "link",
            helperText: "URL to navigate to when tab link is clicked",
          },
        ],
        helperText: "List of tabs to display",
      },
    ],
    defaultStyles: {
      display: "block",
    },
  }
);
