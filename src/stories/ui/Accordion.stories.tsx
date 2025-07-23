import type { Meta, StoryObj } from '@storybook/nextjs';
import { Accordion } from '@/components/ui/Accordion';

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
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
    headlineLevel: {
      control: { type: 'select' },
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
    },
    subheadlineLevel: {
      control: { type: 'select' },
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
    },
    groupHeadlineLevel: {
      control: { type: 'select' },
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultGroups = [
  {
    headline: "What is the Silva Method?",
    content: { blocks: [] },
  },
  {
    headline: "How long does it take to learn?",
    content: { blocks: [] },
  },
  {
    headline: "What are the benefits?",
    content: { blocks: [] },
  },
];

export const Default: Story = {
  args: {
    headline: "Frequently Asked Questions",
    headlineLevel: "h2",
    theme: "light",
    alignment: "left",
    groups: defaultGroups,
  },
};

export const DarkTheme: Story = {
  args: {
    headline: "Frequently Asked Questions",
    headlineLevel: "h2",
    theme: "dark",
    alignment: "left",
    groups: defaultGroups,
  },
};

export const AccentTheme: Story = {
  args: {
    headline: "Frequently Asked Questions",
    headlineLevel: "h2",
    theme: "accent",
    alignment: "left",
    groups: defaultGroups,
  },
};

export const WithSubheadlineAndBody: Story = {
  args: {
    headline: "Frequently Asked Questions",
    subheadline: "Everything you need to know",
    body: "Find answers to the most common questions about the Silva Method and our courses.",
    headlineLevel: "h2",
    theme: "light",
    alignment: "left",
    groups: defaultGroups,
  },
};

export const CenterAligned: Story = {
  args: {
    headline: "Frequently Asked Questions",
    headlineLevel: "h2",
    theme: "light",
    alignment: "center",
    groups: defaultGroups,
  },
};

export const AlwaysExpanded: Story = {
  args: {
    headline: "Course Information",
    headlineLevel: "h2",
    theme: "light",
    alignment: "left",
    alwaysExpanded: true,
    groups: [
      {
        headline: "Course Overview",
        content: { blocks: [] },
      },
      {
        headline: "What You'll Learn",
        content: { blocks: [] },
      },
      {
        headline: "Prerequisites",
        content: { blocks: [] },
      },
    ],
  },
};

export const InheritTheme: Story = {
  args: {
    headline: "Frequently Asked Questions",
    headlineLevel: "h2",
    inheritTheme: true,
    alignment: "left",
    groups: defaultGroups,
  },
};

export const SingleItem: Story = {
  args: {
    headline: "Important Information",
    headlineLevel: "h2",
    theme: "light",
    alignment: "left",
    groups: [
      {
        headline: "Refund Policy",
        content: { blocks: [] },
      },
    ],
  },
};


export const AccessibilityOptimized: Story = {
  args: {
    headline: "Accessibility Features",
    subheadline: "Fully accessible accordion with ARIA attributes",
    headlineLevel: "h2",
    subheadlineLevel: "h3",
    groupHeadlineLevel: "h4",
    theme: "light",
    alignment: "left",
    groups: [
      {
        headline: "Screen Reader Support",
        content: { blocks: [] },
      },
      {
        headline: "Keyboard Navigation",
        content: { blocks: [] },
      },
      {
        headline: "ARIA Compliance",
        content: { blocks: [] },
      },
    ],
  },
};