'use client';

import React, { useState, useRef } from 'react';
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

  const toggleMute = (idx: number) => {
    const video = videoRefs.current[idx];
    if (video) {
      const newMuted = !video.muted;
      video.muted = newMuted;
      setMutedStates((prev) => ({ ...prev, [idx]: newMuted }));
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % SAMPLES.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + SAMPLES.length) % SAMPLES.length);
  };

  return (
    <section id="work" className="w-full max-w-[960px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Featured Work
        </h2>
        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="size-9 rounded-full bg-[#352d18] border border-[#6a5a2f] text-[#fac638] flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="size-9 rounded-full bg-[#352d18] border border-[#6a5a2f] text-[#fac638] flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-[#ccbc8e] text-sm font-normal leading-normal pb-4">
        A glimpse of high-retention video edits and viral reels crafted for our clients.
      </p>

      {/* Video Grid / Slider */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SAMPLES.map((sample, idx) => {
          const isMuted = mutedStates[idx] ?? true;
          return (
            <div
              key={sample.id}
              className="flex flex-col gap-3 rounded-2xl border border-[#6a5a2f]/40 bg-[#2a2414] p-3.5 hover:border-[#fac638] transition-all group"
            >
              <div className="relative pt-[177.77%] rounded-xl overflow-hidden bg-black/60">
                <video
                  ref={(el) => { videoRefs.current[idx] = el; }}
                  src={sample.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Volume Toggle */}
                <button
                  onClick={() => toggleMute(idx)}
                  className="absolute top-3 right-3 z-30 size-8 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-black hover:scale-110 active:scale-95 transition-all"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#fac638]" />}
                </button>
              </div>

              <div className="text-center pt-1">
                <h3 className="text-white text-base font-bold">{sample.title}</h3>
                <p className="text-[#ccbc8e] text-xs font-normal mt-0.5">{sample.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
