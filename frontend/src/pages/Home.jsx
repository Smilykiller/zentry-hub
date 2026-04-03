import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative w-full bg-zentry-dark overflow-hidden flex flex-col">
      
      {/* =========================================
          SECTION 1: HERO (Untouched)
      ========================================= */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 px-6 lg:px-12 z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.02] tracking-tighter pointer-events-none select-none">
          ZH
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col items-start" style={{ animation: 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards', opacity: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-zentry-copper"></div>
              <span className="text-zentry-copper font-mono text-xs tracking-[0.3em] uppercase">Based in India • Global Reach</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zentry-copper to-[#F7C898]">Digital Futures.</span>
            </h1>
            
            <p className="text-gray-400 font-light text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
              We engineer uncompromising software infrastructure. From predictive machine learning models to scalable enterprise web applications, we build systems that define the next generation of tech.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/work" className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-zentry-dark font-medium uppercase tracking-widest text-sm overflow-hidden transition-all duration-500 hover:bg-zentry-copper hover:text-white">
                <span className="relative z-10 flex items-center gap-2">
                  View Portfolio
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </Link>
              <Link to="/contact" className="group inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-medium uppercase tracking-widest text-sm hover:border-zentry-copper hover:text-zentry-copper transition-all duration-300">
                Initiate Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: CAPABILITIES (Untouched)
      ========================================= */}
      <section className="py-24 px-6 lg:px-12 bg-black/40 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Core Capabilities</h2>
              <p className="text-gray-500 font-light max-w-md">Specialized engineering disciplines tailored for high-performance requirements.</p>
            </div>
            <Link to="/services" className="hidden md:inline-flex items-center gap-2 text-sm text-zentry-copper uppercase tracking-widest hover:text-white transition-colors group">
              All Services 
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Full-Stack */}
            <div className="group bg-white/[0.02] border border-white/10 p-8 hover:bg-white/[0.04] hover:border-zentry-copper/50 transition-all duration-500">
              <div className="w-12 h-12 mb-8 text-zentry-copper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Full-Stack Engineering</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">End-to-end web architecture using modern frameworks. We build responsive, accessible, and hyper-fast user interfaces connected to robust backends.</p>
            </div>

            {/* Card 2: Machine Learning */}
            <div className="group bg-white/[0.02] border border-white/10 p-8 hover:bg-white/[0.04] hover:border-zentry-copper/50 transition-all duration-500">
              <div className="w-12 h-12 mb-8 text-zentry-copper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="6.5"/></svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Machine Learning</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">Deploying intelligent systems. From predictive analytics to deep learning models, we integrate AI directly into your production pipelines.</p>
            </div>

            {/* Card 3: Systems Architecture */}
            <div className="group bg-white/[0.02] border border-white/10 p-8 hover:bg-white/[0.04] hover:border-zentry-copper/50 transition-all duration-500">
              <div className="w-12 h-12 mb-8 text-zentry-copper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Systems Architecture</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">Designing the unseen infrastructure. We focus on scalable database design, cloud deployment, and zero-downtime environments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: FEATURED WORK (New)
      ========================================= */}
      <section className="py-32 px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Featured Deployments</h2>
            <p className="text-gray-500 font-light max-w-2xl">A selection of recent engineering feats, demonstrating our capability across deep tech, data architecture, and enterprise web solutions.</p>
          </div>

          <div className="flex flex-col gap-12">
            
            {/* Project 1: Hushpod */}
            <div className="group flex flex-col lg:flex-row items-center border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500">
              <div className="w-full lg:w-1/2 p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="text-zentry-copper font-mono text-xs tracking-widest uppercase mb-4">Audio Engineering</div>
                <h3 className="text-3xl font-bold text-white mb-6">Hushpod</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8">
                  A high-performance synchronized audio player. Engineered a deep tech roadmap to ensure zero-latency playback and flawless audio synchronization across distributed networks.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 border border-white/20 text-xs text-gray-300 font-mono">Python</span>
                  <span className="px-3 py-1 border border-white/20 text-xs text-gray-300 font-mono">WebSockets</span>
                  <span className="px-3 py-1 border border-white/20 text-xs text-gray-300 font-mono">Audio API</span>
                </div>
              </div>
              <div className="w-full lg:w-1/2 min-h-[300px] flex items-center justify-center bg-black/50 overflow-hidden relative">
                {/* Abstract Visual Placeholder */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zentry-copper via-zentry-dark to-zentry-dark group-hover:scale-110 transition-transform duration-1000"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zentry-copper/50 relative z-10"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
              </div>
            </div>

            {/* Project 2: Smart Campus */}
            <div className="group flex flex-col lg:flex-row-reverse items-center border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500">
              <div className="w-full lg:w-1/2 p-10 lg:p-16 border-b lg:border-b-0 lg:border-l border-white/10">
                <div className="text-zentry-copper font-mono text-xs tracking-widest uppercase mb-4">Enterprise Systems</div>
                <h3 className="text-3xl font-bold text-white mb-6">Smart Campus</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8">
                  A comprehensive Attendance & Student Management System. Architected a robust, full-stack environment to handle high-throughput database operations and real-time campus analytics.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 border border-white/20 text-xs text-gray-300 font-mono">Java</span>
                  <span className="px-3 py-1 border border-white/20 text-xs text-gray-300 font-mono">Web Architecture</span>
                  <span className="px-3 py-1 border border-white/20 text-xs text-gray-300 font-mono">SQL</span>
                </div>
              </div>
              <div className="w-full lg:w-1/2 min-h-[300px] flex items-center justify-center bg-black/50 overflow-hidden relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zentry-slate via-zentry-dark to-zentry-dark group-hover:scale-110 transition-transform duration-1000"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zentry-slate/50 relative z-10"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
            </div>

            {/* Project 3: Genome Storage */}
            <div className="group flex flex-col lg:flex-row items-center border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500">
              <div className="w-full lg:w-1/2 p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="text-zentry-copper font-mono text-xs tracking-widest uppercase mb-4">Data Architecture</div>
                <h3 className="text-3xl font-bold text-white mb-6">Genome Storage</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8">
                  Research and algorithmic encoding for DNA Data Storage. Developed methodologies for translating digital binaries into biological sequences for ultra-dense, long-term archival.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 border border-white/20 text-xs text-gray-300 font-mono">Algorithms</span>
                  <span className="px-3 py-1 border border-white/20 text-xs text-gray-300 font-mono">Python</span>
                  <span className="px-3 py-1 border border-white/20 text-xs text-gray-300 font-mono">Bioinformatics</span>
                </div>
              </div>
              <div className="w-full lg:w-1/2 min-h-[300px] flex items-center justify-center bg-black/50 overflow-hidden relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-zentry-dark to-zentry-dark group-hover:scale-110 transition-transform duration-1000"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 relative z-10"><path d="M2 15h10v4a2 2 0 0 0 2 2h6l-2-2 2-2h-6a2 2 0 0 1-2-2v-4h10"/><path d="M2 9h10V5a2 2 0 0 1 2-2h6l-2 2 2 2h-6a2 2 0 0 0-2 2v4h10"/></svg>
              </div>
            </div>

          </div>
          
          <div className="mt-16 text-center">
            <Link to="/work" className="inline-flex items-center gap-2 text-sm font-medium border-b border-zentry-copper pb-1 text-white hover:text-zentry-copper transition-colors duration-300 group">
              Explore All Projects
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: METHODOLOGY (New)
      ========================================= */}
      <section className="py-24 px-6 lg:px-12 bg-black/60 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-zentry-copper font-mono text-xs tracking-widest uppercase">The Playbook</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-4">Engineering Methodology</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
            <div className="relative">
              <div className="text-6xl font-black text-white/5 absolute -top-8 -left-4 pointer-events-none select-none">01</div>
              <h3 className="text-xl font-medium text-white mb-4 relative z-10">Discovery & Architecture</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">We don't rush to code. Every project begins with rigorous systems mapping, stack selection, and scalability planning to prevent technical debt.</p>
            </div>
            
            <div className="relative">
              <div className="text-6xl font-black text-white/5 absolute -top-8 -left-4 pointer-events-none select-none">02</div>
              <h3 className="text-xl font-medium text-white mb-4 relative z-10">Development Sprints</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">Agile, iterative execution. We leverage Computer Science fundamentals alongside modern tooling to write clean, performant, and secure code.</p>
            </div>

            <div className="relative">
              <div className="text-6xl font-black text-white/5 absolute -top-8 -left-4 pointer-events-none select-none">03</div>
              <h3 className="text-xl font-medium text-white mb-4 relative z-10">Deployment & Scale</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">Rigorous QA, automated CI/CD pipelines, and cloud deployment. We ensure your digital infrastructure stays resilient under heavy user loads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5: FINAL CTA (New)
      ========================================= */}
      <section className="py-32 px-6 lg:px-12 relative z-10 bg-zentry-copper/10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8">
            Ready to architect <br className="hidden md:block"/> something profound?
          </h2>
          <p className="text-gray-400 font-light text-lg mb-12">
            Whether you need a complex machine learning integration or a high-performance web application, Zentry Hub is ready to build.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 bg-zentry-copper text-white font-medium uppercase tracking-widest text-sm hover:bg-white hover:text-zentry-dark transition-colors duration-500">
            Start the Conversation
          </Link>
        </div>
      </section>

      {/* Embedded CSS for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default Home;