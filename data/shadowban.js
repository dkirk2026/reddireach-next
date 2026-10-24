// Copy for /tools/reddit-shadowban-checker: the result panel and the FAQ.
// Kept here, not in the component, so data/shadowban.test.js can check every
// claim about Reddit against what Reddit itself publishes (research facts
// D1 to D6, 2026-10-23). Reddit publishes nothing about how the profile
// endpoint answers for each kind of account, so the copy never says it does.

export const SHADOWBAN_GUIDE_URL = '/blog/shadowbanned-on-reddit-2026-fixes-and-safe-posting-system';
export const REDDIT_APPEALS_URL = 'https://www.reddit.com/appeals';

// One entry per outcome returned by /api/shadowban. The chip classes reuse the
// grade colours from the homepage visibility checker. `appeal` adds the appeal
// row under the result.
export const SHADOWBAN_RESULTS = {
  visible: {
    label: 'Visible',
    chip: 'grade-strong',
    title: (name) => `u/${name} has a public profile.`,
    body: 'Reddit shows this profile to logged-out visitors, so the whole account is not hidden. A temporary ban leaves a profile unchanged, so check your Reddit inbox for a ban notice.',
    appeal: false,
  },
  not_found: {
    label: 'Not found',
    chip: 'grade-low',
    title: (name) => `Reddit shows no profile for u/${name}.`,
    body: 'Check the spelling first. Reddit\'s page for a missing profile says the account "may have been banned or the username is incorrect", and Reddit says a hidden profile can mean an account was "flagged for spam or inauthentic activity".',
    appeal: true,
  },
  suspended: {
    label: 'Suspended',
    chip: 'grade-low',
    title: (name) => `Reddit shows u/${name} as banned.`,
    body: 'Reddit has banned this account and shows it on the profile. If it is yours, the notice in your Reddit inbox gives the reason, and an appeal must be filed within six months of that notice.',
    appeal: true,
  },
  unavailable: {
    label: 'No answer',
    chip: 'grade-moderate',
    title: () => 'Reddit did not answer this check.',
    body: 'Reddit blocked or limited the request, or could not be reached, so there is no result. Try again later, or use the check by hand below.',
    appeal: false,
  },
};

// Rows shown under every result.
export const SHADOWBAN_NOTES = [
  { label: 'Not covered', text: 'Community bans, Crowd Control, and posts removed by AutoModerator, the spam filter or a moderator.' },
  { label: 'Check by hand', text: 'Open your profile and a recent post in a private browser window.' },
];

// The appeal row for not_found and suspended: before + link + after.
export const APPEAL_NOTE = {
  label: 'Appeal',
  before: 'Log in to the account, then file once at ',
  linkText: 'reddit.com/appeals',
  after: '. Reddit may limit repeat appeals.',
};

// Single source for the visible FAQ and its FAQPage JSON-LD.
export const SHADOWBAN_FAQS = [
  {
    q: 'What is a Reddit shadowban?',
    a: 'You keep posting, but other people see nothing. Reddit\'s Reddiquette page describes it as "you can see your posts and votes, but no one else can". Reddit\'s help center says that when your posts, comments and profile page are not showing up as expected, your account might have been "flagged for spam or inauthentic activity".',
  },
  {
    q: 'How does this checker work?',
    a: 'This is a manual checking guide. Copy your profile link, open it in a private browser window while logged out, check a recent post by direct link, then read your Reddit inbox for notices. It does not fetch an account status or collect your username. A missing profile alone does not prove a shadowban, and a temporary ban can leave a profile unchanged.',
  },
  {
    q: 'Can my posts be hidden even if I am not shadowbanned?',
    a: 'Yes. A community can ban you, and AutoModerator, the spam filter, Crowd Control or a moderator can remove or filter a single post or comment while your profile stays public. This checker cannot see those. Open the post\'s link in a private browser window: if it is missing or shows "[Removed by moderator]", other people cannot see it.',
  },
  {
    q: 'How do I fix a Reddit shadowban?',
    a: 'If you think your account was flagged by mistake, log in to it and file an appeal at reddit.com/appeals. File once, as Reddit may limit repeat appeals, and for a ban, file within six months of the notice in your inbox. Our shadowban guide covers what to change in how you post.',
  },
];
