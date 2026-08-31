'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import DashboardMetrics from '@/components/DashboardMetrics';
import ServicesSection from '@/components/ServicesSection';
import WorkSection from '@/components/WorkSection';
import WebsitesSection from '@/components/WebsitesSection';
import ReviewsSection from '@/components/ReviewsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#231e10] text-white flex flex-col font-inter selection:bg-[#fac638] selection:text-[#231e10]">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section with Integrated 3D Logo & Scroll-Driven Circle Inversion Animation */}
      <HeroSection />

      {/* Dashboard Analytics */}
      <DashboardMetrics />

      {/* Main Content Layout */}
      <main className="w-full flex-1 flex flex-col items-center">
        {/* Services */}
        <ServicesSection />

        {/* Work / Video Reels */}
        <WorkSection />

        {/* 3D Websites Showcase */}
        <WebsitesSection />

        {/* Client Reviews */}
        <ReviewsSection />

        {/* About Us */}
        <AboutSection />

        {/* Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
