'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

const WORDS = [
  'Videos that Convert',
  'Dynamic Web Apps',
  'Scroll-Stopping Reels',
  'Viral Social Media',
  'Award-Winning Brands'
];

const NAV_HEIGHT = 64; // Height of sticky navbar (h-16 / 4rem)

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const circleLayerRef = useRef<HTMLDivElement>(null);

  // Rotating dynamic headline (every 2.4s)
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  // Screen size check
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen, { passive: true });
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // High-performance RAF Scroll Loop for Inversion Circle (Active on Desktop)
  useEffect(() => {
    if (!isDesktop) return;

    let rafId: number | null = null;

    const updateCircle = () => {
      if (!trackRef.current || !circleLayerRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const scrollY = Math.max(0, -(rect.top - NAV_HEIGHT));

      const w = window.innerWidth;
      const h = Math.max(400, window.innerHeight - NAV_HEIGHT);

      const phase1Range = h * 0.75;
      const phase2Range = h * 0.75;

      const p1 = Math.min(1, Math.max(0, scrollY / phase1Range));
      const p2 = Math.min(1, Math.max(0, (scrollY - phase1Range) / phase2Range));

      // Power4 InOut for smooth rise
      const p1e = p1 < 0.5 ? 8 * p1 ** 4 : 1 - (-2 * p1 + 2) ** 4 / 2;
      // EaseIn square for expansion
      const p2e = p2 * p2;

      // Desktop ball size
      const ballSize = 320;
      const maxRadius = Math.hypot(w / 2, h / 2) + 24;
      const initialRadius = ballSize / 2;
      const currentRadius = initialRadius + p2e * (maxRadius - initialRadius);

      const yOff = (1 - p1e) * (h / 2 + ballSize / 2);
      const clipX = w / 2;
      const clipY = h / 2 + yOff;

      circleLayerRef.current.style.clipPath = `circle(${currentRadius.toFixed(1)}px at ${clipX.toFixed(1)}px ${clipY.toFixed(1)}px)`;
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateCircle();
        rafId = null;
      });
    };

    const onResize = () => {
      updateCircle();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Initial render
    updateCircle();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [isDesktop]);

  return (
    <div ref={trackRef} className="relative w-full md:h-[250vh]">
      {/* Hero Viewport (Sticky on Desktop, Natural Height on Mobile) */}
      <section className="relative md:sticky md:top-16 min-h-[calc(100dvh-4rem)] md:h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#231e10] flex items-center justify-center select-none py-8 md:py-0">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] md:w-[600px] h-[280px] sm:h-[450px] md:h-[600px] bg-[#fac638]/6 rounded-full blur-3xl pointer-events-none" />

        {/* ── 1. Base Dark Layer ── */}
        <div className="relative md:absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-10 z-10 pointer-events-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#fac638]/10 border border-[#fac638]/30 text-[#fac638] text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span>Digital Media Architecture</span>
          </div>

          {/* Reserved Spacer for 3D Logo */}
          <div className="w-[200px] sm:w-[240px] md:w-[280px] h-[130px] sm:h-[150px] md:h-[170px] mt-2 mb-7 sm:mb-9 md:mb-11" aria-hidden="true" />

          {/* Dynamic Headline */}
          <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-[1.2] sm:leading-[1.15] mb-3 sm:mb-4">
            We Create <br className="hidden sm:inline" />
            <span className="text-[#fac638] transition-all duration-500 inline-block">
              {WORDS[wordIndex]}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#ccbc8e] text-xs sm:text-sm md:text-base max-w-md md:max-w-lg leading-relaxed mb-5 sm:mb-6 px-2">
            Elevate your brand with high-impact video editing, stunning web applications, and viral social media strategies.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <a
              href="#work"
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#fac638] text-[#231e10] font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#fac638]/20"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </a>
            <a
              href="#websites"
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#352d18] border border-[#6a5a2f]/60 text-white font-semibold text-xs sm:text-sm hover:border-[#fac638] hover:scale-105 active:scale-95 transition-all"
            >
              <span>3D Web Showcase</span>
            </a>
          </div>

          {/* Scroll Down Prompt */}
          <div className="mt-6 md:mt-0 md:absolute md:bottom-5 flex flex-col items-center gap-1 text-[#ccbc8e]/70 text-[11px] sm:text-xs animate-bounce pointer-events-none">
            <span>Scroll to explore</span>
            <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </div>
        </div>

        {/* ── 2. Single Inverted White Circle Layer (Desktop Interactive Showcase) ── */}
        <div
          ref={circleLayerRef}
          className="hidden md:flex absolute inset-0 flex-col items-center justify-center text-center px-5 sm:px-10 z-20 bg-white text-[#231e10] pointer-events-auto [transform:translateZ(0)] [will-change:clip-path]"
          style={{
            clipPath: 'circle(0px at 50% 100%)',
          }}
        >
          {/* Inverted Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#231e10]/10 border border-[#231e10]/20 text-[#231e10] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Media Architecture</span>
          </div>

          {/* Reserved Spacer for 3D Logo */}
          <div className="w-[280px] h-[170px] mt-2 mb-11" aria-hidden="true" />

          {/* Inverted Headline */}
          <h1 className="text-[#231e10] text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-[1.15] mb-4">
            We Create <br className="hidden sm:inline" />
            <span className="text-[#231e10] underline decoration-[#fac638] underline-offset-8 transition-all duration-500 inline-block">
              {WORDS[wordIndex]}
            </span>
          </h1>

          {/* Inverted Subtitle */}
          <p className="text-[#231e10]/80 text-sm sm:text-base max-w-lg leading-relaxed mb-6 font-medium">
            Elevate your brand with high-impact video editing, stunning web applications, and viral social media strategies.
          </p>

          {/* Inverted CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#work"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#231e10] text-white font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4 text-[#fac638]" />
            </a>
            <a
              href="#websites"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#231e10]/30 text-[#231e10] font-semibold text-sm hover:border-[#231e10] hover:scale-105 active:scale-95 transition-all"
            >
              <span>3D Web Showcase</span>
            </a>
          </div>

          {/* Inverted Scroll Down Prompt */}
          <div className="absolute bottom-5 flex flex-col items-center gap-1 text-[#231e10]/60 text-xs animate-bounce pointer-events-none">
            <span>Scroll to explore</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* ── 3. Persistent 3D Logo Layer (Ultra-Fast 30KB WebP Image) ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-10 z-40 pointer-events-none">
          {/* Matching top offset spacer */}
          <div className="invisible inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs mb-2 sm:mb-3">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span>Spacer</span>
          </div>

          {/* Floating 3D Logo Presentation with Responsive Sizing */}
          <div className="relative w-[200px] sm:w-[240px] md:w-[280px] h-[130px] sm:h-[150px] md:h-[170px] flex items-center justify-center mt-2 mb-7 sm:mb-9 md:mb-11 pointer-events-auto">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 flex items-center justify-center animate-[float_3.5s_ease-in-out_infinite]">
              <picture>
                <source srcSet="/assets/images/logo-3d-mobile.webp" media="(max-width: 640px)" type="image/webp" />
                <source srcSet="/assets/images/logo-3d.webp" type="image/webp" />
                <img
                  src="/assets/images/logo-3d.png"
                  alt="Yukti Media 3D Logo"
                  width={176}
                  height={176}
                  className="w-full h-full object-contain select-none pointer-events-none"
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>
          </div>

          {/* Matching bottom offset spacer */}
          <div className="invisible text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 leading-[1.2] sm:leading-[1.15]">
            Spacer
          </div>
          <div className="invisible text-xs sm:text-sm md:text-base mb-5 sm:mb-6 leading-relaxed">
            Spacer
          </div>
          <div className="invisible flex gap-2.5 sm:gap-3">
            <div className="px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm">Spacer</div>
          </div>
        </div>
      </section>
    </div>
  );
}




