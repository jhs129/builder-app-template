import type { Meta, StoryObj } from '@storybook/nextjs';
import DefaultFooter from '@/components/navigation/DefaultFooter';

const meta = {
  title: 'Navigation/DefaultFooter',
  component: DefaultFooter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DefaultFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};