import { sanityClient } from './sanityClient';
import { groq } from 'next-sanity';

export interface Course {
  _id: string;
  title: string;
  duration: string;
  keyOutcomes: string[];
  icon: string;
  learnMoreLink?: string;
}

export async function getCourses(): Promise<Course[]> {
  const query = groq`*[_type == "course"] | order(_createdAt asc) {
    _id,
    title,
    duration,
    keyOutcomes,
    icon,
    learnMoreLink
  }`;
  return sanityClient.fetch(query);
} 