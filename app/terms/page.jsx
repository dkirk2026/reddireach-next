import Legal from '@/components/Legal';

export const metadata = {
  title: 'Terms of Service · ReddiReach',
  description: 'The terms that govern your use of ReddiReach (Kirk & Co., LLC) services.',
};

export default function Page() {
  return (
    <Legal title="Terms of Service" updated="January 2026" description={metadata.description}>
      <h2>Agreement to Terms</h2>
      <p>By accessing or using the website and services of Kirk &amp; Co., LLC, doing business as ReddiReach (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

      <h2>Our Services</h2>
      <p>ReddiReach provides Reddit marketing and Generative Engine Optimization (GEO) services. Our services include:</p>
      <ul>
        <li>Reddit marketing strategy and consultation</li>
        <li>Organic Reddit engagement services</li>
        <li>AI search optimization (GEO)</li>
        <li>Brand visibility monitoring</li>
      </ul>

      <h2>User Responsibilities</h2>
      <p>When using our services, you agree to:</p>
      <ul>
        <li>Provide accurate and complete information</li>
        <li>Comply with all applicable laws and regulations</li>
        <li>Not use our services for any unlawful purpose</li>
        <li>Not misrepresent your identity or affiliation</li>
        <li>Respect intellectual property rights</li>
      </ul>

      <h2>Platform Compliance</h2>
      <p>Our services are designed to comply with Reddit&apos;s Terms of Service and community guidelines. We do not engage in:</p>
      <ul>
        <li>Vote manipulation or brigading</li>
        <li>Spam or unsolicited commercial messages</li>
        <li>Fake accounts or astroturfing</li>
        <li>Any activity that violates Reddit&apos;s policies</li>
      </ul>

      <h2>Payment Terms</h2>
      <p>Payment terms will be outlined in your service agreement. All fees are non-refundable unless otherwise specified in writing. We reserve the right to modify our pricing at any time.</p>

      <h2>Intellectual Property</h2>
      <p>All content on our website, including text, graphics, logos, and software, is the property of ReddiReach or its licensors and is protected by intellectual property laws.</p>

      <h2>Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, Kirk &amp; Co., LLC (DBA ReddiReach) shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.</p>

      <h2>Disclaimer</h2>
      <p>Our services are provided &quot;as is&quot; without warranties of any kind. We do not guarantee specific results, rankings, or outcomes from our marketing services.</p>

      <h2>Termination</h2>
      <p>We reserve the right to suspend or terminate your access to our services at any time for any reason, including violation of these terms.</p>

      <h2>Governing Law</h2>
      <p>These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.</p>

      <h2>Changes to Terms</h2>
      <p>We may update these Terms of Service from time to time. Continued use of our services after changes constitutes acceptance of the modified terms.</p>

      <h2>Contact Us</h2>
      <p>If you have questions about these Terms of Service, please contact us at <a href="mailto:danny@kirkco.io">danny@kirkco.io</a>.</p>
    </Legal>
  );
}
