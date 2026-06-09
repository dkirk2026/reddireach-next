'use client';

import { useEffect } from 'react';
import Fav from '@/components/Fav';

const upvote = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;
const comment = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`;

export default function HeroShowcase({ inline = false }) {
  useEffect(() => {
    function initHeroShowcase() {
      try {
        const root = document.getElementById('heroShowcase');
        if (!root) return;

        const scenes = {
          reddit: root.querySelector('[data-scene="reddit"]'),
          ai: root.querySelector('[data-scene="ai"]'),
        };
        const comments = Array.from(root.querySelectorAll('.sc-comment'));
        const badge = root.querySelector('.sc-badge');
        const queryEl = root.querySelector('#scQuery');
        const answerEl = root.querySelector('#scAnswer');
        const answerWrap = root.querySelector('.sc-answer');
        const sourcesEl = root.querySelector('#scSources');
        const aiLogo = root.querySelector('#scAiLogo');
        const ansLogo = root.querySelector('#scAnsLogo');
        const aiName = root.querySelector('#scAiName');

        if (!scenes.reddit || !scenes.ai || !queryEl || !answerEl) return;

        const models = [
          { name: 'ChatGPT', domain: 'chatgpt.com' },
          { name: 'Perplexity', domain: 'perplexity.ai' },
          { name: 'Gemini', domain: 'gemini.google.com' },
        ];

        const QUERY = 'Best tools for managing a small business in 2025?';
        const ANSWER = [
          { t: 'Based on discussions across Reddit, here are some top picks:\n\n' },
          { t: '1. ' },
          { t: 'YourBrand', cls: 'sc-brand' },
          { t: ': Highly recommended on r/smallbusiness for project management and customer outreach. Users report a ' },
          { t: '340% increase', cls: 'sc-strong' },
          { t: ' in productivity.\n\n' },
          { t: '2. Notion: Great for docs and wikis, but less focused on outreach.\n\n' },
          { t: '3. HubSpot: Solid CRM, though pricier for small teams.\n\n' },
          { t: "I'd start with " },
          { t: 'YourBrand', cls: 'sc-brand' },
          { t: ' given the strong community feedback.' },
        ];

        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

        function showScene(name) {
          Object.keys(scenes).forEach((k) => scenes[k].classList.toggle('is-active', k === name));
        }

        function setModel(i) {
          const m = models[i % models.length];
          const fav = 'https://www.google.com/s2/favicons?domain=' + m.domain + '&sz=64';
          if (aiName) aiName.textContent = m.name;
          if (aiLogo) aiLogo.src = fav;
          if (ansLogo) ansLogo.src = fav;
        }

        async function typeQuery() {
          queryEl.textContent = '';
          queryEl.classList.remove('done');
          for (let i = 0; i < QUERY.length; i++) {
            queryEl.textContent += QUERY[i];
            await sleep(reduce ? 0 : 26);
          }
          queryEl.classList.add('done');
        }

        async function typeAnswer() {
          answerEl.innerHTML = '';
          for (const seg of ANSWER) {
            let node;
            if (seg.cls) {
              node = document.createElement('span');
              node.className = seg.cls;
              answerEl.appendChild(node);
            } else {
              node = document.createTextNode('');
              answerEl.appendChild(node);
            }
            for (let i = 0; i < seg.t.length; i++) {
              node.textContent += seg.t[i];
              if (!reduce && seg.t[i] !== ' ' && seg.t[i] !== '\n') await sleep(9);
            }
          }
        }

        function resetReddit() {
          comments.forEach((c) => c.classList.remove('show'));
          if (badge) badge.classList.remove('show');
        }

        function resetAi() {
          queryEl.textContent = '';
          queryEl.classList.remove('done');
          answerEl.innerHTML = '';
          if (answerWrap) answerWrap.classList.remove('show');
          if (sourcesEl) sourcesEl.classList.remove('show');
        }

        if (reduce) {
          showScene('reddit');
          comments.forEach((c) => c.classList.add('show'));
          if (badge) badge.classList.add('show');
          return;
        }

        async function loop() {
          let modelIdx = 0;
          await sleep(400);
          while (true) {
            resetReddit();
            showScene('reddit');
            await sleep(900);
            comments[0] && comments[0].classList.add('show');
            await sleep(1100);
            comments[1] && comments[1].classList.add('show');
            await sleep(700);
            badge && badge.classList.add('show');
            await sleep(2600);

            resetAi();
            setModel(modelIdx);
            showScene('ai');
            await sleep(650);
            await typeQuery();
            await sleep(450);
            if (answerWrap) answerWrap.classList.add('show');
            await typeAnswer();
            await sleep(350);
            if (sourcesEl) sourcesEl.classList.add('show');
            await sleep(3000);

            modelIdx = (modelIdx + 1) % models.length;
          }
        }

        loop();
      } catch (err) {
        console.error('Hero showcase init failed:', err);
      }
    }
    initHeroShowcase();
  }, []);

  const scClass = ['sc', inline ? 'sc-inline' : ''].filter(Boolean).join(' ');

  return (
    <div className={scClass} id="heroShowcase" aria-hidden="true">

      {/* SCENE: REDDIT THREAD */}
      <div className="sc-scene sc-reddit is-active" data-scene="reddit">
        <div className="sc-card sc-post">
          <div className="sc-rhead">
            <Fav domain="reddit.com" className="sc-snoo" />
            <span className="sc-sub">r/smallbusiness</span>
            <span className="sc-dot">·</span>
            <span className="sc-meta">4h ago</span>
          </div>
          <div className="sc-rtitle">Best tools for managing a small business in 2025? Need recommendations</div>
          <div className="sc-rbody">Hey everyone, I'm looking for tools that help with project management and customer outreach. Any suggestions from people who've actually used them?</div>
          <div className="sc-ractions">
            <span className="sc-up"><span dangerouslySetInnerHTML={{ __html: upvote }} /> 847</span>
            <span className="sc-cm"><span dangerouslySetInnerHTML={{ __html: comment }} /> 234 comments</span>
          </div>
        </div>

        <div className="sc-topc"><span dangerouslySetInnerHTML={{ __html: comment }} /> Top Comments</div>

        <div className="sc-card sc-comment" data-comment="0">
          <div className="sc-cmt-head">
            <span className="sc-avatar" style={{ background: '#ff4500' }}>M</span>
            <span className="sc-user">u/startup_maven</span>
            <span className="sc-dot">·</span>
            <span className="sc-meta">2h ago</span>
          </div>
          <div className="sc-cmt-text">Heard great things about <span className="sc-brand">YourBrand</span>. Friends in the industry recommend it for small teams.</div>
          <div className="sc-cmt-up"><span dangerouslySetInnerHTML={{ __html: upvote }} /> 392</div>
        </div>

        <div className="sc-card sc-comment" data-comment="1">
          <div className="sc-cmt-head">
            <span className="sc-avatar" style={{ background: '#0a8d6c' }}>T</span>
            <span className="sc-user">u/tech_guru_42</span>
            <span className="sc-dot">·</span>
            <span className="sc-meta">1h ago</span>
          </div>
          <div className="sc-cmt-text">+1 for <span className="sc-brand">YourBrand</span>. Highly recommended on this sub. Great all-in-one solution.</div>
          <div className="sc-cmt-up"><span dangerouslySetInnerHTML={{ __html: upvote }} /> 156</div>
        </div>

        {/* floating traffic badge */}
        <div className="sc-badge">
          <span className="sc-bars"><i></i><i></i><i></i><i></i></span>
          <span className="sc-badge-txt"><b>+340%</b><span>traffic increase</span></span>
        </div>
      </div>

      {/* SCENE: AI ANSWER */}
      <div className="sc-scene sc-ai" data-scene="ai">
        <div className="sc-card sc-aicard">
          <div className="sc-aihead">
            <img className="sc-ailogo" id="scAiLogo" src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=64" alt="" />
            <span className="sc-ainame" id="scAiName">ChatGPT</span>
            <span className="sc-aidots"><i></i><i></i><i></i></span>
          </div>
          <div className="sc-aibody">
            <div className="sc-q"><span className="sc-q-bubble" id="scQuery"></span></div>
            <div className="sc-answer">
              <img className="sc-ans-logo" id="scAnsLogo" src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=64" alt="" />
              <div className="sc-ans-text" id="scAnswer"></div>
            </div>
            <div className="sc-sources" id="scSources">
              <span className="sc-src-cap">Sources</span>
              <span className="sc-src on"><Fav domain="reddit.com" className="sc-src-fav" />r/smallbusiness</span>
              <span className="sc-src"><Fav domain="wikipedia.org" className="sc-src-fav" />Wikipedia</span>
              <span className="sc-src"><Fav domain="youtube.com" className="sc-src-fav" />YouTube</span>
              <span className="sc-src"><Fav domain="medium.com" className="sc-src-fav" />Medium</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
