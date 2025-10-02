'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useAuth } from 'cosmic-authentication';
import Link from 'next/link';

interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '+44 20 1234 5678',
    whatsapp: '+44 7700 900123',
    email: 'info@divinepathways.co.uk'
  });
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const superuserEmail = process.env.NEXT_PUBLIC_SUPERUSER_EMAIL;

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('/api/contact-info');
        const data = await response.json();
        if (response.ok) {
          setContactInfo(data);
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
  { label: 'Home', href: 'hero' },
  { label: 'Packages', href: 'packages' },
  { label: 'Hotels', href: 'hotels' },
  { label: 'Flights', href: 'flights' },
  { label: 'About Us', href: 'about' },
  { label: 'Contact', href: 'contact' }];


  return (
    <>
      {/* Top Contact Bar */}
      <div data-editor-id="app/components/Navbar.tsx:60:7" className="bg-gradient-to-r from-amber-800 to-amber-700 text-white py-2 px-4 text-sm">
        <div data-editor-id="app/components/Navbar.tsx:61:9" className="max-w-7xl mx-auto flex justify-between items-center">
          <div data-editor-id="app/components/Navbar.tsx:62:11" className="flex items-center gap-6">
            <a data-editor-id="app/components/Navbar.tsx:63:13"
            href={`tel:${contactInfo.phone}`}
            className="flex items-center gap-2 hover:text-amber-200 transition-colors">

              <Icon icon="material-symbols:phone" className="text-base" />
              <span data-editor-id="app/components/Navbar.tsx:51:15">{contactInfo.phone}</span>
            </a>
            <a data-editor-id="app/components/Navbar.tsx:70:13"
            href={`mailto:${contactInfo.email}`}
            className="hidden md:flex items-center gap-2 hover:text-amber-200 transition-colors">

              <Icon icon="material-symbols:email" className="text-base" />
              <span data-editor-id="app/components/Navbar.tsx:58:15">{contactInfo.email}</span>
            </a>
          </div>
          <div data-editor-id="app/components/Navbar.tsx:78:11" className="flex items-center gap-4">
            {isAuthenticated ?
            <div data-editor-id="app/components/Navbar.tsx:80:15" className="flex items-center gap-3">
                <span data-editor-id="app/components/Navbar.tsx:64:17">Welcome, {user?.displayName}</span>
                {(user?.role === 'admin' || (superuserEmail && user?.email === superuserEmail)) &&
              <Link
                href="/admin"
                className="text-xs bg-amber-600 px-2 py-1 rounded-full hover:bg-amber-500 transition-colors">

                    <span data-editor-id="app/components/Navbar.tsx:69:21">Admin</span>
                  </Link>
              }
                <button data-editor-id="app/components/Navbar.tsx:90:17"
              onClick={signOut}
              className="text-xs hover:text-amber-200 transition-colors">

                  <span data-editor-id="app/components/Navbar.tsx:76:19">Sign Out</span>
                </button>
              </div> :

            <button data-editor-id="app/components/Navbar.tsx:98:15"
            onClick={signIn}
            className="text-xs hover:text-amber-200 transition-colors">

                <span data-editor-id="app/components/Navbar.tsx:84:17">Sign In</span>
              </button>
            }
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav data-editor-id="app/components/Navbar.tsx:110:7" className="bg-white/95 backdrop-blur-md shadow-lg border-b border-amber-100 sticky top-0 z-40">
        <div data-editor-id="app/components/Navbar.tsx:111:9" className="max-w-7xl mx-auto px-4">
          <div data-editor-id="app/components/Navbar.tsx:112:11" className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div data-editor-id="app/components/Navbar.tsx:115:15" className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                <Icon icon="material-symbols:mosque" className="text-white text-xl" />
              </div>
              <div data-editor-id="app/components/Navbar.tsx:118:15">
                <h1 data-editor-id="app/components/Navbar.tsx:119:17" className="text-xl font-semibold text-gray-900">
                  <span data-editor-id="app/components/Navbar.tsx:101:19">Divine Pathways</span>
                </h1>
                <p data-editor-id="app/components/Navbar.tsx:122:17" className="text-xs text-amber-700 font-light">
                  <span data-editor-id="app/components/Navbar.tsx:104:19">Premium Umrah Packages</span>
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div data-editor-id="app/components/Navbar.tsx:129:13" className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) =>
              <button data-editor-id="app/components/Navbar.tsx:131:17"
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-gray-700 hover:text-amber-700 font-medium text-sm transition-colors">

                  <span data-editor-id="app/components/Navbar.tsx:116:19">{item.label}</span>
                </button>
              )}
              
              <a data-editor-id="app/components/Navbar.tsx:140:15"
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium">

                <Icon icon="material-symbols:chat" className="text-lg" />
                <span data-editor-id="app/components/Navbar.tsx:128:17">WhatsApp</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button data-editor-id="app/components/Navbar.tsx:152:13"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">

              <Icon
                icon={isMenuOpen ? "material-symbols:close" : "material-symbols:menu"}
                className="text-2xl text-gray-700" />

            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200">

              <div data-editor-id="app/components/Navbar.tsx:174:15" className="px-4 py-4 space-y-3">
                {menuItems.map((item) =>
              <button data-editor-id="app/components/Navbar.tsx:176:19"
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left text-gray-700 hover:text-amber-700 font-medium py-2 transition-colors">

                    <span data-editor-id="app/components/Navbar.tsx:157:21">{item.label}</span>
                  </button>
              )}
                
                <div data-editor-id="app/components/Navbar.tsx:185:17" className="pt-4 border-t border-gray-200">
                  <a data-editor-id="app/components/Navbar.tsx:186:19"
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-green-600 font-medium py-2">

                    <Icon icon="material-symbols:chat" className="text-xl" />
                    <span data-editor-id="app/components/Navbar.tsx:170:21">Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </nav>

      {/* Floating WhatsApp Button */}
      <a data-editor-id="app/components/Navbar.tsx:203:7"
      href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hi! I'm interested in your Umrah packages. Could you please provide more information?`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200">

        <Icon icon="material-symbols:chat" className="text-2xl" />
      </a>
    </>);

}