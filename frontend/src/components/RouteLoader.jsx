import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteLoader = () => {
  const { pathname } = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Skip the heavy 3-second boot-up sequence on initial load
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    // Instantly trigger the split-screen mask on route change
    setIsTransitioning(true);

    // 1.2s total duration for a smooth, majestic reveal
    const timer = setTimeout(() => setIsTransitioning(false), 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      
      {/* Top Half-Screen Block */}
      {/* Instantly covers the top 50% of the screen, then slides UP */}
      <div 
        className="absolute top-0 left-0 w-full h-[50vh] bg-zentry-dark border-b border-zentry-copper/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
        style={{ animation: 'splitUp 1s cubic-bezier(0.76, 0, 0.24, 1) 0.2s forwards' }}
      ></div>

      {/* Bottom Half-Screen Block */}
      {/* Instantly covers the bottom 50% of the screen, then slides DOWN */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-zentry-dark border-t border-zentry-copper/20 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
        style={{ animation: 'splitDown 1s cubic-bezier(0.76, 0, 0.24, 1) 0.2s forwards' }}
      ></div>

      {/* Center Copper Laser Seam */}
      {/* Shoots across the exact center dividing line before the split happens */}
      <div 
        className="absolute top-[50%] left-0 w-full h-[2px] bg-zentry-copper -translate-y-1/2 shadow-[0_0_15px_rgba(196,132,70,0.8)] z-10"
        style={{ transformOrigin: 'center', animation: 'laserFlash 1s cubic-bezier(0.76, 0, 0.24, 1) forwards' }}
      ></div>

      {/* The Monogram Core */}
      {/* Sits dead center, fades out exactly as the screen splits open */}
      <div 
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ animation: 'monogramFade 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards' }}
      >
        <span className="text-4xl font-bold tracking-[0.2em] text-white drop-shadow-2xl">
          Z<span className="text-zentry-copper">H</span>
        </span>
      </div>

      {/* Embedded CSS Physics Engine */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes splitUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        @keyframes splitDown {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        @keyframes laserFlash {
          0% { transform: translateY(-50%) scaleX(0); opacity: 0; }
          15% { transform: translateY(-50%) scaleX(1); opacity: 1; }
          30% { transform: translateY(-50%) scaleX(1); opacity: 1; }
          100% { transform: translateY(-50%) scaleX(0); opacity: 0; }
        }
        @keyframes monogramFade {
          0% { opacity: 0; transform: scale(0.9); }
          20% { opacity: 1; transform: scale(1); }
          40% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
      `}} />
    </div>
  );
};

export default RouteLoader;