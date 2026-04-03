import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 top-0 bg-black/40 backdrop-blur-xl border-b border-white/5 transition-all duration-300 py-2">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Zentry Hub" className="h-10 w-auto group-hover:scale-105 transition-transform duration-500" />
            <span className="text-xl font-bold tracking-[0.2em] text-white">
              ZENTRY<span className="text-zentry-copper">HUB</span>
            </span>
          </Link>

          {/* Minimalist Menu - NOW INCLUDING TESTIMONIALS */}
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-widest text-gray-400">
            <Link to="/services" className="hover:text-white transition-colors duration-300">SERVICES</Link>
            <Link to="/work" className="hover:text-white transition-colors duration-300">PORTFOLIO</Link>
            <Link to="/about" className="hover:text-white transition-colors duration-300">AGENCY</Link>
            <Link to="/testimonials" className="hover:text-white transition-colors duration-300">CLIENTS</Link>
            
            <Link to="/contact" className="relative group px-6 py-2 overflow-hidden border border-zentry-copper/50 rounded-full text-zentry-copper hover:text-black transition-all duration-500">
              <span className="absolute inset-0 bg-zentry-copper translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></span>
              <span className="relative z-10">INITIATE</span>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;