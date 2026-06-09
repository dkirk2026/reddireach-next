'use client';

import { useEffect } from 'react';

export default function Nav() {
  useEffect(() => {
    function initNavDropdown() {
      try {
        const dd = document.getElementById('svcDd');
        if (!dd) return;
        const btn = dd.querySelector('.nav-dd-btn');
        if (!btn) return;
        function close() {
          dd.removeAttribute('data-open');
          btn.setAttribute('aria-expanded', 'false');
        }
        function open() {
          dd.setAttribute('data-open', '');
          btn.setAttribute('aria-expanded', 'true');
        }
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (dd.hasAttribute('data-open')) close(); else open();
        });
        document.addEventListener('click', (e) => { if (!dd.contains(e.target)) close(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
      } catch (err) {
        console.error('Nav dropdown init failed:', err);
      }
    }
    initNavDropdown();
  }, []);

  return (
    <nav className="nav">
      <div className="nav-in">
        <a href="/"><img className="nav-logo" src="/logo.webp" alt="ReddiReach" /></a>
        <div className="nav-links">
          <div className="nav-dd" id="svcDd">
            <button className="nav-dd-btn" type="button" aria-haspopup="true" aria-expanded="false">
              Services
              <svg className="nav-dd-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            <div className="nav-dd-menu" role="menu">
              <a role="menuitem" href="/services/geo"><strong>GEO / AI Search</strong><span>Get recommended by ChatGPT, Perplexity and Google AI</span></a>
              <a role="menuitem" href="/services/seo"><strong>SEO</strong><span>Rank on Google and feed AI search</span></a>
              <a role="menuitem" href="/services/reddit"><strong>Reddit Marketing</strong><span>Get recommended in high-intent threads</span></a>
              <a role="menuitem" href="/services/link-building"><strong>Link Building</strong><span>Earn the authority AI trusts</span></a>
            </div>
          </div>
          <a href="/checklist">GEO Checklist</a>
          <a href="/pricing">Pricing</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
        </div>
        <div className="nav-cta">
          <a href="https://calendly.com/kirkco/chat" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Book a call</a>
        </div>
      </div>
    </nav>
  );
}
