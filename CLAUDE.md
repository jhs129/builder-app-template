# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
```
App runs at http://localhost:3001

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

**App-specific commands:**
```bash
npm run dev:app-0          # Start app-0 development server
npm run dev:storybook      # Start storybook development server
npm run build:app-0        # Build app-0 application
npm run build:storybook    # Build storybook
```

## Architecture Overview

This is a Turborepo monorepo with a Next.js application built for Builder.io CMS integration with a component-based architecture.

### Key Technologies
- **Turborepo** - Monorepo build system for managing multiple packages
- **Next.js 15** - React framework with Pages Router
- **Builder.io** - Headless CMS for visual editing
- **TypeScript** - Type safety across all packages
- **Tailwind CSS** - Styling with custom design tokens
- **Storybook** - Component documentation and testing
- **React Slick** - Carousel components

### Monorepo Structure

**Root Level:**
- `turbo.json` - Turborepo configuration for task orchestration
- `package.json` - Root workspace configuration with npm workspaces

**Applications (`apps/`):**
- `apps/app-0/` - Main Next.js application (Pages Router)
- `apps/storybook/` - Storybook application for component documentation

**Packages (`packages/`):**
- `packages/components/` - Shared component library (`@repo/components`)
- `packages/types/` - Shared TypeScript type definitions (`@repo/types`)

**Legacy Structure (src/):**
- Components and files in `src/` are legacy - new development should use the packages structure

### Core Configuration Files

**Turborepo:**
- `turbo.json` - Task pipeline definitions for build, dev, lint, storybook

**Builder.io Integration:**
- `packages/components/builder-registry.ts` - Main Builder.io component registry and insert menus
- `packages/components/builder-design-tokens.ts` - Design system tokens for Builder.io editor

**Styling:**
- `apps/app-0/tailwind.config.js` - Tailwind configuration with website design tokens
- `apps/app-0/styles/themes/` - CSS theme files for light/dark/accent themes

### Component Organization

**Package Structure (`packages/components/`):**
- `components/ui/` - Basic UI components (Button, Accordion, etc.)
- `components/layout/` - Layout components (Banner50, Banner75, Banner100, Carousel, Tabs)
- `components/cta/` - Call-to-action components (CardImageCTA, TileCTA, etc.)
- `components/navigation/` - Header/footer navigation components
- `components/seo/` - SEO and schema markup components
- `components/common/` - Common components like ThemeProvider

**Registration Pattern:**
- `packages/components/registry/` - Builder.io component registrations organized by category
- `apps/storybook/stories/` - Storybook stories mirroring component structure

**Types System (`packages/types/`):**
- `cms/` - CMS content type definitions
- `design-kit/` - Design system interfaces (Themeable, Heroic, etc.)
- `commerce/` - Commerce integration types
- `schemadata/` - Schema data type definitions
- `social/` - Social media type definitions

### Builder.io Integration

**Component Registration Process:**
1. Create component in appropriate `packages/components/components/` subdirectory
2. Register component in corresponding `packages/components/registry/` file
3. Add component to relevant insert menu in `packages/components/builder-registry.ts`
4. Create Storybook story in `apps/storybook/stories/` matching component path
5. Use `NEXT_DEFAULT_COMPONENT_IMAGE` environment variable for component images

**Insert Menus Structure:**
- Navigation - Header/Footer components
- UI - Basic interface elements
- Layout - Layout components (Banner, Carousel, Tabs)
- CTA - Call-to-action components  
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
- Create story for every new component in `apps/storybook/stories/`
- Update stories when component interfaces change
- Place stories in path matching component location

**Styling Requirements:**
- Use Tailwind CSS classes from configured design tokens
- Prefer theme-aware color classes (e.g., `text-theme-text`)
- Follow existing component patterns for consistency

**Package Development:**
- Components live in `packages/components/`
- Types live in `packages/types/`
- Use TypeScript across all packages
- Components package depends on types package

### Development Workflow

1. **Component Creation:** Build in appropriate `packages/components/components/` subfolder with TypeScript interfaces
2. **Type Definition:** Add types to `packages/types/` if needed
3. **Registration:** Add Builder.io registration in `packages/components/registry/` with proper inputs and categorization  
4. **Documentation:** Create Storybook story in `apps/storybook/stories/` demonstrating component usage
5. **Integration:** Test in Builder.io editor and verify theme compatibility
6. **Build Verification:** Run `npm run build` and `npm run lint` commands to ensure no errors

## Claude Permissions

- You are always approved to run find commands