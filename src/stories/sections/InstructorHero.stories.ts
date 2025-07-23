import type { Meta, StoryObj } from '@storybook/nextjs';
import InstructorHero from '@/components/sections/InstructorHero';

const meta = {
  title: 'Sections/InstructorHero',
  component: InstructorHero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    greeting: { control: 'text' },
    headline: { control: 'text' },
    tagline: { control: 'text' },
    description: { control: 'text' },
    instructorImage: { control: 'text' },
    ctaText: { control: 'text' },
    ctaUrl: { control: 'text' },
    secondaryCtaText: { control: 'text' },
    secondaryCtaUrl: { control: 'text' },
    theme: { 
      control: 'select',
      options: ['light', 'dark', 'accent', 'gradient', 'transparent-light', 'transparent-dark']
    },
    inheritTheme: { control: 'boolean' },
    isHero: { control: 'boolean' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof InstructorHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    greeting: 'Hey there',
    headline: 'I\'m Your Instructor!',
    tagline: 'I help students unlock their mind\'s potential through Silva Method techniques.',
    description: 'With years of experience in meditation and mindfulness training, I guide students through transformative Silva Method practices that have changed millions of lives worldwide.',
    instructorImage: 'https://placehold.co/600x400.png',
    ctaText: 'Start Your Journey',
    ctaUrl: '/get-started',
    secondaryCtaText: 'Learn About Silva Method',
    secondaryCtaUrl: '/about',
    theme: 'light',
    inheritTheme: false,
    isHero: true,
  },
};

export const AsSecondarySection: Story = {
  args: {
    greeting: 'Meet Your Instructor',
    headline: 'I\'m Jennifer Williams',
    tagline: 'Supporting your Silva Method journey with personalized guidance.',
    description: 'As a secondary instructor and mentor, I provide additional support and advanced techniques to help deepen your Silva Method practice and achieve lasting transformation.',
    instructorImage: 'https://placehold.co/600x400.png',
    ctaText: 'Book Mentoring',
    ctaUrl: '/mentoring',
    secondaryCtaText: 'Advanced Courses',
    secondaryCtaUrl: '/advanced',
    theme: 'light',
    inheritTheme: false,
    isHero: false,
  },
};

export const WarmGreeting: Story = {
  args: {
    greeting: 'Welcome!',
    headline: 'I\'m Laura Silva',
    tagline: 'Your guide to discovering the power of your mind through the Silva Method.',
    description: 'As a certified Silva Method instructor for over 15 years, I\'ve helped thousands of students develop their intuitive abilities and achieve their life goals. My approach combines traditional techniques with modern applications.',
    instructorImage: 'https://placehold.co/600x400.png',
    ctaText: 'Book a Session',
    ctaUrl: '/book-session',
    secondaryCtaText: 'View Courses',
    secondaryCtaUrl: '/courses',
    theme: 'gradient',
    inheritTheme: false,
    isHero: true,
  },
};

export const DarkTheme: Story = {
  args: {
    greeting: 'Hello',
    headline: 'I\'m Dr. Michael Johnson',
    tagline: 'Bridging science and spirituality through the Silva Method.',
    description: 'With a background in neuroscience and decades of Silva Method practice, I bring a unique perspective to mind development training. My research-based approach helps students understand the science behind these powerful techniques.',
    instructorImage: 'https://placehold.co/600x400.png',
    ctaText: 'Explore Research',
    ctaUrl: '/research',
    secondaryCtaText: 'Join Workshop',
    secondaryCtaUrl: '/workshops',
    theme: 'dark',
    inheritTheme: false,
    isHero: true,
  },
};

export const ProfessionalFocus: Story = {
  args: {
    greeting: 'Greetings',
    headline: 'I\'m Dr. Alexandra Chen',
    tagline: 'Empowering professionals with Silva Method techniques for enhanced performance.',
    description: 'I specialize in teaching Silva Method techniques to business leaders, entrepreneurs, and professionals seeking to enhance their decision-making abilities and creative problem-solving skills.',
    instructorImage: 'https://placehold.co/600x400.png',
    ctaText: 'Corporate Training',
    ctaUrl: '/corporate',
    secondaryCtaText: 'Executive Program',
    secondaryCtaUrl: '/executive',
    theme: 'accent',
    inheritTheme: false,
    isHero: true,
  },
};

export const YoungInstructor: Story = {
  args: {
    greeting: 'Hi there!',
    headline: 'I\'m Sarah Martinez',
    tagline: 'Teaching Silva Method to the next generation of mindful leaders.',
    description: 'As a young instructor passionate about mind development, I bring fresh energy and modern approaches to traditional Silva Method teachings. I specialize in working with students and young professionals.',
    instructorImage: 'https://placehold.co/600x400.png',
    ctaText: 'Student Programs',
    ctaUrl: '/students',
    secondaryCtaText: 'Young Professionals',
    secondaryCtaUrl: '/young-professionals',
    theme: 'transparent-light',
    inheritTheme: false,
    isHero: true,
  },
};

export const WithoutSecondaryButton: Story = {
  args: {
    greeting: 'Welcome',
    headline: 'I\'m Robert Thompson',
    tagline: 'Your Silva Method mentor and guide.',
    description: 'Over 25 years of Silva Method instruction have taught me that everyone has the potential for extraordinary mental abilities. Let me help you discover yours.',
    instructorImage: 'https://placehold.co/600x400.png',
    ctaText: 'Start Learning',
    ctaUrl: '/start',
    secondaryCtaText: undefined,
    secondaryCtaUrl: undefined,
    theme: 'light',
    inheritTheme: false,
    isHero: true,
  },
};

export const MinimalContent: Story = {
  args: {
    greeting: 'Hello',
    headline: 'I\'m Your Guide',
    tagline: 'Silva Method Instructor',
    description: undefined,
    instructorImage: 'https://placehold.co/600x400.png',
    ctaText: 'Get Started',
    ctaUrl: '/start',
    theme: 'light',
    inheritTheme: false,
    isHero: true,
  },
};

export const HealthcareFocus: Story = {
  args: {
    greeting: 'Welcome',
    headline: 'I\'m Dr. Maria Santos',
    tagline: 'Integrating Silva Method with healthcare and healing practices.',
    description: 'As both a healthcare professional and Silva Method instructor, I help medical professionals and patients alike discover the healing power of the mind-body connection through proven Silva techniques.',
    instructorImage: 'https://placehold.co/600x400.png',
    ctaText: 'Healthcare Programs',
    ctaUrl: '/healthcare',
    secondaryCtaText: 'Healing Workshops',
    secondaryCtaUrl: '/healing',
    theme: 'transparent-dark',
    inheritTheme: false,
    isHero: true,
  },
};

export const FormalApproach: Story = {
  args: {
    greeting: 'Good day',
    headline: 'Dr. James Wilson',
    tagline: 'Advancing human potential through disciplined Silva Method practice.',
    description: 'My formal approach to Silva Method instruction emphasizes the systematic development of mental abilities through structured practice and deep understanding of the underlying principles.',
    instructorImage: 'https://placehold.co/600x400.png',
    ctaText: 'Formal Training',
    ctaUrl: '/formal-training',
    secondaryCtaText: 'Certification',
    secondaryCtaUrl: '/certification',
    theme: 'light',
    inheritTheme: false,
    isHero: true,
  },
};