import { sanityClient } from '../../../lib/sanityClient';

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function SanityTestPage() {
  // Get the projectId and dataset from the client configuration
  const projectId = sanityClient.config().projectId;
  const dataset = sanityClient.config().dataset;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sanity Connection Test</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Configuration</h2>
        <p><strong>Project ID:</strong> {projectId}</p>
        <p><strong>Dataset:</strong> {dataset}</p>
      </div>
      
      <div className="text-sm text-gray-500">
        <p>This page is connected to your Sanity Studio with project ID: {projectId}</p>
      </div>
    </div>
  );
}