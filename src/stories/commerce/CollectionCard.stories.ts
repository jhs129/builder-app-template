import type { Meta, StoryObj } from "@storybook/nextjs";
import CollectionTile from "@/components/commerce/CollectionTile";

const meta = {
  title: "Commerce/CollectionCard",
  component: CollectionTile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    location: {
      control: { type: "text" },
    },
    href: {
      control: { type: "text" },
    },
    theme: {
      control: "select",
      options: ["light", "dark", "accent", "gradient"],
    },
    inheritTheme: {
      control: "boolean",
    },
    alignment: {
      control: "select",
      options: ["left", "center", "right"],
    },
    maskOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
    },
    outlined: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof CollectionTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: "Silva Method Workshop",
    description:
      "Join us for an intensive Silva Method workshop where you'll learn powerful meditation techniques to enhance your intuition and achieve your goals.",
    imageUrl:
      "https://images.pexels.com/photos/3768197/pexels-photo-3768197.jpeg",
    subheadline: "Transform Your Mind",
    location: "Atlanta, GA",
    ctaText: "Register Now",
    href: "/workshops/silva-method",
  },
};

export const WithoutLocation: Story = {
  args: {
    headline: "Online Meditation Course",
    description:
      "Master the art of meditation from the comfort of your home with our comprehensive online course featuring guided sessions and practical exercises.",
    imageUrl:
      "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
    subheadline: "Online Learning",
    ctaText: "Start Learning",
    href: "/courses/online-meditation",
  },
};

export const WithHTMLDescription: Story = {
  args: {
    headline: "Advanced Intuition Training",
    description:
      "<p>Develop your <strong>psychic abilities</strong> with our advanced training program.</p><ul><li>Remote viewing techniques</li><li>ESP development</li><li>Clairvoyance training</li></ul>",
    imageUrl:
      "https://images.pexels.com/photos/3812944/pexels-photo-3812944.jpeg",
    subheadline: "Unlock Your Potential",
    location: "Asheville, NC",
    ctaText: "Join Program",
    href: "/programs/intuition-training",
  },
};

export const LongContent: Story = {
  args: {
    headline: "Silva Method Complete Certification Program",
    description:
      "Become a certified Silva Method instructor with our comprehensive training program that covers all aspects of the Silva Method including Alpha and Theta level programming, case working, and advanced techniques for personal and professional development.",
    imageUrl:
      "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg",
    subheadline: "Become Certified",
    location: "Multiple Locations Available",
    ctaText: "Learn More",
    href: "/certification/silva-method",
  },
};

export const ShortContent: Story = {
  args: {
    headline: "Intro Class",
    description: "Quick intro to Silva Method basics.",
    imageUrl:
      "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg",
    subheadline: "Get Started",
    location: "Online",
    ctaText: "Join",
    href: "/intro",
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: "dark",
  },
};

export const AccentTheme: Story = {
  args: {
    ...Default.args,
    theme: "accent",
  },
};

export const GradientTheme: Story = {
  args: {
    ...Default.args,
    theme: "gradient",
  },
};

export const InheritTheme: Story = {
  args: {
    ...Default.args,
    inheritTheme: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When inheritTheme is true, the card will inherit theme from its parent context instead of using its own theme.",
      },
    },
  },
};

export const CenterAligned: Story = {
  args: {
    ...Default.args,
    alignment: "center",
  },
  parameters: {
    docs: {
      description: {
        story: "Center-aligned text content for more formal presentations.",
      },
    },
  },
};

export const RightAligned: Story = {
  args: {
    ...Default.args,
    alignment: "right",
  },
  parameters: {
    docs: {
      description: {
        story: "Right-aligned text content for alternative layouts.",
      },
    },
  },
};

export const WithImageOverlay: Story = {
  args: {
    ...Default.args,
    maskOpacity: 0.6,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Card with increased image overlay opacity for better text contrast or dramatic effect.",
      },
    },
  },
};

export const NoImageOverlay: Story = {
  args: {
    ...Default.args,
    maskOpacity: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "Card with no image overlay for full image visibility.",
      },
    },
  },
};

export const SolidButton: Story = {
  args: {
    ...Default.args,
    outlined: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Card with solid (filled) button style instead of outlined.",
      },
    },
  },
};
