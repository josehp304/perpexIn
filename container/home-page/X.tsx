import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  GraduationCap, TrendingUp, Target, Building2, ArrowRight, Star
} from "lucide-react";

const pillars = [
  {
    id: 1,
    number: "01",
    title: "PerpeX Institute",
    description: "Comprehensive training ecosystem",
    icon: GraduationCap,
    highlights: [
      "Hands-on practical modules",
      "Industry expert mentorship", 
      "Real-world case studies",
      "Professional skill development",
      "Continuous learning support"
    ],
    color: "emerald",
    accent: "from-emerald-400 to-teal-500",
    pattern: "geometric"
  },
  {
    id: 2,
    number: "02", 
    title: "SaleX",
    description: "Business development excellence",
    icon: TrendingUp,
    highlights: [
      "Client-centric sales funnels",
      "B2B sales strategies",
      "Sales team monitoring",
      "Sales team training",
      "Performance analytics",
      "Product, Process & Communication training"
    ],
    color: "blue",
    accent: "from-blue-400 to-indigo-600",
    pattern: "waves"
  },
  {
    id: 3,
    number: "03",
    title: "MarketriX", 
    description: "Strategic marketing solutions",
    icon: Target,
    highlights: [
      "Lead generation systems",
      "Organic marketing strategies",
      "Meta, Google & SEO services",
      "Video & content production",
      "Growth-focused campaigns"
    ],
    color: "purple",
    accent: "from-purple-400 to-pink-600",
    pattern: "dots"
  },
  {
    id: 4,
    number: "04",
    title: "PlaceX",
    description: "Talent placement hub",
    icon: Building2,
    highlights: [
      "Job portal with 1000+ vacancies",
      "Campus-industry connections",
      "Talent pool",
      "Recruiter network access",
      "Career guidance support & Interview support"
    ],
    color: "orange",
    accent: "from-orange-400 to-red-500",
    pattern: "hexagon"
  }
];

const PatternBackground = ({ pattern }: { pattern: string }) => {
  const patternMap = {
    geometric: "bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)]",
    waves: "bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.02)_50%,transparent_51%)]",
    dots: "bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.02)_2px,transparent_2px)]",
    hexagon: "bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.01),transparent)]"
  };
  
  const backgroundSize = {
    geometric: "40px 40px",
    waves: "30px 30px", 
    dots: "50px 50px",
    hexagon: "60px 60px"
  };
  
  return (
    <div 
      className={`absolute inset-0 opacity-30 ${patternMap[pattern as keyof typeof patternMap] || patternMap.geometric}`}
      style={{ backgroundSize: backgroundSize[pattern as keyof typeof backgroundSize] || backgroundSize.geometric }}
    />
  );
};

const FloatingElements = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div 
      className="absolute top-16 lg:top-20 right-16 lg:right-20 w-2 h-2 lg:w-3 lg:h-3 bg-white/20 rounded-full animate-bounce"
      style={{ animationDelay: '0ms' }}
    />
    <div 
      className="absolute bottom-24 lg:bottom-32 left-12 lg:left-16 w-1 h-1 lg:w-2 lg:h-2 bg-white/30 rounded-full animate-ping"
      style={{ animationDelay: '1000ms' }}
    />
    <div className="absolute top-1/2 right-4 lg:right-8 w-0.5 h-4 lg:w-1 lg:h-8 bg-white/10 rounded-full" />
  </div>
);

const StepIndicator = ({ currentStep, totalSteps, accent }: { currentStep: number, totalSteps: number, accent: string }) => (
  <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 lg:space-x-4">
    {Array.from({ length: totalSteps }, (_, i) => (
      <div 
        key={i} 
        className={`transition-all duration-500 rounded-full ${
          i === currentStep - 1 
            ? `w-8 sm:w-12 lg:w-16 h-2 sm:h-3 lg:h-4 bg-gradient-to-r ${accent} shadow-lg` 
            : 'w-2 sm:w-3 lg:w-4 h-2 sm:h-3 lg:h-4 bg-white/30 hover:bg-white/50'
        }`}
        aria-label={`Step ${i + 1}${i === currentStep - 1 ? ' (current)' : ''}`}
      />
    ))}
  </div>
);

interface Pillar {
  id: number;
  highlights: any;
  icon: React.ComponentType<any>;
  title: string;
  pattern: string;
  accent: string;
  number: string;
  description: string;
}

const PillarCard = ({ pillar }: { pillar: Pillar }) => {
  const Icon = pillar.icon;
  
  const handleExplore = () => {
    console.log(`Exploring ${pillar.title}`);
  };
  
  return (
    <div className="w-screen min-w-screen flex-shrink-0 h-full px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
      <div className="relative max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-3xl w-full mx-auto lg:ml-auto lg:mr-12 h-[85vh] sm:h-[90vh] lg:h-[95vh] overflow-hidden">
        
        {/* Main card with elegant design */}
        <div className="relative w-full h-full bg-black/40 backdrop-blur-2xl rounded-2xl lg:rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden">
          
          {/* Pattern overlay */}
          <PatternBackground pattern={pillar.pattern} />
          
          {/* Elegant glow border */}
          <div className={`absolute inset-0 rounded-2xl lg:rounded-[2.5rem] bg-gradient-to-r ${pillar.accent} opacity-10`} />
          <div className="absolute inset-[1px] rounded-2xl lg:rounded-[2.4rem] bg-gradient-to-br from-white/5 via-transparent to-black/10" />
          
          {/* Header section */}
          <header className="relative z-10 p-6 sm:p-8 lg:p-12">
            <div className="flex items-start justify-between mb-6 lg:mb-8">
              {/* Large number */}
              <div className={`text-4xl sm:text-6xl lg:text-8xl font-extralight bg-gradient-to-br ${pillar.accent} bg-clip-text text-transparent opacity-90`}>
                {pillar.number}
              </div>
              
              {/* Icon with elegant background */}
              <div className={`relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl bg-gradient-to-br ${pillar.accent} p-0.5`}>
                <div className="w-full h-full bg-black/60 backdrop-blur-xl rounded-xl lg:rounded-2xl flex items-center justify-center">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-4 h-4 lg:w-6 lg:h-6 bg-white rounded-full flex items-center justify-center">
                  <Star className="w-2 h-2 lg:w-3 lg:h-3 text-yellow-500" />
                </div>
              </div>
            </div>
            
            {/* Title and description */}
            <div className="mb-6 lg:mb-10">
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-extralight text-white mb-2 lg:mb-4 tracking-tight leading-tight">
                {pillar.title}
              </h2>
              <p className="text-base sm:text-lg lg:text-2xl font-light text-white/70 leading-relaxed">
                {pillar.description}
              </p>
            </div>
            
            {/* Elegant separator */}
            <div className="relative mb-6 lg:mb-12">
              <div className={`w-16 sm:w-24 lg:w-32 h-0.5 lg:h-1 bg-gradient-to-r ${pillar.accent} rounded-full`} />
              <div className="absolute top-0 left-0 w-4 sm:w-6 lg:w-8 h-0.5 lg:h-1 bg-white rounded-full animate-pulse" />
            </div>
          </header>
          
          {/* Highlights section */}
          <div className="relative z-10 px-6 sm:px-8 lg:px-12 pb-4 lg:pb-8 flex-1">
            <ul className="space-y-3 sm:space-y-4 lg:space-y-6">
              {pillar.highlights.map((highlight: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined, idx: React.Key | null | undefined) => (
                <li key={idx} className="group flex items-start hover:translate-x-1 lg:hover:translate-x-3 transition-all duration-300">
                  <div className="relative mr-3 sm:mr-4 lg:mr-6 mt-1 lg:mt-2">
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full bg-gradient-to-br ${pillar.accent} shadow-lg group-hover:scale-125 transition-transform duration-300`} />
                    <div className={`absolute inset-0 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full bg-gradient-to-br ${pillar.accent} blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>
                  <span className="text-white/80 text-sm sm:text-base lg:text-xl font-light leading-relaxed group-hover:text-white transition-colors duration-300 flex-1">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* CTA section */}
          <footer className="relative z-10 p-6 sm:p-8 lg:p-12 pt-4 lg:pt-8">
            <button 
              onClick={handleExplore}
              className={`w-full py-3 sm:py-4 lg:py-6 px-4 sm:px-6 lg:px-8 rounded-xl lg:rounded-2xl bg-gradient-to-r ${pillar.accent} hover:shadow-2xl text-white transition-all duration-500 font-medium text-sm sm:text-base lg:text-lg flex items-center justify-center group relative overflow-hidden transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/50`}
              aria-label={`Explore ${pillar.title} in detail`}
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="relative z-10 mr-2 lg:mr-4">Explore {pillar.title}</span>
              <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 lg:group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </footer>
          
          {/* Floating elements */}
          <FloatingElements />
        </div>
      </div>
      
      {/* Step indicator */}
      <StepIndicator currentStep={pillar.id} totalSteps={pillars.length} accent={pillar.accent} />
    </div>
  );
};

const BackgroundElements = () => (
  <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
    <div 
      className="absolute top-1/4 left-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: '0ms' }}
    />
    <div 
      className="absolute bottom-1/4 right-1/4 w-56 sm:w-72 lg:w-80 h-56 sm:h-72 lg:h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: '1000ms' }}
    />
    <div 
      className="absolute top-1/2 right-1/2 w-48 sm:w-56 lg:w-64 h-48 sm:h-56 lg:h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: '500ms' }}
    />
    <div 
      className="absolute top-3/4 left-1/3 w-52 sm:w-64 lg:w-72 h-52 sm:h-64 lg:h-72 bg-orange-500/5 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: '1500ms' }}
    />
  </div>
);

const ProgressBar = ({ progressWidth }: { progressWidth: string }) => (
  <div className="sticky top-4 lg:top-6 left-0 w-full z-50 px-6 sm:px-8 lg:px-12">
    <div className="h-1 lg:h-1.5 bg-white/10 rounded-full backdrop-blur-sm shadow-lg border border-white/5">
      <motion.div 
        className="h-full bg-gradient-to-r from-emerald-400 via-blue-400 via-purple-400 to-orange-400 rounded-full shadow-lg"
        style={{ width: progressWidth }}
      />
    </div>
  </div>
);

const IntroSection = () => (
  <div className="absolute left-4 sm:left-8 lg:left-12 px-4 sm:px-8 lg:px-12 top-1/2 transform -translate-y-1/2 text-white max-w-xs sm:max-w-md lg:max-w-xl z-0 pointer-events-none">
    <p className="text-lg sm:text-xl lg:text-2xl mb-2 lg:mb-4 font-light">What is Perpex?</p>
    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extralight leading-tight tracking-tight">
      The Four-Pillar
      <br />
      <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
        Ecosystem
      </span>
    </h1>
    <p className="text-sm sm:text-lg lg:text-xl font-light text-slate-400 mt-3 lg:mt-6 max-w-xs sm:max-w-sm lg:max-w-md leading-relaxed">
      An integrated approach designed to transform potential into professional excellence
    </p>
  </div>
);

export default function PerpeXPillarsScroll() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start start", "end start"]
  });
  
  const transformValues = useMemo(() => ({
    x: useTransform(scrollYProgress, [0, 0.9], ["0%", `-${(pillars.length - 1) * 100}%`]),
    progressWidth: useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"])
  }), [scrollYProgress]);
  
  return (
    <section 
      ref={targetRef} 
      className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black"
      style={{ height: `${600}vh` }}
      aria-label="PerpeX Four-Pillar Ecosystem"
    >
      {/* Background elements */}
      <BackgroundElements />
      {/* Progress bar */}
      <ProgressBar progressWidth={transformValues.progressWidth.get()} />
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-start">
        {/* Intro section */}
        <IntroSection />
        
        {/* Horizontal carousel */}
        <motion.div
          style={{ x: transformValues.x }}
          className="flex flex-nowrap h-screen pt-2 lg:pt-4 pb-0 w-full"
        >
          {pillars.map((pillar) => (
            <PillarCard 
              key={pillar.id} 
              pillar={pillar}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}