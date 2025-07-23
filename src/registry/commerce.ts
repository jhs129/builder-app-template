import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";
import {
  alignableInputs,
  themeableInputs,
  opacityInputs,
} from "@/types";

// Collection Card - Deprecated - renamed to CollectionTile
Builder.registerComponent(
  dynamic(() => import("@/components/commerce/CollectionTile")),
  {
    name: "CollectionCard",
    hideFromInsertMenu: true,
    friendlyName: "Collection Card",
    image:
      "https://cdn.builder.io/api/v1/assets/aa26d0ed43ef421da301a1603f38faeb/shopify-logo",
    inputs: [
      ...themeableInputs,
      ...opacityInputs,
      ...alignableInputs,
      {
        name: "title",
        type: "string",
        required: true,
        defaultValue: "Product Title",
        helperText: "The title of the product or course",
      },
      {
        name: "description",
        type: "richText",
        required: false,
        defaultValue: "Product Description",
        helperText:
          "Detailed description that appears on the back of the card (supports HTML formatting)",
      },
      {
        name: "imageUrl",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp", "avif"],
        required: true,
        defaultValue: "https://placehold.co/600x400.png",
        helperText: "Background image for the card",
      },
      {
        name: "overlayText",
        type: "longText",
        required: true,
        defaultValue: "Product Description",
        helperText: "Text that appears over the image (supports line breaks)",
      },
      {
        name: "location",
        type: "string",
        defaultValue: "Location",
        helperText:
          "Optional location text that appears below the overlay text",
      },
      {
        name: "ctaText",
        type: "string",
        defaultValue: "Learn More",
        required: true,
        helperText: "Text for the call-to-action button",
      },
      {
        name: "href",
        type: "string",
        friendlyName: "Collection Slug",
        defaultValue: "#",
        helperText:
          "The shopify collection handle",
      },
      {
        name: "outlined",
        type: "boolean",
        defaultValue: true,
        helperText:
          "Whether the button should have an outlined style (true) or solid style (false)",
      },
    ],
    defaultStyles: {
      marginBottom: "20px",
    },
  }
);

// Collection Tile
Builder.registerComponent(
  dynamic(() => import("@/components/commerce/CollectionTile")),
  {
    name: "CollectionTile",
    friendlyName: "Collection Card",
    image:
      "https://cdn.builder.io/api/v1/assets/aa26d0ed43ef421da301a1603f38faeb/shopify-logo",
    inputs: [
      ...themeableInputs,
      ...opacityInputs,
      ...alignableInputs,
      {
        name: "headline",
        type: "string",
        required: true,
        defaultValue: "Product Title",
        helperText: "The title of the product or course",
      },
      {
        name: "imageUrl",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp", "avif"],
        required: true,
        defaultValue: "https://placehold.co/600x400.png",
        helperText: "Background image for the card",
      },
      {
        name: "location",
        type: "string",
        required: true,
        defaultValue: "Atlanta, GA",
        helperText:
          "Location of the Course",
      },
      {
        name: "subheadline",
        type: "longText",
        required: false,
        defaultValue: "Subheadline",
        helperText: "Text that appears uner the location",
      },
      {
        name: "description",
        type: "richText",
        required: false,
        defaultValue: "Product Description",
        helperText:
          "Detailed description that appears on the back of the card (supports HTML formatting)",
      },
      {
        name: "ctaText",
        type: "string",
        defaultValue: "Learn More",
        required: true,
        helperText: "Text for the call-to-action button",
      },
      {
        name: "href",
        type: "string",
        defaultValue: "#",
        helperText:
          "URL where the button should link to (defaults to '#' if not provided)",
      },
      {
        name: "outlined",
        type: "boolean",
        defaultValue: true,
        helperText:
          "Whether the button should have an outlined style (true) or solid style (false)",
      },
    ],
    defaultStyles: {
      marginBottom: "20px",
    },
  }
);

// Product Card
Builder.registerComponent(
  dynamic(() => import("@/components/commerce/ProductCard")),
  {
    name: "ProductCard",
    friendlyName: "Product Card",
    image:
      "https://cdn.builder.io/api/v1/assets/aa26d0ed43ef421da301a1603f38faeb/shopify-logo",
    inputs: [
      ...themeableInputs,
      {
        name: "id",
        type: "string",
        required: true,
        defaultValue: "product-1",
        helperText: "Unique identifier for the product",
      },
      {
        name: "title",
        type: "string",
        required: true,
        defaultValue: "Silva Method Complete Course",
        helperText: "The name of the product",
      },
      {
        name: "handle",
        type: "string",
        required: true,
        defaultValue: "silva-method-complete-course",
        helperText: "URL slug for the product (used in product links)",
      },
      {
        name: "price",
        type: "object",
        required: true,
        defaultValue: {
          amount: "297.00",
          currencyCode: "USD",
        },
        helperText: "Price object with amount and currency code",
        subFields: [
          {
            name: "amount",
            type: "string",
            required: true,
            defaultValue: "297.00",
            helperText: "Price amount as a string (e.g., '297.00')",
          },
          {
            name: "currencyCode",
            type: "string",
            required: true,
            defaultValue: "USD",
            helperText: "Currency code (e.g., 'USD', 'EUR')",
          },
        ],
      },
      {
        name: "image",
        type: "object",
        helperText: "Product image information",
        subFields: [
          {
            name: "id",
            type: "string",
            defaultValue: "image-1",
            helperText: "Image identifier",
          },
          {
            name: "url",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "webp", "avif"],
            defaultValue: "https://placehold.co/800x600.png",
            helperText: "Image URL",
          },
          {
            name: "altText",
            type: "string",
            helperText: "Alternative text for accessibility",
          },
          {
            name: "width",
            type: "number",
            defaultValue: 800,
            helperText: "Image width in pixels",
          },
          {
            name: "height",
            type: "number",
            defaultValue: 600,
            helperText: "Image height in pixels",
          },
        ],
      },
    ],
    defaultStyles: {
      marginBottom: "20px",
    },
  }
);
