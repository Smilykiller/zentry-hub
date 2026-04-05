import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Added these icons for the mobile menu

const Navbar = () => {
  // 1. Add state to control the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // 2. Function to toggle the menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // 3. Function to close the menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed w-full z-50 top-0 bg-black/40 backdrop-blur-xl border-b border-white/5 transition-all duration-300 py-2">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo (Visible on all screens) */}
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3 group z-50">
            <img src="/logo.png" alt="Zentry Hub" className="h-10 w-auto group-hover:scale-105 transition-transform duration-500" />
            <span className="text-xl font-bold tracking-[0.2em] text-white">
              ZENTRY<span className="text-zentry-copper">HUB</span>
            </span>
          </Link>

          {/* Desktop Menu (Hidden on mobile) */}
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

          {/* Mobile Hamburger Button (Hidden on desktop) */}
          <button 
            className="md:hidden text-gray-300 hover:text-white z-50 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Overlay (Visible only when isOpen is true) */}
      <div 
        className={`md:hidden absolute top-0 left-0 w-full min-h-screen bg-black/95 backdrop-blur-3xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        } -z-10 flex flex-col justify-center items-center`}
      >
        <div className="flex flex-col items-center space-y-8 text-lg font-medium tracking-[0.2em] text-gray-400">
          <Link to="/services" onClick={closeMenu} className="hover:text-white hover:scale-110 transition-all duration-300">SERVICES</Link>
          <Link to="/work" onClick={closeMenu} className="hover:text-white hover:scale-110 transition-all duration-300">PORTFOLIO</Link>
          <Link to="/about" onClick={closeMenu} className="hover:text-white hover:scale-110 transition-all duration-300">AGENCY</Link>
          <Link to="/testimonials" onClick={closeMenu} className="hover:text-white hover:scale-110 transition-all duration-300">CLIENTS</Link>
          
          <Link to="/contact" onClick={closeMenu} className="mt-8 relative group px-8 py-3 overflow-hidden border border-zentry-copper/50 rounded-full text-zentry-copper hover:text-black transition-all duration-500">
            <span className="absolute inset-0 bg-zentry-copper translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></span>
            <span className="relative z-10">INITIATE PROTOCOL</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;