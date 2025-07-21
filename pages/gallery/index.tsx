'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getGallery } from "@/lib/getGallery";
import { Sparkles, Grid, FolderOpen, ImageIcon, ArrowRight, Loader2 } from "lucide-react";

// Types
interface ImageData {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  isExternalUrl?: boolean;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

interface FolderData {
  folderName: string;
  images: ImageData[];
}

interface GalleryData {
  title: string;
  folders: FolderData[];
}

// Background Elements Component
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute top-60 right-20 w-[28rem] h-[28rem] bg-gradient-to-r from-blue-500/5 to-blue-700/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-300/5 to-blue-600/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-600/3 to-blue-800/3 rounded-full blur-3xl animate-pulse delay-3000"></div>
  </div>
);

// Grid Pattern
const GridPattern = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_60%,transparent_100%)]"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,197,253,0.1)_0%,transparent_50%)]"></div>
  </div>
);

// Folder Card Component
const FolderCard = ({ folder, index }: { folder: FolderData; index: number }) => {
  // Get first image as cover or use placeholder
  const coverImage = folder.images && folder.images.length > 0 ? folder.images[0] : null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Link href={`/gallery/folder/${index}`}>
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-blue-500/20 h-[400px] flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* Folder Header */}
          <div className="relative z-10 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-400/30 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                <FolderOpen className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
                {folder.folderName}
              </h3>
            </div>
            <div className="bg-blue-400/20 border border-blue-300/30 rounded-full px-3 py-1">
              <span className="text-sm font-medium text-blue-200">{folder.images.length} images</span>
            </div>
          </div>
          
          {/* Cover Image */}
          <div className="flex-1 relative p-4">
            <div className="absolute inset-0 m-4 rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm">
              {coverImage ? (
                <Image
                  src={coverImage.url}
                  alt={`Cover for ${folder.folderName}`}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-900/20">
                  <ImageIcon className="w-16 h-16 text-blue-300/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent"></div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="relative z-10 p-6 pt-0">
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {folder.images.slice(0, 3).map((image, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-blue-900 overflow-hidden bg-blue-800"
                  >
                    {image.url && (
                      <Image 
                        src={image.url}
                        alt=""
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
                {folder.images.length > 3 && (
                  <div className="w-8 h-8 rounded-full border-2 border-blue-900 bg-blue-600/30 flex items-center justify-center text-xs font-bold text-white">
                    +{folder.images.length - 3}
                  </div>
                )}
              </div>
              <button className="group/btn flex items-center gap-2 text-blue-300 hover:text-blue-100 transition-colors duration-300">
                <span>View Gallery</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await getGallery();
        setGalleryData(data);
      } catch (err) {
        console.error("Error loading gallery:", err);
        setError("Failed to load gallery. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    // Safely load gallery data
    if (typeof window !== 'undefined') {
      loadGallery();
    }
    
    // Clean return function with no dependencies that could be undefined
    return () => {
      // Empty cleanup function to avoid errors
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      <FloatingElements />
      <GridPattern />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-blue-800/10 to-blue-900/5 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-12 shadow-2xl">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Our Visual Story</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black mb-12 leading-none">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 max-w-5xl mx-auto leading-relaxed mb-16 font-light">
              Explore our collections of images showcasing our journey and achievements
            </p>
          </div>
        </div>
      </div>
      
      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-32">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
            <Grid className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold text-blue-200">Image Collections</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Our Folders
          </h2>
          <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">
            Browse through our categorized collections
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
            <p className="text-blue-200 text-xl">Loading gallery...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-8 text-center">
            <p className="text-red-200 text-xl">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-lg text-white transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : galleryData?.folders ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {galleryData.folders.map((folder, index) => (
              <FolderCard key={index} folder={folder} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-8 text-center">
            <p className="text-blue-200 text-xl">No gallery folders found.</p>
          </div>
        )}
      </div>
    </div>
  );
} 