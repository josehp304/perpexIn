import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Sparkles } from "lucide-react";

interface ITestimonial {
  quote: string;
  name: string;
  designation: string;
  program: string;
  industry: string;
  location: string;
  src: string;
}

// FloatingElements and GridPattern from corporate training page
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute top-60 right-20 w-[28rem] h-[28rem] bg-gradient-to-r from-blue-500/5 to-blue-700/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-300/5 to-blue-600/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-600/3 to-blue-800/3 rounded-full blur-3xl animate-pulse delay-3000"></div>
  </div>
);
const GridPattern = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_60%,transparent_100%)]"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,197,253,0.1)_0%,transparent_50%)]"></div>
  </div>
);

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

    const Testimonial = dynamic(() => import('../../container/home-page/Clients').then(mod => mod.default), { ssr: false });
   
    
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
                            <span className="text-lg font-bold text-blue-200">Inspiring Journeys</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black mb-12 leading-none">
                            <span className="block bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">Success</span>
                            <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">Stories</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-blue-100 max-w-5xl mx-auto leading-relaxed mb-16 font-light">
                            Unlocking potential, transforming careers, and celebrating real impact from our alumni and partners.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                            <a href="/contact" className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-12 py-5 rounded-full font-bold transition-all duration-500 text-white shadow-2xl hover:shadow-blue-500/25 transform hover:scale-110 flex items-center justify-center gap-3 text-lg">
                                Share Your Story
                            </a>
                            <a href="tel:+919745100036" className="group border-2 border-blue-400/50 hover:border-blue-300 hover:bg-blue-500/10 px-12 py-5 rounded-full font-bold transition-all duration-500 text-white backdrop-blur-sm transform hover:scale-110 flex items-center justify-center gap-3 text-lg">
                                Talk to Counselor
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Testimonial />
        </div>
    );
    
}

export default SuccessStoriesPage; 