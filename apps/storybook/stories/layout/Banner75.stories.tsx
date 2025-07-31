import type { Meta, StoryObj } from '@storybook/nextjs';
import { Banner75 } from '@repo/components';

const meta = {
  title: 'Layout/Banner75',
  component: Banner75,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundType: {
      control: 'select',
      options: ['none', 'image', 'video', 'youtube'],
      description: 'Type of background media',
    },
    backgroundImage: {
      control: 'text',
      description: 'Background image URL',
    },
    backgroundVideo: {
      control: 'text',
      description: 'Background video URL',
    },
    backgroundVideoId: {
      control: 'text',
      description: 'YouTube video ID for embedded video',
    },
    maskOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Opacity of background mask overlay',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'accent', 'gradient', 'transparent-light', 'transparent-dark'],
      description: 'Theme for the banner',
    },
    alignment: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Content alignment',
    },
    layoutReversal: {
      control: 'select',
      options: ['none', 'mobile-only', 'all-viewports', 'mobile-and-tablet', 'tablet-and-desktop'],
      description: 'When to reverse column layout',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether to remove side padding',
    },
    inheritTheme: {
      control: 'boolean',
      description: 'Whether to inherit theme from parent',
    },
  },
} satisfies Meta<typeof Banner75>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBackgroundImage: Story = {
  args: {
    backgroundType: 'image',
    backgroundImage: 'https://placehold.co/1200x600/gradient/white.png',
    maskOpacity: 0.3,
  },
};

export const WithYouTubeBackground: Story = {
  args: {
    backgroundType: 'youtube',
    backgroundVideoId: 'dQw4w9WgXcQ',
    maskOpacity: 0.5,
  },
};

export const WithVideoBackground: Story = {
  args: {
    backgroundType: 'video',
    backgroundVideo: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    maskOpacity: 0.4,
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    backgroundType: 'image',
    backgroundImage: 'https://placehold.co/1200x600/333/white.png',
  },
};

export const AccentTheme: Story = {
  args: {
    theme: 'accent',
    backgroundType: 'image',
    backgroundImage: 'https://placehold.co/1200x600/blue/white.png',
  },
};

export const GradientTheme: Story = {
  args: {
    theme: 'gradient',
    backgroundType: 'image',
    backgroundImage: 'https://placehold.co/1200x600/gradient/white.png',
  },
};

export const LeftAligned: Story = {
  args: {
    alignment: 'left',
    backgroundType: 'image',
    backgroundImage: 'https://placehold.co/1200x600/eee/333.png',
  },
};

export const RightAligned: Story = {
  args: {
    alignment: 'right',
    backgroundType: 'image',
    backgroundImage: 'https://placehold.co/1200x600/eee/333.png',
  },
};

export const ReversedLayoutMobile: Story = {
  args: {
    layoutReversal: 'mobile-only',
    backgroundType: 'image',
    backgroundImage: 'https://placehold.co/1200x600/f0f0f0/333.png',
  },
};

export const ReversedLayoutDesktop: Story = {
  args: {
    layoutReversal: 'tablet-and-desktop',
    backgroundType: 'image',
    backgroundImage: 'https://placehold.co/1200x600/f0f0f0/333.png',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    backgroundType: 'image',
    backgroundImage: 'https://placehold.co/1200x600/gradient/white.png',
  },
};

export const CustomMask: Story = {
  args: {
    backgroundType: 'image',
    backgroundImage: 'https://placehold.co/1200x600/bright/dark.png',
    maskOpacity: 0.8,
  },
};