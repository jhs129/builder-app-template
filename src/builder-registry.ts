import { Builder } from "@builder.io/react";
import "./registry";
import "./registry/commerce";
import "./registry/seo";
import "./builder-design-tokens";

// Register custom insert menus for Silva Method components
Builder.register("insertMenu", {
  name: "Navigation",
  items: [
    { name: "Header" },
    { name: "Footer" },
  ],
});

Builder.register("insertMenu", {
  name: "UI",
  items: [
    { name: "Accordion" },
    { name: "Button" },
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
  name: "Commerce",
  items: [
    { name: "CollectionTile" },
    { name: "ProductCard" },
    { name: "ProductGrid" },
  ],
});

Builder.register("insertMenu", {
  name: "Sections",
  items: [
    { name: "Core:Section" },
    { name: "Banner100" },
    { name: "Banner75" },
    { name: "Banner50" },
    { name: "Carousel" },
    { name: "HeroBanner" },
    { name: "InstructorHero" },
    { name: "InstructorBio" },
    { name: "MediaMentions" },
    { name: "StatsCounter" },
    { name: "CollectionHero" },
    { name: "TileHero" },
    { name: "Tabs" },
 
  ],
});

Builder.register("insertMenu", {
  name: "SEO",
  items: [
    { name: "EventSchemaData" },
  ],
});
