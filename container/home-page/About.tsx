import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Instagram, Linkedin, MessageCircle, Award, Users, BookOpen, TrendingUp, CheckCircle, Star, Briefcase, Target, GraduationCap, Rocket, Clock } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import AdmissionsPage from '@/components/ui/timeline';
import { getCourses, Course } from "../../lib/getCourses";

// Add type definitions for GSAP and ScrollTrigger
declare global {
  interface Window {
    gsap: {
      ticker: {
        add: (callback: (time: number) => void) => void;
        lagSmoothing: (value: number) => void;
      };
      utils: {
        interpolate: (start: number, end: number, progress: number) => number;
      };
      set: (target: Element, vars: any) => void;
      registerPlugin: (plugin: any) => void;
    };
    ScrollTrigger: {
      update: () => void;
      create: (config: any) => {
        progress: number;
      };
      getAll: () => Array<{ kill: () => void }>;
    };
    Lenis: new () => {
      on: (event: string, callback: () => void) => void;
      raf: (time: number) => void;
    };
  }
}

const socialLinks = [
  { id: 1, title: "Instagram", href: "#", icon: <Instagram size={20} /> },
  { id: 2, title: "LinkedIn", href: "#", icon: <Linkedin size={20} /> },
  { id: 3, title: "WhatsApp", href: "#", icon: <MessageCircle size={20} /> },
];

const stats = [
  { number: "100+", label: "CEOs Approved", target: 100, suffix: "+" },
  { number: "1500+", label: "Talents Upskilled", target: 1500, suffix: "+" },
  { number: "98%", label: "Success Rate", target: 98, suffix: "%" },
  { number: "150+", label: "Industry Partners", target: 150, suffix: "+" }
];

const whyChooseUs = [
  { icon: <Users className="w-6 h-6" />, title: "Hands-on Training", description: "Learn by doing with real-world projects", example: "E.g., Pitch to real clients during the program.", tip: "Pro tip: Practice makes perfect!" },
  { icon: <Rocket className="w-6 h-6" />, title: "BYOB - Build Your Own Business", description: "Create your startup during the program", example: "E.g., Launch your MVP before graduation.", tip: "Did you know? 70% of our students launch a project." },
  { icon: <Award className="w-6 h-6" />, title: "100+ CEOs Approved", description: "Curriculum endorsed by industry leaders", example: "E.g., Guest lectures from top CEOs.", tip: "Network with the best!" },
  { icon: <Star className="w-6 h-6" />, title: "Mentorship from CXOs", description: "Direct guidance from C-level executives", example: "E.g., 1:1 mentorship sessions.", tip: "Ask your mentor about their biggest career lesson." },
  { icon: <CheckCircle className="w-6 h-6" />, title: "100% Placement Guarantee*", description: "Assured career placement support", example: "E.g., Mock interviews and resume workshops.", tip: "Stay proactive with your placement coach." }
];

const journeySteps = [
  {
    step: "1",
    name: "Enroll",
    description: "Join our comprehensive business development program and start your transformation journey",
    icon: <BookOpen className="w-6 h-6" />
  },
  {
    step: "2", 
    name: "Get Trained",
    description: "Learn from industry experts through hands-on training and real-world case studies",
    icon: <Users className="w-6 h-6" />
  },
  {
    step: "3",
    name: "Build Projects",
    description: "Apply your knowledge by working on live projects and building your portfolio",
    icon: <Target className="w-6 h-6" />
  },
  {
    step: "4",
    name: "Get Certified",
    description: "Earn industry-recognized certification that validates your expertise",
    icon: <Award className="w-6 h-6" />
  },
  {
    step: "5",
    name: "Launch Yourself",
    description: "Launch the 'UPDATED' Version of yourself, ready to disrupt the market",
    icon: <Briefcase className="w-6 h-6" />
  }
];

const timelineData = [
  {
    week: "Phase 1",
    title: "Inception",
    icon: <GraduationCap className="w-6 h-6 text-blue-400" />,
    content: (
      <div className="space-y-4">
        <div className="bg-blue-900 p-4 rounded-lg">
          <p className="font-semibold text-blue-300 mb-2">Objective</p>
          <p className="text-white">Build foundational awareness and mindset needed for entrepreneurship or consultancy.</p>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-blue-900">Key Focus Areas</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Clarifying your personal vision and long-term "why"</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Understanding fundamental business concepts: value creation, customer needs, and problem-solving</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Learning core business terminology and frameworks</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Developing a basic understanding of sales psychology and human motivation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Gaining awareness of what it takes to become an entrepreneur or consultant — mindset, risks, and opportunities</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    week: "Phase 2",
    title: "Revelation",
    icon: <BookOpen className="w-6 h-6 text-blue-400" />,
    content: (
      <div className="space-y-4">
        <div className="bg-blue-900 p-4 rounded-lg">
          <p className="font-semibold text-blue-300 mb-2">Objective</p>
          <p className="text-white">Gain clarity in business dynamics, sharpen communication, and understand marketing and sales mechanics.</p>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-blue-900">Key Focus Areas</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Building confident, strategic communication for business settings</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Understanding how to position ideas, services, or products in the market</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Learning modern marketing strategies: content, performance, brand building</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Getting hands-on with marketing tools like CRMs, automation platforms, and analytics</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Studying real business scenarios through case studies</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Deep diving into sales strategies: discovery, handling objections, pitching, and negotiation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Strengthening financial literacy: cash flow, pricing, budgeting</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Exploring how to assess and manage risks in business environments</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    week: "Phase 3",
    title: "Transition",
    icon: <Target className="w-6 h-6 text-blue-400" />,
    content: (
      <div className="space-y-4">
        <div className="bg-blue-900 p-4 rounded-lg">
          <p className="font-semibold text-blue-300 mb-2">Objective</p>
          <p className="text-white">Bridge theory and practice; start forming real-world structures and taking ownership.</p>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-blue-900">Key Focus Areas</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Moving from idea to action: building a service or business framework</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Developing entrepreneurial habits and decision-making processes</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Constructing a minimal viable offer or prototype and testing in the real world</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Understanding data-driven approaches to strategy and business growth</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Beginning to operate in a semi-professional capacity (freelance, consulting, side project)</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    week: "Phase 4",
    title: "Implementation",
    icon: <Rocket className="w-6 h-6 text-blue-400" />,
    content: (
      <div className="space-y-4">
        <div className="bg-blue-900 p-4 rounded-lg">
          <p className="font-semibold text-blue-300 mb-2">Objective</p>
          <p className="text-white">Apply everything learned in real scenarios; refine tools and prepare for professional performance.</p>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-blue-900">Key Focus Areas</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Reviewing and applying all tools, models, and strategies in practical settings</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Participating in simulations, roleplays, or client-like interactions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Gaining structured feedback and refining your pitch or value offer</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Enhancing your professional toolkit (templates, proposals, decks, SOPs)</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    week: "Phase 5",
    title: "Revolution",
    icon: <Star className="w-6 h-6 text-blue-400" />,
    content: (
      <div className="space-y-4">
        <div className="bg-blue-900 p-4 rounded-lg">
          <p className="font-semibold text-blue-300 mb-2">Objective</p>
          <p className="text-white">Become client-ready or job-ready; confidently operate as a professional consultant, entrepreneur, or team leader.</p>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-blue-900">Key Focus Areas</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Finalizing your personal brand and positioning</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Preparing for client acquisition or job interviews</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Building and showcasing a project portfolio or case-based pitch</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Understanding how to sustain and scale either a consulting career or business venture</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Mapping out next steps: business launch, freelancing career, or high-performance corporate role</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
];

const ScrollAnimationSection = () => {
  // Define the 5-phase curriculum data
  const whyChooseUs = [
    { 
      icon: "🎯", 
      title: "Phase 1: Inception"
    },
    { 
      icon: "📚", 
      title: "Phase 2: Revelation"
    },
    { 
      icon: "🚀", 
      title: "Phase 3: Transition"
    },
    { 
      icon: "⚡", 
      title: "Phase 4: Implementation"
    },
    { 
      icon: "⭐", 
      title: "Phase 5: Revolution"
    }
  ];

  useEffect(() => {
    // Load GSAP and ScrollTrigger dynamically
    const loadGSAP = async () => {
      // Create script elements
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';

      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';

      const lenisScript = document.createElement('script');
      lenisScript.src = 'https://unpkg.com/lenis@1.1.14/dist/lenis.min.js';

      // Add scripts to head
      document.head.appendChild(gsapScript);
      document.head.appendChild(scrollTriggerScript);
      document.head.appendChild(lenisScript);

      // Wait for scripts to load
      await new Promise<void>((resolve) => {
        let scriptsLoaded = 0;
        const onLoad = () => {
          scriptsLoaded++;
          if (scriptsLoaded === 3) resolve();
        };
        gsapScript.onload = onLoad;
        scrollTriggerScript.onload = onLoad;
        lenisScript.onload = onLoad;
      });

      // Initialize animation after scripts load
      initializeAnimation();
    };

    const initializeAnimation = () => {
      if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger && window.Lenis) {
        const lenis = new window.Lenis();
        lenis.on('scroll', window.ScrollTrigger.update);
        window.gsap.ticker.add((time: number) => {
          lenis.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);

        window.gsap.registerPlugin(window.ScrollTrigger);

        const stickySection = document.querySelector('.scroll-sticky');
        const stickyHeader = document.querySelector('.scroll-sticky-header') as HTMLElement;
        const cards = document.querySelectorAll('.scroll-card');
        const stickyHeight = window.innerHeight * 5;

        const transforms = [
          [
            [5, 8, 0, 1],
            [2, 0, -3, 1],
          ],
          [
            [0, 6, 0, 2],
            [-3, 1, -4, 2],
          ],
          [
            [0, 7, 0, 0],
            [1, -0, -3, 4],
          ],
          [
            [0, 8, 3, -4],
            [2, 0, 4, 0],
          ],
          [
            [0, 9, -1, 3],
            [3, -1, 4, 6],
          ],
          [
            [1, 5, -2, 3],
            [1, -2, -4, 3],
          ],
        ];

        window.ScrollTrigger.create({
          trigger: stickySection,
          start: 'top top',
          end: `+=${stickyHeight}px`,
          pin: true,
          pinSpacing: true,
          onUpdate: (self: { progress: number }) => {
            const progress = self.progress;

            if (stickyHeader) {
              const maxTranslate = stickyHeader.offsetWidth - window.innerWidth;
              const translateX = -progress * maxTranslate;
              window.gsap.set(stickyHeader, { x: translateX });
            }

            cards.forEach((card, index) => {
              const delay = index * 0.1125;
              const cardProgress = Math.max(0, Math.min((progress - delay) * 2, 1));

              if (cardProgress > 0) {
                const cardStartX = 25;
                const cardEndX = -650;
                const yPos = transforms[index][0];
                const rotations = transforms[index][1];

                const cardX = window.gsap.utils.interpolate(
                  cardStartX,
                  cardEndX,
                  cardProgress
                );

                const yProgress = cardProgress * 3;
                const yIndex = Math.min(Math.floor(yProgress), yPos.length - 2);
                const yInterpolation = yProgress - yIndex;
                const cardY = window.gsap.utils.interpolate(
                  yPos[yIndex],
                  yPos[yIndex + 1],
                  yInterpolation
                );

                const cardRotation = window.gsap.utils.interpolate(
                  rotations[yIndex],
                  rotations[yIndex + 1],
                  yInterpolation
                );

                window.gsap.set(card, {
                  xPercent: cardX,
                  yPercent: cardY,
                  rotation: cardRotation,
                  opacity: 1,
                });
              } else {
                window.gsap.set(card, { opacity: 0 });
              }
            });
          },
        });
      }
    };

    loadGSAP();

    return () => {
      // Cleanup
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .scroll-section {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        .scroll-sticky {
          position: relative;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        }

        .scroll-sticky-header {
          position: absolute;
          top: 0;
          left: 0;
          width: 250vw;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          will-change: transform;
        }

        .scroll-sticky-header h1 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(24vw, 30vw, 40vw);
          font-weight: 100;
          letter-spacing: -0.05em;
          line-height: 100%;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .scroll-card {
          position: absolute;
          top: 10%;
          left: 100%;
          width: min(420px, 90vw);
          height: min(620px, 85vh);
          background-color: #ffffff;
          border-radius: 1.5em;
          padding: 0;
          will-change: transform;
          z-index: 2;
          border: 1px solid #e5e7eb;
          box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.12);
          overflow: hidden;
        }

        .card-header {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          padding: 1.5em;
          text-align: center;
          position: relative;
        }

        .card-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          opacity: 0.3;
        }

        .card-icon-wrapper {
          position: relative;
          z-index: 1;
          margin-bottom: 1.25em;
        }

        .card-title {
          position: relative;
          z-index: 1;
          color: white;
          font-size: 1.5em;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .card-content {
          padding: 1.5em 2em 1.5em;
          height: calc(100% - 160px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .content-section {
          margin-bottom: 1.25em;
        }

        .section-title {
          font-size: 0.8em;
          font-weight: 600;
          color: #3b82f6;
          margin-bottom: 0.5em;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .section-list {
          font-size: 0.85em;
          color: #374151;
          line-height: 1.5;
        }

        .section-list li {
          margin-bottom: 0.25em;
          padding-left: 0.5em;
        }

        .card-activity {
          background: #f8fafc;
          padding: 1em;
          border-radius: 0.75em;
          margin-bottom: 1.5em;
          border: 1px solid #e2e8f0;
        }

        .activity-label {
          font-size: 0.8em;
          font-weight: 600;
          color: #3b82f6;
          margin-bottom: 0.75em;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .activity-text {
          font-size: 0.95em;
          color: #374151;
          font-weight: 500;
          line-height: 1.5;
        }

        .card-cta {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          padding: 1em 2em;
          border-radius: 0.75em;
          font-weight: 500;
          font-size: 0.95em;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          border: 2px solid transparent;
        }

        .card-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }

        .card-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }

        @media (max-width: 768px) {
          .scroll-card {
            width: 360px;
            height: 580px;
          }
          
          .card-header {
            padding: 1.5em 1.5em 1.25em;
          }
          
          .card-content {
            padding: 1.25em 1.5em 1.25em;
            height: calc(100% - 140px);
          }
          
          .content-section {
            margin-bottom: 1em;
          }
          
          .section-list {
            font-size: 0.8em;
          }
          
          .card-activity {
            padding: 0.85em;
            margin-bottom: 1.25em;
          }
        }
      `}</style>

      <section className="scroll-section scroll-sticky">
        <div className="scroll-sticky-header">
          <h1>Perpetual Excellence</h1>
        </div>

        {whyChooseUs.map((item, index) => (
          <div key={index} className="scroll-card">
            {/* Card Header with Icon and Title */}
            <div className="card-header">
              <div className="card-icon-wrapper">
                <span className="text-white text-4xl">{item.icon}</span>
              </div>
              <h2 className="card-title">{item.title}</h2>
            </div>

            {/* Card Content */}
            <div className="card-content">
              <div>
                {/* What You Learn */}
                <div className="content-section">
                  <div className="section-title">What You Learn</div>
                  <ul className="section-list">
                    {index === 0 && (
                      <>
                        <li>• Find your purpose and business basics</li>
                        <li>• Spot market needs and customer problems</li>
                        <li>• Understand fundamental business concepts</li>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <li>• How to register and legally set up your business</li>
                        <li>• Complete business registration process</li>
                        <li>• Legal documentation and compliance requirements</li>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <li>• Manage money, budgeting, and risks</li>
                        <li>• Learn marketing and sales basics</li>
                        <li>• Improve negotiation and leadership skills</li>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <li>• Prepare and deliver strong investor pitches</li>
                        <li>• Develop sales skills and close deals</li>
                        <li>• Improve based on feedback</li>
                      </>
                    )}
                    {index === 4 && (
                      <>
                        <li>• Launch and grow your business</li>
                        <li>• Understand key job roles and career options</li>
                        <li>• Learn about seed funding and growth</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* What You Do */}
                <div className="content-section">
                  <div className="section-title">What You Do</div>
                  <ul className="section-list">
                    {index === 0 && (
                      <>
                        <li>• Map your vision and explore market gaps</li>
                        <li>• Study examples of successful startups</li>
                        <li>• Create detailed customer personas</li>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <li>• Complete business registration process</li>
                        <li>• Set up legal documentation</li>
                        <li>• Understand compliance requirements</li>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <li>• Create your business plan and marketing approach</li>
                        <li>• Work on budgeting and risk plans</li>
                        <li>• Practice negotiation exercises</li>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <li>• Build and present your pitch</li>
                        <li>• Practice sales techniques</li>
                        <li>• Get feedback and improve</li>
                      </>
                    )}
                    {index === 4 && (
                      <>
                        <li>• Practice running your business</li>
                        <li>• Prepare your career and network</li>
                        <li>• Work towards getting seed funding</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* BYOB Activities */}
                <div className="card-activity">
                  <div className="activity-label">BYOB Activities</div>
                  <div className="activity-text">
                    {index === 0 && "Vision Mapping Workshop • Customer Persona Development"}
                    {index === 1 && "Business Registration Process • Legal Documentation Setup"}
                    {index === 2 && "Marketing Strategy Blueprint • Financial Planning Workshop"}
                    {index === 3 && "Pitch Practice & Investor Simulation • Digital Marketing Campaigns"}
                    {index === 4 && "Job Role & Leadership Simulation • Business Scaling Strategy"}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button className="card-cta">
                Start Phase {index + 1}
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

const CountingNumber = ({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return (
    <div ref={ref} className="relative">
      <span className="inline-block">
        {count.toLocaleString()}
        <span className="text-blue-300">{suffix}</span>
      </span>
    </div>
  );
};

const AnimatedStats = () => {
  return (
    <div className="relative py-20 px-8 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="relative pt-0 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-7xl md:text-7xl pt-0 font-light text-white mb-4 tracking-wide">
            Proven Results
          </h2>
         
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 group-hover:border-blue-400/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/20"></div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              {/* Content */}
              <div className="relative p-8 text-center transform group-hover:scale-105 transition-transform duration-300">
                {/* Number */}
                <div className="mb-4">
                  <div className="text-5xl md:text-6xl font-light text-white mb-2 tracking-tight leading-none">
                    <CountingNumber 
                      target={stat.target} 
                      suffix={stat.suffix}
                      duration={2000 + index * 200}
                    />
                  </div>
                  {/* Animated underline */}
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
                
                {/* Label */}
                <div className="text-blue-200 text-sm md:text-base font-medium tracking-wide leading-relaxed group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
                
                {/* Floating particles effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Accent */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-blue-200/60 text-sm">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-400"></div>
            <span>Real Impact, Real Numbers</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-purple-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated Programs Components
const ProgramCard = ({ data }: { data: any }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-white/20 flex items-center justify-center w-full mx-auto p-6 relative h-[28rem] rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-white/40 bg-white/10 shadow-lg hover:shadow-xl"
    >
      <Icon className="absolute h-8 w-8 -top-3 -left-3 text-white/20" />
      <Icon className="absolute h-8 w-8 -bottom-3 -left-3 text-white/20" />
      <Icon className="absolute h-8 w-8 -top-3 -right-3 text-white/20" />
      <Icon className="absolute h-8 w-8 -bottom-3 -right-3 text-white/20" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full absolute inset-0"
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName={`${data.containerColor} rounded-3xl overflow-hidden`}
              colors={data.colors}
              dotSize={2}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 text-center w-full">
        {/* Default State - Icon + Title Button */}
        <div 
          className={`text-center transition-all duration-300 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-40 mx-auto flex flex-col items-center justify-center ${
            hovered ? '-translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <div className={`text-7xl mb-6 transition-transform duration-300 ${hovered ? 'scale-110' : 'scale-100'}`}>
            {data.icon}
          </div>
          <ProgramButton title={data.title} duration={data.duration} />
        </div>

        {/* Revealed State - Full Details */}
        <div 
          className={`transition-all duration-300 px-6 ${
            hovered ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-0'
          }`}
        >
          <h2 className="text-white text-2xl font-bold mb-4">{data.title}</h2>
          
          {/* Duration */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center text-blue-200">
              <Clock className="w-4 h-4 mr-2" />
              <span className="font-medium">{data.duration}</span>
            </div>
          </div>

          {/* Key Outcomes */}
          <div className="space-y-2 mb-6">
            <h4 className="text-blue-200 font-semibold text-sm mb-3">Key Outcomes:</h4>
            {Array.isArray(data.keyOutcomes) && data.keyOutcomes.length > 0 ? (
              data.keyOutcomes.slice(0, 3).map((outcome: string, idx: number) => (
                <div key={idx} className="flex items-start text-left">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200 text-sm">{outcome}</span>
                </div>
              ))
            ) : Array.isArray(data.outcomes) && data.outcomes.length > 0 ? (
              data.outcomes.slice(0, 3).map((outcome: string, idx: number) => (
                <div key={idx} className="flex items-start text-left">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200 text-sm">{outcome}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm italic">No outcomes listed.</div>
            )}
          </div>

          {/* Learn More Button */}
          <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 border border-white/30">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

const ProgramButton = ({ title, duration }: { title: string; duration: string }) => {
  return (
    <button className="relative inline-flex overflow-hidden rounded-full p-[1px] transition-all duration-300 hover:scale-105">
      <span
        className="absolute inset-[-1000%] animate-spin"
        style={{
          background: 'conic-gradient(from 90deg at 50% 50%, #3B82F6 0%, #1D4ED8 50%, #3B82F6 100%)',
          animation: 'spin 2s linear infinite'
        }}
      />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-6 py-3 text-blue-600 backdrop-blur-3xl font-bold text-center transition-colors duration-300 hover:text-blue-800">
        <div>
          <div className="text-base font-bold">{title}</div>
          <div className="text-sm opacity-80">{duration}</div>
        </div>
      </span>
    </button>
  );
};

const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  containerClassName,
  colors = [[255, 255, 255]],
  dotSize = 3
}: {
  animationSpeed?: number;
  containerClassName?: string;
  colors?: number[][];
  dotSize?: number;
}) => {
  return (
    <div className={`h-full relative bg-black ${containerClassName}`}>
      <div className="h-full w-full">
        {colors.map((color, index) => (
          <div
            key={index}
            className="absolute inset-0 opacity-50"
            style={{
              background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.8) 0%, transparent 50%)`,
              animation: `pulse ${animationSpeed}s ease-in-out infinite alternate`,
              animationDelay: `${index * 0.5}s`
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/40" />
      </div>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default function BusinessDevelopmentSite() {
  const [programsData, setProgramsData] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const courses = await getCourses();
        setProgramsData(courses);
      } catch (err) {
        setError("Failed to load courses from Sanity.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="bg-white pb-0 text-gray-900">
      {/* Hero Section */}
     

      {/* Animated Stats Section */}
      <AnimatedStats />

      {/* Scroll Animation Section */}
      <ScrollAnimationSection />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Your Success
              <br />
              <span className="font-normal text-blue-600">Is Our Priority</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive business development and entrepreneurship training with real-world applications guaranteeing career enhancement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journeySteps.map((step, index) => (
              <div key={index} className="bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group">
                {/* Subtle background accent */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-100 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300 z-0" />
                {/* Icon and Title */}
                <div className="relative z-10 flex flex-col items-start mb-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-3 shadow-md">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">{step.name}</h3>
                </div>
                {/* Description and Outcomes */}
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                  <p className="text-gray-700 leading-relaxed mb-4 font-medium">{step.description}</p>
                  <ul className="text-blue-700 text-sm space-y-1 mb-4 pl-4 list-disc">
                    <li>Key Outcome 1 for {step.name}</li>
                    <li>Key Outcome 2 for {step.name}</li>
                    <li>Key Outcome 3 for {step.name}</li>
                  </ul>
                </div>
                {/* Divider and Quote */}
                <div className="relative z-10 mt-2 pt-2 border-t border-blue-100 w-full">
                  <div className="text-xs text-blue-500 italic mt-2">"Every journey begins with a single step."</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Programs Offered Section - REPLACED */}
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-emerald-500/10 rounded-full blur-2xl animate-float"></div>
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        ></div>

        <div className="relative z-10 py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6 border border-white/30">
              <Star className="w-4 h-4 mr-2" />
              Our Programs
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
              Transform Your Career
              <br />
              <span className="font-normal text-blue-200">With Our Programs</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Choose from our comprehensive range of business development programs designed to accelerate your career growth
            </p>
          </motion.div>

          {isLoading ? (
            <div className="text-center text-white">
              <div className="inline-block w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              <p className="mt-4">Loading programs...</p>
            </div>
          ) : error ? (
            <div className="text-center text-white bg-red-500/20 p-4 rounded-lg max-w-md mx-auto">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {programsData.map((program) => (
                <motion.div
                  key={program._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <ProgramCard data={program} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
          }
          
          @keyframes pulse-slower {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.08); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
          .animate-pulse-slower { animation: pulse-slower 6s ease-in-out infinite; }
          .animate-float { animation: float 8s ease-in-out infinite; }
        `}</style>
      </div>

      <AdmissionsPage />

     
    </div>
  );
}