'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowUpRight, MoonStar, SunMedium } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Sync to whatever the anti-FOUC script applied, then watch for class mutations
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
  };

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#work' },
    { label: 'Websites', href: '#websites' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 bg-cream/85 dark:bg-[#09090b]/85 backdrop-blur-xl border-b border-purpleborder shadow-sm dark:shadow-black/40 transition-all duration-300 max-w-full">
      {/* Brand Logo & Name */}
      <a href="#" className="flex items-center gap-2.5 no-underline group shrink-0">
        <div className="size-9 rounded-xl overflow-hidden flex items-center justify-center bg-creamcard dark:bg-[#141418] border border-purpleborder group-hover:border-purple group-hover:scale-105 transition-all shadow-sm">
          <Image
            src="/favicon/yuktilogo.png"
            alt="Yukti Media Logo"
            width={36}
            height={36}
            className="w-full h-full object-contain p-0.5"
            priority
          />
        </div>
        <span className="text-espresso text-base sm:text-lg font-bold tracking-tight group-hover:text-purple transition-colors">
          Yukti Media
        </span>
      </a>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:flex items-center gap-5 xl:gap-8 shrink-0">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-mocha hover:text-purple dark:text-zinc-300 dark:hover:text-purple-300 text-sm font-medium transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Desktop Actions: Theme Toggle + CTA Button */}
      <div className="hidden lg:flex items-center gap-3 shrink-0">
        {/* Dark / Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          type="button"
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purpleborder bg-creamcard dark:bg-[#141418] hover:border-purple/70 text-espresso transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <div className="size-4 rounded-full flex items-center justify-center text-purple shrink-0">
            {theme === 'dark' ? (
              <MoonStar className="w-3.5 h-3.5 text-purple-300" />
            ) : (
              <SunMedium className="w-3.5 h-3.5 text-amber-500" />
            )}
          </div>
          <span className="text-xs font-semibold tracking-tight text-espresso">
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
        </button>

        {/* Primary CTA Button */}
        <a
          href="#contact"
          style={{ background: 'linear-gradient(135deg, #6b21a8 0%, #4c1d95 100%)', color: '#ffffff' }}
          className="btn-brand-gradient flex items-center gap-1.5 px-5 py-2 rounded-full text-white text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-900/30 no-underline cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowUpRight className="w-4 h-4 text-white" />
        </a>
      </div>

      {/* Mobile Actions: Theme Toggle + Hamburger Menu */}
      <div className="lg:hidden flex items-center gap-2 shrink-0">
        <button
          onClick={toggleTheme}
          type="button"
          aria-label="Toggle Theme"
          className="size-9 rounded-full flex items-center justify-center border border-purpleborder bg-creamcard dark:bg-[#141418] text-espresso hover:text-purple transition-all active:scale-95 shadow-sm"
        >
          {theme === 'dark' ? (
            <MoonStar className="w-4 h-4 text-purple-300" />
          ) : (
            <SunMedium className="w-4 h-4 text-amber-500" />
          )}
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="size-9 rounded-xl flex items-center justify-center border border-purpleborder bg-creamcard dark:bg-[#141418] text-espresso hover:text-purple transition-all active:scale-95 shadow-sm"
          aria-label="Toggle Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-espresso" /> : <Menu className="w-5 h-5 text-espresso" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu with Glassmorphism */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-cream/98 dark:bg-[#09090b]/98 backdrop-blur-2xl border-b border-purpleborder p-6 flex flex-col gap-3 lg:hidden shadow-2xl max-h-[calc(100svh-4rem)] overflow-y-auto transition-colors duration-300 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-espresso hover:text-purple text-base font-medium py-2 transition-colors border-b border-purpleborder/40"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{ background: 'linear-gradient(135deg, #6b21a8 0%, #4c1d95 100%)', color: '#ffffff' }}
            className="btn-brand-gradient flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white font-bold mt-2 shadow-lg shadow-purple-900/30 no-underline"
          >
            <span>Get Started</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </a>
        </div>
      )}
    </header>
  );
}