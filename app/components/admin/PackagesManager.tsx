'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface Package {
  id: string;
  name: string;
  duration: number;
  price: number;
  currency: string;
  hotelName: string;
  hotelStars: number;
  distanceToHaram: string;
  inclusions: string[];
  description: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  isPopular: boolean;
  active: boolean;
  createdAt?: { seconds?: number; nanoseconds?: number } | number | string | Date;
}

export default function PackagesManager() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    duration: 7,
    price: 1999,
    currency: 'GBP',
    hotelName: '',
    hotelStars: 4,
    distanceToHaram: '',
    inclusions: ['Return Flights', 'Hotel Accommodation', 'Transport', 'Guidance'],
    description: '',
    imageUrl: '',
    rating: 4.5,
    reviewCount: 100,
    isPopular: false
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/packages');
      const data = await response.json();
      if (response.ok) {
        setPackages(data.packages || []);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingPackage ? `/api/packages?id=${editingPackage.id}` : '/api/packages';
      const method = editingPackage ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchPackages();
        resetForm();
        setShowForm(false);
      } else {
        console.error('Error saving package');
      }
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleDelete = async (packageId: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      const response = await fetch(`/api/packages?id=${packageId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchPackages();
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      duration: pkg.duration,
      price: pkg.price,
      currency: pkg.currency,
      hotelName: pkg.hotelName,
      hotelStars: pkg.hotelStars,
      distanceToHaram: pkg.distanceToHaram,
      inclusions: pkg.inclusions,
      description: pkg.description,
      imageUrl: pkg.imageUrl,
      rating: pkg.rating,
      reviewCount: pkg.reviewCount,
      isPopular: pkg.isPopular
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingPackage(null);
    setFormData({
      name: '',
      duration: 7,
      price: 1999,
      currency: 'GBP',
      hotelName: '',
      hotelStars: 4,
      distanceToHaram: '',
      inclusions: ['Return Flights', 'Hotel Accommodation', 'Transport', 'Guidance'],
      description: '',
      imageUrl: '',
      rating: 4.5,
      reviewCount: 100,
      isPopular: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
      type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleInclusionsChange = (index: number, value: string) => {
    const newInclusions = [...formData.inclusions];
    newInclusions[index] = value;
    setFormData((prev) => ({ ...prev, inclusions: newInclusions }));
  };

  const addInclusion = () => {
    setFormData((prev) => ({
      ...prev,
      inclusions: [...prev.inclusions, '']
    }));
  };

  const removeInclusion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div data-editor-id="app/components/admin/PackagesManager.tsx:179:7" className="space-y-6">
        <div data-editor-id="app/components/admin/PackagesManager.tsx:180:9" className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div data-editor-id="app/components/admin/PackagesManager.tsx:181:9" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) =>
          <div data-editor-id="app/components/admin/PackagesManager.tsx:183:13" key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
              <div data-editor-id="app/components/admin/PackagesManager.tsx:184:15" className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div data-editor-id="app/components/admin/PackagesManager.tsx:185:15" className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div data-editor-id="app/components/admin/PackagesManager.tsx:186:15" className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          )}
        </div>
      </div>);

  }

  return (
    <div data-editor-id="app/components/admin/PackagesManager.tsx:195:5" className="space-y-6">
      {/* Header */}
      <div data-editor-id="app/components/admin/PackagesManager.tsx:197:7" className="flex justify-between items-center">
        <div data-editor-id="app/components/admin/PackagesManager.tsx:198:9">
          <h1 data-editor-id="app/components/admin/PackagesManager.tsx:199:11" className="text-2xl font-bold text-gray-900">
            <span data-editor-id="app/components/admin/PackagesManager.tsx:159:13">Packages Management</span>
          </h1>
          <p data-editor-id="app/components/admin/PackagesManager.tsx:202:11" className="text-gray-600">
            <span data-editor-id="app/components/admin/PackagesManager.tsx:162:13">Manage your Umrah packages</span>
          </p>
        </div>
        <button data-editor-id="app/components/admin/PackagesManager.tsx:206:9"
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
        className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2">

          <Icon icon="material-symbols:add" />
          <span data-editor-id="app/components/admin/PackagesManager.tsx:172:11">Add Package</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm &&
      <div data-editor-id="app/components/admin/PackagesManager.tsx:220:9" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div data-editor-id="app/components/admin/PackagesManager.tsx:221:11" className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div data-editor-id="app/components/admin/PackagesManager.tsx:222:13" className="p-6 border-b border-gray-200">
              <div data-editor-id="app/components/admin/PackagesManager.tsx:223:15" className="flex justify-between items-center">
                <h2 data-editor-id="app/components/admin/PackagesManager.tsx:224:17" className="text-xl font-semibold text-gray-900">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:184:19">{editingPackage ? 'Edit' : 'Add'} Package</span>
                </h2>
                <button data-editor-id="app/components/admin/PackagesManager.tsx:227:17"
              onClick={() => setShowForm(false)}
              className="p-2 hover:bg-gray-100 rounded-lg">

                  <Icon icon="material-symbols:close" className="text-xl" />
                </button>
              </div>
            </div>

            <form data-editor-id="app/components/admin/PackagesManager.tsx:236:13" onSubmit={handleSubmit} className="p-6 space-y-4">
              <div data-editor-id="app/components/admin/PackagesManager.tsx:237:15" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div data-editor-id="app/components/admin/PackagesManager.tsx:238:17">
                  <label data-editor-id="app/components/admin/PackagesManager.tsx:239:19" className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:199:21">Package Name</span>
                  </label>
                  <input data-editor-id="app/components/admin/PackagesManager.tsx:242:19"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />

                </div>
                
                <div data-editor-id="app/components/admin/PackagesManager.tsx:252:17">
                  <label data-editor-id="app/components/admin/PackagesManager.tsx:253:19" className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:211:21">Duration (days)</span>
                  </label>
                  <input data-editor-id="app/components/admin/PackagesManager.tsx:256:19"
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />

                </div>
              </div>

              <div data-editor-id="app/components/admin/PackagesManager.tsx:268:15" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div data-editor-id="app/components/admin/PackagesManager.tsx:269:17">
                  <label data-editor-id="app/components/admin/PackagesManager.tsx:270:19" className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:227:21">Price</span>
                  </label>
                  <input data-editor-id="app/components/admin/PackagesManager.tsx:273:19"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />

                </div>
                
                <div data-editor-id="app/components/admin/PackagesManager.tsx:285:17">
                  <label data-editor-id="app/components/admin/PackagesManager.tsx:286:19" className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:241:21">Currency</span>
                  </label>
                  <select data-editor-id="app/components/admin/PackagesManager.tsx:289:19"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">

                    <option data-editor-id="app/components/admin/PackagesManager.tsx:295:21" value="GBP">GBP (£)</option>
                    <option data-editor-id="app/components/admin/PackagesManager.tsx:296:21" value="USD">USD ($)</option>
                    <option data-editor-id="app/components/admin/PackagesManager.tsx:297:21" value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>

              <div data-editor-id="app/components/admin/PackagesManager.tsx:302:15">
                <label data-editor-id="app/components/admin/PackagesManager.tsx:303:17" className="block text-sm font-medium text-gray-700 mb-1">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:256:19">Description</span>
                </label>
                <textarea data-editor-id="app/components/admin/PackagesManager.tsx:306:17"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />

              </div>

              <div data-editor-id="app/components/admin/PackagesManager.tsx:316:15">
                <label data-editor-id="app/components/admin/PackagesManager.tsx:317:17" className="block text-sm font-medium text-gray-700 mb-1">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:269:19">Image URL</span>
                </label>
                <input data-editor-id="app/components/admin/PackagesManager.tsx:320:17"
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />

              </div>

              <div data-editor-id="app/components/admin/PackagesManager.tsx:330:15" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div data-editor-id="app/components/admin/PackagesManager.tsx:331:17">
                  <label data-editor-id="app/components/admin/PackagesManager.tsx:332:19" className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:284:21">Hotel Name</span>
                  </label>
                  <input data-editor-id="app/components/admin/PackagesManager.tsx:335:19"
                type="text"
                name="hotelName"
                value={formData.hotelName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />

                </div>
                
                <div data-editor-id="app/components/admin/PackagesManager.tsx:345:17">
                  <label data-editor-id="app/components/admin/PackagesManager.tsx:346:19" className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:296:21">Hotel Stars</span>
                  </label>
                  <select data-editor-id="app/components/admin/PackagesManager.tsx:349:19"
                name="hotelStars"
                value={formData.hotelStars}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">

                    {[3, 4, 5].map((stars) =>
                  <option data-editor-id="app/components/admin/PackagesManager.tsx:356:23" key={stars} value={stars}>{stars} Stars</option>
                  )}
                  </select>
                </div>
                
                <div data-editor-id="app/components/admin/PackagesManager.tsx:361:17">
                  <label data-editor-id="app/components/admin/PackagesManager.tsx:362:19" className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:311:21">Distance to Haram</span>
                  </label>
                  <input data-editor-id="app/components/admin/PackagesManager.tsx:365:19"
                type="text"
                name="distanceToHaram"
                value={formData.distanceToHaram}
                onChange={handleInputChange}
                placeholder="100m from Haram"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />

                </div>
              </div>

              <div data-editor-id="app/components/admin/PackagesManager.tsx:377:15">
                <label data-editor-id="app/components/admin/PackagesManager.tsx:378:17" className="block text-sm font-medium text-gray-700 mb-2">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:326:19">Inclusions</span>
                </label>
                {formData.inclusions.map((inclusion, index) =>
              <div data-editor-id="app/components/admin/PackagesManager.tsx:382:19" key={index} className="flex gap-2 mb-2">
                    <input data-editor-id="app/components/admin/PackagesManager.tsx:383:21"
                type="text"
                value={inclusion}
                onChange={(e) => handleInclusionsChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />

                    <button data-editor-id="app/components/admin/PackagesManager.tsx:389:21"
                type="button"
                onClick={() => removeInclusion(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg">

                      <Icon icon="material-symbols:remove" />
                    </button>
                  </div>
              )}
                <button data-editor-id="app/components/admin/PackagesManager.tsx:398:17"
              type="button"
              onClick={addInclusion}
              className="text-amber-600 hover:text-amber-700 flex items-center gap-1">

                  <Icon icon="material-symbols:add" />
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:349:19">Add Inclusion</span>
                </button>
              </div>

              <div data-editor-id="app/components/admin/PackagesManager.tsx:408:15" className="flex items-center gap-4">
                <label data-editor-id="app/components/admin/PackagesManager.tsx:409:17" className="flex items-center gap-2">
                  <input data-editor-id="app/components/admin/PackagesManager.tsx:410:19"
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />

                  <span data-editor-id="app/components/admin/PackagesManager.tsx:363:19" className="text-sm text-gray-700">Mark as Popular</span>
                </label>
              </div>

              <div data-editor-id="app/components/admin/PackagesManager.tsx:421:15" className="flex justify-end gap-3 pt-4">
                <button data-editor-id="app/components/admin/PackagesManager.tsx:422:17"
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">

                  <span data-editor-id="app/components/admin/PackagesManager.tsx:374:19">Cancel</span>
                </button>
                <button data-editor-id="app/components/admin/PackagesManager.tsx:429:17"
              type="submit"
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">

                  <span data-editor-id="app/components/admin/PackagesManager.tsx:380:19">{editingPackage ? 'Update' : 'Create'} Package</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      {/* Packages Grid */}
      <div data-editor-id="app/components/admin/PackagesManager.tsx:442:7" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) =>
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

            {pkg.imageUrl &&
          <img data-editor-id="app/components/admin/PackagesManager.tsx:452:15"
          src={pkg.imageUrl}
          alt={pkg.name}
          className="w-full h-32 object-cover" />

          }
            <div data-editor-id="app/components/admin/PackagesManager.tsx:458:13" className="p-4">
              <div data-editor-id="app/components/admin/PackagesManager.tsx:459:15" className="flex justify-between items-start mb-2">
                <h3 data-editor-id="app/components/admin/PackagesManager.tsx:460:17" className="font-semibold text-gray-900 flex-1">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:405:19">{pkg.name}</span>
                </h3>
                {pkg.isPopular &&
              <span data-editor-id="app/components/admin/PackagesManager.tsx:464:19" className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium ml-2">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:409:21">Popular</span>
                  </span>
              }
              </div>
              
              <div data-editor-id="app/components/admin/PackagesManager.tsx:470:15" className="space-y-2 text-sm text-gray-600 mb-4">
                <div data-editor-id="app/components/admin/PackagesManager.tsx:471:17" className="flex justify-between">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:416:19">Duration:</span>
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:473:19">{pkg.duration} days</span>
                </div>
                <div data-editor-id="app/components/admin/PackagesManager.tsx:475:17" className="flex justify-between">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:420:19">Price:</span>
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:477:19" className="font-semibold text-gray-900">{pkg.currency} {pkg.price}</span>
                </div>
                <div data-editor-id="app/components/admin/PackagesManager.tsx:479:17" className="flex justify-between">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:424:19">Hotel:</span>
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:481:19">{pkg.hotelName} ({pkg.hotelStars}★)</span>
                </div>
              </div>

              <div data-editor-id="app/components/admin/PackagesManager.tsx:485:15" className="flex gap-2">
                <button data-editor-id="app/components/admin/PackagesManager.tsx:486:17"
              onClick={() => handleEdit(pkg)}
              className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">

                  <Icon icon="material-symbols:edit" className="text-sm" />
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:436:19">Edit</span>
                </button>
                <button data-editor-id="app/components/admin/PackagesManager.tsx:493:17"
              onClick={() => handleDelete(pkg.id)}
              className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-1">

                  <Icon icon="material-symbols:delete" className="text-sm" />
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:443:19">Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {packages.length === 0 &&
      <div data-editor-id="app/components/admin/PackagesManager.tsx:507:9" className="text-center py-12">
          <Icon icon="material-symbols:package" className="text-6xl text-gray-400 mb-4" />
          <h3 data-editor-id="app/components/admin/PackagesManager.tsx:509:11" className="text-xl font-medium text-gray-600 mb-2">
            <span data-editor-id="app/components/admin/PackagesManager.tsx:455:13">No packages yet</span>
          </h3>
          <p data-editor-id="app/components/admin/PackagesManager.tsx:512:11" className="text-gray-500 mb-6">
            <span data-editor-id="app/components/admin/PackagesManager.tsx:458:13">Create your first Umrah package to get started</span>
          </p>
          <button data-editor-id="app/components/admin/PackagesManager.tsx:515:11"
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
        className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700">

            <span data-editor-id="app/components/admin/PackagesManager.tsx:467:13">Create Package</span>
          </button>
        </div>
      }
    </div>);

}