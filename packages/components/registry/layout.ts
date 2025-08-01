import { Builder, withChildren } from "@builder.io/react";
import {
  backgroundTypes,
  themeableInputs,
  heroicInputs,
  alignableInputs,
  reversibleInputs,
} from "@repo/types";
import dynamic from "next/dynamic";

// Helper function to conditionally set image property
const getImageConfig = () => {
  const envImage = process.env.NEXT_DEFAULT_COMPONENT_IMAGE;
  return envImage ? { image: envImage } : {};
};

// Banner 100
Builder.registerComponent(
  dynamic(() => import("../components/layout/Banner100")),
  {
    name: "Banner100",
    ...getImageConfig(),
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



// Carousel
Builder.registerComponent(
  withChildren(dynamic(() => import("../components/layout/Carousel"))),
  {
    name: "Carousel",
    friendlyName: "Carousel",
    ...getImageConfig(),
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
  dynamic(() => import("../components/layout/Tabs")),
  {
    name: "Tabs",
    friendlyName: "Tabs",
    ...getImageConfig(),
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
            helperText:
              "Tab type: content (shows blocks) or link (navigates to URL)",
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
