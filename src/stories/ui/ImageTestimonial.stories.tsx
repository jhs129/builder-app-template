import type { Meta, StoryObj } from "@storybook/nextjs";
import ImageTestimonial from "@/components/ui/ImageTestimonial";

const meta: Meta<typeof ImageTestimonial> = {
  title: "UI/ImageTestimonial",
  component: ImageTestimonial,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A testimonial component with an image that displays customer quotes and information. Supports children for additional content like buttons or links.",
      },
    },
  },
  argTypes: {
    eyebrow: {
      control: { type: "text" },
      description: "Optional text displayed above the image",
    },
    image: {
      control: { type: "text" },
      description: "Image URL for the testimonial",
    },
    name: {
      control: { type: "text" },
      description: "Name of the person giving the testimonial",
    },
    title: {
      control: { type: "text" },
      description: "Title or achievement displayed next to the name",
    },
    quote: {
      control: { type: "text" },
      description: "The testimonial quote text",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: "REAL RESULTS",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    name: "NEXT",
    title: "GOT HER GROOVE BACK",
    quote:
      "Kate changed my life. My whole damn life. I simply wouldn't be where I am in my business if not for her.",
  },
};

export const WithChildren: Story = {
  args: {
    eyebrow: "SUCCESS STORY",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    name: "Sarah",
    title: "MEDITATION MASTER",
    quote:
      "The Silva Method opened my mind to possibilities I never knew existed. The techniques are simple yet incredibly powerful.",
    children: (
      <div className="flex items-center gap-2 text-accent-green font-medium">
        <span>Next</span>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </div>
    ),
  },
};

export const NoEyebrow: Story = {
  args: {
    image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg",
    name: "Rachel",
    title: "STRESS-FREE LIVING",
    quote:
      "Simple, effective, and life-changing. The Silva Method gave me the peace of mind I had been searching for my entire life.",
  },
};

export const WithButton: Story = {
  args: {
    eyebrow: "AMAZING RESULTS",
    image: "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg",
    name: "Carlos",
    title: "ENHANCED FOCUS",
    quote:
      "My productivity has increased dramatically since learning these techniques. I can now concentrate for hours without distraction.",
    children: (
      <button className="px-6 py-2 bg-accent-green text-white rounded-lg font-medium hover:bg-accent-green/90 transition-colors">
        Start Your Journey
      </button>
    ),
  },
};
