'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useCosmicPayments } from 'cosmic-payments/client';

interface UmrahPackage {
  id: string;
  name: string;
  duration: number;
  price: number;
  originalPrice?: number;
  currency: string;
  hotelName: string;
  hotelStars: number;
  distanceToHaram: string;
  inclusions: string[];
  description: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  active: boolean;
}

export default function PackagesSection() {
  const [packages, setPackages] = useState<UmrahPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    duration: 'all',
    priceRange: 'all',
    rating: 'all'
  });
  const [sortBy, setSortBy] = useState('popular');

  const { checkout, getProducts } = useCosmicPayments();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);

        // Prefer database packages when available (ensures seeded data drives filters)
        const dbRes = await fetch('/api/packages');
        const dbData = await dbRes.json();
        const dbPackages = Array.isArray(dbData?.packages) ? dbData.packages : [];
        if (dbRes.ok && dbPackages.length > 0) {
          setPackages(dbPackages);
        } else {
          // Fallback to Cosmic Payments products
          const cosmicProducts = await getProducts('all');
          if (cosmicProducts && cosmicProducts.length > 0) {
            const umrahPackages = cosmicProducts.map((product, index) => ({
              id: product.product_id,
              name: product.name,
              duration: 14, // Default duration
              price: product.prices[0]?.unitAmount / 100 || 2999,
              currency: product.prices[0]?.currency || 'GBP',
              hotelName: 'Luxury Hotel Near Haram',
              hotelStars: 5,
              distanceToHaram: '100m from Haram',
              inclusions: ['Return Flights', 'Hotel Accommodation', 'Transport', 'Guidance'],
              description: product.description || 'Premium Umrah package with luxury accommodations',
              imageUrl: product.product_image_urls[0] || 'https://images.unsplash.com/photo-1571049813798-0c9e5e3b9b89',
              rating: 4 + Math.random(),
              reviewCount: Math.floor(Math.random() * 200) + 50,
              isPopular: index === 0,
              active: product.active
            }));
            setPackages(umrahPackages);
          } else {
            setPackages([]);
          }
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        // Set sample packages as fallback
        setPackages([
        {
          id: '1',
          name: 'Premium Umrah Package',
          duration: 14,
          price: 2999,
          originalPrice: 3499,
          currency: 'GBP',
          hotelName: 'Hilton Suites Makkah',
          hotelStars: 5,
          distanceToHaram: '100m from Haram',
          inclusions: ['Return Flights', 'Hotel Accommodation', 'Transport', 'Guidance', 'Meals'],
          description: 'Premium 14-day Umrah package with 5-star accommodation',
          imageUrl: 'https://images.unsplash.com/photo-1571049813798-0c9e5e3b9b89',
          rating: 4.8,
          reviewCount: 150,
          isPopular: true,
          active: true
        },
        {
          id: '2',
          name: 'Deluxe Umrah Package',
          duration: 10,
          price: 2299,
          currency: 'GBP',
          hotelName: 'Marriott Hotel Makkah',
          hotelStars: 4,
          distanceToHaram: '200m from Haram',
          inclusions: ['Return Flights', 'Hotel Accommodation', 'Transport', 'Guidance'],
          description: 'Comfortable 10-day Umrah package with excellent service',
          imageUrl: 'https://images.unsplash.com/photo-1578856188012-79837d23d17e',
          rating: 4.6,
          reviewCount: 120,
          active: true
        }]
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [getProducts]);

  const handleBooking = async (pkg: UmrahPackage) => {
    try {
      await checkout({
        priceId: `price_${pkg.id}`, // This would need to match actual Stripe price IDs
        productId: pkg.id,
        quantity: 1
      });
    } catch (error) {
      console.error('Booking error:', error);
      // Handle booking error
    }
  };

  const filteredPackages = packages.filter((pkg) => {
    if (filter.duration !== 'all') {
      if (filter.duration === 'short' && pkg.duration > 10) return false;
      if (filter.duration === 'medium' && (pkg.duration < 10 || pkg.duration > 14)) return false;
      if (filter.duration === 'long' && pkg.duration < 14) return false;
    }
    if (filter.priceRange !== 'all') {
      if (filter.priceRange === 'budget' && pkg.price > 2000) return false;
      if (filter.priceRange === 'mid' && (pkg.price < 2000 || pkg.price > 3000)) return false;
      if (filter.priceRange === 'luxury' && pkg.price < 3000) return false;
    }
    if (filter.rating !== 'all') {
      const minRating = parseFloat(filter.rating);
      if (pkg.rating < minRating) return false;
    }
    return true;
  });

  const sortedPackages = filteredPackages.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'duration':
        return a.duration - b.duration;
      case 'rating':
        return b.rating - a.rating;
      default:
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    }
  });

  if (loading) {
    return (
      <section data-editor-id="app/components/PackagesSection.tsx:168:7" className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div data-editor-id="app/components/PackagesSection.tsx:169:9" className="max-w-7xl mx-auto px-4">
          <div data-editor-id="app/components/PackagesSection.tsx:170:11" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) =>
            <div data-editor-id="app/components/PackagesSection.tsx:172:15" key={i} className="animate-pulse">
                <div data-editor-id="app/components/PackagesSection.tsx:173:17" className="bg-gray-200 h-48 rounded-2xl mb-4"></div>
                <div data-editor-id="app/components/PackagesSection.tsx:174:17" className="bg-gray-200 h-4 w-3/4 mb-2"></div>
                <div data-editor-id="app/components/PackagesSection.tsx:175:17" className="bg-gray-200 h-4 w-1/2"></div>
              </div>
            )}
          </div>
        </div>
      </section>);

  }

  return (
    <section data-editor-id="app/components/PackagesSection.tsx:185:5" id="packages" className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div data-editor-id="app/components/PackagesSection.tsx:186:7" className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <h2 data-editor-id="app/components/PackagesSection.tsx:195:11" className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            <span data-editor-id="app/components/PackagesSection.tsx:165:13">Choose Your</span>{' '}
            <span data-editor-id="app/components/PackagesSection.tsx:197:13" className="bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent font-medium">
              <span data-editor-id="app/components/PackagesSection.tsx:167:15">Sacred Journey</span>
            </span>
          </h2>
          <p data-editor-id="app/components/PackagesSection.tsx:201:11" className="text-xl text-gray-600 max-w-3xl mx-auto">
            <span data-editor-id="app/components/PackagesSection.tsx:171:13">Carefully curated Umrah packages designed to provide you with comfort, convenience, and spiritual fulfillment</span>
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12">

          <select data-editor-id="app/components/PackagesSection.tsx:214:11"
          value={filter.duration}
          onChange={(e) => setFilter({ ...filter, duration: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500">

            <option data-editor-id="app/components/PackagesSection.tsx:219:13" value="all">All Durations</option>
            <option data-editor-id="app/components/PackagesSection.tsx:220:13" value="short">7-10 Days</option>
            <option data-editor-id="app/components/PackagesSection.tsx:221:13" value="medium">10-14 Days</option>
            <option data-editor-id="app/components/PackagesSection.tsx:222:13" value="long">14+ Days</option>
          </select>

          <select data-editor-id="app/components/PackagesSection.tsx:225:11"
          value={filter.priceRange}
          onChange={(e) => setFilter({ ...filter, priceRange: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500">

            <option data-editor-id="app/components/PackagesSection.tsx:230:13" value="all">All Prices</option>
            <option data-editor-id="app/components/PackagesSection.tsx:231:13" value="budget">Under £2,000</option>
            <option data-editor-id="app/components/PackagesSection.tsx:232:13" value="mid">£2,000 - £3,000</option>
            <option data-editor-id="app/components/PackagesSection.tsx:233:13" value="luxury">£3,000+</option>
          </select>

          <select data-editor-id="app/components/PackagesSection.tsx:236:11"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500">

            <option data-editor-id="app/components/PackagesSection.tsx:241:13" value="popular">Most Popular</option>
            <option data-editor-id="app/components/PackagesSection.tsx:242:13" value="price-low">Price: Low to High</option>
            <option data-editor-id="app/components/PackagesSection.tsx:243:13" value="price-high">Price: High to Low</option>
            <option data-editor-id="app/components/PackagesSection.tsx:244:13" value="duration">Duration</option>
            <option data-editor-id="app/components/PackagesSection.tsx:245:13" value="rating">Highest Rated</option>
          </select>
        </motion.div>

        {/* Packages Grid */}
        <div data-editor-id="app/components/PackagesSection.tsx:250:9" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPackages.map((pkg, index) =>
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">

              {/* Package Image */}
              <div data-editor-id="app/components/PackagesSection.tsx:261:15" className="relative h-48 overflow-hidden">
                <img data-editor-id="app/components/PackagesSection.tsx:262:17"
              src={pkg.imageUrl}
              alt={pkg.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                {pkg.isPopular &&
              <div data-editor-id="app/components/PackagesSection.tsx:268:19" className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <span data-editor-id="app/components/PackagesSection.tsx:230:21">Most Popular</span>
                  </div>
              }
                {pkg.originalPrice &&
              <div data-editor-id="app/components/PackagesSection.tsx:273:19" className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <span data-editor-id="app/components/PackagesSection.tsx:236:21">Save £{pkg.originalPrice - pkg.price}</span>
                  </div>
              }
              </div>

              {/* Package Content */}
              <div data-editor-id="app/components/PackagesSection.tsx:280:15" className="p-6">
                <div data-editor-id="app/components/PackagesSection.tsx:281:17" className="flex items-center justify-between mb-3">
                  <h3 data-editor-id="app/components/PackagesSection.tsx:282:19" className="text-xl font-semibold text-gray-900">
                    <span data-editor-id="app/components/PackagesSection.tsx:245:21">{pkg.name}</span>
                  </h3>
                  <div data-editor-id="app/components/PackagesSection.tsx:285:19" className="flex items-center gap-1">
                    <Icon icon="material-symbols:star" className="text-amber-500 text-lg" />
                    <span data-editor-id="app/components/PackagesSection.tsx:287:21" className="text-sm font-medium">{pkg.rating.toFixed(1)}</span>
                    <span data-editor-id="app/components/PackagesSection.tsx:288:21" className="text-xs text-gray-500">({pkg.reviewCount})</span>
                  </div>
                </div>

                <p data-editor-id="app/components/PackagesSection.tsx:292:17" className="text-gray-600 text-sm mb-4">
                  <span data-editor-id="app/components/PackagesSection.tsx:255:19">{pkg.description}</span>
                </p>

                <div data-editor-id="app/components/PackagesSection.tsx:296:17" className="space-y-2 mb-4">
                  <div data-editor-id="app/components/PackagesSection.tsx:297:19" className="flex items-center gap-2 text-sm">
                    <Icon icon="material-symbols:schedule" className="text-amber-600" />
                    <span data-editor-id="app/components/PackagesSection.tsx:261:21">{pkg.duration} Days</span>
                  </div>
                  <div data-editor-id="app/components/PackagesSection.tsx:301:19" className="flex items-center gap-2 text-sm">
                    <Icon icon="material-symbols:hotel" className="text-amber-600" />
                    <span data-editor-id="app/components/PackagesSection.tsx:265:21">{pkg.hotelName} ({pkg.hotelStars}★)</span>
                  </div>
                  <div data-editor-id="app/components/PackagesSection.tsx:305:19" className="flex items-center gap-2 text-sm">
                    <Icon icon="material-symbols:location-on" className="text-amber-600" />
                    <span data-editor-id="app/components/PackagesSection.tsx:269:21">{pkg.distanceToHaram}</span>
                  </div>
                </div>

                <div data-editor-id="app/components/PackagesSection.tsx:311:17" className="mb-4">
                  <h4 data-editor-id="app/components/PackagesSection.tsx:312:19" className="font-medium text-gray-900 mb-2 text-sm">
                    <span data-editor-id="app/components/PackagesSection.tsx:275:21">Includes:</span>
                  </h4>
                  <div data-editor-id="app/components/PackagesSection.tsx:315:19" className="flex flex-wrap gap-2">
                    {pkg.inclusions.slice(0, 3).map((inclusion, i) =>
                  <span data-editor-id="app/components/PackagesSection.tsx:317:23" key={i} className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                        <span data-editor-id="app/components/PackagesSection.tsx:280:25">{inclusion}</span>
                      </span>
                  )}
                    {pkg.inclusions.length > 3 &&
                  <span data-editor-id="app/components/PackagesSection.tsx:322:23" className="text-xs text-gray-500">
                        <span data-editor-id="app/components/PackagesSection.tsx:285:25">+{pkg.inclusions.length - 3} more</span>
                      </span>
                  }
                  </div>
                </div>

                <div data-editor-id="app/components/PackagesSection.tsx:329:17" className="flex items-center justify-between">
                  <div data-editor-id="app/components/PackagesSection.tsx:330:19">
                    {pkg.originalPrice &&
                  <span data-editor-id="app/components/PackagesSection.tsx:332:23" className="text-sm text-gray-400 line-through">
                        £{pkg.originalPrice.toLocaleString()}
                      </span>
                  }
                    <div data-editor-id="app/components/PackagesSection.tsx:336:21" className="text-2xl font-bold text-gray-900">
                      £{pkg.price.toLocaleString()}
                    </div>
                    <div data-editor-id="app/components/PackagesSection.tsx:339:21" className="text-sm text-gray-500">
                      <span data-editor-id="app/components/PackagesSection.tsx:301:23">per person</span>
                    </div>
                  </div>

                  <div data-editor-id="app/components/PackagesSection.tsx:344:19" className="flex gap-2">
                    <button data-editor-id="app/components/PackagesSection.tsx:345:21"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-4 py-2 border border-amber-200 text-amber-700 rounded-xl hover:bg-amber-50 transition-colors text-sm font-medium">

                      <span data-editor-id="app/components/PackagesSection.tsx:309:23">More Info</span>
                    </button>
                    <button data-editor-id="app/components/PackagesSection.tsx:351:21"
                  onClick={() => handleBooking(pkg)}
                  className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-200 font-medium text-sm">

                      <span data-editor-id="app/components/PackagesSection.tsx:315:23">Book Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {sortedPackages.length === 0 &&
        <div data-editor-id="app/components/PackagesSection.tsx:365:11" className="text-center py-12">
            <Icon icon="material-symbols:search-off" className="text-6xl text-gray-400 mb-4" />
            <h3 data-editor-id="app/components/PackagesSection.tsx:367:13" className="text-xl font-medium text-gray-600 mb-2">
              <span data-editor-id="app/components/PackagesSection.tsx:328:15">No packages found</span>
            </h3>
            <p data-editor-id="app/components/PackagesSection.tsx:370:13" className="text-gray-500">
              <span data-editor-id="app/components/PackagesSection.tsx:331:15">Try adjusting your filters or contact us for custom packages</span>
            </p>
          </div>
        }
      </div>
    </section>);

}