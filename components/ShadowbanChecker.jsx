'use client';

import { useState } from 'react';
import { normalizeUsername } from '@/lib/shadowban';
import {
  SHADOWBAN_RESULTS as RESULTS,
  SHADOWBAN_NOTES,
  SHADOWBAN_GUIDE_URL,
  APPEAL_NOTE,
  REDDIT_APPEALS_URL,
} from '@/data/shadowban';

// The interactive box on /tools/reddit-shadowban-checker. Validation and the
// Reddit call live in lib/shadowban.js and app/api/shadowban; this file only
// renders the form and the one result. All copy lives in data/shadowban.js.

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
              {SHADOWBAN_NOTES.map((note) => (
                <div className="sb-note" key={note.label}>
                  <dt>{note.label}</dt>
                  <dd>{note.text}</dd>
                </div>
              ))}
              {copy.appeal && (
                <div className="sb-note">
                  <dt>{APPEAL_NOTE.label}</dt>
                  <dd>
                    {APPEAL_NOTE.before}
                    <a href={REDDIT_APPEALS_URL} target="_blank" rel="noopener noreferrer">{APPEAL_NOTE.linkText}</a>
                    {APPEAL_NOTE.after}
                  </dd>
                </div>
              )}
            </dl>
            <a className="sb-guide" href={SHADOWBAN_GUIDE_URL}>Read the fixes in our shadowban guide</a>
          </div>
        )}
      </div>
    </div>
  );
}
