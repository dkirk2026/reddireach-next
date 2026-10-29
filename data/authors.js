// Author profile content for /authors/<slug>. Sourced from the team research
// of 29 Oct 2026 (public interviews, profiles and publisher pages). Claims the
// research marked "confirm first" are left out: founding dates, job titles at
// Uber and Meister, the Groundswell role, client results and the X account.
// Logos are the publishers' own marks, saved locally in public/authors/logos.

const logo = (domain) => `/authors/logos/${domain}.png`;
const REDDIREACH_LOGO = '/icon.png';

export const authors = [
  {
    slug: 'danny-kirk',
    name: 'Danny Kirk',
    role: 'Founder, Reddit and community strategy',
    otherRole: 'Founder of ReddiReach',
    photo: '/authors/danny-kirk.jpeg',
    storyTitle: 'From classical trumpet to Reddit and AI search.',
    summary:
      'Danny Kirk founded ReddiReach and leads its Reddit and community strategy, helping brands earn the community trust that AI search draws its recommendations from.',
    highlights: [
      { big: '500+', label: 'Companies across his career' },
      { big: '12+', label: 'Podcast and video interviews' },
      { big: '2023', label: 'Hosted PromptPod on AI' },
    ],
    story: [
      'When your buyers ask ChatGPT or Perplexity what to buy, the answer is often built from Reddit threads. Danny spends his working days in those threads, figuring out how a brand can take part without becoming the marketer everyone downvotes.',
      'He did not start in marketing. Danny trained as a classical trumpet player before moving into startups. In 2017 the University of Arizona named him, as founder of the 2shoes app, among the entrepreneurs helping at its McGuire Summer Academy.',
      'He went on to build Kirk & Co., an outbound cold email business, which taught him how to earn attention from people who never asked to hear from you. In 2023 he hosted PromptPod, an interview show about AI and prompt engineering, with guests such as EPAM chief learning scientist Sandra Loughlin.',
      'ReddiReach grew out of that client work. Across his career Danny has worked with more than 500 companies, and today he leads the agency’s Reddit and community strategy: which communities to join, how to respect their rules, and how genuine comments become the sources AI cites.',
      'He makes the same case on podcasts from eCommerceFuel to Found in AI: take part like a member, expect gradual results, and never fake it.',
    ],
    career: [
      { org: 'ReddiReach', role: 'Founder, Reddit and community strategy', period: 'Today', logo: REDDIREACH_LOGO, url: 'https://www.reddireach.com/about' },
      { org: 'PromptPod', role: 'Host of an AI interview show', period: '2023', logo: logo('podcasts.apple.com'), url: 'https://www.listennotes.com/podcasts/promptpod-danny-kirk-QzIdn81XSFj/' },
      { org: 'Kirk & Co.', role: 'Founder, outbound cold email', period: 'Earlier', icon: 'mail', url: 'https://www.ecommercefuel.com/writing-powerful-cold-email/' },
      { org: '2shoes app', role: 'Founder', period: '2017', logo: logo('arizona.edu'), url: 'https://eller.arizona.edu/news/2017/07/mcguire-summer-academy-2017' },
      { org: 'Classical music', role: 'Trained trumpet player', period: 'First career', icon: 'music' },
    ],
    expertise: [
      { title: 'Reddit community strategy', body: 'Choosing the subreddits that matter, learning each one’s rules, and taking part in ways members and moderators welcome.' },
      { title: 'Reddit and AI search', body: 'How Reddit threads and comments become the sources ChatGPT, Perplexity and Google AI use when recommending brands.' },
      { title: 'Outbound and growth', body: 'Years of cold email outreach taught him how to earn attention from busy buyers who never asked to hear from you.' },
    ],
    videos: [
      { provider: 'youtube', id: 'gxvvsXiyaTU', show: 'Talk Commerce', title: 'Get Your Brand Noticed in AI Search', date: '4 Aug 2026', logo: logo('talk-commerce.com') },
      { provider: 'youtube', id: 'zuOLpXLtGOA', show: 'Social Media CX', title: 'Your Customers Are Teaching AI About Your Brand', date: '1 Jul 2026', logo: logo('bsquared.media') },
      { provider: 'youtube', id: '0ZerKnrze18', show: 'My Wife Quit Her Job', title: 'The Reddit Strategy That Gets AI to Recommend Your Brand', date: '9 Jun 2026', logo: logo('mywifequitherjob.com') },
      { provider: 'youtube', id: 'SHdKL_qsvTU', show: 'Found in AI', title: 'Why Do Reddit Comments Matter More Than Posts in AI Search?', date: '15 Sep 2026', logo: logo('cassieclarkmarketing.com') },
      { provider: 'youtube', id: 'kZOexaOhZl4', show: 'Previsible', title: 'How Reddit Dominates AI Search Discovery for Brands', date: '12 Jan 2026', logo: logo('previsible.io') },
      { provider: 'youtube', id: 'kzj_NTlYQvs', show: 'Marketing Expedition', title: 'Unlocking the Power of Reddit Marketing', date: '8 Jan 2026', logo: logo('youtube.com') },
    ],
    features: [
      { kind: 'Podcast', outlet: 'eCommerceFuel', title: 'Reddit Marketing, Optimizing for LLMs and AI Content Backfiring', date: 'Episode 594', url: 'https://www.ecommercefuel.com/reddit-marketing-optimizing-for-llms-amp-ai-content-backfiring/', logo: logo('ecommercefuel.com') },
      { kind: 'Podcast', outlet: 'eCommerceFuel', title: 'The Psychology Behind Powerful Cold Emails', date: 'Episode 482', url: 'https://www.ecommercefuel.com/writing-powerful-cold-email/', logo: logo('ecommercefuel.com') },
      { kind: 'Podcast', outlet: 'Story Power', title: 'Using Reddit to Ramp Up Sales', date: '28 Jan 2026', url: 'https://storypowermarketing.show/using-reddit-to-ramp-up-sales-with-danny-kirk/', logo: logo('storypowermarketing.show') },
      { kind: 'Podcast', outlet: 'AI for Founders', title: 'Reddit SEO for AI Search', date: '28 Oct 2025', url: 'https://podcasts.apple.com/gb/podcast/reddit-seo-for-ai-search-how-to-win-chatgpt-recommendations/id1798265052?i=1000733866865', logo: logo('podcasts.apple.com') },
      { kind: 'Podcast', outlet: 'More than a Few Words', title: 'Reddit Is Having a Moment', date: '5 Oct 2025', url: 'https://morethanafewwords.com/1169-danny-kirk/', logo: logo('morethanafewwords.com') },
      { kind: 'Podcast', outlet: 'Keep Optimising', title: 'Turn Reddit into an Ecommerce Growth Channel', date: '6 May 2026', url: 'https://podnod.eu/podcast/keep-optimising/growth-turn-reddit-into-a-powerful-ecommerce-growth-channel-and-win-ai-search-with-danny-kirk-reddireach?play=1', logo: logo('keepoptimising.com') },
      { kind: 'Podcast', outlet: 'Grody & UnPrOfEsSiOnAL', title: 'Serial Entrepreneurship with Danny Kirk', date: '16 Apr 2026', url: 'https://music.amazon.ca/podcasts/eced7049-bba0-49d8-ad4b-dbe91187bd5b/episodes/a2eb09de-4997-4c5e-b885-9c36f2baf4a0/grody-unprofessional-serial-entreprenourship-w-danny-kirk', logo: logo('music.amazon.com') },
      { kind: 'Newsroom', outlet: 'EPAM', title: 'Why it’s a critical moment for workforce development', date: '28 Jun 2023', url: 'https://www.epam.com/about/newsroom/in-the-news/2023/why-its-a-critical-moment-for-workforce-development', logo: logo('epam.com') },
      { kind: 'University', outlet: 'University of Arizona', title: 'McGuire Summer Academy 2017', date: '11 Jul 2017', url: 'https://eller.arizona.edu/news/2017/07/mcguire-summer-academy-2017', logo: logo('arizona.edu') },
    ],
    profiles: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/danielpkirk/', logo: logo('linkedin.com') },
      { label: 'Media kit', url: 'https://media.kitcaster.com/danny-kirk', logo: logo('kitcaster.com') },
    ],
  },
  {
    slug: 'john-rice',
    name: 'John Rice',
    role: 'Product and engineering',
    otherRole: 'Co-founder and CTO of AI Peekaboo',
    photo: '/authors/john.jpeg',
    storyTitle: 'The engineer who measures what AI recommends.',
    summary:
      'John Rice leads product and engineering at ReddiReach and is co-founder and CTO of AI Peekaboo, the platform that measures how AI search engines mention brands.',
    highlights: [
      { big: '2014', label: 'Started building for clients' },
      { big: '2024', label: 'Launched Subreddit Signals' },
      { big: 'CTO', label: 'Co-founder of AI Peekaboo' },
    ],
    story: [
      'If you want to know whether ChatGPT recommends your brand, someone has to build the system that asks it again and again and records every answer. That is John’s work.',
      'He started by building websites for clients through his own studio, Create LA, which he ran from 2014 to 2021. In 2021 he joined MagicLinks as a developer and became a senior software engineer there in 2023.',
      'In March 2023 Built In LA interviewed him as a full-stack engineer at MagicLinks about staying sharp in a field where frameworks change constantly. “As an engineer, it’s important to continually improve my skills and knowledge,” he told them.',
      'In October 2024 he launched Subreddit Signals on Hacker News, a tool that scans Reddit daily for conversations where a product can genuinely help. He met Filipe through Reddit, and together they built AI Peekaboo, where John leads product and technology.',
      'At ReddiReach he leads product and engineering, so the team can measure where clients appear in AI answers. Away from the keyboard, by his own account, he plays pickleball and spends time with his dog, Mochi.',
    ],
    career: [
      { org: 'AI Peekaboo', role: 'Co-founder and CTO', period: 'Today', logo: logo('aipeekaboo.com'), url: 'https://www.aipeekaboo.com/about' },
      { org: 'ReddiReach', role: 'Product and engineering', period: 'Today', logo: REDDIREACH_LOGO, url: 'https://www.reddireach.com/about' },
      { org: 'Subreddit Signals', role: 'Founder and developer', period: '2024', logo: logo('subredditsignals.com'), url: 'https://news.ycombinator.com/item?id=41973541' },
      { org: 'MagicLinks', role: 'Developer, then senior software engineer', period: '2021 to 2024', logo: logo('magiclinks.com'), url: 'https://www.builtinla.com/articles/los-angeles-software-engineers-stay-ahead-tech-skills' },
      { org: 'Create LA', role: 'Owner, client web development', period: '2014 to 2021', icon: 'code', url: 'https://peerlist.io/hellocode/resume' },
    ],
    expertise: [
      { title: 'Full-stack engineering', body: 'More than a decade of shipping web products, from client websites to the creator commerce platform at MagicLinks.' },
      { title: 'Building SaaS products', body: 'Taking tools from first prototype to paying customers, including Subreddit Signals and the AI Peekaboo platform.' },
      { title: 'AI visibility measurement', body: 'Systems that ask AI engines real buyer questions at scale and record which brands and sources they cite.' },
    ],
    videos: [],
    features: [
      { kind: 'Interview', outlet: 'Built In LA', title: 'How Los Angeles software engineers stay ahead on tech skills', date: '3 Mar 2023', url: 'https://www.builtinla.com/articles/los-angeles-software-engineers-stay-ahead-tech-skills', logo: logo('builtinla.com') },
      { kind: 'Launch', outlet: 'Hacker News', title: 'Introducing Subreddit Signals', date: '28 Oct 2024', url: 'https://news.ycombinator.com/item?id=41973541', logo: logo('news.ycombinator.com') },
      { kind: 'Writing', outlet: 'Medium', title: 'Shipping in public: hi, I’m John', date: '15 Oct 2025', url: 'https://medium.com/@rice.john.nextgenai/shipping-in-public-hi-im-john-6f1b851bb2f8', logo: logo('medium.com') },
      { kind: 'Founder story', outlet: 'Canopy', title: 'How John and Filipe met on Reddit and validated AI Peekaboo', date: '24 Oct 2025', url: 'https://www.canopy.community/blog/Filipe%20Duarte%20wins%20Lisbon%E2%80%99s%20People%E2%80%99s%20Choice%20Award%20with%20Peekaboo', logo: logo('canopy.community') },
      { kind: 'Partner content', outlet: 'Forbes Portugal', title: 'Será que a IA sabe que a minha marca existe?', date: '9 Feb 2026', url: 'https://www.forbespt.com/sera-que-a-ia-sabe-que-a-minha-marca-existe/', logo: logo('forbespt.com') },
      { kind: 'Portfolio', outlet: 'Peerlist', title: 'Subreddit Signals and earlier client web projects', date: 'Ongoing', url: 'https://peerlist.io/hellocode', logo: logo('peerlist.io') },
    ],
    profiles: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/johnwilliamrice', logo: logo('linkedin.com') },
      { label: 'GitHub', url: 'https://github.com/ricejohn03', logo: logo('github.com') },
      { label: 'Peerlist', url: 'https://peerlist.io/hellocode', logo: logo('peerlist.io') },
      { label: 'Medium', url: 'https://medium.com/@rice.john.nextgenai', logo: logo('medium.com') },
    ],
  },
  {
    slug: 'filipe-lins-duarte',
    name: 'Filipe Lins Duarte',
    role: 'Go-to-market strategy and client relationships',
    otherRole: 'Co-founder and CEO of AI Peekaboo',
    photo: '/authors/filipe.jpeg',
    storyTitle: 'From software sales to AI search.',
    summary:
      'Filipe Lins Duarte leads go-to-market strategy and client relationships at ReddiReach and is co-founder and CEO of AI Peekaboo, which tracks how AI search engines talk about brands.',
    highlights: [
      { big: '2025', label: 'People’s Choice, Lisbon' },
      { big: '2023', label: 'Sold his first app' },
      { big: 'CEO', label: 'Co-founder of AI Peekaboo' },
    ],
    story: [
      'Most brands only learn what ChatGPT says about them when a prospect brings it up on a sales call. Filipe spent years on those calls selling software, so he approaches AI search from the buyer’s side: what people ask, and what convinces them.',
      'He studied in the CEMS master’s program at UCD and WU Vienna, then worked in tech sales at Uber for Business and Meister. In 2022 he built a loyalty app for small businesses on the side, and he sold it in 2023.',
      'He met John through Reddit. Before writing any code, they tested demand for AI Peekaboo: Canopy reported in October 2025 that the pair had built a 120-person waitlist in a week and pre-sold $1,500 of the product.',
      'That October he won the People’s Choice Award at Canopy’s Lisbon Demo Night, voted by fellow founders and investors. A month later the Marketer Milk newsletter linked his guide to ChatGPT’s fan-out queries, the searches ChatGPT runs behind the scenes.',
      'At ReddiReach he leads go-to-market strategy and client relationships, and he writes regularly on the AI Peekaboo blog about AI visibility, GEO and SEO.',
    ],
    career: [
      { org: 'AI Peekaboo', role: 'Co-founder and CEO', period: 'Today', logo: logo('aipeekaboo.com'), url: 'https://www.aipeekaboo.com/about' },
      { org: 'ReddiReach', role: 'Go-to-market and client relationships', period: 'Today', logo: REDDIREACH_LOGO, url: 'https://www.reddireach.com/about' },
      { org: 'Loyalty app', role: 'For small businesses, built and sold', period: '2022 to 2023', icon: 'phone', url: 'https://www.src.club/filipelinsduarte' },
      { org: 'Meister', role: 'Tech sales', period: 'Earlier', logo: logo('meister.co') },
      { org: 'Uber for Business', role: 'Tech sales', period: 'Earlier', logo: logo('uber.com') },
    ],
    expertise: [
      { title: 'Go-to-market strategy', body: 'Turning what buyers actually ask into positioning, offers and a sales motion that wins deals in a crowded market.' },
      { title: 'AI search and SEO', body: 'How ChatGPT, Perplexity and Google AI choose which brands to name, and which content earns those citations.' },
      { title: 'Customer discovery', body: 'Testing demand before building, from waitlists and presales to the questions prospects raise on real sales calls.' },
    ],
    videos: [
      { provider: 'youtube', id: 'DNK-Bq7VEHE', show: 'Canopy Demo Night Stories', title: 'From Reddit to Revenue', date: '24 Oct 2025', logo: logo('canopy.community') },
      { provider: 'youtube', id: 'qMw8JoUTxgo', show: 'Filipe on YouTube', title: 'How to know what ChatGPT is searching for with fan-out queries', date: '4 Nov 2025', logo: logo('youtube.com') },
      { provider: 'youtube', id: 'EenEOv8FIUM', show: 'Filipe on YouTube', title: 'Cold calling B2B prospects for my startup', date: '16 Oct 2025', logo: logo('youtube.com') },
    ],
    features: [
      { kind: 'Award', outlet: 'Canopy', title: 'Filipe Duarte wins Lisbon’s People’s Choice Award', date: '24 Oct 2025', url: 'https://www.canopy.community/blog/Filipe%20Duarte%20wins%20Lisbon%E2%80%99s%20People%E2%80%99s%20Choice%20Award%20with%20Peekaboo', logo: logo('canopy.community') },
      { kind: 'Newsletter', outlet: 'Marketer Milk', title: 'Turning prompts into keywords', date: '18 Nov 2025', url: 'https://www.newsletter.marketermilk.com/p/turning-prompts-into-keywords', logo: logo('marketermilk.com') },
      { kind: 'Newsletter', outlet: 'Poach.vc', title: 'Founder spotlight in the Europe edition', date: '11 Sep 2025', url: 'https://europe.poach.vc/p/hotel-job-training-startup-ai-agents', logo: logo('poach.vc') },
      { kind: 'Partner content', outlet: 'Forbes Portugal', title: 'Será que a IA sabe que a minha marca existe?', date: '9 Feb 2026', url: 'https://www.forbespt.com/sera-que-a-ia-sabe-que-a-minha-marca-existe/', logo: logo('forbespt.com') },
      { kind: 'Press release', outlet: 'EIN Presswire', title: 'Intellibright partners with AI Peekaboo on modern search marketing', date: 'Dec 2025', url: 'https://0e190a550a8c4c8c4b93-fcd009c875a5577fd4fe2f5b7e3bf4eb.ssl.cf2.rackcdn.com/EINPresswire-874956770-intellibright-partners-with-peekaboo-to-redefine-modern-search-marketing-3.pdf', logo: logo('einpresswire.com') },
      { kind: 'Writing', outlet: 'AI Peekaboo blog', title: 'Articles on AI visibility, GEO and SEO', date: 'Ongoing', url: 'https://www.aipeekaboo.com/blog', logo: logo('aipeekaboo.com') },
    ],
    profiles: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/filipelinsduarte', logo: logo('linkedin.com') },
      { label: 'YouTube', url: 'https://www.youtube.com/@filipelinsduarte', logo: logo('youtube.com') },
      { label: 'Peerlist', url: 'https://peerlist.io/filipe', logo: logo('peerlist.io') },
      { label: 'src.club', url: 'https://www.src.club/filipelinsduarte', logo: logo('src.club') },
    ],
  },
];
