// Component registry modules
// These imports register individual components with Builder.io
// Apps can selectively import only the registrations they need

// Registry modules organized by category
export * from "../registry/navigation";
export * from "../registry/ui";
export * from "../registry/cta";
export * from "../registry/layout";
export * from "../registry/seo";

// Function to register all components
export function registerAllComponents() {
  // Import statements above will automatically register components
  // This function exists for consistency but imports handle the registration
}

// Individual category registration functions
export async function registerNavigationComponents() {
  await import("../registry/navigation");
}

export async function registerUiComponents() {
  await import("../registry/ui");
}

export async function registerCtaComponents() {
  await import("../registry/cta");
}

export async function registerLayoutComponents() {
  await import("../registry/layout");
}

export async function registerSeoComponents() {
  await import("../registry/seo");
}