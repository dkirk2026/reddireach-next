import Fav from '@/components/Fav';

const upvote = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;

export default function Approach() {
  return (
    <section className="sect" id="how">
      <div className="pad">
        <div className="sect-head" style={{ marginBottom: '18px' }}>
          <span className="eyebrow">How it works</span>
          <h2 className="h2">Research-led Reddit marketing, end to end.</h2>
          <p className="lead">We map the Reddit conversations Google ranks and AI engines cite, get your brand into them naturally, and monitor every mention, so you show up where buyers and AI are already looking.</p>
        </div>

        <div className="rsrch">

          {/* 01 Reddit content mapping */}
          <div className="rsrch-item">
            <div className="rsrch-copy">
              <div className="rnum">01</div>
              <h3>Reddit content mapping</h3>
              <p>We build a buyer keyword list across category, competitor and problem language, then pinpoint the anchor keywords where Reddit reliably ranks on page one of search. Those threads become our targets, the exact places Google ranks and AI engines cite.</p>
            </div>
            <div className="rsrch-vis">
              <div className="rsrch-card rsrch-panel">
                <div className="panel-cap">Keywords where Google ranks Reddit on page 1</div>
                <div className="serp-row"><span className="sk">best mattress topper</span><span className="sb"><Fav domain="reddit.com" />Reddit · pg 1</span></div>
                <div className="serp-row"><span className="sk">tempur-pedic alternative</span><span className="sb"><Fav domain="reddit.com" />Reddit · pg 1</span></div>
                <div className="serp-row"><span className="sk">mattress too firm</span><span className="sb"><Fav domain="reddit.com" />Reddit · pg 1</span></div>
                <div className="serp-row"><span className="sk">cooling topper</span><span className="sb"><Fav domain="reddit.com" />Reddit · pg 1</span></div>
              </div>
            </div>
          </div>

          {/* 02 Target high-value subreddits */}
          <div className="rsrch-item rev">
            <div className="rsrch-copy">
              <div className="rnum">02</div>
              <h3>Target high-value subreddits</h3>
              <p>We identify the subreddits and threads that matter most for your brand's visibility in AI training data, ranked by buying intent and fit, so every post and comment lands where it actually moves recommendations.</p>
            </div>
            <div className="rsrch-vis">
              <div className="rsrch-card rsrch-panel">
                <div className="panel-cap">Priority subreddits we will own</div>
                <div className="sub-chip"><Fav domain="reddit.com" /><span className="sn">r/Mattress</span><span className="sm">142K members</span></div>
                <div className="sub-chip"><Fav domain="reddit.com" /><span className="sn">r/backpain</span><span className="sm">76K members</span></div>
                <div className="sub-chip"><Fav domain="reddit.com" /><span className="sn">r/Bedding</span><span className="sm">99K members</span></div>
                <div className="sub-chip"><Fav domain="reddit.com" /><span className="sn">r/buyamattress</span><span className="sm">100% buying intent</span></div>
              </div>
            </div>
          </div>

          {/* 03 Thread research & scoring */}
          <div className="rsrch-item">
            <div className="rsrch-copy">
              <div className="rnum">03</div>
              <h3>Thread research &amp; scoring</h3>
              <p>We read every relevant thread, the post body plus the comments, and score it on buyer fit, post type, community mood and competitor mentions. We only engage where it genuinely moves the needle, and we map exactly where competitors show up and you do not.</p>
            </div>
            <div className="rsrch-vis">
              <div className="macwin rsrch-card">
                <div className="macbar"><div className="lights"><i className="r"></i><i className="y"></i><i className="g"></i></div><div className="mactitle"><Fav domain="reddit.com" />Thread scoring</div></div>
                <div className="rsrch-pad">
                  <div className="sc-thread-t">My mattress is way too firm, do I really need a new one?</div>
                  <div className="rsrch-pills">
                    <span className="src on">High buyer fit</span>
                    <span className="src">Question</span>
                    <span className="src">Positive mood</span>
                    <span className="src">Competitor named</span>
                  </div>
                  <div className="bar-row you"><span className="bl">Fit score</span><div className="bar-track"><div className="bar-fill you" style={{ width: '90%' }}></div></div><span className="bv">9/10</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* 04 Expert-led engagement */}
          <div className="rsrch-item rev">
            <div className="rsrch-copy">
              <div className="rnum">04</div>
              <h3>Expert-led engagement</h3>
              <p>Our team writes every comment and post, positioning your brand naturally where it actually fits the conversation. No bots, no spam, ever. Trust is the entire strategy, and it is what both Reddit and the AI models reward.</p>
            </div>
            <div className="rsrch-vis">
              <div className="rcard rsrch-card">
                <div className="rhead"><Fav domain="reddit.com" className="snoo" /><span className="sub">r/Mattress</span><span className="meta">· 3h ago</span></div>
                <div className="rtitle">My mattress is way too firm, do I really need a new one?</div>
                <div className="ractions">
                  <span className="a up"><span dangerouslySetInnerHTML={{ __html: upvote }} /> 318</span>
                </div>
                <div className="rcomment">
                  <span className="ravatar" style={{ background: '#ff4500' }}>R</span>
                  <div><div className="rcuser">u/restful_reviews <span className="dot">· 1h ago</span></div><div className="rctext">Before buying a new mattress, worth looking at a <span className="rmention">YourBrand</span> topper first. Lower cost option and gets a lot of mentions in this sub.</div></div>
                </div>
              </div>
              <p style={{ fontSize: '11px', opacity: 0.45, marginTop: '8px', textAlign: 'right' }}>Illustrative example</p>
            </div>
          </div>

          {/* 05 Brand-mention monitoring */}
          <div className="rsrch-item">
            <div className="rsrch-copy">
              <div className="rnum">05</div>
              <h3>Brand-mention monitoring</h3>
              <p>We track every mention of your brand across Reddit and the AI engines, monitor sentiment in real time, and alert you to new threads worth entering before the narrative sets.</p>
            </div>
            <div className="rsrch-vis">
              <div className="rsrch-card rsrch-panel">
                <div className="panel-cap">Live brand-mention monitor</div>
                <div className="mon-row"><Fav domain="reddit.com" /><span className="mtxt"><b>r/Mattress</b> &nbsp;YourBrand recommended for a too-firm bed</span><span className="mon-dot pos"></span></div>
                <div className="mon-row"><Fav domain="chatgpt.com" /><span className="mtxt"><b>ChatGPT</b> &nbsp;cited YourBrand as a top pick</span><span className="mon-dot pos"></span></div>
                <div className="mon-row"><Fav domain="reddit.com" /><span className="mtxt"><b>r/backpain</b> &nbsp;"has anyone tried YourBrand?"</span><span className="mon-dot neu"></span></div>
                <div className="mon-row"><Fav domain="perplexity.ai" /><span className="mtxt"><b>Perplexity</b> &nbsp;lists YourBrand among picks</span><span className="mon-dot pos"></span></div>
              </div>
            </div>
          </div>

          {/* 06 AI citation tracking */}
          <div className="rsrch-item rev">
            <div className="rsrch-copy">
              <div className="rnum">06</div>
              <h3>AI citation tracking</h3>
              <p>We monitor where your brand starts showing up across ChatGPT, Perplexity, Gemini and Google AI Overviews, and report the anchor keywords where you are gaining ground, so you can see Reddit work translating directly into AI recommendations.</p>
            </div>
            <div className="rsrch-vis">
              <div className="macwin rsrch-card">
                <div className="macbar"><div className="lights"><i className="r"></i><i className="y"></i><i className="g"></i></div><div className="mactitle"><Fav domain="aipeekaboo.com" />We use Peekaboo</div></div>
                <div className="rsrch-pad">
                  <div className="panel-cap">Where YourBrand is getting cited</div>
                  <div className="bar-row you"><span className="bl"><Fav domain="chatgpt.com" />ChatGPT</span><div className="bar-track"><div className="bar-fill you" style={{ width: '72%' }}></div></div><span className="bv">72%</span></div>
                  <div className="bar-row"><span className="bl"><Fav domain="perplexity.ai" />Perplexity</span><div className="bar-track"><div className="bar-fill" style={{ width: '58%' }}></div></div><span className="bv">58%</span></div>
                  <div className="bar-row"><span className="bl"><Fav domain="gemini.google.com" />Gemini</span><div className="bar-track"><div className="bar-fill" style={{ width: '41%' }}></div></div><span className="bv">41%</span></div>
                  <div className="bar-row"><span className="bl"><Fav domain="google.com" />Google AI</span><div className="bar-track"><div className="bar-fill" style={{ width: '34%' }}></div></div><span className="bv">34%</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
