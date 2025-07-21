"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getBlogBySlug, Blog, urlFor } from "@/lib/getBlogs";
import { ArrowLeft, Clock, Share2, Bookmark, Star } from "lucide-react";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";

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

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) return;
      
      try {
        const data = await getBlogBySlug(slug as string);
        setBlog(data);
      } catch (err) {
        setError("Failed to load blog from Sanity.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchBlog();
  }, [slug]);

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Portable Text components
  const components: Partial<PortableTextReactComponents> = {
    block: {
      h1: ({children}) => (
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-10">{children}</h1>
      ),
      h2: ({children}) => (
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-8">{children}</h2>
      ),
      h3: ({children}) => (
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 mt-6">{children}</h3>
      ),
      normal: ({children}) => (
        <p className="text-blue-100 text-lg mb-6 leading-relaxed">{children}</p>
      ),
      blockquote: ({children}) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-6 italic text-blue-200 bg-blue-500/10 p-4 rounded-r-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({children}) => (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-blue-100">{children}</ul>
      ),
      number: ({children}) => (
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-blue-100">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({children}) => (
        <li className="text-lg">{children}</li>
      ),
      number: ({children}) => (
        <li className="text-lg">{children}</li>
      ),
    },
    marks: {
      strong: ({children}) => (
        <strong className="font-bold text-white">{children}</strong>
      ),
      em: ({children}) => (
        <em className="italic text-blue-200">{children}</em>
      ),
      link: ({children, value}) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="text-blue-300 hover:text-blue-400 underline transition-colors"
          >
            {children}
          </a>
        );
      },
    },
  };

  // Determine image source
  const getImageSrc = () => {
    if (!blog) return "https://via.placeholder.com/1200x600?text=No+Image";
    
    if (blog.imageType === 'upload' && blog.uploadedImage) {
      return urlFor(blog.uploadedImage).width(1200).height(600).url();
    } else if (blog.imageUrl) {
      return blog.imageUrl;
    } else {
      return "https://via.placeholder.com/1200x600?text=No+Image";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
        <FloatingElements />
        <GridPattern />
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
        <FloatingElements />
        <GridPattern />
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="text-center p-8 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-white">Error</h2>
            <p className="mb-6 text-red-100">{error || "Blog post not found"}</p>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-3 rounded-full font-bold transition-all duration-500 text-white shadow-lg hover:shadow-blue-500/25"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      <FloatingElements />
      <GridPattern />
      
      {/* Hero Section with Featured Image */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src={getImageSrc()}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-blue-950/80 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <Link 
                href="/blog"
                className="inline-flex items-center text-blue-300 hover:text-blue-200 mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Blog
              </Link>
              <h1 className="text-4xl md:text-6xl font-black mb-6 text-white">
                {blog.title}
              </h1>
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-200 rounded-full text-sm font-medium border border-blue-400/30">
                <Clock className="w-4 h-4 mr-2" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Description/Summary */}
          <div className="mb-10 bg-blue-500/10 backdrop-blur-sm p-6 rounded-xl border border-blue-400/20">
            <p className="text-xl text-blue-100 italic">
              {blog.description}
            </p>
          </div>
          
          {/* Share and Save Buttons */}
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-blue-400/20">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-blue-300 hover:text-blue-200 transition-colors">
                <Share2 className="w-5 h-5 mr-2" />
                <span>Share</span>
              </button>
              <button className="flex items-center text-blue-300 hover:text-blue-200 transition-colors">
                <Bookmark className="w-5 h-5 mr-2" />
                <span>Save</span>
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-blue-300 text-sm">
                {formatDate(blog.publishedAt)}
              </span>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="prose prose-lg max-w-none prose-invert prose-headings:text-blue-100 prose-a:text-blue-300">
            <PortableText value={blog.content} components={components} />
          </div>
        </motion.div>
      </div>

      {/* Related Posts Section */}
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
              <span className="text-lg font-bold text-blue-200">Discover More</span>
            </div>
            <h2 className="text-6xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Continue Reading
            </h2>
            
            <div className="flex justify-center mt-12">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-12 py-5 rounded-full font-bold transition-all duration-500 text-white shadow-2xl hover:shadow-blue-500/25 transform hover:scale-110"
              >
                View All Blog Posts
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 