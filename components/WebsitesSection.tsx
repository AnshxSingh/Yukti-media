'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  Globe,
  Zap,
  BookOpen
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  categories: string[];
  badge?: string;
  highlights?: string[];
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: 'vegan-prophecy',
    title: 'Vegan Prophecy',
    subtitle: 'Vegan Community Platform',
    categories: ['Course Selling', 'Web Apps', 'Full Stack'],
    badge: 'Course Selling',
    highlights: ['Admin Panel', 'User friendly UI'],
    description:
      'A high-conversion online community platform and course boutique. Features seamless Razorpay checkout, dynamic course showcases, Clerk authentication, and lightning-fast loading.',
    tech: ['React', 'Tailwind CSS', 'Razorpay', 'Clerk'],
    liveUrl: 'https://www.instagram.com/veganprophecy2030/',
    image: '/assets/images/websites/site1.jpg',
  },
  {
    id: 'yash-collection',
    title: 'Yash Collection',
    subtitle: 'Kids Wear Wholesale Portal',
    categories: ['Web Apps', 'Full Stack'],
    badge: '+140% Orders',
    highlights: ['B2B Wholesale', 'Bulk Ordering'],
    description:
      'A B2B wholesale ordering portal that lets retail clients browse the full catalog and place bulk orders online 24/7 with zero friction.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    liveUrl: 'https://yashcollection.app',
    image: '/assets/images/websites/site2.png',
  },
  {
    id: 'staynest',
    title: 'StayNest',
    subtitle: 'Vacation Rental Marketplace',
    categories: ['Full Stack', 'Web Apps'],
    badge: 'MERN Marketplace',
    highlights: ['Conflict-Free Booking', 'Cloudinary CDN'],
    description:
      'A scalable MERN-stack property rental marketplace with conflict-resistant booking system, CRUD operations for hundreds of listings, and Cloudinary-powered media delivery.',
    tech: ['React', 'Node.js', 'MongoDB', 'Cloudinary'],
    liveUrl: '#',
    image: '/assets/images/websites/site3.png',
  },
];

const CATEGORIES = [
  { id: 'All', label: 'All', icon: Layers },
  { id: 'Course Selling', label: 'Course Selling', icon: BookOpen },
  { id: 'Web Apps', label: 'Web Apps', icon: Globe },
  { id: 'Full Stack', label: 'Full Stack', icon: Zap },
];

export default function WebsitesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [startIndex, setStartIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(selectedCategory));

  const total = filteredProjects.length;

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Compute visible items with wrap-around
  const visibleProjects = Array.from({ length: Math.min(3, total) }, (_, i) => {
    return filteredProjects[(startIndex + i) % total];
  });

  return (
    <section id="websites" className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 py-20 sm:py-24 scroll-mt-20 text-espresso transition-colors duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 px-2">
        <h2 className="text-espresso text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Websites
        </h2>
        <p className="text-mocha text-sm sm:text-base mt-2.5 sm:mt-3 leading-relaxed">
          Crafting high-converting, modern websites tailored for growth and performance.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 sm:mt-8">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setStartIndex(0);
                }}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'btn-brand-gradient shadow-lg shadow-purple-600/30 scale-105'
                    : 'bg-creamcard text-espresso hover:text-purple border border-purpleborder hover:border-purple hover:bg-creamsoft'
                }`}
                style={isSelected ? { background: 'linear-gradient(135deg, #9333ea 0%, #c026d3 50%, #4f46e5 100%)', color: '#ffffff' } : undefined}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-purple'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Carousel Container with Touch Gestures */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative flex items-center gap-3 sm:gap-5 touch-pan-y"
      >
        {/* Tablet Left Arrow Button (Only needed when fewer than 3 items shown per row) */}
        {total > 1 && (
          <button
            onClick={handlePrev}
            className="hidden md:flex lg:hidden size-11 rounded-full bg-creamcard border border-purpleborder text-espresso hover:text-white hover:bg-purple hover:border-purple items-center justify-center transition-all shrink-0 shadow-sm hover:scale-105 active:scale-95 z-10 cursor-pointer"
            aria-label="Previous Projects"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Cards Grid */}
        <div className={`grid gap-5 sm:gap-6 flex-1 w-full ${
          total === 1
            ? 'grid-cols-1 max-w-md mx-auto'
            : total === 2
            ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {visibleProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className={`rounded-3xl bg-creamcard border border-purpleborder hover:border-purple/70 overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-lg dark:hover:shadow-purple-950/20 ${
                idx === 0 ? 'flex' : idx === 1 ? 'hidden md:flex' : 'hidden lg:flex'
              }`}
            >
              {/* Top Media Container with sleek device mockup */}
              <div className="relative w-full h-52 sm:h-56 bg-black/10 dark:bg-black/30 overflow-hidden border-b border-purpleborder flex items-center justify-center p-2.5 sm:p-3">
                {/* Floating Metric Badge */}
                {project.badge && (
                  <div className="absolute top-3 left-3 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-creamcard/90 backdrop-blur-md border border-purpleborder text-purpledeep dark:text-purplelight text-xs font-bold shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-purple" />
                    <span>{project.badge}</span>
                  </div>
                )}

                {/* Top Right Action Icons */}
                <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="size-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 hover:border-purple-400 text-zinc-300 hover:text-white flex items-center justify-center transition-all hover:scale-110"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="size-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 hover:border-purple-400 text-zinc-300 hover:text-white flex items-center justify-center transition-all hover:scale-110"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Real Website Screenshot in sleek Browser Frame */}
                <div className="absolute inset-0 z-10 p-2.5 sm:p-3 flex items-center justify-center">
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/15 dark:border-white/10 shadow-2xl bg-neutral-900 group-hover:scale-[1.02] transition-transform duration-500 flex flex-col">
                    {/* Browser Window Header */}
                    <div className="h-5 bg-neutral-900 border-b border-white/10 px-2.5 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-rose-500/80" />
                        <span className="size-1.5 rounded-full bg-amber-500/80" />
                        <span className="size-1.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="px-2 py-0.5 rounded-full bg-neutral-800/90 text-[9px] text-zinc-300 font-mono truncate max-w-[130px] sm:max-w-[150px]">
                        {project.liveUrl && project.liveUrl !== '#' ? project.liveUrl.replace('https://', '').replace('www.', '') : `${project.id}.yuktimedia.in`}
                      </div>
                      <div className="w-4" />
                    </div>
                    {/* Screenshot Viewport */}
                    <div className="relative flex-1 w-full bg-neutral-950 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} website screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Subtitle */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple/15 text-purple border border-purple/30">
                      {project.badge || project.categories[0]}
                    </span>
                    {project.subtitle && (
                      <span className="text-xs text-mocha font-medium truncate">
                        {project.subtitle}
                      </span>
                    )}
                  </div>

                  <h3 className="text-espresso text-lg sm:text-xl font-bold tracking-tight group-hover:text-purple transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-mocha text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlights (Admin Panel, User friendly UI, etc.) */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.highlights.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-purpleborder">
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-purple/10 border border-purpleborder text-purpledeep dark:text-purplelight text-[11px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Links - Rich Brand Gradient & Glass Button */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
                    <a
                      href={project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : '#contact'}
                      target={project.liveUrl && project.liveUrl !== '#' ? '_blank' : undefined}
                      rel={project.liveUrl && project.liveUrl !== '#' ? 'noreferrer' : undefined}
                      style={{ background: 'linear-gradient(135deg, #9333ea 0%, #c026d3 50%, #4f46e5 100%)' }}
                      className="btn-brand-gradient flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-purple-600/30 hover:brightness-110 hover:scale-105 active:scale-95 no-underline"
                    >
                      <span>Visit Website</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href="#contact"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-full bg-creamcard border border-purpleborder hover:border-purple/80 hover:bg-purple/10 text-xs sm:text-sm font-semibold text-espresso hover:text-purple transition-all no-underline"
                    >
                      <span>Let&apos;s Talk</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet Right Arrow Button */}
        {total > 1 && (
          <button
            onClick={handleNext}
            className="hidden md:flex lg:hidden size-11 rounded-full bg-creamcard border border-purpleborder text-espresso hover:text-white hover:bg-purple hover:border-purple items-center justify-center transition-all shrink-0 shadow-sm hover:scale-105 active:scale-95 z-10 cursor-pointer"
            aria-label="Next Projects"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mobile & Tablet Pagination Controls */}
      {total > 1 && (
        <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="size-9 rounded-full bg-creamcard border border-purpleborder text-espresso hover:text-purple flex items-center justify-center shadow-sm active:scale-95 cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: total }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  startIndex === idx
                    ? 'w-7 bg-purple shadow-lg shadow-purple/40'
                    : 'w-2 bg-espresso/20 hover:bg-espresso/40 dark:bg-white/20 dark:hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="size-9 rounded-full bg-creamcard border border-purpleborder text-espresso hover:text-purple flex items-center justify-center shadow-sm active:scale-95 cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}