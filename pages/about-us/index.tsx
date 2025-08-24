"use client";
import Image from "next/image";
import { Star, Instagram, Linkedin, MessageCircle, Target, Zap, Eye, TrendingUp, Briefcase, Users, Award, Sparkles, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useMemo } from "react";

// Move static data outside component to prevent re-creation
const socialLinks = [
  { id: 1, title: "Instagram", href: "https://www.instagram.com/perpexbschool/", icon: <Instagram size={20} /> },
  { id: 2, title: "LinkedIn", href: "https://www.linkedin.com/company/perpex-insights/", icon: <Linkedin size={20} /> },
  { id: 3, title: "WhatsApp", href:"https://wa.me/919745100046", icon: <MessageCircle size={20} /> },
];

const aboutMetrics = [
  { label: "Years of Excellence", value: "15+", icon: Crown, description: "In business education", change: "+2" },
  { label: "Students Placed", value: "2000+", icon: Users, description: "In top companies worldwide", change: "+150" },
  { label: "Placement Rate", value: "97%", icon: Award, description: "With leading companies", change: "+2%" },
  { label: "Corporate Partners", value: "500+", icon: Briefcase, description: "Industry leaders", change: "+25" },
];

const teamMembers = [
  {
    name: "Mohammed Rafi",
    position: " Director - Growth and Sales",
    image: "/team1.webp",
    description: "Rafi drives the strategic vision, growth initiatives, and institutional partnerships at Perpex Insights LLP. With a multi-functional leadership background across startups and corporate ecosystems, he leads business execution, client success, and long-term impact initiatives such as the Greater Malabar Campaign and Perpex B-School.",
    objectPosition: "object-center",
  },
  {
    name: "Shahinsha Thasveer",
    position: "Director - Marketing and Strategy",
    image: "/team2.webp",
    description: "Shahinsha oversees the creative and marketing vertical at Perpex, blending brand strategy with execution excellence. His leadership ensures strong digital presence, campaign performance, and design coherence across all Perpex verticals, including SaleX and Perpex B-School.",
    objectPosition: "object-top",
  },
  {
    name: "Navas Shereef",
    position: "Operations and HR",
    image: "/team3.webp",
    description: "Navas leads sales strategy and execution at Perpex, ensuring aggressive performance targets, sales process optimization, and delivery excellence. He spearheads the SaleX vertical and works closely with client-facing teams to deliver consistent growth outcomes.",
    objectPosition: "object-top",
  },
  {
    name: "Ashif Muhammed",
    position: "Director – Legal & Finance",
    image: "/team4.webp",
    description: "Ashif is in charge of financial planning, budgeting, legal compliance, and regulatory oversight. He ensures robust financial governance across all business units and plays a key role in shaping the financial sustainability of Perpex's operations and expansion initiatives.",
    objectPosition: "object-center",
  },
  {
    name: "Shibil Rehman",
    position: "Strategic Alliances and investment connect",
    image: "/team5.webp",
    description: "Shibil Rehman excels in proliferating alliances and investment networking.",
    objectPosition: "object-center",
  },
];

// Global type declarations (move to a separate .d.ts file in production)
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    Matter: any;
    SplitType: any;
    Lenis: any;
  }
}

// Logo Marquee Component
const LogoMarquee = ({ logos, direction = "left", speed = 25 }: { 
  logos: Array<{name: string; url: string}>, 
  direction?: "left" | "right", 
  speed?: number 
}) => {
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
                key={`${index}-${logoIndex}`}
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
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `<span class="text-xs font-semibold text-white/70">${logo.name}</span>`;
                    }
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

const LogoCloud = () => {
  // Memoize logo arrays to prevent recreation on every render
  const logos1 = useMemo(() => Array.from({ length: 35 }, (_, i) => ({
    name: `Client Logo ${i + 1}`,
    url: `/l${i + 1}.png`,
  })), []);

  const logos2 = useMemo(() => {
    let logoArray = Array.from({ length: 34 }, (_, i) => ({
      name: `Client Logo ${i + 36}`,
      url: `/l${i + 36}.png`,
    }));
    return logoArray.filter(logo => logo.name !== 'Client Logo 49');
  }, []);

  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-2 md:px-4">
        <p className="text-center text-lg text-white/70 font-medium mb-8">
          Our Client Collaboration Network Includes
        </p>
        
        <div 
          className="relative overflow-hidden py-2"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <LogoMarquee logos={logos1} direction="left" speed={25} />
        </div>
        
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

// Simplified components to reduce complexity
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" />
);

const GridPattern = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_60%,transparent_100%)]"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,197,253,0.1)_0%,transparent_50%)]"></div>
  </div>
);

export default function About() {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lenis: any;
    let runner: any;
    let engine: any;
    let tickerCallback: any;
    let isInitialized = false;

    const scripts = [
      'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.17.1/matter.min.js',
      'https://unpkg.com/split-type',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/gsap.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
      'https://unpkg.com/lenis@1.1.20/dist/lenis.min.js'
    ];

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
      });
    };

    Promise.all(scripts.map(loadScript))
      .then(() => {
        setTimeout(() => {
          if (
            typeof window !== 'undefined' &&
            window.gsap &&
            window.ScrollTrigger &&
            window.Matter &&
            window.SplitType &&
            window.Lenis &&
            !isInitialized
          ) {
            isInitialized = true;
            initStoryAnimation();
          }
        }, 500);
      })
      .catch((error) => {
        console.error('Error loading scripts:', error);
      });

    const initStoryAnimation = () => {
      try {
        const { gsap, ScrollTrigger, Matter, SplitType, Lenis } = window;
        
        if (!storyRef.current) return;
        
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
        const words = text.words ? [...text.words] : [];

        if (words.length === 0) return;

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
            word.textContent?.toLowerCase().includes(highlight.toLowerCase())
          )
        );

        let physicsEnabled = false;
        let lastProgress = 0;
        const charBodies: Array<{
          body: any;
          element: HTMLElement;
          initialX: number;
          initialY: number;
        }> = [];

        wordsToHighlight.forEach((word) => {
          if (!word.textContent) return;
          
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
                  if (word.style) word.style.opacity = "0";
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
                        word.textContent?.toLowerCase().includes(hw.toLowerCase())
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

      } catch (error) {
        console.error('Error initializing story animation:', error);
      }
    };

    // Cleanup function
    return () => {
      try {
        if (lenis && typeof lenis.destroy === 'function') {
          lenis.destroy();
        }
        if (runner && window.Matter && typeof window.Matter.Runner?.stop === 'function') {
          window.Matter.Runner.stop(runner);
        }
        if (engine && window.Matter) {
          if (typeof window.Matter.World?.clear === 'function') {
            window.Matter.World.clear(engine.world, false);
          }
          if (typeof window.Matter.Engine?.clear === 'function') {
            window.Matter.Engine.clear(engine);
          }
        }
        if (window.ScrollTrigger && typeof window.ScrollTrigger.getAll === 'function') {
          window.ScrollTrigger.getAll().forEach((t: any) => t.kill && t.kill());
        }
        if (tickerCallback && window.gsap && typeof window.gsap.ticker?.remove === 'function') {
          window.gsap.ticker.remove(tickerCallback);
        }
      } catch (error) {
        console.error('Error during cleanup:', error);
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

      {/* Metrics Section */}
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

      {/* Story Section */}
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

      {/* Rest of the sections remain the same... */}
      {/* Mission & Vision, Team, Brand sections, etc. */}
      
    </div>
  );
}
