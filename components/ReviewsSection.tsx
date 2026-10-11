'use client';

import React, { useState } from 'react';
import { Star, Heart } from 'lucide-react';

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

  return (
    <section id="reviews" className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 py-20 scroll-mt-20 text-espresso">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-espresso text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Client <span className="inline-block bg-gradient-to-r from-purple via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">Reviews</span>
        </h2>
        <p className="text-mocha text-sm sm:text-base mt-2.5">
          Hear from creators, businesses, and influencers who scaled their visual identity with us.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {REVIEWS.map((rev) => {
          const isLiked = likedMap[rev.id] || false;
          return (
            <div
              key={rev.id}
              className="flex flex-col gap-4 rounded-2xl border border-purpleborder bg-creamcard p-6 hover:border-purple/70 transition-all duration-300 shadow-sm hover:shadow-lg dark:hover:shadow-purple-950/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href={rev.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="size-11 rounded-full overflow-hidden border border-purpleborder hover:scale-105 transition-transform"
                  >
                    <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" loading="lazy" />
                  </a>
                  <div>
                    <a
                      href={rev.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-espresso text-base font-semibold hover:text-purple transition-colors"
                    >
                      {rev.name}
                    </a>
                    <p className="text-mocha text-xs">{rev.date}</p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-espresso/90 text-sm leading-relaxed">{rev.review}</p>

              {/* Like action */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => toggleLike(rev.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                    isLiked
                      ? 'bg-purple/20 border-purple text-purpledeep dark:text-purplelight'
                      : 'bg-creamsoft/50 dark:bg-white/5 border border-purpleborder text-mocha hover:text-espresso hover:border-purple'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-purple' : ''}`} />
                  <span>{rev.likes + (isLiked ? 1 : 0)}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}