"use client";
import Image from "next/image";
import { Star, Instagram, Linkedin, MessageCircle, Target, Zap, Eye, TrendingUp, Briefcase, Users, Award, Sparkles, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

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
      getAll: () => {
        kill: () => void;
      }[];
    };
    Matter: {
      Engine: any;
      Runner: any;
      World: any;
      Bodies: any;
      Body: any;
      Events: any;
    };
    SplitType: any;
    Lenis: new () => { on: (event: string, callback: () => void) => void; raf: (time: number) => void; }
  }
}

const socialLinks = [
  { id: 1, title: "Instagram", href: "https://instagram.com", icon: <Instagram size={20} /> },
  { id: 2, title: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin size={20} /> },
  { id: 3, title: "WhatsApp", href: "https://wa.me/yourphonenumber", icon: <MessageCircle size={20} /> },
];

// Logo data for marquee - Same as home page
const logos1 = Array.from({ length: 35 }, (_, i) => ({
  name: `Client Logo ${i + 1}`,
  url: `/l${i + 1}.png`,
}));

let logos2 = Array.from({ length: 34 }, (_, i) => ({
  name: `Client Logo ${i + 36}`,
  url: `/l${i + 36}.png`,
}));
// Remove Client Logo 49
logos2 = logos2.filter(logo => logo.name !== 'Client Logo 49');

// Logo Marquee Component - Same as home page
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
                  width={240}
                  height={128}
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

// Metrics/Highlights Section Data
const aboutMetrics = [
  { label: "Years of Excellence", value: "15+", icon: Crown, description: "In business education", change: "+2" },
  { label: "Students Placed", value: "2000+", icon: Users, description: "In top companies worldwide", change: "+150" },
  { label: "Placement Rate", value: "97%", icon: Award, description: "With leading companies", change: "+2%" },
  { label: "Corporate Partners", value: "500+", icon: Briefcase, description: "Industry leaders", change: "+25" },
];

// Team Data
const teamMembers = [
  {
    name: "Rafi Mohammed",
    position: "Director & Head of Strategy",
    image: "/team1.webp",
    description: "Driving vision, growth, and strategic partnerships at PerpeX.",
    objectPosition: "object-center",
  },
  {
    name: "Shahinsha Thasveer",
    position: "Head of Corporate Relations",
    image: "/team2.webp",
    description: "Building and nurturing industry connections for student success.",
    objectPosition: "object-top",
  },
  {
    name: "Navas Shereef",
    position: "Lead Trainer & Program Designer",
    image: "/team3.webp",
    description: "Crafting practical, industry-aligned training for future leaders.",
    objectPosition: "object-top",
  },
  {
    name: "Mohammed Ashif",
    position: "Placement & Student Success Manager",
    image: "/team4.webp",
    description: "Ensuring every student achieves their career goals with PerpeX.",
    objectPosition: "object-center",
  },
  {
    name: "Shibili Rehman",
    position: "Entrepreneurship & Innovation Coach",
    image: "/team5.webp",
    description: "Empowering students to become entrepreneurs and innovators.",
    objectPosition: "object-center",
  },
];

// Floating Elements - Simplified
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Removed large floating elements that were causing empty space */}
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

const LogoCloud = () => {
  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-2 md:px-4">
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
      </div>
    </div>
  );
};

export default function About() {
  const storyRef = useRef(null);

  useEffect(() => {
    let lenis: any;
    let runner: any;
    let engine: any;
    let tickerCallback: any;

    const scripts = [
      'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.17.1/matter.min.js',
      'https://unpkg.com/split-type',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/gsap.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
      'https://unpkg.com/lenis@1.1.20/dist/lenis.min.js'
    ];

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => resolve();
        document.head.appendChild(script);
      });
    };

    Promise.all(scripts.map(loadScript)).then(() => {
      setTimeout(() => {
        if (
          typeof window !== 'undefined' &&
          window.gsap &&
          (window as any).ScrollTrigger &&
          (window as any).Matter &&
          (window as any).SplitType &&
          (window as any).Lenis
        ) {
          initStoryAnimation();
        }
      }, 500);
    });

    const initStoryAnimation = () => {
      const { gsap, ScrollTrigger, Matter, SplitType, Lenis } = window as any;
      
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      tickerCallback = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      const highlightWords = [
        "Nuke", "corporate", "startup", "creative", "freelancing",
        "explodes", "wildfire", "recognition", "standards", "quality", "story"
      ];

      const text = new SplitType(storyRef.current, { types: "words" });
      const words = [...text.words];

      const { Engine, Runner, World, Bodies, Body, Events } = Matter;
      engine = Engine.create({ gravity: { x: 0, y: 0 } });
      runner = Runner.create();
      Runner.run(runner, engine);

      const floor = Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + 5,
        window.innerWidth,
        20,
        { isStatic: true }
      );
      World.add(engine.world, floor);

      const shuffledWords = [...words];
      for (let i = shuffledWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
      }

      const wordsToHighlight = words.filter((word) =>
        highlightWords.some((highlight) => 
          word.textContent.toLowerCase().includes(highlight.toLowerCase())
        )
      );

      let physicsEnabled = false;
      let lastProgress = 0;
      interface CharBody {
        body: any;
        element: HTMLElement;
        initialX: number;
        initialY: number;
      }
      const charBodies: CharBody[] = [];

      wordsToHighlight.forEach((word) => {
        const chars = word.textContent.split("");
        const wordRect = word.getBoundingClientRect();
        const stickyElement = document.querySelector(".sticky");
        if (!stickyElement) return;
        const stickyRect = stickyElement.getBoundingClientRect();

        chars.forEach((char: string, charIndex: number) => {
          const charSpan = document.createElement("span");
          charSpan.className = "char";
          charSpan.textContent = char;
          charSpan.style.cssText = `
            display: inline-block;
            position: absolute;
            pointer-events: none;
            opacity: 0;
            color: #3B82F6;
            font-size: inherit;
            font-weight: inherit;
          `;
          stickyElement.appendChild(charSpan);

          const charWidth = word.offsetWidth / chars.length;
          const x = wordRect.left - stickyRect.left + charIndex * charWidth;
          const y = wordRect.top - stickyRect.top;

          charSpan.style.left = `${x}px`;
          charSpan.style.top = `${y}px`;

          const body = Bodies.rectangle(
            x + charWidth / 2,
            y + charSpan.offsetHeight / 2,
            charWidth,
            charSpan.offsetHeight,
            {
              restitution: 0.75,
              friction: 0.5,
              frictionAir: 0.0175,
              isStatic: true,
            }
          );

          World.add(engine.world, body);
          charBodies.push({
            body,
            element: charSpan,
            initialX: x,
            initialY: y,
          });
        });
      });

      function resetAnimation() {
        engine.world.gravity.y = 0;

        charBodies.forEach(({ body, element, initialX, initialY }) => {
          Body.setStatic(body, true);
          Body.setPosition(body, {
            x: initialX + element.offsetWidth / 2,
            y: initialY + element.offsetHeight / 2,
          });
          Body.setAngle(body, 0);
          Body.setVelocity(body, { x: 0, y: 0 });
          Body.setAngularVelocity(body, 0);

          element.style.transform = "none";
          element.style.opacity = "0";
        });

        words.forEach((word) => {
          gsap.to(word, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.in",
          });
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky",
          start: "top top",
          end: `+=${window.innerHeight * 4}px`,
          pin: true,
          scrub: true,
          onUpdate: (self: { progress: number }) => {
            const isScrollingDown = self.progress > lastProgress;
            lastProgress = self.progress;

            if (self.progress >= 0.6 && !physicsEnabled && isScrollingDown) {
              physicsEnabled = true;
              engine.world.gravity.y = 1;

              wordsToHighlight.forEach((word) => {
                word.style.opacity = "0";
              });

              charBodies.forEach(({ body, element }) => {
                element.style.opacity = "1";
                Body.setStatic(body, false);
                Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);
                Body.setVelocity(body, {
                  x: (Math.random() - 0.5) * 5,
                  y: -Math.random() * 5,
                });
              });

              gsap.to(
                words.filter(
                  (word) =>
                    !highlightWords.some((hw) => 
                      word.textContent.toLowerCase().includes(hw.toLowerCase())
                    )
                ),
                {
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.out",
                }
              );
            } else if (self.progress < 0.6 && physicsEnabled && !isScrollingDown) {
              physicsEnabled = false;
              resetAnimation();
            }
          },
        },
      });

      // Phase 1: Random words turn blue
      const phase1 = gsap.timeline();
      shuffledWords.forEach((word) => {
        phase1.to(word, {
          color: "#3B82F6",
          duration: 0.1,
          ease: "power2.inOut",
        }, Math.random() * 0.9);
      });

      // Phase 2: Highlight words turn cyan
      const phase2 = gsap.timeline();
      const shuffledHighlights = [...wordsToHighlight];
      for (let i = shuffledHighlights.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledHighlights[i], shuffledHighlights[j]] = [shuffledHighlights[j], shuffledHighlights[i]];
      }

      shuffledHighlights.forEach((word) => {
        phase2.to(word, {
          color: "#06B6D4",
          duration: 0.1,
          ease: "power2.inOut",
        }, Math.random() * 0.9);
      });

      tl.add(phase1, 0).add(phase2, 1).to({}, { duration: 2 });

      Events.on(engine, "afterUpdate", () => {
        charBodies.forEach(({ body, element, initialX, initialY }) => {
          if (physicsEnabled) {
            const deltaX = body.position.x - (initialX + element.offsetWidth / 2);
            const deltaY = body.position.y - (initialY + element.offsetHeight / 2);
            element.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${body.angle}rad)`;
          }
        });
      });
    };

    return () => {
      if (lenis) {
        lenis.destroy();
      }
      if (runner && window.Matter) {
        window.Matter.Runner.stop(runner);
      }
      if (engine && window.Matter) {
        window.Matter.World.clear(engine.world, false);
        window.Matter.Engine.clear(engine);
      }
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((t: any) => t.kill());
      }
      if (tickerCallback && window.gsap) {
        window.gsap.ticker.remove(tickerCallback);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      <FloatingElements />
      <GridPattern />
      
      {/* Hero/Intro Section */}
      <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:120px_120px]" />
        <div className="text-center max-w-4xl mx-auto relative z-10 px-6">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-12 shadow-xl">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold text-blue-200">About PerpeX Business School</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-black leading-tight tracking-tight mb-8 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Shaping Future Business Leaders
          </h1>
          <p className="text-blue-100 text-xl font-light leading-relaxed max-w-2xl mx-auto">
            We are not just another business school. We are your launchpad to success, bridging youth unemployment with industry-aligned practical training. End to End BD Training, Entrepreneurship Readiness, and Guaranteed Results.
          </p>
        </div>
      </section>

      {/* Metrics/Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold text-blue-200">Our Impact</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">By the Numbers</h2>
          <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">A snapshot of our journey and achievements</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutMetrics.map((metric, index) => {
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
                        {metric.value} {metric.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Story - Sticky */}
      <section className="sticky relative w-full h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:120px_120px]" />
        
        <div className="relative z-10 p-8 flex flex-col justify-center h-full">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-12 shadow-xl mx-auto">
              <Eye className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Our Journey</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black font-NeueMontreal mb-12 text-center bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Our Story
            </h2>
            <div 
              ref={storyRef}
              className="text-white text-lg leading-relaxed"
              style={{ 
                fontSize: '18px',
                lineHeight: '1.8',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              PerpeX Business School was founded by industry leaders who recognized the critical need to bridge youth unemployment with practical, industry-aligned training. Our journey began in the corporate world, where we realized that true career success requires more than just academic knowledge—it demands practical BD skills, entrepreneurship readiness, and guaranteed placement support. From our first batch of students, we set out to transform youth into Business Leaders, Entrepreneurs, Sales Experts, and Industry Professionals. Today, PerpeX stands for practical excellence, industry-relevant education, and a commitment to making a real difference in our students&apos; careers with our 97% placement rate and partnerships with 500+ leading companies. Let&apos;s create your success story together.
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="w-full py-32 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative">
        <FloatingElements />
        <GridPattern />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-12 shadow-xl">
            <Target className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold text-blue-200">Our Purpose</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black mb-10 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Mission & Vision</h2>
          <div className="flex flex-col md:flex-row gap-12 justify-center items-start">
            <div className="flex-1 bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 p-8 rounded-3xl shadow-2xl">
              <h3 className="text-3xl font-bold mb-4 text-blue-300">Our Mission</h3>
              <p className="text-2xl leading-relaxed text-blue-100 mb-8">
                To bridge youth unemployment with industry-aligned practical training, empowering students through BD training, entrepreneurship readiness, and guaranteed placement support.
              </p>
            </div>
            <div className="flex-1 bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 p-8 rounded-3xl shadow-2xl">
              <h3 className="text-3xl font-bold mb-4 text-blue-300">Our Vision</h3>
              <p className="text-2xl leading-relaxed text-blue-100 mb-8">
                To be the most trusted partner for transforming youth into Business Leaders, Entrepreneurs, Sales Experts, and Industry Professionals with guaranteed results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Now Uniform with Rest of Design */}
      <section className="w-full bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-32 px-6 relative">
        <FloatingElements />
        <GridPattern />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
              <Users className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Meet Our Team</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Leadership Excellence</h2>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto font-light">Industry experts and visionaries committed to your success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 p-6 rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-blue-500/20 h-full flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Profile Image */}
                  <div className="relative z-10 flex flex-col items-center mb-6">
                    <div className="relative w-48 h-48 mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={256}
                        height={256}
                        className={`w-full h-full object-cover ${member.objectPosition} rounded-2xl border-2 border-blue-400/30 group-hover:border-blue-400/50 transition-all duration-500`}
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-2xl"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col text-center">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors duration-500">
                      {member.name}
                    </h3>
                    <p className="text-blue-300 font-semibold mb-4 text-sm group-hover:text-blue-200 transition-colors duration-500">
                      {member.position}
                    </p>
                    <p className="text-blue-200 text-sm leading-relaxed flex-1 group-hover:text-blue-100 transition-colors duration-500">
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Brand Section */}
      <section className="w-full bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-32 px-6 sm:px-4 rounded-t-[40px] z-20 relative rounded-xl overflow-hidden">
        <FloatingElements />
        <GridPattern />

        {/* Blue Pulse Effect */}
        <motion.div
          className="absolute inset-0 bg-blue-500/5 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto relative z-10 mb-32">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-12 shadow-xl">
            <Zap className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold text-blue-200">Digital Excellence</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[5rem] font-black leading-tight tracking-tight mb-12"
          >
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent inline-block"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 0px rgba(59, 130, 246, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              PerpeX
            </motion.span> —
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent inline-block"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 0px rgba(6, 182, 212, 0)",
                  "0 0 20px rgba(6, 182, 212, 0.5)",
                  "0 0 0px rgba(6, 182, 212, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              Business Excellence
            </motion.span>
            <br />
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Shaping Future Leaders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-blue-100 text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            We are PerpeX Business School—your partners in transforming youth into Business Leaders, Entrepreneurs, Sales Experts, and Industry Professionals. We combine practical BD training, entrepreneurship readiness, and guaranteed placement support to help you achieve lasting success in a competitive business world.
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-6xl mx-auto relative z-10 mb-32">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
            {/* Left Section - Enhanced Video */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full h-96 rounded-3xl overflow-hidden border border-blue-400/20 shadow-2xl">
                <video
                  src="/perpex.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
                
                {/* Blue Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-blue-500/10 rounded-3xl"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Removed floating particles to eliminate empty space */}
              </div>
            </motion.div>

            {/* Right Section - Strategy Points */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Strategy Point 1 */}
                <motion.div
                  className="group flex items-start gap-6 p-8 rounded-3xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-400/20 backdrop-blur-sm hover:from-blue-500/15 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="flex-shrink-0 p-4 rounded-full bg-blue-500/20 border border-blue-400/30"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Star className="text-blue-300" size={36} strokeWidth={2.5} />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-4 text-blue-300 group-hover:text-blue-200 transition-colors">
                      End-to-End BD Training
                    </h4>
                    <p className="text-blue-100 text-lg leading-relaxed group-hover:text-white transition-colors">
                      From business development fundamentals to advanced sales strategies, we deliver practical training that drives measurable career results. Our curriculum blends theory, practical skills, and industry insight to help you stand out and succeed.
                    </p>
                  </div>
                </motion.div>

                {/* Strategy Point 2 */}
                <motion.div
                  className="group flex items-start gap-6 p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-400/20 backdrop-blur-sm hover:from-cyan-500/15 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="flex-shrink-0 p-4 rounded-full bg-cyan-500/20 border border-cyan-400/30"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0.5
                    }}
                  >
                    <Star className="text-cyan-300" size={36} strokeWidth={2.5} />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-4 text-cyan-300 group-hover:text-cyan-200 transition-colors">
                      Entrepreneurship Readiness
                    </h4>
                    <p className="text-blue-100 text-lg leading-relaxed group-hover:text-white transition-colors">
                      We&apos;re more than an educational institution—we&apos;re your partner in career success. We work closely with industry leaders to understand market needs, co-create opportunities, and deliver lasting value for your professional growth with guaranteed placement support.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Enhanced Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-8 pb-6 border-t border-blue-400/20"
              >
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  Ready to Transform Your Career?
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🚀
                  </motion.span>
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((item) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-6 py-3 text-lg text-blue-200 hover:text-white bg-blue-500/10 hover:bg-cyan-500/20 border border-blue-400/20 hover:border-cyan-400/50 rounded-full transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="font-medium">{item.title}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Enhanced Logo Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-blue-200 mb-4">Trusted by Industry Leaders</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>
          <LogoCloud />
        </motion.div>
      </section>
      
      <section className="w-full bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-32 px-6 relative">
        <FloatingElements />
        <GridPattern />

        {/* Why PerpeX Section */}
        <div className="w-full max-w-6xl mx-auto relative z-10 mb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-full px-8 py-3 mb-8 shadow-xl">
              <Target className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">Why Choose Us</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Why PerpeX?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl p-8 border border-blue-400/20 backdrop-blur-sm hover:from-blue-500/15 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
                  <Zap className="text-blue-300" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-blue-300">BD Training & Assessment</h4>
              </div>
              <p className="text-blue-100 leading-relaxed">
                We start with a <strong className="text-white">comprehensive assessment</strong> to understand your background, your goals, and your unique aspirations. Our BD training plan is always tailored to you.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl p-8 border border-cyan-400/20 backdrop-blur-sm hover:from-cyan-500/15 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-400/30">
                  <Target className="text-cyan-300" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-cyan-300">Guaranteed Placement Support</h4>
              </div>
              <p className="text-blue-100 leading-relaxed">
                We work side-by-side with you, learning, practicing, and preparing for career opportunities that deliver real results with our 97% placement rate.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20">
            <div className="text-center space-y-6">
              <p className="text-xl text-blue-100">
                At PerpeX Business School, we don&apos;t do <em className="text-blue-200">ordinary</em>. <span className="text-cyan-300 font-semibold">We make you exceptional.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add a bottom CTA section */}
      <section className="relative mt-24">
        <FloatingElements />
        <GridPattern />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-800/10 backdrop-blur-xl"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h3 className="text-6xl font-black mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Ready to Transform Your Future?</h3>
          <p className="text-blue-100 mb-12 text-2xl font-light">Partner with PerpeX Business School for BD training, entrepreneurship readiness, and guaranteed results</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a 
              href="/contact"
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-12 py-5 rounded-full font-bold transition-all duration-500 text-white shadow-2xl hover:shadow-blue-500/25 transform hover:scale-110 flex items-center justify-center gap-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Enroll Now
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            </motion.a>
            <motion.a 
              href="/contact"
              className="group border-2 border-blue-400/50 hover:border-blue-300 hover:bg-blue-500/10 px-12 py-5 rounded-full font-bold transition-all duration-500 text-white backdrop-blur-sm transform hover:scale-110 flex items-center justify-center gap-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Users className="w-6 h-6" />
              Download Brochure
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}