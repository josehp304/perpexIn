import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Target, TrendingUp, Users, Award, Briefcase, Play } from "lucide-react";

// Enhanced Mouse Position Hook
interface MousePosition {
  x: number;
  y: number;
}

function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

// Particles Component
interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 35,
  staticity = 50,
  ease = 50,
  size = 1.5,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, [color]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.random() * 1.5 + 1; // Better size range (1-2.5px)
    const alpha = 0.2; // More visible start
    const targetAlpha = parseFloat((Math.random() * 0.4 + 0.3).toFixed(1)); // Better visibility (30-70%)
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 2;
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const rgb = hexToRgb(color);

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`; // Natural opacity
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    circles.current.forEach((circle: Circle, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease;

      drawCircle(circle, true);

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      }
    });
    window.requestAnimationFrame(animate);
  };

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas 
        ref={canvasRef} 
        className="size-full"
        style={{ 
          display: 'block',
          width: '100%', 
          height: '100%',
          minHeight: '100vh'
        }} 
      />
    </div>
  );
};

// Compact Text Flip Component
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["Business Leaders", "Entrepreneurs", "Sales Masters", "Industry Pros"],
  interval = 2500,
  className,
  textClassName,
  animationDuration = 500,
}: ContainerTextFlipProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, animationDuration / 2);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval, animationDuration]);

  return (
    <div className="relative inline-block">
      <span
        className={cn(
          "inline-block text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold transition-all duration-500",
          "bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent",
          "drop-shadow-lg",
          isAnimating ? "opacity-0 transform translate-y-4 scale-95" : "opacity-100 transform translate-y-0 scale-100",
          className,
        )}
        style={{
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 50%",
          animation: "shimmer 3s ease-in-out infinite alternate"
        }}
      >
        {words[currentWordIndex]}
      </span>
      
      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        .floating { animation: float 6s ease-in-out infinite; }
        .pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
      `}</style>
      
      {/* Subtle glow effect */}
      <div
        className="absolute inset-0 blur-xl opacity-20 bg-gradient-to-r from-blue-400 to-white rounded-lg pulse-glow"
      />
    </div>
  );
}

// Enhanced Moving Grid Background with Visible Squared Grids
const MovingGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary large grid - most visible */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          animation: "moveGridLarge 30s linear infinite"
        }}
      />
      
      <style jsx>{`
        @keyframes moveGridLarge {
          0% { background-position: 0% 0%; }
          100% { background-position: 80px 80px; }
        }
      `}</style>
    </div>
  );
};

// Compact Logo Cloud
const logos1 = Array.from({ length: 35 }, (_, i) => ({
  name: `Client Logo ${i + 1}`,
  url: `/l${i + 1}.png`,
}));

const logos2 = Array.from({ length: 34 }, (_, i) => ({
  name: `Client Logo ${i + 36}`,
  url: `/l${i + 36}.png`,
}));

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
                <img
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

import MacbookScrollDemo from "@/data/data";

// Main Hero Component
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Enhanced Creative Moving Grid Background */}
      <MovingGridBackground />

      {/* ENHANCED: More Moving Particles - Increased from 35 to 120 */}
      <Particles
        className="absolute inset-0 z-10 pointer-events-none"
        quantity={120}
        color="#ffffff"
        ease={40}
        size={1.2}
        staticity={60}
        refresh
      />

      {/* Additional layer of smaller particles for more density */}
      <Particles
        className="absolute inset-0 z-10 pointer-events-none"
        quantity={80}
        color="#60a5fa"
        ease={60}
        size={0.8}
        staticity={80}
        refresh
      />

      {/* Blue ambient lighting */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl floating"
        />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300/8 rounded-full blur-3xl"
          style={{ animation: "float 12s ease-in-out infinite reverse" }}
        />
      </div>

      <div className="relative z-20 min-h-screen flex flex-col">
        {/* First Viewport - Hero Content */}
        <div className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-8">
          <div className="max-w-6xl mx-auto text-center space-y-8 flex-grow flex flex-col justify-center">
            
            {/* Enhanced Main Heading - Enlarged */}
            <div className="space-y-8">
              <h1 
                className={`text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight leading-tight transition-all duration-800 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <span className="block pt-12 font-bold">
                  <img 
                    src="/perpex.webp" 
                    alt="PerpeX Logo" 
                    className="mx-auto align-middle inline h-[1.1em] max-h-[1.2em] w-auto object-contain bg-transparent rounded-lg"
                  />
                </span>
                
                <span
                  className={`block text-2xl md:text-4xl lg:text-5xl xl:text-6xl mt-6 font-normal text-white/80 transition-all duration-600 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  Transforming Youth Into
                </span>
                
                <div
                  className={`mt-8 transition-all duration-600 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: "600ms" }}
                >
                  <ContainerTextFlip
                    words={["Business Leaders", "Entrepreneurs", "Sales Experts", "Industry Pros"]}
                    interval={2500}
                    animationDuration={500}
                  />
                </div>
              </h1>
            </div>

            {/* Enhanced Description - Enlarged */}
            <div 
              className={`space-y-4 max-w-4xl mx-auto transition-all duration-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-400 font-medium">
                Bridging youth unemployment with industry-aligned practical training
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl text-white">
                End to End BD Training, Entrepreneurship Readiness, and Guaranteed Results
              </p>
            </div>

            {/* Spacer to push buttons to bottom */}
            <div className="flex-grow"></div>

            {/* Enhanced CTAs - Positioned at bottom of viewport */}
            <div 
              className={`flex flex-row gap-6 justify-center pb-12 transition-all duration-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <button 
                className="group relative px-10 py-4 bg-white text-blue-900 font-semibold text-lg rounded-lg overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl hover:shadow-white/20 active:scale-95 transition-all duration-300"
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ animation: "slideRight 0.6s ease-out" }}
                />
                <span className="relative z-10 flex items-center">
                  Enroll Now
                  <div className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </span>
              </button>

              <button 
                className="px-10 py-4 border border-white/30 text-white text-lg rounded-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/50 hover:scale-105 hover:shadow-lg hover:shadow-white/10 active:scale-95 transition-all duration-300"
              >
                <span className="flex items-center">
                  <Play className="mr-2 w-5 h-5" />
                 Download Brochure
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Second Section - Logo Marquees */}
        <div 
          className={`py-16 space-y-4 transition-all duration-800 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
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
      
      <style jsx>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Hero;