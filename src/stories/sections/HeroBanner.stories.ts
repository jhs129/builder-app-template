import type { Meta, StoryObj } from "@storybook/nextjs";
import HeroBanner from "@/components/sections/HeroBanner";

const meta = {
  title: "Sections/HeroBanner",
  component: HeroBanner,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    textAlignment: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    maskOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
    },
  },
} satisfies Meta<typeof HeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: "Unlock Your Mind's Extraordinary Potential",
    subheadline: "Silva Method Atlanta & Western North Carolina",
    description:
      "Learn the proven Silva Method meditation techniques that have transformed millions of lives. Develop your intuition, enhance focus, and achieve lasting inner peace through our guided programs.",
    ctaText: "Book Your First Class",
    ctaUrl: "/book-class",
    secondaryCtaText: "Learn More",
    secondaryCtaUrl: "/about",
    backgroundImage:
      "https://images.pexels.com/photos/13865962/pexels-photo-13865962.jpeg",
    maskOpacity: 0.6,
    textAlignment: "left",
  },
};

export const CenterAligned: Story = {
  args: {
    ...Default.args,
    textAlignment: "center",
  },
};

export const WithFeatures: Story = {
  args: {
    ...Default.args,
    features: [
      "Proven meditation techniques",
      "Develop intuition",
      "Enhance focus",
      "Achieve inner peace",
    ],
  },
};

export const WithVideo: Story = {
  args: {
    ...Default.args,
    backgroundVideo:
      "https://sample-videos.com/zip/10/mp4/480/mp4-480-sample-video.mp4",
    backgroundImage: undefined,
  },
};
