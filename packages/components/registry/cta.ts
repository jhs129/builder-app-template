import { Builder, withChildren } from "@builder.io/react";
import dynamic from "next/dynamic";
import {
  alignableInputs,
  commonInputs,
  heroicInputs,
  themeableInputs,
  opacityInputs,
  buttonInputs,
} from "@repo/types";

// Helper function to conditionally set image property
const getImageConfig = () => {
  const envImage = process.env.NEXT_DEFAULT_COMPONENT_IMAGE;
  return envImage ? { image: envImage } : {};
};


// Tile Quote
Builder.registerComponent(
  dynamic(() => import("../components/cta/TileQuote")),
  {
    name: "TileQuote",
    friendlyName: "Tile Quote",
    ...getImageConfig(),
    inputs: [
      ...heroicInputs,
      ...themeableInputs,
      ...opacityInputs,
      ...alignableInputs,
      {
        name: "quote",
        type: "longText",
        required: true,
        defaultValue:
          "This is an inspiring quote that will be displayed prominently.",
        helperText: "The quote text to display in the blockquote",
      },
      ...commonInputs,
    ],
    defaultStyles: {
      marginBottom: "20px",
    },
  }
);

// Tile CTA
Builder.registerComponent(
  dynamic(() => import("../components/cta/TileCTA")),
  {
    name: "TileCTA",
    friendlyName: "Tile CTA",
    ...getImageConfig(),
    inputs: [
      ...themeableInputs,
      ...opacityInputs,
      ...alignableInputs,
      ...heroicInputs,
      {
        name: "eyebrow",
        type: "string",
        defaultValue: "Hey Genius!",
        helperText: "Optional eyebrow text displayed above the title",
      },
      {
        name: "content",
        type: "longText",
        required: true,
        defaultValue:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        helperText: "Description text for the CTA",
      },
      ...buttonInputs,
      ...commonInputs,
    ],
    defaultStyles: {
      marginBottom: "20px",
    },
  }
);

// Card Image CTA
Builder.registerComponent(
  dynamic(() => import("../components/cta/CardImageCTA")),
  {
    name: "CardImageCTA",
    ...getImageConfig(),
    inputs: [
      ...themeableInputs,
      ...opacityInputs,
      ...alignableInputs,
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp", "avif"],
        required: true,
        defaultValue: "https://placehold.co/600x400/EEE/5ce1e6.png",
        helperText: "Image to display in the card",
      },
      {
        name: "eyebrow",
        type: "string",
        required: true,
        defaultValue: "Featured",
        helperText: "Eyebrow text displayed above the title (renders as h6)",
      },
      {
        name: "title",
        type: "string",
        required: true,
        defaultValue: "Your Title Here",
        helperText: "Main title of the card",
      },
      ...buttonInputs,
      ...commonInputs,
    ],
    defaultStyles: {
      marginBottom: "20px",
    },
  }
);

// Tile Content
Builder.registerComponent(
  withChildren(dynamic(() => import("../components/cta/TileContent"))),
  {
    name: "TileContent",
    friendlyName: "Tile Content",
    ...getImageConfig(),
    childRequirements: {
      message: "You can only add Button components as children",
      query: {
        "component.name": { $in: ["Button"] },
      },
    },
    inputs: [
      ...themeableInputs,
      ...opacityInputs,
      ...alignableInputs,
      ...heroicInputs,
      {
        name: "content",
        type: "richText",
        required: true,
        defaultValue:
          "Add your content description here. This supports rich text formatting.",
        helperText: "Main description content (supports HTML formatting)",
      },
      ...commonInputs,
    ],
    defaultStyles: {
      marginBottom: "20px",
    },
  }
);

// Tile Image
Builder.registerComponent(
  dynamic(() => import("../components/cta/TileImage")),
  {
    name: "TileImage",
    friendlyName: "Tile Image",
    ...getImageConfig(),
    inputs: [
      ...themeableInputs,
      ...opacityInputs,
      ...alignableInputs,
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp", "avif"],
        required: true,
        defaultValue: "https://placehold.co/400x300/EEE/5ce1e6.png",
        helperText: "Background image for the tile",
      },
      {
        name: "title",
        type: "string",
        required: true,
        defaultValue: "Your Title",
        helperText: "Title displayed over the image (renders as h6)",
      },
      {
        name: "content",
        type: "html",
        required: true,
        defaultValue: "Add your content description here.",
        helperText:
          "Description content displayed over the image (supports HTML formatting)",
      },
      {
        name: "buttonLabel",
        type: "string",
        defaultValue: "Learn More",
        helperText: "Text for the CTA button. Leave empty to hide button.",
      },
      {
        name: "buttonHref",
        type: "string",
        defaultValue: "#",
        helperText: "URL where the button should link to",
        showIf: "options.get('buttonLabel')",
      },
      ...commonInputs,
    ],
    defaultStyles: {
      marginBottom: "20px",
    },
  }
);
