'use client';

import { useEffect } from 'react';
import { s2, B, sections, totalSteps } from '@/data/checklist';

export default function GeoChecklist() {
  useEffect(() => {
    function initGeoChecklist() {
      try {
        const root = document.getElementById('geoChecklist');
        if (!root) return;
        const rows = root.querySelectorAll('.ck-item');
        const bar = document.getElementById('ckBar');
        const countEl = document.getElementById('ckCount');
        const finish = document.getElementById('ckFinish');
        const total = rows.length;
        const KEY = 'geo-checklist-v1';

        let state = {};
        try { state = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { state = {}; }

        function persist() {
          try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
        }
        function update() {
          let done = 0;
          rows.forEach((r) => { if (r.classList.contains('done')) done++; });
          if (countEl) countEl.textContent = String(done);
          if (bar) bar.style.width = (total ? (done / total) * 100 : 0) + '%';
          if (finish) finish.style.display = (total > 0 && done === total) ? '' : 'none';
        }

        rows.forEach((r) => {
          const id = r.getAttribute('data-ck');
          if (id && state[id]) r.classList.add('done');
          r.setAttribute('aria-checked', r.classList.contains('done') ? 'true' : 'false');

          function toggle() {
            r.classList.toggle('done');
            const on = r.classList.contains('done');
            r.setAttribute('aria-checked', on ? 'true' : 'false');
            if (id) { state[id] = on; persist(); }
            update();
          }
          r.addEventListener('click', toggle);
          r.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
          });
        });

        function fallbackCopy(text) {
          try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          } catch (e) { /* clipboard unavailable */ }
        }
        function flash(btn) {
          if (!btn) return;
          const old = btn.getAttribute('data-label') || btn.textContent;
          btn.setAttribute('data-label', old);
          btn.classList.add('copied');
          btn.textContent = 'Copied';
          setTimeout(() => { btn.classList.remove('copied'); btn.textContent = old; }, 1600);
        }
        function copyText(text, btn) {
          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(text).then(() => flash(btn)).catch(() => { fallbackCopy(text); flash(btn); });
            } else { fallbackCopy(text); flash(btn); }
          } catch (e) { fallbackCopy(text); flash(btn); }
        }
        function sectionText(sect) {
          const titleEl = sect.querySelector('.ck-sect-title');
          const texts = sect.querySelectorAll('.ck-text');
          let out = (titleEl ? titleEl.textContent.trim() : '') + '\n';
          texts.forEach((t) => { out += '- ' + t.textContent.trim() + '\n'; });
          return out.trim();
        }

        root.querySelectorAll('.ck-copy').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const sect = btn.closest('.ck-sect');
            if (sect) copyText(sectionText(sect), btn);
          });
        });

        const copyAll = document.getElementById('ckCopyAll');
        if (copyAll) {
          copyAll.addEventListener('click', () => {
            let out = 'GEO Checklist — ' + total + ' steps to get recommended by AI search\n\n';
            root.querySelectorAll('.ck-sect').forEach((sect) => { out += sectionText(sect) + '\n\n'; });
            copyText(out.trim(), copyAll);
          });
        }

        update();
      } catch (err) {
        console.error('GEO checklist init failed:', err);
      }
    }
    initGeoChecklist();
  }, []);

  return (
    <section className="sect dots" id="checklist">
      <div className="pad">
        <div className="ck-progress">
          <div className="ck-prog-top">
            <span className="ck-prog-label">Your GEO progress</span>
            <div className="ck-prog-right">
              <span className="ck-prog-count"><span id="ckCount">0</span> / {totalSteps} complete</span>
              <button type="button" className="ck-copy-all" id="ckCopyAll">Copy all {totalSteps} steps</button>
            </div>
          </div>
          <div className="ck-prog-track"><div className="ck-prog-fill" id="ckBar"></div></div>
          <div className="ck-finish" id="ckFinish" style={{ display: 'none' }}>
            <span>All {totalSteps} done. Nice work. Want us to handle the heavy lifting and the ongoing Reddit and AI work?</span>
            <a href="https://calendly.com/kirkco/chat" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Book a call</a>
          </div>
        </div>

        <div id="geoChecklist" className="ck-sections">
          {sections.map((s, si) => (
            <div key={s.key} className="ck-sect">
              <div className="ck-sect-head">
                <span className={`ck-num ck-c${si % 6}`}>{s.n}</span>
                <div>
                  <h2 className="ck-sect-title">{s.title}</h2>
                  <p className="ck-sect-blurb">{s.blurb}</p>
                </div>
                <div className="ck-sect-actions">
                  <span className="ck-sect-meta">{s.items.length} steps</span>
                  <button type="button" className="ck-copy">Copy steps</button>
                </div>
              </div>
              <div className="ck-list">
                {s.items.map((it, i) => (
                  <div
                    key={i}
                    className="ck-item"
                    data-ck={`${s.key}-${i}`}
                    role="checkbox"
                    aria-checked="false"
                    tabIndex={0}
                  >
                    <span className="ck-box" aria-hidden="true"></span>
                    <span className="ck-text">{it.text}</span>
                    {it.brands && (
                      <span className="ck-favs">
                        {it.brands.map((b) => (
                          <img
                            key={b.name}
                            className="ck-fav"
                            src={b.icon ?? s2(b.domain)}
                            alt={b.name}
                            title={b.name}
                            loading="lazy"
                          />
                        ))}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
