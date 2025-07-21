import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Building2, TrendingUp, Users, Award, Briefcase, Sparkles, CheckCircle, Trophy, MessageCircle, Zap, Crown, FileText } from "lucide-react";

// Metrics Section Data
const metrics = [
  { label: "Corporate Clients", value: "200+", icon: Building2, description: "Top organizations trained", change: "+15%" },
  { label: "Avg. Feedback Score", value: "4.8/5", icon: Star, description: "Trainer excellence", change: "+0.2" },
  { label: "Workshops Conducted", value: "500+", icon: Award, description: "Sessions delivered", change: "+10%" },
  { label: "Placement Support", value: "98%", icon: TrendingUp, description: "Successful transitions", change: "+3%" },
];

// Job Roles Section Data
const jobRoles = [
  { title: "Corporate Trainer", salary: "₹10-20 LPA", icon: "🎤", growth: "+28%", openings: "1,200" },
  { title: "Learning & Development Manager", salary: "₹12-25 LPA", icon: "📚", growth: "+22%", openings: "850" },
  { title: "HR Business Partner", salary: "₹8-18 LPA", icon: "🤝", growth: "+19%", openings: "1,050" },
  { title: "Organizational Development Consultant", salary: "₹15-30 LPA", icon: "🏢", growth: "+25%", openings: "600" },
];

// Company Logos
const logos1 = [
  { name: "Tata Consultancy Services", url: "https://cdn.brandfetch.io/idw382nG0m/w/398/h/398/theme/dark/icon.png" },
  { name: "Infosys", url: "https://cdn.brandfetch.io/idkGNnB58L/w/280/h/80/theme/dark/logo.png" },
  { name: "Wipro", url: "https://cdn.brandfetch.io/idOeG0NYWQ/w/1448/h/1448/theme/dark/icon.jpeg" },
  { name: "Accenture", url: "https://cdn.brandfetch.io/idSUrLOWbH/w/398/h/398/theme/dark/icon.png" },
  { name: "Capgemini", url: "https://cdn.brandfetch.io/id4J58sqa_/w/512/h/512/theme/dark/icon.png" },
];
const logos2 = [
  { name: "Deloitte", url: "https://cdn.brandfetch.io/idAnDTFapY/w/398/h/398/theme/dark/icon.png" },
  { name: "EY", url: "https://cdn.brandfetch.io/idkmTr6hAO/w/398/h/398/theme/dark/icon.png" },
  { name: "KPMG", url: "https://cdn.brandfetch.io/idGbIiG9e-/w/398/h/398/theme/dark/icon.png" },
  { name: "PwC", url: "https://cdn.brandfetch.io/idw382nG0m/w/398/h/398/theme/dark/icon.png" },
  { name: "IBM", url: "https://cdn.brandfetch.io/id4Ol9YiiE/w/577/h/239/theme/dark/logo.png" },
];

// FAQ Section Data
const trainingFaqs = [
  {
    question: "What types of corporate training do you offer?",
    answer: "We offer customized training in leadership, soft skills, technical upskilling, compliance, and more, tailored to your organization's needs."
  },
  {
    question: "Are the trainers industry certified?",
    answer: "Yes, all our trainers are certified professionals with extensive industry experience."
  },
  {
    question: "Can you deliver training onsite and online?",
    answer: "Absolutely! We provide both onsite and virtual training sessions as per your preference."
  },
  {
    question: "How do you measure training effectiveness?",
    answer: "We use feedback, assessments, and post-training performance metrics to ensure ROI for your organization."
  },
  {
    question: "Is post-training support available?",
    answer: "Yes, we offer post-training support, resources, and follow-up sessions to reinforce learning."
  },
  {
    question: "How do we request a proposal?",
    answer: "Simply fill out the inquiry form below or contact us directly for a tailored proposal."
  }
];

// Timeline Section Data
const trainingTimeline = [
  {
    step: "01",
    title: "Needs Assessment",
    content: "We analyze your organization's goals and skill gaps to design a custom training plan.",
    duration: "2-3 days",
    icon: FileText
  },
  {
    step: "02",
    title: "Program Design",
    content: "Our experts craft a curriculum and select the best trainers for your needs.",
    duration: "1 week",
    icon: CheckCircle
  },
  {
    step: "03",
    title: "Training Delivery",
    content: "Engaging sessions delivered onsite or online, with hands-on activities and real-world scenarios.",
    duration: "1-4 weeks",
    icon: Users
  },
  {
    step: "04",
    title: "Assessment & Feedback",
    content: "We evaluate learning outcomes and gather feedback to ensure objectives are met.",
    duration: "2 days",
    icon: Award
  },
  {
    step: "05",
    title: "Post-Training Support",
    content: "Ongoing resources, Q&A, and follow-up sessions to reinforce learning and drive results.",
    duration: "Ongoing",
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

// Logo Marquee
interface Logo {
  name: string;
  url: string;
}
interface LogoMarqueeProps {
  logos: Logo[];
  direction?: "left" | "right";
  speed?: number;
}
const LogoMarquee = ({ logos, direction = "left", speed = 25 }: LogoMarqueeProps) => (
  <div className="relative overflow-hidden py-2">
    <motion.div
      className="flex gap-8 whitespace-nowrap"
      animate={{ x: direction === "left" ? [0, -1000] : [-1000, 0] }}
      transition={{ x: { repeat: Infinity, repeatType: "loop", duration: speed, ease: "linear" } }}
    >
      {Array(8).fill(null).map((_, index) => (
        <div key={index} className="flex gap-8 shrink-0">
          {logos.map((logo: Logo, logoIndex: number) => (
            <motion.div
              key={logoIndex}
              data-logo={logo.name}
              className="flex items-center justify-center h-12 w-32 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-400/20 shadow-lg"
              whileHover={{ scale: 1.05, y: -3, backgroundColor: "rgba(255,255,255,0.15)", borderColor: "rgba(59,130,246,0.4)" }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={logo.url}
                alt={`${logo.name} logo`}
                width={96}
                height={32}
                className="h-8 w-auto max-w-24 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                onError={() => {
                  // Fallback to text if image fails to load
                  const parent = document.querySelector(`[data-logo="${logo.name}"]`);
                  if (parent) {
                    parent.innerHTML = `<span class='text-xs font-semibold text-white/80'>${logo.name}</span>`;
                  }
                }}
              />
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  </div>
);

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
const TrainingFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid gap-6">
        {trainingFaqs.map((faq, index) => (
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
const TrainingTimeline = () => (
  <div className="w-full px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
          <FileText className="w-6 h-6 text-blue-400" />
          <span className="text-lg font-bold text-blue-200">Training Journey</span>
        </div>
        <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Your Path to Impact
        </h2>
        <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">
          A step-by-step process to empower your workforce
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainingTimeline.map((item, index) => {
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

// Application Form (Corporate Training Inquiry)
const TrainingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };
  return (
    <div className="max-w-5xl mx-auto">
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="block text-blue-100 font-bold text-lg">Full Name *</label>
            <input
              type="text"
              required
              className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-2xl text-white placeholder-blue-300/50 focus:border-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="block text-blue-100 font-bold text-lg">Email Address *</label>
            <input
              type="email"
              required
              className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-2xl text-white placeholder-blue-300/50 focus:border-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg"
              placeholder="Enter your email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="block text-blue-100 font-bold text-lg">Phone Number *</label>
            <input
              type="tel"
              required
              className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-2xl text-white placeholder-blue-300/50 focus:border-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="block text-blue-100 font-bold text-lg">Company Name *</label>
            <input
              type="text"
              required
              className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-2xl text-white placeholder-blue-300/50 focus:border-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg"
              placeholder="Enter your company name"
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-3">
          <label className="block text-blue-100 font-bold text-lg">Area of Interest *</label>
          <input
            type="text"
            required
            className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-2xl text-white placeholder-blue-300/50 focus:border-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg"
            placeholder="e.g. Leadership, Digital Skills, Compliance, etc."
            value={formData.interest}
            onChange={e => setFormData({ ...formData, interest: e.target.value })}
          />
        </div>
        <div className="space-y-3">
          <label className="block text-blue-100 font-bold text-lg">Message</label>
          <textarea
            className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-2xl text-white placeholder-blue-300/50 focus:border-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-32 resize-none transition-all duration-300 text-lg"
            placeholder="Tell us more about your training needs or ask a question"
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-6 pt-8 justify-center">
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-12 py-5 rounded-full font-bold transition-all duration-500 text-white shadow-2xl hover:shadow-blue-500/25 transform hover:scale-110 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Submitting Inquiry...
              </>
            ) : (
              <>
                <Zap className="w-6 h-6" />
                Submit Inquiry
              </>
            )}
          </motion.button>
          <motion.button
            type="button"
            className="group border-2 border-blue-400/50 hover:border-blue-300 hover:bg-blue-500/10 px-12 py-5 rounded-full font-bold transition-all duration-500 text-white backdrop-blur-sm transform hover:scale-110 flex items-center justify-center gap-3 text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-6 h-6" />
            Save as Draft
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default function CorporateTrainingPage() {
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
              <span className="text-lg font-bold text-blue-200">Empower Your Workforce</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black mb-12 leading-none">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">Corporate</span>
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">Training</span>
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 max-w-5xl mx-auto leading-relaxed mb-16 font-light">
              Unlock your team&apos;s potential with world-class training, expert facilitators, and measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <div className="group flex items-center gap-4 bg-gradient-to-r from-blue-500/15 to-blue-600/15 backdrop-blur-xl border border-blue-400/25 rounded-3xl px-10 py-5 shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300/40 transition-all duration-500">
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-2xl font-black text-white">200+ Clients</span>
              </div>
              <div className="group flex items-center gap-4 bg-gradient-to-r from-blue-600/15 to-blue-700/15 backdrop-blur-xl border border-blue-400/25 rounded-3xl px-10 py-5 shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300/40 transition-all duration-500">
                <Crown className="w-7 h-7 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" />
                <span className="text-2xl font-black text-white">Top Industry Trainers</span>
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
              <span className="text-lg font-bold text-blue-200">Training Metrics</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Our Impact</h2>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">See how we transform organizations and careers</p>
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
              <span className="text-lg font-bold text-blue-200">Our Clients</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Trusted by Industry Leaders</h2>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">See some of the organizations we have empowered</p>
          </div>
          <LogoMarquee logos={logos1} direction="left" speed={30} />
          <LogoMarquee logos={logos2} direction="right" speed={35} />
        </section>
        {/* Job Roles Section */}
        <section className="py-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
              <Briefcase className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Career Paths</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Opportunities After Training</h2>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">Explore the top roles our training enables</p>
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
        <TrainingTimeline />
        {/* FAQ Section */}
        <section className="py-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
              <MessageCircle className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Common Questions</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Got Questions?</h2>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">Get answers to the most frequently asked questions about our training programs</p>
          </div>
          <TrainingFaq />
        </section>
        {/* Application Form Section */}
        <section className="py-24">
          <div className="relative bg-gradient-to-br from-blue-500/5 to-blue-800/5 backdrop-blur-xl border border-blue-400/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-blue-500/5 to-blue-700/5"></div>
            <div className="relative z-10 px-10 py-20 md:px-20">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/15 to-blue-600/15 backdrop-blur-xl border border-blue-400/25 rounded-full px-8 py-3 mb-8 shadow-xl">
                  <Zap className="w-6 h-6 text-blue-400" />
                  <span className="text-lg font-bold text-blue-200">Request Training Proposal</span>
                </div>
                <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Get in Touch</h2>
                <p className="text-2xl text-blue-100 max-w-4xl mx-auto mb-12 font-light">Let us know your needs and we&apos;ll craft a custom training solution for you</p>
              </div>
              <TrainingForm />
            </div>
          </div>
        </section>
      </div>
      {/* Footer CTA */}
      <div className="relative mt-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-800/10 backdrop-blur-xl"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h3 className="text-6xl font-black mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Ready to Upskill?</h3>
          <p className="text-blue-100 mb-12 text-2xl font-light">Empower your team with the best in corporate learning</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-12 py-5 rounded-full font-bold transition-all duration-500 text-white shadow-2xl hover:shadow-blue-500/25 transform hover:scale-110 flex items-center justify-center gap-3 text-lg">
              Request Proposal
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            </button>
            <button className="group border-2 border-blue-400/50 hover:border-blue-300 hover:bg-blue-500/10 px-12 py-5 rounded-full font-bold transition-all duration-500 text-white backdrop-blur-sm transform hover:scale-110 flex items-center justify-center gap-3 text-lg">
              <Users className="w-6 h-6" />
              Talk to Consultant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}