'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#6a5a2f]/40 px-5 sm:px-10 py-3 bg-[#231e10]/90 backdrop-blur-md">
      {/* Brand */}
      <a href="#" className="flex items-center gap-3 no-underline group">
        <div className="size-8 rounded-lg overflow-hidden flex items-center justify-center bg-[#fac638]/10 border border-[#fac638]/30 group-hover:scale-105 transition-transform">
          <img src="/favicon/favicon.png" alt="Yukti Media Logo" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-white text-lg font-bold tracking-tight">Yukti Media</h2>
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <a href="#services" className="text-white/80 hover:text-[#fac638] text-sm font-medium transition-colors">Services</a>
        <a href="#work" className="text-white/80 hover:text-[#fac638] text-sm font-medium transition-colors">Portfolio</a>
        <a href="#websites" className="text-white/80 hover:text-[#fac638] text-sm font-medium transition-colors flex items-center gap-1">
          Websites
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#fac638]/20 text-[#fac638] font-bold">3D</span>
        </a>
        <a href="#experience" className="text-white/80 hover:text-[#fac638] text-sm font-medium transition-colors">Experience</a>
        <a href="#reviews" className="text-white/80 hover:text-[#fac638] text-sm font-medium transition-colors">Reviews</a>
        <a href="#about" className="text-white/80 hover:text-[#fac638] text-sm font-medium transition-colors">About</a>
        <a href="#contact" className="text-white/80 hover:text-[#fac638] text-sm font-medium transition-colors">Contact</a>
      </nav>

      {/* Action Button */}
      <div className="hidden md:flex items-center">
        <a
          href="#contact"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fac638] text-[#231e10] text-sm font-bold hover:bg-[#fac638]/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#fac638]/10"
        >
          <span>Get Started</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-white/80 hover:text-white p-2 rounded-lg"
        aria-label="Toggle Menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#231e10] border-b border-[#6a5a2f]/40 p-5 flex flex-col gap-4 md:hidden shadow-2xl">
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#fac638] text-base font-medium py-1">Services</a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#fac638] text-base font-medium py-1">Portfolio</a>
          <a href="#websites" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#fac638] text-base font-medium py-1">Websites</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#fac638] text-base font-medium py-1">Experience</a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#fac638] text-base font-medium py-1">Reviews</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#fac638] text-base font-medium py-1">About Us</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#fac638] text-base font-medium py-1">Contact</a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#fac638] text-[#231e10] font-bold mt-2"
          >
            <span>Get Started</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}
