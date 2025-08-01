import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";
import { commonInputs, standardThemes, themeableInputs, heroicInputs } from "@repo/types";

Builder.registerComponent(
  dynamic(() => import("../components/ui/Button")),
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
  dynamic(() => import("../components/ui/Button")),
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
  dynamic(() => import("../components/ui/NotFoundContent")),
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

// Accordion
Builder.registerComponent(
  dynamic(() => import("../components/ui/Accordion")),
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

// Alert
Builder.registerComponent(
  dynamic(() => import("../components/ui/Alert")),
  {
    name: "Alert",
    friendlyName: "Alert",
    image: process.env.NEXT_DEFAULT_COMPONENT_IMAGE,
    inputs: [
      {
        name: "variant",
        type: "string",
        required: true,
        defaultValue: "info",
        enum: ["info", "success", "warning", "error"],
        helperText: "Visual style variant for the alert",
      },
      {
        name: "title",
        type: "string",
        helperText: "Optional title for the alert",
      },
      {
        name: "message",
        type: "string",
        required: true,
        defaultValue: "This is an alert message",
        helperText: "Main message content of the alert",
      },
      {
        name: "dismissible",
        type: "boolean",
        defaultValue: true,
        helperText: "Whether the alert can be dismissed by the user",
      },
      {
        name: "autoHide",
        type: "boolean",
        defaultValue: false,
        helperText: "Whether the alert should automatically hide after a delay",
      },
      {
        name: "autoHideDelay",
        type: "number",
        defaultValue: 5000,
        helperText: "Delay in milliseconds before auto-hiding (if autoHide is enabled)",
      },
      {
        name: "icon",
        type: "string",
        helperText: "Custom icon to display (overrides default variant icon)",
      },
      ...themeableInputs,
      ...commonInputs,
    ],
  }
);

// Design Kit Overview - Not in insert menu (for development/design reference)
Builder.registerComponent(
  dynamic(() => import("../components/ui/DesignKitOverview")),
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

// Headline
Builder.registerComponent(
  dynamic(() => import("../components/ui/Headline")),
  {
    name: "Headline",
    image: process.env.NEXT_DEFAULT_COMPONENT_IMAGE,
    inputs: [
      ...heroicInputs,
      {
        name: "level",
        type: "string",
        enum: ["h1", "h2", "h3", "h4", "h5", "h6"],
        defaultValue: "h3",
        helperText: "HTML heading level for SEO and accessibility",
      },
      {
        name: "children",
        type: "richText",
        defaultValue: "Your headline text here",
        helperText: "The headline text content",
      },
      {
        name: "className",
        type: "string",
        helperText: "Additional CSS classes to apply",
      },
    ],
    defaultStyles: {
      display: "block",
    },
  }
);
