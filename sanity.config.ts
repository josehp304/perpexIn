'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './src/sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId: "3dlng0y4",
  dataset: "production",
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: '2023-01-01'}),
  ],
})
