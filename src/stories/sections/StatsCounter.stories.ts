import type { Meta, StoryObj } from "@storybook/nextjs";
import StatsCounter from "@/components/sections/StatsCounter";

const meta = {
  title: "Sections/StatsCounter",
  component: StatsCounter,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    headline: { control: "text" },
    description: { control: "text" },
    description2: { control: "text" },
    stats: { control: "object" },
    theme: {
      control: "select",
      options: [
        "light",
        "dark",
        "gradient",
        "accent",
        "transparent-light",
        "transparent-dark",
      ],
    },
    inheritTheme: { control: "boolean" },
    isHero: { control: "boolean" },
    className: { control: "text" },
  },
} satisfies Meta<typeof StatsCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultStats = [
  {
    prefix: "I've served",
    number: "10,000",
    suffix: "+",
    label: "students.",
  },
  {
    number: "500",
    suffix: "+",
    label: "meditation classes taught",
  },
  {
    number: "95",
    suffix: "%",
    label: "student satisfaction rate",
  },
  {
    number: "15",
    suffix: "+",
    label: "years of teaching experience",
  },
];

export const Default: Story = {
  args: {
    headline: "IN THE LAST 15 YEARS AS A SILVA METHOD INSTRUCTOR...",
    description:
      "I've had the privilege of guiding thousands of students through transformative meditation experiences.",
    stats: defaultStats,
    description2:
      "Every number represents real people who have discovered the power of Silva Method meditation and transformed their lives through mindfulness and intuitive development.",
    theme: "light",
    inheritTheme: false,
    isHero: false,
  },
};

export const AsHero: Story = {
  args: {
    ...Default.args,
    isHero: true,
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: "dark",
  },
};

export const GradientTheme: Story = {
  args: {
    ...Default.args,
    theme: "gradient",
  },
};

export const AccentTheme: Story = {
  args: {
    ...Default.args,
    theme: "accent",
  },
};

export const TransparentLight: Story = {
  args: {
    ...Default.args,
    theme: "transparent-light",
  },
};

export const TransparentDark: Story = {
  args: {
    ...Default.args,
    theme: "transparent-dark",
  },
};

export const InheritingTheme: Story = {
  args: {
    ...Default.args,
    inheritTheme: true,
    theme: undefined,
  },
};

export const NoDescription: Story = {
  args: {
    ...Default.args,
    description: undefined,
  },
};

export const NoDescription2: Story = {
  args: {
    ...Default.args,
    description2: undefined,
  },
};

export const BusinessStats: Story = {
  args: {
    headline: "PROVEN RESULTS",
    description:
      "Our Silva Method programs have delivered consistent results for individuals and organizations.",
    stats: [
      {
        number: "50,000",
        suffix: "+",
        label: "lives transformed",
      },
      {
        number: "85",
        suffix: "%",
        label: "report improved focus",
      },
      {
        number: "90",
        suffix: "%",
        label: "enhanced creativity",
      },
      {
        number: "30",
        suffix: "+",
        label: "countries served",
      },
    ],
    theme: "light",
  },
};

export const MinimalStats: Story = {
  args: {
    headline: "QUICK FACTS",
    description: undefined,
    description2: undefined,
    stats: [
      {
        number: "1969",
        label: "founded",
      },
      {
        number: "6M",
        suffix: "+",
        label: "graduates",
      },
    ],
    theme: "light",
  },
};

export const SingleStat: Story = {
  args: {
    headline: "PRIMARY METRIC",
    description: "The most important number that defines our success.",
    stats: [
      {
        number: "99.9",
        suffix: "%",
        label: "student success rate",
      },
    ],
    theme: "light",
  },
};
