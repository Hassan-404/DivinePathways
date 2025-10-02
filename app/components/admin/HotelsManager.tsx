'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface Hotel {
  id: string;
  name: string;
  starRating: number;
  distanceToHaram: string;
  amenities: string[];
  description: string;
  imageUrl: string;
  priceRange: string;
  rating: number;
  reviewCount: number;
  active: boolean;
}

export default function HotelsManager() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    starRating: 4,
    distanceToHaram: '',
    amenities: ['WiFi', 'Restaurant', 'Room Service'],
    description: '',
    imageUrl: '',
    priceRange: '£200-400',
    rating: 4.5,
    reviewCount: 100
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/hotels');
      const data = await response.json();
      if (response.ok) {
        setHotels(data.hotels || []);
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingHotel ? `/api/hotels?id=${editingHotel.id}` : '/api/hotels';
      const method = editingHotel ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchHotels();
        resetForm();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error saving hotel:', error);
    }
  };

  const handleDelete = async (hotelId: string) => {
    if (!confirm('Are you sure you want to delete this hotel?')) return;

    try {
      const response = await fetch(`/api/hotels?id=${hotelId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchHotels();
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      starRating: hotel.starRating,
      distanceToHaram: hotel.distanceToHaram,
      amenities: hotel.amenities,
      description: hotel.description,
      imageUrl: hotel.imageUrl,
      priceRange: hotel.priceRange,
      rating: hotel.rating,
      reviewCount: hotel.reviewCount
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingHotel(null);
    setFormData({
      name: '',
      starRating: 4,
      distanceToHaram: '',
      amenities: ['WiFi', 'Restaurant', 'Room Service'],
      description: '',
      imageUrl: '',
      priceRange: '£200-400',
      rating: 4.5,
      reviewCount: 100
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleAmenitiesChange = (index: number, value: string) => {
    const newAmenities = [...formData.amenities];
    newAmenities[index] = value;
    setFormData(prev => ({ ...prev, amenities: newAmenities }));
  };

  const addAmenity = () => {
    setFormData(prev => ({
      ...prev,
      amenities: [...prev.amenities, '']
    }));
  };

  const removeAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
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
            <span data-editor-id="app/components/admin/HotelsManager.tsx:142:13">Hotels Management</span>
          </h1>
          <p className="text-gray-600">
            <span data-editor-id="app/components/admin/HotelsManager.tsx:145:13">Manage partner hotels and accommodations</span>
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
          <span data-editor-id="app/components/admin/HotelsManager.tsx:155:11">Add Hotel</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  <span data-editor-id="app/components/admin/HotelsManager.tsx:167:19">{editingHotel ? 'Edit' : 'Add'} Hotel</span>
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
                    <span data-editor-id="app/components/admin/HotelsManager.tsx:182:21">Hotel Name</span>
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
                    <span data-editor-id="app/components/admin/HotelsManager.tsx:194:21">Star Rating</span>
                  </label>
                  <select
                    name="starRating"
                    value={formData.starRating}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {[3, 4, 5].map(stars => (
                      <option key={stars} value={stars}>{stars} Stars</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/HotelsManager.tsx:210:21">Distance to Haram</span>
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/HotelsManager.tsx:223:21">Price Range</span>
                  </label>
                  <input
                    type="text"
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleInputChange}
                    placeholder="£200-400 per night"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span data-editor-id="app/components/admin/HotelsManager.tsx:238:19">Description</span>
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
                  <span data-editor-id="app/components/admin/HotelsManager.tsx:251:19">Image URL</span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/hotel.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span data-editor-id="app/components/admin/HotelsManager.tsx:264:19">Amenities</span>
                </label>
                {formData.amenities.map((amenity, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={amenity}
                      onChange={(e) => handleAmenitiesChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Icon icon="material-symbols:remove" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAmenity}
                  className="text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <Icon icon="material-symbols:add" />
                  <span data-editor-id="app/components/admin/HotelsManager.tsx:287:19">Add Amenity</span>
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <span data-editor-id="app/components/admin/HotelsManager.tsx:297:19">Cancel</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  <span data-editor-id="app/components/admin/HotelsManager.tsx:303:19">{editingHotel ? 'Update' : 'Create'} Hotel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => (
          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {hotel.imageUrl && (
              <img 
                src={hotel.imageUrl} 
                alt={hotel.name}
                className="w-full h-32 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 flex-1">
                  <span data-editor-id="app/components/admin/HotelsManager.tsx:328:19">{hotel.name}</span>
                </h3>
                <div className="flex items-center gap-1 ml-2">
                  {[...Array(hotel.starRating)].map((_, i) => (
                    <Icon key={i} icon="material-symbols:star" className="text-amber-400 text-xs" />
                  ))}
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Icon icon="material-symbols:location-on" className="text-xs" />
                  <span data-editor-id="app/components/admin/HotelsManager.tsx:340:19">{hotel.distanceToHaram}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="material-symbols:payments" className="text-xs" />
                  <span data-editor-id="app/components/admin/HotelsManager.tsx:344:19">{hotel.priceRange}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="material-symbols:star" className="text-xs" />
                  <span>{hotel.rating.toFixed(1)} ({hotel.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(hotel)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Icon icon="material-symbols:edit" className="text-sm" />
                  <span data-editor-id="app/components/admin/HotelsManager.tsx:357:19">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(hotel.id)}
                  className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Icon icon="material-symbols:delete" className="text-sm" />
                  <span data-editor-id="app/components/admin/HotelsManager.tsx:364:19">Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {hotels.length === 0 && (
        <div className="text-center py-12">
          <Icon icon="material-symbols:hotel" className="text-6xl text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            <span data-editor-id="app/components/admin/HotelsManager.tsx:376:13">No hotels yet</span>
          </h3>
          <p className="text-gray-500 mb-6">
            <span data-editor-id="app/components/admin/HotelsManager.tsx:379:13">Add your first partner hotel to get started</span>
          </p>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700"
          >
            <span data-editor-id="app/components/admin/HotelsManager.tsx:388:13">Add Hotel</span>
          </button>
        </div>
      )}
    </div>
  );
}