import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/40 border-t border-white/5 pt-20 pb-10 relative z-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 pr-0 lg:pr-12">
            <Link to="/" className="flex items-center gap-3 mb-6 group inline-flex">
              <img src="/logo.png" alt="Zentry Hub" className="h-8 w-auto group-hover:scale-105 transition-transform duration-500 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100" />
              <span className="text-xl font-bold tracking-[0.2em] text-white">
                ZENTRY<span className="text-zentry-copper">HUB</span>
              </span>
            </Link>
            <p className="text-gray-500 font-light leading-relaxed mb-8 max-w-sm">
              Architecting uncompromising digital infrastructure. From complex machine learning models to scalable enterprise web applications.
            </p>
            <div className="flex items-center gap-4">
              {/* Custom SVG for LinkedIn */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-zentry-copper hover:border-zentry-copper transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              {/* Custom SVG for GitHub */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              {/* Custom SVG for Twitter/X */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-medium tracking-widest uppercase text-sm mb-6">Directory</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-gray-500 hover:text-zentry-copper transition-colors duration-300 text-sm font-light">Services & Capabilities</Link></li>
              <li><Link to="/work" className="text-gray-500 hover:text-zentry-copper transition-colors duration-300 text-sm font-light">Project Portfolio</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-zentry-copper transition-colors duration-300 text-sm font-light">Agency Leadership</Link></li>
              <li><Link to="/testimonials" className="text-gray-500 hover:text-zentry-copper transition-colors duration-300 text-sm font-light">Client Endorsements</Link></li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-medium tracking-widest uppercase text-sm mb-6">Expertise</h4>
            <ul className="space-y-4">
              <li className="text-gray-500 text-sm font-light cursor-default">Full-Stack Engineering</li>
              <li className="text-gray-500 text-sm font-light cursor-default">Machine Learning</li>
              <li className="text-gray-500 text-sm font-light cursor-default">System Architecture</li>
              <li className="text-gray-500 text-sm font-light cursor-default">Academic Consulting</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-medium tracking-widest uppercase text-sm mb-6">Initiate</h4>
            <div className="flex flex-col space-y-4 mb-6">
              <a href="mailto:hello@zentryhub.com" className="group flex items-center gap-3 text-gray-500 hover:text-white transition-colors duration-300 text-sm font-light">
                {/* Custom SVG for Mail */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zentry-copper"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                hello@zentryhub.com
              </a>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium border-b border-zentry-copper pb-1 text-white hover:text-zentry-copper transition-colors duration-300 group">
              Start a Project 
              {/* Custom SVG for ArrowUpRight */}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </Link>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-light tracking-wider">
            &copy; {currentYear} Zentry Hub. All rights reserved. Designed by Limalkavinesh.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-gray-600 hover:text-white text-xs font-light transition-colors duration-300">Privacy Policy</Link>
            <Link to="#" className="text-gray-600 hover:text-white text-xs font-light transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;