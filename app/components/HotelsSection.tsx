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

export default function HotelsSection() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/hotels');
        const data = await response.json();
        if (response.ok) {
          setHotels(data.hotels || []);
        } else {
          // Set sample hotels as fallback
          setHotels([
            {
              id: '1',
              name: 'Hilton Suites Makkah',
              starRating: 5,
              distanceToHaram: '100m from Haram',
              amenities: ['WiFi', 'Restaurant', 'Room Service', 'Gym', 'Spa'],
              description: 'Luxury accommodation with stunning views of the Haram',
              imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
              priceRange: '£400-600',
              rating: 4.8,
              reviewCount: 250,
              active: true
            },
            {
              id: '2',
              name: 'Marriott Hotel Makkah',
              starRating: 4,
              distanceToHaram: '200m from Haram',
              amenities: ['WiFi', 'Restaurant', 'Room Service', 'Business Center'],
              description: 'Comfortable stay with excellent service and amenities',
              imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
              priceRange: '£250-400',
              rating: 4.6,
              reviewCount: 180,
              active: true
            },
            {
              id: '3',
              name: 'Hyatt Regency Makkah',
              starRating: 5,
              distanceToHaram: '150m from Haram',
              amenities: ['WiFi', 'Restaurant', 'Pool', 'Concierge', 'Laundry'],
              description: 'Premium hotel with world-class facilities and service',
              imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
              priceRange: '£350-500',
              rating: 4.7,
              reviewCount: 220,
              active: true
            },
            {
              id: '4',
              name: 'Grand Makkah Hotel',
              starRating: 4,
              distanceToHaram: '300m from Haram',
              amenities: ['WiFi', 'Restaurant', 'Shuttle Service', 'Conference Room'],
              description: 'Convenient location with modern amenities and comfort',
              imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
              priceRange: '£200-350',
              rating: 4.4,
              reviewCount: 150,
              active: true
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-2xl mb-4"></div>
                <div className="bg-gray-200 h-4 w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-4 w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hotels" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            <span data-editor-id="app/components/HotelsSection.tsx:108:13">Premium</span>{' '}
            <span className="bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent font-medium">
              <span data-editor-id="app/components/HotelsSection.tsx:110:15">Partner Hotels</span>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <span data-editor-id="app/components/HotelsSection.tsx:114:13">Carefully selected accommodations offering comfort, convenience, and proximity to the Holy Mosque</span>
          </p>
        </motion.div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Hotel Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={hotel.imageUrl} 
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
                  <div className="flex items-center gap-1">
                    {[...Array(hotel.starRating)].map((_, i) => (
                      <Icon key={i} icon="material-symbols:star" className="text-amber-400 text-xs" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Hotel Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    <span data-editor-id="app/components/HotelsSection.tsx:145:21">{hotel.name}</span>
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-sm mb-3">
                  <Icon icon="material-symbols:location-on" className="text-amber-600" />
                  <span data-editor-id="app/components/HotelsSection.tsx:151:19" className="text-gray-600">{hotel.distanceToHaram}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Icon icon="material-symbols:star" className="text-amber-500" />
                  <span className="text-sm font-medium">{hotel.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-500">({hotel.reviewCount} reviews)</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  <span data-editor-id="app/components/HotelsSection.tsx:161:19">{hotel.description}</span>
                </p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">
                    <span data-editor-id="app/components/HotelsSection.tsx:166:21">Amenities:</span>
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {hotel.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                        <span data-editor-id="app/components/HotelsSection.tsx:171:25">{amenity}</span>
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-xs text-gray-500">
                        <span data-editor-id="app/components/HotelsSection.tsx:176:25">+{hotel.amenities.length - 3}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-500">From </span>
                    <span className="font-semibold text-gray-900">{hotel.priceRange}</span>
                    <div className="text-xs text-gray-500">
                      <span data-editor-id="app/components/HotelsSection.tsx:187:23">per night</span>
                    </div>
                  </div>

                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 text-sm font-medium"
                  >
                    <span data-editor-id="app/components/HotelsSection.tsx:194:21">View Details</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {hotels.length === 0 && (
          <div className="text-center py-12">
            <Icon icon="material-symbols:hotel-class" className="text-6xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              <span data-editor-id="app/components/HotelsSection.tsx:206:15">No hotels available</span>
            </h3>
            <p className="text-gray-500">
              <span data-editor-id="app/components/HotelsSection.tsx:209:15">Please check back later or contact us for more information</span>
            </p>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-3xl p-8 max-w-3xl mx-auto">
            <Icon icon="material-symbols:hotel" className="text-5xl text-amber-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              <span data-editor-id="app/components/HotelsSection.tsx:226:15">Looking for something specific?</span>
            </h3>
            <p className="text-gray-600 mb-6">
              <span data-editor-id="app/components/HotelsSection.tsx:229:15">Our team can help you find the perfect accommodation to match your preferences and budget</span>
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-200 font-medium"
            >
              <span data-editor-id="app/components/HotelsSection.tsx:235:15">Contact Our Experts</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}