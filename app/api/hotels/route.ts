import { NextResponse } from 'next/server';
import { db } from 'cosmic-database';
import { getServerSession } from 'cosmic-authentication';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hotelId = searchParams.get('id');
    
    if (hotelId) {
      const doc = await db.collection('hotels').doc(hotelId).get();
      if (!doc.exists) {
        return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
      }
      return NextResponse.json({ id: doc.id, ...doc.data() });
    } else {
      const snapshot = await db.collection('hotels')
        .where('active', '==', true)
        .get();
      
      const hotels = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return NextResponse.json({ hotels });
    }
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getServerSession();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const hotelData = {
      ...data,
      active: true,
      createdAt: db.FieldValue.serverTimestamp(),
      updatedAt: db.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('hotels').add(hotelData);
    
    return NextResponse.json({ 
      success: true, 
      id: docRef.id 
    });
  } catch (error) {
    console.error('Error creating hotel:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getServerSession();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const hotelId = searchParams.get('id');
    
    if (!hotelId) {
      return NextResponse.json({ error: 'Hotel ID required' }, { status: 400 });
    }

    const data = await request.json();
    
    const updateData = {
      ...data,
      updatedAt: db.FieldValue.serverTimestamp()
    };
    
    await db.collection('hotels').doc(hotelId).update(updateData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating hotel:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getServerSession();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const hotelId = searchParams.get('id');
    
    if (!hotelId) {
      return NextResponse.json({ error: 'Hotel ID required' }, { status: 400 });
    }
    
    await db.collection('hotels').doc(hotelId).update({
      active: false,
      updatedAt: db.FieldValue.serverTimestamp()
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}