'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface DashboardStats {
  totalPackages: number;
  totalHotels: number;
  totalFlights: number;
  pendingInquiries: number;
  totalInquiries: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recentInquiries: any[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPackages: 0,
    totalHotels: 0,
    totalFlights: 0,
    pendingInquiries: 0,
    totalInquiries: 0,
    recentInquiries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data concurrently
        const [packagesRes, hotelsRes, flightsRes, inquiriesRes] = await Promise.all([
        fetch('/api/packages'),
        fetch('/api/hotels'),
        fetch('/api/flights'),
        fetch('/api/inquiries')]
        );

        const [packagesData, hotelsData, flightsData, inquiriesData] = await Promise.all([
        packagesRes.json(),
        hotelsRes.json(),
        flightsRes.json(),
        inquiriesRes.json()]
        );

        const packages = packagesData.packages || [];
        const hotels = hotelsData.hotels || [];
        const flights = flightsData.flights || [];
        const inquiries = inquiriesData.inquiries || [];

        setStats({
          totalPackages: packages.length,
          totalHotels: hotels.length,
          totalFlights: flights.length,
          totalInquiries: inquiries.length,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pendingInquiries: inquiries.filter((inq: any) => inq.status === 'pending').length,
          recentInquiries: inquiries.slice(0, 5) // Get 5 most recent
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
  {
    title: 'Total Packages',
    value: stats.totalPackages,
    icon: 'material-symbols:package',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700'
  },
  {
    title: 'Partner Hotels',
    value: stats.totalHotels,
    icon: 'material-symbols:hotel',
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700'
  },
  {
    title: 'Flight Options',
    value: stats.totalFlights,
    icon: 'material-symbols:flight',
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700'
  },
  {
    title: 'Pending Inquiries',
    value: stats.pendingInquiries,
    icon: 'material-symbols:notification-important',
    color: 'bg-amber-500',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700'
  },
  {
    title: 'Total Inquiries',
    value: stats.totalInquiries,
    icon: 'material-symbols:contact-support',
    color: 'bg-indigo-500',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700'
  }];


  if (loading) {
    return (
      <div data-editor-id="app/components/admin/Dashboard.tsx:115:7" className="space-y-6">
        <div data-editor-id="app/components/admin/Dashboard.tsx:116:9" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) =>
          <div data-editor-id="app/components/admin/Dashboard.tsx:118:13" key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
              <div data-editor-id="app/components/admin/Dashboard.tsx:119:15" className="flex items-center justify-between">
                <div data-editor-id="app/components/admin/Dashboard.tsx:120:17">
                  <div data-editor-id="app/components/admin/Dashboard.tsx:121:19" className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div data-editor-id="app/components/admin/Dashboard.tsx:122:19" className="h-8 bg-gray-200 rounded w-12"></div>
                </div>
                <div data-editor-id="app/components/admin/Dashboard.tsx:124:17" className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          )}
        </div>
      </div>);

  }

  return (
    <div data-editor-id="app/components/admin/Dashboard.tsx:134:5" className="space-y-8">
      {/* Header */}
      <div data-editor-id="app/components/admin/Dashboard.tsx:136:7">
        <h1 data-editor-id="app/components/admin/Dashboard.tsx:137:9" className="text-3xl font-bold text-gray-900">
          <span data-editor-id="app/components/admin/Dashboard.tsx:110:11">Dashboard</span>
        </h1>
        <p data-editor-id="app/components/admin/Dashboard.tsx:140:9" className="text-gray-600 mt-2">
          <span data-editor-id="app/components/admin/Dashboard.tsx:113:11">Overview of your Divine Pathways admin panel</span>
        </p>
      </div>

      {/* Stats Cards */}
      <div data-editor-id="app/components/admin/Dashboard.tsx:146:7" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, index) =>
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}>

            <div data-editor-id="app/components/admin/Dashboard.tsx:155:13" className="flex items-center justify-between">
              <div data-editor-id="app/components/admin/Dashboard.tsx:156:15">
                <p data-editor-id="app/components/admin/Dashboard.tsx:157:17" className="text-sm font-medium text-gray-600 mb-1">
                  <span data-editor-id="app/components/admin/Dashboard.tsx:129:19">{stat.title}</span>
                </p>
                <p data-editor-id="app/components/admin/Dashboard.tsx:160:17" className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div data-editor-id="app/components/admin/Dashboard.tsx:164:15" className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon icon={stat.icon} className={`text-xl ${stat.textColor}`} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Recent Activity */}
      <div data-editor-id="app/components/admin/Dashboard.tsx:173:7" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100">

          <div data-editor-id="app/components/admin/Dashboard.tsx:181:11" className="p-6 border-b border-gray-100">
            <h3 data-editor-id="app/components/admin/Dashboard.tsx:182:13" className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Icon icon="material-symbols:contact-support" className="text-xl text-amber-600" />
              <span data-editor-id="app/components/admin/Dashboard.tsx:154:15">Recent Inquiries</span>
            </h3>
          </div>
          <div data-editor-id="app/components/admin/Dashboard.tsx:187:11" className="p-6">
            {stats.recentInquiries.length > 0 ?
            <div data-editor-id="app/components/admin/Dashboard.tsx:189:15" className="space-y-4">
                {stats.recentInquiries.map((inquiry, index) =>
              <div data-editor-id="app/components/admin/Dashboard.tsx:191:19" key={inquiry.id || index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div data-editor-id="app/components/admin/Dashboard.tsx:192:21" className={`w-2 h-2 rounded-full mt-2 ${
                inquiry.status === 'pending' ? 'bg-amber-500' :
                inquiry.status === 'contacted' ? 'bg-blue-500' :
                'bg-green-500'}`
                }></div>
                    <div data-editor-id="app/components/admin/Dashboard.tsx:197:21" className="flex-1 min-w-0">
                      <p data-editor-id="app/components/admin/Dashboard.tsx:198:23" className="font-medium text-gray-900 truncate">
                        <span data-editor-id="app/components/admin/Dashboard.tsx:169:25">{inquiry.name || 'Unknown'}</span>
                      </p>
                      <p data-editor-id="app/components/admin/Dashboard.tsx:201:23" className="text-sm text-gray-600 truncate">
                        <span data-editor-id="app/components/admin/Dashboard.tsx:172:25">{inquiry.email || 'No email'}</span>
                      </p>
                      <p data-editor-id="app/components/admin/Dashboard.tsx:204:23" className="text-xs text-gray-500 mt-1">
                        <span data-editor-id="app/components/admin/Dashboard.tsx:175:25">{inquiry.selectedPackage || 'General inquiry'}</span>
                      </p>
                    </div>
                    <div data-editor-id="app/components/admin/Dashboard.tsx:208:21" className="text-xs text-gray-400">
                      {inquiry.createdAt ? new Date(inquiry.createdAt.seconds * 1000).toLocaleDateString() : 'Recent'}
                    </div>
                  </div>
              )}
              </div> :

            <div data-editor-id="app/components/admin/Dashboard.tsx:215:15" className="text-center py-8">
                <Icon icon="material-symbols:inbox" className="text-4xl text-gray-400 mb-2" />
                <p data-editor-id="app/components/admin/Dashboard.tsx:217:17" className="text-gray-500">
                  <span data-editor-id="app/components/admin/Dashboard.tsx:186:19">No recent inquiries</span>
                </p>
              </div>
            }
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100">

          <div data-editor-id="app/components/admin/Dashboard.tsx:232:11" className="p-6 border-b border-gray-100">
            <h3 data-editor-id="app/components/admin/Dashboard.tsx:233:13" className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Icon icon="material-symbols:bolt" className="text-xl text-amber-600" />
              <span data-editor-id="app/components/admin/Dashboard.tsx:202:15">Quick Actions</span>
            </h3>
          </div>
          <div data-editor-id="app/components/admin/Dashboard.tsx:238:11" className="p-6">
            <div data-editor-id="app/components/admin/Dashboard.tsx:239:13" className="space-y-3">
              <button data-editor-id="app/components/admin/Dashboard.tsx:240:15" className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Icon icon="material-symbols:add" className="text-xl text-blue-600" />
                <div data-editor-id="app/components/admin/Dashboard.tsx:242:17">
                  <p data-editor-id="app/components/admin/Dashboard.tsx:243:19" className="font-medium text-gray-900">
                    <span data-editor-id="app/components/admin/Dashboard.tsx:210:21">Add New Package</span>
                  </p>
                  <p data-editor-id="app/components/admin/Dashboard.tsx:246:19" className="text-sm text-gray-600">
                    <span data-editor-id="app/components/admin/Dashboard.tsx:213:21">Create a new Umrah package</span>
                  </p>
                </div>
              </button>
              
              <button data-editor-id="app/components/admin/Dashboard.tsx:252:15" className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Icon icon="material-symbols:hotel" className="text-xl text-green-600" />
                <div data-editor-id="app/components/admin/Dashboard.tsx:254:17">
                  <p data-editor-id="app/components/admin/Dashboard.tsx:255:19" className="font-medium text-gray-900">
                    <span data-editor-id="app/components/admin/Dashboard.tsx:222:21">Add Partner Hotel</span>
                  </p>
                  <p data-editor-id="app/components/admin/Dashboard.tsx:258:19" className="text-sm text-gray-600">
                    <span data-editor-id="app/components/admin/Dashboard.tsx:225:21">Register a new hotel partner</span>
                  </p>
                </div>
              </button>
              
              <button data-editor-id="app/components/admin/Dashboard.tsx:264:15" className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Icon icon="material-symbols:flight" className="text-xl text-purple-600" />
                <div data-editor-id="app/components/admin/Dashboard.tsx:266:17">
                  <p data-editor-id="app/components/admin/Dashboard.tsx:267:19" className="font-medium text-gray-900">
                    <span data-editor-id="app/components/admin/Dashboard.tsx:234:21">Add Flight Option</span>
                  </p>
                  <p data-editor-id="app/components/admin/Dashboard.tsx:270:19" className="text-sm text-gray-600">
                    <span data-editor-id="app/components/admin/Dashboard.tsx:237:21">Add new airline information</span>
                  </p>
                </div>
              </button>

              <button data-editor-id="app/components/admin/Dashboard.tsx:276:15" className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Icon icon="material-symbols:settings" className="text-xl text-amber-600" />
                <div data-editor-id="app/components/admin/Dashboard.tsx:278:17">
                  <p data-editor-id="app/components/admin/Dashboard.tsx:279:19" className="font-medium text-gray-900">
                    <span data-editor-id="app/components/admin/Dashboard.tsx:246:21">Update Contact Info</span>
                  </p>
                  <p data-editor-id="app/components/admin/Dashboard.tsx:282:19" className="text-sm text-gray-600">
                    <span data-editor-id="app/components/admin/Dashboard.tsx:249:21">Modify website contact details</span>
                  </p>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100">

        <div data-editor-id="app/components/admin/Dashboard.tsx:299:9" className="p-6 border-b border-gray-100">
          <h3 data-editor-id="app/components/admin/Dashboard.tsx:300:11" className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Icon icon="material-symbols:health-and-safety" className="text-xl text-green-600" />
            <span data-editor-id="app/components/admin/Dashboard.tsx:266:13">System Status</span>
          </h3>
        </div>
        <div data-editor-id="app/components/admin/Dashboard.tsx:305:9" className="p-6">
          <div data-editor-id="app/components/admin/Dashboard.tsx:306:11" className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div data-editor-id="app/components/admin/Dashboard.tsx:307:13" className="flex items-center gap-3">
              <div data-editor-id="app/components/admin/Dashboard.tsx:308:15" className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span data-editor-id="app/components/admin/Dashboard.tsx:309:15" className="font-medium text-green-700">
                <span data-editor-id="app/components/admin/Dashboard.tsx:274:17">All Systems Operational</span>
              </span>
            </div>
            <span data-editor-id="app/components/admin/Dashboard.tsx:313:13" className="text-sm text-green-600">
              <span data-editor-id="app/components/admin/Dashboard.tsx:278:15">Last checked: Just now</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>);

}