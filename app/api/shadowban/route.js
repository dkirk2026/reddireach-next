import { NextResponse } from 'next/server';
import { checkUsername } from '@/lib/shadowban';

// POST /api/shadowban  { "username": "spez" }  ->  { "username": "spez", "outcome": "visible" }
//
// Thin shell around lib/shadowban.js: one uncached request to Reddit's public
// profile endpoint per check, no credentials, nothing stored.
export async function POST(request) {
  let payload = null;
  try {
    payload = await request.json();
  } catch (e) {
    payload = null;
  }
  const input = payload && typeof payload === 'object' ? payload.username : undefined;

  const result = await checkUsername(input, fetch);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
}
