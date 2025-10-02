'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

interface Package {
  id: string;
  name: string;
}

export default function ContactSection() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '+44 20 1234 5678',
    whatsapp: '+44 7700 900123',
    email: 'info@divinepathways.co.uk',
    address: 'London, UK'
  });
  const [packages, setPackages] = useState<Package[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedPackage: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // Fetch contact info
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

    // Fetch packages for the dropdown
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages');
        const data = await response.json();
        if (response.ok) {
          setPackages(data.packages || []);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchContactInfo();
    fetchPackages();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          source: 'website'
        })
      });

      if (response.ok) {
        setSubmitMessage('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          selectedPackage: '',
          message: ''
        });
      } else {
        setSubmitMessage('There was an error submitting your inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('There was an error submitting your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section data-editor-id="app/components/ContactSection.tsx:114:5" id="contact" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div data-editor-id="app/components/ContactSection.tsx:115:7" className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <h2 data-editor-id="app/components/ContactSection.tsx:124:11" className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            <span data-editor-id="app/components/ContactSection.tsx:94:13">Get in</span>{' '}
            <span data-editor-id="app/components/ContactSection.tsx:126:13" className="bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent font-medium">
              <span data-editor-id="app/components/ContactSection.tsx:96:15">Touch</span>
            </span>
          </h2>
          <p data-editor-id="app/components/ContactSection.tsx:130:11" className="text-xl text-gray-600 max-w-3xl mx-auto">
            <span data-editor-id="app/components/ContactSection.tsx:100:13">Ready to begin your spiritual journey? Contact our expert team for personalized guidance and support</span>
          </p>
        </motion.div>

        <div data-editor-id="app/components/ContactSection.tsx:135:9" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8">

            <div data-editor-id="app/components/ContactSection.tsx:144:13">
              <h3 data-editor-id="app/components/ContactSection.tsx:145:15" className="text-2xl font-semibold text-gray-900 mb-8">
                <span data-editor-id="app/components/ContactSection.tsx:114:17">Contact Information</span>
              </h3>
              
              <div data-editor-id="app/components/ContactSection.tsx:149:15" className="space-y-6">
                <div data-editor-id="app/components/ContactSection.tsx:150:17" className="flex items-center gap-4">
                  <div data-editor-id="app/components/ContactSection.tsx:151:19" className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Icon icon="material-symbols:phone" className="text-xl text-amber-600" />
                  </div>
                  <div data-editor-id="app/components/ContactSection.tsx:154:19">
                    <h4 data-editor-id="app/components/ContactSection.tsx:155:21" className="font-semibold text-gray-900">
                      <span data-editor-id="app/components/ContactSection.tsx:124:23">Phone</span>
                    </h4>
                    <a data-editor-id="app/components/ContactSection.tsx:158:21" href={`tel:${contactInfo.phone}`} className="text-gray-600 hover:text-amber-600 transition-colors">
                      <span data-editor-id="app/components/ContactSection.tsx:127:23">{contactInfo.phone}</span>
                    </a>
                  </div>
                </div>

                <div data-editor-id="app/components/ContactSection.tsx:164:17" className="flex items-center gap-4">
                  <div data-editor-id="app/components/ContactSection.tsx:165:19" className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon icon="material-symbols:chat" className="text-xl text-green-600" />
                  </div>
                  <div data-editor-id="app/components/ContactSection.tsx:168:19">
                    <h4 data-editor-id="app/components/ContactSection.tsx:169:21" className="font-semibold text-gray-900">
                      <span data-editor-id="app/components/ContactSection.tsx:137:23">WhatsApp</span>
                    </h4>
                    <a data-editor-id="app/components/ContactSection.tsx:172:21"
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-green-600 transition-colors">

                      <span data-editor-id="app/components/ContactSection.tsx:144:23">{contactInfo.whatsapp}</span>
                    </a>
                  </div>
                </div>

                <div data-editor-id="app/components/ContactSection.tsx:183:17" className="flex items-center gap-4">
                  <div data-editor-id="app/components/ContactSection.tsx:184:19" className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon icon="material-symbols:email" className="text-xl text-blue-600" />
                  </div>
                  <div data-editor-id="app/components/ContactSection.tsx:187:19">
                    <h4 data-editor-id="app/components/ContactSection.tsx:188:21" className="font-semibold text-gray-900">
                      <span data-editor-id="app/components/ContactSection.tsx:154:23">Email</span>
                    </h4>
                    <a data-editor-id="app/components/ContactSection.tsx:191:21" href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                      <span data-editor-id="app/components/ContactSection.tsx:157:23">{contactInfo.email}</span>
                    </a>
                  </div>
                </div>

                <div data-editor-id="app/components/ContactSection.tsx:197:17" className="flex items-center gap-4">
                  <div data-editor-id="app/components/ContactSection.tsx:198:19" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon icon="material-symbols:location-on" className="text-xl text-gray-600" />
                  </div>
                  <div data-editor-id="app/components/ContactSection.tsx:201:19">
                    <h4 data-editor-id="app/components/ContactSection.tsx:202:21" className="font-semibold text-gray-900">
                      <span data-editor-id="app/components/ContactSection.tsx:167:23">Address</span>
                    </h4>
                    <p data-editor-id="app/components/ContactSection.tsx:205:21" className="text-gray-600">
                      <span data-editor-id="app/components/ContactSection.tsx:170:23">{contactInfo.address}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div data-editor-id="app/components/ContactSection.tsx:214:13" className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 data-editor-id="app/components/ContactSection.tsx:215:15" className="font-semibold text-gray-900 mb-4">
                <span data-editor-id="app/components/ContactSection.tsx:179:17">Business Hours</span>
              </h4>
              <div data-editor-id="app/components/ContactSection.tsx:218:15" className="space-y-2 text-sm">
                <div data-editor-id="app/components/ContactSection.tsx:219:17" className="flex justify-between">
                  <span data-editor-id="app/components/ContactSection.tsx:183:19" className="text-gray-600">Monday - Friday:</span>
                  <span data-editor-id="app/components/ContactSection.tsx:221:19" className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div data-editor-id="app/components/ContactSection.tsx:223:17" className="flex justify-between">
                  <span data-editor-id="app/components/ContactSection.tsx:187:19" className="text-gray-600">Saturday:</span>
                  <span data-editor-id="app/components/ContactSection.tsx:225:19" className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div data-editor-id="app/components/ContactSection.tsx:227:17" className="flex justify-between">
                  <span data-editor-id="app/components/ContactSection.tsx:191:19" className="text-gray-600">Sunday:</span>
                  <span data-editor-id="app/components/ContactSection.tsx:229:19" className="font-medium">Closed</span>
                </div>
                <div data-editor-id="app/components/ContactSection.tsx:231:17" className="pt-2 border-t border-gray-200">
                  <p data-editor-id="app/components/ContactSection.tsx:232:19" className="text-xs text-amber-600">
                    <span data-editor-id="app/components/ContactSection.tsx:196:21">Emergency support available 24/7 during Umrah season</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8">

            <h3 data-editor-id="app/components/ContactSection.tsx:248:13" className="text-2xl font-semibold text-gray-900 mb-6">
              <span data-editor-id="app/components/ContactSection.tsx:211:15">Send Us a Message</span>
            </h3>

            <form data-editor-id="app/components/ContactSection.tsx:252:13" onSubmit={handleSubmit} className="space-y-6">
              <div data-editor-id="app/components/ContactSection.tsx:253:15" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div data-editor-id="app/components/ContactSection.tsx:254:17">
                  <label data-editor-id="app/components/ContactSection.tsx:255:19" htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    <span data-editor-id="app/components/ContactSection.tsx:218:21">Full Name *</span>
                  </label>
                  <input data-editor-id="app/components/ContactSection.tsx:258:19"
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your full name" />

                </div>
                <div data-editor-id="app/components/ContactSection.tsx:269:17">
                  <label data-editor-id="app/components/ContactSection.tsx:270:19" htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <span data-editor-id="app/components/ContactSection.tsx:231:21">Email Address *</span>
                  </label>
                  <input data-editor-id="app/components/ContactSection.tsx:273:19"
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your email address" />

                </div>
              </div>

              <div data-editor-id="app/components/ContactSection.tsx:286:15" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div data-editor-id="app/components/ContactSection.tsx:287:17">
                  <label data-editor-id="app/components/ContactSection.tsx:288:19" htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    <span data-editor-id="app/components/ContactSection.tsx:247:21">Phone Number</span>
                  </label>
                  <input data-editor-id="app/components/ContactSection.tsx:291:19"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your phone number" />

                </div>
                <div data-editor-id="app/components/ContactSection.tsx:301:17">
                  <label data-editor-id="app/components/ContactSection.tsx:302:19" htmlFor="selectedPackage" className="block text-sm font-medium text-gray-700 mb-2">
                    <span data-editor-id="app/components/ContactSection.tsx:259:21">Interested Package</span>
                  </label>
                  <select data-editor-id="app/components/ContactSection.tsx:305:19"
                  id="selectedPackage"
                  name="selectedPackage"
                  value={formData.selectedPackage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">

                    <option data-editor-id="app/components/ContactSection.tsx:312:21" value="">Select a package</option>
                    {packages.map((pkg) =>
                    <option data-editor-id="app/components/ContactSection.tsx:314:23" key={pkg.id} value={pkg.name}>
                        {pkg.name}
                      </option>
                    )}
                    <option data-editor-id="app/components/ContactSection.tsx:318:21" value="custom">Custom Package</option>
                  </select>
                </div>
              </div>

              <div data-editor-id="app/components/ContactSection.tsx:323:15">
                <label data-editor-id="app/components/ContactSection.tsx:324:17" htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  <span data-editor-id="app/components/ContactSection.tsx:279:19">Message *</span>
                </label>
                <textarea data-editor-id="app/components/ContactSection.tsx:327:17"
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-vertical"
                placeholder="Tell us about your requirements, travel dates, or any questions you have..." />

              </div>

              {submitMessage &&
              <div data-editor-id="app/components/ContactSection.tsx:340:17" className={`p-4 rounded-xl ${submitMessage.includes('Thank you') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  <span data-editor-id="app/components/ContactSection.tsx:294:19">{submitMessage}</span>
                </div>
              }

              <button data-editor-id="app/components/ContactSection.tsx:345:15"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">

                {isSubmitting ?
                <>
                    <Icon icon="material-symbols:sync" className="text-lg animate-spin" />
                    <span data-editor-id="app/components/ContactSection.tsx:305:21">Submitting...</span>
                  </> :

                <>
                    <Icon icon="material-symbols:send" className="text-lg" />
                    <span data-editor-id="app/components/ContactSection.tsx:310:21">Send Message</span>
                  </>
                }
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>);

}