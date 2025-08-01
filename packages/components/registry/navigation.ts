import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";
import {
  alignableInputs,
  commonInputs,
  heroicInputs,
  themeableInputs,
} from "@repo/types";

// Helper function to conditionally set image property
const getImageConfig = () => {
  const envImage = process.env.NEXT_DEFAULT_COMPONENT_IMAGE;
  return envImage ? { image: envImage } : {};
};

Builder.registerComponent(
  dynamic(() => import("../components/navigation/Header")),
  {
    name: "Header",
    ...getImageConfig(),
      inputs: [
        { name: "navigation1", type: "object", friendlyName: "Primary Navigation" },
        { name: "navigation2", type: "object", friendlyName: "Secondary Navigation" },
        { name: "logo", type: "string", friendlyName: "Logo URL" }
      ]
  }
);

Builder.registerComponent(
  dynamic(() => import("../components/navigation/Footer")),
  {
    name: "Footer",
    ...getImageConfig(),
      inputs: [
        { name: "navigation", type: "object", friendlyName: "Footer Navigation" },
        { name: "socialNetworks", type: "list", subFields: [
          { name: "name", type: "string" },
          { name: "href", type: "string" }
        ]}
      ],
  }
);

Builder.registerComponent(
  dynamic(() => import("../components/navigation/VerticalNavigation")),
  {
    name: "VerticalNavigation",
    friendlyName: "Vertical Navigation",
    ...getImageConfig(),
    inputs: [
      ...themeableInputs,
      ...heroicInputs,
      ...alignableInputs,
      {
        name: "navigation",
        type: "object",
        friendlyName: "Navigation Data",
        helperText: "Navigation structure with level1 array of {text, href} objects",
        defaultValue: {
          data: {
            level1: [
              { text: "Home", href: "/" },
              { text: "About", href: "/about" },
              { text: "Services", href: "/services" },
              { text: "Contact", href: "/contact" }
            ]
          }
        }
      },
      ...commonInputs,
    ],
    defaultStyles: {
      marginBottom: "20px",
    },
  }
);
