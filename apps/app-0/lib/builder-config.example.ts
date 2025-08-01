import { 
  registerInsertMenus, 
  registerDesignTokens, 
  registerUiComponents,
  type BuilderAppConfig
} from "@repo/components/registration";

// Example: Minimal configuration with only basic components
export const MINIMAL_BUILDER_CONFIG: BuilderAppConfig = {
  insertMenus: ["ui"],
  components: {
    navigation: false,
    ui: true,
    cta: false,
    layout: false,
    seo: false,
  },
  designTokens: {
    colors: [
      { name: "Primary", value: "#000000" },
      { name: "Secondary", value: "#ffffff" },
    ],
    fontSize: [
      { name: "Small", value: "14px" },
      { name: "Medium", value: "16px" },
      { name: "Large", value: "20px" },
    ],
  },
  designTokensOptional: true,
};

// Example: Landing page focused configuration
export const LANDING_PAGE_CONFIG: BuilderAppConfig = {
  insertMenus: ["ui", "cta", "layout"],
  components: {
    navigation: false,
    ui: true,
    cta: true,
    layout: true,
    seo: false,
  },
  designTokensOptional: false, // Enforce design tokens
};

// Example: Blog-focused configuration
export const BLOG_CONFIG: BuilderAppConfig = {
  insertMenus: ["ui", "seo"],
  components: {
    navigation: true,
    ui: true,
    cta: false,
    layout: false,
    seo: true,
  },
};

// Example: Custom initialization with specific configuration
export async function initializeMinimalBuilder() {
  // Register only UI insert menu
  registerInsertMenus(["ui"]);
  
  // Register custom design tokens
  registerDesignTokens({
    colors: [
      { name: "Brand Primary", value: "#6610f2" },
      { name: "Brand Secondary", value: "#20c997" },
    ],
  });
  
  // Register only UI components
  await registerUiComponents();
}