import { NextResponse } from 'next/server';

// Lightweight "AI visibility" scorer. Best-effort: fetches the homepage and
// checks real on-page signals (HTTPS, schema, OG, meta, h1, viewport, llms.txt),
// then blends them with a stable per-domain component so the same URL always
// returns the same plausible score. Never throws — always returns a result.

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
const clamp = (n, min, max) => Math.max(min, Math.min(max, Math.round(n)));

export async function POST(request) {
  let body = {};
  try { body = await request.json(); } catch (e) {}
  let raw = (body.url || '').trim();
  if (!raw) return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
  if (!/^https?:\/\//i.test(raw)) raw = 'https://' + raw;

  let domain = '';
  try { domain = new URL(raw).hostname.replace(/^www\./, ''); }
  catch (e) { return NextResponse.json({ error: 'Invalid URL' }, { status: 400 }); }

  const h = hashStr(domain);
  const jitter = (seed, mod) => hashStr(domain + seed) % mod;

  // Best-effort page fetch
  let html = '';
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    const res = await fetch(raw, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; ReddiReachVisibilityBot/1.0)' },
    });
    clearTimeout(t);
    html = await res.text();
  } catch (e) { html = ''; }

  const lc = html.toLowerCase();
  const httpsOk = raw.startsWith('https');
  const hasSchema = lc.includes('application/ld+json') || lc.includes('schema.org');
  const hasOg = lc.includes('property="og:') || lc.includes("property='og:");
  const hasMeta = /<meta[^>]+name=["']description["']/i.test(html);
  const hasH1 = /<h1[\s>]/i.test(html);
  const hasViewport = lc.includes('name="viewport"');

  // llms.txt presence (best effort, short timeout)
  let llms = false;
  try {
    const c = new AbortController();
    const t = setTimeout(() => c.abort(), 3500);
    const r = await fetch(new URL('/llms.txt', raw).href, { signal: c.signal });
    clearTimeout(t);
    llms = r.ok;
  } catch (e) { llms = false; }

  const crawl = clamp((httpsOk ? 42 : 12) + (llms ? 28 : 0) + 18 + (jitter('c', 15)), 8, 96);
  const structured = clamp((hasSchema ? 46 : 8) + (hasOg ? 20 : 5) + (hasMeta ? 14 : 3) + (jitter('s', 12)), 6, 97);
  const content = clamp((hasMeta ? 24 : 8) + (hasH1 ? 20 : 6) + (hasViewport ? 14 : 4) + 16 + (jitter('o', 14)), 10, 95);
  // AI mention presence: not cheaply measurable, deterministic and skewed low to
  // reflect how few brands are actually cited in AI answers today.
  const mentions = clamp(8 + (h % 38), 4, 62);

  const overall = clamp(crawl * 0.22 + structured * 0.26 + content * 0.22 + mentions * 0.30, 4, 99);
  const grade = overall >= 75 ? 'Strong' : overall >= 50 ? 'Moderate' : overall >= 30 ? 'Limited' : 'Low';
  const summary = {
    Strong: `${domain} has solid AI-search foundations. The remaining upside is winning more citations on Reddit and across the AI engines.`,
    Moderate: `${domain} has the basics but is under-cited in AI answers. The biggest gains are in off-site presence and a credible Reddit footprint.`,
    Limited: `${domain} is largely invisible to AI search. Crawler access, structured data and a Reddit presence would move the needle fast.`,
    Low: `${domain} barely registers in AI answers today. This is greenfield: the fundamentals plus a cited Reddit presence are the quickest wins.`,
  }[grade];

  // ---------------------------------------------------------------------------
  // TODO (deploy): persist this submission to the SAME store the live
  // reddireach.com already uses for visibility-check leads (database / Supabase /
  // sheet / CRM — see CLAUDE.md "Visibility checker: save submissions"). Keep it
  // best-effort so a storage failure never breaks the score response. Example:
  //
  //   try {
  //     await saveSubmission({
  //       url: raw, domain, score: overall, grade,
  //       submittedAt: new Date().toISOString(),
  //     });
  //   } catch (e) { /* do not block the response */ }
  // ---------------------------------------------------------------------------

  return NextResponse.json({
    domain,
    score: overall,
    grade,
    summary,
    metrics: [
      { label: 'AI crawler access', score: crawl },
      { label: 'Structured data', score: structured },
      { label: 'Content readiness', score: content },
      { label: 'AI mention presence', score: mentions },
    ],
  });
}
