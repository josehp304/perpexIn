import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const heroImages = [
  "/s3.webp",
  "/s5.webp", 
  "/s7.webp",
  "/s4.webp",
];

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create timeline for hero images animation only
    const tl = gsap.timeline();

    // Set initial state for hero images
    gsap.set(".hero-imgs > div", {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
    });

    // Hero images reveal animation
    tl.to(".hero-imgs > div", {
      clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
      duration: 1.2,
      ease: "power4.inOut",
      stagger: 0.15,
      delay: 0.3
    })
    
    // Scale effect on hero
    .to(".hero", {
      scale: 1.3,
      duration: 3,
      ease: "power3.inOut"
    }, "-=2")
    
    // Hide preloader after animation
    .to(preloaderRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      delay: 1,
      onComplete: () => {
        gsap.set(preloaderRef.current, { display: "none" });
        onComplete();
      }
    });

  }, [onComplete]);

  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background: #04349ce0;
    }

    .hero {
      width: 100vw;
      height: 100vh;
      padding: 3em;
      transform: scale(1);
    }

    .hero-imgs {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 0;
    }

    .hero-imgs > div {
      position: absolute;
      width: 100%;
      height: 100%;
      clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
    }

    .website-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    nav {
      position: fixed;
      top: 0;
      width: 100%;
      display: flex;
      padding: 2em;
    }

    nav > div {
      flex: 1;
      font-family: "Timmons NY", sans-serif;
      font-size: 36px;
      font-weight: lighter;
      color: #ebdc0b;
      text-transform: uppercase;
    }

    .site-info {
      text-align: center;
    }

    .menu {
      text-align: right;
    }

    .header {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    h1 {
      text-transform: uppercase;
      font-family: "PP Neue World", sans-serif;
      font-size: 20vw;
      font-weight: 200;
      color: #ebdc0b;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }

    h1 span {
      position: relative;
      top: 0;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div ref={preloaderRef} style={{ position: "fixed", inset: 0, zIndex: 10000, background: "#04349ce0" }}>
        <section className="hero">
          <div className="hero-imgs">
            {heroImages.map((src, i) => (
              <div key={i}>
                <Image
                  src={src}
                  alt="hero"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={i === 0}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>

          <div className="website-content"></div>
        </section>
      </div>
    </>
  );
};

export default Preloader;