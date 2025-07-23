import type { Meta, StoryObj } from '@storybook/nextjs';
import MediaMentions from '@/components/sections/MediaMentions';

const meta = {
  title: 'Sections/MediaMentions',
  component: MediaMentions,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    subtitle: { control: 'text' },
    logos: { control: 'object' },
    backgroundColor: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof MediaMentions>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultLogos = [
  {
    name: 'Forbes',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/512px-Forbes_logo.svg.png',
    websiteUrl: 'https://www.forbes.com',
  },
  {
    name: 'Entrepreneur',
    imageUrl: 'https://assets.entrepreneur.com/static/20210312100633-entrepreneur-logo-black.png',
    websiteUrl: 'https://www.entrepreneur.com',
  },
  {
    name: 'Inc.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Inc._magazine_logo.svg/512px-Inc._magazine_logo.svg.png',
    websiteUrl: 'https://www.inc.com',
  },
  {
    name: 'Mindful',
    imageUrl: 'https://www.mindful.org/wp-content/uploads/2019/01/Mindful-logo-black-768x191.png',
    websiteUrl: 'https://www.mindful.org',
  },
  {
    name: 'Psychology Today',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Psychology_Today_logo.svg/512px-Psychology_Today_logo.svg.png',
    websiteUrl: 'https://www.psychologytoday.com',
  },
];

export const Default: Story = {
  args: {
    headline: 'FEATURED IN',
    subtitle: 'As seen in these leading publications',
    logos: defaultLogos,
    backgroundColor: 'bg-white',
  },
};

export const WithoutSubtitle: Story = {
  args: {
    headline: 'MEDIA MENTIONS',
    subtitle: undefined,
    logos: defaultLogos,
    backgroundColor: 'bg-white',
  },
};

export const GrayBackground: Story = {
  args: {
    headline: 'PRESS COVERAGE',
    subtitle: 'Recognized by major media outlets',
    logos: defaultLogos,
    backgroundColor: 'bg-gray-50',
  },
};

export const FewLogos: Story = {
  args: {
    headline: 'FEATURED IN',
    subtitle: 'Selected media appearances',
    logos: defaultLogos.slice(0, 3),
    backgroundColor: 'bg-white',
  },
};

export const ManyLogos: Story = {
  args: {
    headline: 'MEDIA COVERAGE',
    subtitle: 'Extensive press coverage and recognition',
    logos: [
      ...defaultLogos,
      {
        name: 'The New York Times',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/The_New_York_Times_logo.png/512px-The_New_York_Times_logo.png',
        websiteUrl: 'https://www.nytimes.com',
      },
      {
        name: 'Harvard Business Review',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Harvard_Business_Review_logo.svg/512px-Harvard_Business_Review_logo.svg.png',
        websiteUrl: 'https://hbr.org',
      },
      {
        name: 'Scientific American',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Scientific_American_logo.svg/512px-Scientific_American_logo.svg.png',
        websiteUrl: 'https://www.scientificamerican.com',
      },
    ],
    backgroundColor: 'bg-white',
  },
};

export const MeditationFocus: Story = {
  args: {
    headline: 'MEDITATION COVERAGE',
    subtitle: 'Featured in top wellness and mindfulness publications',
    logos: [
      {
        name: 'Mindful',
        imageUrl: 'https://www.mindful.org/wp-content/uploads/2019/01/Mindful-logo-black-768x191.png',
        websiteUrl: 'https://www.mindful.org',
      },
      {
        name: 'Yoga Journal',
        imageUrl: 'https://www.yogajournal.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1240/MTUxNjUzNDI1MjQwMDY4NTU0/yj-logo-black.webp',
        websiteUrl: 'https://www.yogajournal.com',
      },
      {
        name: 'Headspace',
        imageUrl: 'https://assets.headspace.com/press/headspace-logo-orange.png',
        websiteUrl: 'https://www.headspace.com',
      },
      {
        name: 'Calm',
        imageUrl: 'https://assets.calm.com/web/images/press-assets/calm-logo-black.png',
        websiteUrl: 'https://www.calm.com',
      },
    ],
    backgroundColor: 'bg-blue-50',
  },
};

export const HealthcareFocus: Story = {
  args: {
    headline: 'HEALTHCARE RECOGNITION',
    subtitle: 'Acknowledged by leading healthcare and wellness organizations',
    logos: [
      {
        name: 'Mayo Clinic',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Mayo_Clinic_logo.svg/512px-Mayo_Clinic_logo.svg.png',
        websiteUrl: 'https://www.mayoclinic.org',
      },
      {
        name: 'WebMD',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/WebMD_logo.svg/512px-WebMD_logo.svg.png',
        websiteUrl: 'https://www.webmd.com',
      },
      {
        name: 'Healthline',
        imageUrl: 'https://www.healthline.com/static/images/logo-healthline.svg',
        websiteUrl: 'https://www.healthline.com',
      },
      {
        name: 'American Heart Association',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/American_Heart_Association_logo.svg/512px-American_Heart_Association_logo.svg.png',
        websiteUrl: 'https://www.heart.org',
      },
    ],
    backgroundColor: 'bg-green-50',
  },
};

export const BusinessFocus: Story = {
  args: {
    headline: 'BUSINESS RECOGNITION',
    subtitle: 'Featured in top business and entrepreneurship publications',
    logos: [
      {
        name: 'Forbes',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/512px-Forbes_logo.svg.png',
        websiteUrl: 'https://www.forbes.com',
      },
      {
        name: 'Fast Company',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Fast_Company_logo.svg/512px-Fast_Company_logo.svg.png',
        websiteUrl: 'https://www.fastcompany.com',
      },
      {
        name: 'Harvard Business Review',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Harvard_Business_Review_logo.svg/512px-Harvard_Business_Review_logo.svg.png',
        websiteUrl: 'https://hbr.org',
      },
      {
        name: 'Bloomberg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Bloomberg_logo.svg/512px-Bloomberg_logo.svg.png',
        websiteUrl: 'https://www.bloomberg.com',
      },
    ],
    backgroundColor: 'bg-slate-50',
  },
};

export const WithoutLinks: Story = {
  args: {
    headline: 'MEDIA MENTIONS',
    subtitle: 'Recognized by leading publications',
    logos: defaultLogos.map(logo => ({
      ...logo,
      websiteUrl: undefined,
    })),
    backgroundColor: 'bg-white',
  },
};

export const SingleLogo: Story = {
  args: {
    headline: 'FEATURED IN',
    subtitle: 'Recently featured in',
    logos: [
      {
        name: 'Forbes',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/512px-Forbes_logo.svg.png',
        websiteUrl: 'https://www.forbes.com',
      },
    ],
    backgroundColor: 'bg-white',
  },
};

export const CustomStyling: Story = {
  args: {
    headline: 'PRESS COVERAGE',
    subtitle: 'Making waves in the meditation and wellness space',
    logos: defaultLogos,
    backgroundColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
    className: 'border-t border-purple-200',
  },
};