// Types for Event Section Components

export interface Event {
  id: string;
  title: string;
  date: string;
  image?: string;
  ctaLink: string;
}

// Sanity CMS Event Types
export interface SanityEvent {
  _id: string;
  title: string;
  date: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  ctaLink: string;
  publishedAt: string;
}
