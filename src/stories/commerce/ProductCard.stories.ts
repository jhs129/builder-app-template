import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductCard from '@/components/commerce/ProductCard';

const meta = {
  title: 'Commerce/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    price: {
      control: 'object',
    },
    image: {
      control: 'object',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'accent', 'gradient'],
    },
    inheritTheme: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'product-1',
    title: 'Silva Method Complete Course',
    handle: 'silva-method-complete-course',
    price: {
      amount: '297.00',
      currencyCode: 'USD',
    },
    image: {
      id: 'image-1',
      url: 'https://images.pexels.com/photos/3768197/pexels-photo-3768197.jpeg',
      altText: 'Silva Method Complete Course',
      width: 800,
      height: 600,
    },
  },
};

export const WithoutImage: Story = {
  args: {
    id: 'product-2',
    title: 'Intuition Development Workshop',
    handle: 'intuition-development-workshop',
    price: {
      amount: '149.00',
      currencyCode: 'USD',
    },
  },
};

export const LongTitle: Story = {
  args: {
    id: 'product-3',
    title: 'Advanced Silva Method Techniques for Mind Control, Meditation, and Spiritual Development - Complete 12-Week Program',
    handle: 'advanced-silva-method-techniques',
    price: {
      amount: '497.00',
      currencyCode: 'USD',
    },
    image: {
      id: 'image-3',
      url: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg',
      altText: 'Advanced Silva Method Course',
      width: 800,
      height: 600,
    },
  },
};

export const HighPrice: Story = {
  args: {
    id: 'product-4',
    title: 'Private Silva Method Coaching Session',
    handle: 'private-coaching-session',
    price: {
      amount: '1500.00',
      currencyCode: 'USD',
    },
    image: {
      id: 'image-4',
      url: 'https://images.pexels.com/photos/3812944/pexels-photo-3812944.jpeg',
      altText: 'Private Coaching Session',
      width: 800,
      height: 600,
    },
  },
};

export const FreeProduct: Story = {
  args: {
    id: 'product-5',
    title: 'Silva Method Introduction Guide',
    handle: 'silva-method-introduction-guide',
    price: {
      amount: '0.00',
      currencyCode: 'USD',
    },
    image: {
      id: 'image-5',
      url: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
      altText: 'Silva Method Introduction Guide',
      width: 800,
      height: 600,
    },
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: 'dark',
  },
};

export const AccentTheme: Story = {
  args: {
    ...Default.args,
    theme: 'accent',
  },
};

export const GradientTheme: Story = {
  args: {
    ...Default.args,
    theme: 'gradient',
  },
};

export const InheritTheme: Story = {
  args: {
    ...Default.args,
    inheritTheme: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'When inheritTheme is true, the card will inherit theme from its parent context instead of using its own theme.',
      },
    },
  },
};