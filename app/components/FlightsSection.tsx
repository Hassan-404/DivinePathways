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

export default function FlightsSection() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/flights');
        const data = await response.json();
        if (response.ok) {
          setFlights(data.flights || []);
        } else {
          // Set sample flights as fallback
          setFlights([
          {
            id: '1',
            airlineName: 'British Airways',
            airlineCode: 'BA',
            route: 'London → Jeddah',
            departureCity: 'London Heathrow',
            arrivalCity: 'King Abdulaziz Intl',
            duration: '7h 30m',
            sampleTiming: '14:30 - 22:00',
            priceRange: '£450-800',
            aircraftType: 'Boeing 787',
            features: ['In-flight meals', 'Entertainment', 'WiFi'],
            active: true
          },
          {
            id: '2',
            airlineName: 'Saudi Arabian Airlines',
            airlineCode: 'SV',
            route: 'London → Jeddah',
            departureCity: 'London Heathrow',
            arrivalCity: 'King Abdulaziz Intl',
            duration: '7h 15m',
            sampleTiming: '10:45 - 18:00',
            priceRange: '£400-700',
            aircraftType: 'Airbus A330',
            features: ['Halal meals', 'Prayer times', 'Entertainment'],
            active: true
          },
          {
            id: '3',
            airlineName: 'Emirates',
            airlineCode: 'EK',
            route: 'London → Jeddah',
            departureCity: 'London Gatwick',
            arrivalCity: 'King Abdulaziz Intl',
            duration: '8h 45m',
            sampleTiming: '20:30 - 05:15+1',
            priceRange: '£500-900',
            aircraftType: 'Boeing 777',
            features: ['Premium meals', 'Entertainment', 'WiFi', 'Extra legroom'],
            active: true
          },
          {
            id: '4',
            airlineName: 'Turkish Airlines',
            airlineCode: 'TK',
            route: 'London → Jeddah',
            departureCity: 'London Heathrow',
            arrivalCity: 'King Abdulaziz Intl',
            duration: '9h 20m',
            sampleTiming: '16:15 - 01:35+1',
            priceRange: '£380-650',
            aircraftType: 'Airbus A350',
            features: ['Turkish cuisine', 'Entertainment', 'WiFi'],
            active: true
          }]
          );
        }
      } catch (error) {
        console.error('Error fetching flights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) {
    return (
      <section data-editor-id="app/components/FlightsSection.tsx:107:7" className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div data-editor-id="app/components/FlightsSection.tsx:108:9" className="max-w-7xl mx-auto px-4">
          <div data-editor-id="app/components/FlightsSection.tsx:109:11" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) =>
            <div data-editor-id="app/components/FlightsSection.tsx:111:15" key={i} className="animate-pulse">
                <div data-editor-id="app/components/FlightsSection.tsx:112:17" className="bg-gray-200 h-32 rounded-2xl mb-4"></div>
                <div data-editor-id="app/components/FlightsSection.tsx:113:17" className="bg-gray-200 h-4 w-3/4 mb-2"></div>
                <div data-editor-id="app/components/FlightsSection.tsx:114:17" className="bg-gray-200 h-4 w-1/2"></div>
              </div>
            )}
          </div>
        </div>
      </section>);

  }

  return (
    <section data-editor-id="app/components/FlightsSection.tsx:124:5" id="flights" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div data-editor-id="app/components/FlightsSection.tsx:125:7" className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <h2 data-editor-id="app/components/FlightsSection.tsx:134:11" className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            <span data-editor-id="app/components/FlightsSection.tsx:107:13">Comfortable</span>{' '}
            <span data-editor-id="app/components/FlightsSection.tsx:136:13" className="bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent font-medium">
              <span data-editor-id="app/components/FlightsSection.tsx:109:15">Flight Options</span>
            </span>
          </h2>
          <p data-editor-id="app/components/FlightsSection.tsx:140:11" className="text-xl text-gray-600 max-w-3xl mx-auto">
            <span data-editor-id="app/components/FlightsSection.tsx:113:13">Travel in comfort with our trusted airline partners. Direct flights from major UK airports to Jeddah</span>
          </p>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 mb-12 flex items-center gap-4">

          <Icon icon="material-symbols:info" className="text-3xl text-blue-600 flex-shrink-0" />
          <div data-editor-id="app/components/FlightsSection.tsx:154:11">
            <h3 data-editor-id="app/components/FlightsSection.tsx:155:13" className="font-semibold text-gray-900 mb-1">
              <span data-editor-id="app/components/FlightsSection.tsx:127:15">Live Booking Coming Soon</span>
            </h3>
            <p data-editor-id="app/components/FlightsSection.tsx:158:13" className="text-gray-600 text-sm">
              <span data-editor-id="app/components/FlightsSection.tsx:130:15">Currently showing sample flight information. Contact us for real-time availability and booking.</span>
            </p>
          </div>
        </motion.div>

        {/* Flights Grid */}
        <div data-editor-id="app/components/FlightsSection.tsx:165:9" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flights.map((flight, index) =>
          <motion.div
            key={flight.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">

              <div data-editor-id="app/components/FlightsSection.tsx:175:15" className="p-6">
                {/* Airline Header */}
                <div data-editor-id="app/components/FlightsSection.tsx:177:17" className="flex items-center justify-between mb-4">
                  <div data-editor-id="app/components/FlightsSection.tsx:178:19" className="flex items-center gap-3">
                    <div data-editor-id="app/components/FlightsSection.tsx:179:21" className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      <span data-editor-id="app/components/FlightsSection.tsx:152:23">{flight.airlineCode}</span>
                    </div>
                    <div data-editor-id="app/components/FlightsSection.tsx:182:21">
                      <h3 data-editor-id="app/components/FlightsSection.tsx:183:23" className="font-semibold text-gray-900">
                        <span data-editor-id="app/components/FlightsSection.tsx:156:25">{flight.airlineName}</span>
                      </h3>
                      <p data-editor-id="app/components/FlightsSection.tsx:186:23" className="text-sm text-gray-500">
                        <span data-editor-id="app/components/FlightsSection.tsx:159:25">{flight.aircraftType}</span>
                      </p>
                    </div>
                  </div>
                  <div data-editor-id="app/components/FlightsSection.tsx:191:19" className="text-right">
                    <div data-editor-id="app/components/FlightsSection.tsx:192:21" className="font-semibold text-lg text-gray-900">{flight.priceRange}</div>
                    <div data-editor-id="app/components/FlightsSection.tsx:193:21" className="text-xs text-gray-500">
                      <span data-editor-id="app/components/FlightsSection.tsx:166:23">per person</span>
                    </div>
                  </div>
                </div>

                {/* Route Information */}
                <div data-editor-id="app/components/FlightsSection.tsx:200:17" className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div data-editor-id="app/components/FlightsSection.tsx:201:19" className="flex items-center justify-between">
                    <div data-editor-id="app/components/FlightsSection.tsx:202:21" className="text-center">
                      <div data-editor-id="app/components/FlightsSection.tsx:203:23" className="font-semibold text-gray-900 mb-1">
                        <span data-editor-id="app/components/FlightsSection.tsx:176:25">LHR</span>
                      </div>
                      <div data-editor-id="app/components/FlightsSection.tsx:206:23" className="text-xs text-gray-500 mb-2">
                        <span data-editor-id="app/components/FlightsSection.tsx:179:25">London</span>
                      </div>
                      <div data-editor-id="app/components/FlightsSection.tsx:209:23" className="text-sm font-medium">{flight.sampleTiming.split(' - ')[0]}</div>
                    </div>
                    
                    <div data-editor-id="app/components/FlightsSection.tsx:212:21" className="flex-1 relative mx-4">
                      <div data-editor-id="app/components/FlightsSection.tsx:213:23" className="border-t-2 border-dashed border-gray-300 relative">
                        <Icon
                        icon="material-symbols:flight"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 text-amber-600 text-lg" />

                      </div>
                      <div data-editor-id="app/components/FlightsSection.tsx:219:23" className="text-center mt-1">
                        <div data-editor-id="app/components/FlightsSection.tsx:220:25" className="text-xs text-gray-500">
                          <span data-editor-id="app/components/FlightsSection.tsx:193:27">{flight.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div data-editor-id="app/components/FlightsSection.tsx:226:21" className="text-center">
                      <div data-editor-id="app/components/FlightsSection.tsx:227:23" className="font-semibold text-gray-900 mb-1">
                        <span data-editor-id="app/components/FlightsSection.tsx:200:25">JED</span>
                      </div>
                      <div data-editor-id="app/components/FlightsSection.tsx:230:23" className="text-xs text-gray-500 mb-2">
                        <span data-editor-id="app/components/FlightsSection.tsx:203:25">Jeddah</span>
                      </div>
                      <div data-editor-id="app/components/FlightsSection.tsx:233:23" className="text-sm font-medium">{flight.sampleTiming.split(' - ')[1]}</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div data-editor-id="app/components/FlightsSection.tsx:239:17" className="mb-4">
                  <h4 data-editor-id="app/components/FlightsSection.tsx:240:19" className="font-medium text-gray-900 mb-2 text-sm">
                    <span data-editor-id="app/components/FlightsSection.tsx:213:21">Included Services:</span>
                  </h4>
                  <div data-editor-id="app/components/FlightsSection.tsx:243:19" className="flex flex-wrap gap-2">
                    {flight.features.map((feature, i) =>
                  <span data-editor-id="app/components/FlightsSection.tsx:245:23" key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                        <Icon icon="material-symbols:check-circle" className="text-xs" />
                        <span data-editor-id="app/components/FlightsSection.tsx:219:25">{feature}</span>
                      </span>
                  )}
                  </div>
                </div>

                {/* Action Button */}
                <button data-editor-id="app/components/FlightsSection.tsx:254:17"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-200 font-medium">

                  <span data-editor-id="app/components/FlightsSection.tsx:229:19">Check Availability</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {flights.length === 0 &&
        <div data-editor-id="app/components/FlightsSection.tsx:266:11" className="text-center py-12">
            <Icon icon="material-symbols:flight-off" className="text-6xl text-gray-400 mb-4" />
            <h3 data-editor-id="app/components/FlightsSection.tsx:268:13" className="text-xl font-medium text-gray-600 mb-2">
              <span data-editor-id="app/components/FlightsSection.tsx:240:15">No flights available</span>
            </h3>
            <p data-editor-id="app/components/FlightsSection.tsx:271:13" className="text-gray-500">
              <span data-editor-id="app/components/FlightsSection.tsx:243:15">Please contact us for current flight options and availability</span>
            </p>
          </div>
        }

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16">

          <div data-editor-id="app/components/FlightsSection.tsx:285:11" className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-8 max-w-3xl mx-auto">
            <Icon icon="material-symbols:flight" className="text-5xl text-blue-600 mb-4" />
            <h3 data-editor-id="app/components/FlightsSection.tsx:287:13" className="text-2xl font-semibold text-gray-900 mb-4">
              <span data-editor-id="app/components/FlightsSection.tsx:258:15">Need Help Choosing?</span>
            </h3>
            <p data-editor-id="app/components/FlightsSection.tsx:290:13" className="text-gray-600 mb-6">
              <span data-editor-id="app/components/FlightsSection.tsx:261:15">Our travel experts can help you find the best flight options based on your preferences and budget</span>
            </p>
            <button data-editor-id="app/components/FlightsSection.tsx:293:13"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium">

              <span data-editor-id="app/components/FlightsSection.tsx:267:15">Speak to an Expert</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>);

}