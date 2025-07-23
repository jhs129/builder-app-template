import { Builder } from "@builder.io/react";

// Register Silva Method design tokens with Builder.io
Builder.register("editor.settings", {
  designTokens: {
    colors: [
      // Primary Silva Method Colors
      { name: "Primary Dark", value: "var(--primary-dark, #1d0f34)" },
      { name: "Primary Light", value: "var(--primary-light, #ffffff)" },
      { name: "Secondary Light", value: "var(--secondary-light, #f5f5f5)" },
      { name: "Secondary Dark", value: "var(--secondary-dark, #647589)" },
      { name: "Primary Accent", value: "var(--primary-accent, #6610f2)" },
      { name: "Secondary Accent", value: "var(--accent-purple, #6a0dad)" },

      // Accent Colors
      { name: "Emerald Green", value: "var(--accent-green, #20c997)" },
      { name: "Deep Purple", value: "var(--accent-purple, #6a0dad)" },
      { name: "Bright Magenta", value: "var(--accent-magenta, #b31d9d)" },
      { name: "Bright Cyan", value: "var(--accent-cyan, #5ce1e6)" },
      { name: "Sky Blue", value: "var(--accent-teal, #0dcaf0)" },
      { name: "Light Purple", value: "var(--accent-light-purple, #8c52ff)" },
    ],
    fontFamily: [
      {
        name: "Primary",
        value: "var(--font-primary)",
      },
      {
        name: "Secondary",
        value: "var(--font-secondary)",
      },
      {
        name: "Accent",
        value: "var(--font-accent)",
      },
    ],

    fontSize: [
      // Standard Sizes

      

      // Silva Method Specific Sizes
      { name: "Silva Hero", value: "40px" },
      { name: "Silva Heading", value: "24px" },
      { name: "Silva Subheading", value: "18px" },
      { name: "Silva Body", value: "14px" },
      { name: "Silva Small", value: "12px" },
    ],

    spacing: [
      // Base Spacing Scale
      { name: "None", value: "0px" },
      { name: "XS", value: "4px" },
      { name: "SM", value: "8px" },
      { name: "MD", value: "12px" },
      { name: "Base", value: "16px" },
      { name: "LG", value: "20px" },
      { name: "XL", value: "24px" },
      { name: "2XL", value: "32px" },
      { name: "3XL", value: "40px" },
      { name: "4XL", value: "48px" },
      { name: "5XL", value: "64px" },
      { name: "6XL", value: "80px" },
      { name: "7XL", value: "96px" },
      { name: "8XL", value: "128px" },

      // Silva Method Specific Spacing
      { name: "Silva Section", value: "36px" },
      { name: "Silva Container", value: "50px" },
      { name: "Silva Card", value: "32px" },
      { name: "Silva Text", value: "16px" },
      { name: "Silva Element", value: "20px" },
    ],

    borderRadius: [
      { name: "None", value: "0px" },
      { name: "Small", value: "4px" },
      { name: "Default", value: "8px" },
      { name: "Medium", value: "12px" },
      { name: "Large", value: "16px" },
      { name: "Extra Large", value: "24px" },
      { name: "2X Large", value: "32px" },
      { name: "Full", value: "9999px" },
    ],

    boxShadow: [
      { name: "Small", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
      {
        name: "Default",
        value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      },
      {
        name: "Medium",
        value:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      {
        name: "Large",
        value:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
      {
        name: "Extra Large",
        value:
          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      },
    ],
  },

  // Allow content editors to override design tokens if needed
  designTokensOptional: true,
});

// Register Silva Method specific gradients as custom options
Builder.register("editor.settings", {
  customCSS: `
    .silva-gradient-primary {
      background: linear-gradient(rgba(102, 16, 242, 0.63), rgba(175, 47, 191, 0.64) 50%, rgba(13, 202, 240, 0.63) 100%);
    }

    .silva-gradient-secondary {
      background: linear-gradient(89deg, rgb(140, 82, 255) 7%, rgb(92, 225, 230) 94%);
    }

    .silva-btn-primary {
      background-color: rgb(32, 201, 151);
      color: rgb(255, 255, 255);
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
      border: none;
      cursor: pointer;
      font-size: 14px;
    }

    .silva-btn-primary:hover {
      background-color: rgb(28, 176, 132);
    }

    .silva-btn-secondary {
      background-color: rgb(102, 16, 242);
      color: rgb(255, 255, 255);
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
      border: none;
      cursor: pointer;
      font-size: 14px;
    }

    .silva-btn-secondary:hover {
      background-color: rgb(106, 13, 173);
    }
  `,
});
