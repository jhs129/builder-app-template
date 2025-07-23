import type { Meta, StoryObj } from "@storybook/nextjs";
import TileImage from "@/components/cta/TileImage";

const meta: Meta<typeof TileImage> = {
  title: "CTA/TileImage",
  component: TileImage,
  parameters: {
    layout: "centered",
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
    },
    alignment: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: "https://placehold.co/600x400/EEE/31343C.png",
    headline: "Transform Your Life",
    description: "Discover the power of Silva Method meditation techniques.",
    buttonLabel: "Learn More",
    buttonHref: "#",
    alignment: "center",
    theme: "light",
  },
};

export const WithoutButton: Story = {
  args: {
    image: "https://placehold.co/600x400/333/FFF.png",
    headline: "Pure Inspiration",
    description:
      "Sometimes the message speaks for itself without needing a call to action.",
    alignment: "center",
    theme: "dark",
  },
};

export const LeftAligned: Story = {
  args: {
    image: "https://placehold.co/600x400/4A90E2/FFF.png",
    headline: "Start Your Journey",
    description:
      "Begin your transformation with proven meditation techniques that have helped millions.",
    buttonLabel: "Get Started",
    buttonHref: "/get-started",
    alignment: "left",
    theme: "transparent-light",
  },
};

export const RightAligned: Story = {
  args: {
    image: "https://placehold.co/600x400/7ED321/FFF.png",
    headline: "Unlock Your Potential",
    description: "Harness the power of your mind with Silva Method techniques.",
    buttonLabel: "Discover More",
    buttonHref: "/discover",
    alignment: "right",
    theme: "transparent-dark",
  },
};

export const DarkTheme: Story = {
  args: {
    image: "https://placehold.co/600x400/1A1A1A/FFF.png",
    headline: "Deep Focus",
    description: "Master your mind through advanced meditation practices.",
    buttonLabel: "Begin Practice",
    buttonHref: "/practice",
    alignment: "center",
    theme: "dark",
  },
};

export const AccentTheme: Story = {
  args: {
    image: "https://placehold.co/600x400/9013FE/FFF.png",
    headline: "Silva Method",
    description: "The world's most effective mind training program.",
    buttonLabel: "Join Now",
    buttonHref: "/join",
    alignment: "center",
    theme: "accent",
  },
};

export const GradientTheme: Story = {
  args: {
    image: "https://placehold.co/600x400/FF6B35/FFF.png",
    headline: "Meditation Mastery",
    description:
      "Elevate your consciousness and achieve your goals through proven Silva techniques.",
    buttonLabel: "Start Today",
    buttonHref: "/start",
    alignment: "center",
    theme: "gradient",
  },
};

export const TransparentLight: Story = {
  args: {
    image: "https://placehold.co/600x400/50E3C2/333.png",
    headline: "Mind Over Matter",
    description:
      "Learn to control your thoughts and create the life you desire.",
    buttonLabel: "Learn Techniques",
    buttonHref: "/techniques",
    alignment: "center",
    theme: "transparent-light",
  },
};

export const TransparentDark: Story = {
  args: {
    image: "https://placehold.co/600x400/BD10E0/FFF.png",
    headline: "Inner Peace",
    description: "Find tranquility and balance through Silva Method practices.",
    buttonLabel: "Find Peace",
    buttonHref: "/peace",
    alignment: "center",
    theme: "transparent-dark",
  },
};

export const RichContent: Story = {
  args: {
    image: "https://placehold.co/600x400/F5A623/FFF.png",
    headline: "Advanced Training",
    description: `
      <p><strong>Transform your life</strong> with proven techniques:</p>
      <ul>
        <li>Enhanced intuition</li>
        <li>Better decision making</li>
        <li>Improved focus and clarity</li>
      </ul>
      <p><em>Join thousands who have already transformed their lives.</em></p>
    `,
    buttonLabel: "Transform Now",
    buttonHref: "/transform",
    alignment: "left",
    theme: "dark",
  },
};
