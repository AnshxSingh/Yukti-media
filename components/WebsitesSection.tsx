'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 0,
    title: 'Aura Luxe',
    subtitle: 'Luxury E-Commerce Platform',
    category: 'E-Commerce',
    description: 'A high-conversion online boutique for a luxury fashion brand. Features seamless checkout, dynamic product showcases, and lightning-fast loading.',
    metrics: ['+185% Conversion', 'Sub-1s Load', '5★ UX Rating'],
    tech: ['Next.js', 'Tailwind CSS', 'Stripe', 'Framer Motion'],
    image: '/assets/images/websites/site1.jpg',
    accentColor: '#fac638'
  },
  {
    id: 1,
    title: 'Nexus Analytics',
    subtitle: 'SaaS Growth & Metrics Dashboard',
    category: 'SaaS Platform',
    description: 'An intuitive analytics platform built for high-growth startups. Real-time data streams, custom reporting widgets, and modern responsive charts.',
    metrics: ['+240% Signups', 'Real-time Sync', '99.9% Uptime'],
    tech: ['React', 'TypeScript', 'Supabase', 'Chart.js'],
    image: '/assets/images/websites/site2.jpg',
    accentColor: '#38bdf8'
  },
  {
    id: 2,
    title: 'Luminary Studio',
    subtitle: 'AI Media & Prompt Platform',
    category: 'AI Creative Platform',
    description: 'A sleek, futuristic portal for an AI creative suite. Features interactive prompt playgrounds, live video renderers, and viral onboarding flows.',
    metrics: ['+320% User Growth', 'AI-Powered UX', 'Viral Launch'],
    tech: ['Vite', 'Three.js', 'GSAP', 'Tailwind'],
    image: '/assets/images/websites/site3.jpg',
    accentColor: '#d946ef'
  },
  {
    id: 3,
    title: 'Verdant Living',
    subtitle: 'Modern Architecture & Interiors',
    category: 'Brand & Agency',
    description: 'An immersive editorial portfolio showcasing luxury interior design and architectural projects with smooth parallax storytelling and lead booking.',
    metrics: ['+95% Qualified Leads', 'Award Winner', 'Premium Visuals'],
    tech: ['Next.js', 'WebGL', 'Tailwind CSS', 'Prismic'],
    image: '/assets/images/websites/site4.jpg',
    accentColor: '#34d399'
  }
];

export default function WebsitesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const loadedImagesRef = useRef<{ [key: number]: HTMLImageElement }>({});
  const drawScreenRef = useRef<((idx: number, opacity?: number, prevIdx?: number | null, blend?: number) => void) | null>(null);

  // Navigate to slide
  const navigateTo = (newIndex: number) => {
    if (isTransitioningRef.current) return;
    const total = PROJECTS.length;
    const target = ((newIndex % total) + total) % total;
    if (target === currentIndex) return;

    const prev = currentIndex;
    setCurrentIndex(target);
    isTransitioningRef.current = true;

    // Crossfade screenshot
    let progress = 0;
    const startTime = performance.now();
    const duration = 350;

    const animateCrossfade = (time: number) => {
      const elapsed = time - startTime;
      progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

      drawScreenRef.current?.(target, 1, prev, eased);

      if (progress < 1) {
        requestAnimationFrame(animateCrossfade);
      } else {
        drawScreenRef.current?.(target);
        isTransitioningRef.current = false;
      }
    };
    requestAnimationFrame(animateCrossfade);
  };

  // 3D Computer Screen Canvas Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 1.32);
    camera.lookAt(0, 0, 0);

    // Studio 3-Point Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 3.2);
    keyLight.position.set(3, 4, 3.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd8e8ff, 2.0);
    fillLight.position.set(-3.5, 1.5, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfac638, 2.4);
    rimLight.position.set(0, 3.5, -2.5);
    scene.add(rimLight);

    // 2D Screen Texture
    const TEX_W = 1920;
    const TEX_H = 1184;
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = TEX_W;
    screenCanvas.height = TEX_H;
    const ctx = screenCanvas.getContext('2d', { alpha: false });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.generateMipmaps = false;
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    // Preload project screenshots
    PROJECTS.forEach((p, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = p.image;
      img.onload = () => {
        loadedImagesRef.current[idx] = img;
        if (idx === currentIndex) {
          drawScreen(currentIndex);
        }
      };
    });

    const drawImageToScreen = (img: HTMLImageElement, alpha = 1) => {
      if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;
      ctx.globalAlpha = alpha;
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;
      const cropX = nw * 0.032;
      const cropY = nh * 0.042;
      const srcW = nw - cropX * 2;
      const srcH = nh - cropY * 2;
      ctx.drawImage(img, cropX, cropY, srcW, srcH, 0, 0, TEX_W, TEX_H);
    };

    const drawScreen = (index: number, opacity = 1, prevIndex: number | null = null, blendAlpha = 0) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, TEX_W, TEX_H);

      if (prevIndex !== null && loadedImagesRef.current[prevIndex]) {
        drawImageToScreen(loadedImagesRef.current[prevIndex], 1 - blendAlpha);
      }

      if (loadedImagesRef.current[index]) {
        drawImageToScreen(loadedImagesRef.current[index], prevIndex !== null ? blendAlpha : opacity);
      } else {
        const p = PROJECTS[index];
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#0f0e0c';
        ctx.fillRect(0, 0, TEX_W, TEX_H);
        ctx.fillStyle = p.accentColor;
        ctx.font = 'bold 64px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.title, TEX_W / 2, TEX_H / 2 - 20);
      }

      ctx.globalAlpha = 1;
      screenTexture.needsUpdate = true;
    };
    drawScreenRef.current = drawScreen;

    // Load Computer Screen GLB
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.167.0/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    loader.load(
      '/assets/Computer Screen.glb',
      (gltf) => {
        const model = gltf.scene;
        model.rotation.y = Math.PI; // Face camera

        const pivot = new THREE.Group();
        pivot.add(model);

        const screenMaterial = new THREE.MeshBasicMaterial({
          map: screenTexture,
          side: THREE.DoubleSide,
          toneMapped: false
        });

        const bodyMaterial = new THREE.MeshStandardMaterial({
          color: 0xd8dde4,
          roughness: 0.22,
          metalness: 0.88,
          envMapIntensity: 1.6
        });

        const standMaterial = new THREE.MeshStandardMaterial({
          color: 0xe8ecf2,
          roughness: 0.18,
          metalness: 0.92,
          envMapIntensity: 1.8
        });

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const posCount = mesh.geometry?.attributes?.position?.count || 0;

            if (posCount === 4) {
              const uvData = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
              mesh.geometry.setAttribute('uv', new THREE.BufferAttribute(uvData, 2));
              mesh.material = screenMaterial;
            } else {
              const mat = mesh.name?.toLowerCase().includes('stand') ? standMaterial : bodyMaterial;
              mesh.material = mat;
            }
          }
        });

        const box = new THREE.Box3().setFromObject(pivot);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 0.88 / maxDim;
        pivot.scale.setScalar(targetScale);

        const box2 = new THREE.Box3().setFromObject(pivot);
        const center2 = box2.getCenter(new THREE.Vector3());
        pivot.position.sub(center2);

        modelGroup.add(pivot);
        drawScreen(currentIndex);
      },
      undefined,
      (err) => console.warn('Showcase GLB load error:', err)
    );

    // Mouse parallax isolated to container hover
    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onMouseLeave = () => {
      mouse.x = 0;
      mouse.y = 0;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      smooth.x += (mouse.x - smooth.x) * 0.05;
      smooth.y += (mouse.y - smooth.y) * 0.05;

      if (modelGroup) {
        modelGroup.position.y = Math.sin(elapsed * 0.8) * 0.012;
        modelGroup.rotation.y = smooth.x * 0.12;
        modelGroup.rotation.x = -smooth.y * 0.08;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
    };
  }, []);

  const activeProject = PROJECTS[currentIndex];

  return (
    <section id="websites" className="w-full max-w-[960px] mx-auto px-4 py-8">
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-1">
        Websites
      </h2>
      <p className="text-[#ccbc8e] text-sm font-normal leading-normal pb-3">
        Crafting high-converting, modern websites tailored for growth and performance.
      </p>

      {/* Showcase Card */}
      <div className="rounded-2xl border border-[#6a5a2f]/40 bg-[#2a2414] p-4 sm:p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-6 items-center">
          {/* Left Column: 3D Monitor Visual & Arrows */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 w-full">
            <button
              onClick={() => navigateTo(currentIndex - 1)}
              className="size-8 sm:size-10 rounded-full bg-[#231e10] border border-[#fac638]/40 text-[#fac638] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shrink-0 z-10"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* 3D Canvas */}
            <div className="relative flex-1 max-w-[260px] sm:max-w-[400px] flex items-center justify-center">
              <div
                ref={containerRef}
                className="relative w-full h-[195px] sm:h-[300px] cursor-grab active:cursor-grabbing flex items-center justify-center"
              >
                <canvas ref={canvasRef} className="w-full h-full block object-contain" />
              </div>
            </div>

            <button
              onClick={() => navigateTo(currentIndex + 1)}
              className="size-8 sm:size-10 rounded-full bg-[#231e10] border border-[#fac638]/40 text-[#fac638] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shrink-0 z-10"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Right Column: Project Info Panel */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#fac638]/10 text-[#fac638] border border-[#fac638]/30">
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
                href="#contact"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fac638] text-[#231e10] text-xs sm:text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#fac638]/10"
              >
                <span>Get a Website</span>
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
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
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
