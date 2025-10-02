'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function AboutSection() {
  const stats = [
    { number: '5000+', label: 'Happy Pilgrims', icon: 'material-symbols:group' },
    { number: '15+', label: 'Years Experience', icon: 'material-symbols:schedule' },
    { number: '50+', label: 'Partner Hotels', icon: 'material-symbols:hotel' },
    { number: '24/7', label: 'Support Available', icon: 'material-symbols:support-agent' }
  ];

  const values = [
    {
      icon: 'material-symbols:mosque',
      title: 'Spiritual Excellence',
      description: 'We understand the sacred nature of Umrah and ensure every aspect of your journey honors this spiritual calling.'
    },
    {
      icon: 'material-symbols:verified',
      title: 'Trust & Reliability',
      description: 'Over 15 years of experience serving pilgrims with complete transparency and unwavering commitment to quality.'
    },
    {
      icon: 'material-symbols:support-agent',
      title: 'Personalized Service',
      description: 'Every pilgrim is unique. We tailor our services to meet your specific needs and preferences throughout your journey.'
    },
    {
      icon: 'material-symbols:security',
      title: 'Complete Peace of Mind',
      description: 'From booking to return, we handle every detail so you can focus entirely on your spiritual experience.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            <span data-editor-id="app/components/AboutSection.tsx:42:13">About</span>{' '}
            <span className="bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent font-medium">
              <span data-editor-id="app/components/AboutSection.tsx:44:15">Divine Pathways</span>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <span data-editor-id="app/components/AboutSection.tsx:48:13">Your trusted partner in creating meaningful and comfortable spiritual journeys to the Holy Land</span>
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16"
        >
          <div className="text-center">
            <Icon icon="material-symbols:mosque" className="text-6xl text-amber-600 mb-6" />
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
              <span data-editor-id="app/components/AboutSection.tsx:63:15">Our Mission</span>
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              <span data-editor-id="app/components/AboutSection.tsx:66:15">At Divine Pathways, we believe that every Umrah journey should be a transformative spiritual experience, free from the worries of travel logistics. For over 15 years, we have been dedicated to providing exceptional Umrah packages that combine spiritual fulfillment with unparalleled comfort and service.</span>
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto mt-4">
              <span data-editor-id="app/components/AboutSection.tsx:69:15">Our team of experienced professionals, many of whom have completed their own Umrah pilgrimages, understand the profound significance of this sacred journey. We are committed to helping you focus on your spiritual goals while we take care of every detail.</span>
            </p>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg"
            >
              <Icon icon={stat.icon} className="text-4xl text-amber-600 mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                <span data-editor-id="app/components/AboutSection.tsx:91:17">{stat.number}</span>
              </div>
              <div className="text-gray-600 text-sm">
                <span data-editor-id="app/components/AboutSection.tsx:94:17">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            <span data-editor-id="app/components/AboutSection.tsx:108:13">Our Core Values</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon icon={value.icon} className="text-2xl text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    <span data-editor-id="app/components/AboutSection.tsx:125:21">{value.title}</span>
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    <span data-editor-id="app/components/AboutSection.tsx:128:21">{value.description}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Credentials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-100 to-amber-200 rounded-3xl p-8 md:p-12 text-center"
        >
          <Icon icon="material-symbols:verified" className="text-6xl text-amber-700 mb-6" />
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
            <span data-editor-id="app/components/AboutSection.tsx:145:13">Fully Licensed & Accredited</span>
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
            <span data-editor-id="app/components/AboutSection.tsx:148:13">Divine Pathways is fully licensed by the relevant UK travel authorities and maintains all necessary certifications for international travel services. We are ATOL protected, ensuring your complete financial security.</span>
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white rounded-lg px-6 py-3 shadow-md">
              <span data-editor-id="app/components/AboutSection.tsx:152:15" className="font-semibold text-gray-900">ATOL Protected</span>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-md">
              <span data-editor-id="app/components/AboutSection.tsx:155:15" className="font-semibold text-gray-900">ABTA Member</span>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-md">
              <span data-editor-id="app/components/AboutSection.tsx:158:15" className="font-semibold text-gray-900">Islamic Travel Specialist</span>
            </div>
          </div>
        </motion.div>

        {/* Team Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-3xl font-semibold text-gray-900 mb-8">
            <span data-editor-id="app/components/AboutSection.tsx:171:13">Meet Our Expert Team</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://i.pravatar.cc/150?u=founder" 
                alt="Founder" 
                className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                <span data-editor-id="app/components/AboutSection.tsx:182:17">Ahmed Khan</span>
              </h4>
              <p className="text-amber-600 font-medium mb-2">
                <span data-editor-id="app/components/AboutSection.tsx:185:17">Founder & CEO</span>
              </p>
              <p className="text-gray-600 text-sm">
                <span data-editor-id="app/components/AboutSection.tsx:188:17">15+ years in Islamic travel, multiple Hajj & Umrah experiences</span>
              </p>
            </div>
            <div className="text-center">
              <img 
                src="https://i.pravatar.cc/150?u=operations" 
                alt="Operations Director" 
                className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                <span data-editor-id="app/components/AboutSection.tsx:198:17">Sarah Ahmed</span>
              </h4>
              <p className="text-amber-600 font-medium mb-2">
                <span data-editor-id="app/components/AboutSection.tsx:201:17">Operations Director</span>
              </p>
              <p className="text-gray-600 text-sm">
                <span data-editor-id="app/components/AboutSection.tsx:204:17">Expert in travel logistics and customer service excellence</span>
              </p>
            </div>
            <div className="text-center">
              <img 
                src="https://i.pravatar.cc/150?u=guide" 
                alt="Head Guide" 
                className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                <span data-editor-id="app/components/AboutSection.tsx:214:17">Imam Abdullah</span>
              </h4>
              <p className="text-amber-600 font-medium mb-2">
                <span data-editor-id="app/components/AboutSection.tsx:217:17">Head Spiritual Guide</span>
              </p>
              <p className="text-gray-600 text-sm">
                <span data-editor-id="app/components/AboutSection.tsx:220:17">Islamic scholar specializing in Hajj and Umrah guidance</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}