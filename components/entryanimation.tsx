import React, { useEffect, useRef } from 'react';

interface EntryAnimationProps {
  onComplete: () => void;
}

const EntryAnimation: React.FC<EntryAnimationProps> = ({ onComplete }) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const loadGSAP = async () => {
      // Load GSAP from CDN
      if (!window.gsap) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
        script.onload = () => initializeAnimation();
        document.head.appendChild(script);
      } else {
        initializeAnimation();
      }
    };

    const initializeAnimation = () => {
      const { gsap } = window;

      // Set initial state for reveal elements
      gsap.set(".revealer svg", { scale: 0 });

      // Reveal animation with shorter delays
      const delays = [0.5, 1, 1.5];
      document.querySelectorAll(".revealer svg").forEach((el, i) => {
        gsap.to(el, {
          scale: 45,
          duration: 1.5,
          ease: "power4.inOut",
          delay: delays[i],
          onComplete: () => {
            if (i === delays.length - 1) {
              // Remove loader and call completion callback
              if (loaderRef.current) {
                (loaderRef.current as HTMLElement).style.display = 'none';
              }
              if (onComplete) {
                onComplete();
              }
            }
          },
        });
      });
    };

    loadGSAP();
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef}
      className="fixed top-0 left-0 w-full h-full bg-black text-white flex items-center justify-center overflow-hidden z-50"
    >
      {/* Reveal Stars */}
      <div className="revealer revealer-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg width="151" height="148" viewBox="0 0 151 148" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="revealer revealer-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg width="151" height="148" viewBox="0 0 151 148" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
            fill="#CDFD50"
          />
        </svg>
      </div>

      <div className="revealer revealer-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg width="151" height="148" viewBox="0 0 151 148" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
};

export default EntryAnimation;