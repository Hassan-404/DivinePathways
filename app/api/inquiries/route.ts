import { NextResponse } from 'next/server';
import { db } from 'cosmic-database';
import { getServerSession } from 'cosmic-authentication';

export async function GET(request: Request) {
  try {
    const user = await getServerSession();
    if (!user || !(user.role === 'admin' || user.email === process.env.SUPERUSER_EMAIL)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const inquiryId = searchParams.get('id');
    const status = searchParams.get('status');
    
    if (inquiryId) {
      const doc = await db.collection('inquiries').doc(inquiryId).get();
      if (!doc.exists) {
        return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
      }
      return NextResponse.json({ id: doc.id, ...doc.data() });
    } else {
      let query = db.collection('inquiries').orderBy('createdAt', 'desc');
      
      if (status) {
        query = query.where('status', '==', status);
      }
      
      const snapshot = await query.get();
      
      const inquiries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return NextResponse.json({ inquiries });
    }
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const inquiryData = {
      ...data,
      status: 'pending',
      createdAt: db.FieldValue.serverTimestamp(),
      updatedAt: db.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('inquiries').add(inquiryData);
    
    return NextResponse.json({ 
      success: true, 
      id: docRef.id 
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getServerSession();
    if (!user || !(user.role === 'admin' || user.email === process.env.SUPERUSER_EMAIL)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const inquiryId = searchParams.get('id');
    
    if (!inquiryId) {
      return NextResponse.json({ error: 'Inquiry ID required' }, { status: 400 });
    }

    const data = await request.json();
    
    const updateData = {
      ...data,
      updatedAt: db.FieldValue.serverTimestamp()
    };
    
    await db.collection('inquiries').doc(inquiryId).update(updateData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}