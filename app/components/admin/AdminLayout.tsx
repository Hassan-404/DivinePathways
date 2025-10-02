'use client';

import { useState } from 'react';
import { useAuth } from 'cosmic-authentication';
import { Icon } from '@iconify/react';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminLayout({ children, activeTab, setActiveTab }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'material-symbols:dashboard' },
    { id: 'packages', label: 'Packages', icon: 'material-symbols:package' },
    { id: 'hotels', label: 'Hotels', icon: 'material-symbols:hotel' },
    { id: 'flights', label: 'Flights', icon: 'material-symbols:flight' },
    { id: 'inquiries', label: 'Inquiries', icon: 'material-symbols:contact-support' },
    { id: 'contact', label: 'Contact Info', icon: 'material-symbols:contact-page' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                <Icon icon="material-symbols:mosque" className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  <span data-editor-id="app/components/admin/AdminLayout.tsx:43:19">Divine Pathways</span>
                </h2>
                <p className="text-xs text-amber-600">
                  <span data-editor-id="app/components/admin/AdminLayout.tsx:46:19">Admin Panel</span>
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                  ${activeTab === item.id
                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon icon={item.icon} className="text-xl" />
                <span data-editor-id="app/components/admin/AdminLayout.tsx:65:17" className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <Icon icon="material-symbols:person" className="text-gray-600 text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  <span data-editor-id="app/components/admin/AdminLayout.tsx:77:19">{user?.displayName}</span>
                </p>
                <p className="text-xs text-gray-500 truncate">
                  <span data-editor-id="app/components/admin/AdminLayout.tsx:80:19">{user?.email}</span>
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Link
                href="/"
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Icon icon="material-symbols:home" className="text-lg" />
                <span data-editor-id="app/components/admin/AdminLayout.tsx:90:17">View Website</span>
              </Link>
              <button
                onClick={signOut}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Icon icon="material-symbols:logout" className="text-lg" />
                <span data-editor-id="app/components/admin/AdminLayout.tsx:97:17">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Icon icon="material-symbols:menu" className="text-2xl" />
              </button>
              
              <h1 className="text-lg font-semibold text-gray-900">
                <span data-editor-id="app/components/admin/AdminLayout.tsx:116:17">Admin Panel</span>
              </h1>
              
              <div className="w-10" /> {/* Spacer for centering */}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}