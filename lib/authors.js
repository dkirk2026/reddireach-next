// Pure helpers for the author profile pages (/authors/<slug>). The author list
// is passed in, so these work the same on the real data and in tests.

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export function getAuthor(slug, authors) {
  if (!slug) return null;
  const found = authors.find((a) => a.slug === slug);
  return found || null;
}

export function authorPath(author) {
  return `/authors/${author.slug}`;
}

// Blog bylines come from Sanity as a plain name, so match on the name.
export function authorPathForName(name, authors) {
  if (typeof name !== 'string') return null;
  const wanted = name.trim().toLowerCase();
  const found = authors.find((a) => a.name.toLowerCase() === wanted);
  if (!found) return null;
  return authorPath(found);
}

// Only YouTube is supported: the one Vimeo interview found refuses to play
// off its own site (401), so it is listed as a link instead.
function isValidVideo(video) {
  return Boolean(video) && video.provider === 'youtube' && YOUTUBE_ID.test(video.id);
}

/**
 * The iframe src for a { provider, id } video, or null when the id does not
 * match YouTube's format. `autoplay` is for click-to-play, where the click
 * already expressed the intent to watch.
 */
export function videoEmbedSrc(video, options = {}) {
  if (!isValidVideo(video)) return null;
  const src = `https://www.youtube-nocookie.com/embed/${video.id}`;
  if (options.autoplay) return `${src}?autoplay=1`;
  return src;
}

export function videoThumbnail(video) {
  if (!isValidVideo(video)) return null;
  return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
}

export function authorPersonSchema(author, site) {
  const url = `${site}${authorPath(author)}`;
  return {
    '@type': 'Person',
    '@id': `${url}#person`,
    name: author.name,
    jobTitle: author.role,
    description: author.summary,
    url,
    image: `${site}${author.photo}`,
    sameAs: author.profiles.map((p) => p.url),
    knowsAbout: author.expertise.map((e) => e.title),
    worksFor: { '@id': `${site}/#organization` },
  };
}
