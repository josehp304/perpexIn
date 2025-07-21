import { sanityClient } from './sanityClient';
import { groq } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Initialize the image URL builder
const builder = imageUrlBuilder(sanityClient);

// Helper function to generate image URLs
export function urlFor(source: any) {
  return builder.image(source);
}

export interface Blog {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  content: any[];
  publishedAt: string;
  imageType: 'upload' | 'url';
  uploadedImage?: {
    asset: {
      _ref: string;
    };
  };
  imageUrl?: string;
}

export async function getBlogs(): Promise<Blog[]> {
  const query = groq`*[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    content,
    publishedAt,
    imageType,
    uploadedImage,
    imageUrl
  }`;
  
  return sanityClient.fetch(query);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const query = groq`*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    publishedAt,
    imageType,
    uploadedImage,
    imageUrl
  }`;
  
  return sanityClient.fetch(query, { slug });
} 