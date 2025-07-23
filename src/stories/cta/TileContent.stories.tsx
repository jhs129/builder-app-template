import type { Meta, StoryObj } from '@storybook/nextjs';
import TileContent from "@/components/cta/TileContent";
import Button from "@/components/ui/Button";

const meta: Meta<typeof TileContent> = {
  title: "CTA/TileContent",
  component: TileContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: { type: "select" },
      options: ["light", "dark", "accent", "gradient", "transparent-light", "transparent-dark"],
    },
    alignment: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    isHero: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: "Your Content Title",
    description: "Add your content description here. This supports rich text formatting.",
    alignment: "center",
    theme: "light",
    isHero: false,
  },
};

export const WithSingleButton: Story = {
  args: {
    headline: "Get Started Today",
    description: "Transform your life with proven techniques that have helped millions achieve their goals.",
    alignment: "center",
    theme: "light",
    isHero: false,
  },
  render: (args) => (
    <TileContent {...args}>
      <Button label="Learn More" href="#" theme={args.theme} />
    </TileContent>
  ),
};

export const WithMultipleButtons: Story = {
  args: {
    headline: "Choose Your Path",
    description: "Whether you're a beginner or looking to advance your practice, we have the perfect course for you.",
    alignment: "center",
    theme: "light",
    isHero: false,
  },
  render: (args) => (
    <TileContent {...args}>
      <Button label="Get Started" href="#" theme={args.theme} />
      <Button label="Learn More" href="#" theme={args.theme} />
    </TileContent>
  ),
};

export const HeroVersion: Story = {
  args: {
    headline: "Master Your Mind",
    description: "Join millions who have transformed their lives through the Silva Method. Unlock your potential with proven meditation and mind control techniques.",
    alignment: "center",
    theme: "accent",
    isHero: true,
  },
  render: (args) => (
    <TileContent {...args}>
      <Button label="Start Your Journey" href="#" theme={args.theme} />
      <Button label="Watch Demo" href="#" theme={args.theme} />
    </TileContent>
  ),
};

export const LeftAligned: Story = {
  args: {
    headline: "Left Aligned Content",
    description: "This content is aligned to the left, perfect for asymmetrical layouts and modern design patterns.",
    alignment: "left",
    theme: "dark",
    isHero: false,
  },
  render: (args) => (
    <TileContent {...args}>
      <Button label="Continue" href="#" theme={args.theme} />
    </TileContent>
  ),
};

export const RightAligned: Story = {
  args: {
    headline: "Right Aligned Content",
    description: "This content is aligned to the right, creating visual interest and breaking traditional patterns.",
    alignment: "right",
    theme: "gradient",
    isHero: false,
  },
  render: (args) => (
    <TileContent {...args}>
      <Button label="Get Started" href="#" theme={args.theme} />
    </TileContent>
  ),
};

export const TransparentLight: Story = {
  args: {
    headline: "Overlay Content",
    description: "This transparent theme is perfect for placing over images or custom backgrounds.",
    alignment: "center",
    theme: "transparent-light",
    isHero: false,
  },
  render: (args) => (
    <TileContent {...args}>
      <Button label="Learn More" href="#" theme={args.theme} />
    </TileContent>
  ),
};

export const TransparentDark: Story = {
  args: {
    headline: "Dark Overlay Content",
    description: "This dark transparent theme works great over light backgrounds and images.",
    alignment: "center",
    theme: "transparent-dark",
    isHero: false,
  },
  render: (args) => (
    <TileContent {...args}>
      <Button label="Get Started" href="#" theme={args.theme} />
    </TileContent>
  ),
};

export const RichTextContent: Story = {
  args: {
    headline: "Rich Text Example",
    description: `
      <p>This content demonstrates <strong>rich text formatting</strong> capabilities.</p>
      <ul>
        <li>Bullet point one</li>
        <li>Bullet point two</li>
        <li>Bullet point three</li>
      </ul>
      <p><em>You can use HTML formatting</em> to create engaging content.</p>
    `,
    alignment: "left",
    theme: "light",
    isHero: false,
  },
  render: (args) => (
    <TileContent {...args}>
      <Button label="Explore Features" href="#" theme={args.theme} />
      <Button label="Contact Us" href="#" theme={args.theme} />
    </TileContent>
  ),
};