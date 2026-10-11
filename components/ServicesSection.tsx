import React from 'react';
import { Film, Layout, Share2, Palette, Megaphone } from 'lucide-react';

const SERVICES = [
  {
    icon: Film,
    title: 'Video Editing',
    desc: 'Crafting compelling narratives through high-retention, expert cinematic video editing.',
  },
  {
    icon: Layout,
    title: 'Web Designing',
    desc: 'Crafting stunning, responsive 3D web applications and bespoke websites that convert.',
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
  return (
    <section id="services" className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 py-20 scroll-mt-20 text-espresso transition-colors duration-300">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-espresso text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Our <span className="inline-block bg-gradient-to-r from-purple via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">Services</span>
        </h2>
        <p className="text-mocha text-sm sm:text-base mt-3 leading-relaxed">
          Tailored creative solutions designed to scale your personal brand and business.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {SERVICES.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="flex flex-col gap-4 rounded-2xl border border-purpleborder bg-creamcard p-6 hover:border-purple hover:-translate-y-1 transition-all duration-300 group shadow-sm hover:shadow-lg dark:hover:shadow-purple-950/20"
            >
              <div className="size-12 rounded-xl bg-purple/10 border border-purpleborder flex items-center justify-center text-purple group-hover:scale-110 group-hover:bg-purple/20 transition-all shadow-md">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-espresso text-lg font-bold leading-tight group-hover:text-purple transition-colors">
                  {srv.title}
                </h3>
                <p className="text-mocha text-sm leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}