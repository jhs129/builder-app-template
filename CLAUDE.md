## Development Guidelines

- Always register components with default images coming from placehold.co.  For example: https://placehold.co/600x400.png
- When creating a new component always create a builder.io registration for that component in the respective registry file.  For example if you created a component in src/components/ui/Accordion.tsx you would place the registry in src/registry/ui.ts
- When we register a component with builder.io we also always need to create a storybook story for that component.  The story should be placed in the respective folder to the component under the src/stories folder.  For example, if we create a component in src/components/ui/Accordion.tsx then the storybook story should be created at src/stories/ui/Accordion.stories.tsx. Also anytime we update the component where we change the interface we should update the story accordingly
- When registering a component, it should be registered in its respective insertMenu. For example, for src/components/ui/Accordion.tsx it should be registered in the UI insertMenu in @src/builder-registry.ts
- When we register components we should make the image field of the registration equal to the value of the NEXT_DEFAULT_COMPONENT_IMAGE environment variable
- When updating components always use configured tailwind css colors from @tailwind.config.js .  Where possible these colors should be part of a theme like @src/styles/themes/light.css 

## Code Review Guidelines


## PR Review Notes

