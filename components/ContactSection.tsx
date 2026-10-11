'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Send, Instagram, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactEmail = 'mediayukti@gmail.com';
  const whatsappUrl =
    'https://api.whatsapp.com/send/?phone=918109869400&text=Hyyy%20%F0%9F%91%8B%20I%20would%20like%20to%20discuss%20a%20project%20with%20Yukti%20Media!';
  const instagramUrl = 'https://www.instagram.com/yuktii.media.in/';

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
    <section id="contact" className="w-full max-w-[1040px] mx-auto px-4 sm:px-6 py-24 scroll-mt-20 text-espresso transition-colors duration-300">
      {/* Centered Top Badge & Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        {/* Get In Touch Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purpleborder bg-creamcard text-xs font-semibold text-espresso mb-5 shadow-sm">
          <Mail className="w-3.5 h-3.5 text-purple" />
          <span>Get In Touch</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-espresso">
          Let&apos;s Work Together
        </h2>
        <p className="text-mocha text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
          Have a project in mind? Let&apos;s discuss how we can bring your ideas to life.
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left Column: Form */}
        <div>
          {isSubmitted ? (
            <div className="p-8 rounded-3xl bg-creamcard border border-purpleborder text-center flex flex-col items-center justify-center animate-fadeIn shadow-xl">
              <div className="size-14 rounded-full bg-purple/15 border border-purple/30 flex items-center justify-center text-purple mb-4 shadow-lg shadow-purple/10">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-espresso text-xl font-bold">Message Sent!</h3>
              <p className="text-mocha text-sm mt-2">
                Thank you, <span className="text-purple font-semibold">{name}</span>. I will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-espresso mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3.5 rounded-2xl bg-creamcard border border-purpleborder hover:border-purple/60 text-espresso placeholder-mocha/50 text-sm sm:text-base focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all shadow-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-espresso mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3.5 rounded-2xl bg-creamcard border border-purpleborder hover:border-purple/60 text-espresso placeholder-mocha/50 text-sm sm:text-base focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all shadow-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-espresso mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-creamcard border border-purpleborder hover:border-purple/60 text-espresso placeholder-mocha/50 text-sm sm:text-base focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all resize-none shadow-sm"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ background: 'linear-gradient(135deg, #9333ea 0%, #c026d3 50%, #4f46e5 100%)' }}
                className="btn-brand-gradient w-full mt-2 py-4 px-6 rounded-2xl active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-purple-600/30 hover:brightness-110 transition-all cursor-pointer disabled:opacity-60"
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
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-espresso">
              Let&apos;s Connect
            </h3>
            <p className="text-mocha text-sm sm:text-base mt-2 leading-relaxed">
              I&apos;m always open to discussing new projects, freelance opportunities, or just a good tech conversation. Feel free to reach out anytime!
            </p>
          </div>

          {/* Info Cards */}
          <div className="flex flex-col gap-3.5">
            {/* 1. Email Card */}
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-creamcard border border-purpleborder hover:border-purple hover:bg-creamsoft transition-all group no-underline shadow-sm"
            >
              <div className="size-12 rounded-xl bg-purple/10 border border-purple/20 flex items-center justify-center text-purple shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-mocha font-medium">Email</p>
                <p className="text-espresso text-sm sm:text-base font-semibold truncate mt-0.5 group-hover:text-purple transition-colors">
                  {contactEmail}
                </p>
              </div>
            </a>

            {/* 2. WhatsApp Card */}
            <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-creamcard border border-purpleborder shadow-sm">
              <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex flex-col">
                <p className="text-xs text-mocha font-medium">WhatsApp</p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                  <a
                    href="https://api.whatsapp.com/send/?phone=917974506637&text=Hyyy%20%F0%9F%91%8B%20I%20would%20like%20to%20discuss%20a%20project%20with%20Yukti%20Media!"
                    target="_blank"
                    rel="noreferrer"
                    className="text-espresso text-sm sm:text-base font-semibold hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors no-underline"
                  >
                    +91 79745 06637
                  </a>
                  <span className="text-mocha/50 text-xs hidden sm:inline">•</span>
                  <a
                    href="https://api.whatsapp.com/send/?phone=918109869400&text=Hyyy%20%F0%9F%91%8B%20I%20would%20like%20to%20discuss%20a%20project%20with%20Yukti%20Media!"
                    target="_blank"
                    rel="noreferrer"
                    className="text-espresso text-sm sm:text-base font-semibold hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors no-underline"
                  >
                    +91 81098 69400
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Country Card */}
            <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-creamcard border border-purpleborder shadow-sm">
              <div className="size-12 rounded-xl bg-purple/10 border border-purple/20 flex items-center justify-center text-purple shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-mocha font-medium">Country</p>
                <p className="text-espresso text-sm sm:text-base font-semibold mt-0.5">
                  India
                </p>
              </div>
            </div>
          </div>

          {/* Socials - Instagram */}
          <div className="pt-2">
            <p className="text-xs text-mocha font-medium mb-3">Connect with me</p>
            <div className="flex items-center gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="size-11 rounded-2xl bg-creamcard border border-purpleborder hover:border-pink-500/60 hover:text-pink-500 flex items-center justify-center text-espresso transition-all hover:scale-105 shadow-sm group cursor-pointer"
                aria-label="Instagram"
                title="@yuktii.media.in"
              >
                <Instagram className="w-5 h-5 text-mocha group-hover:text-pink-500 transition-colors" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-espresso hover:text-pink-500 transition-colors flex items-center gap-1.5 no-underline"
              >
                <span>@yuktii.media.in</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}