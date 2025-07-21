'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getFolderImages } from "@/lib/getGallery";
import { Sparkles, Grid, ArrowLeft, X, Loader2, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react";

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

// Image Modal Component
interface ImageModalProps {
  image: ImageData;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  image, 
  onClose, 
  onPrev, 
  onNext, 
  hasPrev, 
  hasNext 
}) => {
  const [scale, setScale] = useState(1);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    
    // Only add event listeners if we're in a browser environment
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      
      // Clean up function
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    
    // Return empty function if not in browser environment
    return () => {};
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button 
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setScale(prev => Math.max(0.5, prev - 0.5));
          }}
        >
          <ZoomOut className="w-6 h-6 text-white" />
        </button>
        <button 
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setScale(prev => Math.min(3, prev + 0.5));
          }}
        >
          <ZoomIn className="w-6 h-6 text-white" />
        </button>
        <button 
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            window.open(image.url, '_blank');
          }}
        >
          <Download className="w-6 h-6 text-white" />
        </button>
        <button 
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
      
      <div 
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div 
          className="relative"
          style={{ scale }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Image
            src={image.url}
            alt={image.alt || "Gallery image"}
            width={image.width || 1200}
            height={image.height || 800}
            className="max-w-[90vw] max-h-[85vh] object-contain"
          />
        </motion.div>
        
        {hasPrev && (
          <button 
            className="absolute left-4 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}
        
        {hasNext && (
          <button 
            className="absolute right-4 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default function FolderPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [folderData, setFolderData] = useState<FolderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  useEffect(() => {
    async function loadFolder() {
      if (!id) return;
      
      try {
        const folderIndex = parseInt(id as string);
        const data = await getFolderImages(folderIndex);
        setFolderData(data);
      } catch (err) {
        console.error("Error loading folder:", err);
        setError("Failed to load images. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    // Safely load folder data
    if (typeof window !== 'undefined' && id) {
      loadFolder();
    }
    
    // Clean return function with no dependencies that could be undefined
    return () => {
      // Empty cleanup function to avoid errors
    };
  }, [id]);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handlePrevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null && folderData && selectedImage < folderData.images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      <FloatingElements />
      <GridPattern />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-blue-800/10 to-blue-900/5 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/gallery" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-100 transition-colors mb-6">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Gallery</span>
              </Link>
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                {folderData?.folderName || "Loading..."}
              </h1>
              <p className="text-xl text-blue-100 mt-4 font-light">
                {folderData ? `${folderData.images.length} images` : ""}
              </p>
            </div>
            
            <div className="mt-6 md:mt-0">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 shadow-2xl">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <span className="text-lg font-bold text-blue-200">Image Collection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-32">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
            <p className="text-blue-200 text-xl">Loading images...</p>
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
        ) : folderData?.images ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {folderData.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => handleImageClick(index)}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 rounded-2xl shadow-2xl aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative h-full w-full">
                    <Image
                      src={image.url}
                      alt={image.alt || `Image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-3 bg-white/20 backdrop-blur-md rounded-full">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-8 text-center">
            <p className="text-blue-200 text-xl">No images found in this folder.</p>
            <Link href="/gallery" className="mt-4 inline-flex items-center gap-2 text-blue-300 hover:text-blue-100 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Return to Gallery</span>
            </Link>
          </div>
        )}
      </div>
      
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage !== null && folderData?.images && (
          <ImageModal
            image={folderData.images[selectedImage]}
            onClose={handleCloseModal}
            onPrev={handlePrevImage}
            onNext={handleNextImage}
            hasPrev={selectedImage > 0}
            hasNext={selectedImage < folderData.images.length - 1}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 