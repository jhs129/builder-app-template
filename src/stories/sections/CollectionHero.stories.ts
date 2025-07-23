import type { Meta, StoryObj } from '@storybook/nextjs';
import CollectionHero from '@/components/sections/CollectionHero';

const meta = {
  title: 'Sections/CollectionHero',
  component: CollectionHero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    breadcrumbText: { control: 'text' },
    headline: { control: 'text' },
    description: { control: 'text' },
    buttonText: { control: 'text' },
    buttonUrl: { control: 'text' },
    heroImage: { control: 'text' },
    heroImageAlt: { control: 'text' },
    productCountText: { control: 'text' },
    collection: { control: 'object' },
  },
} satisfies Meta<typeof CollectionHero>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCollection = {
  id: 'collection-1',
  title: 'Silva Method Courses',
  description: 'Complete collection of Silva Method training courses and workshops',
  handle: 'silva-method-courses',
  image: {
    id: 'image-1',
    url: 'https://images.pexels.com/photos/3768197/pexels-photo-3768197.jpeg',
    altText: 'Silva Method Courses Collection',
    width: 800,
    height: 600,
  },
  products: {
    edges: [
      {
        node: {
          id: 'product-1',
          title: 'Silva Method Complete Course',
          description: 'Complete Silva Method training',
          handle: 'silva-method-complete-course',
          publishedAt: '2024-01-01T00:00:00Z',
          availableForSale: true,
          images: { edges: [] },
          priceRange: {
            minVariantPrice: { amount: '297.00', currencyCode: 'USD' },
            maxVariantPrice: { amount: '297.00', currencyCode: 'USD' },
          },
          variants: { edges: [] },
          options: [],
        },
      },
      {
        node: {
          id: 'product-2',
          title: 'Intuition Development Workshop',
          description: 'Advanced intuition training',
          handle: 'intuition-development-workshop',
          publishedAt: '2024-01-01T00:00:00Z',
          availableForSale: true,
          images: { edges: [] },
          priceRange: {
            minVariantPrice: { amount: '149.00', currencyCode: 'USD' },
            maxVariantPrice: { amount: '149.00', currencyCode: 'USD' },
          },
          variants: { edges: [] },
          options: [],
        },
      },
      {
        node: {
          id: 'product-3',
          title: 'Advanced Mind Control Techniques',
          description: 'Advanced Silva Method techniques',
          handle: 'advanced-mind-control-techniques',
          publishedAt: '2024-01-01T00:00:00Z',
          availableForSale: true,
          images: { edges: [] },
          priceRange: {
            minVariantPrice: { amount: '497.00', currencyCode: 'USD' },
            maxVariantPrice: { amount: '497.00', currencyCode: 'USD' },
          },
          variants: { edges: [] },
          options: [],
        },
      },
    ],
  },
};

export const Default: Story = {
  args: {
    breadcrumbText: 'Home / Courses',
    headline: 'Silva Method Training Collection',
    description: 'Transform your life with proven techniques and powerful insights designed to unlock your full potential. Join thousands who have discovered the path to enhanced intuition, creativity, and personal growth.',
    buttonText: 'Explore Collection',
    buttonUrl: '#products',
    heroImage: 'https://images.pexels.com/photos/3768197/pexels-photo-3768197.jpeg',
    heroImageAlt: 'Silva Method Training Collection',
    productCountText: '3 Courses Available',
    collection: mockCollection,
  },
};

export const WithCollectionFallback: Story = {
  args: {
    collection: mockCollection,
  },
};

export const WithoutImage: Story = {
  args: {
    breadcrumbText: 'Home / Workshops',
    headline: 'Silva Method Workshops',
    description: 'Join our intensive workshops designed to accelerate your learning and provide hands-on experience with Silva Method techniques.',
    buttonText: 'View Workshops',
    buttonUrl: '/workshops',
    collection: {
      ...mockCollection,
      image: undefined,
    },
  },
};

export const WithExternalLink: Story = {
  args: {
    breadcrumbText: 'Home / Online Training',
    headline: 'Online Silva Method Training',
    description: 'Learn from the comfort of your home with our comprehensive online training programs featuring live sessions and interactive content.',
    buttonText: 'Start Learning',
    buttonUrl: 'https://learn.silvamethodatlanta.com',
    heroImage: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg',
    heroImageAlt: 'Online Silva Method Training',
    collection: mockCollection,
  },
};

export const SingleProduct: Story = {
  args: {
    breadcrumbText: 'Home / Courses',
    headline: 'Silva Method Complete Course',
    description: 'Our comprehensive Silva Method course covers all the essential techniques for mind development, intuition enhancement, and personal transformation.',
    buttonText: 'Learn More',
    buttonUrl: '#product-details',
    heroImage: 'https://images.pexels.com/photos/3812944/pexels-photo-3812944.jpeg',
    heroImageAlt: 'Silva Method Complete Course',
    collection: {
      ...mockCollection,
      products: {
        edges: [mockCollection.products.edges[0]],
      },
    },
  },
};

export const NoProducts: Story = {
  args: {
    breadcrumbText: 'Home / Coming Soon',
    headline: 'Advanced Silva Method Techniques',
    description: 'Our advanced course series is currently in development. Sign up to be notified when it becomes available.',
    buttonText: 'Get Notified',
    buttonUrl: '/notify',
    heroImage: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    heroImageAlt: 'Advanced Silva Method Techniques',
    collection: {
      ...mockCollection,
      products: {
        edges: [],
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    breadcrumbText: 'Home / Courses / Advanced',
    headline: 'Advanced Silva Method Techniques for Professional Development and Personal Transformation',
    description: 'This comprehensive advanced course covers sophisticated Silva Method techniques designed for professionals seeking to enhance their intuitive abilities, improve decision-making skills, and achieve greater success in their personal and professional lives.',
    buttonText: 'Enroll Now',
    buttonUrl: '#enrollment',
    heroImage: 'https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg',
    heroImageAlt: 'Advanced Silva Method Professional Course',
    collection: mockCollection,
  },
};

export const MinimalContent: Story = {
  args: {
    headline: 'Silva Method',
    collection: {
      ...mockCollection,
      title: 'Silva Method',
      description: 'Silva Method collection',
      image: undefined,
    },
  },
};