# Yukti Media — Next.js 3D Web Application

A high-performance modern web application for **Yukti Media**, built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Three.js**.

## 🚀 Key Features

- **Dynamic Inversion Circle Scroll Hero**: Scroll-driven dual-phase color-inversion lens animation with 3D logo floating in Three.js (purple studio lighting).
- **Real Website Screenshots**: Featured projects display actual screenshots (Vegan Prophecy, Yash Collection, StayNest) with category filters and a carousel.
- **Client Video Reels**: High-retention video showcase with in-view playback and individual volume mute/unmute controls.
- **Performance Analytics Dashboard**: Live metrics cards tracking viewership growth and client satisfaction.
- **Responsive Navigation & Action Center**: Sticky header with mobile menu drawer and direct Phone / WhatsApp / Email booking channels.
- **Purple Premium Design System**: Light cream backgrounds, espresso text, purple accents matching the brand logo.

## ⚡ Performance Optimizations

- **Code splitting**: All below-the-fold sections load via `next/dynamic` + `Suspense`.
- **Lazy-loaded Three.js**: The hero 3D scene initializes only when in view and `three` is code-split into its own chunk.
- **Self-hosted fonts**: Google Inter is served via `next/font` (no render-blocking stylesheet).
- **Image optimization**: `next/image` with automatic WebP/AVIF conversion and long-term caching.
- **Video lazy playback**: Reels only play when scrolled into view (`preload="metadata"`).
- **Mobile-first UX**: `100svh` fallbacks, 16px inputs (no iOS zoom), ≥44px tap targets, reduced motion support.
- **Server-component page shell**: `app/page.tsx` is a server component composing client sections.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics & WebGL**: [Three.js](https://threejs.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) to view the application.

### 3. Build for production
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
app/                  # Next.js App Router (layout, page, globals.css)
components/           # Page section components
public/               # Static assets (images, videos, 3D models)
```