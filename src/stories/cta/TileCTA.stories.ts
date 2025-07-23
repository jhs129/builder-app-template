import type { Meta, StoryObj } from '@storybook/nextjs';
import TileCTA from '@/components/cta/TileCTA';

const meta = {
  title: 'CTA/TileCTA',
  component: TileCTA,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'accent', 'gradient', 'transparent-light', 'transparent-dark'],
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<typeof TileCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: "HEY FRIEND",
    headline: "Let's Launch Your Day Dream",
    description: "Transform your life with the Silva Method. Learn proven meditation techniques that have helped millions unlock their potential and achieve their goals.",
    buttonLabel: "LEARN MORE",
    buttonHref: "#",
    alignment: "center",
    theme: "light",
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

export const WithoutEyebrow: Story = {
  args: {
    ...Default.args,
    eyebrow: undefined,
  },
};

export const LeftAligned: Story = {
  args: {
    ...Default.args,
    eyebrow: "LEFT ALIGNED",
    headline: "Content Aligned to the Left",
    alignment: "left",
    theme: "light",
  },
};

export const RightAligned: Story = {
  args: {
    ...Default.args,
    eyebrow: "RIGHT ALIGNED", 
    headline: "Content Aligned to the Right",
    alignment: "right",
    theme: "accent",
  },
};