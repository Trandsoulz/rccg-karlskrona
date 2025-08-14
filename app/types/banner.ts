// Types for Banner Components from Sanity CMS

export interface SanityBanner {
  _id: string;
  _type: "banner";
  mainHeading: string;
  supportingText: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: any; // Sanity image object
  order?: number;
  isActive?: boolean;
}

export interface Banner {
  id: string;
  mainHeading: string;
  supportingText: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}
