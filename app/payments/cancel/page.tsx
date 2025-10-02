'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Icon icon="material-symbols:close" className="text-3xl text-red-600" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold text-gray-900 mb-4"
        >
          <span data-editor-id="app/payments/cancel/page.tsx:27:11">Payment Cancelled</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8"
        >
          <span data-editor-id="app/payments/cancel/page.tsx:37:11">Your payment was cancelled. No charges have been made to your account. You can try again or contact us for assistance.</span>
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Link
            href="/"
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 px-6 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <Icon icon="material-symbols:home" className="text-lg" />
            <span data-editor-id="app/payments/cancel/page.tsx:52:13">Return to Home</span>
          </Link>
          
          <Link
            href="#contact"
            className="w-full border border-amber-200 text-amber-700 py-3 px-6 rounded-xl hover:bg-amber-50 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <Icon icon="material-symbols:contact-support" className="text-lg" />
            <span data-editor-id="app/payments/cancel/page.tsx:61:13">Contact Support</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}