// Types for Hero Section Components

export interface HeroSlide {
  id: string;
  mainHeading: string;
  supportingText: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  eventLogo?: string;
}

export interface HeroSectionProps {
  slides?: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  imageScale?: number; // Scale factor for images (0.8 = 80% of original size)
}

// Sanity CMS Hero Content Types
export interface SanityHeroContent {
  _id: string;
  _type: string;
  mainHeading: string;
  supportingText: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  eventLogo?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  order?: number;
  isActive?: boolean;
}

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}
