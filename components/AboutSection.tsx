'use client';

import React, { useState } from 'react';
import {
  Code2,
  Sparkles,
  Zap,
  ArrowRight,
  Layers
} from 'lucide-react';

const TABS = [
  { id: 'story', label: 'My Story', icon: Sparkles },
  { id: 'engineering', label: 'Engineering Core', icon: Code2 },
  { id: 'client', label: 'Client Experience', icon: Layers },
];

const TAB_CONTENT = {
  story: {
    badge: 'Creative Digital Studio & Web Engineer',
    heading: 'Engineering websites that turn visitors into loyal customers.',
    p1: "I'm a freelance web developer and digital engineer dedicated to building blazing-fast, bespoke websites that don't just look incredible, but deliver measurable business growth.",
    p2: 'With deep expertise across modern React, Next.js 14, GSAP scroll parallax, and Three.js 3D, I transform complex technical ideas into frictionless user experiences delivered on-time.',
    p3: "When I'm not crafting web experiences, I'm exploring bleeding-edge web technologies, 3D WebGL rendering, and finding smarter ways to elevate digital brands.",
  },
  engineering: {
    badge: 'Next-Gen Architecture & 3D WebGL',
    heading: 'Architected for speed, scalability, and visual immersion.',
    p1: 'Leveraging Next.js 14 App Router, Three.js WebGL canvas, and GSAP timeline animations to deliver seamless 60fps interactive experiences across all devices.',
    p2: 'Every component is built with strict TypeScript typing, modular Tailwind CSS tokens, and optimal asset compression pipelines for instantaneous page transitions.',
    p3: 'From custom shaders to isometric 3D models, we turn static interfaces into captivating digital worlds.',
  },
  client: {
    badge: 'High-Retention Delivery & Growth',
    heading: 'Client-centric collaboration from concept to deployment.',
    p1: 'Transparent communication, milestone-driven sprints, and direct scoping via WhatsApp and Email to keep you fully informed at every stage.',
    p2: 'We do not just write code or edit footage — we build high-converting digital assets designed to transform attention into real brand equity.',
    p3: 'With rapid turnaround times and dedicated post-launch support, your satisfaction and business metrics always come first.',
  },
};

const STATS = [
  { value: '50+', label: 'Sites Shipped' },
  { value: '99+', label: 'Lighthouse Score' },
  { value: '100%', label: 'On-Time Delivery' },
  { value: '< 24h', label: 'Response Time' },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<'story' | 'engineering' | 'client'>('story');

  const current = TAB_CONTENT[activeTab];

  return (
    <section id="about" className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 py-20 scroll-mt-16">
      {/* Interactive Tabs Header */}
      <div className="flex items-center justify-start sm:justify-center mb-10 overflow-x-auto pb-2">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#14120b] border border-[#302917] backdrop-blur-md">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as 'story' | 'engineering' | 'client')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#fac638] text-[#231e10] font-bold shadow-lg shadow-[#fac638]/20 scale-[1.02]'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[#201c12]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Heading, Story Content, Stats, and Action Buttons */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c180d] border border-[#fac638]/30 text-[#fac638] text-xs font-medium w-fit">
            <Code2 className="w-3.5 h-3.5 text-[#fac638]" />
            <span>{current.badge}</span>
            <Sparkles className="w-3 h-3 text-[#fac638]" />
          </div>

          {/* Big Bold Headline */}
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15]">
            {current.heading}
          </h2>

          {/* Narrative Paragraphs */}
          <div className="flex flex-col gap-3.5 text-[#a1a1aa] text-sm sm:text-base leading-relaxed">
            <p>{current.p1}</p>
            <p>{current.p2}</p>
            <p className="text-[#71717a] text-xs sm:text-sm">{current.p3}</p>
          </div>

          {/* Stats Badges Row (Unified Gold/Amber Theme) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#14120b] border border-[#302917] hover:border-[#fac638]/60 flex flex-col items-center justify-center text-center transition-colors"
              >
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#fac638]">
                  {stat.value}
                </span>
                <span className="text-[11px] text-[#a1a1aa] font-medium mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action CTA Buttons (Unified Gold Brand Color) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fac638] hover:bg-[#fcd34d] text-[#231e10] font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#fac638]/20 no-underline"
            >
              <span>Book Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#14120b] border border-[#302917] hover:border-[#fac638] text-white/90 hover:text-white font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all no-underline"
            >
              <span>View Case Studies</span>
            </a>
          </div>
        </div>

        {/* Right Column: Feature Bento Cards (Unified Theme) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Top Card: Expertise */}
          <div className="p-6 rounded-3xl bg-[#14120b] border border-[#302917] hover:border-[#fac638]/50 transition-all group">
            <div className="size-11 rounded-xl bg-[#2a220f] border border-[#fac638]/30 flex items-center justify-center text-[#fac638] mb-4 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-white text-lg font-bold">Expertise</h3>
            <p className="text-[#a1a1aa] text-xs sm:text-sm mt-2 leading-relaxed">
              Specialized in full-stack MERN &amp; Next.js development — building scalable web apps with React.js, Next.js 14, Three.js 3D, GSAP parallax, and cloud deployments.
            </p>
          </div>

          {/* Bottom 2 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 2: Clean Code */}
            <div className="p-5 rounded-3xl bg-[#14120b] border border-[#302917] hover:border-[#fac638]/50 transition-all group flex flex-col justify-between">
              <div>
                <div className="size-10 rounded-xl bg-[#2a220f] border border-[#fac638]/30 flex items-center justify-center text-[#fac638] mb-3 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-white text-base font-bold">Clean Code</h4>
                <p className="text-[#a1a1aa] text-xs mt-2 leading-relaxed">
                  Writing maintainable, well-structured code using modular architecture, reusable components, and JWT secure auth.
                </p>
              </div>
            </div>

            {/* Card 3: Performance */}
            <div className="p-5 rounded-3xl bg-[#14120b] border border-[#302917] hover:border-[#fac638]/50 transition-all group flex flex-col justify-between">
              <div>
                <div className="size-10 rounded-xl bg-[#2a220f] border border-[#fac638]/30 flex items-center justify-center text-[#fac638] mb-3 group-hover:scale-105 transition-transform">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="text-white text-base font-bold">Performance</h4>
                <p className="text-[#a1a1aa] text-xs mt-2 leading-relaxed">
                  Proven 99+ Lighthouse speed score through lazy loading, WebGL shader optimization, and asset pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
