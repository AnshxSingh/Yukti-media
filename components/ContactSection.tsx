'use client';

import React, { useState } from 'react';
import {
  Mail,
  MessageCircle,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
  CheckCircle2
} from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactEmail = 'yuktimedia.in@gmail.com';
  const whatsappNumber = '+91 81098 69400';
  const whatsappUrl =
    'https://api.whatsapp.com/send/?phone=918109869400&text=Hyyy%20👋%20I%20would%20like%20to%20discuss%20a%20project%20with%20Yukti%20Media!';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      const subject = encodeURIComponent(`New Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );
      window.open(`mailto:${contactEmail}?subject=${subject}&body=${body}`, '_blank');
    }, 400);
  };

  return (
    <section id="contact" className="w-full max-w-[1020px] mx-auto px-4 sm:px-6 py-20 scroll-mt-16">
      {/* Centered Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Let&apos;s Work Together
        </h2>
        <p className="text-[#a1a1aa] text-sm sm:text-base mt-3 leading-relaxed">
          Have a project in mind? Let&apos;s discuss how we can bring your ideas to life.
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left Column: Form */}
        <div>
          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-[#1c180d] border border-[#6a5a2f]/40 text-center flex flex-col items-center justify-center animate-fadeIn">
              <div className="size-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-white text-xl font-bold">Message Sent!</h3>
              <p className="text-[#ccbc8e] text-sm mt-2">
                Thank you, <span className="text-white font-semibold">{name}</span>. We will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-6 px-5 py-2 rounded-xl bg-[#352d18] hover:bg-[#fac638] text-[#fac638] hover:text-[#231e10] font-semibold text-xs transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#d4d4d8] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#14120b] border border-[#302917] hover:border-[#6a5a2f]/70 text-white placeholder-[#71717a] text-sm focus:outline-none focus:border-[#fac638] focus:ring-1 focus:ring-[#fac638]/40 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#d4d4d8] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#14120b] border border-[#302917] hover:border-[#6a5a2f]/70 text-white placeholder-[#71717a] text-sm focus:outline-none focus:border-[#fac638] focus:ring-1 focus:ring-[#fac638]/40 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[#d4d4d8] mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#14120b] border border-[#302917] hover:border-[#6a5a2f]/70 text-white placeholder-[#71717a] text-sm focus:outline-none focus:border-[#fac638] focus:ring-1 focus:ring-[#fac638]/40 transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-1 py-3.5 px-6 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#1c1404] font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#f59e0b]/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Let's Connect */}
        <div className="flex flex-col gap-6 lg:pl-4">
          <div>
            <h3 className="text-white text-2xl font-bold tracking-tight">
              Let&apos;s Connect
            </h3>
            <p className="text-[#a1a1aa] text-sm mt-2 leading-relaxed">
              I&apos;m always open to discussing new projects, freelance opportunities, or just a good tech conversation. Feel free to reach out anytime!
            </p>
          </div>

          {/* Info Cards */}
          <div className="flex flex-col gap-3.5">
            {/* Email Card */}
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#14120b] border border-[#302917] hover:border-[#6a5a2f]/80 hover:bg-[#1a170e] transition-all group no-underline"
            >
              <div className="size-11 rounded-xl bg-[#2a220f] border border-[#fac638]/30 flex items-center justify-center text-[#fac638] shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#a1a1aa]">Email</p>
                <p className="text-white text-sm font-medium truncate mt-0.5 group-hover:text-[#fac638] transition-colors">
                  {contactEmail}
                </p>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#14120b] border border-[#302917] hover:border-[#25D366]/60 hover:bg-[#1a170e] transition-all group no-underline"
            >
              <div className="size-11 rounded-xl bg-[#0e2a18] border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#a1a1aa]">WhatsApp</p>
                <p className="text-white text-sm font-medium truncate mt-0.5 group-hover:text-[#25D366] transition-colors">
                  {whatsappNumber}
                </p>
              </div>
            </a>

            {/* Country Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#14120b] border border-[#302917]">
              <div className="size-11 rounded-xl bg-[#2a220f] border border-[#fac638]/30 flex items-center justify-center text-[#fac638] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#a1a1aa]">Country</p>
                <p className="text-white text-sm font-medium mt-0.5">India</p>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="pt-2">
            <p className="text-xs text-[#a1a1aa] mb-3">Connect with me</p>
            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="size-10 rounded-xl bg-[#14120b] border border-[#302917] hover:border-[#fac638] flex items-center justify-center text-white/80 hover:text-[#fac638] transition-all hover:scale-105"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="size-10 rounded-xl bg-[#14120b] border border-[#302917] hover:border-[#fac638] flex items-center justify-center text-white/80 hover:text-[#fac638] transition-all hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="size-10 rounded-xl bg-[#14120b] border border-[#302917] hover:border-[#fac638] flex items-center justify-center text-white/80 hover:text-[#fac638] transition-all hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
