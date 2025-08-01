import { Builder } from "@builder.io/react";
import "./registry";
import "./registry/seo";
import "./builder-design-tokens";

// Register custom insert menus 
Builder.register("insertMenu", {
  name: "Navigation",
  items: [
    { name: "Header" },
    { name: "Footer" },
    { name: "VerticalNavigation" },
  ],
});

Builder.register("insertMenu", {
  name: "UI",
  items: [
    { name: "Accordion" },
    { name: "Alert" },
    { name: "Button" },
    { name: "Headline" },
    { name: "Text" },
    { name: "Image" },
    { name: "Box" },
    { name: "Columns"},
    { name: "ImageTestimonial" },
  ],
});


Builder.register("insertMenu", {
  name: "CTA",
  items: [
    { name: "ImageCTACard" },
    { name: "TileContent" },
    { name: "TileImage" },
    { name: "TileQuote" },
    { name: "TileCTA" },
    { name: "CardImageCTA" },
  ],
});


Builder.register("insertMenu", {
  name: "Layout",
  items: [
    { name: "Core:Section" },
    { name: "Banner100" },
    { name: "Carousel" },
    { name: "Tabs" },
 
  ],
});

