import type { Meta, StoryObj } from "@storybook/nextjs";
import EventSchemaData from "@/components/seo/EventSchemaData";

const meta: Meta<typeof EventSchemaData> = {
  title: "SEO/EventSchemaData",
  component: EventSchemaData,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    eventType: {
      control: { type: "select" },
      options: ["EducationEvent", "Event"],
    },
    eventAttendanceMode: {
      control: { type: "select" },
      options: [
        "OnlineEventAttendanceMode",
        "OfflineEventAttendanceMode",
        "MixedEventAttendanceMode",
      ],
    },
    eventStatus: {
      control: { type: "select" },
      options: [
        "EventScheduled",
        "EventCancelled",
        "EventMovedOnline",
        "EventPostponed",
        "EventRescheduled",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eventId: "event-slug",
    eventType: "EducationEvent",
    name: "HEADLINE",
    description:
      "DESCRIPTION",
    startDate: "2024-03-15T09:00:00",
    endDate: "2024-03-18T17:00:00",
    eventAttendanceMode: "OfflineEventAttendanceMode",
    eventStatus: "EventScheduled",
    location: {
      type: "Place",
      name: "Location Name",
      address: {
        address1: "123 Mind Development Blvd",
        city: "Laredo",
        state: "TX",
        postalCode: "78041",
        country: "US",
      },
    },
    organizer: {
      name: "Organization Name",
      url: "https://example.com",
      logo: {
        url: "https://placehold.co/200x100.png",
        width: 200,
        height: 100,
      },
      address: {
        streetAddress: "123 Street Address",
        addressLocality: "City",
        addressRegion: "State",
        postalCode: "78041",
        addressCountry: "US",
      },
      contactPoint: [
        {
          contactType: "customer service",
          telephone: "+1-956-722-2897",
          email: "info@example.com",
          areaServed: "Worldwide",
          availableLanguage: ["English", "Spanish"],
        },
      ],
    },
    url: "https://example.com/events/event-slug",
    inLanguage: "en-US",
    maximumAttendeeCapacity: 50,
    remainingAttendeeCapacity: 25,
  },
};

export const OnlineEvent: Story = {
  args: {
    eventId: "event-slug",
    eventType: "EducationEvent",
    name: "HEADLINE",
    description:
      "DESCRIPTION",
    startDate: "2024-04-10T19:00:00",
    endDate: "2024-04-10T21:00:00",
    eventAttendanceMode: "OnlineEventAttendanceMode",
    eventStatus: "EventScheduled",
    location: {
      type: "VirtualLocation",
      url: "https://zoom.us/j/123456789",
      name: "Zoom Room",
    },
    organizer: {
      name: "Organization Name",
      url: "https://example.com",
      logo: {
        url: "https://placehold.co/200x100.png",
        width: 200,
        height: 100,
      },
    },
    performer: [
      {
        type: "Person",
        name: "Person Name",
        url: "https://example.com/instructors/person-slug",
        image: "https://placehold.co/300x400.png",
      },
    ],
    offers: [
      {
        name: "Free Webinar Access",
        url: "https://example.com/register-webinar",
        price: "0",
        priceCurrency: "USD",
        availability: "InStock",
      },
    ],
    url: "https://example.com/events/event-slug",
    inLanguage: "en-US",
    maximumAttendeeCapacity: 1000,
    remainingAttendeeCapacity: 750,
  },
};

export const WithSponsors: Story = {
  args: {
    eventId: "event-slug",
    eventType: "EducationEvent",
    name: "HEADLINE",
    description:
      "DESCRIPTION",
    startDate: "2024-06-01T08:00:00",
    endDate: "2024-06-03T18:00:00",
    eventAttendanceMode: "MixedEventAttendanceMode",
    eventStatus: "EventScheduled",
    location: {
      type: "Place",
      name: "Grand Conference Center",
      address: {
        address1: "456 Conference Way",
        city: "Austin",
        state: "TX",
        postalCode: "78701",
        country: "US",
      },
    },
    organizer: {
      name: "Organization Name",
      url: "https://example.com",
      logo: {
        url: "https://placehold.co/200x100.png",
        width: 200,
        height: 100,
      },
    },
    sponsor: [
      {
        type: "Organization",
        name: "Mind Development Institute",
        url: "https://minddevelopment.org",
        logo: {
          url: "https://placehold.co/150x75.png",
          width: 150,
          height: 75,
        },
      },
      {
        type: "Organization",
        name: "Consciousness Research Foundation",
        url: "https://consciousnessresearch.org",
        logo: {
          url: "https://placehold.co/150x75.png",
          width: 150,
          height: 75,
        },
      },
    ],
    offers: [
      {
        name: "Early Bird Registration",
        url: "https://example.com/register-conference",
        price: "299.00",
        priceCurrency: "USD",
        availability: "InStock",
        validThrough: "2024-04-30T23:59:59",
      },
      {
        name: "Regular Registration",
        url: "https://example.com/register-conference",
        price: "399.00",
        priceCurrency: "USD",
        availability: "InStock",
        validFrom: "2024-05-01T00:00:00",
      },
    ],
    url: "https://example.com/events/event-slug",
    inLanguage: "en-US",
    audience: {
      audienceType: "Audience Type",
      name: "Community Name",
    },
    maximumAttendeeCapacity: 500,
    remainingAttendeeCapacity: 150,
  },
};
