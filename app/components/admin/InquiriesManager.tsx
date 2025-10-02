'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  selectedPackage?: string;
  message: string;
  status: 'pending' | 'contacted' | 'closed';
  source: string;
  createdAt?: { seconds?: number; nanoseconds?: number } | number | string | Date;
  updatedAt?: { seconds?: number; nanoseconds?: number } | number | string | Date;
}

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/inquiries');
      const data = await response.json();
      if (response.ok) {
        setInquiries(data.inquiries || []);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (inquiryId: string, newStatus: Inquiry['status']) => {
    try {
      const response = await fetch(`/api/inquiries?id=${inquiryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        await fetchInquiries();
        if (selectedInquiry && selectedInquiry.id === inquiryId) {
          setSelectedInquiry((prev) => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (error) {
      console.error('Error updating inquiry status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return 'material-symbols:schedule';
      case 'contacted':
        return 'material-symbols:contact-phone';
      case 'closed':
        return 'material-symbols:check-circle';
      default:
        return 'material-symbols:help';
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesFilter = filter === 'all' || inquiry.status === filter;
    const matchesSearch =
    inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.selectedPackage?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (timestamp: { seconds?: number } | number | string | Date | undefined) => {
    if (!timestamp) return 'Unknown';
    const date = typeof timestamp === 'object' && 'seconds' in timestamp && timestamp.seconds ?
      new Date(timestamp.seconds * 1000) : new Date(timestamp as number | string | Date);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div data-editor-id="app/components/admin/InquiriesManager.tsx:110:7" className="space-y-6">
        <div data-editor-id="app/components/admin/InquiriesManager.tsx:111:9" className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div data-editor-id="app/components/admin/InquiriesManager.tsx:112:9" className="space-y-4">
          {[...Array(5)].map((_, i) =>
          <div data-editor-id="app/components/admin/InquiriesManager.tsx:114:13" key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
              <div data-editor-id="app/components/admin/InquiriesManager.tsx:115:15" className="flex justify-between items-start">
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:116:17" className="flex-1">
                  <div data-editor-id="app/components/admin/InquiriesManager.tsx:117:19" className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div data-editor-id="app/components/admin/InquiriesManager.tsx:118:19" className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div data-editor-id="app/components/admin/InquiriesManager.tsx:119:19" className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:121:17" className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          )}
        </div>
      </div>);

  }

  return (
    <div data-editor-id="app/components/admin/InquiriesManager.tsx:131:5" className="space-y-6">
      {/* Header */}
      <div data-editor-id="app/components/admin/InquiriesManager.tsx:133:7">
        <h1 data-editor-id="app/components/admin/InquiriesManager.tsx:134:9" className="text-2xl font-bold text-gray-900">
          <span data-editor-id="app/components/admin/InquiriesManager.tsx:102:11">Inquiries Management</span>
        </h1>
        <p data-editor-id="app/components/admin/InquiriesManager.tsx:137:9" className="text-gray-600">
          <span data-editor-id="app/components/admin/InquiriesManager.tsx:105:11">Manage customer inquiries and follow-ups</span>
        </p>
      </div>

      {/* Filters */}
      <div data-editor-id="app/components/admin/InquiriesManager.tsx:143:7" className="flex flex-col sm:flex-row gap-4">
        <div data-editor-id="app/components/admin/InquiriesManager.tsx:144:9" className="flex-1">
          <div data-editor-id="app/components/admin/InquiriesManager.tsx:145:11" className="relative">
            <Icon icon="material-symbols:search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input data-editor-id="app/components/admin/InquiriesManager.tsx:147:13"
            type="text"
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />

          </div>
        </div>
        
        <div data-editor-id="app/components/admin/InquiriesManager.tsx:157:9" className="flex gap-2">
          {['all', 'pending', 'contacted', 'closed'].map((status) =>
          <button data-editor-id="app/components/admin/InquiriesManager.tsx:159:13"
          key={status}
          onClick={() => setFilter(status)}
          className={`px-4 py-2 rounded-lg capitalize font-medium transition-colors ${
          filter === status ?
          'bg-amber-600 text-white' :
          'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
          }>

              <span data-editor-id="app/components/admin/InquiriesManager.tsx:131:15">{status === 'all' ? 'All' : status}</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div data-editor-id="app/components/admin/InquiriesManager.tsx:175:7" className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
        { label: 'Total', count: inquiries.length, color: 'bg-blue-100 text-blue-800' },
        { label: 'Pending', count: inquiries.filter((i) => i.status === 'pending').length, color: 'bg-amber-100 text-amber-800' },
        { label: 'Contacted', count: inquiries.filter((i) => i.status === 'contacted').length, color: 'bg-blue-100 text-blue-800' },
        { label: 'Closed', count: inquiries.filter((i) => i.status === 'closed').length, color: 'bg-green-100 text-green-800' }].
        map((stat) =>
        <div data-editor-id="app/components/admin/InquiriesManager.tsx:182:11" key={stat.label} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div data-editor-id="app/components/admin/InquiriesManager.tsx:183:13" className="flex items-center justify-between">
              <div data-editor-id="app/components/admin/InquiriesManager.tsx:184:15">
                <p data-editor-id="app/components/admin/InquiriesManager.tsx:185:17" className="text-sm font-medium text-gray-600">
                  <span data-editor-id="app/components/admin/InquiriesManager.tsx:147:19">{stat.label}</span>
                </p>
                <p data-editor-id="app/components/admin/InquiriesManager.tsx:188:17" className="text-2xl font-bold text-gray-900">{stat.count}</p>
              </div>
              <div data-editor-id="app/components/admin/InquiriesManager.tsx:190:15" className={`px-2 py-1 rounded-full text-xs font-medium ${stat.color}`}>
                {stat.count}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inquiries List */}
      <div data-editor-id="app/components/admin/InquiriesManager.tsx:199:7" className="space-y-4">
        {filteredInquiries.map((inquiry, index) =>
        <motion.div
          key={inquiry.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

            <div data-editor-id="app/components/admin/InquiriesManager.tsx:208:13" className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div data-editor-id="app/components/admin/InquiriesManager.tsx:209:15" className="flex-1">
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:210:17" className="flex items-center gap-3 mb-2">
                  <h3 data-editor-id="app/components/admin/InquiriesManager.tsx:211:19" className="font-semibold text-gray-900">
                    <span data-editor-id="app/components/admin/InquiriesManager.tsx:172:21">{inquiry.name}</span>
                  </h3>
                  <span data-editor-id="app/components/admin/InquiriesManager.tsx:214:19" className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)} flex items-center gap-1`}>
                    <Icon icon={getStatusIcon(inquiry.status)} className="text-xs" />
                    <span data-editor-id="app/components/admin/InquiriesManager.tsx:176:21">{inquiry.status}</span>
                  </span>
                </div>
                
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:220:17" className="space-y-1 text-sm text-gray-600 mb-3">
                  <div data-editor-id="app/components/admin/InquiriesManager.tsx:221:19" className="flex items-center gap-2">
                    <Icon icon="material-symbols:email" className="text-xs" />
                    <span data-editor-id="app/components/admin/InquiriesManager.tsx:183:21">{inquiry.email}</span>
                  </div>
                  {inquiry.phone &&
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:226:21" className="flex items-center gap-2">
                      <Icon icon="material-symbols:phone" className="text-xs" />
                      <span data-editor-id="app/components/admin/InquiriesManager.tsx:188:23">{inquiry.phone}</span>
                    </div>
                }
                  {inquiry.selectedPackage &&
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:232:21" className="flex items-center gap-2">
                      <Icon icon="material-symbols:package" className="text-xs" />
                      <span data-editor-id="app/components/admin/InquiriesManager.tsx:194:23">Package: {inquiry.selectedPackage}</span>
                    </div>
                }
                  <div data-editor-id="app/components/admin/InquiriesManager.tsx:237:19" className="flex items-center gap-2">
                    <Icon icon="material-symbols:schedule" className="text-xs" />
                    <span data-editor-id="app/components/admin/InquiriesManager.tsx:199:21">{formatDate(inquiry.createdAt)}</span>
                  </div>
                </div>

                <p data-editor-id="app/components/admin/InquiriesManager.tsx:243:17" className="text-gray-700 text-sm">
                  <span data-editor-id="app/components/admin/InquiriesManager.tsx:204:19">{inquiry.message}</span>
                </p>
              </div>

              <div data-editor-id="app/components/admin/InquiriesManager.tsx:248:15" className="flex flex-col sm:flex-row lg:flex-col gap-2">
                <button data-editor-id="app/components/admin/InquiriesManager.tsx:249:17"
              onClick={() => setSelectedInquiry(inquiry)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">

                  <Icon icon="material-symbols:visibility" className="text-sm" />
                  <span data-editor-id="app/components/admin/InquiriesManager.tsx:214:19">View</span>
                </button>
                
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:257:17" className="flex gap-2">
                  {inquiry.status === 'pending' &&
                <button data-editor-id="app/components/admin/InquiriesManager.tsx:259:21"
                onClick={() => updateInquiryStatus(inquiry.id, 'contacted')}
                className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-1 text-sm">

                      <Icon icon="material-symbols:contact-phone" className="text-sm" />
                      <span data-editor-id="app/components/admin/InquiriesManager.tsx:225:23">Contact</span>
                    </button>
                }
                  
                  {inquiry.status !== 'closed' &&
                <button data-editor-id="app/components/admin/InquiriesManager.tsx:269:21"
                onClick={() => updateInquiryStatus(inquiry.id, 'closed')}
                className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center gap-1 text-sm">

                      <Icon icon="material-symbols:check" className="text-sm" />
                      <span data-editor-id="app/components/admin/InquiriesManager.tsx:235:23">Close</span>
                    </button>
                }
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Empty State */}
      {filteredInquiries.length === 0 && !loading &&
      <div data-editor-id="app/components/admin/InquiriesManager.tsx:286:9" className="text-center py-12">
          <Icon icon="material-symbols:inbox" className="text-6xl text-gray-400 mb-4" />
          <h3 data-editor-id="app/components/admin/InquiriesManager.tsx:288:11" className="text-xl font-medium text-gray-600 mb-2">
            <span data-editor-id="app/components/admin/InquiriesManager.tsx:249:13">No inquiries found</span>
          </h3>
          <p data-editor-id="app/components/admin/InquiriesManager.tsx:291:11" className="text-gray-500">
            <span data-editor-id="app/components/admin/InquiriesManager.tsx:252:13">
              {searchTerm || filter !== 'all' ?
            'Try adjusting your search or filter' :
            'Customer inquiries will appear here'
            }
            </span>
          </p>
        </div>
      }

      {/* Inquiry Detail Modal */}
      {selectedInquiry &&
      <div data-editor-id="app/components/admin/InquiriesManager.tsx:304:9" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div data-editor-id="app/components/admin/InquiriesManager.tsx:305:11" className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div data-editor-id="app/components/admin/InquiriesManager.tsx:306:13" className="p-6 border-b border-gray-200">
              <div data-editor-id="app/components/admin/InquiriesManager.tsx:307:15" className="flex justify-between items-center">
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:308:17">
                  <h2 data-editor-id="app/components/admin/InquiriesManager.tsx:309:19" className="text-xl font-semibold text-gray-900">
                    <span data-editor-id="app/components/admin/InquiriesManager.tsx:270:21">Inquiry Details</span>
                  </h2>
                  <p data-editor-id="app/components/admin/InquiriesManager.tsx:312:19" className="text-gray-600 text-sm">
                    <span data-editor-id="app/components/admin/InquiriesManager.tsx:273:21">From {selectedInquiry.name}</span>
                  </p>
                </div>
                <button data-editor-id="app/components/admin/InquiriesManager.tsx:316:17"
              onClick={() => setSelectedInquiry(null)}
              className="p-2 hover:bg-gray-100 rounded-lg">

                  <Icon icon="material-symbols:close" className="text-xl" />
                </button>
              </div>
            </div>

            <div data-editor-id="app/components/admin/InquiriesManager.tsx:325:13" className="p-6 space-y-6">
              {/* Status */}
              <div data-editor-id="app/components/admin/InquiriesManager.tsx:327:15">
                <label data-editor-id="app/components/admin/InquiriesManager.tsx:328:17" className="block text-sm font-medium text-gray-700 mb-2">
                  <span data-editor-id="app/components/admin/InquiriesManager.tsx:287:19">Status</span>
                </label>
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:331:17" className="flex gap-2">
                  {(['pending', 'contacted', 'closed'] as const).map((status) =>
                <button data-editor-id="app/components/admin/InquiriesManager.tsx:333:21"
                key={status}
                onClick={() => updateInquiryStatus(selectedInquiry.id, status)}
                className={`px-3 py-1 rounded-lg text-sm font-medium capitalize transition-colors ${
                selectedInquiry.status === status ?
                getStatusColor(status) :
                'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                }>

                      <span data-editor-id="app/components/admin/InquiriesManager.tsx:299:23">{status}</span>
                    </button>
                )}
                </div>
              </div>

              {/* Contact Information */}
              <div data-editor-id="app/components/admin/InquiriesManager.tsx:349:15" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:350:17">
                  <label data-editor-id="app/components/admin/InquiriesManager.tsx:351:19" className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/InquiriesManager.tsx:309:21">Name</span>
                  </label>
                  <p data-editor-id="app/components/admin/InquiriesManager.tsx:354:19" className="text-gray-900">{selectedInquiry.name}</p>
                </div>
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:356:17">
                  <label data-editor-id="app/components/admin/InquiriesManager.tsx:357:19" className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/InquiriesManager.tsx:315:21">Email</span>
                  </label>
                  <a data-editor-id="app/components/admin/InquiriesManager.tsx:360:19"
                href={`mailto:${selectedInquiry.email}`}
                className="text-blue-600 hover:text-blue-700">

                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone &&
              <div data-editor-id="app/components/admin/InquiriesManager.tsx:368:19">
                    <label data-editor-id="app/components/admin/InquiriesManager.tsx:369:21" className="block text-sm font-medium text-gray-700 mb-1">
                      <span data-editor-id="app/components/admin/InquiriesManager.tsx:326:23">Phone</span>
                    </label>
                    <a data-editor-id="app/components/admin/InquiriesManager.tsx:372:21"
                href={`tel:${selectedInquiry.phone}`}
                className="text-blue-600 hover:text-blue-700">

                      {selectedInquiry.phone}
                    </a>
                  </div>
              }
                {selectedInquiry.selectedPackage &&
              <div data-editor-id="app/components/admin/InquiriesManager.tsx:381:19">
                    <label data-editor-id="app/components/admin/InquiriesManager.tsx:382:21" className="block text-sm font-medium text-gray-700 mb-1">
                      <span data-editor-id="app/components/admin/InquiriesManager.tsx:338:23">Selected Package</span>
                    </label>
                    <p data-editor-id="app/components/admin/InquiriesManager.tsx:385:21" className="text-gray-900">{selectedInquiry.selectedPackage}</p>
                  </div>
              }
              </div>

              {/* Message */}
              <div data-editor-id="app/components/admin/InquiriesManager.tsx:391:15">
                <label data-editor-id="app/components/admin/InquiriesManager.tsx:392:17" className="block text-sm font-medium text-gray-700 mb-2">
                  <span data-editor-id="app/components/admin/InquiriesManager.tsx:347:19">Message</span>
                </label>
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:395:17" className="bg-gray-50 p-4 rounded-lg">
                  <p data-editor-id="app/components/admin/InquiriesManager.tsx:396:19" className="text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>

              {/* Timestamps */}
              <div data-editor-id="app/components/admin/InquiriesManager.tsx:401:15" className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:402:17">
                  <label data-editor-id="app/components/admin/InquiriesManager.tsx:403:19" className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/InquiriesManager.tsx:357:21">Created</span>
                  </label>
                  <p data-editor-id="app/components/admin/InquiriesManager.tsx:406:19" className="text-gray-600 text-sm">{formatDate(selectedInquiry.createdAt)}</p>
                </div>
                <div data-editor-id="app/components/admin/InquiriesManager.tsx:408:17">
                  <label data-editor-id="app/components/admin/InquiriesManager.tsx:409:19" className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/InquiriesManager.tsx:363:21">Last Updated</span>
                  </label>
                  <p data-editor-id="app/components/admin/InquiriesManager.tsx:412:19" className="text-gray-600 text-sm">{formatDate(selectedInquiry.updatedAt)}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div data-editor-id="app/components/admin/InquiriesManager.tsx:417:15" className="flex gap-3 pt-4">
                <a data-editor-id="app/components/admin/InquiriesManager.tsx:418:17"
              href={`mailto:${selectedInquiry.email}`}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">

                  <Icon icon="material-symbols:email" />
                  <span data-editor-id="app/components/admin/InquiriesManager.tsx:376:19">Send Email</span>
                </a>
                {selectedInquiry.phone &&
              <a data-editor-id="app/components/admin/InquiriesManager.tsx:426:19"
              href={`tel:${selectedInquiry.phone}`}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">

                    <Icon icon="material-symbols:phone" />
                    <span data-editor-id="app/components/admin/InquiriesManager.tsx:384:21">Call</span>
                  </a>
              }
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

}