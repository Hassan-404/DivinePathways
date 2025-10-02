import { NextResponse } from 'next/server';
import { db } from 'cosmic-database';
import { getServerSession } from 'cosmic-authentication';

export async function GET() {
  try {
    const doc = await db.collection('settings').doc('contact-info').get();
    
    if (!doc.exists) {
      // Return default contact info if none exists
      const defaultInfo = {
        phone: '+44 20 1234 5678',
        whatsapp: '+44 7700 900123',
        email: 'info@divinepathways.co.uk',
        address: 'London, UK',
        socialLinks: {
          facebook: '',
          instagram: '',
          twitter: ''
        }
      };
      return NextResponse.json(defaultInfo);
    }
    
    return NextResponse.json(doc.data());
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getServerSession();
    if (!user || !(user.role === 'admin' || user.email === process.env.SUPERUSER_EMAIL)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const updateData = {
      ...data,
      updatedAt: db.FieldValue.serverTimestamp()
    };
    
    await db.collection('settings').doc('contact-info').set(updateData, { merge: true });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating contact info:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}