import { describe, it, expect } from 'vitest';
import {
  SHADOWBAN_RESULTS,
  SHADOWBAN_NOTES,
  SHADOWBAN_FAQS,
  APPEAL_NOTE,
  REDDIT_APPEALS_URL,
} from './shadowban.js';

// Guards the checker copy against claims Reddit does not publish.
// Source: research/facts-2026-10-23.md (checker facts D1 to D6) in the
// reddireach wave 1 content folder. Reddit's own pages are the only evidence.

const NAME = 'example_user';
const OUTCOMES = ['visible', 'not_found', 'suspended', 'unavailable'];

function resultText(outcome) {
  const r = SHADOWBAN_RESULTS[outcome];
  return `${r.label} ${r.title(NAME)} ${r.body}`;
}

function appealText() {
  expect(APPEAL_NOTE, 'APPEAL_NOTE export').toBeTruthy();
  return `${APPEAL_NOTE.label} ${APPEAL_NOTE.before}${APPEAL_NOTE.linkText}${APPEAL_NOTE.after}`;
}

function allCopy() {
  const parts = OUTCOMES.map(resultText);
  SHADOWBAN_NOTES.forEach((n) => parts.push(`${n.label} ${n.text}`));
  SHADOWBAN_FAQS.forEach((f) => parts.push(`${f.q} ${f.a}`));
  if (APPEAL_NOTE) parts.push(appealText()); // its existence is asserted in the appeal tests
  return parts.join('\n');
}

describe('result copy covers every outcome', () => {
  it('has a label, chip, title and body for each of the four outcomes', () => {
    OUTCOMES.forEach((o) => {
      const r = SHADOWBAN_RESULTS[o];
      expect(r, o).toBeTruthy();
      expect(r.label, o).not.toBe('');
      expect(r.chip, o).toMatch(/^grade-/);
      expect(r.title(NAME), o).not.toBe('');
      expect(r.body, o).not.toBe('');
    });
    expect(Object.keys(SHADOWBAN_RESULTS).sort()).toEqual([...OUTCOMES].sort());
  });
});

describe('claims Reddit does not support never appear', () => {
  const banned = [
    // D1: Reddit publishes nothing on how the endpoint answers each case.
    [/same answer|same way/i, 'grouping of answers attributed to Reddit'],
    [/never created/i, 'never-created grouping (D1)'],
    [/deleted/i, 'how deleted accounts appear is not documented (F7, section F)'],
    [/likely cause/i, 'log-in inference not supported'],
    // D3: a visible profile does not rule out a temporary sitewide ban.
    // "is not shadowbanned" (a statement), not the reader's question "am I not shadowbanned".
    [/across the site|no site-?wide|is not shadowbanned/i, 'visible result overclaims'],
    // D4: only permanent bans show a public profile message.
    [/says so publicly|unlike a shadowban/i, 'suspensions are not always public'],
    // Reddit's wording is "spam or inauthentic activity".
    [/ban evasion/i, 'Reddit wording is spam or inauthentic activity'],
    // F7: do not quote a not-found message as what a shadowbanned account shows.
    [/page not found/i, 'not-found message attributed to shadowbans'],
    // Section F: no durations, recovery times, karma or age thresholds.
    [/\b(minute|hour|day|week)s?\b/i, 'duration or recovery time'],
    [/\d/, 'a number (duration, karma or age threshold)'],
    [/karma|account age|warming|warm-up/i, 'karma or account-age advice'],
    [/r\/shadowban/i, 'r/ShadowBan check (user community, not evidence)'],
    [/appeal test|test.*appeals page|appeals page.*test/i, 'appeals page used as a test (F8)'],
    [/rebuild trust/i, 'undocumented trust advice'],
    [/[–—]/, 'em or en dash (house style)'],
  ];

  banned.forEach(([pattern, why]) => {
    it(`does not claim: ${why}`, () => {
      expect(allCopy()).not.toMatch(pattern);
    });
  });
});

describe('each result says only what Reddit documents', () => {
  it('visible: the whole account is not hidden, but a temporary ban is not ruled out (D3)', () => {
    const text = resultText('visible');
    expect(text).toMatch(/logged-out visitors/);
    expect(text).toMatch(/whole account is not hidden/);
    expect(text).toMatch(/temporary ban/i);
  });

  it('not_found: quotes Reddit\'s own pages and claims no more (D1, D2)', () => {
    const text = resultText('not_found');
    expect(text).toMatch(/no profile/i);
    expect(text).toContain('may have been banned or the username is incorrect');
    expect(text).toContain('flagged for spam or inauthentic activity');
  });

  it('suspended: banned on its profile, inbox notice, six months to appeal (D4, D5)', () => {
    const text = resultText('suspended');
    expect(text).toMatch(/banned/i);
    expect(text).toMatch(/inbox/i);
    expect(text).toMatch(/six months/i);
  });

  it('only not_found and suspended offer the appeal route', () => {
    expect(SHADOWBAN_RESULTS.not_found.appeal).toBe(true);
    expect(SHADOWBAN_RESULTS.suspended.appeal).toBe(true);
    expect(SHADOWBAN_RESULTS.visible.appeal).toBe(false);
    expect(SHADOWBAN_RESULTS.unavailable.appeal).toBe(false);
  });
});

describe('appeal route (D5)', () => {
  it('points to Reddit\'s appeals page exactly', () => {
    expect(REDDIT_APPEALS_URL).toBe('https://www.reddit.com/appeals');
    expect(APPEAL_NOTE.linkText).toBe('reddit.com/appeals');
  });

  it('says to log in and file once, because Reddit may limit repeat appeals', () => {
    const text = appealText();
    expect(text).toMatch(/log in/i);
    expect(text).toMatch(/once/i);
    expect(text).toMatch(/limit repeat appeals/i);
  });
});

describe('what the check cannot see (D3)', () => {
  it('names community bans, AutoModerator, the spam filter, Crowd Control and single removals', () => {
    const notCovered = SHADOWBAN_NOTES.find((n) => n.label === 'Not covered');
    expect(notCovered).toBeTruthy();
    ['Community bans', 'AutoModerator', 'spam filter', 'Crowd Control', 'moderator'].forEach((term) => {
      expect(notCovered.text).toContain(term);
    });
  });
});

describe('FAQ', () => {
  it('every entry has a question and an answer for the FAQPage JSON-LD', () => {
    expect(SHADOWBAN_FAQS.length).toBeGreaterThan(0);
    SHADOWBAN_FAQS.forEach((f) => {
      expect(f.q).not.toBe('');
      expect(f.a).not.toBe('');
    });
  });
});
