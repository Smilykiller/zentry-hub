import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Slower timing: Fade out starts at 3.5 seconds, fully removed at 4.2 seconds
    const fadeTimer = setTimeout(() => setIsFading(true), 3500);
    const removeTimer = setTimeout(() => setIsVisible(false), 4200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-zentry-dark flex flex-col items-center justify-center transition-opacity duration-700 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Deep Ambient Background Glow */}
      <div className="absolute w-[60vw] h-[60vw] bg-zentry-copper/10 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>

      {/* Circuit Trace Z Logo */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-12 z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-2xl">
          <defs>
            {/* Zentry Copper / Warm Metallic Gradient */}
            <linearGradient id="warm-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7C898" />
              <stop offset="50%" stopColor="#C48446" />
              <stop offset="100%" stopColor="#8A5A19" />
            </linearGradient>

            {/* Premium Laser Glow Filter */}
            <filter id="laser-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* The Ghost Track (Very faint outline) */}
          <path 
            d="M 15 20 L 85 20 L 15 80 L 85 80" 
            fill="none" 
            stroke="#ffffff" 
            strokeOpacity="0.03" 
            strokeWidth="12" 
            strokeLinecap="square" 
            strokeLinejoin="miter" 
          />

          {/* The Active Laser Trace - SLOWED DOWN to 2.5s */}
          <path 
            d="M 15 20 L 85 20 L 15 80 L 85 80" 
            fill="none" 
            stroke="url(#warm-metallic)" 
            strokeWidth="12" 
            strokeLinecap="square" 
            strokeLinejoin="miter" 
            filter="url(#laser-glow)"
            style={{ 
              strokeDasharray: 250, 
              strokeDashoffset: 250, 
              animation: 'circuitDraw 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards' 
            }} 
          />
        </svg>
      </div>

      {/* Zentry Hub Text & Fluid Progress */}
      <div className="z-10 flex flex-col items-center gap-5 w-64">
        {/* Updated Text and slowed down fade-in */}
        <p className="text-zentry-copper font-mono text-[13px] font-bold tracking-[0.4em] uppercase" style={{ animation: 'fadeInText 1.5s ease-out 1.2s forwards', opacity: 0 }}>
          ZENTRY HUB
        </p>
        
        {/* Slowed down progress bar to match new timing */}
        <div className="w-full h-[1px] bg-white/5 relative overflow-hidden rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-zentry-copper to-white" 
            style={{ width: '100%', transformOrigin: 'left', transform: 'scaleX(0)', animation: 'traceProgress 3s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards' }}
          ></div>
        </div>
      </div>

      {/* Embedded CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes circuitDraw {
          0% { stroke-dashoffset: 250; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes fadeInText {
          0% { opacity: 0; transform: translateY(5px); letter-spacing: 0.2em; }
          100% { opacity: 1; transform: translateY(0); letter-spacing: 0.4em; }
        }
        @keyframes traceProgress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.6); }
          100% { transform: scaleX(1); }
        }
      `}} />
      
    </div>
  );
};

export default Loader;