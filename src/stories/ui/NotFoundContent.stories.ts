import type { Meta, StoryObj } from '@storybook/nextjs';
import NotFoundContent from '@/components/ui/NotFoundContent';

const meta = {
  title: 'UI/NotFoundContent',
  component: NotFoundContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotFoundContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};