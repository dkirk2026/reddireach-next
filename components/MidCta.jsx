import Fav from '@/components/Fav';

export default function MidCta() {
  return (
    <section className="sect midcta-sect">
      <div className="pad" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="midcta">
          <div className="midcta-copy">
            <span className="eyebrow">Ready when you are</span>
            <h2 className="midcta-h">See where your brand stands in AI search.</h2>
            <p className="midcta-p">Book a free 30-minute call. We will show you which subreddits and AI models matter for your niche, where competitors are already getting recommended, and how we would get your brand into those answers.</p>
            <div className="midcta-engines">
              <span className="engine"><Fav domain="chatgpt.com" />ChatGPT</span>
              <span className="engine"><Fav domain="perplexity.ai" />Perplexity</span>
              <span className="engine"><Fav domain="gemini.google.com" />Gemini</span>
              <span className="engine"><Fav domain="reddit.com" />Reddit</span>
            </div>
          </div>
          <div className="midcta-action">
            <a href="https://calendly.com/kirkco/chat" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a call</a>
            <span className="midcta-sub">Free consultation · No commitment</span>
          </div>
        </div>
      </div>
    </section>
  );
}
