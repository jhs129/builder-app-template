import { 
  registerInsertMenus, 
  registerDesignTokens, 
  registerNavigationComponents,
  registerUiComponents,
  registerCtaComponents,
  registerLayoutComponents,
  registerSeoComponents,
  type BuilderAppConfig,
  DEFAULT_DESIGN_TOKENS
} from "@repo/components/registration";
import { registerThemeInjection } from "./theme-injection";

// Default configuration for app-0
export const APP_0_BUILDER_CONFIG: BuilderAppConfig = {
  insertMenus: ["navigation", "ui", "cta", "layout", "seo"],
  components: {
    navigation: true,
    ui: true,
    cta: true,
    layout: true,
    seo: true,
  },
  designTokens: DEFAULT_DESIGN_TOKENS,
  designTokensOptional: true,
};

// Function to initialize Builder.io with app-specific configuration
export async function initializeBuilder(config: BuilderAppConfig = APP_0_BUILDER_CONFIG) {
  // Register theme injection for Builder.io preview environment
  registerThemeInjection();
  
  // Register insert menus
  registerInsertMenus(config.insertMenus);
  
  // Register design tokens
  registerDesignTokens(config.designTokens, {
    designTokensOptional: config.designTokensOptional,
  });
  
  // Register components based on configuration
  const registrationPromises: Promise<void>[] = [];
  
  if (config.components.navigation) {
    registrationPromises.push(registerNavigationComponents());
  }
  
  if (config.components.ui) {
    registrationPromises.push(registerUiComponents());
  }
  
  if (config.components.cta) {
    registrationPromises.push(registerCtaComponents());
  }
  
  if (config.components.layout) {
    registrationPromises.push(registerLayoutComponents());
  }
  
  if (config.components.seo) {
    registrationPromises.push(registerSeoComponents());
  }
  
  // Wait for all component registrations to complete
  await Promise.all(registrationPromises);
}