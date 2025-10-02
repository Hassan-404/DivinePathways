'use client';

import { useAuth } from 'cosmic-authentication';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const { signIn, loading } = useAuth();
  const adminEmail = process.env.NEXT_PUBLIC_SUPERUSER_EMAIL;

  return (
    <div data-editor-id="app/admin/login/page.tsx:12:5" className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <div data-editor-id="app/admin/login/page.tsx:20:9" className="flex items-center justify-center mb-6">
          <div data-editor-id="app/admin/login/page.tsx:21:11" className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
            <Icon icon="material-symbols:mosque" className="text-white text-2xl" />
          </div>
        </div>

        <h1 data-editor-id="app/admin/login/page.tsx:26:9" className="text-center text-2xl font-semibold text-gray-900 mb-2">
          <span data-editor-id="app/admin/login/page.tsx:16:11">Admin Sign In</span>
        </h1>
        <p data-editor-id="app/admin/login/page.tsx:29:9" className="text-center text-sm text-gray-600 mb-6">
          <span data-editor-id="app/admin/login/page.tsx:19:11">Use your administrator email to continue.</span>
        </p>

        <div data-editor-id="app/admin/login/page.tsx:33:9" className="space-y-4">
          <button
            onClick={signIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white py-2.5 rounded-lg transition-colors">
            <Icon icon="material-symbols:login" className="text-xl" />
            <span data-editor-id="app/admin/login/page.tsx:23:11">Continue to secure sign in</span>
          </button>

          {adminEmail && (
            <div data-editor-id="app/admin/login/page.tsx:42:11" className="text-xs text-gray-500 text-center">
              <span data-editor-id="app/admin/login/page.tsx:24:13">Authorized admin email: {adminEmail}</span>
            </div>
          )}
        </div>

        <div data-editor-id="app/admin/login/page.tsx:48:9" className="mt-8 text-center text-sm text-gray-600">
          <span data-editor-id="app/admin/login/page.tsx:28:11">Not an admin?</span>
          <Link href="/" className="ml-1 text-amber-700 hover:underline">
            <span data-editor-id="app/admin/login/page.tsx:31:13">Return to website</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
