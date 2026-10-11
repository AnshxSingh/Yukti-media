import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full border-t border-purpleborder bg-creamcard py-8 text-center mt-20 transition-colors duration-300">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="size-7 rounded-lg overflow-hidden flex items-center justify-center bg-creamsoft border border-purpleborder">
            <Image src="/favicon/yuktilogo.png" alt="Logo" width={40} height={40} className="w-full h-full object-contain p-0.5" />
          </div>
          <span className="text-espresso text-sm font-bold tracking-tight">Yukti Media</span>
        </div>
        <p className="text-mocha text-xs">
          © {new Date().getFullYear()} Yukti Media. All rights reserved. Crafted with precision &amp; performance.
        </p>
      </div>
    </footer>
  );
}