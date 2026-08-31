import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full max-w-[960px] mx-auto px-4 py-8">
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-1">
        Contact
      </h2>
      <p className="text-[#ccbc8e] text-base font-normal leading-normal pb-4">
        Ready to take your videos and websites to the next level? Get in touch with us today.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="https://api.whatsapp.com/send/?phone=918109869400&text=Hyyy%20👋"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-[#231e10] font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#25D366]/20"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Contact via WhatsApp</span>
        </a>

        <a
          href="mailto:yuktimedia.in@gmail.com"
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#fac638] text-[#231e10] font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#fac638]/20"
        >
          <Mail className="w-4 h-4" />
          <span>Send an Email</span>
        </a>
      </div>
    </section>
  );
}
