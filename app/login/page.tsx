'use client';

import { useState } from 'react';
import { useAuth } from 'cosmic-authentication';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function UserLoginPage() {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');

  const validateEmailFormat = (value: string) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return re.test(value.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmailFormat(email)) {
      setError('Invalid email address');
      return;
    }

    try {
      const res = await fetch('/api/validate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Invalid email address');
        return;
      }
      await signIn();
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div data-editor-id="app/login/page.tsx:12:5" className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
      >
        <div data-editor-id="app/login/page.tsx:20:9" className="flex items-center justify-center mb-6">
          <div data-editor-id="app/login/page.tsx:21:11" className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
            <Icon icon="material-symbols:person" className="text-white text-2xl" />
          </div>
        </div>

        <h1 data-editor-id="app/login/page.tsx:26:9" className="text-center text-2xl font-semibold text-gray-900 mb-2">
          <span data-editor-id="app/login/page.tsx:16:11">User Sign In</span>
        </h1>
        <p data-editor-id="app/login/page.tsx:29:9" className="text-center text-sm text-gray-600 mb-6">
          <span data-editor-id="app/login/page.tsx:19:11">Enter your email to continue to secure sign in.</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-gray-700">
              <span data-editor-id="app/login/page.tsx:33:11">Email</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                if (email && !validateEmailFormat(email)) setError('Invalid email address');
                else setError('');
              }}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            {error && (
              <p className="text-red-600 text-xs">
                <span data-editor-id="app/login/page.tsx:42:11">{error}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white py-2.5 rounded-lg transition-colors"
          >
            <Icon icon="material-symbols:login" className="text-xl" />
            <span data-editor-id="app/login/page.tsx:23:11">Continue</span>
          </button>
        </form>

        <div data-editor-id="app/login/page.tsx:48:9" className="mt-8 text-center text-sm text-gray-600">
          <span data-editor-id="app/login/page.tsx:28:11">Admin?</span>
          <Link href="/admin/login" className="ml-1 text-amber-700 hover:underline">
            <span data-editor-id="app/login/page.tsx:31:13">Sign in here</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
