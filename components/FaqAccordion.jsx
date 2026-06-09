'use client';

import { useRef, useEffect } from 'react';

export default function FaqAccordion({ faqs }) {
  const listRef = useRef(null);

  useEffect(() => {
    try {
      const list = listRef.current;
      if (!list) return;
      const qs = list.querySelectorAll('.faq-q');
      function handleClick(q) {
        return function () {
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
      }
      qs.forEach((q) => {
        q.addEventListener('click', handleClick(q));
      });
      return () => {
        qs.forEach((q) => {
          q.removeEventListener('click', handleClick(q));
        });
      };
    } catch (err) {
      console.error('FAQ init failed:', err);
    }
  }, [faqs]);

  return (
    <div ref={listRef}>
      {faqs.map((f, i) => (
        <div key={i} className="faq-item">
          <button className="faq-q" type="button" aria-expanded="false">
            {f.q} <span className="pm">+</span>
          </button>
          <div className="faq-a">
            <div className="inner">{f.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
