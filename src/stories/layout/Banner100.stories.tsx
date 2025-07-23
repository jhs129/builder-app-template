import type { Meta, StoryObj } from "@storybook/nextjs";
import Banner100 from "@/components/layout/Banner100";

const meta: Meta<typeof Banner100> = {
  title: "Layout/Banner100",
  component: Banner100,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A flexible banner component that supports various background types (none, image, video, youtube) with customizable themes, alignment, and overlay masks.",
      },
    },
  },
  argTypes: {
    theme: {
      control: { type: "select" },
      options: ["light", "dark", "gradient", "accent"],
      description: "Theme variant for the banner",
    },
    backgroundType: {
      control: { type: "select" },
      options: ["none", "image", "video", "youtube"],
      description: "Type of background to display",
    },
    alignment: {
      control: { type: "select" },
      options: ["left", "center", "right"],
      description: "Content alignment within the banner",
    },
    maskOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Opacity of the overlay mask (0-1)",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether content should be full width or contained",
    },
    backgroundImage: {
      control: { type: "text" },
      description: "Background image URL (when backgroundType is 'image')",
    },
    backgroundVideo: {
      control: { type: "text" },
      description: "Video file URL (when backgroundType is 'video')",
    },
    backgroundVideoId: {
      control: { type: "text" },
      description: "YouTube video ID (when backgroundType is 'youtube')",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content for stories
const sampleContent = (
  <div className="text-center max-w-4xl">
    <h6 className="text-sm uppercase tracking-wider mb-4 opacity-80">
      Silva Method Training
    </h6>
    <h1 className="text-5xl font-bold mb-6 leading-tight">
      Unlock Your Mind&apos;s Extraordinary Potential
    </h1>
    <p className="text-lg mb-8 opacity-90 leading-relaxed">
      Learn the proven Silva Method meditation techniques that have transformed
      millions of lives. Develop your intuition, enhance focus, and achieve
      lasting inner peace through our guided programs.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="px-8 py-3 bg-accent-green text-white rounded-lg font-medium hover:bg-accent-green/90 transition-colors">
        Start Your Journey
      </button>
      <button className="px-8 py-3 bg-transparent border-2 border-current rounded-lg font-medium hover:bg-white/10 transition-colors">
        Learn More
      </button>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    theme: "light",
    backgroundType: "none",
    alignment: "center",
    fullWidth: false,
    children: sampleContent,
  },
};

export const WithBackgroundImage: Story = {
  args: {
    theme: "dark",
    backgroundType: "image",
    backgroundImage:
      "https://images.pexels.com/photos/13865962/pexels-photo-13865962.jpeg",
    alignment: "center",
    fullWidth: false,
    maskOpacity: 0.4,
    children: sampleContent,
  },
};

export const WithYouTubeBackground: Story = {
  args: {
    theme: "dark",
    backgroundType: "youtube",
    backgroundVideoId: "dQw4w9WgXcQ",
    alignment: "center",
    fullWidth: false,
    maskOpacity: 0.5,
    children: sampleContent,
  },
};

export const WithVideoBackground: Story = {
  args: {
    theme: "dark",
    backgroundType: "video",
    backgroundVideo:
      "https://sample-videos.com/zip/10/mp4/360/SampleVideo_360x240_1mb.mp4",
    alignment: "center",
    fullWidth: false,
    maskOpacity: 0.6,
    children: sampleContent,
  },
};

export const LeftAligned: Story = {
  args: {
    theme: "gradient",
    backgroundType: "image",
    backgroundImage:
      "https://images.pexels.com/photos/13865962/pexels-photo-13865962.jpeg",
    alignment: "left",
    fullWidth: false,
    maskOpacity: 0.3,
    children: (
      <div className="max-w-2xl">
        <h6 className="text-sm uppercase tracking-wider mb-4 opacity-80">
          Transform Your Life
        </h6>
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Silva Method Meditation
        </h1>
        <p className="text-lg mb-8 opacity-90 leading-relaxed">
          Join thousands of students who have discovered their inner potential
          through our proven meditation techniques.
        </p>
        <button className="px-8 py-3 bg-accent-green text-white rounded-lg font-medium hover:bg-accent-green/90 transition-colors">
          Get Started Today
        </button>
      </div>
    ),
  },
};

export const RightAligned: Story = {
  args: {
    theme: "accent",
    backgroundType: "image",
    backgroundImage:
      "https://images.pexels.com/photos/13865962/pexels-photo-13865962.jpeg",
    alignment: "right",
    fullWidth: false,
    maskOpacity: 0.4,
    children: (
      <div className="max-w-2xl text-right">
        <h6 className="text-sm uppercase tracking-wider mb-4 opacity-80">
          Silva Method Training
        </h6>
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Master Your Mind
        </h1>
        <p className="text-lg mb-8 opacity-90 leading-relaxed">
          Experience the power of guided meditation and unlock your mind&apos;s
          extraordinary capabilities.
        </p>
        <button className="px-8 py-3 bg-accent-purple text-white rounded-lg font-medium hover:bg-accent-purple/90 transition-colors">
          Explore Programs
        </button>
      </div>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    theme: "dark",
    backgroundType: "image",
    backgroundImage:
      "https://images.pexels.com/photos/13865962/pexels-photo-13865962.jpeg",
    alignment: "center",
    fullWidth: true,
    maskOpacity: 0.5,
    children: sampleContent,
  },
};

export const CustomMask: Story = {
  args: {
    theme: "light",
    backgroundType: "image",
    backgroundImage:
      "https://images.pexels.com/photos/13865962/pexels-photo-13865962.jpeg",
    alignment: "center",
    fullWidth: false,
    maskOpacity: 0.7,
    children: sampleContent,
  },
};

export const MinimalContent: Story = {
  args: {
    theme: "gradient",
    backgroundType: "none",
    alignment: "center",
    fullWidth: false,
    children: (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Simple Banner</h2>
        <p className="text-lg opacity-80">
          Clean and minimal banner with no background.
        </p>
      </div>
    ),
  },
};
