// Read-only Sanity client for the ReddiReach blog. The dataset is public, so no
// token is needed. Uses fetch with Next's ISR cache: pages are statically
// cached and revalidated on an interval, and instantly via on-demand
// revalidation (see app/api/revalidate/route.js). Config comes from env vars
// with the live ReddiReach project as the default.
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vj3ex5iz';
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Revalidate cached Sanity data every 60s (ISR). On-demand revalidation makes
// new posts appear instantly; this interval is the safety net.
const REVALIDATE_SECONDS = 60;

export async function sanityFetch(query, params = {}) {
  const url = new URL(`https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}`);
  url.searchParams.set('query', query);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }
  const res = await fetch(url.toString(), {
    next: { revalidate: REVALIDATE_SECONDS, tags: ['sanity'] },
  });
  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return json.result;
}

export function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) {
    return '';
  }
}
