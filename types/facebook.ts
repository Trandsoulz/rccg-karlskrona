// Sanity Facebook post type (raw data from CMS)
export interface SanityFacebookPost {
  _id: string;
  iframeCode: string;
  publishedAt: string;
}

// Transformed Facebook post type for frontend use
export interface FacebookPost {
  id: string;
  iframeCode: string;
  publishedAt: string;
}
