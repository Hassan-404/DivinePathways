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
  createdAt?: any;
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
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleInclusionsChange = (index: number, value: string) => {
    const newInclusions = [...formData.inclusions];
    newInclusions[index] = value;
    setFormData(prev => ({ ...prev, inclusions: newInclusions }));
  };

  const addInclusion = () => {
    setFormData(prev => ({
      ...prev,
      inclusions: [...prev.inclusions, '']
    }));
  };

  const removeInclusion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            <span data-editor-id="app/components/admin/PackagesManager.tsx:159:13">Packages Management</span>
          </h1>
          <p className="text-gray-600">
            <span data-editor-id="app/components/admin/PackagesManager.tsx:162:13">Manage your Umrah packages</span>
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
        >
          <Icon icon="material-symbols:add" />
          <span data-editor-id="app/components/admin/PackagesManager.tsx:172:11">Add Package</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:184:19">{editingPackage ? 'Edit' : 'Add'} Package</span>
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Icon icon="material-symbols:close" className="text-xl" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:199:21">Package Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:211:21">Duration (days)</span>
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:227:21">Price</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:241:21">Currency</span>
                  </label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="GBP">GBP (£)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:256:19">Description</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:269:19">Image URL</span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:284:21">Hotel Name</span>
                  </label>
                  <input
                    type="text"
                    name="hotelName"
                    value={formData.hotelName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:296:21">Hotel Stars</span>
                  </label>
                  <select
                    name="hotelStars"
                    value={formData.hotelStars}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {[3, 4, 5].map(stars => (
                      <option key={stars} value={stars}>{stars} Stars</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:311:21">Distance to Haram</span>
                  </label>
                  <input
                    type="text"
                    name="distanceToHaram"
                    value={formData.distanceToHaram}
                    onChange={handleInputChange}
                    placeholder="100m from Haram"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:326:19">Inclusions</span>
                </label>
                {formData.inclusions.map((inclusion, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={inclusion}
                      onChange={(e) => handleInclusionsChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeInclusion(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Icon icon="material-symbols:remove" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addInclusion}
                  className="text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <Icon icon="material-symbols:add" />
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:349:19">Add Inclusion</span>
                </button>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isPopular"
                    checked={formData.isPopular}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:363:19" className="text-sm text-gray-700">Mark as Popular</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:374:19">Cancel</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:380:19">{editingPackage ? 'Update' : 'Create'} Package</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {pkg.imageUrl && (
              <img 
                src={pkg.imageUrl} 
                alt={pkg.name}
                className="w-full h-32 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 flex-1">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:405:19">{pkg.name}</span>
                </h3>
                {pkg.isPopular && (
                  <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium ml-2">
                    <span data-editor-id="app/components/admin/PackagesManager.tsx:409:21">Popular</span>
                  </span>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:416:19">Duration:</span>
                  <span>{pkg.duration} days</span>
                </div>
                <div className="flex justify-between">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:420:19">Price:</span>
                  <span className="font-semibold text-gray-900">{pkg.currency} {pkg.price}</span>
                </div>
                <div className="flex justify-between">
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:424:19">Hotel:</span>
                  <span>{pkg.hotelName} ({pkg.hotelStars}★)</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Icon icon="material-symbols:edit" className="text-sm" />
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:436:19">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Icon icon="material-symbols:delete" className="text-sm" />
                  <span data-editor-id="app/components/admin/PackagesManager.tsx:443:19">Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {packages.length === 0 && (
        <div className="text-center py-12">
          <Icon icon="material-symbols:package" className="text-6xl text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            <span data-editor-id="app/components/admin/PackagesManager.tsx:455:13">No packages yet</span>
          </h3>
          <p className="text-gray-500 mb-6">
            <span data-editor-id="app/components/admin/PackagesManager.tsx:458:13">Create your first Umrah package to get started</span>
          </p>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700"
          >
            <span data-editor-id="app/components/admin/PackagesManager.tsx:467:13">Create Package</span>
          </button>
        </div>
      )}
    </div>
  );
}