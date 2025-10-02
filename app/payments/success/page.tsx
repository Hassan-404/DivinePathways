'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function PaymentSuccessPage() {
  return (
    <div data-editor-id="app/payments/success/page.tsx:9:5" className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center">

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">

          <Icon icon="material-symbols:check" className="text-3xl text-green-600" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold text-gray-900 mb-4">

          <span data-editor-id="app/payments/success/page.tsx:27:11">Payment Successful!</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8">

          <span data-editor-id="app/payments/success/page.tsx:37:11">Thank you for your booking. You will receive a confirmation email shortly with your booking details.</span>
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3">

          <Link
            href="/"
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 px-6 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-200 flex items-center justify-center gap-2 font-medium">

            <Icon icon="material-symbols:home" className="text-lg" />
            <span data-editor-id="app/payments/success/page.tsx:52:13">Return to Home</span>
          </Link>
          
          <Link
            href="/dashboard"
            className="w-full border border-amber-200 text-amber-700 py-3 px-6 rounded-xl hover:bg-amber-50 transition-all duration-200 flex items-center justify-center gap-2 font-medium">

            <Icon icon="material-symbols:dashboard" className="text-lg" />
            <span data-editor-id="app/payments/success/page.tsx:61:13">View My Bookings</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>);

}