import { NextResponse } from 'next/server';
import { getServerSession } from 'cosmic-authentication';
import { db } from 'cosmic-database';

function normalize(email: string): string {
  return email.trim().toLowerCase();
}

export async function GET() {
  try {
    const user = await getServerSession();
    if (!user || !user.email) {
      return NextResponse.json({ isAdmin: false }, { status: 200 });
    }

    const email = normalize(user.email);
    const superEmail = process.env.SUPERUSER_EMAIL ? normalize(process.env.SUPERUSER_EMAIL) : undefined;

    if (user.role === 'admin' || (superEmail && email === superEmail)) {
      return NextResponse.json({ isAdmin: true }, { status: 200 });
    }

    // Auto-seed requested admin email once upon first check (idempotent)
    if (email === 'mrhassands@gmail.com') {
      const autoRef = db.collection('admin_emails').doc(email);
      const autoDoc = await autoRef.get();
      if (!autoDoc.exists) {
        await autoRef.set({
          email,
          createdBy: 'system:auto-seed',
          createdAt: db.FieldValue.serverTimestamp(),
          updatedAt: db.FieldValue.serverTimestamp()
        });
        return NextResponse.json({ isAdmin: true, seeded: true }, { status: 200 });
      }
    }

    const doc = await db.collection('admin_emails').doc(email).get();
    const isAdmin = doc.exists;

    return NextResponse.json({ isAdmin }, { status: 200 });
  } catch (error) {
    console.error('is-admin error:', error);
    return NextResponse.json({ isAdmin: false }, { status: 200 });
  }
}
