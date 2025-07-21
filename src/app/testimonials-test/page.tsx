import { ProcessedTestimonial, getTestimonials } from '@/lib/getTestimonials';

export const revalidate = 60;

export default async function TestimonialsTestPage() {
  // Fetch testimonials
  let testimonials: ProcessedTestimonial[] = [];
  let error: string | null = null;
  
  try {
    testimonials = await getTestimonials();
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = String(e);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sanity Testimonials Test</h1>
      
      {error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded mb-6">
          <h2 className="font-semibold">Error fetching testimonials:</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Testimonials from Sanity</h2>
          {testimonials.length === 0 ? (
            <p>No testimonials found. Make sure you have documents of type &apos;testimonialCard&apos; in your Sanity dataset.</p>
          ) : (
            <div>
              <p className="mb-4">Found {testimonials.length} testimonials</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial._id} className="border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center mb-4">
                      {testimonial.img && (
                        <img 
                          src={testimonial.img} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.designation}</p>
                        <p className="text-xs text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm mb-2 italic">&quot;{testimonial.description}&quot;</p>
                      <div className="text-xs px-2 py-1 bg-gray-100 rounded-full inline-block">
                        {testimonial.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="text-sm text-gray-500 mt-8">
        <h3 className="font-semibold mb-2">How to add testimonials:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Go to your Sanity Studio</li>
          <li>Create new documents of type &apos;testimonialCard&apos;</li>
          <li>Fill in the required fields (name, designation, company, tag, testimonial)</li>
          <li>Upload an image or provide an image URL</li>
          <li>Publish the document</li>
          <li>Refresh this page to see your testimonials</li>
        </ol>
      </div>
    </div>
  );
} 