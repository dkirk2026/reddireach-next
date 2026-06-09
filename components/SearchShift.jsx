'use client';

import { useEffect } from 'react';
import Fav from '@/components/Fav';

const upvote = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;

export default function SearchShift() {
  useEffect(() => {
    function initShiftRotate() {
      try {
        const cards = document.querySelectorAll('.shift-rotate');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        cards.forEach((card) => {
          const frames = card.querySelectorAll('.rot-frame');
          if (!frames.length) return;
          card.setAttribute('data-init', '');
          let i = 0;
          frames.forEach((f, idx) => f.classList.toggle('is-active', idx === 0));
          if (reduce || frames.length < 2) return;
          setInterval(() => {
            frames[i].classList.remove('is-active');
            i = (i + 1) % frames.length;
            frames[i].classList.add('is-active');
          }, 2500);
        });
      } catch (err) {
        console.error('SearchShift rotate init failed:', err);
      }
    }
    initShiftRotate();
  }, []);

  return (
    <section className="sect dots" id="shift">
      <div className="pad">
        <div className="sect-head center" style={{ textAlign: 'center', maxWidth: '760px' }}>
          <span className="eyebrow" style={{ display: 'inline-flex' }}>How search changed</span>
          <h2 className="h2" style={{ marginTop: '18px' }}>Buying decisions no longer start with ten blue links.</h2>
          <p className="lead" style={{ marginTop: '14px' }}>In 2021, people scrolled a page of links and ads. In 2026, they ask an AI, and the answer is shaped by the sources it trusts most, with Reddit at the top.</p>
        </div>

        <div className="shift-grid">
          {/* LEFT: 2021 */}
          <div className="shift-col">
            <div className="shift-tag">2021 · Search was a list of links</div>
            <div className="macwin shift-card">
              <div className="macbar"><div className="lights"><i className="r"></i><i className="y"></i><i className="g"></i></div><div className="mactitle"><Fav domain="google.com" />google.com</div></div>
              <div className="shift-pad">
                <div className="g-search"><span className="g-q">best mattress for back pain</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9a9ba2" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg></div>
                <div className="g-ad"><span className="g-adtag">Ad</span><div><div className="g-title">Shop Mattresses, Up to 50% Off</div><div className="g-url">brandsleep.com/sale</div></div></div>
                <div className="g-ad"><span className="g-adtag">Ad</span><div><div className="g-title">#1 Rated Mattress 2021</div><div className="g-url">mattressfirm.com</div></div></div>
                <div className="g-res"><div className="g-title">10 Best Mattresses of 2021 (Buyer's Guide)</div><div className="g-url">sleepfoundation.org</div></div>
                <div className="g-res"><div className="g-title">Best Mattress for Back Pain - Reviews</div><div className="g-url">consumerreports.org</div></div>
                <div className="g-res"><div className="g-title">Top 7 Mattresses, Ranked and Tested</div><div className="g-url">healthline.com</div></div>
              </div>
            </div>
            <p className="shift-note">One channel. Ads on top, then a list of pages to read and compare yourself.</p>
          </div>

          {/* RIGHT: 2026 — rotates between AI answer, Google AI Overview, Reddit */}
          <div className="shift-col">
            <div className="shift-tag hot">2026 · Search is an answer, shaped by many sources</div>
            <div className="macwin shift-card shift-rotate" role="img" aria-label="The same recommendation for YourBrand appears across the AI answer, Google's AI Overview, and Reddit.">

              {/* Face 1: AI answer */}
              <div className="rot-frame">
                <div className="macbar"><div className="lights"><i className="r"></i><i className="y"></i><i className="g"></i></div><div className="mactitle"><Fav domain="chatgpt.com" />AI answer</div></div>
                <div className="shift-pad">
                  <div className="rot-top">
                    <div className="ai-q">"What's the best mattress for back pain?"</div>
                    <div className="ai-ans">For a too-firm bed, people consistently recommend <span className="rmention">YourBrand</span>, especially the topper as a lower-risk first step. Reddit reviewers in r/Mattress and r/backpain back this up, and it now shows up across every major AI engine. Several long-time users say the topper alone fixed their back pain.</div>
                  </div>
                  <div className="rot-bot">
                    <div className="ai-srclabel">Sources the AI pulled from</div>
                    <div className="ai-srcs">
                      <span className="ai-src"><Fav domain="reddit.com" />r/Mattress</span>
                      <span className="ai-src"><Fav domain="reddit.com" />r/backpain</span>
                      <span className="ai-src"><Fav domain="perplexity.ai" />Perplexity</span>
                      <span className="ai-src"><Fav domain="gemini.google.com" />Gemini</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Face 2: google.com AI Overview */}
              <div className="rot-frame">
                <div className="macbar"><div className="lights"><i className="r"></i><i className="y"></i><i className="g"></i></div><div className="mactitle"><Fav domain="google.com" />google.com</div></div>
                <div className="shift-pad">
                  <div className="rot-top">
                    <div className="g-search"><span className="g-q">best mattress for back pain</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9a9ba2" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg></div>
                    <div className="aio-tag"><span className="aio-spark">✦</span> AI Overview</div>
                    <div className="ai-ans">If your bed is too firm, a <span className="rmention">YourBrand</span> topper is a popular, lower-cost fix before buying a new mattress. It is widely recommended in Reddit discussions on back pain and bedding.</div>
                  </div>
                  <div className="rot-bot">
                    <div className="ai-srclabel">Sources cited in this overview</div>
                    <div className="ai-srcs">
                      <span className="ai-src"><Fav domain="reddit.com" />r/Mattress</span>
                      <span className="ai-src"><Fav domain="reddit.com" />r/backpain</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Face 3: Reddit thread */}
              <div className="rot-frame">
                <div className="macbar"><div className="lights"><i className="r"></i><i className="y"></i><i className="g"></i></div><div className="mactitle"><Fav domain="reddit.com" />r/Mattress</div></div>
                <div className="shift-pad">
                  <div className="rot-top">
                    <div className="rhead"><Fav domain="reddit.com" className="snoo" /><span className="sub">r/Mattress</span><span className="meta">· 3h ago</span></div>
                    <div className="rtitle">My mattress is way too firm, do I really need a new one?</div>
                    <div className="rbody">Had it about two years and I wake up with an aching lower back and shoulders. Replacing the whole thing feels like overkill, is there a cheaper fix before I drop a grand on a new mattress?</div>
                    <div className="ractions"><span className="a up"><span dangerouslySetInnerHTML={{ __html: upvote }} /> 318</span></div>
                  </div>
                  <div className="rot-bot">
                    <div className="rcomment">
                      <span className="ravatar" style={{ background: '#ff4500' }}>R</span>
                      <div><div className="rcuser">u/restful_reviews <span className="dot">· 1h ago</span></div><div className="rctext">Before dropping $1,500 on a new mattress, try a <span className="rmention">YourBrand</span> topper for ~$200. Softened my too-firm bed completely. Way cheaper, lower risk.</div></div>
                    </div>
                    <div className="rcomment">
                      <span className="ravatar" style={{ background: '#0a8d6c' }}>S</span>
                      <div><div className="rcuser">u/sleep_dad <span className="dot">· 40m ago</span></div><div className="rctext">Same here, the topper fixed it for me too. No need to replace the whole mattress, wish I'd tried it first.</div></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <p className="shift-note">Many channels, one answer, and Reddit is the source AI trusts most.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
