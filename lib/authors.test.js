import { describe, it, expect } from 'vitest';
import { getAuthor, authorPath, authorPathForName, videoEmbedSrc, videoThumbnail, authorPersonSchema } from './authors.js';

const authors = [
  {
    slug: 'danny-kirk',
    name: 'Danny Kirk',
    role: 'Founder',
    photo: '/authors/danny-kirk.jpeg',
    summary: 'Leads Reddit strategy.',
    expertise: [{ title: 'Reddit marketing' }, { title: 'AI search' }],
    profiles: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/danielpkirk/' },
      { label: 'Kitcaster', url: 'https://media.kitcaster.com/danny-kirk' },
    ],
  },
  { slug: 'john-rice', name: 'John Rice', role: 'Product', photo: '/authors/john.jpeg', summary: 'Builds.', expertise: [], profiles: [] },
];

describe('getAuthor', () => {
  it('finds an author by slug', () => {
    expect(getAuthor('john-rice', authors).name).toBe('John Rice');
  });

  it('returns null for an unknown or empty slug', () => {
    expect(getAuthor('nobody', authors)).toBe(null);
    expect(getAuthor('', authors)).toBe(null);
    expect(getAuthor(undefined, authors)).toBe(null);
  });
});

describe('authorPath', () => {
  it('builds the site path from the slug', () => {
    expect(authorPath(authors[0])).toBe('/authors/danny-kirk');
  });
});

describe('authorPathForName', () => {
  it('maps a blog byline name to its profile path', () => {
    expect(authorPathForName('Danny Kirk', authors)).toBe('/authors/danny-kirk');
  });

  it('ignores case and surrounding spaces from the CMS', () => {
    expect(authorPathForName('  danny kirk ', authors)).toBe('/authors/danny-kirk');
  });

  it('returns null when the byline has no profile page', () => {
    expect(authorPathForName('Guest Writer', authors)).toBe(null);
    expect(authorPathForName(null, authors)).toBe(null);
  });
});

describe('videoEmbedSrc', () => {
  it('builds a privacy-enhanced YouTube embed URL', () => {
    expect(videoEmbedSrc({ provider: 'youtube', id: 'gxvvsXiyaTU' })).toBe('https://www.youtube-nocookie.com/embed/gxvvsXiyaTU');
  });

  it('can ask the player to start straight away, for click-to-play', () => {
    expect(videoEmbedSrc({ provider: 'youtube', id: 'gxvvsXiyaTU' }, { autoplay: true })).toBe('https://www.youtube-nocookie.com/embed/gxvvsXiyaTU?autoplay=1');
  });

  it('rejects ids that are not the provider format, so nothing odd lands in an iframe src', () => {
    expect(videoEmbedSrc({ provider: 'youtube', id: 'abc' })).toBe(null);
    expect(videoEmbedSrc({ provider: 'youtube', id: 'gxvvsXiyaTU"onload' })).toBe(null);
  });

  it('returns null for an unknown provider or missing video', () => {
    expect(videoEmbedSrc({ provider: 'vimeo', id: '1159043603' })).toBe(null);
    expect(videoEmbedSrc({ provider: 'tiktok', id: '123' })).toBe(null);
    expect(videoEmbedSrc(null)).toBe(null);
  });
});

describe('videoThumbnail', () => {
  it('returns the YouTube poster image for a valid id', () => {
    expect(videoThumbnail({ provider: 'youtube', id: 'gxvvsXiyaTU' })).toBe('https://i.ytimg.com/vi/gxvvsXiyaTU/hqdefault.jpg');
  });

  it('returns null for an id that would not embed', () => {
    expect(videoThumbnail({ provider: 'youtube', id: 'bad' })).toBe(null);
    expect(videoThumbnail(null)).toBe(null);
  });
});

describe('authorPersonSchema', () => {
  const site = 'https://www.reddireach.com';
  const schema = authorPersonSchema(authors[0], site);

  it('describes the author as a Person at the canonical profile URL', () => {
    expect(schema['@type']).toBe('Person');
    expect(schema['@id']).toBe('https://www.reddireach.com/authors/danny-kirk#person');
    expect(schema.url).toBe('https://www.reddireach.com/authors/danny-kirk');
    expect(schema.name).toBe('Danny Kirk');
    expect(schema.jobTitle).toBe('Founder');
  });

  it('makes the photo absolute and lists every profile in sameAs', () => {
    expect(schema.image).toBe('https://www.reddireach.com/authors/danny-kirk.jpeg');
    expect(schema.sameAs).toEqual(['https://www.linkedin.com/in/danielpkirk/', 'https://media.kitcaster.com/danny-kirk']);
  });

  it('lists expertise titles as knowsAbout and links the site organization', () => {
    expect(schema.knowsAbout).toEqual(['Reddit marketing', 'AI search']);
    expect(schema.worksFor).toEqual({ '@id': 'https://www.reddireach.com/#organization' });
  });
});
