import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import TrainHeroSection from '@/components/TrainHeroSection';

// Below-the-fold sections are code-split and loaded on demand to
// reduce the initial JavaScript payload and improve first paint.
const DashboardMetrics = dynamic(() => import('@/components/DashboardMetrics'));
const ServicesSection = dynamic(() => import('@/components/ServicesSection'));
const WorkSection = dynamic(() => import('@/components/WorkSection'));
const WebsitesSection = dynamic(() => import('@/components/WebsitesSection'));
const ReviewsSection = dynamic(() => import('@/components/ReviewsSection'));
const AboutSection = dynamic(() => import('@/components/AboutSection'));
const ContactSection = dynamic(() => import('@/components/ContactSection'));
const Footer = dynamic(() => import('@/components/Footer'));

function SectionLoader() {
  return <div className="w-full h-24 bg-transparent" aria-hidden="true" />;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream text-espresso flex flex-col font-inter selection:bg-purple-500 selection:text-white transition-colors duration-300">
      {/* Navigation */}
      <Navbar />

      {/* Train-Themed Roller Coaster Opening Hero Section */}
      <TrainHeroSection />

      {/* Dashboard Analytics */}
      <Suspense fallback={<SectionLoader />}>
        <DashboardMetrics />
      </Suspense>

      {/* Main Content Layout */}
      <main className="w-full flex-1 flex flex-col items-center">
        {/* Services */}
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>

        {/* Work / Video Reels */}
        <Suspense fallback={<SectionLoader />}>
          <WorkSection />
        </Suspense>

        {/* 3D Websites Showcase */}
        <Suspense fallback={<SectionLoader />}>
          <WebsitesSection />
        </Suspense>

        {/* Client Reviews */}
        <Suspense fallback={<SectionLoader />}>
          <ReviewsSection />
        </Suspense>

        {/* About Us */}
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>

        {/* Contact */}
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}