'use client';

import { useState } from 'react';
import { useAuth } from 'cosmic-authentication';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

import AdminLayout from '@/app/components/admin/AdminLayout';
import PackagesManager from '@/app/components/admin/PackagesManager';
import HotelsManager from '@/app/components/admin/HotelsManager';
import FlightsManager from '@/app/components/admin/FlightsManager';
import InquiriesManager from '@/app/components/admin/InquiriesManager';
import ContactInfoManager from '@/app/components/admin/ContactInfoManager';
import Dashboard from '@/app/components/admin/Dashboard';

export default function AdminPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const superuserEmail = process.env.NEXT_PUBLIC_SUPERUSER_EMAIL;

  // Redirect if not authenticated or not admin
  if (loading) {
    return (
      <div data-editor-id="app/admin/page.tsx:23:7" className="min-h-screen flex items-center justify-center">
        <div data-editor-id="app/admin/page.tsx:24:9" className="text-center">
          <Icon icon="material-symbols:sync" className="text-4xl text-amber-600 animate-spin mb-4" />
          <p data-editor-id="app/admin/page.tsx:26:11" className="text-gray-600">Loading...</p>
        </div>
      </div>);

  }

  const isAdmin = isAuthenticated && (user?.role === 'admin' || (superuserEmail && user?.email === superuserEmail));

  if (!isAdmin) {
    return (
      <div data-editor-id="app/admin/page.tsx:34:7" className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8">

          <Icon icon="material-symbols:lock" className="text-6xl text-red-500 mb-4" />
          <h1 data-editor-id="app/admin/page.tsx:41:11" className="text-2xl font-bold text-gray-900 mb-4">
            <span data-editor-id="app/admin/page.tsx:39:13">Access Denied</span>
          </h1>
          <p data-editor-id="app/admin/page.tsx:44:11" className="text-gray-600 mb-6">
            <span data-editor-id="app/admin/page.tsx:42:13">You need admin privileges to access this page.</span>
          </p>
          <button data-editor-id="app/admin/page.tsx:47:11"
          onClick={() => window.location.href = '/admin/login'}
          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors">

            <span data-editor-id="app/admin/page.tsx:47:13">Sign in as Admin</span>
          </button>
        </motion.div>
      </div>);

  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'packages':
        return <PackagesManager />;
      case 'hotels':
        return <HotelsManager />;
      case 'flights':
        return <FlightsManager />;
      case 'inquiries':
        return <InquiriesManager />;
      case 'contact':
        return <ContactInfoManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </AdminLayout>);

}