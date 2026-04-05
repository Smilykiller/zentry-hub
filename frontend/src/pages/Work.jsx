import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Code2, Lock, Terminal } from 'lucide-react';

const Work = () => {
  // 1. State for our Database Data
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Replace with your actual Vercel URL
  const API_URL = "https://your-vercel-url.vercel.app/api";

  // 2. Fetch live data on page load
  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Database sync failed:", err);
        setIsLoading(false);
      });
  }, []);

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

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 border border-white/5 rounded-2xl bg-white/[0.01]">
            <Terminal className="w-10 h-10 text-zentry-copper animate-pulse mb-4" />
            <p className="text-gray-500 font-mono tracking-widest text-sm uppercase">Syncing Database...</p>
          </div>
        )}

        {/* Empty State (If DB is connected but has no projects yet) */}
        {!isLoading && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
            <p className="text-gray-500 font-mono tracking-widest text-sm uppercase">[ NO PROJECTS FOUND IN VAULT ]</p>
            <p className="text-gray-600 font-mono text-xs mt-2">Deploy projects via the Admin Dashboard.</p>
          </div>
        )}

        {/* Dynamic Project Showcase */}
        <div className="flex flex-col gap-32">
          {!isLoading && projects.map((project, index) => (
            <div key={project.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center group`}>
              
              {/* Visual/Image Container */}
              <div className="w-full lg:w-1/2 aspect-video bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.02]">
                {/* If the DB has an image URL, show it. Otherwise, show your abstract Code2 design */}
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-zentry-copper/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <Code2 className="w-16 h-16 text-white/10 group-hover:text-zentry-copper/40 transition-colors duration-700" />
                  </>
                )}
                
                <div className="absolute bottom-6 left-6 text-white/20 font-mono text-sm tracking-widest uppercase bg-black/50 px-3 py-1 backdrop-blur-sm rounded">
                  System.Render({project.title.replace(/\s+/g, '')})
                </div>
              </div>

              {/* Project Details */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="flex items-baseline gap-4 mb-6">
                  {/* Formats DB ID like "1" to "01" */}
                  <span className="text-zentry-copper font-mono text-lg">
                    {String(project.id).padStart(2, '0')}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h2>
                </div>
                
                <h3 className="text-xl text-gray-400 font-light mb-6 uppercase tracking-widest">{project.category}</h3>
                
                <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg font-light">
                  {project.description}
                </p>
                
                {/* Tech Stack Pills (Splits the DB string "React, Node" into an array) */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.techStack && project.techStack.split(',').map((tech, i) => (
                    <span key={i} className="px-4 py-1.5 border border-white/10 rounded-full text-sm text-gray-400 tracking-wider bg-white/[0.01]">
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {/* Logic: If there is a liveLink in the DB, show visit. If blank, show Proprietary Lock. */}
                {project.liveLink ? (
                  <a 
                    href={project.liveLink} 
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