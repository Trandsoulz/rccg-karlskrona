import imageUrlBuilder from '@sanity/image-url';
import { client, isSanityConfigured } from '@/app/sanity/client';

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate optimized image URLs
export function urlFor(source: any) {
  if (!isSanityConfigured()) {
    console.warn('Sanity is not configured, returning empty image URL');
    return { url: () => '' };
  }
  return builder.image(source);
}

// Generate optimized image URL with specific dimensions and quality
export function getOptimizedImageUrl(
  source: any,
  width?: number,
  height?: number,
  quality: number = 100
): string {
  if (!isSanityConfigured() || !source) {
    return '';
  }

  try {
    let imageBuilder = builder.image(source);
    
    if (width) {
      imageBuilder = imageBuilder.width(width);
    }
    
    if (height) {
      imageBuilder = imageBuilder.height(height);
    }
    
    return imageBuilder.quality(quality).format('webp').url();
  } catch (error) {
    console.warn('Error generating optimized image URL:', error);
    return '';
  }
}

// Generate maximum quality image URL without any size constraints
export function getMaxQualityImageUrl(source: any): string {
  if (!isSanityConfigured() || !source) {
    return '';
  }

  try {
    return builder.image(source).quality(100).format('webp').url();
  } catch (error) {
    console.warn('Error generating max quality image URL:', error);
    return '';
  }
}

// Generate responsive image URLs for different screen sizes
export function getResponsiveImageUrls(source: any) {
  if (!isSanityConfigured() || !source) {
    return {
      mobile: '',
      tablet: '',
      desktop: '',
      xl: '',
    };
  }

  return {
    mobile: getOptimizedImageUrl(source, 768, 500),
    tablet: getOptimizedImageUrl(source, 1024, 600),
    desktop: getOptimizedImageUrl(source, 1920, 800),
    xl: getOptimizedImageUrl(source, 2560, 1000),
  };
}
