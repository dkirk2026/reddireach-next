'use client';

import { useState } from 'react';
import { normalizeUsername } from '@/lib/shadowban';

// The interactive box on /tools/reddit-shadowban-checker. Validation and the
// Reddit call live in lib/shadowban.js and app/api/shadowban; this file only
// renders the form and the one result.

const GUIDE_URL = '/blog/shadowbanned-on-reddit-2026-fixes-and-safe-posting-system';

// One entry per outcome returned by /api/shadowban. The chip classes reuse the
// grade colours from the homepage visibility checker.
const RESULTS = {
  visible: {
    label: 'Visible',
    chip: 'grade-strong',
    title: (name) => `u/${name} is visible to everyone.`,
    body: 'Reddit shows this profile to logged-out visitors, so the account is not shadowbanned across the site.',
  },
  not_found: {
    label: 'Not found',
    chip: 'grade-low',
    title: (name) => `Reddit says u/${name} does not exist.`,
    body: 'Reddit gives this same answer when an account is shadowbanned, deleted or was never created. If you can still log in to it, a shadowban is the likely cause.',
  },
  suspended: {
    label: 'Suspended',
    chip: 'grade-low',
    title: (name) => `u/${name} is suspended.`,
    body: 'Reddit has suspended this account and, unlike a shadowban, says so publicly. If it is your account, log in to read the notice Reddit shows you.',
  },
  unavailable: {
    label: 'No answer',
    chip: 'grade-moderate',
    title: () => 'Reddit did not answer this check.',
    body: 'Reddit blocked or rate-limited the request, so there is no result yet. Try again in a minute, or use the check by hand below.',
  },
};

function isKnownOutcome(outcome) {
  return typeof outcome === 'string' && Object.prototype.hasOwnProperty.call(RESULTS, outcome);
}

// Ask our API route. Anything other than a known outcome counts as "unavailable".
async function fetchOutcome(username) {
  try {
    const res = await fetch('/api/shadowban', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    if (data && isKnownOutcome(data.outcome)) return data.outcome;
  } catch (err) {
    // Network failure or a non-JSON reply: fall through to "unavailable".
  }
  return 'unavailable';
}

export default function ShadowbanChecker() {
  const [value, setValue] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null); // { username, outcome, id }

  async function onSubmit(e) {
    e.preventDefault();
    if (checking) return;
    const username = normalizeUsername(value);
    setResult(null);
    if (!username) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    setChecking(true);
    const outcome = await fetchOutcome(username);
    setResult({ username, outcome, id: Date.now() });
    setChecking(false);
  }

  const copy = result ? RESULTS[result.outcome] : null;

  return (
    <div className="checker sb-checker">
      <div className="checker-head">
        <span className="checker-pulse" aria-hidden="true"></span>
        Check a Reddit username
      </div>

      <form className="checker-form" onSubmit={onSubmit} noValidate>
        <input
          className="checker-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Your username, e.g. u/spez"
          aria-label="Reddit username"
          aria-invalid={invalid ? 'true' : 'false'}
          aria-describedby={invalid ? 'sb-error' : undefined}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
        />
        <button className="btn btn-primary checker-btn" type="submit" disabled={checking}>
          {checking ? 'Checking…' : 'Check'}
        </button>
      </form>

      {invalid ? (
        <p className="sb-error" id="sb-error" role="alert">
          Enter a Reddit username: 3 to 20 letters, numbers, hyphens or underscores.
        </p>
      ) : (
        <p className="checker-hint">Free, no sign-in, usernames never stored.</p>
      )}

      <div className="sb-live" aria-live="polite">
        {checking && (
          <div className="checker-scanning sb-scanning">
            <div className="checker-scanbar"><div className="checker-scanfill"></div></div>
            <div className="checker-step">Asking Reddit about this profile…</div>
          </div>
        )}

        {copy && (
          <div className="sb-result" key={result.id}>
            <span className={`checker-grade ${copy.chip}`}>{copy.label}</span>
            <h2 className="sb-title">{copy.title(result.username)}</h2>
            <p className="sb-body">{copy.body}</p>
            <dl className="sb-notes">
              <div className="sb-note">
                <dt>Not covered</dt>
                <dd>Subreddit bans, and single posts removed by AutoModerator or the spam filter.</dd>
              </div>
              <div className="sb-note">
                <dt>Check by hand</dt>
                <dd>Open your profile and a recent post in a private browser window.</dd>
              </div>
            </dl>
            <a className="sb-guide" href={GUIDE_URL}>Read the fixes in our shadowban guide</a>
          </div>
        )}
      </div>
    </div>
  );
}
