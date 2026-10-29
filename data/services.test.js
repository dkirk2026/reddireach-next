// Guards for the service page copy: keyword-first titles with no brand suffix
// (hard rule for keyword pages), and no stat the agency cannot source.
import { describe, it, expect } from 'vitest';
import { geo, seo, reddit, linkBuilding, advertising } from './services.js';

const pages = { geo, seo, reddit, linkBuilding, advertising };

const EXPECTED_TITLES = {
  geo: 'GEO Agency: Get Recommended by ChatGPT and AI Search',
  seo: 'SEO Agency: Rank on Google and Get Cited by AI',
  reddit: 'Reddit Marketing Services',
  linkBuilding: 'Link Building Agency: Editorial Links AI and Google Trust',
  advertising: 'Reddit Ads Agency: Campaign Setup, Creative and Tracking',
};

// Figures the review found with no source behind them.
const UNSOURCED = ['#1', '3x', '79%', '90%+', '100M+', '340%', 'leading'];

function allText(page) {
  return JSON.stringify(page);
}

describe('service page titles', () => {
  for (const [key, page] of Object.entries(pages)) {
    it(`${key} uses the approved keyword-first title`, () => {
      expect(page.meta.title).toBe(EXPECTED_TITLES[key]);
    });

    it(`${key} has no brand suffix in the title`, () => {
      expect(page.meta.title).not.toContain('ReddiReach');
      expect(page.meta.title).not.toContain('·');
    });

    it(`${key} keeps the title within 60 characters`, () => {
      expect(page.meta.title.length).toBeLessThanOrEqual(60);
    });
  }
});

describe('service page claims', () => {
  for (const [key, page] of Object.entries(pages)) {
    it(`${key} contains no unsourced stat`, () => {
      const text = allText(page);
      const found = UNSOURCED.filter((token) => text.includes(token));
      expect(found).toEqual([]);
    });
  }
});
