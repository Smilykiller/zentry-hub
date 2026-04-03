import React from 'react';
import { 
  Server, ShoppingCart, PenTool, 
  BrainCircuit, Workflow, MessageSquareCode, 
  Building2, Video, GraduationCap, 
  Wrench, Cloud 
} from 'lucide-react';

const Services = () => {
  return (
    <div className="min-h-screen bg-zentry-dark pt-32 pb-24 px-6 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-zentry-copper/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-zentry-slate/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-24 md:mb-32 text-center md:text-left">
          <p className="text-zentry-copper tracking-[0.3em] text-sm font-semibold mb-4 uppercase">The Complete Catalog</p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-8">
            ENGINEERED <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zentry-copper to-zentry-slate">
              CAPABILITIES.
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
            From initial wireframes to post-launch cloud management, Zentry Hub provides end-to-end technical architecture across four primary operational pillars.
          </p>
        </div>

        {/* Services Layout - The 4 Pillars */}
        <div className="space-y-32">
          
          {/* Pillar 1: Core Software & Web Development */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start group">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-zentry-copper font-mono text-5xl opacity-50 mb-4 block">01</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Core Software &<br/>Web Dev</h2>
              <p className="text-gray-500 font-light text-lg">Foundational digital infrastructure and user-centric application design.</p>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.04] transition-colors duration-500">
                <Server className="w-8 h-8 text-zentry-copper mb-6" />
                <h3 className="text-xl font-medium text-white mb-3">API & Backend Architecture</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">Building robust server-side architecture and APIs using Java or Python for clients who require secure data management to power their existing frontends.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.04] transition-colors duration-500">
                <ShoppingCart className="w-8 h-8 text-zentry-slate mb-6" />
                <h3 className="text-xl font-medium text-white mb-3">E-commerce Solutions</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">End-to-end full-stack development for local retail stores and enterprises looking to digitize their inventory and scale online operations.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.04] transition-colors duration-500 md:col-span-2">
                <PenTool className="w-8 h-8 text-zentry-copper mb-6" />
                <h3 className="text-xl font-medium text-white mb-3">UI/UX Design Prototyping</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">Offering comprehensive design, user journey mapping, and high-fidelity wireframing as a standalone service before any engineering code is written.</p>
              </div>
            </div>
          </div>

          {/* Pillar 2: AI, Data & Automation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start group">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-zentry-copper font-mono text-5xl opacity-50 mb-4 block">02</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">AI, Data &<br/>Automation</h2>
              <p className="text-gray-500 font-light text-lg">Optimizing workflows through logic-driven scripts and intelligent systems.</p>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.04] transition-colors duration-500">
                <BrainCircuit className="w-8 h-8 text-zentry-copper mb-6" />
                <h3 className="text-xl font-medium text-white mb-3">Machine Learning Models</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">Developing custom Python-based algorithms for complex tasks like image recognition, healthcare diagnostics, and automated data set analysis.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.04] transition-colors duration-500">
                <Workflow className="w-8 h-8 text-zentry-slate mb-6" />
                <h3 className="text-xl font-medium text-white mb-3">Business Process Automation</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">Engineering custom scripts to seamlessly automate repetitive corporate tasks, manual data entry pipelines, and complex report generation.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.04] transition-colors duration-500 md:col-span-2">
                <MessageSquareCode className="w-8 h-8 text-zentry-copper mb-6" />
                <h3 className="text-xl font-medium text-white mb-3">Multi-Platform Virtual Assistants</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">Building intelligent, context-aware bots that expand beyond WhatsApp to integrate directly into Telegram, Discord, and proprietary website chat networks.</p>
              </div>
            </div>
          </div>

          {/* Pillar 3: Specialized & Niche Solutions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start group">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-zentry-copper font-mono text-5xl opacity-50 mb-4 block">03</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Specialized &<br/>Niche Systems</h2>
              <p className="text-gray-500 font-light text-lg">Custom architecture for specific industries, academia, and real-time demands.</p>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.04] transition-colors duration-500">
                <Building2 className="w-8 h-8 text-zentry-copper mb-6" />
                <h3 className="text-xl font-medium text-white mb-3">Institutional Management</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">Building comprehensive platforms for campuses and corporations, featuring smart attendance tracking, portals, and administrative dashboards.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.04] transition-colors duration-500">
                <Video className="w-8 h-8 text-zentry-slate mb-6" />
                <h3 className="text-xl font-medium text-white mb-3">Multimedia & Real-Time Sync</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">Creating synchronized audio/video playback players, latency-free live chat applications, and custom streaming ecosystems.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.04] transition-colors duration-500 md:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-6">
                <GraduationCap className="w-12 h-12 text-zentry-copper flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Academic Project Consulting</h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">A structured mentoring service guiding advanced students through complex system design, thesis implementation, and enterprise-grade code execution.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 4: Support & Maintenance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start group">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-zentry-copper font-mono text-5xl opacity-50 mb-4 block">04</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Support &<br/>Maintenance</h2>
              <p className="text-gray-500 font-light text-lg">Ensuring long-term stability, security, and uptime for deployed applications.</p>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.04] transition-colors duration-500 flex flex-col justify-center items-center text-center">
                <Wrench className="w-10 h-10 text-zentry-copper mb-4" />
                <h3 className="text-xl font-medium text-white mb-3">Retainer Maintenance</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">Monthly recurring packages dedicated to keeping client applications updated, secure, optimized, and bug-free post-launch.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.04] transition-colors duration-500 flex flex-col justify-center items-center text-center">
                <Cloud className="w-10 h-10 text-zentry-slate mb-4" />
                <h3 className="text-xl font-medium text-white mb-3">Cloud & Hosting Logistics</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">Overseeing the deployment of applications to the web, managing server infrastructure, and scaling resources to meet traffic demands.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Services;