'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

const SAMPLES = [
  {
    id: 1,
    title: 'Dynamic Reel 1',
    subtitle: "Client's Video",
    src: '/assets/videos/samplereel1.mp4',
  },
  {
    id: 2,
    title: 'Dynamic Reel 2',
    subtitle: "Client's Video",
    src: '/assets/videos/samplereel2.mp4',
  },
  {
    id: 3,
    title: 'Dynamic Reel 3',
    subtitle: "Client's Video",
    src: '/assets/videos/samplereel3.mp4',
  },
];

export default function WorkSection() {
  const [mutedStates, setMutedStates] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const sectionRef = useRef<HTMLElement>(null);

  // Play videos only when the section is in the viewport (saves bandwidth/CPU)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        SAMPLES.forEach((_, idx) => {
          const video = videoRefs.current[idx];
          if (!video) return;
          if (entry.isIntersecting) {
            video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleMute = (idx: number) => {
    const video = videoRefs.current[idx];
    if (video) {
      const newMuted = !video.muted;
      video.muted = newMuted;
      setMutedStates((prev) => ({ ...prev, [idx]: newMuted }));
    }
  };

  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + SAMPLES.length) % SAMPLES.length);
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % SAMPLES.length);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 py-20 scroll-mt-20 text-espresso transition-colors duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center items-start justify-between gap-4 pb-1">
        <div>
          <h2 className="text-espresso text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Featured <span className="inline-block bg-gradient-to-r from-purple via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">Reels</span>
          </h2>
          <p className="text-mocha text-sm sm:text-base mt-2.5">
            A glimpse of high-retention video edits and viral reels crafted for our clients.
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="size-10 rounded-full bg-creamcard border border-purpleborder text-espresso hover:text-white hover:bg-purple active:scale-95 transition-all shadow-sm flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="size-10 rounded-full bg-creamcard border border-purpleborder text-espresso hover:text-white hover:bg-purple active:scale-95 transition-all shadow-sm flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {SAMPLES.map((sample, idx) => {
          const isMuted = mutedStates[idx] ?? true;
          return (
            <div
              key={sample.id}
              className="flex flex-col gap-3.5 rounded-3xl border border-purpleborder bg-creamcard p-4 hover:border-purple/70 transition-all duration-300 group shadow-sm hover:shadow-lg dark:hover:shadow-purple-950/20"
            >
              <div className="relative pt-[177.77%] rounded-2xl overflow-hidden bg-black/40 border border-purpleborder">
                <video
                  ref={(el) => { videoRefs.current[idx] = el; }}
                  src={sample.src}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Volume Toggle */}
                <button
                  onClick={() => toggleMute(idx)}
                  className="absolute top-3 right-3 z-30 size-9 rounded-full bg-black/60 backdrop-blur-md border border-purple-500/30 flex items-center justify-center text-white hover:bg-purple-600 hover:scale-110 active:scale-95 transition-all shadow-md"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-purple-300" />}
                </button>
              </div>

              <div className="text-center pt-2 pb-1">
                <h3 className="text-espresso text-base font-bold group-hover:text-purple transition-colors">{sample.title}</h3>
                <p className="text-mocha text-xs font-normal mt-1">{sample.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}