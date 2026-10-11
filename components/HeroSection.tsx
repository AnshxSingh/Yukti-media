'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface CartData {
  letter: string;
  color: string;
  highlight: string;
  tagline: string;
}

// 10 Carts spelling Y-U-K-T-I-M-E-D-I-A with glowing jewel colors
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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

const SVG_WIDTH = 1400;
const SVG_HEIGHT = 410;
const GROUND_Y = 380;

// Raised, smooth coaster curve:
// Starts offscreen left (-200) -> dips smoothly into the valley (x:610, y:270) -> climbs steep hill (x:1260, y:55) -> exits right (1650)
const TRACK_PATH_D =
  'M -200 95 C 160 115, 360 270, 610 270 C 860 270, 1040 105, 1260 55 C 1315 42, 1420 32, 1650 15';
const SPINE_PATH_D =
  'M -200 111 C 160 131, 360 286, 610 286 C 860 286, 1040 121, 1260 71 C 1315 58, 1420 48, 1650 31';

// Classical clean architectural roller coaster trestle pillars
const PILLARS = [
  { x: 60, topY: 104 },
  { x: 160, topY: 122 },
  { x: 260, topY: 152 },
  { x: 360, topY: 196 },
  { x: 460, topY: 242 },
  { x: 560, topY: 268 },
  { x: 660, topY: 268 },
  { x: 760, topY: 248 },
  { x: 860, topY: 208 },
  { x: 960, topY: 160 },
  { x: 1060, topY: 114 },
  { x: 1160, topY: 78 },
  { x: 1260, topY: 55 },
  { x: 1340, topY: 38 },
];

export default function HeroSection() {
  const trackPathRef = useRef<SVGPathElement>(null);

  // Position along track & physics
  const currentDistanceRef = useRef(620);
  const trackLengthRef = useRef(2000);
  const lastScrollYRef = useRef(0);

  const [activeToast, setActiveToast] = useState<{ letter: string; tagline: string } | null>(null);
  const [cartTransforms, setCartTransforms] = useState<
    Array<{ x: number; y: number; angle: number; wheelRotation: number }>
  >([]);
  const [leadNose, setLeadNose] = useState<{ x: number; y: number; angle: number }>({ x: 0, y: 0, angle: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Measure SVG track length once mounted
  useEffect(() => {
    if (trackPathRef.current) {
      trackLengthRef.current = trackPathRef.current.getTotalLength();
    }
  }, []);

  // Spark particle emitter helper
  const emitSparks = useCallback(() => {
    setCartTransforms((transforms) => {
      const tailCart = transforms[0]; // Tail cart 'Y'
      if (!tailCart) return transforms;

      const colors = ['#c084fc', '#f43f5e', '#38bdf8', '#facc15', '#ffffff'];
      const rad = (tailCart.angle * Math.PI) / 180;
      const newP: Particle = {
        x: tailCart.x - Math.cos(rad) * 26 + (Math.random() - 0.5) * 8,
        y: tailCart.y - Math.sin(rad) * 26 + (Math.random() - 0.5) * 8,
        vx: -Math.cos(rad) * (3 + Math.random() * 4),
        vy: (Math.random() - 0.5) * 3,
        size: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.9,
      };

      setParticles((prev) => [...prev.slice(-22), newP]);
      return transforms;
    });
  }, []);

  // Continuous Physics & Scroll-Boosted Coaster Ride:
  // The train runs autonomously in a continuous roller coaster loop,
  // and scrolling smoothly drives/accelerates it forward with sparks!
  useEffect(() => {
    let animId: number;
    let dist = 360;
    let speed = 1.35; // Base cruising speed
    let wheelDeg = 0;

    // Window scroll accelerations
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;

      if (delta > 3) {
        speed = Math.min(6.5, speed + delta * 0.08);
        emitSparks();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const loop = () => {
      const path = trackPathRef.current;
      if (!path) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const totalLen = trackLengthRef.current || path.getTotalLength();

      // Gravity simulation: faster in valleys, natural deceleration on hills
      const currentPoint = path.getPointAtLength(dist % totalLen);
      const gravityFactor = currentPoint.y > 220 ? 1.2 : 0.9;

      // Friction decay back towards cruising speed
      speed = Math.max(1.35, speed * 0.985);

      dist += speed * gravityFactor;
      // Seamless wrap-around after leaving the hill
      if (dist > totalLen + 550) {
        dist = 50;
      }

      currentDistanceRef.current = dist;
      wheelDeg = (wheelDeg + speed * 2.5) % 360;

      // Cart spacing: 56px per carriage
      const CART_SPACING = 56;
      const newTransforms: Array<{ x: number; y: number; angle: number; wheelRotation: number }> = [];

      // Lead nose position (ahead of cart 9 'A')
      const leadDist = Math.max(2, dist + 34);
      const wrappedLead = ((leadDist % totalLen) + totalLen) % totalLen;
      const pNose = path.getPointAtLength(wrappedLead);
      const pNoseNext = path.getPointAtLength((wrappedLead + 4) % totalLen);
      const noseAngle = Math.atan2(pNoseNext.y - pNose.y, pNoseNext.x - pNose.x) * (180 / Math.PI);
      setLeadNose({ x: pNose.x, y: pNose.y, angle: noseAngle });

      // Carts positioning:
      // Left-to-right spells Y-U-K-T-I-M-E-D-I-A:
      // Cart 0 ('Y') at tail, Cart 9 ('A') at head
      for (let i = 0; i < CARTS.length; i++) {
        const offsetFromLead = (CARTS.length - 1 - i) * CART_SPACING;
        const cartDist = dist - offsetFromLead;
        const wrappedDist = ((cartDist % totalLen) + totalLen) % totalLen;

        const p1 = path.getPointAtLength(wrappedDist);
        const p2 = path.getPointAtLength((wrappedDist + 3) % totalLen);
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

        newTransforms.push({
          x: p1.x,
          y: p1.y,
          angle,
          wheelRotation: wheelDeg,
        });
      }
      setCartTransforms(newTransforms);

      // Fade out particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            alpha: p.alpha - 0.05,
            size: Math.max(0.5, p.size * 0.94),
          }))
          .filter((p) => p.alpha > 0.05)
      );

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [emitSparks]);

  const handleCartClick = (cart: CartData) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setActiveToast({ letter: cart.letter, tagline: cart.tagline });
    toastTimeoutRef.current = setTimeout(() => {
      setActiveToast(null);
    }, 3200);
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-68px)] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-cream via-creamsoft to-cream dark:from-[#0c0a14] dark:via-[#140b26] dark:to-[#0c0a14] text-espresso select-none transition-colors duration-300 py-4">
      {/* Ambient Glows (Adapt to Light and Dark Mode) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[350px] bg-fuchsia-500/10 dark:bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none" />



      {/* ── Main Hero Content Header ── */}
      <div className="relative z-10 max-w-4xl mx-auto pt-6 sm:pt-10 px-4 flex flex-col items-center text-center">
        {/* Top Tag Pill with Official Yukti Media Logo */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-creamcard/90 dark:bg-[#180f2c]/85 border border-purpleborder shadow-lg shadow-purple-500/15 text-espresso text-xs font-semibold mb-2 backdrop-blur-md hover:border-purple transition-all">
          <div className="size-5 rounded-md overflow-hidden bg-purple/10 dark:bg-[#241744] border border-purple/30 flex items-center justify-center shrink-0">
            <img
              src="/favicon/yuktilogo.png"
              alt="Yukti Media Logo"
              className="w-full h-full object-contain p-0.5"
            />
          </div>
          <span className="tracking-wide font-bold text-espresso">Yukti Media</span>
          <span className="size-1.5 rounded-full bg-purple animate-ping" />
        </div>

        {/* Subhead Greeting */}
        <p className="text-purpledeep dark:text-purplelight text-xs sm:text-sm font-medium tracking-tight mb-1">
          Hi, we&apos;re Yukti Media, a creative digital agency.
        </p>

        {/* Editorial Headline with Purple/Fuchsia Gradient Italic Accent */}
        <h1
          className="text-espresso text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-black tracking-tight leading-[1.08] max-w-3xl mx-auto my-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          We craft the journey, so <br className="hidden sm:inline" />
          your audience{' '}
          <span
            className="bg-gradient-to-r from-purple via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent italic font-normal underline decoration-purple/40 underline-offset-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            enjoys the ride.
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-mocha text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mt-2.5 mb-1 font-sans">
          From viral high-retention video edits to bespoke 3D web applications, we turn casual scrollers into
          obsessed fans and high-ticket clients. Hop on and explore our work.
        </p>

        {/* Interactive Toast when a letter carriage is clicked */}
        <div
          className={`transition-all duration-300 h-6 px-3.5 rounded-full bg-creamcard dark:bg-[#180f2c] border border-purpleborder text-espresso text-[11px] font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/20 ${
            activeToast
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
          }`}
        >
          <span className="size-3.5 rounded-full bg-purple text-white font-bold flex items-center justify-center text-[9px]">
            {activeToast?.letter}
          </span>
          <span>{activeToast?.tagline}</span>
        </div>
      </div>

      {/* ── THE INTERACTIVE PURPLE ROLLER COASTER CANVAS ── */}
      <div className="relative w-full flex-1 min-h-[300px] max-h-[440px] my-auto overflow-hidden pointer-events-auto">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-full preserve-3d"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Metallic Neon Purple & Fuchsia Rail Gradients */}
            <linearGradient id="purpleRailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="45%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#6b21a8" />
            </linearGradient>

            <linearGradient id="purpleSpineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7e22ce" />
              <stop offset="100%" stopColor="#3b0764" />
            </linearGradient>

            {/* Trestle Support Steel Pillars Gradient */}
            <linearGradient id="purplePillarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7e22ce" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>

            {/* Glowing Headlight Flare Beam */}
            <radialGradient id="purpleHeadlightBeam" cx="10%" cy="50%" r="80%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.85)" />
              <stop offset="40%" stopColor="rgba(168, 85, 247, 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Glow filter for rail */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Cart Drop Shadow */}
            <filter id="purpleCartShadow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(168, 85, 247, 0.35)" />
            </filter>
          </defs>

          {/* ── 1. Structural Truss Framework (Trestles, Columns, X-Braces in Purple) ── */}
          <g className="structural-framework">
            {/* Ground Level Foundation Beam */}
            <line
              x1="0"
              y1={GROUND_Y}
              x2={SVG_WIDTH}
              y2={GROUND_Y}
              stroke="currentColor"
              className="text-purple/40 dark:text-purple/30"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Clean Architectural Trestles */}
            {PILLARS.map((pillar, idx) => {
              const nextPillar = PILLARS[idx + 1];

              return (
                <g key={`pillar-${idx}`}>
                  {/* Vertical Column */}
                  <line
                    x1={pillar.x}
                    y1={pillar.topY}
                    x2={pillar.x}
                    y2={GROUND_Y}
                    stroke="url(#purplePillarGrad)"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />

                  {/* Footing Base Plate */}
                  <rect
                    x={pillar.x - 6}
                    y={GROUND_Y - 3}
                    width="12"
                    height="5"
                    fill="#3b0764"
                    rx="1"
                  />

                  {/* Clean X-Bracing Truss between adjacent pillars */}
                  {nextPillar && (
                    <g opacity="0.32" stroke="#a855f7" strokeWidth="1.2">
                      <line x1={pillar.x} y1={pillar.topY + 30} x2={nextPillar.x} y2={GROUND_Y - 10} />
                      <line x1={pillar.x} y1={GROUND_Y - 10} x2={nextPillar.x} y2={nextPillar.topY + 30} />
                      <line x1={pillar.x} y1={GROUND_Y - 10} x2={nextPillar.x} y2={GROUND_Y - 10} />
                      <line
                        x1={pillar.x}
                        y1={(pillar.topY + GROUND_Y) / 2}
                        x2={nextPillar.x}
                        y2={(nextPillar.topY + GROUND_Y) / 2}
                      />
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* ── 2. Track Ties & Double Tubular Rail Pipes ── */}
          {/* Sub-Track Tubular Spine */}
          <path
            d={SPINE_PATH_D}
            fill="none"
            stroke="url(#purpleSpineGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Ties connecting Rail and Spine (Dashed Pipe Crossbars) */}
          <path
            d={TRACK_PATH_D}
            fill="none"
            stroke="#a855f7"
            strokeWidth="10"
            strokeDasharray="2.5 14"
            opacity="0.8"
          />

          {/* Main Top Rail Pipe (Neon Purple Glow) */}
          <path
            ref={trackPathRef}
            d={TRACK_PATH_D}
            fill="none"
            stroke="url(#purpleRailGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#neonGlow)"
          />

          {/* ── 3. High-Speed Spark Particles ── */}
          {particles.map((p, idx) => (
            <circle
              key={`p-${idx}`}
              cx={p.x}
              cy={p.y}
              r={p.size}
              fill={p.color}
              opacity={p.alpha}
            />
          ))}

          {/* ── 4. Lead Train Nose with Forward Glowing Headlight ── */}
          {leadNose.x > 0 && (
            <g transform={`translate(${leadNose.x}, ${leadNose.y}) rotate(${leadNose.angle})`}>
              {/* Projecting Cone Headlight Beam */}
              <polygon
                points="16,-6 140,-26 140,26 16,6"
                fill="url(#purpleHeadlightBeam)"
                opacity="0.65"
              />

              {/* Front Aerodynamic Bullet Shell */}
              <path
                d="M 6,-11 C 18,-11 26,-4 26,0 C 26,4 18,11 6,11 Z"
                fill="#fb7185"
                stroke="#fda4af"
                strokeWidth="1.5"
              />

              {/* Glowing LED Headlight Bulb */}
              <circle cx="21" cy="0" r="3.5" fill="#fef08a" filter="url(#neonGlow)" />
              <circle cx="21" cy="0" r="2" fill="#ffffff" />
            </g>
          )}

          {/* ── 5. The 10 Candy-Colored Letter Carriages ── */}
          {cartTransforms.map((tf, index) => {
            const cart = CARTS[index];
            if (!cart) return null;

            return (
              <g
                key={`cart-${cart.letter}-${index}`}
                transform={`translate(${tf.x}, ${tf.y}) rotate(${tf.angle})`}
                className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
                onClick={() => handleCartClick(cart)}
              >
                {/* ── Under-Carriage Chassis ── */}
                <g filter="url(#purpleCartShadow)">
                  {/* Wheel Assembly 1 (Rear) */}
                  <g transform={`translate(-18, 9) rotate(${tf.wheelRotation})`}>
                    <circle cx="0" cy="0" r="5" fill="#1e1b4b" stroke="#7e22ce" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="2" fill="#c084fc" />
                    <line x1="-4" y1="0" x2="4" y2="0" stroke="#a855f7" strokeWidth="1" />
                    <line x1="0" y1="-4" x2="0" y2="4" stroke="#a855f7" strokeWidth="1" />
                  </g>

                  {/* Wheel Assembly 2 (Front) */}
                  <g transform={`translate(18, 9) rotate(${tf.wheelRotation})`}>
                    <circle cx="0" cy="0" r="5" fill="#1e1b4b" stroke="#7e22ce" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="2" fill="#c084fc" />
                    <line x1="-4" y1="0" x2="4" y2="0" stroke="#a855f7" strokeWidth="1" />
                    <line x1="0" y1="-4" x2="0" y2="4" stroke="#a855f7" strokeWidth="1" />
                  </g>

                  {/* Cart Base Frame Plate */}
                  <rect
                    x="-25"
                    y="0"
                    width="50"
                    height="7"
                    rx="3"
                    fill="#311042"
                    stroke="#a855f7"
                    strokeWidth="1.2"
                  />

                  {/* Mechanical Coupler Link to next cart */}
                  {index < CARTS.length - 1 && (
                    <line
                      x1="24"
                      y1="3"
                      x2="32"
                      y2="3"
                      stroke="#c084fc"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  )}
                </g>

                {/* ── 3D Candy Letter Cube / Carriage Body ── */}
                <g transform="translate(0, -18)">
                  {/* Outer Glowing Cube Shell */}
                  <rect
                    x="-20"
                    y="-19"
                    width="40"
                    height="38"
                    rx="10"
                    fill={cart.color}
                    stroke={cart.highlight}
                    strokeWidth="2"
                    filter="url(#purpleCartShadow)"
                  />

                  {/* Glossy Top 3D Curvature Highlight */}
                  <path
                    d="M -16,-17 L 16,-17 C 18,-17 18,-11 16,-11 L -16,-11 C -18,-11 -18,-17 -16,-17 Z"
                    fill="#ffffff"
                    opacity="0.45"
                  />

                  {/* Bold Candy Letter Centered Inside Carriage */}
                  <text
                    x="0"
                    y="2"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#ffffff"
                    fontSize="20"
                    fontWeight="900"
                    fontFamily="Inter, sans-serif"
                    style={{
                      textShadow: '0 2px 5px rgba(0,0,0,0.5)',
                    }}
                  >
                    {cart.letter}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Exploration Scroll Anchor ── */}
      <div className="relative z-20 pb-2 flex flex-col items-center justify-center gap-1">
        <a
          href="#services"
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-creamcard/90 dark:bg-[#180f2c]/80 border border-purpleborder text-espresso hover:text-purple text-xs font-semibold shadow-md backdrop-blur-md transition-all hover:scale-105 no-underline group"
        >
          <span>Explore Yukti Media</span>
          <ChevronDown className="w-3.5 h-3.5 text-purple group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
