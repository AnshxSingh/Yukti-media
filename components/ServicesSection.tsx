'use client';

import React from 'react';
import { Film, Layout, Share2, Palette, Megaphone } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const SERVICES = [
  {
    icon: Film,
    title: 'Video Editing',
    desc: 'Crafting compelling narratives through high-retention, expert video editing.',
  },
  {
    icon: Layout,
    title: 'Web Designing',
    desc: 'Crafting stunning, responsive 3D web applications and websites that convert.',
  },
  {
    icon: Share2,
    title: 'SMM Strategy',
    desc: 'Driving organic engagement, reach, and exponential growth across social channels.',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    desc: 'Bold, memorable creative visuals and brand assets that elevate your market presence.',
  },
  {
    icon: Megaphone,
    title: 'Paid Advertising',
    desc: 'Maximizing ROI and generating qualified leads with high-converting creative ad campaigns.',
  },
];

export default function ServicesSection() {
  const renderCard = (srv: typeof SERVICES[0]) => {
    const Icon = srv.icon;
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-[#6a5a2f] bg-[#352d18] p-5 hover:border-[#fac638] hover:-translate-y-1 transition-all group h-full">
        <div className="size-10 rounded-lg bg-[#fac638]/10 border border-[#fac638]/30 flex items-center justify-center text-[#fac638] group-hover:scale-110 transition-transform shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-white text-base font-bold leading-tight group-hover:text-[#fac638] transition-colors">
            {srv.title}
          </h3>
          <p className="text-[#ccbc8e] text-sm leading-relaxed">
            {srv.desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="w-full max-w-[960px] mx-auto px-4 py-8">
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-1">
        Our Services
      </h2>
      <p className="text-[#ccbc8e] text-sm font-normal leading-normal pb-4">
        Tailored creative solutions designed to scale your personal brand and business.
      </p>

      {/* Mobile: Swiper Carousel */}
      <div className="block sm:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={14}
          slidesPerView={1.18}
          className="pb-8"
        >
          {SERVICES.map((srv, idx) => (
            <SwiperSlide key={idx} className="h-auto">
              {renderCard(srv)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop/Tablet: Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {SERVICES.map((srv, idx) => (
          <div key={idx} className="h-full">
            {renderCard(srv)}
          </div>
        ))}
      </div>
    </section>
  );
}

