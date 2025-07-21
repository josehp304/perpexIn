import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface ITestimonial {
  quote: string;
  name: string;
  designation: string;
  program: string;
  industry: string;
  location: string;
  src: string;
}


const SuccessStoriesPage = () => {
    const testimonials: ITestimonial[] = useMemo(() => [
        {
            quote: "This program was a game-changer for my career. The hands-on projects and mentorship were invaluable.",
            name: "Aisha Khan",
            designation: "Software Engineer at TechCorp",
            program: "Web Development",
            industry: "Technology",
            location: "San Francisco",
            src: "/placeholder.jpg",
        },
        {
            quote: "I was able to transition into a new industry thanks to the skills I gained here. Highly recommend!",
            name: "Ben Carter",
            designation: "Data Analyst at FinServe",
            program: "Data Science",
            industry: "Finance",
            location: "New York",
            src: "/placeholder.jpg",
        },
        {
            quote: "The marketing course gave me the confidence to launch my own startup.",
            name: "Chloe Davis",
            designation: "Founder of MarketMinds",
            program: "Digital Marketing",
            industry: "Marketing",
            location: "London",
            src: "/placeholder.jpg",
        },
        {
            quote: "An incredible learning experience with top-notch instructors.",
            name: "David Rodriguez",
            designation: "UX/UI Designer at CreativeCo",
            program: "UX/UI Design",
            industry: "Design",
            location: "Austin",
            src: "/placeholder.jpg",
        },
        {
            quote: "The curriculum is very up-to-date and relevant to the current job market.",
            name: "Eva Wilson",
            designation: "Project Manager at BuildIt",
            program: "Web Development",
            industry: "Construction",
            location: "Chicago",
            src: "/placeholder.jpg",
        },
        {
            quote: "I landed my dream job just a month after graduating. The career support is fantastic.",
            name: "Frank Miller",
            designation: "Software Engineer at Innovate LLC",
            program: "Data Science",
            industry: "Technology",
            location: "Boston",
            src: "/placeholder.jpg",
        },
    ], []);

    const [programFilter, setProgramFilter] = useState('All');
    const [industryFilter, setIndustryFilter] = useState('All');
    const [locationFilter, setLocationFilter] = useState('All');

    const programs = useMemo(() => ['All', ...new Set(testimonials.map((t: ITestimonial) => t.program))], [testimonials]);
    const industries = useMemo(() => ['All', ...new Set(testimonials.map((t: ITestimonial) => t.industry))], [testimonials]);
    const locations = useMemo(() => ['All', ...new Set(testimonials.map((t: ITestimonial) => t.location))], [testimonials]);

    const filteredTestimonials = useMemo(() => {
        return testimonials.filter((testimonial: ITestimonial) => {
            const programMatch = programFilter === 'All' || testimonial.program === programFilter;
            const industryMatch = industryFilter === 'All' || testimonial.industry === industryFilter;
            const locationMatch = locationFilter === 'All' || testimonial.location === locationFilter;
            return programMatch && industryMatch && locationMatch;
        });
    }, [testimonials, programFilter, industryFilter, locationFilter]);

   
    
    return (
        <div className="bg-black text-white min-h-screen p-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-2">Success Stories</h1>
                <p className="text-lg text-gray-400">See what our graduates have accomplished.</p>
            </header>

            <div className="flex justify-center gap-8 mb-12">
                <div className="flex flex-col">
                    <label htmlFor="program-filter" className="mb-2 text-gray-300">Program</label>
                    <select
                        id="program-filter"
                        value={programFilter}
                        onChange={(e) => setProgramFilter(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
                    >
                        {programs.map(program => <option key={program} value={program}>{program}</option>)}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="industry-filter" className="mb-2 text-gray-300">Industry</label>
                    <select
                        id="industry-filter"
                        value={industryFilter}
                        onChange={(e) => setIndustryFilter(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
                    >
                        {industries.map(industry => <option key={industry} value={industry}>{industry}</option>)}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="location-filter" className="mb-2 text-gray-300">Location</label>
                    <select
                        id="location-filter"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
                    >
                        {locations.map(location => <option key={location} value={location}>{location}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTestimonials.map((testimonial: ITestimonial, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-900 p-6 rounded-lg shadow-lg"
                    >
                        <p className="text-lg italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                        <div className="text-right">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-gray-400">{testimonial.designation}</p>
                            <div className="mt-2 text-xs text-gray-500">
                                <span>{testimonial.program}</span> | <span>{testimonial.industry}</span> | <span>{testimonial.location}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
             {filteredTestimonials.length === 0 && (
                <div className="text-center text-gray-500 mt-12">
                    <p>No testimonials match the current filters.</p>
                </div>
            )}
        </div>
    );
    
}

export default SuccessStoriesPage; 