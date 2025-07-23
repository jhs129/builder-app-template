# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
```
Server runs at http://localhost:3000

**Build project:**
```bash
npm run build
```

**Lint code:**
```bash
npm run lint
```

**Start Storybook:**
```bash
npm run storybook
```
Storybook runs at http://localhost:6006

**Build Storybook:**
```bash
npm run build-storybook
```

## Architecture Overview

This is a Next.js application built for Builder.io CMS integration with a component-based architecture focused on the Silva Method brand.

### Key Technologies
- **Next.js 15** - React framework with App Router
- **Builder.io** - Headless CMS for visual editing
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with custom design tokens
- **Storybook** - Component documentation and testing
- **React Slick** - Carousel components

### Project Structure

**Core Configuration:**
- `src/builder-registry.ts` - Main Builder.io component registry and insert menus
- `src/builder-design-tokens.ts` - Design system tokens for Builder.io editor
- `tailwind.config.js` - Tailwind configuration with Silva Method design tokens
- `src/styles/themes/` - CSS theme files for light/dark/accent themes

**Component Organization:**
- `src/components/ui/` - Basic UI components (Button, Accordion, etc.)
- `src/components/sections/` - Page section components (HeroBanner, etc.)
- `src/components/cta/` - Call-to-action components
- `src/components/commerce/` - E-commerce related components
- `src/components/navigation/` - Header/footer navigation
- `src/components/seo/` - SEO and schema markup components

**Registration Pattern:**
- `src/registry/` - Builder.io component registrations organized by category
- `src/stories/` - Storybook stories mirroring component structure

**Types System:**
- `src/types/cms/` - CMS content type definitions
- `src/types/design-kit/` - Design system interfaces (Themeable, Heroic, etc.)
- `src/types/commerce/` - Shopify integration types

### Builder.io Integration

**Component Registration Process:**
1. Create component in appropriate `src/components/` subdirectory
2. Register component in corresponding `src/registry/` file
3. Add component to relevant insert menu in `src/builder-registry.ts`
4. Create Storybook story in `src/stories/` matching component path
5. Use `NEXT_DEFAULT_COMPONENT_IMAGE` environment variable for component images

**Insert Menus Structure:**
- Navigation - Header/Footer components
- UI - Basic interface elements
- CTA - Call-to-action components  
- Commerce - E-commerce components
- Sections - Page layout sections
- SEO - Schema and SEO components

**Design System:**
- Theme-aware components using CSS custom properties
- Standardized inputs: `themeableInputs`, `heroicInputs`, `commonInputs`
- Design tokens registered with Builder.io editor
- Consistent image defaults from placehold.co with .png extension

### Theme System

**CSS Custom Properties Pattern:**
- Theme-aware colors: `--theme-bg`, `--theme-text`, `--theme-heading`
- Button theming: `--theme-btn-bg`, `--theme-btn-hover-bg`
- Component interfaces extend `Themeable` for theme inheritance

**Available Themes:**
- light, dark, accent, gradient, transparent-light, transparent-dark

### Component Development Guidelines

**Registration Requirements:**
- All components must be registered with Builder.io
- Use dynamic imports for component registration
- Include appropriate inputs with helper text
- Set component images to environment variable value
- Register in correct insert menu category

**Storybook Requirements:**
- Create story for every new component
- Update stories when component interfaces change
- Place stories in path matching component location

**Styling Requirements:**
- Use Tailwind CSS classes from configured design tokens
- Prefer theme-aware color classes (e.g., `text-theme-text`)
- Follow existing component patterns for consistency

### Development Workflow

1. **Component Creation:** Build in appropriate subfolder with TypeScript interfaces
2. **Registration:** Add Builder.io registration with proper inputs and categorization  
3. **Documentation:** Create Storybook story demonstrating component usage
4. **Integration:** Test in Builder.io editor and verify theme compatibility
5. **Build Verification:** Run build and lint commands to ensure no errors
