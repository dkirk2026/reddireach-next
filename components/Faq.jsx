'use client';

import { useEffect } from 'react';

const faqs = [
  { q: 'What is GEO (Generative Engine Optimization)?', a: 'GEO is the practice of optimizing your brand to be cited and recommended by AI search engines like ChatGPT, Perplexity and Google AI. Instead of ranking a page on Google, the goal is to become the answer the model gives. Because these models lean heavily on sources like Reddit, building a real presence there is one of the most effective ways to influence what AI recommends.' },
  { q: 'How does Reddit influence AI search results?', a: 'Reddit is consistently the number one source AI models cite for recommendations. LLMs are trained on and actively pull from Reddit threads, so when your brand is genuinely and positively discussed in the right communities, AI is far more likely to recommend it in its answers.' },
  { q: 'Is marketing on Reddit worth it?', a: 'Yes, when it is done authentically. Reddit drives both direct discovery and AI recommendations, and AI referral traffic converts roughly 3x higher than traditional search. We never use bots or spam; we build genuine community presence that compounds over time.' },
  { q: 'How long does it take to see results?', a: 'Campaigns go live within the first couple of weeks. AI and search visibility build as your presence compounds, with most clients seeing meaningful movement over the first two to three months. Some have reported thousands of new visitors from AI search in their first month.' },
  { q: 'Do you use bots or fake accounts?', a: "Never. Everything we do is authentic and organic. We respect each subreddit's rules and moderators and only post truthful, genuinely helpful comments. Trust is the entire strategy, and bots destroy it." },
  { q: 'Which AI platforms does ReddiReach get my brand recommended on?', a: 'We work to get your brand cited and recommended across ChatGPT, Perplexity, Google Gemini and Google AI Overviews, the AI search engines buyers now use to research and pick products. Because all of them lean on Reddit and other trusted sources, a credible Reddit presence is the fastest route into their answers.' },
  { q: 'What is the difference between SEO and GEO?', a: 'Traditional SEO optimizes a page to rank in a list of blue links on Google. GEO (Generative Engine Optimization) optimizes your brand to be cited and recommended inside AI-generated answers. They work together: we strengthen the Reddit threads and sources that both Google ranks and AI engines pull from, so you win in classic search and AI search at once.' },
];

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
