import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: '3dlng0y4',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
}); 