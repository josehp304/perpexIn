import { sanityClient } from './sanityClient';
import { groq } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Initialize the image URL builder
const builder = imageUrlBuilder(sanityClient);

// Helper function to generate image URLs
function urlFor(source: any) {
  return builder.image(source);
}

export interface Testimonial {
  _id: string;
  name: string;
  designation: string;
  company: string;
  type: string; // Changed from 'tag' to 'type'
  testimonial: string;
  imageUrl?: string;
  uploadedImage?: {
    asset: {
      _ref: string;
    };
  };
  imageType: 'upload' | 'url';
}

export interface ProcessedTestimonial {
  _id: string;
  name: string;
  company: string;
  designation: string;
  email: string; // We'll use name@company.com as a fallback
  description: string;
  img: string;
  type: string; // 'consulting' or 'placement' based on tag
}

export async function getTestimonials(): Promise<ProcessedTestimonial[]> {
  const query = groq`*[_type == "testimonialCard"] {
    _id,
    name,
    designation,
    company,
    type,
    testimonial,
    imageType,
    uploadedImage,
    imageUrl
  }`;
  
  const testimonials: Testimonial[] = await sanityClient.fetch(query);
  
  // Process testimonials to match the expected format in the app
  return testimonials.map(testimonial => {
    // Determine image URL based on imageType
    let imageSource = '';
    if (testimonial.imageType === 'upload' && testimonial.uploadedImage) {
      imageSource = urlFor(testimonial.uploadedImage).url();
    } else if (testimonial.imageType === 'url' && testimonial.imageUrl) {
      imageSource = testimonial.imageUrl;
    }
    
    // Create email from name and company (as a fallback since we don't have actual emails)
    const email = `${testimonial.name.toLowerCase().replace(/\s+/g, '.')}@${testimonial.company.toLowerCase().replace(/\s+/g, '')}.com`;
    
    // Use the type field directly from the schema
    const type = testimonial.type || 'consulting'; // Default to 'consulting' if not specified
    
    return {
      _id: testimonial._id,
      name: testimonial.name,
      company: testimonial.company,
      designation: testimonial.designation,
      email: email,
      description: testimonial.testimonial,
      img: imageSource,
      type: type
    };
  });
} 