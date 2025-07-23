## Development Guidelines

- Always register components with default images coming from placehold.co.  For example: https://placehold.co/600x400.png
- Use the format of https://jhsdc.atlassian.net/wiki/spaces/SM/pages/23069197/Banner75 to create documentation for CMS components
- When creating a new component always create a builder.io registration for that component in the respective registry file.  For example if you created a component in src/components/ui/Accordion.tsx you would place the registry in src/registry/ui.ts
- When we register a component with builder.io we also always need to create a storybook story for that component.  The story should be placed in the respective folder to the component under the src/stories folder.  For example, if we create a component in src/components/ui/Accordion.tsx then the storybook story should be created at src/stories/ui/Accordion.stories.tsx. Also anytime we update the component where we change the interface we should update the story accordingly
- When registering a component, it should be registered in its respective insertMenu. For example, for src/components/ui/Accordion.tsx it should be registered in the UI insertMenu in @src/builder-registry.ts
- When we register components we should make the image field of the registration equal to https://cdn.builder.io/api/v1/image/assets%2Faa26d0ed43ef421da301a1603f38faeb%2F4f97f24502864d2b8a8d414115cd5b9f
- Always use the format contained in https://jhsdc.atlassian.net/wiki/spaces/SM/pages/22970570/Banner50 as a template for documenting component requirements.  Keep the same structure of sections and content always
- When updating components always use configured tailwind css colors from @tailwind.config.js .  Where possible these colors should be part of a theme like @src/styles/themes/light.css 

## Code Review Guidelines

- The dangerouslySetInnerHTML={{ __html: collection.description }} and dangerouslySetInnerHTML={{ __html: product.description }} statements are very intentional and acceptable. Do not include this in code review feedback moving forward
- For type safety in src/pages/blogs/[handle].tsx:12, the `article: any` typing is very intentional and should be disregarded

## PR Review Notes

- Disregard feedback item #2 in the PR window.location.href = `${shopifyDomain}/cart/${variantId}:1` as the shopifyDomain is not user-controllable, that is set as an environment variable