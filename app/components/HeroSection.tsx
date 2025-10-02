'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function HeroSection() {
  const scrollToPackages = () => {
    const element = document.getElementById('packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://storage.googleapis.com/cosmic-generated-assets/backgrounds/4k/cosmic-bg-1hjfkev2gn.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-8"
        >
          <Icon icon="material-symbols:mosque" className="text-amber-300 text-lg" />
          <span data-editor-id="app/components/HeroSection.tsx:31:11" className="text-white text-sm font-medium">Premium Umrah Experience</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight"
        >
          <span data-editor-id="app/components/HeroSection.tsx:40:11">Begin Your</span><br />
          <span data-editor-id="app/components/HeroSection.tsx:41:11" className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent font-medium">Sacred Journey</span><br />
          <span data-editor-id="app/components/HeroSection.tsx:42:11">to Mecca</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
        >
          <span data-editor-id="app/components/HeroSection.tsx:51:11">Experience the pilgrimage of a lifetime with our carefully curated Umrah packages. Luxury accommodations, expert guidance, and spiritual fulfillment await.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={scrollToPackages}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-3"
          >
            <Icon icon="material-symbols:explore" className="text-xl" />
            <span data-editor-id="app/components/HeroSection.tsx:64:13">Explore Packages</span>
          </button>
          
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-3"
          >
            <Icon icon="material-symbols:contact-support" className="text-xl" />
            <span data-editor-id="app/components/HeroSection.tsx:72:13">Free Consultation</span>
          </button>
        </motion.div>

        {/* Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="material-symbols:hotel" className="text-amber-300 text-2xl" />
            </div>
            <h3 className="text-white font-medium mb-2">
              <span data-editor-id="app/components/HeroSection.tsx:87:15">Premium Hotels</span>
            </h3>
            <p className="text-white/80 text-sm">
              <span data-editor-id="app/components/HeroSection.tsx:90:15">5-star accommodations near Haram</span>
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="material-symbols:flight" className="text-amber-300 text-2xl" />
            </div>
            <h3 className="text-white font-medium mb-2">
              <span data-editor-id="app/components/HeroSection.tsx:99:15">Direct Flights</span>
            </h3>
            <p className="text-white/80 text-sm">
              <span data-editor-id="app/components/HeroSection.tsx:102:15">Comfortable journey from UK</span>
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="material-symbols:support-agent" className="text-amber-300 text-2xl" />
            </div>
            <h3 className="text-white font-medium mb-2">
              <span data-editor-id="app/components/HeroSection.tsx:111:15">Expert Guidance</span>
            </h3>
            <p className="text-white/80 text-sm">
              <span data-editor-id="app/components/HeroSection.tsx:114:15">24/7 support throughout your journey</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}