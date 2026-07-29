'use client';

import { useEffect } from 'react';
import { homeFaqs as faqs } from '@/data/faqs';

export default function Faq() {
  useEffect(() => {
    const cleanups = [];
    try {
      const list = document.getElementById('faqList');
      if (!list) return;
      const qs = list.querySelectorAll('.faq-q');
      qs.forEach((q) => {
        const onClick = () => {
          const open = q.getAttribute('aria-expanded') === 'true';
          qs.forEach((other) => {
            other.setAttribute('aria-expanded', 'false');
            const a = other.parentElement && other.parentElement.querySelector('.faq-a');
            if (a) a.style.maxHeight = '';
          });
          if (!open) {
            q.setAttribute('aria-expanded', 'true');
            const ans = q.parentElement && q.parentElement.querySelector('.faq-a');
            if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
          }
        };
        q.addEventListener('click', onClick);
        cleanups.push(() => q.removeEventListener('click', onClick));
      });
    } catch (err) {
      console.error('FAQ init failed:', err);
    }
    return () => { cleanups.forEach((fn) => fn()); };
  }, []);

  return (
    <section className="sect dots" id="faq">
      <div className="pad">
        <div className="sect-head" style={{ marginBottom: '32px' }}>
          <span className="eyebrow">FAQ</span>
          <h2 className="h2">Frequently asked questions.</h2>
        </div>
        <div id="faqList">
          {faqs.map((f, idx) => (
            <div className="faq-item" key={idx}>
              <button className="faq-q" type="button" aria-expanded="false">{f.q} <span className="pm">+</span></button>
              <div className="faq-a"><div className="inner">{f.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
