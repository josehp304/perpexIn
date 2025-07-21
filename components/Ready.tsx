"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, Phone, Mail, MapPin, GraduationCap, Star, Users, Award } from "lucide-react";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
// Mock TextMask component since it's not available
const TextMask = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Mock Rounded component
const Rounded = ({ children, className, backgroundColor }: { children: React.ReactNode, className: string, backgroundColor: string }) => (
  <div className={`rounded-full ${className}`} style={{ backgroundColor }}>
    {children}
  </div>
);

export default function Ready() {
  const container = useRef(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  
  // Fixed the phrase array
  const phrase = ["Ready to shape", "your future", "in 2035?", "Your journey starts now!"];
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);

  const contactInfo = [
    { 
      icon: Phone, 
      label: "Call Us", 
      primary: "+91 97451 00036", 
      secondary: "+91 97451 00046",
      href: "tel:+919745100036"
    },
    { 
      icon: Mail, 
      label: "Email Us", 
      primary: "info@perpex.in", 
      secondary: "admissions@perpexbschool.in",
      href: "mailto:info@perpex.in"
    },
    { 
      icon: MapPin, 
      label: "Visit Us", 
      primary: "Al Rahaba Arcade", 
      secondary: "Chalappuram, Calicut",
      href: "https://maps.google.com/?q=Al+Rahaba+Arcade+Chalappuram+Calicut"
    }
  ];

  const stats = [
    { icon: Award, number: "100+", label: "CEOs Approved" },
    { icon: GraduationCap, number: "1,500+", label: "Talents Upskilled" },
    { icon: Star, number: "98%", label: "Success Rate" },
    { icon: Users, number: "150+", label: "Industry Partners" }
  ];

  return (
    <section 
      className="w-full text-white relative min-h-screen bg-gradient-to-br from-slate-900 via-black to-blue-900 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 rounded-t-[30px] mt-[-20px] overflow-hidden"
      ref={container}
    >
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl"></div>
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <motion.div 
        className="w-full h-full flex justify-center items-center flex-col gap-12 sm:gap-16 md:gap-20 relative z-10"
        style={{ scale }}
      >
        {/* Main Heading */}
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-2 text-sm font-medium text-blue-300">
              <GraduationCap className="w-4 h-4" />
              Perpex B School - Excellence in Education
            </span>
          </motion.div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tight mb-6">
            <TextMask>
              <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                {phrase[0]} <br />
                <span className="text-blue-400">{phrase[1]}</span> <br />
                {phrase[2]}
              </span>
            </TextMask>
          </h1>
          
          <TextMask>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              {phrase[3]}
            </p>
          </TextMask>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        

        {/* Primary CTA */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.a
            href="mailto:admissions@perpexbschool.in"
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Apply Now
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.a>
          
          <motion.a
            href="tel:+919745100036"
            className="group text-blue-300 hover:text-white font-medium flex items-center gap-2 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Phone className="w-4 h-4" />
            Call for Consultation
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </section>
  );
}