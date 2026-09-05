'use client';

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    id: 0,
    title: 'Vegan Prophecy',
    subtitle: 'Vegan Community Platform',
    category: 'Course Selling',
    description: 'A high-conversion online boutique for a luxury fashion brand. Features seamless checkout, dynamic product showcases, and lightning-fast loading.',
    metrics: ['Admin Panel', 'User freindly UI'],
    tech: ['React', 'Tailwind CSS', 'Razorpay', 'Clerk'],
    image: '/assets/images/websites/site1.jpg',
    url: 'https://veganprophecy.com/',
    accentColor: '#b7ffcdff'
  },
  {
    id: 1,
    title: 'Yash Collection',
    subtitle: 'B2B Wholesale & Partner Portal',
    category: 'B2B Portal',
    description: 'A secure wholesale partner portal designed for seamless bulk ordering, real-time inventory tracking, and encrypted partner dashboard management.',
    metrics: ['B2B Partner Portal', 'Encrypted Auth', 'Wholesale CRM'],
    tech: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Auth0'],
    image: '/assets/images/websites/yashcollection.png',
    objectPosition: 'object-center',
    url: 'https://www.yashcollection.app/',
    accentColor: '#38bdf8'
  }
];

export default function WebsitesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateTo = (newIndex: number) => {
    const total = PROJECTS.length;
    const target = ((newIndex % total) + total) % total;
    setCurrentIndex(target);
  };

  const activeProject = PROJECTS[currentIndex];

  return (
    <section id="websites" className="w-full max-w-[960px] mx-auto px-4 py-8">
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-1">
        Websites
      </h2>
      <p className="text-[#ccbc8e] text-sm font-normal leading-normal pb-3">
        Crafting high-converting, modern websites tailored for growth and performance.
      </p>

      {/* Showcase Card (Border removed) */}
      <div className="rounded-2xl bg-[#2a2414] p-4 sm:p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-[1.18fr_1fr] gap-6 items-center">
          {/* Left Column: Realistic Laptop Mockup & Arrows */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 w-full">
            <button
              onClick={() => navigateTo(currentIndex - 1)}
              className="size-8 sm:size-10 rounded-full bg-[#231e10] text-[#fac638] flex items-center justify-center active:scale-95 transition-all shrink-0 z-20 shadow-lg"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Laptop Mockup Container (No hover tilt, no border) */}
            <div className="relative flex-1 max-w-[340px] sm:max-w-[440px] flex items-center justify-center select-none">
              <div className="relative w-full aspect-[525/350] drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]">
                {/* Website Screenshot inside the Laptop Display */}
                <div
                  className="absolute overflow-hidden rounded-t-[3px] bg-[#111]"
                  style={{
                    left: '13.15%',
                    top: '4.57%',
                    width: '73.72%',
                    height: '66.86%',
                  }}
                >
                  {PROJECTS.map((proj, idx) => (
                    <img
                      key={proj.id}
                      src={proj.image}
                      alt={proj.title}
                      className={`absolute inset-0 w-full h-full object-cover ${proj.objectPosition || 'object-top'} transition-opacity duration-500 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                      loading="lazy"
                    />
                  ))}

                  {/* Subtle Screen Reflection Glare Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] pointer-events-none" />
                </div>

                {/* Transparent Laptop Mockup Frame Overlay */}
                <img
                  src="/assets/images/laptop-with-blank-screen-isolate-on-transparent-background-ai-generated-png.webp"
                  alt="Laptop Mockup Display"
                  className="relative z-10 w-full h-full object-contain pointer-events-none"
                />
              </div>
            </div>

            <button
              onClick={() => navigateTo(currentIndex + 1)}
              className="size-8 sm:size-10 rounded-full bg-[#231e10] text-[#fac638] flex items-center justify-center active:scale-95 transition-all shrink-0 z-20 shadow-lg"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Right Column: Project Info Panel */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold border"
                style={{
                  backgroundColor: `${activeProject.accentColor}15`,
                  color: activeProject.accentColor,
                  borderColor: `${activeProject.accentColor}40`
                }}
              >
                {activeProject.category}
              </span>
              <span className="text-xs text-[#ccbc8e]/60 font-semibold">
                0{activeProject.id + 1} / 0{PROJECTS.length}
              </span>
            </div>

            <h3 className="text-white text-xl sm:text-2xl font-bold leading-tight mb-1">
              {activeProject.title}
            </h3>
            <p className="text-[#ccbc8e] text-sm font-medium mb-3">
              {activeProject.subtitle}
            </p>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
              {activeProject.description}
            </p>

            {/* Metrics */}
            <div className="flex flex-wrap gap-2 mb-3">
              {activeProject.metrics.map((m, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/25"
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {activeProject.tech.map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/5 text-white/80 border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <a
                href={activeProject.url && activeProject.url !== '#' ? activeProject.url : '#contact'}
                target={activeProject.url && activeProject.url !== '#' ? '_blank' : undefined}
                rel={activeProject.url && activeProject.url !== '#' ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fac638] text-[#231e10] text-xs sm:text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#fac638]/10"
              >
                <span>Visit Website</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                className="px-4 py-2 rounded-full bg-[#352d18] border border-[#6a5a2f] text-white text-xs sm:text-sm font-semibold hover:border-[#fac638] transition-all"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-[#6a5a2f]/20">
          {PROJECTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => navigateTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                ? 'w-6 bg-[#fac638]'
                : 'w-2 bg-[#6a5a2f]/50 hover:bg-[#fac638]/50'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

