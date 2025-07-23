import { Builder, withChildren } from "@builder.io/react";
import dynamic from "next/dynamic";
import {
  alignableInputs,
  commonInputs,
  heroicInputs,
  themeableInputs,
  opacityInputs,
  buttonInputs,
} from "@/types";


// Tile Quote
Builder.registerComponent(
  dynamic(() => import("@/components/cta/TileQuote")),
  {
    name: "TileQuote",
    friendlyName: "Tile Quote",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
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
  dynamic(() => import("@/components/cta/TileCTA")),
  {
    name: "TileCTA",
    friendlyName: "Tile CTA",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
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
        name: "description",
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
  dynamic(() => import("@/components/cta/CardImageCTA")),
  {
    name: "CardImageCTA",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
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
  withChildren(dynamic(() => import("@/components/cta/TileContent"))),
  {
    name: "TileContent",
    friendlyName: "Tile Content",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    childRequirements: {
      message: "You can only add Button components as children",
      query: {
        "component.name": { $in: ["Button"] },
      },
    },
    inputs: [
      ...themeableInputs,
      ...opacityInputs,
      ...heroicInputs,
      {
        name: "description",
        type: "richText",
        required: true,
        defaultValue:
          "Add your content description here. This supports rich text formatting.",
        helperText: "Description content (supports HTML formatting)",
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
  dynamic(() => import("@/components/cta/TileImage")),
  {
    name: "TileImage",
    friendlyName: "Tile Image",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
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
        name: "description",
        type: "longText",
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
