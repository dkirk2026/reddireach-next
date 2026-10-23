import { describe, it, expect, vi } from 'vitest';
import {
  normalizeUsername,
  classifyProfileResponse,
  checkUsername,
  profileUrl,
  USER_AGENT,
} from './shadowban.js';

// Shapes of Reddit's public about.json, trimmed to the fields the checker reads.
const NORMAL_ACCOUNT = { kind: 't2', data: { name: 'spez', id: '1w72', total_karma: 900000, is_suspended: false } };
const NORMAL_ACCOUNT_NO_FLAG = { kind: 't2', data: { name: 'spez', id: '1w72', total_karma: 900000 } };
const SUSPENDED_ACCOUNT = { kind: 't2', data: { name: 'someone', is_suspended: true, total_karma: 0 } };
const NOT_FOUND_BODY = { message: 'Not Found', error: 404 };

// A stand-in for fetch that honours the same contract as the real one:
// resolves to { status, json() }, and json() rejects when the body is not JSON.
function fakeFetch(status, body) {
  return vi.fn(async () => ({
    status,
    json: async () => {
      if (body === undefined) throw new SyntaxError('Unexpected token < in JSON');
      return body;
    },
  }));
}

describe('normalizeUsername', () => {
  it('accepts a plain username unchanged', () => {
    expect(normalizeUsername('spez')).toBe('spez');
    expect(normalizeUsername('Some_User-42')).toBe('Some_User-42');
  });

  it('strips a leading u/ or /u/ prefix, in any case', () => {
    expect(normalizeUsername('u/spez')).toBe('spez');
    expect(normalizeUsername('/u/spez')).toBe('spez');
    expect(normalizeUsername('U/spez')).toBe('spez');
  });

  it('trims surrounding whitespace before and after the prefix is removed', () => {
    expect(normalizeUsername('  spez  ')).toBe('spez');
    expect(normalizeUsername('  u/spez\n')).toBe('spez');
  });

  it('accepts the 3 and 20 character boundaries', () => {
    expect(normalizeUsername('abc')).toBe('abc');
    expect(normalizeUsername('a'.repeat(20))).toBe('a'.repeat(20));
  });

  it('rejects names shorter than 3 or longer than 20 characters', () => {
    expect(normalizeUsername('ab')).toBe(null);
    expect(normalizeUsername('a'.repeat(21))).toBe(null);
    expect(normalizeUsername('u/ab')).toBe(null);
  });

  it('rejects characters Reddit does not allow', () => {
    expect(normalizeUsername('a!')).toBe(null);
    expect(normalizeUsername('spez!')).toBe(null);
    expect(normalizeUsername('two words')).toBe(null);
    expect(normalizeUsername('spez/../../api')).toBe(null);
    expect(normalizeUsername('spez?x=1')).toBe(null);
    expect(normalizeUsername('spéz')).toBe(null);
  });

  it('does not strip a prefix twice or accept a prefix alone', () => {
    expect(normalizeUsername('u/u/spez')).toBe(null);
    expect(normalizeUsername('u/')).toBe(null);
    expect(normalizeUsername('/u/')).toBe(null);
  });

  it('returns null for empty or non-string input rather than throwing', () => {
    expect(normalizeUsername('')).toBe(null);
    expect(normalizeUsername('   ')).toBe(null);
    expect(normalizeUsername(null)).toBe(null);
    expect(normalizeUsername(undefined)).toBe(null);
    expect(normalizeUsername(42)).toBe(null);
  });
});

describe('profileUrl', () => {
  it('points at the public about.json for the username', () => {
    expect(profileUrl('spez')).toBe('https://www.reddit.com/user/spez/about.json');
  });
});

describe('classifyProfileResponse', () => {
  it('200 with a normal account object is visible', () => {
    expect(classifyProfileResponse(200, NORMAL_ACCOUNT)).toBe('visible');
    expect(classifyProfileResponse(200, NORMAL_ACCOUNT_NO_FLAG)).toBe('visible');
  });

  it('200 whose account data says suspended is suspended', () => {
    expect(classifyProfileResponse(200, SUSPENDED_ACCOUNT)).toBe('suspended');
  });

  it('404 with a JSON body is not_found (Reddit shows no profile for the name)', () => {
    expect(classifyProfileResponse(404, NOT_FOUND_BODY)).toBe('not_found');
  });

  it('404 that is not a JSON answer from Reddit is unavailable, not a shadowban verdict', () => {
    expect(classifyProfileResponse(404, null)).toBe('unavailable');
  });

  it('blocked, rate-limited and server errors are unavailable', () => {
    expect(classifyProfileResponse(403, null)).toBe('unavailable');
    expect(classifyProfileResponse(429, { message: 'Too Many Requests', error: 429 })).toBe('unavailable');
    expect(classifyProfileResponse(500, null)).toBe('unavailable');
    expect(classifyProfileResponse(503, null)).toBe('unavailable');
  });

  it('200 with an unexpected body is unavailable', () => {
    expect(classifyProfileResponse(200, null)).toBe('unavailable');
    expect(classifyProfileResponse(200, {})).toBe('unavailable');
    expect(classifyProfileResponse(200, { kind: 'Listing', data: { children: [] } })).toBe('unavailable');
    expect(classifyProfileResponse(200, { kind: 't2', data: null })).toBe('unavailable');
    expect(classifyProfileResponse(200, { kind: 't2', data: { name: '' } })).toBe('unavailable');
    expect(classifyProfileResponse(200, 'text')).toBe('unavailable');
  });

  it('a redirect or any other status is unavailable', () => {
    expect(classifyProfileResponse(302, null)).toBe('unavailable');
    expect(classifyProfileResponse(0, null)).toBe('unavailable');
  });
});

describe('checkUsername', () => {
  it('rejects an invalid username without making any request', async () => {
    const fetchFn = fakeFetch(200, NORMAL_ACCOUNT);
    expect(await checkUsername('a!', fetchFn)).toEqual({ error: 'invalid_username' });
    expect(await checkUsername('', fetchFn)).toEqual({ error: 'invalid_username' });
    expect(await checkUsername(undefined, fetchFn)).toEqual({ error: 'invalid_username' });
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('makes exactly one uncached request to the profile endpoint with a descriptive User-Agent', async () => {
    const fetchFn = fakeFetch(200, NORMAL_ACCOUNT);
    await checkUsername('u/spez', fetchFn);
    expect(fetchFn).toHaveBeenCalledTimes(1);
    const [url, init] = fetchFn.mock.calls[0];
    expect(url).toBe('https://www.reddit.com/user/spez/about.json');
    expect(init.headers['User-Agent']).toBe(USER_AGENT);
    expect(USER_AGENT).toMatch(/reddireach/i);
    expect(init.cache).toBe('no-store');
    expect(init.headers.Authorization).toBeUndefined();
  });

  it('returns the normalised username with the outcome', async () => {
    expect(await checkUsername(' /u/spez ', fakeFetch(200, NORMAL_ACCOUNT))).toEqual({ username: 'spez', outcome: 'visible' });
    expect(await checkUsername('someone', fakeFetch(200, SUSPENDED_ACCOUNT))).toEqual({ username: 'someone', outcome: 'suspended' });
    expect(await checkUsername('ghost_name', fakeFetch(404, NOT_FOUND_BODY))).toEqual({ username: 'ghost_name', outcome: 'not_found' });
  });

  it('a 403 HTML block page is unavailable', async () => {
    expect(await checkUsername('spez', fakeFetch(403, undefined))).toEqual({ username: 'spez', outcome: 'unavailable' });
  });

  it('a 429 rate limit is unavailable', async () => {
    expect(await checkUsername('spez', fakeFetch(429, { error: 429 }))).toEqual({ username: 'spez', outcome: 'unavailable' });
  });

  it('a 200 that is not JSON (for example a login page) is unavailable', async () => {
    expect(await checkUsername('spez', fakeFetch(200, undefined))).toEqual({ username: 'spez', outcome: 'unavailable' });
  });

  it('a network error or timeout is unavailable and never throws', async () => {
    const fetchFn = vi.fn(async () => { throw new TypeError('fetch failed'); });
    expect(await checkUsername('spez', fetchFn)).toEqual({ username: 'spez', outcome: 'unavailable' });
  });
});
