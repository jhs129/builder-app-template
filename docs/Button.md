# Button Component Documentation

## Overview
The Button component is a versatile UI element designed for call-to-action interactions and navigation. It supports multiple visual themes, outline styles, and can function as either a clickable button or a navigation link.

## Purpose
This component provides a consistent button interface across the Silva Method application with theming capabilities and flexible styling options for various use cases including CTAs, navigation, and form submissions.

## Technical Details

### Component Location
- **File**: `/src/components/ui/Button.tsx`
- **Registry**: `/src/registry/ui.ts`
- **Story**: `/src/stories/ui/Button.stories.ts`
- **Insert Menu**: UI

### Interface
```typescript
interface ButtonProps extends Themeable {
  label: string;           // Required - The text content of the button
  href?: string;           // Optional - URL the button should link to (default: "#")
  className?: string;      // Optional - Additional CSS classes
  onClick?: () => void;    // Optional - Click handler function
  outlined?: boolean;      // Optional - Use outlined style instead of filled (default: false)
}
```

### Themeable Properties
Extends the `Themeable` interface providing:
- `theme?: Theme` - Visual theme selection (light, dark, accent, gradient, transparent-light, transparent-dark)
- `inheritTheme?: boolean` - Whether to inherit theme from parent (default: true)
- `maskOpacity?: number` - Opacity of overlay mask (0-1, default: 0.3)

## Builder.io Configuration

### Registration Names
- **Primary**: "Button" (override: true)
- **Core**: "Core:Button" (hideFromInsertMenu: true)

### Input Fields
1. **Label** (string, required)
   - Default: "Learn More"
   - Helper: "The text content of the button"

2. **Theme** (string, required)
   - Default: "light"
   - Options: light, dark, accent, gradient, transparent-light, transparent-dark
   - Helper: "Visual theme for the section"

3. **Href** (string)
   - Default: "#"
   - Helper: "The URL the button should link to"

4. **Outlined** (boolean)
   - Default: false
   - Helper: "Use outlined button style instead of filled"

5. **Inherit Theme** (boolean)
   - Default: false
   - Helper: "Inherit theme from parent component instead of using explicit theme"

6. **Mask Opacity** (number)
   - Default: 0.3
   - Range: 0-1, Step: 0.1
   - Helper: "Opacity of the overlay mask (0-1)"

7. **Class Name** (string, advanced)
   - Default: ""
   - Helper: "Additional CSS classes to apply to the button"

## Usage Examples

### Basic Button
```jsx
<Button 
  label="Click Me"
  theme="light"
/>
```

### Navigation Button
```jsx
<Button 
  label="Go to Products"
  href="/products"
  theme="accent"
/>
```

### Outlined Button
```jsx
<Button 
  label="Learn More"
  outlined={true}
  theme="dark"
/>
```

### Button with Custom Handler
```jsx
<Button 
  label="Submit"
  onClick={() => handleSubmit()}
  theme="gradient"
/>
```

### Theme Inheritance
```jsx
<Button 
  label="Inherit Theme"
  inheritTheme={true}
/>
```

## Styling

### CSS Classes
- **Primary**: `.btn.btn-primary` (filled style)
- **Outlined**: `.btn.btn-outlined` (outlined style)
- **Theme**: Applied via `ThemeProvider` when `inheritTheme=false`

### Theme Behavior
- When `inheritTheme !== false`: Renders without ThemeProvider wrapper, inheriting parent theme
- When `inheritTheme === false`: Wraps with ThemeProvider using specified theme

## Best Practices

### Content Guidelines
1. Use clear, action-oriented labels (e.g., "Get Started", "Learn More", "Contact Us")
2. Keep button text concise (1-3 words preferred)
3. Use consistent language throughout the site

### Visual Guidelines
1. Use `outlined={true}` for secondary actions
2. Reserve accent/gradient themes for primary CTAs
3. Consider contrast when choosing themes
4. Use transparent themes over complex backgrounds

### Accessibility
1. Ensure adequate color contrast for all theme combinations
2. Provide meaningful `href` values for navigation buttons
3. Use semantic button elements for form submissions
4. Consider keyboard navigation support

## Integration Notes

### Builder.io Insert Menu
Available in the "UI" insert menu for content editors to add buttons throughout pages and sections.

### Theme System Integration
Fully integrated with the Silva Method theme system, supporting all standard themes and inheritance patterns.

### Storybook Stories
Multiple story variants demonstrate:
- All available themes
- Navigation usage
- Different styling options

## Related Components
- **Text**: For non-interactive text content
- **Image**: Often paired with buttons in CTAs
- **ThemeProvider**: Manages theme context
- **Sections**: Frequently contain buttons for calls-to-action

## Browser Support
Compatible with all modern browsers supporting ES6+ and React 18+.