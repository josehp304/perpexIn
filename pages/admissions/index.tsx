import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Sparkles, GraduationCap, Users, Trophy, Target, CheckCircle, Clock, FileText, MessageCircle, Award, Zap, Crown, TrendingUp, Star } from "lucide-react";

// Enhanced FAQ Component
const AdmissionsFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are the admission requirements?",
      answer: "Candidates must have completed higher secondary education (12th grade) with proficiency in English. Additional program-specific requirements may apply."
    },
    {
      question: "How long is the program duration?",
      answer: "Our programs range from 3 months to 1 year depending on the specialization and level of study. Each program is designed for optimal career outcomes."
    },
    {
      question: "Is placement assistance provided?",
      answer: "Yes, we provide placement assistance with our industry partners and maintain a 97% placement rate with leading companies."
    },
   
    {
      question: "What is the application deadline?",
      answer: "Applications are accepted year-round with multiple intake periods. Early applications receive priority consideration for scholarships."
    },
    {
      question: "Can I apply for multiple programs?",
      answer: "Yes, you can apply for multiple programs but each requires a separate application. Our counselors can help you choose the best fit."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid gap-6">
        {faqs.map((faq, index) => (
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

// Admissions Timeline Component - Full Screen
const AdmissionsTimeline = () => {
  const timelineData = [
    {
      step: "01",
      title: "Application Submission",
      content: "Submit your comprehensive application with academic transcripts, personal statement, and supporting documents through our streamlined digital platform.",
      duration: "1 day",
      icon: FileText
    },
    {
      step: "02", 
      title: "Document Verification",
      content: "Our dedicated admissions committee conducts thorough verification of all submitted documents to ensure authenticity and completeness.",
      duration: "1-2 day(s)",
      icon: CheckCircle
    },
    {
      step: "03",
      title: "Aptitude Assessment", 
      content: "Participate in our comprehensive evaluation designed to assess your analytical thinking, problem-solving capabilities, and domain knowledge.",
      duration: "1 day",
      icon: Target
    },
    {
      step: "04",
      title: "Personal Interview",
      content: "Engage in an in-depth conversation with our distinguished faculty members to discuss your aspirations, goals, and program alignment.",
      duration: "30-45 mins",
      icon: MessageCircle
    },
    {
      step: "05",
      title: "Final Selection",
      content: "Receive your comprehensive admission decision along with detailed program information, scholarship details, and enrollment guidelines.",
      duration: "3-5 days",
      icon: Award
    },
    {
      step: "06",
      title: "Enrollment Confirmation",
      content: "Complete your enrollment journey by confirming your seat, selecting courses, and joining our distinguished community of future leaders.",
      duration: "2-3 days",
      icon: GraduationCap
    }
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
            <Clock className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold text-blue-200">Admission Journey</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Your Path to Excellence
          </h2>
          <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">
            A carefully crafted process designed to identify and nurture exceptional talent
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {timelineData.map((item, index) => {
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
                  
                  {/* Step Number Background */}
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
                        <Clock className="w-4 h-4 mr-2" />
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
};


// Tally Form Component - Same as contact page
const AdmissionsForm = () => {
  return (
    <div className="w-full h-[80vh] bg-white shadow-2xl rounded-2xl overflow-hidden">
      <iframe
        src="https://tally.so/embed/mYbXMB?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="PerpeX Business School Admission Application Form"
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

// Background Components
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

export default function AdmissionsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const eligibilityRequirements = [
    { 
      icon: GraduationCap, 
      title: "Academic Foundation", 
      desc: "Graduation or equivalent from recognized board preffered.",
      percentage: "Miniumum 12th "
    },
    { 
      icon: TrendingUp, 
      title: "Competitive Readiness", 
      desc: "Ready to face entrepreneurial challenges",
      percentage: "PRO Mentality"
    },
    { 
      icon: Users, 
      title: "Language Skills", 
      desc: "Proficiency in English (written and spoken)",
      percentage: "Required"
    },
    { 
      icon: Target, 
      title: "Program Specific", 
      desc: "Additional requirements may apply based on specialization",
      percentage: "Varies"
    }
  ];

  
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
              <span className="text-lg font-bold text-blue-200">Your Journey Starts Here</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black mb-12 leading-none">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                Elite
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                Admissions
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-blue-100 max-w-5xl mx-auto leading-relaxed mb-16 font-light">
              Transform your potential into excellence. Join a community of innovators, dreamers, and achievers who shape the future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <div className="group flex items-center gap-4 bg-gradient-to-r from-blue-500/15 to-blue-600/15 backdrop-blur-xl border border-blue-400/25 rounded-3xl px-10 py-5 shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300/40 transition-all duration-500">
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-2xl font-black text-white">97% Success Rate</span>
              </div>
              <div className="group flex items-center gap-4 bg-gradient-to-r from-blue-600/15 to-blue-700/15 backdrop-blur-xl border border-blue-400/25 rounded-3xl px-10 py-5 shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300/40 transition-all duration-500">
                <Crown className="w-7 h-7 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" />
                <span className="text-2xl font-black text-white">Elite Institution</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eligibility Section */}
        <section className="py-24 -mt-16">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
              <CheckCircle className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Eligibility Criteria</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Ready to Excel?
            </h2>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">
              Ensure you meet our admission criteria for a smooth application process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eligibilityRequirements.map((requirement, index) => {
              const IconComponent = requirement.icon;
              return (
                <div 
                  key={requirement.title} 
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredCard(`eligibility-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 p-8 rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-blue-500/20 h-80 flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-blue-500/15 rounded-xl border border-blue-400/20 group-hover:scale-110 transition-transform duration-500">
                          <IconComponent className="w-8 h-8 text-blue-300" />
                        </div>
                        <div className="bg-blue-400/20 border border-blue-300/30 rounded-full px-3 py-1">
                          <span className="text-xs font-bold text-blue-200">{requirement.percentage}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-xl font-black text-white mb-4 group-hover:text-blue-100 transition-colors duration-500">
                          {requirement.title}
                        </h3>
                        <p className="text-blue-200 leading-relaxed group-hover:text-blue-100 transition-colors duration-500">
                          {requirement.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timeline Section */}
        <AdmissionsTimeline />

        {/* Scholarships Section
        <section className="py-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
              <Trophy className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Financial Support</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Scholarship Excellence
            </h2>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">
              Supporting exceptional students with comprehensive financial assistance programs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {scholarshipData.map((scholarship, index) => {
              const IconComponent = scholarship.icon;
              return (
                <div 
                  key={scholarship.title} 
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredCard(`scholarship-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 p-8 rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-blue-500/20 h-80 flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-blue-500/15 rounded-xl border border-blue-400/20 group-hover:scale-110 transition-transform duration-500">
                          <IconComponent className="w-8 h-8 text-blue-300" />
                        </div>
                        <div className="bg-blue-400/20 border border-blue-300/30 rounded-full px-3 py-1">
                          <span className="text-xs font-bold text-blue-200">{scholarship.percentage}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-xl font-black text-white mb-4 group-hover:text-blue-100 transition-colors duration-500">
                          {scholarship.title}
                        </h3>
                        <p className="text-blue-200 leading-relaxed group-hover:text-blue-100 transition-colors duration-500">
                          {scholarship.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section> */}

        {/* FAQ Section */}
        <section className="py-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
              <MessageCircle className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Common Questions</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Got Questions?
            </h2>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">
              Get answers to the most frequently asked questions about our admission process
            </p>
          </div>
          
          <AdmissionsFaq />
        </section>

        {/* Application Form Section */}
        <section className="py-24">
          <div className="relative bg-gradient-to-br from-blue-500/5 to-blue-800/5 backdrop-blur-xl border border-blue-400/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-blue-500/5 to-blue-700/5"></div>
            
            <div className="relative z-10 px-10 py-20 md:px-20">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/15 to-blue-600/15 backdrop-blur-xl border border-blue-400/25 rounded-full px-8 py-3 mb-8 shadow-xl">
                  <Zap className="w-6 h-6 text-blue-400" />
                  <span className="text-lg font-bold text-blue-200">Apply Now</span>
                </div>
                <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Begin Your Journey
                </h2>
                <p className="text-2xl text-blue-100 max-w-4xl mx-auto mb-12 font-light">
                  Take the first step towards your future with our streamlined application process
                </p>
              </div>
              
              <AdmissionsForm />
            </div>
          </div>
        </section>
      </div>

      {/* Footer CTA */}
      <div className="relative mt-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-800/10 backdrop-blur-xl"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h3 className="text-6xl font-black mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Ready to Excel?</h3>
          <p className="text-blue-100 mb-12 text-2xl font-light">Your journey to excellence starts with a single step</p>
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