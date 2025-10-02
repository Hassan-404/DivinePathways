import { NextResponse } from 'next/server';
import { db } from 'cosmic-database';
import { getServerSession } from 'cosmic-authentication';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const packageId = searchParams.get('id');
    
    if (packageId) {
      const doc = await db.collection('packages').doc(packageId).get();
      if (!doc.exists) {
        return NextResponse.json({ error: 'Package not found' }, { status: 404 });
      }
      return NextResponse.json({ id: doc.id, ...doc.data() });
    } else {
      const snapshot = await db.collection('packages')
        .where('active', '==', true)
        .get();
      
      const packages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return NextResponse.json({ packages });
    }
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getServerSession();
    if (!user || !(user.role === 'admin' || user.email === process.env.SUPERUSER_EMAIL)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const packageData = {
      ...data,
      active: true,
      createdAt: db.FieldValue.serverTimestamp(),
      updatedAt: db.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('packages').add(packageData);
    
    return NextResponse.json({ 
      success: true, 
      id: docRef.id 
    });
  } catch (error) {
    console.error('Error creating package:', error);
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
    const packageId = searchParams.get('id');
    
    if (!packageId) {
      return NextResponse.json({ error: 'Package ID required' }, { status: 400 });
    }

    const data = await request.json();
    
    const updateData = {
      ...data,
      updatedAt: db.FieldValue.serverTimestamp()
    };
    
    await db.collection('packages').doc(packageId).update(updateData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating package:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getServerSession();
    if (!user || !(user.role === 'admin' || user.email === process.env.SUPERUSER_EMAIL)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const packageId = searchParams.get('id');
    
    if (!packageId) {
      return NextResponse.json({ error: 'Package ID required' }, { status: 400 });
    }
    
    await db.collection('packages').doc(packageId).update({
      active: false,
      updatedAt: db.FieldValue.serverTimestamp()
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}