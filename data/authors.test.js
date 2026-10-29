// Guards for the author profile content. These pages make claims about real
// people, so the checks catch the mistakes that are easy to ship by eye: a
// missing logo file, a non-https link, a video id that will not embed, or an
// em dash (house style bans them).
import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { authors } from './authors.js';
import { videoEmbedSrc, videoThumbnail } from '../lib/authors.js';
import { CAREER_ICONS } from '../components/CareerIcon.jsx';

const PUBLIC_DIR = join(process.cwd(), 'public');

function allStrings(value, out = []) {
  if (typeof value === 'string') {
    out.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((v) => allStrings(v, out));
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((v) => allStrings(v, out));
  }
  return out;
}

function allLinks(author) {
  const links = [];
  (author.profiles || []).forEach((p) => links.push(p.url));
  (author.features || []).forEach((f) => links.push(f.url));
  (author.career || []).forEach((c) => c.url && links.push(c.url));
  return links;
}

function allLocalImages(author) {
  const images = [author.photo];
  (author.profiles || []).forEach((p) => images.push(p.logo));
  (author.features || []).forEach((f) => images.push(f.logo));
  (author.career || []).forEach((c) => c.logo && images.push(c.logo));
  (author.videos || []).forEach((v) => images.push(v.logo));
  return images;
}

describe('authors data', () => {
  it('has the three team members with unique slugs', () => {
    expect(authors.map((a) => a.slug)).toEqual(['danny-kirk', 'john-rice', 'filipe-lins-duarte']);
  });

  for (const author of authors) {
    describe(author.name, () => {
      it('has the fields every profile page renders', () => {
        expect(author.name).toBeTruthy();
        expect(author.role).toBeTruthy();
        expect(author.summary).toBeTruthy();
        expect(author.story.length).toBeGreaterThan(0);
        expect(author.career.length).toBeGreaterThan(0);
        expect(author.expertise.length).toBeGreaterThan(0);
        expect(author.profiles.length).toBeGreaterThan(0);
      });

      it('contains no em dashes anywhere in its copy', () => {
        const withDash = allStrings(author).filter((s) => s.includes('—'));
        expect(withDash).toEqual([]);
      });

      it('links only to https URLs', () => {
        const bad = allLinks(author).filter((url) => !url.startsWith('https://'));
        expect(bad).toEqual([]);
      });

      it('only references image files that exist in public/', () => {
        const missing = allLocalImages(author).filter((src) => !existsSync(join(PUBLIC_DIR, src)));
        expect(missing).toEqual([]);
      });

      it('gives every career row a logo or a known icon, never an empty square', () => {
        const bare = author.career.filter((c) => !c.logo && !CAREER_ICONS[c.icon]).map((c) => c.org);
        expect(bare).toEqual([]);
      });

      it('fills complete rows in the three-column coverage grid', () => {
        expect(author.features.length % 3).toBe(0);
      });

      it('only lists videos that produce a valid embed URL and thumbnail', () => {
        const broken = (author.videos || []).filter((v) => videoEmbedSrc(v) === null || videoThumbnail(v) === null);
        expect(broken).toEqual([]);
      });
    });
  }
});
