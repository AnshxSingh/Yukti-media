'use client';

import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface CartData {
  letter: string;
  color: string;
  highlight: string;
  tagline: string;
}

const CARTS: CartData[] = [
  { letter: 'Y', color: '#f43f5e', highlight: '#fecdd3', tagline: 'Yielding 1M+ Organic Views' },
  { letter: 'U', color: '#fb923c', highlight: '#fed7aa', tagline: 'Ultra-Smooth 3D Web Apps' },
  { letter: 'K', color: '#38bdf8', highlight: '#bae6fd', tagline: 'Killer Audience Retention' },
  { letter: 'T', color: '#34d399', highlight: '#a7f3d0', tagline: 'Top-Tier Cinematic Video Editing' },
  { letter: 'I', color: '#e879f9', highlight: '#f5d0fe', tagline: 'Impactful Visual Storytelling' },
  { letter: 'M', color: '#a78bfa', highlight: '#ddd6fe', tagline: 'Modern Next.js 14 Architecture' },
  { letter: 'E', color: '#facc15', highlight: '#fef08a', tagline: 'Exponential SMM Growth' },
  { letter: 'D', color: '#2dd4bf', highlight: '#99f6e4', tagline: 'Dynamic Motion Design & GSAP' },
  { letter: 'I', color: '#c084fc', highlight: '#e9d5ff', tagline: 'Irresistible Conversion Rates' },
  { letter: 'A', color: '#fb7185', highlight: '#fecdd3', tagline: 'Award-Winning Brand Quality' },
];

interface ParticleState { vx: number; vy: number; alpha: number; }

const SVG_WIDTH = 1400;
const SVG_HEIGHT = 380;
const GROUND_Y = 350;
const CART_SPACING = 48;

// Track starts at x=10 and ends at x=1385, guaranteeing the whole train stays 100% inside the viewport at all times
const TRACK_PATH_D = 'M 10 110 C 180 115, 360 260, 600 260 C 840 260, 1020 100, 1220 50 C 1270 40, 1320 34, 1385 30';
const SPINE_PATH_D = 'M 10 126 C 180 131, 360 276, 600 276 C 840 276, 1020 116, 1220 66 C 1270 56, 1320 50, 1385 46';
const PILLARS = [
  { x: 50, topY: 108 }, { x: 150, topY: 122 }, { x: 250, topY: 152 },
  { x: 350, topY: 196 }, { x: 450, topY: 242 }, { x: 550, topY: 260 },
  { x: 650, topY: 260 }, { x: 750, topY: 242 }, { x: 850, topY: 200 },
  { x: 950, topY: 150 }, { x: 1050, topY: 106 }, { x: 1150, topY: 72 },
  { x: 1250, topY: 48 }, { x: 1340, topY: 34 },
];

export default function TrainHeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackPathRef = useRef<SVGPathElement>(null);
  const cartRefs = useRef<(SVGGElement | null)[]>([]);
  const wheelRefs = useRef<(SVGGElement | null)[][]>([]);
  const noseRef = useRef<SVGGElement>(null);
  const particlesRef = useRef<SVGGElement>(null);
  const particleDataRef = useRef<Map<SVGCircleElement, ParticleState>>(new Map());
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);
  const trackLengthRef = useRef(1500);
  const lastProgressRef = useRef(0);
  const lastSparkTimeRef = useRef(0);
  const lastSparkProgressRef = useRef(0);
  const metricsRef = useRef<{ top: number; scrollable: number }>({ top: 0, scrollable: 1 });
  const [activeToast, setActiveToast] = useState<{ letter: string; tagline: string } | null>(null);
  const [isDone, setIsDone] = useState(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const placeTrainAtProgress = useCallback((progress: number) => {
    const path = trackPathRef.current;
    if (!path) return;
    const totalLen = trackLengthRef.current;
    
    // Total train span for 10 carts: (10 - 1) * 48 = 432px
    // At progress = 0: cart Y is at d = 30 (x ~ 40), cart A is at d = 462. All carts 100% visible on-screen!
    // At progress = 1: lead cart A stops at totalLen - 35, cart Y is at totalLen - 467. All carts 100% visible on-screen!
    const trainSpan = (CARTS.length - 1) * CART_SPACING;
    const startLeadDist = 30 + trainSpan;
    const endLeadDist = Math.max(startLeadDist + 80, totalLen - 35);
    const leadDist = startLeadDist + progress * (endLeadDist - startLeadDist);
    const wheelDeg = (leadDist * 2.8) % 360;

    // Locomotive nose placed directly at the front of lead cart A
    if (noseRef.current) {
      const wl = Math.min(leadDist + 22, totalLen);
      const pN = path.getPointAtLength(wl);
      const pN2 = path.getPointAtLength(Math.min(wl + 3, totalLen));
      const ang = Math.atan2(pN2.y - pN.y, pN2.x - pN.x) * (180 / Math.PI);
      noseRef.current.setAttribute('transform', `translate(${pN.x.toFixed(2)},${pN.y.toFixed(2)}) rotate(${ang.toFixed(2)})`);
    }

    // Position each cart on top of the rail
    for (let i = 0; i < CARTS.length; i++) {
      const g = cartRefs.current[i];
      if (!g) continue;
      const offset = (CARTS.length - 1 - i) * CART_SPACING;
      const cd = Math.max(0, Math.min(leadDist - offset, totalLen));
      const p1 = path.getPointAtLength(cd);
      const p2 = path.getPointAtLength(Math.min(cd + 3, totalLen));
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
      g.setAttribute('transform', `translate(${p1.x.toFixed(2)},${p1.y.toFixed(2)}) rotate(${angle.toFixed(2)})`);
      
      const wheels = wheelRefs.current[i];
      if (wheels) {
        const d = wheelDeg.toFixed(2);
        wheels[0]?.setAttribute('transform', `translate(-15,-4) rotate(${d})`);
        wheels[1]?.setAttribute('transform', `translate(15,-4) rotate(${d})`);
      }
    }

    const pct = Math.round(progress * 100);
    if (progressBarRef.current) progressBarRef.current.style.width = `${pct}%`;
    if (progressLabelRef.current) progressLabelRef.current.textContent = `${pct}%`;
  }, []);

  const emitSparks = useCallback(() => {
    const now = performance.now();
    if (now - lastSparkTimeRef.current < 65) return;
    if (Math.abs(lastProgressRef.current - lastSparkProgressRef.current) < 0.002) return;
    lastSparkTimeRef.current = now;
    lastSparkProgressRef.current = lastProgressRef.current;

    const path = trackPathRef.current;
    const pg = particlesRef.current;
    if (!path || !pg) return;
    const totalLen = trackLengthRef.current;
    const trainSpan = (CARTS.length - 1) * CART_SPACING;
    const startLeadDist = 30 + trainSpan;
    const endLeadDist = Math.max(startLeadDist + 80, totalLen - 35);
    const leadDist = startLeadDist + lastProgressRef.current * (endLeadDist - startLeadDist);
    const tailDist = Math.max(0, Math.min(leadDist - trainSpan, totalLen));
    const p = path.getPointAtLength(tailDist);
    const pN = path.getPointAtLength(Math.min(tailDist + 3, totalLen));
    const rad = Math.atan2(pN.y - p.y, pN.x - p.x);
    const colors = ['#c084fc', '#f43f5e', '#38bdf8', '#facc15', '#fff'];
    const NS = 'http://www.w3.org/2000/svg';
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', (p.x - Math.cos(rad) * 22 + (Math.random() - 0.5) * 6).toFixed(2));
    c.setAttribute('cy', (p.y - Math.sin(rad) * 22 + (Math.random() - 0.5) * 6).toFixed(2));
    c.setAttribute('r', (2 + Math.random() * 2.5).toFixed(2));
    c.setAttribute('fill', colors[Math.floor(Math.random() * colors.length)]);
    c.setAttribute('opacity', '0.9');
    pg.appendChild(c);
    particleDataRef.current.set(c, { vx: -Math.cos(rad) * (3 + Math.random() * 3), vy: (Math.random() - 0.5) * 2.5, alpha: 0.9 });
    if (particleDataRef.current.size > 12) {
      const oldest = particleDataRef.current.keys().next().value;
      if (oldest) { oldest.remove(); particleDataRef.current.delete(oldest); }
    }
  }, []);

  const tickParticles = useCallback(() => {
    particleDataRef.current.forEach((data, el) => {
      const cx = parseFloat(el.getAttribute('cx') || '0') + data.vx;
      const cy = parseFloat(el.getAttribute('cy') || '0') + data.vy;
      data.alpha -= 0.06;
      if (data.alpha <= 0.05) { el.remove(); particleDataRef.current.delete(el); return; }
      el.setAttribute('cx', cx.toFixed(2));
      el.setAttribute('cy', cy.toFixed(2));
      el.setAttribute('r', Math.max(0.5, parseFloat(el.getAttribute('r') || '3') * 0.93).toFixed(2));
      el.setAttribute('opacity', data.alpha.toFixed(3));
    });
  }, []);

  useLayoutEffect(() => {
    const path = trackPathRef.current;
    if (path) trackLengthRef.current = path.getTotalLength();
    placeTrainAtProgress(0);

    const updateMetrics = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const top = rect.top + scrollTop;
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      metricsRef.current = { top, scrollable: Math.max(1, scrollable) };
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics, { passive: true });
    return () => window.removeEventListener('resize', updateMetrics);
  }, [placeTrainAtProgress]);

  useEffect(() => {
    let rafId: number;
    let pending = false;
    const onScroll = () => {
      if (pending) return;
      pending = true;
      rafId = requestAnimationFrame(() => {
        pending = false;
        const scrollY = window.scrollY || window.pageYOffset;
        const scrolled = scrollY - metricsRef.current.top;
        const progress = Math.max(0, Math.min(1, scrolled / metricsRef.current.scrollable));
        lastProgressRef.current = progress;
        placeTrainAtProgress(progress);
        emitSparks();
        tickParticles();
        if (progress >= 0.98) setIsDone(true);
        else setIsDone(false);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, [placeTrainAtProgress, emitSparks, tickParticles]);

  const handleCartClick = (cart: CartData) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setActiveToast({ letter: cart.letter, tagline: cart.tagline });
    toastTimeoutRef.current = setTimeout(() => setActiveToast(null), 3200);
  };

  return (
    <div ref={wrapperRef} style={{ height: '300vh' }} className="relative w-full">
      {/* Sticky viewport-height container with comfortable top & bottom breathing room */}
      <section className="sticky top-0 w-full h-screen pt-14 sm:pt-20 pb-4 sm:pb-6 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-cream via-creamsoft/40 to-cream dark:from-[#09090b] dark:via-[#0e0d13] dark:to-[#09090b] text-espresso select-none transition-colors duration-300">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[350px] h-[300px] bg-fuchsia-500/10 dark:bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Hero Top Content (Header & Subtitles) - 100% Responsive, Auto-Wrapping, Never Clipped */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          {/* Brand Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-creamcard/90 dark:bg-[#141418] border border-purpleborder shadow-sm text-espresso text-[11px] sm:text-xs font-semibold mb-2 backdrop-blur-md">
            <div className="size-4 rounded-md overflow-hidden bg-purple/10 border border-purple/30 flex items-center justify-center shrink-0">
              <img src="/favicon/yuktilogo.png" alt="Yukti Media Logo" className="w-full h-full object-contain p-0.5" />
            </div>
            <span className="tracking-wide font-bold text-espresso">Yukti Media</span>
            <span className="size-1.5 rounded-full bg-purple" />
          </div>

          <p className="text-purpledeep dark:text-purplelight text-xs sm:text-sm font-semibold tracking-wide uppercase mb-1">
            High-Retention Video Editing • Web Development • Brand Growth
          </p>

          <h1 className="w-full text-espresso text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-black tracking-tight leading-[1.15] max-w-2xl mx-auto my-1.5 break-words" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            We Engineer Digital Experiences That{' '}
            <span className="inline-block pb-0.5 bg-gradient-to-r from-purple via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent italic font-normal underline decoration-purple/40 underline-offset-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Captivate &amp; Convert.
            </span>
          </h1>

          <p className="text-mocha text-xs sm:text-sm md:text-base max-w-md sm:max-w-xl mx-auto leading-relaxed mt-1.5 mb-2 font-sans px-2">
            From viral high-retention video edits to bespoke modern websites — we turn casual viewers into obsessed fans and paying clients. Hop on and explore our work.
          </p>

          {/* Interactive Letter Toast */}
          <div className={`transition-all duration-300 h-6 px-3 rounded-full bg-creamcard dark:bg-[#141418] border border-purpleborder text-espresso text-[11px] font-semibold flex items-center gap-2 shadow-md shadow-purple-600/10 ${activeToast ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <span className="size-3.5 rounded-full bg-purple text-white font-bold flex items-center justify-center text-[9px]">{activeToast?.letter}</span>
            <span>{activeToast?.tagline}</span>
          </div>
        </div>

        {/* Roller Coaster SVG Canvas - Perfectly Contained, Scaling Smoothly on All Viewports */}
        <div className="relative w-full flex-1 min-h-[170px] sm:min-h-[200px] max-h-[300px] sm:max-h-[360px] overflow-hidden pointer-events-auto my-auto flex items-center justify-center">
          <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full h-full max-w-full" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="purpleRailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" /><stop offset="45%" stopColor="#a855f7" /><stop offset="100%" stopColor="#6b21a8" />
              </linearGradient>
              <linearGradient id="purpleSpineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7e22ce" /><stop offset="100%" stopColor="#3b0764" />
              </linearGradient>
              <linearGradient id="purplePillarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7e22ce" /><stop offset="50%" stopColor="#a855f7" /><stop offset="100%" stopColor="#581c87" />
              </linearGradient>
              <radialGradient id="purpleHeadlightBeam" cx="10%" cy="50%" r="80%">
                <stop offset="0%" stopColor="rgba(250,204,21,0.85)" /><stop offset="40%" stopColor="rgba(168,85,247,0.3)" /><stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="purpleCartShadow" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(168,85,247,0.35)" />
              </filter>
            </defs>

            {/* Base Support Line */}
            <line x1="0" y1={GROUND_Y} x2={SVG_WIDTH} y2={GROUND_Y} stroke="#a855f7" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />

            {/* Vertical Support Pillars & Cross Braces */}
            {PILLARS.map((pillar, idx) => {
              const next = PILLARS[idx + 1];
              return (
                <g key={idx}>
                  <line x1={pillar.x} y1={pillar.topY} x2={pillar.x} y2={GROUND_Y} stroke="url(#purplePillarGrad)" strokeWidth="3" strokeLinecap="round" />
                  <rect x={pillar.x - 5} y={GROUND_Y - 3} width="10" height="5" fill="#3b0764" rx="1" />
                  {next && (<g opacity="0.3" stroke="#a855f7" strokeWidth="1.2">
                    <line x1={pillar.x} y1={pillar.topY + 25} x2={next.x} y2={GROUND_Y - 10} />
                    <line x1={pillar.x} y1={GROUND_Y - 10} x2={next.x} y2={next.topY + 25} />
                    <line x1={pillar.x} y1={GROUND_Y - 10} x2={next.x} y2={GROUND_Y - 10} />
                    <line x1={pillar.x} y1={(pillar.topY + GROUND_Y) / 2} x2={next.x} y2={(next.topY + GROUND_Y) / 2} />
                  </g>)}
                </g>
              );
            })}

            {/* Track Spine & Rails */}
            <path d={SPINE_PATH_D} fill="none" stroke="url(#purpleSpineGrad)" strokeWidth="5" strokeLinecap="round" />
            <path d={TRACK_PATH_D} fill="none" stroke="#a855f7" strokeWidth="9" strokeDasharray="2.5 14" opacity="0.8" />
            <path ref={trackPathRef} d={TRACK_PATH_D} fill="none" stroke="url(#purpleRailGrad)" strokeWidth="4" strokeLinecap="round" filter="url(#neonGlow)" />

            {/* Particle Sparks */}
            <g ref={particlesRef} />

            {/* Train Locomotive Nose & Headlight */}
            <g ref={noseRef}>
              <polygon points="14,-5 130,-24 130,24 14,5" fill="url(#purpleHeadlightBeam)" opacity="0.65" />
              <path d="M 4,-10 C 16,-10 24,-4 24,0 C 24,4 16,10 4,10 Z" fill="#fb7185" stroke="#fda4af" strokeWidth="1.5" />
              <circle cx="19" cy="0" r="3.2" fill="#fef08a" filter="url(#neonGlow)" />
              <circle cx="19" cy="0" r="1.8" fill="#ffffff" />
            </g>

            {/* Roller Coaster Carts (Y-U-K-T-I-M-E-D-I-A) */}
            {CARTS.map((cart, index) => (
              <g key={`cart-${index}`} ref={(el) => { cartRefs.current[index] = el; }} className="cursor-pointer" onClick={() => handleCartClick(cart)}>
                <g filter="url(#purpleCartShadow)">
                  {/* Wheel Assemblies (Sitting directly on top of the rail) */}
                  <g ref={(el) => { if (!wheelRefs.current[index]) wheelRefs.current[index] = [null, null]; wheelRefs.current[index][0] = el; }}>
                    <circle cx="0" cy="0" r="5" fill="#1e1b4b" stroke="#7e22ce" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="2" fill="#c084fc" />
                    <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#a855f7" strokeWidth="1" />
                    <line x1="0" y1="-3.5" x2="0" y2="3.5" stroke="#a855f7" strokeWidth="1" />
                  </g>
                  <g ref={(el) => { if (!wheelRefs.current[index]) wheelRefs.current[index] = [null, null]; wheelRefs.current[index][1] = el; }}>
                    <circle cx="0" cy="0" r="5" fill="#1e1b4b" stroke="#7e22ce" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="2" fill="#c084fc" />
                    <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#a855f7" strokeWidth="1" />
                    <line x1="0" y1="-3.5" x2="0" y2="3.5" stroke="#a855f7" strokeWidth="1" />
                  </g>

                  {/* Chassis Base Plate */}
                  <rect x="-21" y="-7" width="42" height="5" rx="2" fill="#311042" stroke="#a855f7" strokeWidth="1.2" />

                  {/* Coupler Hitch linking to next cart */}
                  {index < CARTS.length - 1 && (
                    <line x1="20" y1="-5" x2="30" y2="-5" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
                  )}
                </g>

                {/* Main Cart Body & Letter */}
                <g>
                  <rect x="-18" y="-36" width="36" height="30" rx="8" fill={cart.color} stroke={cart.highlight} strokeWidth="2" filter="url(#purpleCartShadow)" />
                  <path d="M -14,-34 L 14,-34 C 16,-34 16,-28 14,-28 L -14,-28 C -16,-28 -16,-34 -14,-34 Z" fill="#ffffff" opacity="0.45" />
                  <text x="0" y="-21" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="17" fontWeight="900" fontFamily="Inter,sans-serif">{cart.letter}</text>
                </g>
              </g>
            ))}
          </svg>
        </div>

        {/* Bottom Progress Bar & Unlock Button */}
        <div className="relative z-20 pb-2 sm:pb-3 flex flex-col items-center gap-2 px-6">
          <div className="w-full max-w-xs sm:max-w-sm flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-espresso/10 dark:bg-white/10 overflow-hidden">
              <div ref={progressBarRef} className="h-full rounded-full bg-gradient-to-r from-purple via-fuchsia-500 to-indigo-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" style={{ width: '0%', transition: 'width 80ms linear' }} />
            </div>
            <span ref={progressLabelRef} className="text-[10px] font-bold text-purple tabular-nums w-8 text-right shrink-0">0%</span>
          </div>
          {isDone ? (
            <a
              href="#services"
              style={{ background: 'linear-gradient(135deg, #6b21a8 0%, #4c1d95 100%)', color: '#ffffff' }}
              className="btn-brand-gradient flex items-center gap-2 px-5 py-2 rounded-full text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-900/30 hover:scale-105 active:scale-95 transition-all no-underline animate-fadeIn hover:brightness-110 cursor-pointer"
            >
              <span>Explore Yukti Media</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </a>
          ) : (
            <p className="text-mocha text-[10px] sm:text-xs font-medium animate-pulse select-none">
              &#8595; Scroll to ride the coaster
            </p>
          )}
        </div>
      </section>
    </div>
  );
}