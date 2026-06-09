import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

// On-demand revalidation endpoint for instant blog publishing.
// Point a Sanity webhook at: https://www.reddireach.com/api/revalidate?secret=YOUR_SECRET
// (trigger on create/update/delete of `post`). Publishing a post then refreshes
// the blog within seconds, with no full rebuild.
export async function POST(request) {
  const secret = new URL(request.url).searchParams.get('secret');
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (expected && secret !== expected) {
    return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 });
  }
  revalidateTag('sanity');
  revalidatePath('/blog');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
