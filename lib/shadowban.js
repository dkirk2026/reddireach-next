// Reddit shadowban check: pure logic for /tools/reddit-shadowban-checker.
//
// The check asks Reddit's public profile endpoint (about.json) what a
// logged-out visitor sees for a username, then sorts the answer into exactly
// one of four outcomes:
//
//   visible     200 with a normal account object: no site-wide shadowban
//   not_found   404: Reddit shows no profile for this name (Reddit does not
//               document how this endpoint answers for each kind of account)
//   suspended   200 whose account data says the account is suspended
//   unavailable blocked (403), rate-limited (429), server error, network
//               error, or a body that is not what Reddit normally returns
//
// Nothing here touches the network directly: checkUsername takes the fetch
// function as a parameter, so tests pass a fake and the API route passes the
// real fetch.

// Reddit usernames: 3 to 20 letters, digits, hyphens or underscores.
const USERNAME_PATTERN = /^[A-Za-z0-9_-]{3,20}$/;

// How long to wait for Reddit before giving up and reporting "unavailable".
const TIMEOUT_MS = 8000;

export const USER_AGENT =
  'web:reddireach-shadowban-checker:1.0 (+https://www.reddireach.com/tools/reddit-shadowban-checker)';

/**
 * Clean up what a visitor typed into a bare Reddit username.
 * Accepts "spez", "u/spez" or "/u/spez" (any case, surrounding spaces ok).
 *
 * @param {unknown} input
 * @returns {string|null} The username, or null if it is not a valid one.
 */
export function normalizeUsername(input) {
  if (typeof input !== 'string') return null;
  let name = input.trim();
  const lower = name.toLowerCase();
  if (lower.startsWith('/u/')) {
    name = name.slice(3);
  } else if (lower.startsWith('u/')) {
    name = name.slice(2);
  }
  if (!USERNAME_PATTERN.test(name)) return null;
  return name;
}

/**
 * @param {string} username An already-normalised username.
 * @returns {string} Reddit's public profile endpoint for that username.
 */
export function profileUrl(username) {
  return `https://www.reddit.com/user/${username}/about.json`;
}

/**
 * Sort Reddit's answer into one outcome.
 *
 * @param {number} status HTTP status Reddit returned.
 * @param {unknown} body Parsed JSON body, or null if the body was not JSON.
 * @returns {'visible'|'not_found'|'suspended'|'unavailable'}
 */
export function classifyProfileResponse(status, body) {
  const isObject = body !== null && typeof body === 'object';

  if (status === 404) {
    // Reddit's own "no such user" answer is JSON. A 404 page that is not JSON
    // did not come from the profile endpoint, so it proves nothing.
    return isObject ? 'not_found' : 'unavailable';
  }
  if (status !== 200 || !isObject || body.kind !== 't2') return 'unavailable';

  const account = body.data;
  if (account === null || typeof account !== 'object') return 'unavailable';
  if (account.is_suspended === true) return 'suspended';
  if (typeof account.name === 'string' && account.name !== '') return 'visible';
  return 'unavailable';
}

/**
 * Check one username against Reddit. Makes at most one request and never throws.
 *
 * @param {unknown} input What the visitor typed.
 * @param {Function} fetchFn A fetch-compatible function.
 * @returns {Promise<{error: string}|{username: string, outcome: string}>}
 */
export async function checkUsername(input, fetchFn) {
  const username = normalizeUsername(input);
  if (!username) return { error: 'invalid_username' };

  let status = 0;
  let body = null;
  try {
    const res = await fetchFn(profileUrl(username), {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    status = res.status;
    try {
      body = await res.json();
    } catch (parseError) {
      body = null; // HTML block page, login page, or empty body
    }
  } catch (networkError) {
    return { username, outcome: 'unavailable' };
  }

  return { username, outcome: classifyProfileResponse(status, body) };
}
