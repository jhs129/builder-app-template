import type { Meta, StoryObj } from "@storybook/nextjs";
import TileHero from "@/components/sections/TileHero";

const meta = {
  title: "Sections/TileHero",
  component: TileHero,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: { type: "select" },
      options: [
        "light",
        "dark",
        "accent",
        "gradient",
        "transparent-light",
        "transparent-dark",
      ],
      description: "The theme to apply to the hero section",
    },
    inheritTheme: {
      control: "boolean",
      description: "Whether to inherit theme from parent",
      defaultValue: false,
    },
    isHero: {
      control: "boolean",
      description: "Whether this is the main hero (affects heading levels)",
      defaultValue: true,
    },
    maskOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Opacity of the background image mask",
      defaultValue: 0.3,
    },
  },
} satisfies Meta<typeof TileHero>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockNavigation = {
  data: {
    level1: [
      { text: "Home", href: "/" },
      { text: "About", href: "/about" },
      {
        text: "Courses",
        href: "/courses",
        level2: [
          { text: "Silva Method Basics", href: "/courses/basics" },
          { text: "Advanced Training", href: "/courses/advanced" },
          { text: "Online Courses", href: "/courses/online" },
        ],
      },
      { text: "Contact", href: "/contact" },
    ],
  },
  ownerId: "mock-owner",
  lastUpdateBy: null,
  createdDate: 1234567890,
  id: "mock-nav-id",
  "@version": 1,
  name: "Mock Navigation",
  modelId: "navigation",
  published: "published",
  priority: 0,
  query: [],
  lastUpdated: 1234567890,
  firstPublished: 1234567890,
  testRatio: 0,
  createdBy: "mock-user",
  lastUpdatedBy: "mock-user",
};

export const Default: Story = {
  args: {
    eyebrow: "HEY FRIEND",
    headline: "Let's Launch Your Day Dream",
    description:
      "Transform your life with the Silva Method. Learn proven meditation techniques that have helped millions unlock their potential and achieve their goals.",
    buttonLabel: "LEARN MORE",
    buttonHref: "#",
    heroImage:
      "https://images.pexels.com/photos/13865962/pexels-photo-13865962.jpeg",
    theme: "light",
    inheritTheme: false,
    isHero: true,
    maskOpacity: 0.3,
  },
};

export const WithNavigation: Story = {
  args: {
    ...Default.args,
    navigation: mockNavigation,
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: "dark",
  },
};

export const DarkThemeWithNavigation: Story = {
  args: {
    ...Default.args,
    theme: "dark",
    navigation: mockNavigation,
  },
};

export const AccentTheme: Story = {
  args: {
    ...Default.args,
    theme: "accent",
  },
};

export const AccentThemeWithNavigation: Story = {
  args: {
    ...Default.args,
    theme: "accent",
    navigation: mockNavigation,
  },
};

export const InheritedTheme: Story = {
  args: {
    ...Default.args,
    inheritTheme: true,
    theme: undefined,
  },
};

export const SecondaryHero: Story = {
  args: {
    ...Default.args,
    isHero: false,
    eyebrow: "FEATURED COURSE",
    headline: "Master Your Mind",
  },
};

export const CustomMaskOpacity: Story = {
  args: {
    ...Default.args,
    maskOpacity: 0.7,
    description:
      "With a darker mask overlay, the text becomes more prominent against the background image.",
  },
};
