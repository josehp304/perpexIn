"use client";
import {
    useMotionValueEvent,
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
    color?: string;
    icon?: React.ReactNode;
    step?: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"]
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const progress = Math.max(0, Math.min(1, latest));
        const sectionProgress = progress * data.length; // Changed from (data.length - 1)
        const newActiveIndex = Math.min(Math.floor(sectionProgress), data.length - 1);

        if (newActiveIndex >= 0 && newActiveIndex < data.length && newActiveIndex !== activeIndex) {
            setActiveIndex(newActiveIndex);
        }
    });

    return (
        <div
            className="w-full font-sans relative"
            ref={containerRef}
            style={{
                minHeight: '400vh',
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                backgroundColor: '#0F172A'
            }}
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
                {/* Left side content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 lg:py-32 lg:sticky lg:top-0 lg:h-screen">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
                            <p className="text-sm text-blue-400 font-medium uppercase tracking-wider">
                                Professional Development Journey
                            </p>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-8">
                            From Learning<br />
                            to <br />
                            <span className="text-blue-400">Leadership</span>
                        </h1>

                        <div className="space-y-6 mb-12">
                            <p className="text-gray-300 text-xl leading-relaxed">
                                Master the journey from <span className="text-white font-semibold">foundational knowledge</span> to becoming a
                                <span className="text-blue-400 font-semibold"> professional consultant or entrepreneur</span> through our structured development phases.
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Build expertise in <span className="text-white">business strategy, communication, and leadership</span> while
                                developing the mindset and skills needed for long-term success.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                            <button className="px-8 lg:px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center">
                                Begin Journey
                            </button>
                            <button className="px-8 lg:px-10 py-4 border border-gray-400 text-gray-300 font-semibold rounded-full hover:bg-gray-800 hover:border-gray-300 transition-all duration-300 text-center">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right side timeline */}
                <div className="w-full lg:w-1/2 relative">
                    <div ref={ref} className="pt-20 lg:pt-40 px-6 md:px-12 lg:pl-16 lg:pr-12 pb-20 lg:pb-32">
                        {data.map((item, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <div
                                    key={index}
                                    className="relative pl-16 mb-32"
                                >
                                    {/* Timeline dot - positioned consistently */}
                                    <div
                                        className={`absolute left-0 top-2 w-10 h-10 rounded-full border-4 transition-all duration-700 ease-out z-10 ${isActive
                                            ? 'bg-blue-500 border-blue-400 scale-110 shadow-lg shadow-blue-500/50'
                                            : 'bg-gray-700 border-gray-600'
                                            }`}
                                    >
                                        <div className={`absolute inset-2 rounded-full transition-all duration-700 ${isActive ? 'bg-white' : 'bg-transparent'
                                            }`} />

                                        {/* Step number inside dot */}
                                        <div className={`absolute inset-0 flex items-center justify-center text-xs font-bold transition-all duration-700 ${isActive ? 'text-blue-500' : 'text-gray-400'
                                            }`}>
                                            {item.step}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div
                                        className={`transition-all duration-700 ease-out ${isActive ? 'opacity-100 transform translate-x-0' : 'opacity-70 transform translate-x-2'
                                            }`}
                                    >
                                        <div className="inline-flex items-center px-3 py-1 bg-gray-800/60 border border-gray-700 rounded-full mb-6">
                                            <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                                                Phase {item.step}
                                            </p>
                                        </div>

                                        <h3
                                            className={`text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight transition-all duration-700 ease-out ${isActive ? 'text-white font-bold' : 'text-gray-400 font-semibold'
                                                }`}
                                        >
                                            {item.title}
                                        </h3>

                                        <div
                                            className={`leading-relaxed max-w-2xl text-lg lg:text-xl transition-all duration-700 ease-out ${isActive ? 'text-gray-200' : 'text-gray-500'
                                                }`}
                                        >
                                            {item.content}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Timeline line - positioned to connect dots perfectly */}
                        <div
                            className="absolute left-5 top-[88px] w-0.5 bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 rounded-full"
                            style={{
                                height: height - 80 + "px",
                            }}
                        >
                            <motion.div
                                className="absolute inset-x-0 top-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 origin-top rounded-full"
                                style={{
                                    height: useTransform(scrollYProgress, [0, 1], [0, height - 80])
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 30,
                                    mass: 1
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Updated timeline data with your 5 educational development phases
const timelineData = [
    {
        step: "🪴",
        title: "Inception",
        content: (
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-6">
                    <p className="text-xl font-semibold text-blue-300 mb-3">Foundation Building</p>
                    <p className="text-lg leading-relaxed text-gray-200">
                        Build foundational awareness and mindset needed for entrepreneurship or business development.
                    </p>
                </div>

                <div className="grid gap-4 mt-8">
                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-400/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">Personal Vision</h4>
                                <p className="text-gray-300 leading-relaxed">Clarifying your personal vision and long-term &quot;why&quot; to guide your journey.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-400/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">Business Fundamentals</h4>
                                <p className="text-gray-300 leading-relaxed">Understanding core business concepts: value creation, customer needs, and problem-solving.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-400/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">Entrepreneurial Mindset</h4>
                                <p className="text-gray-300 leading-relaxed">Developing awareness of what it takes to become an entrepreneur—mindset, risks, and opportunities.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        step: "💡",
        title: "Revelation",
        content: (
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500/15 to-blue-600/8 border border-blue-400/25 rounded-xl p-6">
                    <p className="text-xl font-semibold text-blue-200 mb-3">Clarity & Communication</p>
                    <p className="text-lg leading-relaxed text-gray-200">
                        Gain clarity in business dynamics, sharpen communication, and understand marketing and sales mechanics.
                    </p>
                </div>

                <div className="grid gap-4 mt-8">
                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-400/25 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-300 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-300/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">Strategic Communication</h4>
                                <p className="text-gray-300 leading-relaxed">Building confident, strategic communication for business settings and market positioning.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-400/25 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-300 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-300/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">Marketing Mastery</h4>
                                <p className="text-gray-300 leading-relaxed">Learning modern marketing strategies: content, performance, brand building, and hands-on tools.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-400/25 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-300 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-300/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">Sales & Finance</h4>
                                <p className="text-gray-300 leading-relaxed">Deep diving into sales strategies and strengthening financial literacy: cash flow, pricing, budgeting.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        step: "🔄",
        title: "Transition",
        content: (
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/10 border border-blue-600/30 rounded-xl p-6">
                    <p className="text-xl font-semibold text-blue-300 mb-3">Theory to Practice</p>
                    <p className="text-lg leading-relaxed text-gray-200">
                        Bridge theory and practice; start forming real-world structures and taking ownership.
                    </p>
                </div>

                <div className="grid gap-4 mt-8">
                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-600/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-500/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">From Idea to Action</h4>
                                <p className="text-gray-300 leading-relaxed">Moving from idea to action: building a service or business framework.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-600/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-500/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">MVP Development</h4>
                                <p className="text-gray-300 leading-relaxed">Constructing a minimal viable offer or prototype and testing in the real world.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-600/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-500/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">Semi-Professional Practice</h4>
                                <p className="text-gray-300 leading-relaxed">Beginning to operate in a semi-professional capacity (freelance, consulting, side project).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        step: "⚙",
        title: "Implementation",
        content: (
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-400/20 to-blue-500/10 border border-blue-400/30 rounded-xl p-6">
                    <p className="text-xl font-semibold text-blue-200 mb-3">Real-World Application</p>
                    <p className="text-lg leading-relaxed text-gray-200">
                        Apply everything learned in real scenarios; refine tools and prepare for professional performance.
                    </p>
                </div>

                <div className="grid gap-4 mt-8">
                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-300 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-300/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">Practical Application</h4>
                                <p className="text-gray-300 leading-relaxed">Reviewing and applying all tools, models, and strategies in practical settings.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-300 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-300/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">Simulations & Feedback</h4>
                                <p className="text-gray-300 leading-relaxed">Participating in simulations, roleplays, or client-like interactions with structured feedback.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-300 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-300/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">Professional Toolkit</h4>
                                <p className="text-gray-300 leading-relaxed">Enhancing your professional toolkit (templates, proposals, decks, SOPs).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        step: "🔥",
        title: "Revolution",
        content: (
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-700/20 to-blue-800/10 border border-blue-700/30 rounded-xl p-6">
                    <p className="text-xl font-semibold text-blue-200 mb-3">Professional Mastery</p>
                    <p className="text-lg leading-relaxed text-gray-200">
                        Become client-ready or job-ready; confidently operate as a professional consultant, entrepreneur, or team leader.
                    </p>
                </div>

                <div className="grid gap-4 mt-8">
                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-700/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-600/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">Personal Brand</h4>
                                <p className="text-gray-300 leading-relaxed">Finalizing your personal brand and positioning for professional success.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-700/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-600/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">Market Ready</h4>
                                <p className="text-gray-300 leading-relaxed">Preparing for client acquisition or job interviews with a compelling portfolio.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-6 hover:border-blue-700/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-600/50"></div>
                            <div>
                                <h4 className="font-bold text-white text-lg mb-2">Next Steps</h4>
                                <p className="text-gray-300 leading-relaxed">Mapping out next steps: business launch, freelancing career, or high-performance corporate role.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
];

// Demo component
export default function EducationalDevelopmentTimeline() {
    return (
        <div>
            <Timeline data={timelineData} />
        </div>
    );
}