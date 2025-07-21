import { createClient } from '@sanity/client';

const client = createClient({
  projectId: "3dlng0y4",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2022-03-25',
  useCdn: false,
});

export async function getGallery() {
  try {
    const gallery = await client.fetch(`
      *[_type == "gallery"][0] {
        title,
        folders[] {
          folderName,
          images[] {
            _type == "image" => {
              "url": asset->url,
              "width": asset->metadata.dimensions.width,
              "height": asset->metadata.dimensions.height,
              "alt": asset->altText,
              hotspot
            },
            _type == "url" => {
              "url": @,
              "isExternalUrl": true
            }
          }
        }
      }
    `);
    
    return gallery;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return null;
  }
}

export async function getFolderImages(folderIndex: number) {
  try {
    const gallery = await client.fetch(`
      *[_type == "gallery"][0] {
        "folder": folders[${folderIndex}] {
          folderName,
          images[] {
            _type == "image" => {
              "url": asset->url,
              "width": asset->metadata.dimensions.width,
              "height": asset->metadata.dimensions.height,
              "alt": asset->altText,
              hotspot
            },
            _type == "url" => {
              "url": @,
              "isExternalUrl": true
            }
          }
        }
      }
    `);
    
    return gallery?.folder;
  } catch (error) {
    console.error(`Error fetching folder ${folderIndex} images:`, error);
    return null;
  }
} 