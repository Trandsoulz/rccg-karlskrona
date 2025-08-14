// Sanity Gallery Type (what comes from CMS)
export interface SanityGallery {
  _id: string;
  name: string;
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
  uploadedAt: string;
}

// Transformed Gallery Type (what we use in components)
export interface Gallery {
  id: string;
  name: string;
  image: string; // Optimized URL
  uploadedAt: string;
}
