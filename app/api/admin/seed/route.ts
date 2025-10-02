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

export async function POST(request: Request) {
  try {
    const auth = await requesterIsAdmin();
    if (!auth.ok || !auth.email) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const emailInput = typeof body?.email === 'string' ? body.email : '';
    if (!isValidEmail(emailInput)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const email = normalize(emailInput);

    await db.collection('admin_emails').doc(email).set({
      email,
      createdBy: auth.email,
      createdAt: db.FieldValue.serverTimestamp(),
      updatedAt: db.FieldValue.serverTimestamp()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('admin seed POST error:', error);
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
