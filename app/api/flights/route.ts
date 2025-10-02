import { NextResponse } from 'next/server';
import { db } from 'cosmic-database';
import { getServerSession } from 'cosmic-authentication';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const flightId = searchParams.get('id');
    
    if (flightId) {
      const doc = await db.collection('flights').doc(flightId).get();
      if (!doc.exists) {
        return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
      }
      return NextResponse.json({ id: doc.id, ...doc.data() });
    } else {
      const snapshot = await db.collection('flights')
        .where('active', '==', true)
        .get();
      
      const flights = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return NextResponse.json({ flights });
    }
  } catch (error) {
    console.error('Error fetching flights:', error);
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
    
    const flightData = {
      ...data,
      active: true,
      createdAt: db.FieldValue.serverTimestamp(),
      updatedAt: db.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('flights').add(flightData);
    
    return NextResponse.json({ 
      success: true, 
      id: docRef.id 
    });
  } catch (error) {
    console.error('Error creating flight:', error);
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
    const flightId = searchParams.get('id');
    
    if (!flightId) {
      return NextResponse.json({ error: 'Flight ID required' }, { status: 400 });
    }

    const data = await request.json();
    
    const updateData = {
      ...data,
      updatedAt: db.FieldValue.serverTimestamp()
    };
    
    await db.collection('flights').doc(flightId).update(updateData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating flight:', error);
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
    const flightId = searchParams.get('id');
    
    if (!flightId) {
      return NextResponse.json({ error: 'Flight ID required' }, { status: 400 });
    }
    
    await db.collection('flights').doc(flightId).update({
      active: false,
      updatedAt: db.FieldValue.serverTimestamp()
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting flight:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}