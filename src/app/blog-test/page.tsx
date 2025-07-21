import { getBlogs, Blog, urlFor } from '@/lib/getBlogs';
import Link from 'next/link';

export const revalidate = 60;

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

export default async function BlogTestPage() {
  // Fetch blogs
  let blogs: Blog[] = [];
  let error: string | null = null;
  
  try {
    blogs = await getBlogs();
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = String(e);
    }
  }

  // Function to determine image source
  const getImageSrc = (blog: Blog) => {
    if (blog.imageType === 'upload' && blog.uploadedImage) {
      return urlFor(blog.uploadedImage).width(400).height(300).url();
    } else if (blog.imageUrl) {
      return blog.imageUrl;
    } else {
      return "https://via.placeholder.com/400x300?text=No+Image";
    }
  };

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
      
      <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
            <span className="text-lg font-bold text-blue-200">Blog Posts</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Sanity Blog Test
          </h2>
          <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">
            {error ? "Error fetching blog posts" : `Successfully fetched ${blogs.length} blog posts`}
          </p>
        </div>
        
        {error ? (
          <div className="p-6 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm mb-10">
            <h2 className="font-semibold text-xl text-red-200 mb-2">Error fetching blogs:</h2>
            <p className="text-red-100">{error}</p>
          </div>
        ) : null}

        {blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div 
                key={blog._id}
                className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-blue-500/20 flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="h-48 w-full relative overflow-hidden">
                  <img 
                    src={getImageSrc(blog)} 
                    alt={blog.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-60"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col relative z-10">
                  <div className="bg-blue-400/20 border border-blue-300/30 rounded-full px-3 py-1 inline-block mb-3 w-fit">
                    <span className="text-xs font-bold text-blue-200">{formatDate(blog.publishedAt)}</span>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-12 py-5 rounded-full font-bold transition-all duration-500 text-white shadow-2xl hover:shadow-blue-500/25 transform hover:scale-110"
          >
            Go to Blog Page
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 