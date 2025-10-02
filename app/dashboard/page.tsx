'use client';

import { useAuth } from 'cosmic-authentication';
import { useCosmicPayments } from 'cosmic-payments/client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const { getPurchaseHistory, getActiveSubscriptions } = useCosmicPayments();
  const [purchases, setPurchases] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadUserData();
    }
  }, [isAuthenticated]);

  const loadUserData = async () => {
    try {
      setLoadingData(true);
      const [purchaseData, subscriptionData] = await Promise.all([
      getPurchaseHistory(),
      getActiveSubscriptions()]
      );

      if (purchaseData) setPurchases(purchaseData);
      if (subscriptionData) setSubscriptions(subscriptionData);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  if (loading) {
    return (
      <div data-editor-id="app/dashboard/page.tsx:42:7" className="min-h-screen flex items-center justify-center">
        <div data-editor-id="app/dashboard/page.tsx:43:9" className="text-center">
          <Icon icon="material-symbols:sync" className="text-4xl text-amber-600 animate-spin mb-4" />
          <p data-editor-id="app/dashboard/page.tsx:45:11" className="text-gray-600">Loading...</p>
        </div>
      </div>);

  }

  if (!isAuthenticated) {
    return (
      <div data-editor-id="app/dashboard/page.tsx:53:7" className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8">

          <Icon icon="material-symbols:lock" className="text-6xl text-amber-500 mb-4" />
          <h1 data-editor-id="app/dashboard/page.tsx:60:11" className="text-2xl font-bold text-gray-900 mb-4">
            <span data-editor-id="app/dashboard/page.tsx:51:13">Please Sign In</span>
          </h1>
          <p data-editor-id="app/dashboard/page.tsx:63:11" className="text-gray-600 mb-6">
            <span data-editor-id="app/dashboard/page.tsx:54:13">You need to be signed in to view your dashboard.</span>
          </p>
          <Link
            href="/"
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors">

            <span data-editor-id="app/dashboard/page.tsx:60:13">Return to Home</span>
          </Link>
        </motion.div>
      </div>);

  }

  return (
    <div data-editor-id="app/dashboard/page.tsx:78:5" className="min-h-screen bg-gray-50">
      {/* Header */}
      <div data-editor-id="app/dashboard/page.tsx:80:7" className="bg-white shadow-sm border-b border-gray-200">
        <div data-editor-id="app/dashboard/page.tsx:81:9" className="max-w-7xl mx-auto px-4 py-6">
          <div data-editor-id="app/dashboard/page.tsx:82:11" className="flex items-center justify-between">
            <div data-editor-id="app/dashboard/page.tsx:83:13">
              <h1 data-editor-id="app/dashboard/page.tsx:84:15" className="text-2xl font-bold text-gray-900">
                <span data-editor-id="app/dashboard/page.tsx:74:17">Welcome back, {user?.displayName}</span>
              </h1>
              <p data-editor-id="app/dashboard/page.tsx:87:15" className="text-gray-600">
                <span data-editor-id="app/dashboard/page.tsx:77:17">Manage your bookings and spiritual journey with Divine Pathways</span>
              </p>
            </div>
            <Link
              href="/"
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2">

              <Icon icon="material-symbols:home" />
              <span data-editor-id="app/dashboard/page.tsx:85:15">Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      <div data-editor-id="app/dashboard/page.tsx:102:7" className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div data-editor-id="app/dashboard/page.tsx:104:9" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">

            <div data-editor-id="app/dashboard/page.tsx:110:13" className="flex items-center gap-3">
              <div data-editor-id="app/dashboard/page.tsx:111:15" className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon icon="material-symbols:receipt" className="text-2xl text-blue-600" />
              </div>
              <div data-editor-id="app/dashboard/page.tsx:114:15">
                <p data-editor-id="app/dashboard/page.tsx:115:17" className="text-2xl font-bold text-gray-900">{purchases.length}</p>
                <p data-editor-id="app/dashboard/page.tsx:116:17" className="text-gray-600 text-sm">
                  <span data-editor-id="app/dashboard/page.tsx:106:19">Total Bookings</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">

            <div data-editor-id="app/dashboard/page.tsx:129:13" className="flex items-center gap-3">
              <div data-editor-id="app/dashboard/page.tsx:130:15" className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Icon icon="material-symbols:subscriptions" className="text-2xl text-green-600" />
              </div>
              <div data-editor-id="app/dashboard/page.tsx:133:15">
                <p data-editor-id="app/dashboard/page.tsx:134:17" className="text-2xl font-bold text-gray-900">{subscriptions.length}</p>
                <p data-editor-id="app/dashboard/page.tsx:135:17" className="text-gray-600 text-sm">
                  <span data-editor-id="app/dashboard/page.tsx:124:19">Active Subscriptions</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">

            <div data-editor-id="app/dashboard/page.tsx:148:13" className="flex items-center gap-3">
              <div data-editor-id="app/dashboard/page.tsx:149:15" className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Icon icon="material-symbols:mosque" className="text-2xl text-amber-600" />
              </div>
              <div data-editor-id="app/dashboard/page.tsx:152:15">
                <p data-editor-id="app/dashboard/page.tsx:153:17" className="text-2xl font-bold text-gray-900">0</p>
                <p data-editor-id="app/dashboard/page.tsx:154:17" className="text-gray-600 text-sm">
                  <span data-editor-id="app/dashboard/page.tsx:142:19">Completed Umrahs</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div data-editor-id="app/dashboard/page.tsx:162:9" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Purchases */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100">

            <div data-editor-id="app/dashboard/page.tsx:170:13" className="p-6 border-b border-gray-100">
              <h3 data-editor-id="app/dashboard/page.tsx:171:15" className="text-lg font-semibold text-gray-900">
                <span data-editor-id="app/dashboard/page.tsx:158:17">Recent Bookings</span>
              </h3>
            </div>
            <div data-editor-id="app/dashboard/page.tsx:175:13" className="p-6">
              {loadingData ?
              <div data-editor-id="app/dashboard/page.tsx:177:17" className="space-y-4">
                  {[...Array(3)].map((_, i) =>
                <div data-editor-id="app/dashboard/page.tsx:179:21" key={i} className="animate-pulse">
                      <div data-editor-id="app/dashboard/page.tsx:180:23" className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div data-editor-id="app/dashboard/page.tsx:181:23" className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                )}
                </div> :
              purchases.length > 0 ?
              <div data-editor-id="app/dashboard/page.tsx:186:17" className="space-y-4">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {purchases.slice(0, 5).map((purchase: any, index) =>
                <div data-editor-id="app/dashboard/page.tsx:188:21" key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div data-editor-id="app/dashboard/page.tsx:189:23">
                        <p data-editor-id="app/dashboard/page.tsx:190:25" className="font-medium text-gray-900">
                          <span data-editor-id="app/dashboard/page.tsx:176:27">{purchase.product_id}</span>
                        </p>
                        <p data-editor-id="app/dashboard/page.tsx:193:25" className="text-sm text-gray-600">
                          Quantity: {purchase.quantity} • <span data-editor-id="app/dashboard/page.tsx:179:69">{new Date(purchase.timestamp).toLocaleDateString()}</span>
                        </p>
                      </div>
                      <div data-editor-id="app/dashboard/page.tsx:197:23" className="text-right">
                        <p data-editor-id="app/dashboard/page.tsx:198:25" className="font-semibold text-gray-900">
                          {purchase.currency} {(purchase.price / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                )}
                </div> :

              <div data-editor-id="app/dashboard/page.tsx:206:17" className="text-center py-8">
                  <Icon icon="material-symbols:receipt-long" className="text-4xl text-gray-400 mb-2" />
                  <p data-editor-id="app/dashboard/page.tsx:208:19" className="text-gray-500">
                    <span data-editor-id="app/dashboard/page.tsx:193:21">No bookings yet</span>
                  </p>
                  <Link
                  href="/#packages"
                  className="inline-block mt-4 text-amber-600 hover:text-amber-700 font-medium">

                    <span data-editor-id="app/dashboard/page.tsx:199:21">Browse Packages</span>
                  </Link>
                </div>
              }
            </div>
          </motion.div>

          {/* Active Subscriptions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100">

            <div data-editor-id="app/dashboard/page.tsx:229:13" className="p-6 border-b border-gray-100">
              <h3 data-editor-id="app/dashboard/page.tsx:230:15" className="text-lg font-semibold text-gray-900">
                <span data-editor-id="app/dashboard/page.tsx:214:17">Active Subscriptions</span>
              </h3>
            </div>
            <div data-editor-id="app/dashboard/page.tsx:234:13" className="p-6">
              {loadingData ?
              <div data-editor-id="app/dashboard/page.tsx:236:17" className="space-y-4">
                  {[...Array(2)].map((_, i) =>
                <div data-editor-id="app/dashboard/page.tsx:238:21" key={i} className="animate-pulse">
                      <div data-editor-id="app/dashboard/page.tsx:239:23" className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div data-editor-id="app/dashboard/page.tsx:240:23" className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                )}
                </div> :
              subscriptions.length > 0 ?
              <div data-editor-id="app/dashboard/page.tsx:245:17" className="space-y-4">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {subscriptions.map((subscription: any, index) =>
                <div data-editor-id="app/dashboard/page.tsx:247:21" key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div data-editor-id="app/dashboard/page.tsx:248:23" className="flex items-center justify-between">
                        <div data-editor-id="app/dashboard/page.tsx:249:25">
                          <p data-editor-id="app/dashboard/page.tsx:250:27" className="font-medium text-gray-900">
                            <span data-editor-id="app/dashboard/page.tsx:235:29">{subscription.subscription_product_id}</span>
                          </p>
                          <p data-editor-id="app/dashboard/page.tsx:253:27" className="text-sm text-gray-600 capitalize">
                            <span data-editor-id="app/dashboard/page.tsx:238:29">Status: {subscription.subscription_status}</span>
                          </p>
                        </div>
                        <div data-editor-id="app/dashboard/page.tsx:257:25" className="text-right">
                          <p data-editor-id="app/dashboard/page.tsx:258:27" className="font-semibold text-gray-900">
                            {subscription.subscription_currency} {(subscription.subscription_price / 100).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                )}
                </div> :

              <div data-editor-id="app/dashboard/page.tsx:267:17" className="text-center py-8">
                  <Icon icon="material-symbols:subscriptions" className="text-4xl text-gray-400 mb-2" />
                  <p data-editor-id="app/dashboard/page.tsx:269:19" className="text-gray-500">
                    <span data-editor-id="app/dashboard/page.tsx:252:21">No active subscriptions</span>
                  </p>
                </div>
              }
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-8 text-center">

          <Icon icon="material-symbols:mosque" className="text-5xl text-amber-600 mb-4" />
          <h3 data-editor-id="app/dashboard/page.tsx:286:11" className="text-2xl font-semibold text-gray-900 mb-4">
            <span data-editor-id="app/dashboard/page.tsx:269:13">Ready for Your Next Spiritual Journey?</span>
          </h3>
          <p data-editor-id="app/dashboard/page.tsx:289:11" className="text-gray-600 mb-6">
            <span data-editor-id="app/dashboard/page.tsx:272:13">Explore our premium Umrah packages and start planning your pilgrimage today</span>
          </p>
          <div data-editor-id="app/dashboard/page.tsx:292:11" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#packages"
              className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">

              <Icon icon="material-symbols:explore" />
              <span data-editor-id="app/dashboard/page.tsx:281:15">Browse Packages</span>
            </Link>
            <Link
              href="/#contact"
              className="border border-amber-300 text-amber-700 px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors flex items-center justify-center gap-2">

              <Icon icon="material-symbols:contact-support" />
              <span data-editor-id="app/dashboard/page.tsx:289:15">Contact Support</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>);

}