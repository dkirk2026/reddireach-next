// Shared content for the service pages (/services/*), so copy lives in exactly
// one place. The "Get recommended across" engine row is standardized in
// ServiceLayout, so no per-page chips here.

export const geo = {
  meta: {
    title: 'GEO & AI Search Optimization · ReddiReach',
    description: 'Get your brand cited and recommended by ChatGPT, Perplexity, Gemini and Google AI Overviews with ReddiReach Generative Engine Optimization (GEO).',
  },
  eyebrow: 'GEO · AI Search Optimization',
  badge: { domain: 'chatgpt.com', html: 'ChatGPT is used by <b>800M+ people</b> every week', href: 'https://chatgpt.com' },
  title: 'Become the brand AI recommends.',
  highlight: 'AI recommends',
  lead: 'When someone asks ChatGPT, Perplexity, Gemini or Google AI for a recommendation in your category, Generative Engine Optimization (GEO) makes sure your brand is the answer, cited by name.',
  whatTitle: "What's included",
  whatLead: 'Everything needed to turn AI search from a blind spot into a channel.',
  features: [
    { icon: 'eye', title: 'AI visibility audit', body: 'We benchmark exactly where your brand shows up today across ChatGPT, Perplexity, Gemini and Google AI, and where competitors are getting recommended instead.' },
    { icon: 'document', title: 'Answer-ready content', body: 'Content engineered the way AI reads: answer-first, well structured and genuinely citable, so models quote you instead of a competitor.' },
    { icon: 'code', title: 'Schema & structured data', body: 'Organization, FAQ and product schema so AI can parse who you are, what you offer and why you are trustworthy.' },
    { icon: 'chart', title: 'AI citation tracking', body: 'We monitor your brand mentions across every major AI engine with AI Peekaboo and report the prompts where you are gaining ground.' },
  ],
  whoTitle: 'Built for brands buyers research with AI.',
  audiences: [
    { icon: 'server', title: 'B2B SaaS and tech', body: 'Software brands whose buyers research tools by asking ChatGPT and Perplexity long before they visit a website.' },
    { icon: 'bag', title: 'Ecommerce and DTC', body: 'Consumer brands that want to be the product AI recommends when shoppers ask for the best option in a category.' },
    { icon: 'grid', title: 'Agencies and marketplaces', body: 'Multi-brand businesses that need to win AI recommendations across many categories and high-intent queries at once.' },
  ],
  howTitle: 'From invisible to recommended, in three moves.',
  steps: [
    { title: 'Map the prompts', body: 'We find the exact questions your buyers ask AI, and the sources those answers are built from.' },
    { title: 'Build the cited sources', body: 'Reddit presence, citable content and schema, the inputs AI actually pulls from when it answers.' },
    { title: 'Track and grow', body: 'We measure your share of AI answers and double down on the prompts where you are winning.' },
  ],
  midCta: {
    title: 'See where your brand stands in AI search.',
    body: 'Book a free call. We will show you the AI prompts your buyers use and exactly where you show up today.',
  },
  whyTitle: 'Why GEO matters now',
  why: [
    { k: '79%', v: 'of consumers now use AI for product research' },
    { k: '#1', v: 'Reddit is the top source AI models cite' },
    { k: '3x', v: 'higher conversion from AI referrals vs traditional search' },
  ],
  faqs: [
    { q: 'What is Generative Engine Optimization (GEO)?', a: 'GEO is the practice of optimizing your brand to be cited and recommended by AI search engines like ChatGPT, Perplexity, Gemini and Google AI Overviews. Instead of ranking a page in a list of links, the goal is to become the answer the model actually gives.' },
    { q: 'How is GEO different from traditional SEO?', a: 'SEO ranks a page in a list of links. GEO gets your brand named inside an AI-generated answer. They overlap, because AI engines pull from the same trusted sources Google ranks, especially Reddit, so the two work best together.' },
    { q: 'Which AI engines do you optimize for?', a: 'ChatGPT, Perplexity, Google Gemini, Google AI Mode and Google AI Overviews, the platforms your buyers increasingly use to research and choose products and services.' },
    { q: 'How do you track AI visibility?', a: 'We monitor your brand mentions and citations across every major AI engine with AI Peekaboo, and report the exact prompts where you are gaining ground against competitors.' },
    { q: 'How long does GEO take to work?', a: 'Most brands start seeing AI pick them up and recommend them within 3 to 6 months, as the Reddit presence, citable content and schema we build compound into trusted sources.' },
  ],
  mid: {
    title: 'Ready to become the brand AI recommends?',
    body: 'Book a free call and we will map your fastest path into ChatGPT, Perplexity, Gemini and Google AI answers.',
  },
};

export const seo = {
  meta: {
    title: 'SEO that feeds AI search · ReddiReach',
    description: 'Modern SEO from ReddiReach: technical foundations, semantic content and structured data that rank on Google and feed the AI engines built on top of it.',
  },
  eyebrow: 'SEO · Search Engine Optimization',
  badge: { domain: 'google.com', html: 'Google still powers around <b>90% of all web searches</b>', href: 'https://www.google.com' },
  title: 'Rank where buyers and AI both look.',
  highlight: 'buyers and AI',
  lead: 'Search did not disappear, it split. We build the technical and content foundations that rank on Google and feed the AI answers built on top of them.',
  whatTitle: "What's included",
  whatLead: 'Full-funnel SEO built for the age of AI search.',
  features: [
    { icon: 'gauge', title: 'Technical SEO', body: 'Crawlability, site speed, semantic HTML and Core Web Vitals, the foundations both Google and AI crawlers reward.' },
    { icon: 'document', title: 'On-page & content', body: 'Keyword and intent-mapped content with clean heading hierarchy and answer-first structure that ranks and gets cited.' },
    { icon: 'code', title: 'Structured data', body: 'Schema markup so search engines and AI models understand your pages and surface them with rich context.' },
    { icon: 'chart', title: 'Reporting tied to revenue', body: 'Google Search Console and analytics tracking focused on the rankings and traffic that actually convert, not vanity metrics.' },
  ],
  whoTitle: 'Built for brands that live on organic growth.',
  audiences: [
    { icon: 'document', title: 'Content-led brands', body: 'Companies that live and die by organic traffic and need rankings that also feed the AI answers built on top of search.' },
    { icon: 'briefcase', title: 'B2B and SaaS', body: 'Long sales cycles where ranking for high-intent queries drives pipeline, and AI Overviews increasingly shape the buyer shortlist.' },
    { icon: 'pin', title: 'Local and ecommerce', body: 'Brands that need technical health, structured data and content that turn search demand into real revenue.' },
  ],
  howTitle: 'A clear path from audit to growth.',
  steps: [
    { title: 'Audit & strategy', body: 'We find the technical issues, content gaps and keyword opportunities holding you back.' },
    { title: 'Optimize & build', body: 'We fix the foundations and publish intent-matched content designed to rank and be cited.' },
    { title: 'Measure & scale', body: 'We track rankings, traffic and AI citations, then expand what is working.' },
  ],
  midCta: {
    title: 'See where your brand stands in search.',
    body: 'Book a free call. We will show you your technical gaps, ranking opportunities and how AI-ready your site is today.',
  },
  whyTitle: 'Why SEO still wins',
  why: [
    { k: '53%', v: 'of all website traffic comes from organic search' },
    { k: '#1', v: 'organic is the highest-ROI channel for most brands' },
    { k: '3x', v: 'AI Overviews pull from pages that already rank well' },
  ],
  faqs: [
    { q: 'Is SEO still worth it with AI search?', a: 'Yes, more than ever. AI Overviews and answer engines are built on the pages that already rank, so strong technical and content SEO is the foundation of AI visibility, not a replacement for it.' },
    { q: 'What does your SEO service include?', a: 'Technical SEO, on-page and content optimization, structured data and schema, and reporting tied to revenue rather than vanity metrics.' },
    { q: 'How is your SEO different?', a: 'We optimize for Google rankings and AI citations together, so the same work that ranks you on Google also gets your brand pulled into ChatGPT, Perplexity and Google AI answers.' },
    { q: 'Do you handle both technical SEO and content?', a: 'Both. We fix crawlability, site speed, semantic HTML and schema, then publish intent-matched content built to rank and to be cited by AI.' },
    { q: 'How long until SEO shows results?', a: 'Most brands see meaningful movement in 3 to 6 months, depending on competition, site health and starting domain authority.' },
  ],
  mid: {
    title: 'Want a free SEO and AI-readiness audit?',
    body: 'Book a call and we will show you the technical wins, content gaps and quick opportunities to rank, and to get pulled into AI answers.',
  },
};

export const reddit = {
  meta: {
    title: 'Reddit Marketing · ReddiReach',
    description: 'Authentic Reddit marketing from ReddiReach: get your brand recommended in the high-intent threads your buyers and the AI models already read. No bots, no spam.',
  },
  eyebrow: 'Reddit Marketing',
  badge: { domain: 'reddit.com', html: 'Reddit is the <b>#1 source</b> AI models cite for recommendations', href: 'https://www.reddit.com' },
  title: 'Get recommended in the Reddit threads buyers trust.',
  highlight: 'Reddit threads',
  lead: 'Reddit is the number one source AI models cite, and where your buyers go for honest recommendations. We get your brand mentioned there naturally, by real community members.',
  whatTitle: "What's included",
  whatLead: 'Reddit marketing that builds trust instead of burning it.',
  features: [
    { icon: 'target', title: 'Thread & keyword mapping', body: 'We find the high-intent threads and subreddits where your buyers ask for recommendations, and where Google and AI already rank Reddit.' },
    { icon: 'users', title: 'Subreddit targeting', body: 'We prioritize the communities that move recommendations, ranked by buying intent and fit, and learn each one’s rules.' },
    { icon: 'pen', title: 'Human-written engagement', body: 'Real Reddit natives write every comment and post, positioning your brand only where it genuinely fits. No bots, no spam, ever.' },
    { icon: 'bell', title: 'Mention monitoring', body: 'We track every mention of your brand across Reddit and the AI engines and alert you to new threads worth entering.' },
  ],
  whoTitle: 'Built for brands buyers vet on Reddit.',
  audiences: [
    { icon: 'bag', title: 'DTC and ecommerce', body: 'Consumer brands whose buyers search Reddit for honest recommendations and real reviews before they purchase.' },
    { icon: 'server', title: 'SaaS and B2B', body: 'Software brands competing in the subreddits where buyers compare tools, alternatives and "is it worth it" threads.' },
    { icon: 'rocket', title: 'Challenger brands', body: 'Newer brands that need to show up in the conversations incumbents already dominate, authentically and at scale.' },
  ],
  howTitle: 'How we show up without getting torched.',
  steps: [
    { title: 'Map the conversations', body: 'We score the threads your buyers and the AI models actually read, by intent, fit and competitor presence.' },
    { title: 'Engage authentically', body: 'Native writers add genuinely helpful comments and posts, positioning your brand where it fits the conversation.' },
    { title: 'Monitor & compound', body: 'We watch sentiment, jump on new threads early, and let your presence compound into AI recommendations.' },
  ],
  midCta: {
    title: 'See where your brand stands on Reddit.',
    body: 'Book a free call. We will show you the subreddits, threads and competitors that matter, and where you are absent today.',
  },
  whyTitle: 'Why Reddit drives AI',
  why: [
    { k: '#1', v: 'Reddit is the top source AI models cite' },
    { k: '3x', v: 'higher conversion from AI referrals vs traditional search' },
    { k: '100%', v: 'authentic, human engagement, never bots' },
  ],
  faqs: [
    { q: 'Is Reddit marketing worth it?', a: 'Yes, when it is done authentically. Reddit drives both direct discovery and AI recommendations, and AI referral traffic converts roughly 3x higher than traditional search.' },
    { q: 'Do you use bots or fake accounts?', a: 'Never. Real Reddit natives write every comment and post. We respect each subreddit’s rules and moderators and only post truthful, genuinely helpful content.' },
    { q: 'How does Reddit affect AI search?', a: 'Reddit is the number one source AI models cite. When your brand is genuinely and positively discussed in the right communities, AI is far more likely to recommend it in its answers.' },
    { q: 'Which subreddits will you target?', a: 'The communities where your buyers ask for recommendations, ranked by buying intent and fit, plus the exact threads Google and AI engines already surface for your category.' },
    { q: 'How many comments do I get each month?', a: 'It depends on your plan. Our Reddit Growth plan includes 20 targeted comments per month in your niche and adjacent subreddits, with higher volume available on custom plans.' },
  ],
  mid: {
    title: 'Want to own your category on Reddit?',
    body: 'Book a free call and we will show you the subreddits, threads and competitors that matter for your brand, and where you have zero presence today.',
  },
};

export const linkBuilding = {
  meta: {
    title: 'Link Building · ReddiReach',
    description: 'Earn high-authority backlinks from the sites AI trusts. ReddiReach builds the credible link profile that turns into more citations and AI recommendations.',
  },
  eyebrow: 'Link Building',
  badge: { domain: 'reddit.com', html: 'Reddit is one of the <b>most-cited domains</b> AI and Google trust', href: 'https://www.reddit.com' },
  title: 'Earn the authority AI trusts.',
  highlight: 'authority AI trusts',
  lead: 'AI models weight domain authority and citation history when deciding what to recommend. We earn the high-authority links that make your brand a credible, citable source.',
  whatTitle: "What's included",
  whatLead: 'White-hat link building that compounds into citations.',
  features: [
    { icon: 'link', title: 'Editorial & digital PR links', body: 'Genuine placements in the publications your audience and the AI models already read and trust.' },
    { icon: 'layers', title: 'Niche-relevant placements', body: 'Links from sites in your space, where relevance and authority both count, not random directories or PBNs.' },
    { icon: 'megaphone', title: 'Brand mentions & citations', body: 'Linked and unlinked mentions that build the entity signals AI uses to understand and trust your brand.' },
    { icon: 'shield', title: 'A clean, durable profile', body: 'No spam, no shortcuts. A link profile that holds up and keeps paying off as AI search matures.' },
  ],
  whoTitle: 'Built for brands that need authority.',
  audiences: [
    { icon: 'trophy', title: 'Brands chasing authority', body: 'Companies whose domain authority lags competitors and limits both search rankings and AI citations.' },
    { icon: 'briefcase', title: 'SaaS and B2B', body: 'Software brands that need credible, relevant backlinks to compete for high-value, high-intent queries.' },
    { icon: 'store', title: 'Ecommerce', body: 'Stores that need authority and brand mentions to be trusted and recommended by both Google and AI.' },
  ],
  howTitle: 'From prospect to placement.',
  steps: [
    { title: 'Prospect & qualify', body: 'We find the high-authority, relevant sites worth earning a link from, vetted on real metrics, not vanity DR.' },
    { title: 'Outreach & earn', body: 'We pitch genuinely useful angles and earn placements through relationships, not link farms.' },
    { title: 'Track authority', body: 'We monitor referring domains, authority growth and the citations that follow.' },
  ],
  midCta: {
    title: "See where your brand's authority stands.",
    body: 'Book a free call. We will show you your link gaps versus competitors and the highest-value wins to go after first.',
  },
  whyTitle: 'Why authority matters',
  why: [
    { k: '#1', v: 'authority and citation history shape what AI recommends' },
    { k: '90%+', v: 'of top-cited brands have years of editorial coverage' },
    { k: '3x', v: 'more citations follow a credible link profile' },
  ],
  faqs: [
    { q: 'Why does link building matter for AI search?', a: 'AI models weight domain authority and citation history when deciding what to recommend. A credible, relevant link profile makes your brand a more trustworthy and citable source.' },
    { q: 'What kind of links do you build?', a: 'Editorial and digital PR links, niche-relevant placements and brand mentions. Never PBNs, link farms or spam.' },
    { q: 'How do you find link opportunities?', a: 'We prospect high-authority, relevant sites vetted on real metrics, then earn placements through genuinely useful angles and real relationships.' },
    { q: 'Are these links safe?', a: 'Yes. Everything is white-hat and durable, built to hold up and keep paying off as Google and AI ranking systems evolve.' },
    { q: 'How many links do you build per month?', a: 'It varies by scope. We prioritize quality and relevance over raw volume, and tailor the target to your goals and budget on a call.' },
  ],
  mid: {
    title: 'Want to see your link gaps vs competitors?',
    body: 'Book a free call and we will show you where competitors are earning authority, and the high-value links your brand is missing.',
  },
};
