import { Builder, withChildren } from "@builder.io/react";
import dynamic from "next/dynamic";
import { commonInputs, standardThemes, themeableInputs } from "@/types";

Builder.registerComponent(
  dynamic(() => import("@/components/ui/Button")),
  {
    name: "Core:Button",
    hideFromInsertMenu: true,
    override: false,
    image: "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      {
        name: "maskOpacity",
        type: "number",
        defaultValue: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        helperText: "Opacity of the overlay mask (0-1)",
      },
      {
        name: "outlined",
        type: "boolean",
        defaultValue: false,
        helperText: "Use outlined button style instead of filled",
      },
      {
        name: "label",
        type: "string",
        required: true,
        defaultValue: "Learn More",
        helperText: "The text content of the button",
      },
      {
        name: "href",
        type: "string",
        defaultValue: "#",
        helperText: "The URL the button should link to",
      },
      {
        name: "className",
        type: "string",
        advanced: true,
        defaultValue: "",
        helperText: "Additional CSS classes to apply to the button",
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("@/components/ui/Button")),
  {
    name: "Button",
    override: true,
    image: "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      {
        name: "maskOpacity",
        type: "number",
        defaultValue: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        helperText: "Opacity of the overlay mask (0-1)",
      },
      {
        name: "outlined",
        type: "boolean",
        defaultValue: false,
        helperText: "Use outlined button style instead of filled",
      },
      {
        name: "label",
        type: "string",
        required: true,
        defaultValue: "Learn More",
        helperText: "The text content of the button",
      },
      {
        name: "href",
        type: "string",
        defaultValue: "#",
        helperText: "The URL the button should link to",
      },
      {
        name: "className",
        type: "string",
        advanced: true,
        defaultValue: "",
        helperText: "Additional CSS classes to apply to the button",
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("@/components/ui/NotFoundContent")),
  {
    name: "NotFoundContent",
    image: "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    friendlyName: "404 Content",
    inputs: [
      {
        name: "className",
        type: "string",
        defaultValue: "",
        helperText: "Additional CSS classes to apply to the component",
      },
      {
        name: "requestedPath",
        type: "string",
        defaultValue: "",
        helperText:
          "The path that was requested but not found. This will be automatically populated in 404 pages.",
        advanced: true,
      },
      {
        name: "errorCode",
        type: "string",
        defaultValue: "404",
        helperText: "The error code to display (e.g., '404', '500')",
      },
      {
        name: "title",
        type: "string",
        defaultValue: "Page Not Found",
        helperText: "The main title of the error page",
      },
      {
        name: "description",
        type: "string",
        defaultValue:
          "The page you're looking for doesn't exist or has been moved.",
        helperText: "A detailed description of the error",
      },
      {
        name: "backButtonText",
        type: "string",
        defaultValue: "Go Back",
        helperText: "Text for the back button",
      },
      {
        name: "homeButtonText",
        type: "string",
        defaultValue: "Return Home",
        helperText: "Text for the home button",
      },
    ],
    defaultStyles: {
      marginTop: "20px",
      marginBottom: "20px",
    },
  }
);

// Image Testimonial
Builder.registerComponent(
  withChildren(dynamic(() => import("@/components/ui/ImageTestimonial"))),
  {
    name: "ImageTestimonial",
    friendlyName: "Image Testimonial",
    image: "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      {
        name: "eyebrow",
        type: "string",
        defaultValue: "REAL RESULTS",
        helperText: "Optional text above the image",
      },
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp", "avif"],
        required: false,
        defaultValue: "https://placehold.co/400x500/e5e7eb/6b7280.png?text=Testimonial+Image",
        helperText: "Testimonial image",
      },
      {
        name: "name",
        type: "string",
        required: true,
        defaultValue: "Lauren",
        helperText: "Person's name (uses font-accent)",
      },
      {
        name: "title",
        type: "string",
        required: true,
        defaultValue: "GOT HER GROOVE BACK",
        helperText: "Title displayed in uppercase next to name",
      },
      {
        name: "quote",
        type: "longText",
        required: true,
        defaultValue: "This program has completely transformed my life. I've never felt more confident and focused.",
        helperText: "Testimonial quote displayed in blockquote",
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
      {
        name: "className",
        type: "string",
        required: false,
        helperText: "Advanced field for additional CSS classes",
      },
    ],
    childRequirements: {
      message: "You can add Text and Button components as children",
      query: {
        "component.name": { $in: ["Text", "Button"] },
      },
    },
    defaultStyles: {
      display: "block",
      minWidth: "384px",
    },
  }
);

// Accordion
Builder.registerComponent(
  dynamic(() => import("@/components/ui/Accordion")),
  {
    name: "Accordion",
    friendlyName: "Accordion",
    image: "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      ...themeableInputs,
      {
        name: "groups",
        type: "list",
        subFields: [
          {
            name: "headline",
            type: "string",
            required: true,
            defaultValue: "Accordion Item",
            helperText: "The headline text for this accordion item",
          },
          {
            name: "content",
            type: "blocks",
            hideFromUI: true,
            helperText: "The content blocks for this accordion item",
          },
        ],
        defaultValue: [
          {
            headline: "Question One?",
            content: { blocks: [] },
          },
          {
            headline: "Question Two?",
            content: { blocks: [] },
          },
          {
            headline: "Question Three?",
            content: { blocks: [] },
          },
        ],
        helperText: "List of accordion items with headlines and content",
      },
      {
        name: "headline",
        type: "string",
        defaultValue: "Frequently Asked Questions",
        helperText: "Main headline for the accordion section",
      },
      {
        name: "headlineLevel",
        type: "string",
        enum: ["h2", "h3", "h4", "h5", "h6"],
        defaultValue: "h2",
        helperText: "HTML heading level for the main headline",
      },
      {
        name: "subheadline",
        type: "string",
        defaultValue: "",
        helperText: "Optional subheadline text",
      },
      {
        name: "subheadlineLevel",
        type: "string",
        enum: ["h2", "h3", "h4", "h5", "h6"],
        defaultValue: "h6",
        helperText: "HTML heading level for the subheadline",
      },
      {
        name: "body",
        type: "html",
        defaultValue: "",
        helperText: "Optional body text displayed before accordion items",
      },
      {
        name: "groupHeadlineLevel",
        type: "string",
        enum: ["h2", "h3", "h4", "h5", "h6"],
        defaultValue: "h3",
        helperText: "HTML heading level for the group headline",
      },
      {
        name: "alignment",
        type: "string",
        enum: ["left", "center", "right"],
        defaultValue: "left",
        helperText: "Text alignment for headlines and body text",
      },
      {
        name: "alwaysExpanded",
        type: "boolean",
        defaultValue: false,
        helperText: "Keep all accordion items always expanded (no collapse functionality)",
      },
    ],
    defaultStyles: {
      marginTop: "20px",
      marginBottom: "20px",
    },
  }
);

// Design Kit Overview - Not in insert menu (for development/design reference)
Builder.registerComponent(
  dynamic(() => import("@/components/ui/DesignKitOverview")),
  {
    name: "DesignKitOverview",
    friendlyName: "Design Kit Overview",
    image: "https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f",
    inputs: [
      {
        name: "theme",
        type: "string",
        enum: standardThemes,
        defaultValue: "light",
        helperText: "Initial theme for the design kit (can be changed with dropdown)",
      },
      ...commonInputs,
    ],
    noWrap: true,
    // Note: No insertMenu specified, so it won't appear in the insert menu
  }
);
