'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  socialLinks?: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

export default function Footer() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '+44 20 1234 5678',
    whatsapp: '+44 7700 900123',
    email: 'info@divinepathways.co.uk',
    address: 'London, UK',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: ''
    }
  });

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
    }
  };

  const quickLinks = [
  { label: 'Home', onClick: () => scrollToSection('hero') },
  { label: 'Packages', onClick: () => scrollToSection('packages') },
  { label: 'Hotels', onClick: () => scrollToSection('hotels') },
  { label: 'Flights', onClick: () => scrollToSection('flights') },
  { label: 'About Us', onClick: () => scrollToSection('about') },
  { label: 'Contact', onClick: () => scrollToSection('contact') }];


  const services = [
  { label: 'Umrah Packages', onClick: () => scrollToSection('packages') },
  { label: 'Hotel Booking', onClick: () => scrollToSection('hotels') },
  { label: 'Flight Booking', onClick: () => scrollToSection('flights') },
  { label: 'Group Packages', onClick: () => scrollToSection('contact') },
  { label: 'Custom Packages', onClick: () => scrollToSection('contact') },
  { label: 'Visa Assistance', onClick: () => scrollToSection('contact') }];


  const currentYear = new Date().getFullYear();

  return (
    <footer data-editor-id="app/components/Footer.tsx:75:5" className="bg-gray-900 text-white pt-16 pb-8">
      <div data-editor-id="app/components/Footer.tsx:76:7" className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div data-editor-id="app/components/Footer.tsx:78:9" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div data-editor-id="app/components/Footer.tsx:80:11" className="lg:col-span-1">
            <div data-editor-id="app/components/Footer.tsx:81:13" className="flex items-center space-x-3 mb-6">
              <div data-editor-id="app/components/Footer.tsx:82:15" className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                <Icon icon="material-symbols:mosque" className="text-white text-xl" />
              </div>
              <div data-editor-id="app/components/Footer.tsx:85:15">
                <h3 data-editor-id="app/components/Footer.tsx:86:17" className="text-xl font-semibold">
                  <span data-editor-id="app/components/Footer.tsx:78:19">Divine Pathways</span>
                </h3>
                <p data-editor-id="app/components/Footer.tsx:89:17" className="text-sm text-amber-400">
                  <span data-editor-id="app/components/Footer.tsx:81:19">Premium Umrah Packages</span>
                </p>
              </div>
            </div>
            <p data-editor-id="app/components/Footer.tsx:94:13" className="text-gray-300 text-sm mb-6 leading-relaxed">
              <span data-editor-id="app/components/Footer.tsx:86:15">Your trusted partner for spiritual journeys to the Holy Land. Creating meaningful and comfortable Umrah experiences for over 15 years.</span>
            </p>
            
            {/* Social Links */}
            {(contactInfo.socialLinks?.facebook || contactInfo.socialLinks?.instagram || contactInfo.socialLinks?.twitter) &&
            <div data-editor-id="app/components/Footer.tsx:100:15" className="flex space-x-4">
                {contactInfo.socialLinks.facebook &&
              <a data-editor-id="app/components/Footer.tsx:102:19"
              href={contactInfo.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">

                    <Icon icon="material-symbols:facebook" className="text-sm" />
                  </a>
              }
                {contactInfo.socialLinks.instagram &&
              <a data-editor-id="app/components/Footer.tsx:112:19"
              href={contactInfo.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">

                    <Icon icon="material-symbols:camera-alt" className="text-sm" />
                  </a>
              }
                {contactInfo.socialLinks.twitter &&
              <a data-editor-id="app/components/Footer.tsx:122:19"
              href={contactInfo.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">

                    <Icon icon="material-symbols:alternate-email" className="text-sm" />
                  </a>
              }
              </div>
            }
          </div>

          {/* Quick Links */}
          <div data-editor-id="app/components/Footer.tsx:136:11">
            <h4 data-editor-id="app/components/Footer.tsx:137:13" className="text-lg font-semibold mb-6">
              <span data-editor-id="app/components/Footer.tsx:119:15">Quick Links</span>
            </h4>
            <ul data-editor-id="app/components/Footer.tsx:140:13" className="space-y-3">
              {quickLinks.map((link, index) =>
              <li data-editor-id="app/components/Footer.tsx:142:17" key={index}>
                  <button data-editor-id="app/components/Footer.tsx:143:19"
                onClick={link.onClick}
                className="text-gray-300 hover:text-amber-400 transition-colors text-sm">

                    <span data-editor-id="app/components/Footer.tsx:128:21">{link.label}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Services */}
          <div data-editor-id="app/components/Footer.tsx:155:11">
            <h4 data-editor-id="app/components/Footer.tsx:156:13" className="text-lg font-semibold mb-6">
              <span data-editor-id="app/components/Footer.tsx:137:15">Our Services</span>
            </h4>
            <ul data-editor-id="app/components/Footer.tsx:159:13" className="space-y-3">
              {services.map((service, index) =>
              <li data-editor-id="app/components/Footer.tsx:161:17" key={index}>
                  <button data-editor-id="app/components/Footer.tsx:162:19"
                onClick={service.onClick}
                className="text-gray-300 hover:text-amber-400 transition-colors text-sm">

                    <span data-editor-id="app/components/Footer.tsx:146:21">{service.label}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div data-editor-id="app/components/Footer.tsx:174:11">
            <h4 data-editor-id="app/components/Footer.tsx:175:13" className="text-lg font-semibold mb-6">
              <span data-editor-id="app/components/Footer.tsx:155:15">Contact Us</span>
            </h4>
            <div data-editor-id="app/components/Footer.tsx:178:13" className="space-y-4">
              <div data-editor-id="app/components/Footer.tsx:179:15" className="flex items-center gap-3">
                <Icon icon="material-symbols:phone" className="text-amber-400" />
                <a data-editor-id="app/components/Footer.tsx:181:17" href={`tel:${contactInfo.phone}`} className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  <span data-editor-id="app/components/Footer.tsx:161:19">{contactInfo.phone}</span>
                </a>
              </div>
              <div data-editor-id="app/components/Footer.tsx:185:15" className="flex items-center gap-3">
                <Icon icon="material-symbols:chat" className="text-green-400" />
                <a data-editor-id="app/components/Footer.tsx:187:17"
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400 transition-colors text-sm">

                  <span data-editor-id="app/components/Footer.tsx:170:19">{contactInfo.whatsapp}</span>
                </a>
              </div>
              <div data-editor-id="app/components/Footer.tsx:196:15" className="flex items-center gap-3">
                <Icon icon="material-symbols:email" className="text-blue-400" />
                <a data-editor-id="app/components/Footer.tsx:198:17" href={`mailto:${contactInfo.email}`} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  <span data-editor-id="app/components/Footer.tsx:176:19">{contactInfo.email}</span>
                </a>
              </div>
              <div data-editor-id="app/components/Footer.tsx:202:15" className="flex items-start gap-3">
                <Icon icon="material-symbols:location-on" className="text-red-400 mt-0.5" />
                <p data-editor-id="app/components/Footer.tsx:204:17" className="text-gray-300 text-sm">
                  <span data-editor-id="app/components/Footer.tsx:182:19">{contactInfo.address}</span>
                </p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div data-editor-id="app/components/Footer.tsx:211:13" className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h5 data-editor-id="app/components/Footer.tsx:212:15" className="font-semibold text-sm mb-2 text-amber-400">
                <span data-editor-id="app/components/Footer.tsx:189:17">24/7 Emergency Support</span>
              </h5>
              <p data-editor-id="app/components/Footer.tsx:215:15" className="text-xs text-gray-300">
                <span data-editor-id="app/components/Footer.tsx:192:17">Available during Umrah season for urgent assistance</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div data-editor-id="app/components/Footer.tsx:223:9" className="border-t border-gray-700 pt-8">
          <div data-editor-id="app/components/Footer.tsx:224:11" className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div data-editor-id="app/components/Footer.tsx:225:13" className="text-center md:text-left">
              <p data-editor-id="app/components/Footer.tsx:226:15" className="text-sm text-gray-400">
                <span data-editor-id="app/components/Footer.tsx:202:17">© {currentYear} Divine Pathways. All rights reserved.</span>
              </p>
              <p data-editor-id="app/components/Footer.tsx:229:15" className="text-xs text-gray-500 mt-1">
                <span data-editor-id="app/components/Footer.tsx:205:17">ATOL Protected | ABTA Member | Islamic Travel Specialist</span>
              </p>
            </div>
            
            <div data-editor-id="app/components/Footer.tsx:234:13" className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <button data-editor-id="app/components/Footer.tsx:235:15"
              onClick={() => scrollToSection('contact')}
              className="text-gray-400 hover:text-amber-400 transition-colors">

                <span data-editor-id="app/components/Footer.tsx:213:17">Privacy Policy</span>
              </button>
              <button data-editor-id="app/components/Footer.tsx:241:15"
              onClick={() => scrollToSection('contact')}
              className="text-gray-400 hover:text-amber-400 transition-colors">

                <span data-editor-id="app/components/Footer.tsx:219:17">Terms & Conditions</span>
              </button>
              <button data-editor-id="app/components/Footer.tsx:247:15"
              onClick={() => scrollToSection('contact')}
              className="text-gray-400 hover:text-amber-400 transition-colors">

                <span data-editor-id="app/components/Footer.tsx:225:17">Cookie Policy</span>
              </button>
            </div>
          </div>

          {/* Additional Compliance Info */}
          <div data-editor-id="app/components/Footer.tsx:257:11" className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p data-editor-id="app/components/Footer.tsx:258:13" className="text-xs text-gray-500 leading-relaxed">
              <span data-editor-id="app/components/Footer.tsx:234:15">Divine Pathways is a trading name of [Company Name] Ltd. Registered in England & Wales. 
              Company Registration No: [Number]. ATOL License No: [Number]. 
              Financial protection provided by ATOL and ABTA bonding schemes.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>);

}