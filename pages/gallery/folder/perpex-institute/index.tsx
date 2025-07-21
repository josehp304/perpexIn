'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowLeft, Grid } from "lucide-react";

// Background Elements Component
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-400/5 to-teal-600/5 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute top-60 right-20 w-[28rem] h-[28rem] bg-gradient-to-r from-emerald-500/5 to-teal-700/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-300/5 to-teal-600/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
  </div>
);

// Grid Pattern
const GridPattern = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_60%,transparent_100%)]"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(52,211,153,0.1)_0%,transparent_50%)]"></div>
  </div>
);

export default function PerpeXInstituteGallery() {
  // Placeholder images - in a real scenario, these would come from your data
  const images = [
    "/placeholder1.jpg", 
    "/placeholder2.jpg",
    "/placeholder3.jpg",
    "/placeholder4.jpg"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 text-white relative overflow-hidden">
      <FloatingElements />
      <GridPattern />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-emerald-800/10 to-emerald-900/5 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-100 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Gallery</span>
            </Link>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 backdrop-blur-xl border border-emerald-400/20 rounded-full px-8 py-3 mb-12 shadow-2xl">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-bold text-emerald-200">Gallery Collection</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-12 leading-none">
              <span className="block bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent">
                PerpeX Institute
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-emerald-100 max-w-5xl mx-auto leading-relaxed mb-16 font-light">
              Comprehensive training ecosystem for professional excellence
            </p>
          </div>
        </div>
      </div>
      
      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-32">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 backdrop-blur-xl border border-emerald-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
            <Grid className="w-6 h-6 text-emerald-400" />
            <span className="text-lg font-bold text-emerald-200">Image Collection</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            Our Training Programs
          </h2>
          <p className="text-xl text-emerald-100 max-w-4xl mx-auto font-light">
            Explore images from our training sessions, workshops, and events
          </p>
        </div>
        
        {/* Placeholder Gallery Grid - would be populated from data in a real scenario */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group overflow-hidden bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-xl border border-emerald-400/20 rounded-2xl shadow-2xl h-80"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-end p-6">
                <h3 className="text-xl font-bold text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Training Session {index + 1}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-24 text-center">
          <p className="text-xl text-emerald-200 mb-6">
            Interested in our training programs?
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 