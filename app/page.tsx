'use client';

import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';
import PackagesSection from '@/app/components/PackagesSection';
import HotelsSection from '@/app/components/HotelsSection';
import FlightsSection from '@/app/components/FlightsSection';
import AboutSection from '@/app/components/AboutSection';
import ContactSection from '@/app/components/ContactSection';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PackagesSection />
      <HotelsSection />
      <FlightsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}