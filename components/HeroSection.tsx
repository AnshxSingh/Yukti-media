'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

const WORDS = [
  'Videos that Convert',
  'Dynamic Web Apps',
  'Scroll-Stopping Reels',
  'Viral Social Media',
  'Award-Winning Brands'
];

const BALL_SIZE = 360; // Base diameter during travel

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll measurement state
  const [scrollY, setScrollY] = useState(0);
  const [viewH, setViewH] = useState(800);
  const [viewW, setViewW] = useState(1200);

  // Rotating dynamic headline
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  // Track window scroll & dimensions for Inversion Circle Animation
  useEffect(() => {
    const measure = () => {
      setViewH(window.innerHeight);
      setViewW(window.innerWidth);
    };
    measure();

    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const topOffset = -rect.top;
      setScrollY(Math.max(0, topOffset));
    };

    window.addEventListener('resize', measure);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 3D Logo Setup (Three.js)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(340, 240);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 340 / 240, 0.01, 100);
    camera.position.set(0, 0, 4);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfac638, 3.8);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x88aaff, 1.4);
    fillLight.position.set(-4, -2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfac638, 2.2);
    rimLight.position.set(0, -3, -4);
    scene.add(rimLight);

    const sparkle = new THREE.PointLight(0xfac638, 4, 6);
    sparkle.position.set(1.5, 2, 2);
    scene.add(sparkle);

    // Load logo.glb
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.167.0/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    let model: THREE.Group | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let isRevealed = false;
    let revealProgress = 0;
    const clock = new THREE.Clock();

    // Fixed Top-Right Tilt Angle
    const TILT_X = -0.28;
    const TILT_Y = 0.42;
    const TILT_Z = -0.08;

    loader.load(
      '/assets/logo.glb',
      (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.2 / maxDim;

        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        model.rotation.set(TILT_X, TILT_Y, TILT_Z);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        model.scale.setScalar(0);
        scene.add(model);

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => mixer?.clipAction(clip).play());
        }

        setTimeout(() => { isRevealed = true; }, 300);
      },
      undefined,
      (err) => console.warn('Logo 3D load error:', err)
    );

    const easeOutElastic = (t: number) => {
      if (t === 0 || t === 1) return t;
      return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1;
    };

    let reqId: number;
    let floatTime = 0;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (mixer) mixer.update(delta);

      if (model) {
        if (isRevealed && revealProgress < 1) {
          revealProgress = Math.min(revealProgress + delta / 1.4, 1);
          model.scale.setScalar(Math.max(0, easeOutElastic(revealProgress) * 1.0));
        }

        floatTime += delta;
        model.position.y = Math.sin(floatTime * 0.85) * 0.09;
        model.rotation.set(TILT_X, TILT_Y, TILT_Z);

        sparkle.position.x = Math.sin(elapsed * 1.1) * 2.2;
        sparkle.position.y = Math.cos(elapsed * 0.7) * 1.8;
        sparkle.intensity = 3.5 + Math.sin(elapsed * 2.2) * 1.8;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      renderer.dispose();
    };
  }, []);

  // Calculate Inversion Geometry
  const phase1Range = viewH * 0.75;
  const phase2Range = viewH * 0.75;

  const p1 = clamp(scrollY / phase1Range);
  const p2 = clamp((scrollY - phase1Range) / phase2Range);

  // Power4 InOut for smooth rise
  const p1e = p1 < 0.5 ? 8 * p1 ** 4 : 1 - (-2 * p1 + 2) ** 4 / 2;
  // EaseIn square for expansion
  const p2e = p2 * p2;

  // Exact single circle geometry
  const yOff = (1 - p1e) * (viewH / 2 + BALL_SIZE / 2);
  const coverSize = Math.max(viewW, viewH) * 2.8;
  const ballSize = BALL_SIZE + p2e * (coverSize - BALL_SIZE);
  const clipX = viewW / 2;
  const clipY = viewH / 2 + yOff;
  const clipR = ballSize / 2;

  return (
    <div ref={trackRef} className="relative w-full h-[250vh]">
      {/* Sticky Hero Viewport */}
      <section className="sticky top-0 h-screen w-full overflow-hidden bg-[#231e10] flex items-center justify-center">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fac638]/5 rounded-full blur-3xl pointer-events-none" />

        {/* ── 1. Base Dark Layer ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-10 z-10 pointer-events-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fac638]/10 border border-[#fac638]/30 text-[#fac638] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Media Architecture</span>
          </div>

          {/* Reserved Spacer for 3D Logo (which floats on top at z-40) */}
          <div className="w-[340px] h-[210px] my-1" aria-hidden="true" />

          {/* Dynamic Headline */}
          <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-[1.15] mb-3">
            We Create <br className="hidden sm:inline" />
            <span className="text-[#fac638] transition-all duration-500 inline-block">
              {WORDS[wordIndex]}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#ccbc8e] text-sm sm:text-base max-w-lg leading-relaxed mb-6">
            Elevate your brand with high-impact video editing, stunning web applications, and viral social media strategies.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#work"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#fac638] text-[#231e10] font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#fac638]/15"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#websites"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#352d18] border border-[#6a5a2f]/60 text-white font-semibold text-sm hover:border-[#fac638] hover:scale-105 active:scale-95 transition-all"
            >
              <span>3D Web Showcase</span>
            </a>
          </div>

          {/* Scroll Down Prompt */}
          <div className="absolute bottom-6 flex flex-col items-center gap-1 text-[#ccbc8e]/70 text-xs animate-bounce pointer-events-none">
            <span>Scroll to reveal</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* ── 2. Single Inverted White Circle Layer (Identical Content & Layout, Inverted Color Palette) ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-10 z-20 bg-white text-[#231e10] pointer-events-auto will-change-[clip-path]"
          style={{
            clipPath: `circle(${clipR}px at ${clipX}px ${clipY}px)`,
          }}
        >
          {/* Inverted Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#231e10]/10 border border-[#231e10]/20 text-[#231e10] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Media Architecture</span>
          </div>

          {/* Reserved Spacer for 3D Logo (which floats on top at z-40) */}
          <div className="w-[340px] h-[210px] my-1" aria-hidden="true" />

          {/* Inverted Headline */}
          <h1 className="text-[#231e10] text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-[1.15] mb-3">
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
          <div className="absolute bottom-6 flex flex-col items-center gap-1 text-[#231e10]/60 text-xs animate-bounce pointer-events-none">
            <span>Scroll to reveal</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* ── 3. Persistent 3D Logo Layer (Always on Top of the Circle Effect) ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-10 z-40 pointer-events-none">
          {/* Matching top offset spacer */}
          <div className="invisible inline-flex items-center gap-2 px-4 py-1.5 text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spacer</span>
          </div>

          {/* 3D Logo Canvas — floats prominently over the rising & expanding circle */}
          <div className="relative w-[340px] h-[210px] flex items-center justify-center my-1 pointer-events-auto">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>

          {/* Matching bottom offset spacer */}
          <div className="invisible text-3xl sm:text-5xl lg:text-6xl mb-3 leading-[1.15]">
            Spacer
          </div>
          <div className="invisible text-sm sm:text-base mb-6 leading-relaxed">
            Spacer
          </div>
          <div className="invisible flex gap-3">
            <div className="px-6 py-3 text-sm">Spacer</div>
          </div>
        </div>
      </section>
    </div>
  );
}
