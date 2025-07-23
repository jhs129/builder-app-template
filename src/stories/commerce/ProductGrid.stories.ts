import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductGrid from '@/components/commerce/ProductGrid';

const meta = {
  title: 'Commerce/ProductGrid',
  component: ProductGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    limit: {
      control: { type: 'number', min: 1, max: 20 },
    },
    sortKey: {
      control: { type: 'select' },
      options: ['TITLE', 'PRICE', 'CREATED', 'BEST_SELLING'],
    },
    reverse: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProducts = [
  {
    node: {
      id: 'product-1',
      title: 'Silva Method Complete Course',
      handle: 'silva-method-complete-course',
      priceRange: {
        minVariantPrice: {
          amount: '297.00',
          currencyCode: 'USD',
        },
      },
      images: {
        edges: [
          {
            node: {
              id: 'image-1',
              url: 'https://images.pexels.com/photos/3768197/pexels-photo-3768197.jpeg',
              altText: 'Silva Method Complete Course',
              width: 800,
              height: 600,
            },
          },
        ],
      },
    },
  },
  {
    node: {
      id: 'product-2',
      title: 'Intuition Development Workshop',
      handle: 'intuition-development-workshop',
      priceRange: {
        minVariantPrice: {
          amount: '149.00',
          currencyCode: 'USD',
        },
      },
      images: {
        edges: [
          {
            node: {
              id: 'image-2',
              url: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg',
              altText: 'Intuition Development Workshop',
              width: 800,
              height: 600,
            },
          },
        ],
      },
    },
  },
  {
    node: {
      id: 'product-3',
      title: 'Advanced Mind Control Techniques',
      handle: 'advanced-mind-control-techniques',
      priceRange: {
        minVariantPrice: {
          amount: '497.00',
          currencyCode: 'USD',
        },
      },
      images: {
        edges: [
          {
            node: {
              id: 'image-3',
              url: 'https://images.pexels.com/photos/3812944/pexels-photo-3812944.jpeg',
              altText: 'Advanced Mind Control Techniques',
              width: 800,
              height: 600,
            },
          },
        ],
      },
    },
  },
  {
    node: {
      id: 'product-4',
      title: 'Meditation Mastery Guide',
      handle: 'meditation-mastery-guide',
      priceRange: {
        minVariantPrice: {
          amount: '97.00',
          currencyCode: 'USD',
        },
      },
      images: {
        edges: [
          {
            node: {
              id: 'image-4',
              url: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
              altText: 'Meditation Mastery Guide',
              width: 800,
              height: 600,
            },
          },
        ],
      },
    },
  },
  {
    node: {
      id: 'product-5',
      title: 'Dream Control Workshop',
      handle: 'dream-control-workshop',
      priceRange: {
        minVariantPrice: {
          amount: '199.00',
          currencyCode: 'USD',
        },
      },
      images: {
        edges: [
          {
            node: {
              id: 'image-5',
              url: 'https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg',
              altText: 'Dream Control Workshop',
              width: 800,
              height: 600,
            },
          },
        ],
      },
    },
  },
  {
    node: {
      id: 'product-6',
      title: 'Psychic Development Course',
      handle: 'psychic-development-course',
      priceRange: {
        minVariantPrice: {
          amount: '347.00',
          currencyCode: 'USD',
        },
      },
      images: {
        edges: [
          {
            node: {
              id: 'image-6',
              url: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg',
              altText: 'Psychic Development Course',
              width: 800,
              height: 600,
            },
          },
        ],
      },
    },
  },
];

export const Default: Story = {
  args: {
    products: mockProducts,
    limit: 6,
    sortKey: 'CREATED',
    reverse: false,
  },
};

export const EmptyGrid: Story = {
  args: {
    products: [],
    limit: 6,
    sortKey: 'CREATED',
    reverse: false,
  },
};

export const SortedByTitle: Story = {
  args: {
    products: mockProducts,
    limit: 6,
    sortKey: 'TITLE',
    reverse: false,
  },
};

export const SortedByPrice: Story = {
  args: {
    products: mockProducts,
    limit: 6,
    sortKey: 'PRICE',
    reverse: false,
  },
};

export const SortedByPriceReverse: Story = {
  args: {
    products: mockProducts,
    limit: 6,
    sortKey: 'PRICE',
    reverse: true,
  },
};

export const LimitedProducts: Story = {
  args: {
    products: mockProducts,
    limit: 3,
    sortKey: 'CREATED',
    reverse: false,
  },
};

export const SingleProduct: Story = {
  args: {
    products: [mockProducts[0]],
    limit: 6,
    sortKey: 'CREATED',
    reverse: false,
  },
};