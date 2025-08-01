import type { Meta, StoryObj } from '@storybook/nextjs';
import VerticalNavigation from '@/components/navigation/VerticalNavigation';
import { textAlignments } from '@/types/design-kit/alignable';

const meta = {
  title: 'Navigation/VerticalNavigation',
  component: VerticalNavigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'accent', 'gradient', 'transparent-light', 'transparent-dark'],
    },
    className: {
      control: { type: 'text' },
    },
    headline: {
      control: { type: 'text' },
    },
    isHero: {
      control: { type: 'boolean' },
    },
    alignment: {
      control: { type: 'select' },
      options: textAlignments,
    },
  },
} satisfies Meta<typeof VerticalNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockNavigation = {
  data: {
    level1: [
      { text: 'Home', href: '/' },
      { text: 'About', href: '/about' },
      { text: 'Courses', href: '/courses' },
      { text: 'Workshops', href: '/workshops' },
      { text: 'Contact', href: '/contact' },
    ],
  },
  ownerId: 'mock-owner',
  lastUpdateBy: null,
  createdDate: Date.now(),
  id: 'mock-nav-id',
  '@version': 1 as const,
  name: 'Mock Navigation',
  modelId: 'navigation',
  published: 'published' as const,
  priority: 0,
  query: [],
  lastUpdated: Date.now(),
  firstPublished: Date.now(),
  testRatio: 0,
  createdBy: 'mock-user',
  lastUpdatedBy: 'mock-user',
};

export const Default: Story = {
  args: {
    navigation: mockNavigation,
    theme: 'light',
    headline: 'Navigation Menu',
    isHero: true,
    alignment: 'center',
  },
};

export const DarkTheme: Story = {
  args: {
    navigation: mockNavigation,
    theme: 'dark',
  },
};

export const AccentTheme: Story = {
  args: {
    navigation: mockNavigation,
    theme: 'accent',
  },
};

export const GradientTheme: Story = {
  args: {
    navigation: mockNavigation,
    theme: 'gradient',
  },
};

export const MinimalNavigation: Story = {
  args: {
    navigation: {
      ...mockNavigation,
      data: {
        level1: [
          { text: 'Home', href: '/' },
          { text: 'About', href: '/about' },
        ],
      },
    },
    theme: 'light',
  },
};

export const LongNavigation: Story = {
  args: {
    navigation: {
      ...mockNavigation,
      data: {
        level1: [
          { text: 'Home', href: '/' },
          { text: 'About Us', href: '/about' },
          { text: 'Courses', href: '/courses' },
          { text: 'Workshops', href: '/workshops' },
          { text: 'Contact', href: '/contact' },
        ],
      },
    },
    theme: 'light',
  },
};

export const EmptyNavigation: Story = {
  args: {
    navigation: {
      ...mockNavigation,
      data: {
        level1: [],
      },
    },
    theme: 'light',
  },
};

export const NoNavigation: Story = {
  args: {
    navigation: undefined,
    theme: 'light',
  },
};

export const WithCustomClassName: Story = {
  args: {
    navigation: mockNavigation,
    theme: 'light',
    className: 'shadow-xl border-2 border-accent-purple',
  },
};

export const WithHeadlineAsHero: Story = {
  args: {
    navigation: mockNavigation,
    theme: 'light',
    headline: 'Main Navigation',
    isHero: true,
    alignment: 'center',
  },
};

export const WithHeadlineAsSubheading: Story = {
  args: {
    navigation: mockNavigation,
    theme: 'dark',
    headline: 'Quick Links',
    isHero: false,
    alignment: 'left',
  },
};

export const LeftAligned: Story = {
  args: {
    navigation: mockNavigation,
    theme: 'light',
    headline: 'Left Navigation',
    isHero: true,
    alignment: 'left',
  },
};

export const RightAligned: Story = {
  args: {
    navigation: mockNavigation,
    theme: 'accent',
    headline: 'Right Navigation',
    isHero: false,
    alignment: 'right',
  },
};