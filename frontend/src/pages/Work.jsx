import React from 'react';
import { ArrowUpRight, Code2, Lock } from 'lucide-react';

// The updated real-world project data
const projects = [
  {
    id: '01',
    title: 'Hushpod',
    category: 'Multimedia & Real-Time Sync',
    description: 'A synchronized audio playback system engineered for real-time latency management and seamless user streaming experiences.',
    tech: ['Node.js', 'React', 'WebSockets'],
    year: '2026',
    link: 'https://hushpod.onrender.com/',
    isLive: true
  },
  {
    id: '02',
    title: 'Darewheel',
    category: 'Interactive Web Application',
    description: 'A highly engaging, randomized game logic application built with a focus on seamless state management and cross-origin (CORS) security protocols.',
    tech: ['React', 'Game Logic', 'State Management'],
    year: '2026',
    link: 'https://darewheel.onrender.com/',
    isLive: true
  },
  {
    id: '03',
    title: 'Smart Campus Attendance',
    category: 'Institutional Enterprise System',
    description: 'A comprehensive management architecture designed for campus-wide data automation, featuring strict data handling and secure backend logic.',
    tech: ['Java/Python', 'PostgreSQL', 'Secure Backend'],
    year: '2026',
    link: '#',
    isLive: false // Kept offline as a "Proprietary" showcase
  },
  {
    id: '04',
    title: "Naren's Studio",
    category: 'Creative Portfolio Architecture',
    description: 'A visually immersive, high-performance web presence tailored for a professional photography studio, focusing on rapid image rendering and UI/UX flow.',
    tech: ['Frontend Engineering', 'UI/UX', 'Responsive Design'],
    year: '2026',
    link: 'https://narensstudio.netlify.app/',
    isLive: true
  },
  {
    id: '05',
    title: "Kayaz Makeup",
    category: 'Business Storefront & Booking',
    description: 'A sleek, conversion-optimized digital storefront designed for the beauty industry, built to capture client leads and showcase visual portfolios seamlessly.',
    tech: ['Web Architecture', 'Lead Generation', 'UI Deployment'],
    year: '2026',
    link: 'https://kayazmakeup.netlify.app/',
    isLive: true
  }
];

const Work = () => {
  return (
    <div className="min-h-screen bg-zentry-dark pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-24">
          <p className="text-zentry-copper tracking-[0.3em] text-sm font-semibold mb-4 uppercase">Selected Works</p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
            PROVEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-zentry-copper to-zentry-slate">CAPABILITIES.</span>
          </h1>
        </div>

        {/* Project Showcase */}
        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <div key={project.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center group`}>
              
              {/* Abstract Visual Placeholder */}
              <div className="w-full lg:w-1/2 aspect-video bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-zentry-copper/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Code2 className="w-16 h-16 text-white/10 group-hover:text-zentry-copper/40 transition-colors duration-700" />
                <div className="absolute bottom-6 left-6 text-white/20 font-mono text-sm tracking-widest uppercase">
                  System.Render({project.title})
                </div>
              </div>

              {/* Project Details */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-zentry-copper font-mono text-lg">{project.id}</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h2>
                </div>
                
                <h3 className="text-xl text-gray-400 font-light mb-6 uppercase tracking-widest">{project.category}</h3>
                
                <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg font-light">
                  {project.description}
                </p>
                
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-4 py-1.5 border border-white/10 rounded-full text-sm text-gray-400 tracking-wider bg-white/[0.01]">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Conditional Logic for Buttons */}
                {project.isLive ? (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white font-medium hover:text-zentry-copper transition-colors duration-300 w-fit group/btn"
                  >
                    VISIT LIVE DEPLOYMENT 
                    <span className="bg-white/5 p-2 rounded-full group-hover/btn:bg-zentry-copper/20 transition-colors duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 text-gray-500 font-medium w-fit cursor-not-allowed">
                    PROPRIETARY SYSTEM 
                    <span className="bg-white/5 p-2 rounded-full">
                      <Lock className="w-4 h-4 text-gray-500" />
                    </span>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Work;