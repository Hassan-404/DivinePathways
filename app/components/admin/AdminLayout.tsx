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
  { id: 'contact', label: 'Contact Info', icon: 'material-symbols:contact-page' }];


  return (
    <div data-editor-id="app/components/admin/AdminLayout.tsx:28:5" className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen &&
      <div data-editor-id="app/components/admin/AdminLayout.tsx:31:9"
      className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
      onClick={() => setSidebarOpen(false)} />

      }

      {/* Sidebar */}
      <div data-editor-id="app/components/admin/AdminLayout.tsx:38:7" className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div data-editor-id="app/components/admin/AdminLayout.tsx:42:9" className="flex flex-col h-full">
          {/* Logo */}
          <div data-editor-id="app/components/admin/AdminLayout.tsx:44:11" className="p-6 border-b border-gray-200">
            <Link href="/" className="flex items-center space-x-3">
              <div data-editor-id="app/components/admin/AdminLayout.tsx:46:15" className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                <Icon icon="material-symbols:mosque" className="text-white text-lg" />
              </div>
              <div data-editor-id="app/components/admin/AdminLayout.tsx:49:15">
                <h2 data-editor-id="app/components/admin/AdminLayout.tsx:50:17" className="text-lg font-semibold text-gray-900">
                  <span data-editor-id="app/components/admin/AdminLayout.tsx:43:19">Divine Pathways</span>
                </h2>
                <p data-editor-id="app/components/admin/AdminLayout.tsx:53:17" className="text-xs text-amber-600">
                  <span data-editor-id="app/components/admin/AdminLayout.tsx:46:19">Admin Panel</span>
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav data-editor-id="app/components/admin/AdminLayout.tsx:61:11" className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) =>
            <button data-editor-id="app/components/admin/AdminLayout.tsx:63:15"
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                  ${activeTab === item.id ?
            'bg-amber-100 text-amber-700 border border-amber-200' :
            'text-gray-700 hover:bg-gray-100'}
                `
            }>

                <Icon icon={item.icon} className="text-xl" />
                <span data-editor-id="app/components/admin/AdminLayout.tsx:65:17" className="font-medium">{item.label}</span>
              </button>
            )}
          </nav>

          {/* User Info */}
          <div data-editor-id="app/components/admin/AdminLayout.tsx:84:11" className="p-4 border-t border-gray-200">
            <div data-editor-id="app/components/admin/AdminLayout.tsx:85:13" className="flex items-center space-x-3 mb-4">
              <div data-editor-id="app/components/admin/AdminLayout.tsx:86:15" className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <Icon icon="material-symbols:person" className="text-gray-600 text-xl" />
              </div>
              <div data-editor-id="app/components/admin/AdminLayout.tsx:89:15" className="flex-1 min-w-0">
                <p data-editor-id="app/components/admin/AdminLayout.tsx:90:17" className="text-sm font-medium text-gray-900 truncate">
                  <span data-editor-id="app/components/admin/AdminLayout.tsx:77:19">{user?.displayName}</span>
                </p>
                <p data-editor-id="app/components/admin/AdminLayout.tsx:93:17" className="text-xs text-gray-500 truncate">
                  <span data-editor-id="app/components/admin/AdminLayout.tsx:80:19">{user?.email}</span>
                </p>
              </div>
            </div>
            
            <div data-editor-id="app/components/admin/AdminLayout.tsx:99:13" className="space-y-2">
              <Link
                href="/"
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">

                <Icon icon="material-symbols:home" className="text-lg" />
                <span data-editor-id="app/components/admin/AdminLayout.tsx:90:17">View Website</span>
              </Link>
              <button data-editor-id="app/components/admin/AdminLayout.tsx:107:15"
              onClick={signOut}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">

                <Icon icon="material-symbols:logout" className="text-lg" />
                <span data-editor-id="app/components/admin/AdminLayout.tsx:97:17">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div data-editor-id="app/components/admin/AdminLayout.tsx:120:7" className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header data-editor-id="app/components/admin/AdminLayout.tsx:122:9" className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div data-editor-id="app/components/admin/AdminLayout.tsx:123:11" className="px-4 sm:px-6 lg:px-8">
            <div data-editor-id="app/components/admin/AdminLayout.tsx:124:13" className="flex justify-between items-center h-16">
              <button data-editor-id="app/components/admin/AdminLayout.tsx:125:15"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">

                <Icon icon="material-symbols:menu" className="text-2xl" />
              </button>
              
              <h1 data-editor-id="app/components/admin/AdminLayout.tsx:132:15" className="text-lg font-semibold text-gray-900">
                <span data-editor-id="app/components/admin/AdminLayout.tsx:116:17">Admin Panel</span>
              </h1>
              
              <div data-editor-id="app/components/admin/AdminLayout.tsx:136:15" className="w-10" /> {/* Spacer for centering */}
            </div>
          </div>
        </header>

        {/* Content */}
        <main data-editor-id="app/components/admin/AdminLayout.tsx:142:9" className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>);

}