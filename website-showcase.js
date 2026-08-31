/**
 * Website Showcase — 3D Computer Screen with Dynamic Screenshot Swapping
 * Displays website screenshots directly on the front of the 3D Computer Screen model.
 * Left & Right arrows change ONLY the website screenshot on the screen.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

(function initWebsiteShowcase() {

  /* ─────────────────────────────────────────────────
     0. WEBSITE PROJECTS DATA
  ───────────────────────────────────────────────── */
  const PROJECTS = [
    {
      id: 0,
      title: 'Aura Luxe',
      subtitle: 'Luxury E-Commerce Platform',
      category: 'E-Commerce',
      description: 'A high-conversion online boutique for a luxury fashion brand. Features seamless checkout, dynamic product showcases, and lightning-fast loading.',
      metrics: ['+185% Conversion', 'Sub-1s Load', '5★ UX Rating'],
      tech: ['Next.js', 'Tailwind CSS', 'Stripe', 'Framer Motion'],
      image: 'assets/images/websites/site1.jpg',
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
      image: 'assets/images/websites/site2.jpg',
      accentColor: '#38bdf8'
    }
  ];

  let currentIndex = 0;
  let isTransitioning = false;

  /* ─────────────────────────────────────────────────
     1. THREE.JS SCENE SETUP
  ───────────────────────────────────────────────── */
  const canvas = document.getElementById('showcase-canvas');
  const container = document.getElementById('showcase-3d-container');
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

  const camera = new THREE.PerspectiveCamera(
    36,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 1.32);
  camera.lookAt(0, 0, 0);

  // Studio 3-Point Lighting with crisp metallic highlights
  const ambient = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambient);

  // Key light: warm studio light highlighting the silver frame & stand
  const keyLight = new THREE.DirectionalLight(0xfff8ee, 3.2);
  keyLight.position.set(3, 4, 3.5);
  scene.add(keyLight);

  // Fill light: cool silver reflection from the left
  const fillLight = new THREE.DirectionalLight(0xd8e8ff, 2.0);
  fillLight.position.set(-3.5, 1.5, 2.5);
  scene.add(fillLight);

  // Top/Rim light: golden edge highlight defining monitor silhouette
  const rimLight = new THREE.DirectionalLight(0xfac638, 2.4);
  rimLight.position.set(0, 3.5, -2.5);
  scene.add(rimLight);

  // Front soft fill
  const frontFill = new THREE.DirectionalLight(0xffffff, 1.2);
  frontFill.position.set(0, -2, 3);
  scene.add(frontFill);

  /* ─────────────────────────────────────────────────
     2. DYNAMIC SCREEN CANVAS TEXTURE
  ───────────────────────────────────────────────── */
  // Screen quad physical aspect ratio is 1.622 (1920 x 1184)
  const TEX_W = 1920;
  const TEX_H = 1184;
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = TEX_W;
  screenCanvas.height = TEX_H;
  const ctx = screenCanvas.getContext('2d', { alpha: false });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const screenTexture = new THREE.CanvasTexture(screenCanvas);
  screenTexture.colorSpace = THREE.SRGBColorSpace;
  screenTexture.generateMipmaps = false;
  screenTexture.minFilter = THREE.LinearFilter;
  screenTexture.magFilter = THREE.LinearFilter;
  screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

  // Preload all project images
  const loadedImages = {};
  PROJECTS.forEach((p, idx) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = p.image;
    img.onload = () => {
      loadedImages[idx] = img;
      if (idx === currentIndex) {
        drawScreen(currentIndex);
      }
    };
  });

  // Helper to draw image fitted edge-to-edge onto the screen
  function drawImageToScreen(img, alpha = 1) {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    ctx.globalAlpha = alpha;

    const nw = img.naturalWidth;
    const nh = img.naturalHeight;

    // Crop outer browser mockup padding (3.2% left/right, 4.2% top/bottom)
    // so pure webpage content seamlessly fills the 3D monitor bezels
    const cropX = nw * 0.032;
    const cropY = nh * 0.042;
    const srcW = nw - cropX * 2;
    const srcH = nh - cropY * 2;

    ctx.drawImage(img, cropX, cropY, srcW, srcH, 0, 0, TEX_W, TEX_H);
  }

  // Function to render screenshot to screen canvas
  function drawScreen(index, opacity = 1, prevIndex = null, blendAlpha = 0) {
    ctx.clearRect(0, 0, TEX_W, TEX_H);

    // If crossfading
    if (prevIndex !== null && loadedImages[prevIndex]) {
      drawImageToScreen(loadedImages[prevIndex], 1 - blendAlpha);
    }

    // Active image
    if (loadedImages[index]) {
      drawImageToScreen(loadedImages[index], prevIndex !== null ? blendAlpha : opacity);
    } else {
      // Fallback placeholder with nice UI while image loads
      const p = PROJECTS[index];
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#0f0e0c';
      ctx.fillRect(0, 0, TEX_W, TEX_H);

      ctx.fillStyle = p.accentColor;
      ctx.font = 'bold 64px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.title, TEX_W / 2, TEX_H / 2 - 20);

      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '32px sans-serif';
      ctx.fillText(p.subtitle, TEX_W / 2, TEX_H / 2 + 50);
    }

    ctx.globalAlpha = 1;
    screenTexture.needsUpdate = true;
  }

  /* ─────────────────────────────────────────────────
     3. LOAD 3D COMPUTER SCREEN MODEL
  ───────────────────────────────────────────────── */
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.167.0/examples/jsm/libs/draco/');
  loader.setDRACOLoader(dracoLoader);

  let modelGroup = new THREE.Group();
  scene.add(modelGroup);

  let screenMeshes = [];

  loader.load(
    'assets/Computer Screen.glb',
    (gltf) => {
      const model = gltf.scene;

      // Rotate model 180° so the screen faces front (+Z)
      model.rotation.y = Math.PI;

      // Wrap in pivot group
      const pivot = new THREE.Group();
      pivot.add(model);

      // Screen material displaying our website screenshot (toneMapped: false preserves 100% original color & crispness)
      const screenMaterial = new THREE.MeshBasicMaterial({
        map: screenTexture,
        side: THREE.DoubleSide,
        toneMapped: false
      });

      // Frame / Body material — Sleek Apple Silver / Platinum finish with metallic sheen
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xd8dde4,
        roughness: 0.22,
        metalness: 0.88,
        envMapIntensity: 1.6
      });

      // Stand base accent material — Brushed Aluminum
      const standMaterial = new THREE.MeshStandardMaterial({
        color: 0xe8ecf2,
        roughness: 0.18,
        metalness: 0.92,
        envMapIntensity: 1.8
      });

      model.traverse((child) => {
        if (child.isMesh) {
          const geo = child.geometry;
          const posCount = geo?.attributes?.position?.count || 0;

          // The screen quad has 4 vertices
          if (posCount === 4) {
            // Front-facing UV coordinates for the quad:
            // Vertex order: V0 (bottom-left from front), V1 (bottom-right), V2 (top-right), V3 (top-left)
            const uvData = new Float32Array([
              0, 0,  // bottom-left
              1, 0,  // bottom-right
              1, 1,  // top-right
              0, 1   // top-left
            ]);
            geo.setAttribute('uv', new THREE.BufferAttribute(uvData, 2));
            child.material = screenMaterial;
            screenMeshes.push(child);
          } else {
            // Check if mesh is stand or frame
            const mat = child.name?.toLowerCase().includes('stand') ? standMaterial : bodyMaterial;
            child.material = mat;
          }
        }
      });

      // Compute scale after rotation
      const box = new THREE.Box3().setFromObject(pivot);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetScale = 0.88 / maxDim;
      pivot.scale.setScalar(targetScale);

      // Recompute bounding box after scale and center pivot at (0, 0, 0)
      const box2 = new THREE.Box3().setFromObject(pivot);
      const center2 = box2.getCenter(new THREE.Vector3());
      pivot.position.sub(center2);

      modelGroup.add(pivot);

      // Initial draw
      drawScreen(currentIndex);
    },
    undefined,
    (err) => console.warn('Error loading Computer Screen.glb:', err)
  );

  /* ─────────────────────────────────────────────────
     4. MOUSE PARALLAX (ONLY ON 3D ELEMENT HOVER)
  ───────────────────────────────────────────────── */
  const mouse = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  });

  container.addEventListener('mouseleave', () => {
    // Smoothly return to neutral front-facing orientation when cursor leaves
    mouse.x = 0;
    mouse.y = 0;
  });

  /* ─────────────────────────────────────────────────
     5. NAVIGATION & SCREEN-ONLY TRANSITION
  ───────────────────────────────────────────────── */
  function navigateTo(newIndex) {
    if (isTransitioning) return;
    const total = PROJECTS.length;
    newIndex = ((newIndex % total) + total) % total;
    if (newIndex === currentIndex) return;

    const prevIndex = currentIndex;
    currentIndex = newIndex;
    isTransitioning = true;

    // Update UI text and metrics
    updateProjectPanel(PROJECTS[currentIndex]);
    updateDots(currentIndex);

    // Smooth screen crossfade animation (0.35s)
    let progress = 0;
    const startTime = performance.now();
    const duration = 350;

    function animateCrossfade(time) {
      const elapsed = time - startTime;
      progress = Math.min(elapsed / duration, 1);
      // Ease in-out
      const eased = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      drawScreen(currentIndex, 1, prevIndex, eased);

      if (progress < 1) {
        requestAnimationFrame(animateCrossfade);
      } else {
        drawScreen(currentIndex);
        isTransitioning = false;
      }
    }
    requestAnimationFrame(animateCrossfade);
  }

  // Arrow navigation click handlers
  document.getElementById('showcase-prev')?.addEventListener('click', () => {
    navigateTo(currentIndex - 1);
  });
  document.getElementById('showcase-next')?.addEventListener('click', () => {
    navigateTo(currentIndex + 1);
  });

  // Mobile arrow buttons
  document.getElementById('showcase-prev-mobile')?.addEventListener('click', () => {
    navigateTo(currentIndex - 1);
  });
  document.getElementById('showcase-next-mobile')?.addEventListener('click', () => {
    navigateTo(currentIndex + 1);
  });

  // Keyboard arrow keys
  document.addEventListener('keydown', (e) => {
    const section = document.getElementById('websites');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === 'ArrowLeft') navigateTo(currentIndex - 1);
      if (e.key === 'ArrowRight') navigateTo(currentIndex + 1);
    }
  });

  // Touch swipe support
  let touchStartX = 0;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  container.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? navigateTo(currentIndex + 1) : navigateTo(currentIndex - 1);
    }
  }, { passive: true });

  /* ─────────────────────────────────────────────────
     6. UI PANEL & DOTS UPDATE
  ───────────────────────────────────────────────── */
  function setupDots() {
    const dotsContainer = document.getElementById('showcase-dots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    PROJECTS.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'showcase-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Project ${i + 1}`);
      dot.addEventListener('click', () => navigateTo(i));
      dotsContainer.appendChild(dot);
    });
  }
  setupDots();

  function updateDots(idx) {
    document.querySelectorAll('.showcase-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }

  function updateProjectPanel(proj) {
    const counter = document.getElementById('project-counter');
    const cat = document.getElementById('project-category');
    const title = document.getElementById('project-title');
    const subtitle = document.getElementById('project-subtitle');
    const desc = document.getElementById('project-desc');
    const metricsEl = document.getElementById('project-metrics');
    const techEl = document.getElementById('project-tech');

    if (counter) counter.textContent = `0${proj.id + 1} / 0${PROJECTS.length}`;
    if (cat) cat.textContent = proj.category;

    if (title) {
      title.style.opacity = '0';
      title.style.transform = 'translateY(8px)';
      setTimeout(() => {
        title.textContent = proj.title;
        title.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
      }, 80);
    }

    if (subtitle) subtitle.textContent = proj.subtitle;

    if (desc) {
      desc.style.opacity = '0';
      setTimeout(() => {
        desc.textContent = proj.description;
        desc.style.transition = 'opacity 0.35s ease';
        desc.style.opacity = '1';
      }, 120);
    }

    if (metricsEl) {
      metricsEl.innerHTML = proj.metrics.map(m =>
        `<span class="showcase-metric">${m}</span>`
      ).join('');
    }

    if (techEl) {
      techEl.innerHTML = proj.tech.map(t =>
        `<span class="showcase-tech-tag">${t}</span>`
      ).join('');
    }

    document.documentElement.style.setProperty('--showcase-accent', proj.accentColor);
  }

  updateProjectPanel(PROJECTS[0]);

  /* ─────────────────────────────────────────────────
     7. ANIMATE LOOP
  ───────────────────────────────────────────────── */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Smooth cursor tracking
    smooth.x += (mouse.x - smooth.x) * 0.05;
    smooth.y += (mouse.y - smooth.y) * 0.05;

    if (modelGroup) {
      // Subtle float animation
      modelGroup.position.y = Math.sin(elapsed * 0.8) * 0.012;

      // Subtle cursor parallax tilt around the front face
      modelGroup.rotation.y = smooth.x * 0.12;
      modelGroup.rotation.x = -smooth.y * 0.08;
    }

    renderer.render(scene, camera);
  }
  animate();

  /* ─────────────────────────────────────────────────
     8. RESIZE HANDLER
  ───────────────────────────────────────────────── */
  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

})();
