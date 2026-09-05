import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#6a5a2f]/40 bg-[#1c180d] py-8 text-center mt-12">
      <div className="max-w-[960px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/assets/images/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
          <span className="text-white text-sm font-bold">Yukti Media</span>
        </div>
        <p className="text-[#ccbc8e] text-xs">
          © {new Date().getFullYear()} Yukti Media. All rights reserved. Crafted with excellence.
        </p>
      </div>
    </footer>
  );
}
