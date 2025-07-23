import type { Meta, StoryObj } from '@storybook/nextjs';
import HeroNavigation from '@/components/navigation/HeroNavigation';

const meta = {
  title: 'Navigation/HeroNavigation',
  component: HeroNavigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onNavigationLoaded: (navigation) => console.log('Navigation loaded:', navigation),
  },
};