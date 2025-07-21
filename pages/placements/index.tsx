import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TrendingUp, Crown, Briefcase, Building2, Users, Sparkles, CheckCircle, Trophy, MessageCircle, Zap, FileText } from "lucide-react";

// Metrics Section Data
const metrics = [
  { label: "Placement Rate", value: "97%", icon: TrendingUp, description: "Students placed successfully", change: "+5.2%" },
  { label: "Highest Package", value: "₹15 LPA", icon: Crown, description: "Record breaking offer", change: "+12%" },
  { label: "Average Package", value: "₹5 LPA", icon: Briefcase, description: "Industry leading average", change: "+3.3%" },
  { label: "Dream Companies", value: "120+", icon: Building2, description: "Top-tier partnerships", change: "+15" },
];

// Job Roles Section Data
const jobRoles = [
  { title: "BD Executives", salary: "₹10 LPA", icon: "💻", growth: "+23%", openings: "25" },
  { title: "Data Analyst", salary: "₹6-12 LPA", icon: "📊", growth: "+18%", openings: "5" },
  { title: "Marketing Manager", salary: "₹5-10 LPA", icon: "🎨", growth: "+31%", openings: "10" },
  { title: "Product Manager", salary: "₹12-25 LPA", icon: "🚀", growth: "+42%", openings: "5" },
];

// Company Logos - Same as home page
const logos1 = Array.from({ length: 35 }, (_, i) => ({
  name: `Client Logo ${i + 1}`,
  url: `/l${i + 1}.png`,
}));

const logos2 = Array.from({ length: 34 }, (_, i) => ({
  name: `Client Logo ${i + 36}`,
  url: `/l${i + 36}.png`,
}));

// FAQ Section Data
const placementsFaqs = [
  {
    question: "What is the placement rate?",
    answer: "We maintain a 97% placement rate with top companies across various industries."
  },
  {
    question: "Which companies visit for placements?",
    answer: "Our students are placed in companies like Amazon, Google, Microsoft, HCL, Byjus, and many more."
  },
  {
    question: "What is the highest package offered?",
    answer: "Depending on job role and designation, your package will vary."
  },
  {
    question: "Is placement assistance provided?",
    answer: "Yes, we provide end-to-end placement assistance including resume building, mock interviews, and direct company connects."
  },
  {
    question: "Are internships guaranteed?",
    answer: "We guarantee internship opportunities with our partner companies for all eligible students."
  },
  {
    question: "How do I prepare for placements?",
    answer: "We offer dedicated training, workshops, and mentorship to prepare you for placement drives."
  }
];

// Timeline Section Data
const placementsTimeline = [
  {
    step: "01",
    title: "Profile Building",
    content: "Craft a standout resume and LinkedIn profile with our expert guidance.",
    duration: "1 week",
    icon: FileText
  },
  {
    step: "02",
    title: "Skill Training",
    content: "Participate in technical and soft skills workshops tailored to your career goals.",
    duration: "2-4 weeks",
    icon: CheckCircle
  },
  {
    step: "03",
    title: "Mock Interviews",
    content: "Experience real interview scenarios with industry professionals.",
    duration: "1 week",
    icon: Users
  },
  {
    step: "04",
    title: "Company Connects",
    content: "Engage with recruiters from top companies through placement drives.",
    duration: "Ongoing",
    icon: Building2
  },
  {
    step: "05",
    title: "Offer & Onboarding",
    content: "Receive your offer letter and get support for a smooth onboarding process.",
    duration: "1-2 weeks",
    icon: Trophy
  }
];

// Animated Counter
interface AnimatedCounterProps {
  value: string;
  duration?: number;
}
const AnimatedCounter = ({ value, duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const numericValue = parseInt(value.replace(/[^\d]/g, ''));
    const increment = numericValue / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span>{count}{value.replace(/\d/g, '').replace(/[₹\+]/g, '')}</span>;
};

// Logo Marquee - Same as home page
const LogoMarquee = ({ logos, direction = "left", speed = 25 }: { logos: any[], direction?: "left" | "right", speed?: number }) => {
  return (
    <div className="relative overflow-hidden py-2">
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: `marquee${direction === "left" ? "Left" : "Right"} ${speed}s linear infinite`
        }}
      >
        {Array(8).fill(null).map((_, index) => (
          <div key={index} className="flex gap-4 shrink-0">
            {logos.map((logo, logoIndex) => (
              <div
                key={logoIndex}
                className="flex items-center justify-center h-32 w-60 rounded-lg px-4 py-2 hover:scale-105 hover:-translate-y-1 transition-all duration-200"
              >
                <Image
                  src={logo.url}
                  alt={`${logo.name} logo`}
                  className="h-36 w-auto max-w-64 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<span class="text-xs font-semibold text-white/70">${logo.name}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-4000px); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-4000px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

// Floating Elements
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

// FAQ Component
const PlacementsFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid gap-6">
        {placementsFaqs.map((faq, index) => (
          <motion.div
            key={index}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 rounded-3xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <button
                className="w-full px-8 py-8 text-left text-white transition-colors duration-200 flex justify-between items-center group relative z-10"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-xl group-hover:text-blue-100 transition-colors">{faq.question}</span>
                <motion.div
                  className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 text-xl font-bold group-hover:bg-blue-500/30 transition-all duration-300"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? "auto" : 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8 text-blue-100 leading-relaxed text-lg">
                  {faq.answer}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Timeline Component
const PlacementsTimeline = () => (
  <div className="w-full px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
          <FileText className="w-6 h-6 text-blue-400" />
          <span className="text-lg font-bold text-blue-200">Placement Journey</span>
        </div>
        <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Your Path to Success
        </h2>
        <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">
          A step-by-step process to land your dream job
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {placementsTimeline.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 p-8 rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-blue-500/20 h-96 flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-4 right-6 text-8xl opacity-5 font-black text-white">
                  {item.step}
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-400/30 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                      <IconComponent className="w-8 h-8 text-blue-300" />
                    </div>
                    <div className="bg-blue-400/20 border border-blue-300/30 rounded-full px-4 py-2">
                      <span className="text-sm font-bold text-blue-200">Step {item.step}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-100 transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="text-blue-200 leading-relaxed mb-6 group-hover:text-blue-100 transition-colors duration-500 flex-1">
                      {item.content}
                    </p>
                    <div className="flex items-center text-sm text-blue-300/80 bg-blue-500/10 rounded-full px-4 py-2 border border-blue-400/20">
                      <FileText className="w-4 h-4 mr-2" />
                      Duration: {item.duration}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
);

// Application Form (Placement Assistance)
// Tally Form Component - Same as contact page
const PlacementsForm = () => {
  return (
    <div className="w-full h-[80vh] bg-white shadow-2xl rounded-2xl overflow-hidden">
      <iframe
        src="https://tally.so/embed/mYbXMB?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="PerpeX Business School Placement Application Form"
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default function PlacementsPage() {
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
              <span className="text-lg font-bold text-blue-200">Your Career Starts Here</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black mb-12 leading-none">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">Elite</span>
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">Placements</span>
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 max-w-5xl mx-auto leading-relaxed mb-16 font-light">
              Unlock your potential and land your dream job with our industry-leading placement support.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <div className="group flex items-center gap-4 bg-gradient-to-r from-blue-500/15 to-blue-600/15 backdrop-blur-xl border border-blue-400/25 rounded-3xl px-10 py-5 shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300/40 transition-all duration-500">
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-2xl font-black text-white">97% Placement Rate</span>
              </div>
              <div className="group flex items-center gap-4 bg-gradient-to-r from-blue-600/15 to-blue-700/15 backdrop-blur-xl border border-blue-400/25 rounded-3xl px-10 py-5 shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300/40 transition-all duration-500">
                <Crown className="w-7 h-7 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" />
                <span className="text-2xl font-black text-white">Top Companies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Metrics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <section className="py-24 -mt-16">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Placement Metrics</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Our Achievements</h2>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">Explore our placement statistics and success stories</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div key={metric.label} className="group cursor-pointer">
                  <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 p-8 rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-blue-500/20 h-80 flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-blue-500/15 rounded-xl border border-blue-400/20 group-hover:scale-110 transition-transform duration-500">
                          <IconComponent className="w-8 h-8 text-blue-300" />
                        </div>
                        <div className="bg-blue-400/20 border border-blue-300/30 rounded-full px-3 py-1">
                          <span className="text-xs font-bold text-blue-200">{metric.change}</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-xl font-black text-white mb-4 group-hover:text-blue-100 transition-colors duration-500">{metric.label}</h3>
                        <p className="text-blue-200 leading-relaxed group-hover:text-blue-100 transition-colors duration-500">
                          <AnimatedCounter value={metric.value} /> {metric.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* Companies Section */}
        <section className="py-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
              <Building2 className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Our Recruiters</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Top Hiring Partners</h2>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">Meet the companies that hire our talented graduates</p>
          </div>
          <p className="text-center text-lg text-white/70 font-medium mb-8">
            Our Client Collaboration Network Includes
          </p>
          
          {/* First Marquee */}
          <div 
            className="relative overflow-hidden py-2"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <LogoMarquee logos={logos1} direction="left" speed={25} />
          </div>
          
          {/* Second Marquee */}
          <div 
            className="relative overflow-hidden py-2"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <LogoMarquee logos={logos2} direction="right" speed={27} />
          </div>
        </section>
        {/* Job Roles Section */}
        <section className="py-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
              <Briefcase className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Job Roles</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">In-Demand Careers</h2>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">Explore the top job roles our students secure</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {jobRoles.map((role, index) => (
              <div key={role.title} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 p-8 rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-blue-500/20 h-80 flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-blue-500/15 rounded-xl border border-blue-400/20 group-hover:scale-110 transition-transform duration-500 text-3xl">
                        {role.icon}
                      </div>
                      <div className="bg-blue-400/20 border border-blue-300/30 rounded-full px-3 py-1">
                        <span className="text-xs font-bold text-blue-200">{role.growth}</span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xl font-black text-white mb-4 group-hover:text-blue-100 transition-colors duration-500">{role.title}</h3>
                      <p className="text-blue-200 leading-relaxed group-hover:text-blue-100 transition-colors duration-500">Salary: {role.salary}</p>
                      <p className="text-blue-200 leading-relaxed group-hover:text-blue-100 transition-colors duration-500">Openings: {role.openings}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Timeline Section */}
        <PlacementsTimeline />
        {/* FAQ Section */}
        <section className="py-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
              <MessageCircle className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Common Questions</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Got Questions?</h2>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">Get answers to the most frequently asked questions about our placement process</p>
          </div>
          <PlacementsFaq />
        </section>
        {/* Application Form Section */}
        <section className="py-24">
          <div className="relative bg-gradient-to-br from-blue-500/5 to-blue-800/5 backdrop-blur-xl border border-blue-400/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-blue-500/5 to-blue-700/5"></div>
            <div className="relative z-10 px-10 py-20 md:px-20">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/15 to-blue-600/15 backdrop-blur-xl border border-blue-400/25 rounded-full px-8 py-3 mb-8 shadow-xl">
                  <Zap className="w-6 h-6 text-blue-400" />
                  <span className="text-lg font-bold text-blue-200">Apply for Placement Assistance</span>
                </div>
                <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Get Started</h2>
                <p className="text-2xl text-blue-100 max-w-4xl mx-auto mb-12 font-light">Take the first step towards your dream job with our streamlined placement support application</p>
              </div>
              <PlacementsForm />
            </div>
          </div>
        </section>
      </div>
      {/* Footer CTA */}
      <div className="relative mt-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-800/10 backdrop-blur-xl"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h3 className="text-6xl font-black mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Ready to Get Placed?</h3>
          <p className="text-blue-100 mb-12 text-2xl font-light">Your career journey starts with a single step</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-12 py-5 rounded-full font-bold transition-all duration-500 text-white shadow-2xl hover:shadow-blue-500/25 transform hover:scale-110 flex items-center justify-center gap-3 text-lg">
              Start Application
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            </button>
            <button className="group border-2 border-blue-400/50 hover:border-blue-300 hover:bg-blue-500/10 px-12 py-5 rounded-full font-bold transition-all duration-500 text-white backdrop-blur-sm transform hover:scale-110 flex items-center justify-center gap-3 text-lg">
              <Users className="w-6 h-6" />
              Talk to Counselor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}