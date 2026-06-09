import Legal from '@/components/Legal';

export const metadata = {
  title: 'Cookie Policy · ReddiReach',
  description: 'How ReddiReach (Kirk & Co., LLC) uses cookies and how you can control them.',
};

export default function Page() {
  return (
    <Legal title="Cookie Policy" updated="January 2026" description={metadata.description}>
      <h2>What Are Cookies?</h2>
      <p>Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.</p>

      <h2>How We Use Cookies</h2>
      <p>Kirk &amp; Co., LLC, doing business as ReddiReach (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), uses cookies for the following purposes:</p>
      <h3>Essential Cookies</h3>
      <p>These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas of the website.</p>
      <h3>Analytics Cookies</h3>
      <p>We use analytics cookies to understand how visitors interact with our website. This helps us improve our website and services. These cookies collect information anonymously.</p>
      <h3>Functional Cookies</h3>
      <p>These cookies allow the website to remember choices you make (such as your preferred language) and provide enhanced, more personalized features.</p>
      <h3>Marketing Cookies</h3>
      <p>These cookies may be set through our site by advertising partners. They may be used to build a profile of your interests and show you relevant advertisements on other sites.</p>

      <h2>Third-Party Cookies</h2>
      <p>Some cookies on our website are set by third-party services. These include:</p>
      <ul>
        <li>Google Analytics - for website usage analysis</li>
        <li>Social media platforms - for sharing functionality</li>
        <li>Marketing tools - for understanding campaign effectiveness</li>
      </ul>

      <h2>Managing Cookies</h2>
      <p>You can control and manage cookies in several ways:</p>
      <h3>Browser Settings</h3>
      <p>Most web browsers allow you to control cookies through their settings. You can usually find these in the &quot;Options&quot; or &quot;Preferences&quot; menu of your browser.</p>
      <ul>
        <li>Chrome: Settings &gt; Privacy and Security &gt; Cookies</li>
        <li>Firefox: Options &gt; Privacy &amp; Security &gt; Cookies</li>
        <li>Safari: Preferences &gt; Privacy &gt; Cookies</li>
        <li>Edge: Settings &gt; Privacy &gt; Cookies</li>
      </ul>
      <h3>Opt-Out Links</h3>
      <p>You can opt out of certain third-party cookies:</p>
      <ul>
        <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
        <li>Network Advertising Initiative: <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">NAI Opt-out</a></li>
      </ul>

      <h2>Cookie Consent</h2>
      <p>When you first visit our website, you will be shown a cookie consent banner. You can choose to accept or decline non-essential cookies. You can change your preferences at any time.</p>

      <h2>Impact of Disabling Cookies</h2>
      <p>If you choose to disable cookies, some features of our website may not function properly. Essential cookies cannot be disabled as they are necessary for the website to work.</p>

      <h2>Updates to This Policy</h2>
      <p>We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Please check this page periodically for updates.</p>

      <h2>Contact Us</h2>
      <p>If you have questions about our use of cookies, please contact us at <a href="mailto:danny@kirkco.io">danny@kirkco.io</a>.</p>
    </Legal>
  );
}
