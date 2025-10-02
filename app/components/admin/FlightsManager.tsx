'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface Flight {
  id: string;
  airlineName: string;
  airlineCode: string;
  route: string;
  departureCity: string;
  arrivalCity: string;
  duration: string;
  sampleTiming: string;
  priceRange: string;
  aircraftType: string;
  features: string[];
  active: boolean;
}

export default function FlightsManager() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [formData, setFormData] = useState({
    airlineName: '',
    airlineCode: '',
    route: 'London → Jeddah',
    departureCity: 'London Heathrow',
    arrivalCity: 'King Abdulaziz Intl',
    duration: '7h 30m',
    sampleTiming: '14:30 - 22:00',
    priceRange: '£400-800',
    aircraftType: 'Boeing 787',
    features: ['In-flight meals', 'Entertainment', 'WiFi']
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/flights');
      const data = await response.json();
      if (response.ok) {
        setFlights(data.flights || []);
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingFlight ? `/api/flights?id=${editingFlight.id}` : '/api/flights';
      const method = editingFlight ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchFlights();
        resetForm();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error saving flight:', error);
    }
  };

  const handleDelete = async (flightId: string) => {
    if (!confirm('Are you sure you want to delete this flight?')) return;

    try {
      const response = await fetch(`/api/flights?id=${flightId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchFlights();
      }
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  const handleEdit = (flight: Flight) => {
    setEditingFlight(flight);
    setFormData({
      airlineName: flight.airlineName,
      airlineCode: flight.airlineCode,
      route: flight.route,
      departureCity: flight.departureCity,
      arrivalCity: flight.arrivalCity,
      duration: flight.duration,
      sampleTiming: flight.sampleTiming,
      priceRange: flight.priceRange,
      aircraftType: flight.aircraftType,
      features: flight.features
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingFlight(null);
    setFormData({
      airlineName: '',
      airlineCode: '',
      route: 'London → Jeddah',
      departureCity: 'London Heathrow',
      arrivalCity: 'King Abdulaziz Intl',
      duration: '7h 30m',
      sampleTiming: '14:30 - 22:00',
      priceRange: '£400-800',
      aircraftType: 'Boeing 787',
      features: ['In-flight meals', 'Entertainment', 'WiFi']
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeaturesChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
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
            <span data-editor-id="app/components/admin/FlightsManager.tsx:144:13">Flights Management</span>
          </h1>
          <p className="text-gray-600">
            <span data-editor-id="app/components/admin/FlightsManager.tsx:147:13">Manage airline partners and flight information</span>
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
          <span data-editor-id="app/components/admin/FlightsManager.tsx:157:11">Add Flight</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  <span data-editor-id="app/components/admin/FlightsManager.tsx:169:19">{editingFlight ? 'Edit' : 'Add'} Flight</span>
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
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:184:21">Airline Name</span>
                  </label>
                  <input
                    type="text"
                    name="airlineName"
                    value={formData.airlineName}
                    onChange={handleInputChange}
                    placeholder="British Airways"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:197:21">Airline Code</span>
                  </label>
                  <input
                    type="text"
                    name="airlineCode"
                    value={formData.airlineCode}
                    onChange={handleInputChange}
                    placeholder="BA"
                    maxLength={3}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:214:21">Route</span>
                  </label>
                  <input
                    type="text"
                    name="route"
                    value={formData.route}
                    onChange={handleInputChange}
                    placeholder="London → Jeddah"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:227:21">Aircraft Type</span>
                  </label>
                  <input
                    type="text"
                    name="aircraftType"
                    value={formData.aircraftType}
                    onChange={handleInputChange}
                    placeholder="Boeing 787"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:244:21">Duration</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="7h 30m"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:257:21">Sample Timing</span>
                  </label>
                  <input
                    type="text"
                    name="sampleTiming"
                    value={formData.sampleTiming}
                    onChange={handleInputChange}
                    placeholder="14:30 - 22:00"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:270:21">Price Range</span>
                  </label>
                  <input
                    type="text"
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleInputChange}
                    placeholder="£400-800"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:286:21">Departure City</span>
                  </label>
                  <input
                    type="text"
                    name="departureCity"
                    value={formData.departureCity}
                    onChange={handleInputChange}
                    placeholder="London Heathrow"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:299:21">Arrival City</span>
                  </label>
                  <input
                    type="text"
                    name="arrivalCity"
                    value={formData.arrivalCity}
                    onChange={handleInputChange}
                    placeholder="King Abdulaziz Intl"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span data-editor-id="app/components/admin/FlightsManager.tsx:314:19">Features</span>
                </label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeaturesChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Icon icon="material-symbols:remove" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <Icon icon="material-symbols:add" />
                  <span data-editor-id="app/components/admin/FlightsManager.tsx:337:19">Add Feature</span>
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <span data-editor-id="app/components/admin/FlightsManager.tsx:347:19">Cancel</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  <span data-editor-id="app/components/admin/FlightsManager.tsx:353:19">{editingFlight ? 'Update' : 'Create'} Flight</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Flights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {flights.map((flight, index) => (
          <motion.div
            key={flight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  <span data-editor-id="app/components/admin/FlightsManager.tsx:375:19">{flight.airlineCode}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:379:21">{flight.airlineName}</span>
                  </h3>
                  <p className="text-sm text-gray-500">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:382:21">{flight.aircraftType}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-lg text-gray-900">{flight.priceRange}</div>
                <div className="text-xs text-gray-500">
                  <span data-editor-id="app/components/admin/FlightsManager.tsx:389:19">per person</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="text-center">
                  <div className="font-semibold text-gray-900 mb-1">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:398:21">LHR</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:401:21">{flight.departureCity}</span>
                  </div>
                </div>
                
                <div className="flex-1 text-center mx-4">
                  <Icon icon="material-symbols:flight" className="text-amber-600 text-lg mb-1" />
                  <div className="text-xs text-gray-500">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:408:21">{flight.duration}</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="font-semibold text-gray-900 mb-1">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:414:21">JED</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:417:21">{flight.arrivalCity}</span>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2 text-sm text-gray-600">
                <span data-editor-id="app/components/admin/FlightsManager.tsx:422:17">{flight.sampleTiming}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2 text-sm">
                <span data-editor-id="app/components/admin/FlightsManager.tsx:428:17">Features:</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {flight.features.map((feature, i) => (
                  <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs">
                    <span data-editor-id="app/components/admin/FlightsManager.tsx:434:21">{feature}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(flight)}
                className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
              >
                <Icon icon="material-symbols:edit" className="text-sm" />
                <span data-editor-id="app/components/admin/FlightsManager.tsx:446:17">Edit</span>
              </button>
              <button
                onClick={() => handleDelete(flight.id)}
                className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-1"
              >
                <Icon icon="material-symbols:delete" className="text-sm" />
                <span data-editor-id="app/components/admin/FlightsManager.tsx:453:17">Delete</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {flights.length === 0 && (
        <div className="text-center py-12">
          <Icon icon="material-symbols:flight" className="text-6xl text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            <span data-editor-id="app/components/admin/FlightsManager.tsx:464:13">No flights yet</span>
          </h3>
          <p className="text-gray-500 mb-6">
            <span data-editor-id="app/components/admin/FlightsManager.tsx:467:13">Add your first airline partner to get started</span>
          </p>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700"
          >
            <span data-editor-id="app/components/admin/FlightsManager.tsx:476:13">Add Flight</span>
          </button>
        </div>
      )}
    </div>
  );
}