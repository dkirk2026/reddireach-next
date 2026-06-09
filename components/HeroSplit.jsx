import Fav from '@/components/Fav';
import HeroShowcase from '@/components/HeroShowcase';

export default function HeroSplit() {
  return (
    <section className="sect hero">
      <div className="hero-glow"></div>
      <div className="pad">
        <div className="hero-split">
          {/* LEFT: copy */}
          <div className="hero-copy">
            <span className="hero-badge"><Fav domain="reddit.com" />Reddit is the <b>#1 source</b> LLMs use to answer questions</span>
            <h1 className="display">Become the answer<br />AI <span className="u">recommends</span>.</h1>
            <p className="lead">ReddiReach is the leading Reddit marketing and AI search optimization agency. When someone asks ChatGPT, Perplexity or Google AI for a recommendation in your category, we make sure they mention your brand.</p>
            <div className="hero-cta">
              <a href="https://calendly.com/kirkco/chat" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a call</a>
              <a href="#how" className="btn btn-ghost">Our approach to Reddit</a>
            </div>

            <div className="engines">
              <span className="cap">Get recommended across</span>
              <div className="engine-row">
                <span className="engine"><Fav domain="reddit.com" />Reddit</span>
                <span className="engine"><Fav domain="chatgpt.com" />ChatGPT</span>
                <span className="engine"><Fav domain="perplexity.ai" />Perplexity</span>
                <span className="engine"><Fav domain="gemini.google.com" />Gemini</span>
                <span className="engine"><Fav domain="google.com" />Google</span>
              </div>
            </div>
          </div>

          {/* RIGHT: animated showcase */}
          <div className="hero-anim">
            <HeroShowcase inline />
          </div>
        </div>
      </div>
    </section>
  );
}
