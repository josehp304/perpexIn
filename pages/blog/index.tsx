"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getBlogs, Blog, urlFor } from "@/lib/getBlogs";
import { Curve } from "@/components";
import { Star, Clock, ArrowRight } from "lucide-react";

// Background Components
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        setError("Failed to load blogs from Sanity.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      <FloatingElements />
      <GridPattern />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-blue-800/10 to-blue-900/5 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
              <Star className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Insights & Knowledge</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">Our Blog</span>
            </h1>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">
              Discover industry insights, expert tips, and success stories to accelerate your career growth and business development journey.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-6 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm mb-10 max-w-md mx-auto text-center">
            <h2 className="font-semibold text-xl text-red-200 mb-2">Error</h2>
            <p className="text-red-100">{error}</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium text-blue-100 mb-4">No blog posts yet</h3>
            <p className="text-blue-200">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              // Determine image source
              let imageSrc;
              if (blog.imageType === 'upload' && blog.uploadedImage) {
                imageSrc = urlFor(blog.uploadedImage).width(800).height(500).url();
              } else if (blog.imageUrl) {
                imageSrc = blog.imageUrl;
              } else {
                // Fallback image if none provided
                imageSrc = "https://via.placeholder.com/800x500?text=No+Image";
              }

              return (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-blue-500/20 flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="h-56 w-full relative overflow-hidden">
                    <Image 
                      src={imageSrc} 
                      alt={blog.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative z-10">
                    <div className="flex items-center text-sm text-blue-300 mb-3">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{formatDate(blog.publishedAt)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors duration-500">
                      {blog.title}
                    </h3>
                    <p className="text-blue-200 leading-relaxed mb-6 flex-1 group-hover:text-blue-100 transition-colors duration-500 line-clamp-3">
                      {blog.description}
                    </p>
                    <Link 
                      href={`/blog/${blog.slug.current}`}
                      className="inline-flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 w-fit"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="relative mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-800/10 backdrop-blur-xl"></div>
        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/15 to-blue-600/15 backdrop-blur-xl border border-blue-400/25 rounded-full px-8 py-3 mb-8 shadow-xl">
              <Star className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Stay Updated</span>
            </div>
            <h2 className="text-6xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-2xl text-blue-100 max-w-3xl mx-auto mb-12 font-light">
              Get the latest insights, tips, and updates delivered directly to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-2xl text-white placeholder-blue-300/50 focus:border-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-bold transition-all duration-300 text-white shadow-lg hover:shadow-blue-500/25"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-blue-300/80 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 