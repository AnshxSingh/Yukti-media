'use client';

import React, { useState } from 'react';
import { Star, Heart } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const REVIEWS = [
  {
    id: 1,
    name: 'Altab Hossain',
    date: 'July 10, 2025',
    avatar: '/assets/images/clients/Altab Hossain.jpg',
    instagram: 'https://www.instagram.com/veganprophecy2030/',
    review:
      'The video quality was absolutely top-notch, and everyone who watched appreciated the clean editing and professional finish. The editor clearly understands the craft and delivered exactly what I envisioned. Highly recommended!',
    likes: 12,
  },
  {
    id: 2,
    name: 'Akanksha Mishra',
    date: 'July 6, 2025',
    avatar: '/assets/images/clients/Akanksha Mishra.jpg',
    instagram: 'https://www.instagram.com/akanksha_roshni/',
    review:
      'I loved working with this team! They delivered the project on time and took care of every detail. The visual storytelling and color grading gave my content the exact aesthetic boost I was looking for.',
    likes: 8,
  },
  {
    id: 3,
    name: 'Sumiran Jha',
    date: 'July 5, 2025',
    avatar: '/assets/images/clients/Altab Hossain.jpg',
    instagram: 'https://www.instagram.com/thesocial_scientist_/',
    review:
      'The video editing was sharp, engaging, and perfectly aligned with my brand vision. The pacing kept viewers hooked from the first second. Truly exceptional work!',
    likes: 15,
  },
];

export default function ReviewsSection() {
  const [likedMap, setLikedMap] = useState<{ [key: number]: boolean }>({});

  const toggleLike = (id: number) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderCard = (rev: typeof REVIEWS[0]) => {
    const isLiked = likedMap[rev.id] || false;
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-[#6a5a2f]/40 bg-[#352d18]/70 p-5 hover:border-[#fac638]/60 transition-all h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href={rev.instagram}
              target="_blank"
              rel="noreferrer"
              className="size-10 rounded-full overflow-hidden border border-[#fac638]/40 hover:scale-105 transition-transform shrink-0"
            >
              <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
            </a>
            <div>
              <a
                href={rev.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-white text-base font-semibold hover:text-[#fac638] transition-colors"
              >
                {rev.name}
              </a>
              <p className="text-[#ccbc8e] text-xs">{rev.date}</p>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="flex gap-0.5 text-[#fac638]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
        </div>

        <p className="text-white/90 text-sm leading-relaxed">{rev.review}</p>

        {/* Like action */}
        <div className="flex items-center gap-2 pt-1 mt-auto">
          <button
            onClick={() => toggleLike(rev.id)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border transition-all ${
              isLiked
                ? 'bg-red-500/10 border-red-500/40 text-red-400'
                : 'bg-white/5 border-white/10 text-[#ccbc8e] hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{rev.likes + (isLiked ? 1 : 0)}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="reviews" className="w-full max-w-[960px] mx-auto px-4 py-8">
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-1">
        Client Reviews
      </h2>
      <p className="text-[#ccbc8e] text-sm font-normal leading-normal pb-4">
        Hear from creators, businesses, and influencers who scaled their visual identity with us.
      </p>

      {/* Mobile: Swiper Carousel */}
      <div className="block md:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={14}
          slidesPerView={1.08}
          breakpoints={{
            500: {
              slidesPerView: 1.25,
              spaceBetween: 16,
            }
          }}
          className="pb-8"
        >
          {REVIEWS.map((rev) => (
            <SwiperSlide key={rev.id} className="h-auto">
              {renderCard(rev)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Stacked Column */}
      <div className="hidden md:flex flex-col gap-4">
        {REVIEWS.map((rev) => (
          <div key={rev.id}>
            {renderCard(rev)}
          </div>
        ))}
      </div>
    </section>
  );
}

