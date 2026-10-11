'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowUpRight, MoonStar, SunMedium } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Sync to whatever the FOUC script applied, then watch for changes
    const update = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('yukti_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('yukti_theme', 'light');
    }
    // setTheme will be called by the MutationObserver automatically
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#6a5a2f]/40 px-5 sm:px-10 py-3 bg-[#231e10]/90 backdrop-blur-md">
      {/* Brand */}
      <a href="#" className="flex items-center gap-3 no-underline group">
        <div className="size-8 rounded-lg overflow-hidden flex items-center justify-center bg-[#fac638]/10 border border-[#fac638]/30 group-hover:scale-105 transition-transform">
          <img src="/favicon/favicon.png" alt="Yukti Media Logo" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-espresso text-lg font-bold tracking-tight group-hover:text-purple transition-colors">
          Yukti Media
        </h2>
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-4 xl:gap-7 shrink-0">
        <a href="#services" className="text-espresso/80 hover:text-purple text-sm font-medium transition-colors">
          Services
        </a>
        <a href="#work" className="text-espresso/80 hover:text-purple text-sm font-medium transition-colors">
          Portfolio
        </a>
        <a href="#websites" className="text-espresso/80 hover:text-purple text-sm font-medium transition-colors">
          Websites
        </a>
        <a href="#experience" className="text-espresso/80 hover:text-purple text-sm font-medium transition-colors">
          Experience
        </a>
        <a href="#reviews" className="text-espresso/80 hover:text-purple text-sm font-medium transition-colors">
          Reviews
        </a>
        <a href="#about" className="text-espresso/80 hover:text-purple text-sm font-medium transition-colors">
          About
        </a>
        <a href="#contact" className="text-espresso/80 hover:text-purple text-sm font-medium transition-colors">
          Contact
        </a>
      </nav>

      {/* Action Buttons & Theme Toggle */}
      <div className="hidden lg:flex items-center gap-3 shrink-0">
        {/* Dark / Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          type="button"
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-purpleborder bg-creamcard hover:border-purple/70 text-espresso transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 group cursor-pointer"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <div className="size-5 rounded-full bg-purple/10 flex items-center justify-center text-purple shrink-0">
            {theme === 'dark' ? (
              <MoonStar className="w-3.5 h-3.5 text-purple-300 transition-transform group-hover:-rotate-12" />
            ) : (
              <SunMedium className="w-3.5 h-3.5 text-amber-500 transition-transform group-hover:rotate-45" />
            )}
          </div>
          <span className="text-xs font-semibold tracking-tight">
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
        </button>

        <a
          href="#contact"
          style={{ background: 'linear-gradient(135deg, #6b21a8 0%, #4c1d95 100%)', color: '#ffffff' }}
          className="btn-brand-gradient flex items-center gap-1.5 px-5 py-2 rounded-full text-white text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-900/30 no-underline hover:brightness-110"
        >
          <span>Get Started</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Mobile Actions: Theme Toggle + Menu */}
      <div className="lg:hidden flex items-center gap-2 shrink-0">
        <button
          onClick={toggleTheme}
          type="button"
          aria-label="Toggle Theme"
          className="size-9 rounded-full flex items-center justify-center border border-purpleborder bg-creamcard text-espresso hover:text-purple transition-all active:scale-95 shadow-sm"
        >
          {theme === 'dark' ? (
            <MoonStar className="w-4 h-4 text-purple-300" />
          ) : (
            <SunMedium className="w-4 h-4 text-amber-500" />
          )}
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-espresso/80 hover:text-purple p-2 rounded-lg hover:bg-creamsoft transition-colors"
          aria-label="Toggle Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu with Deep Glassmorphism Blur */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-cream/95 dark:bg-[#09090b]/95 backdrop-blur-2xl border-b border-purpleborder p-6 flex flex-col gap-3 lg:hidden shadow-2xl max-h-[calc(100svh-4rem)] overflow-y-auto transition-colors duration-300">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-espresso/90 hover:text-purple text-base font-medium py-2 transition-colors"
          >
            Services
          </a>
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-espresso/90 hover:text-purple text-base font-medium py-2 transition-colors"
          >
            Portfolio
          </a>
          <a
            href="#websites"
            onClick={() => setMobileMenuOpen(false)}
            className="text-espresso/90 hover:text-purple text-base font-medium py-2 transition-colors"
          >
            Websites
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-espresso/90 hover:text-purple text-base font-medium py-2 transition-colors"
          >
            Experience
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="text-espresso/90 hover:text-purple text-base font-medium py-2 transition-colors"
          >
            Reviews
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-espresso/90 hover:text-purple text-base font-medium py-2 transition-colors"
          >
            About Us
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-espresso/90 hover:text-purple text-base font-medium py-2 transition-colors"
          >
            Contact
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white font-bold mt-2 shadow-lg shadow-purple-600/30"
          >
            <span>Get Started</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}