// Re-export all registration utilities
export * from "./insert-menus";
export * from "./design-tokens";
export * from "./components";

// Configuration interface for Builder.io app setup
export interface BuilderAppConfig {
  // Which insert menus to include
  insertMenus: import("./insert-menus").InsertMenuKey[];
  
  // Which component categories to register
  components: {
    navigation?: boolean;
    ui?: boolean;
    cta?: boolean;
    layout?: boolean;
    seo?: boolean;
  };
  
  // Custom design tokens (will merge with defaults)
  designTokens?: Partial<import("./design-tokens").DesignTokens>;
  
  // Design token options
  designTokensOptional?: boolean;
}

// Convenience function to register everything (backwards compatibility)
export function registerAllBuilderContent() {
  // Import components (registers them automatically)
  import("./components");
  
  // Register all insert menus
  import("./insert-menus").then(({ registerAllInsertMenus }) => {
    registerAllInsertMenus();
  });
  
  // Register design tokens
  import("./design-tokens").then(({ registerDesignTokens }) => {
    registerDesignTokens();
  });
}