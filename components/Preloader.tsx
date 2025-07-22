import React from "react";
import { TextHoverEffect } from "./ui/text-hover-effect";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let start = Date.now();
    let raf: number;
    const duration = 5000; // 5 seconds
    function animate() {
      const elapsed = Date.now() - start;
      const percent = Math.min(elapsed / duration, 1);
      setProgress(percent);
      if (percent < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '80px'
        }}
      >
        {/* Logo/Text Section */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center',
            width: '100%',
            padding: '0 40px'
          }}
        >
          <div style={{ width: '100%', overflow: 'visible'}}>
            <TextHoverEffect text="Perpex" />
          </div>
        </div>
        
        {/* Progress Section */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '24px'
          }}
        >
          {/* Progress Bar Container */}
          <div 
            style={{ 
              width: '200px', 
              maxWidth: '60vw', 
              height: '2px', 
              background: 'rgba(0, 0, 0, 0.08)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Progress Fill */}
            <div 
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%', 
                width: `${progress * 100}%`, 
                background: '#111',
                transition: 'width 0.1s ease-out'
              }} 
            />
          </div>
          
          {/* Progress Text */}
          <div
            style={{
              color: 'rgba(0, 0, 0, 0.4)',
              fontSize: '11px',
              fontWeight: '400',
              letterSpacing: '1px',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              textTransform: 'uppercase'
            }}
          >
            Loading {Math.round(progress * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;