import { NextResponse } from 'next/server';
import { getServerSession } from 'cosmic-authentication';
import { db } from 'cosmic-database';

function isValidEmail(email: string): boolean {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return re.test(email.trim());
}

function normalize(email: string): string {
  return email.trim().toLowerCase();
}

async function requesterIsAdmin(): Promise<{ ok: boolean; email?: string }> {
  const user = await getServerSession();
  if (!user || !user.email) return { ok: false };

  const email = normalize(user.email);
  const superEmail = process.env.SUPERUSER_EMAIL ? normalize(process.env.SUPERUSER_EMAIL) : undefined;

  if (user.role === 'admin' || (superEmail && email === superEmail)) {
    return { ok: true, email };
  }

  const doc = await db.collection('admin_emails').doc(email).get();
  if (doc.exists) return { ok: true, email };

  return { ok: false };
}

async function seedMockData() {
  // Image URLs sourced via approved image search tool
  const images: string[] = [
    'https://images.unsplash.com/photo-1440582096070-fa5961d9d682',
    'https://images.unsplash.com/photo-1572977082357-779e44868cb4',
    'https://images.unsplash.com/photo-1504326008149-71dbc00aa3ae',
    'https://images.unsplash.com/photo-1542422784-c1366cdcd37e',
    'https://images.unsplash.com/photo-1431352905070-2ec849b49349',
    'https://images.unsplash.com/photo-1462871287569-28d4c9a0ab7b',
    'https://images.unsplash.com/photo-1560345573-9f453083c335',
    'https://images.unsplash.com/photo-1551693015-4b4a7002c151',
    'https://images.unsplash.com/photo-1564406860401-1a35364fb9b9',
    'https://images.unsplash.com/photo-1468931267473-7986f3f90875',
    'https://images.unsplash.com/photo-1590081114484-fbc1fdfb7df8',
    'https://images.unsplash.com/photo-1561486576-189f808ca324'
  ];

  const hotels = [
    {
      id: 'hot-001',
      name: 'Sunrise Plaza',
      imageUrl: images[6],
      images: [images[6]],
      amenities: ['WiFi', 'Pool', 'Gym'],
      starRating: 5,
      distance: 1.2,
      distanceToHaram: '1.2 km from Haram',
      location: 'Mecca Area',
      priceRange: '£180-260',
      rating: 4.6,
      reviewCount: 210,
      active: true
    },
    {
      id: 'hot-002',
      name: 'Oasis Inn',
      imageUrl: images[7],
      images: [images[7]],
      amenities: ['Air conditioning', 'Restaurant'],
      starRating: 4,
      distance: 2.5,
      distanceToHaram: '2.5 km from Haram',
      location: 'Nearby Route',
      priceRange: '£120-180',
      rating: 4.2,
      reviewCount: 145,
      active: true
    },
    {
      id: 'hot-003',
      name: 'Haram View Suites',
      imageUrl: images[8],
      images: [images[8]],
      amenities: ['WiFi', 'Concierge', 'Shuttle'],
      starRating: 5,
      distance: 0.9,
      distanceToHaram: '900 m from Haram',
      location: 'Haram District',
      priceRange: '£240-320',
      rating: 4.7,
      reviewCount: 320,
      active: true
    },
    {
      id: 'hot-004',
      name: 'Desert Pearl Hotel',
      imageUrl: images[9],
      images: [images[9]],
      amenities: ['WiFi', 'Restaurant', 'Room Service'],
      starRating: 4,
      distance: 3.1,
      distanceToHaram: '3.1 km from Haram',
      location: 'Mecca Outer Ring',
      priceRange: '£90-140',
      rating: 4.1,
      reviewCount: 98,
      active: true
    },
    {
      id: 'hot-005',
      name: 'Grand Zamzam Residence',
      imageUrl: images[10],
      images: [images[10]],
      amenities: ['WiFi', 'Business Center', 'Gym'],
      starRating: 5,
      distance: 0.6,
      distanceToHaram: '600 m from Haram',
      location: 'Central Mecca',
      priceRange: '£260-380',
      rating: 4.8,
      reviewCount: 410,
      active: true
    },
    {
      id: 'hot-006',
      name: 'Oceanview Retreat',
      imageUrl: images[11],
      images: [images[11]],
      amenities: ['WiFi', 'Restaurant', 'Spa'],
      starRating: 4,
      distance: 1.8,
      distanceToHaram: '1.8 km from Haram',
      location: 'Mecca Area',
      priceRange: '£160-220',
      rating: 4.3,
      reviewCount: 175,
      active: true
    }
  ];

  const packages = [
    {
      id: 'pkg-001',
      name: 'Divine Pathways 5-Day Basic Umrah',
      duration: 5,
      price: 799,
      currency: 'GBP',
      rating: 4.2,
      reviewCount: 84,
      inclusions: ['Airport transfers','Hotel stay','Meals'],
      hotel_info: { name: 'Sunrise Plaza', distance: 1.8, star_rating: 5 },
      hotelName: 'Sunrise Plaza',
      hotelStars: 5,
      distanceToHaram: '1.8 km from Haram',
      description: 'A concise, value-focused Umrah experience with trusted support.',
      imageUrl: images[0],
      images: [images[0]],
      isPopular: false,
      active: true
    },
    {
      id: 'pkg-002',
      name: 'Divine Pathways 7-Day Deluxe',
      duration: 7,
      price: 1199,
      currency: 'GBP',
      rating: 4.6,
      reviewCount: 132,
      inclusions: ['Airport transfers','Hotel stay','Meals','Guided tours'],
      hotel_info: { name: 'Oceanview Retreat', distance: 0.9, star_rating: 5 },
      hotelName: 'Oceanview Retreat',
      hotelStars: 5,
      distanceToHaram: '900 m from Haram',
      description: 'A comfortable 7-day package with premium hotel and guided visits.',
      imageUrl: images[1],
      images: [images[1]],
      isPopular: true,
      active: true
    },
    {
      id: 'pkg-003',
      name: '10-Day Comfort Umrah',
      duration: 10,
      price: 1699,
      currency: 'GBP',
      rating: 4.5,
      reviewCount: 205,
      inclusions: ['Flights','Hotel','Transport','Breakfast'],
      hotel_info: { name: 'Haram View Suites', distance: 1.2, star_rating: 5 },
      hotelName: 'Haram View Suites',
      hotelStars: 5,
      distanceToHaram: '1.2 km from Haram',
      description: 'Balanced comfort and convenience with close access to Haram.',
      imageUrl: images[2],
      images: [images[2]],
      isPopular: false,
      active: true
    },
    {
      id: 'pkg-004',
      name: '12-Day Premium Umrah',
      duration: 12,
      price: 2499,
      currency: 'GBP',
      rating: 4.7,
      reviewCount: 310,
      inclusions: ['Flights','Luxury Hotel','Transport','Guidance','Meals'],
      hotel_info: { name: 'Grand Zamzam Residence', distance: 0.6, star_rating: 5 },
      hotelName: 'Grand Zamzam Residence',
      hotelStars: 5,
      distanceToHaram: '600 m from Haram',
      description: 'Premium 12-day experience with luxury amenities and guidance.',
      imageUrl: images[3],
      images: [images[3]],
      isPopular: true,
      active: true
    },
    {
      id: 'pkg-005',
      name: '14-Day Executive Umrah',
      duration: 14,
      price: 3299,
      currency: 'GBP',
      rating: 4.8,
      reviewCount: 412,
      inclusions: ['Flights','5★ Hotel','Private Transport','Meals','Tours'],
      hotel_info: { name: 'Sunrise Plaza', distance: 1.0, star_rating: 5 },
      hotelName: 'Sunrise Plaza',
      hotelStars: 5,
      distanceToHaram: '1.0 km from Haram',
      description: 'Executive comfort with curated services and close proximity.',
      imageUrl: images[4],
      images: [images[4]],
      isPopular: true,
      active: true
    },
    {
      id: 'pkg-006',
      name: '7-Day Budget-Friendly Umrah',
      duration: 7,
      price: 999,
      currency: 'GBP',
      rating: 4.1,
      reviewCount: 96,
      inclusions: ['Hotel','Transport','Guidance'],
      hotel_info: { name: 'Oasis Inn', distance: 2.5, star_rating: 4 },
      hotelName: 'Oasis Inn',
      hotelStars: 4,
      distanceToHaram: '2.5 km from Haram',
      description: 'An affordable package with essential services and support.',
      imageUrl: images[5],
      images: [images[5]],
      isPopular: false,
      active: true
    }
  ];

  let hotelsCreated = 0;
  for (const h of hotels) {
    const ref = db.collection('hotels').doc(h.id);
    const exists = await ref.get();
    if (!exists.exists) {
      await ref.set({
        ...h,
        createdAt: db.FieldValue.serverTimestamp(),
        updatedAt: db.FieldValue.serverTimestamp()
      });
      hotelsCreated += 1;
    }
  }

  let packagesCreated = 0;
  for (const p of packages) {
    const ref = db.collection('packages').doc(p.id);
    const exists = await ref.get();
    if (!exists.exists) {
      await ref.set({
        ...p,
        createdAt: db.FieldValue.serverTimestamp(),
        updatedAt: db.FieldValue.serverTimestamp()
      });
      packagesCreated += 1;
    }
  }

  return { hotelsCreated, packagesCreated };
}

export async function POST(request: Request) {
  try {
    const auth = await requesterIsAdmin();
    if (!auth.ok || !auth.email) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();

    // New: seed mock data for packages and hotels
    if (body && body.type === 'mock-data') {
      const result = await seedMockData();
      return NextResponse.json({ success: true, ...result });
    }

    // Fallback: maintain existing admin email allow-list seeding
    const emailInput = typeof body?.email === 'string' ? body.email : '';
    if (!isValidEmail(emailInput)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const email = normalize(emailInput);

    // Idempotent: if already exists, don't modify
    const ref = db.collection('admin_emails').doc(email);
    const exists = await ref.get();
    if (exists.exists) {
      return NextResponse.json({ success: true, alreadyAdmin: true });
    }

    await ref.set({
      email,
      createdBy: auth.email,
      createdAt: db.FieldValue.serverTimestamp(),
      updatedAt: db.FieldValue.serverTimestamp()
    });

    return NextResponse.json({ success: true, seeded: true });
  } catch (error) {
    console.error('admin seed POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const auth = await requesterIsAdmin();
    if (!auth.ok) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || '';
    if (type !== 'mock-data') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    const result = await seedMockData();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('admin seed GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await requesterIsAdmin();
    if (!auth.ok) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const emailParam = searchParams.get('email') || '';
    if (!isValidEmail(emailParam)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const email = normalize(emailParam);
    await db.collection('admin_emails').doc(email).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('admin seed DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
