# Tabs Component

## Overview

The Tabs component provides a tabbed interface for organizing and displaying content in a structured, navigable format. It supports both content tabs (displaying Builder.io blocks) and link tabs (for external navigation), making it versatile for various use cases.

## Purpose

- **Content Organization**: Group related content into tabs for better user experience
- **Navigation**: Create tabbed navigation with external links
- **Space Efficiency**: Display multiple sections of content in a compact, organized layout
- **Interactive Interface**: Provide an engaging way for users to access different content areas

## Key Features

- **Dual Tab Types**: Support for both content tabs and navigation link tabs
- **Theme Support**: Light and dark theme compatibility via Themeable interface
- **Responsive Design**: Mobile-friendly horizontal tab layout
- **Accessibility**: ARIA-compliant with proper role attributes and keyboard navigation
- **Builder.io Integration**: Full support for nested Builder.io blocks within content tabs
- **SEO-Friendly**: Proper heading structure with configurable H1/H2 tags

## Interface

```typescript
interface TabItem {
  headline: string;
  content?: { blocks: BuilderElement[] };
  type: "content" | "link";
  href?: string;
}

interface TabsProps extends Themeable, Heroic {
  tabs: TabItem[];
  builderBlock?: BuilderElement;
}
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabItem[]` | `[]` | Array of tab items to display |
| `builderBlock` | `BuilderElement` | `undefined` | Builder.io block reference for content blocks |

### Inherited Props (Themeable)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `"light" \| "dark"` | `"light"` | Visual theme for the component |

### Inherited Props (Heroic)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headline` | `string` | `undefined` | Main section headline |
| `isHero` | `boolean` | `false` | Whether to use H1 tag for headline |

### TabItem Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `headline` | `string` | Yes | Tab title displayed in navigation |
| `type` | `"content" \| "link"` | Yes | Tab behavior type |
| `content` | `{ blocks: BuilderElement[] }` | No | Builder.io blocks for content tabs |
| `href` | `string` | No | URL for link tabs |

## Usage Examples

### Basic Content Tabs

```tsx
<Tabs
  headline="Product Features"
  tabs={[
    {
      headline: "Features",
      type: "content",
      content: { blocks: [...] }
    },
    {
      headline: "Specifications", 
      type: "content",
      content: { blocks: [...] }
    },
    {
      headline: "Reviews",
      type: "content", 
      content: { blocks: [...] }
    }
  ]}
/>
```

### Mixed Content and Link Tabs

```tsx
<Tabs
  headline="Course Information"
  theme="dark"
  tabs={[
    {
      headline: "Course Details",
      type: "content",
      content: { blocks: [...] }
    },
    {
      headline: "Schedule",
      type: "content",
      content: { blocks: [...] }
    },
    {
      headline: "Register Now",
      type: "link",
      href: "/register"
    }
  ]}
/>
```

### Hero Section with Tabs

```tsx
<Tabs
  headline="Silva Method Programs"
  isHero={true}
  theme="light"
  tabs={[
    {
      headline: "Beginner Course",
      type: "content",
      content: { blocks: [...] }
    },
    {
      headline: "Advanced Training",
      type: "content",
      content: { blocks: [...] }
    },
    {
      headline: "Instructor Certification",
      type: "content",
      content: { blocks: [...] }
    }
  ]}
/>
```

## Builder.io Configuration

### Registration Details

- **Component Name**: `Tabs`
- **Friendly Name**: `Tabs`
- **Insert Menu**: `Sections`
- **Default Image**: `https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f`

### Builder.io Inputs

| Input | Type | Default | Helper Text |
|-------|------|---------|-------------|
| `theme` | Select | `"light"` | Theme color scheme |
| `headline` | String | `undefined` | Main section headline |
| `isHero` | Boolean | `false` | Use H1 tag for headline |
| `tabs` | List | `[3 default tabs]` | List of tabs to display |

### Tab Sub-fields

| Field | Type | Default | Helper Text |
|-------|------|---------|-------------|
| `headline` | String | `"Tab Title"` | Tab title displayed in navigation |
| `type` | Select | `"content"` | Tab type: content or link |
| `content` | UI Blocks | `{ blocks: [] }` | Content blocks for content tabs |
| `href` | String | `undefined` | URL for link tabs |

## Styling

### Theme Classes

The component applies theme-specific classes via `getThemeClasses(theme)`:

- **Light Theme**: Default styling with light backgrounds and dark text
- **Dark Theme**: Dark backgrounds with light text and appropriate contrast

### CSS Classes

Key CSS classes used:

- `.tabs`: Main container class
- `.container`: Responsive container with padding
- `role="tablist"`: Semantic tab navigation container
- `role="tab"`: Individual tab buttons
- `role="tabpanel"`: Tab content panels

### Responsive Behavior

- **Mobile**: Horizontal scrollable tabs with proper touch interaction
- **Desktop**: Full-width tab navigation with hover states
- **Accessibility**: Focus indicators and keyboard navigation support

## Accessibility Features

- **ARIA Roles**: Proper `tablist`, `tab`, and `tabpanel` roles
- **ARIA States**: `aria-selected` and `aria-hidden` attributes
- **Keyboard Navigation**: Tab key navigation and Enter/Space activation
- **Focus Management**: Visual focus indicators and proper focus flow
- **Screen Readers**: Semantic structure with descriptive labels

## Error Handling

### Empty State

When no tabs are provided, the component displays:
- Container with theme classes applied
- Optional headline if provided
- Friendly message: "No tabs configured. Please add tabs in the Builder.io editor."

### Invalid Tab Types

- Content tabs without content blocks render empty panels
- Link tabs without href default to "#" 

## Best Practices

### Content Guidelines

1. **Tab Titles**: Keep tab headlines concise and descriptive
2. **Content Balance**: Ensure each tab has meaningful content
3. **Navigation Logic**: Use link tabs sparingly for external navigation
4. **Accessibility**: Provide clear, semantic tab labels

### Performance Considerations

1. **Content Loading**: Tab content is loaded but hidden, not lazy-loaded
2. **Block Optimization**: Minimize complex blocks in inactive tabs
3. **Image Optimization**: Use optimized images within tab content
4. **Builder.io Blocks**: Leverage Builder.io's built-in optimization

### SEO Considerations

1. **Headline Structure**: Use `isHero` appropriately for page hierarchy
2. **Content Accessibility**: All tab content is available to search engines
3. **Link Tabs**: External link tabs provide additional navigation paths
4. **Semantic HTML**: Proper heading structure and semantic elements

## Technical Implementation

### State Management

- Uses React `useState` for active tab tracking
- Zero-indexed tab navigation
- Automatic fallback to first tab

### Builder.io Integration

- Full support for nested Builder.io blocks
- Proper data path mapping for content blocks
- Parent element ID integration for block hierarchy

### Performance Optimizations

- Efficient re-rendering with proper key attributes
- Conditional rendering for content vs. link tabs
- CSS-based show/hide for smooth transitions

## Related Components

- **Carousel**: Alternative content organization pattern
- **Accordion**: Vertical content organization
- **Banner Components**: Section-level content containers
- **Navigation Components**: Site-wide navigation patterns

## Migration Notes

When migrating from other tab implementations:

1. **Content Structure**: Ensure content is properly formatted as Builder.io blocks
2. **Tab Types**: Distinguish between content tabs and navigation links
3. **Theme Integration**: Verify theme compatibility
4. **Accessibility**: Test keyboard navigation and screen reader compatibility