'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

export default function ContactInfoManager() {
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contact-info');
      const data = await response.json();
      if (response.ok) {
        setContactInfo(data);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('socialLinks.')) {
      const socialKey = name.replace('socialLinks.', '');
      setContactInfo(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setContactInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch('/api/contact-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactInfo)
      });

      if (response.ok) {
        setSaveMessage('Contact information updated successfully!');
      } else {
        setSaveMessage('Error updating contact information. Please try again.');
      }
    } catch (error) {
      console.error('Error saving contact info:', error);
      setSaveMessage('Error updating contact information. Please try again.');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          <span data-editor-id="app/components/admin/ContactInfoManager.tsx:98:11">Contact Information</span>
        </h1>
        <p className="text-gray-600">
          <span data-editor-id="app/components/admin/ContactInfoManager.tsx:101:11">Manage your website contact details and social links</span>
        </p>
      </div>

      {/* Contact Information Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <form onSubmit={handleSave} className="space-y-6">
          {/* Primary Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon icon="material-symbols:contact-phone" className="text-xl text-amber-600" />
              <span data-editor-id="app/components/admin/ContactInfoManager.tsx:115:15">Primary Contact Details</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span data-editor-id="app/components/admin/ContactInfoManager.tsx:121:19">Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleInputChange}
                  placeholder="+44 20 1234 5678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span data-editor-id="app/components/admin/ContactInfoManager.tsx:134:19">WhatsApp Number</span>
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={contactInfo.whatsapp}
                  onChange={handleInputChange}
                  placeholder="+44 7700 900123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span data-editor-id="app/components/admin/ContactInfoManager.tsx:147:19">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleInputChange}
                  placeholder="info@divinepathways.co.uk"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span data-editor-id="app/components/admin/ContactInfoManager.tsx:160:19">Business Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={contactInfo.address}
                  onChange={handleInputChange}
                  placeholder="London, UK"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon icon="material-symbols:share" className="text-xl text-amber-600" />
              <span data-editor-id="app/components/admin/ContactInfoManager.tsx:177:15">Social Media Links</span>
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              <span data-editor-id="app/components/admin/ContactInfoManager.tsx:180:15">Leave blank if you don&apos;t have social media accounts</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Icon icon="material-symbols:facebook" className="text-blue-600" />
                  <span data-editor-id="app/components/admin/ContactInfoManager.tsx:186:19">Facebook</span>
                </label>
                <input
                  type="url"
                  name="socialLinks.facebook"
                  value={contactInfo.socialLinks.facebook}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/divinepathways"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Icon icon="material-symbols:camera-alt" className="text-pink-600" />
                  <span data-editor-id="app/components/admin/ContactInfoManager.tsx:199:19">Instagram</span>
                </label>
                <input
                  type="url"
                  name="socialLinks.instagram"
                  value={contactInfo.socialLinks.instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/divinepathways"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Icon icon="material-symbols:alternate-email" className="text-blue-400" />
                  <span data-editor-id="app/components/admin/ContactInfoManager.tsx:212:19">Twitter</span>
                </label>
                <input
                  type="url"
                  name="socialLinks.twitter"
                  value={contactInfo.socialLinks.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/divinepathways"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Save Message */}
          {saveMessage && (
            <div className={`p-4 rounded-lg ${
              saveMessage.includes('successfully') 
                ? 'bg-green-50 text-green-700' 
                : 'bg-red-50 text-red-700'
            }`}>
              <span data-editor-id="app/components/admin/ContactInfoManager.tsx:230:15">{saveMessage}</span>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Icon icon="material-symbols:sync" className="animate-spin" />
                  <span data-editor-id="app/components/admin/ContactInfoManager.tsx:243:19">Saving...</span>
                </>
              ) : (
                <>
                  <Icon icon="material-symbols:save" />
                  <span data-editor-id="app/components/admin/ContactInfoManager.tsx:248:19">Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Preview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Icon icon="material-symbols:preview" className="text-xl text-amber-600" />
          <span data-editor-id="app/components/admin/ContactInfoManager.tsx:265:11">Preview</span>
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          <span data-editor-id="app/components/admin/ContactInfoManager.tsx:268:11">This is how your contact information will appear on the website</span>
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Icon icon="material-symbols:phone" className="text-amber-600" />
            <span className="text-gray-800">{contactInfo.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Icon icon="material-symbols:chat" className="text-green-600" />
            <span className="text-gray-800">{contactInfo.whatsapp}</span>
          </div>
          <div className="flex items-center gap-3">
            <Icon icon="material-symbols:email" className="text-blue-600" />
            <span className="text-gray-800">{contactInfo.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Icon icon="material-symbols:location-on" className="text-red-600" />
            <span className="text-gray-800">{contactInfo.address}</span>
          </div>
          
          {(contactInfo.socialLinks.facebook || contactInfo.socialLinks.instagram || contactInfo.socialLinks.twitter) && (
            <div className="pt-2 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">
                <span data-editor-id="app/components/admin/ContactInfoManager.tsx:289:17">Social Media:</span>
              </p>
              <div className="flex gap-2">
                {contactInfo.socialLinks.facebook && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Icon icon="material-symbols:facebook" />
                    <span data-editor-id="app/components/admin/ContactInfoManager.tsx:295:21">Facebook</span>
                  </div>
                )}
                {contactInfo.socialLinks.instagram && (
                  <div className="flex items-center gap-2 text-sm text-pink-600">
                    <Icon icon="material-symbols:camera-alt" />
                    <span data-editor-id="app/components/admin/ContactInfoManager.tsx:301:21">Instagram</span>
                  </div>
                )}
                {contactInfo.socialLinks.twitter && (
                  <div className="flex items-center gap-2 text-sm text-blue-400">
                    <Icon icon="material-symbols:alternate-email" />
                    <span data-editor-id="app/components/admin/ContactInfoManager.tsx:307:21">Twitter</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Important Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <div className="flex items-start gap-3">
          <Icon icon="material-symbols:info" className="text-blue-600 text-xl mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">
              <span data-editor-id="app/components/admin/ContactInfoManager.tsx:326:15">Important Notes</span>
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                <span data-editor-id="app/components/admin/ContactInfoManager.tsx:330:17">• Changes will be reflected immediately on the website</span>
              </li>
              <li>
                <span data-editor-id="app/components/admin/ContactInfoManager.tsx:333:17">• WhatsApp number will be used for the floating chat button</span>
              </li>
              <li>
                <span data-editor-id="app/components/admin/ContactInfoManager.tsx:336:17">• Email address will be used for inquiry form submissions</span>
              </li>
              <li>
                <span data-editor-id="app/components/admin/ContactInfoManager.tsx:339:17">• Social media links will appear in the footer if provided</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}