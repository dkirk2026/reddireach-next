'use client';

import { useEffect, useRef, useState } from 'react';

// "Check your AI visibility" tool, modeled on the live reddireach.com flow:
// enter a URL, watch a short scan animation, then see a real visibility score
// (from /api/visibility) with a breakdown, and either grab the checklist or
// book a call. No more jumping straight to the calendar.
const STEPS = [
  'Checking AI crawler access',
  'Scanning structured data',
  'Measuring content readiness',
  'Estimating AI mentions',
  'Scoring AI visibility',
];

export default function HeroChecker() {
  const [phase, setPhase] = useState('idle'); // idle | scanning | done | error
  const [url, setUrl] = useState('');
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [shown, setShown] = useState(0);
  const stepTimer = useRef(null);

  async function onSubmit(e) {
    e.preventDefault();
    const value = url.trim();
    if (!value) return;
    setPhase('scanning');
    setStep(0);
    setResult(null);
    setShown(0);

    let s = 0;
    stepTimer.current = setInterval(() => { s = (s + 1) % STEPS.length; setStep(s); }, 620);

    const minDelay = new Promise((r) => setTimeout(r, 2300));
    try {
      const [res] = await Promise.all([
        fetch('/api/visibility', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: value }),
        }).then((r) => r.json()),
        minDelay,
      ]);
      if (stepTimer.current) clearInterval(stepTimer.current);
      if (res && typeof res.score === 'number') { setResult(res); setPhase('done'); }
      else setPhase('error');
    } catch (err) {
      if (stepTimer.current) clearInterval(stepTimer.current);
      setPhase('error');
    }
  }

  // Animated count-up of the score
  useEffect(() => {
    if (phase !== 'done' || !result) return;
    let raf;
    const target = result.score;
    const start = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    const dur = 950;
    const tick = (t) => {
      const now = (typeof performance !== 'undefined' ? t : Date.now());
      const p = Math.min(1, (now - start) / dur);
      const eased = 0.5 - Math.cos(Math.PI * p) / 2;
      setShown(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, result]);

  useEffect(() => () => { if (stepTimer.current) clearInterval(stepTimer.current); }, []);

  function reset() { setPhase('idle'); setResult(null); setStep(0); setShown(0); }

  return (
    <div className="checker">
      <div className="checker-head">
        <span className="checker-pulse" aria-hidden="true"></span>
        Check your AI visibility
      </div>

      {phase === 'idle' && (
        <>
          <form className="checker-form" onSubmit={onSubmit}>
            <input
              className="checker-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your website URL"
              aria-label="Your website URL"
            />
            <button className="btn btn-primary checker-btn" type="submit">Check</button>
          </form>
          <p className="checker-hint">Free instant score across Reddit, ChatGPT, Perplexity and Google AI.</p>
        </>
      )}

      {phase === 'scanning' && (
        <div className="checker-scanning">
          <div className="checker-scanbar"><div className="checker-scanfill"></div></div>
          <div className="checker-step">{STEPS[step]}…</div>
        </div>
      )}

      {phase === 'done' && result && (
        <div className="checker-result">
          <div className="checker-score-row">
            <div className="checker-score">
              <span className="checker-score-num">{shown}</span>
              <span className="checker-score-den">/100</span>
            </div>
            <div className="checker-verdict">
              <span className={`checker-grade grade-${result.grade.toLowerCase()}`}>{result.grade}</span>
              <span className="checker-domain">{result.domain}</span>
            </div>
          </div>
          <p className="checker-summary">{result.summary}</p>
          <div className="checker-bars">
            {result.metrics.map((m, i) => (
              <div key={i} className="checker-bar-row">
                <span className="checker-bar-label">{m.label}</span>
                <div className="checker-bar-track"><div className="checker-bar-fill" style={{ width: `${m.score}%` }}></div></div>
                <span className="checker-bar-val">{m.score}</span>
              </div>
            ))}
          </div>
          <div className="checker-ctarow">
            <a href="/checklist" className="btn btn-primary">Get the free checklist</a>
            <a href="https://calendly.com/kirkco/chat" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Book a call</a>
          </div>
          <button type="button" className="checker-reset" onClick={reset}>Check another site</button>
        </div>
      )}

      {phase === 'error' && (
        <div className="checker-result">
          <p className="checker-summary">We could not analyze that URL. Check the address and try again.</p>
          <button type="button" className="checker-reset" onClick={reset}>Try again</button>
        </div>
      )}
    </div>
  );
}
