import React from 'react';
import { Fingerprint, Terminal, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-zentry-dark pt-32 pb-20 px-6 overflow-hidden relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[60vw] h-[60vw] bg-zentry-copper/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-24 md:mb-32 text-center md:text-left">
          <p className="text-zentry-copper tracking-[0.3em] text-sm font-semibold mb-4 uppercase">The Architecture of Innovation</p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-8">
            BORN FROM <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zentry-copper to-zentry-slate">
              PURE LOGIC.
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl font-light leading-relaxed">
            Zentry Hub bridges the gap between cutting-edge academic computer science and enterprise-grade business requirements. We don't just write code; we engineer digital ecosystems.
          </p>
        </div>

        {/* The Founder Section - Solo Focus Layout */}
        <div className="mb-32">
          <h2 className="text-sm font-semibold tracking-[0.3em] text-gray-500 mb-12 border-b border-white/10 pb-6 uppercase">
            Leadership & Vision
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Side: The Founder Profile */}
            <div className="lg:col-span-5 group relative max-w-md mx-auto lg:mx-0 w-full">
              <div className="absolute inset-0 bg-gradient-to-b from-zentry-copper/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10"></div>
              <div className="aspect-[4/5] w-full bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden relative flex flex-col justify-end p-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                {/* Abstract graphic representing the architect/founder */}
                <Terminal className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-white/5 group-hover:text-zentry-copper/20 transition-colors duration-700" />
                
                <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-4xl font-bold text-white tracking-tight mb-2">Limalkavinesh</h3>
                  <p className="text-zentry-copper font-mono text-sm tracking-widest uppercase">Director / Founder / CEO</p>
                </div>
              </div>
            </div>

            {/* Right Side: The Founder's Mandate */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">The Architect's Mandate</h3>
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-6">
                Driving the core technical vision of Zentry Hub requires more than just development skills; it requires a fundamental understanding of how data, design, and logic intertwine to solve real-world problems.
              </p>
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                As the sole founder, my objective is to maintain a standard of uncompromising quality. From predictive machine learning algorithms to high-traffic, real-time web applications, every system deployed by Zentry Hub is structured to scale effortlessly and perform flawlessly.
              </p>
              
              <div className="flex gap-4">
                 <span className="px-4 py-2 border border-white/10 rounded-full text-sm text-zentry-copper tracking-wider bg-white/[0.01]">Full-Stack Architecture</span>
                 <span className="px-4 py-2 border border-white/10 rounded-full text-sm text-zentry-copper tracking-wider bg-white/[0.01]">Systems Engineering</span>
              </div>
            </div>

          </div>
        </div>

        {/* Agency Philosophy / Value Props */}
        <div>
          <h2 className="text-sm font-semibold tracking-[0.3em] text-gray-500 mb-12 border-b border-white/10 pb-6 uppercase">
            The Zentry Paradigm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/[0.01] border border-white/5 rounded-xl hover:bg-white/[0.03] transition-colors duration-500">
              <Zap className="w-8 h-8 text-zentry-copper mb-6" />
              <h4 className="text-xl font-medium text-white mb-3">Uncompromising Speed</h4>
              <p className="text-gray-500 font-light text-sm">Engineered for latency-free performance, from real-time multimedia syncing to high-traffic database queries.</p>
            </div>
            <div className="p-8 bg-white/[0.01] border border-white/5 rounded-xl hover:bg-white/[0.03] transition-colors duration-500">
              <Terminal className="w-8 h-8 text-zentry-slate mb-6" />
              <h4 className="text-xl font-medium text-white mb-3">Scalable Foundations</h4>
              <p className="text-gray-500 font-light text-sm">We don't build temporary fixes. Every line of code is structured to grow alongside your enterprise.</p>
            </div>
            <div className="p-8 bg-white/[0.01] border border-white/5 rounded-xl hover:bg-white/[0.03] transition-colors duration-500">
              <Fingerprint className="w-8 h-8 text-zentry-copper mb-6" />
              <h4 className="text-xl font-medium text-white mb-3">Bespoke Precision</h4>
              <p className="text-gray-500 font-light text-sm">Off-the-shelf software is derivative. We manifest unique digital grammar specific to your operational needs.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;