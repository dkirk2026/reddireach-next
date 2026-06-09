import Legal from '@/components/Legal';

export const metadata = {
  title: 'Privacy Policy · ReddiReach',
  description: 'How ReddiReach (Kirk & Co., LLC) collects, uses, discloses and safeguards your information.',
};

export default function Page() {
  return (
    <Legal title="Privacy Policy" updated="January 2026" description={metadata.description}>
      <h2>Introduction</h2>
      <p>Kirk &amp; Co., LLC, doing business as ReddiReach (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>

      <h2>Information We Collect</h2>
      <h3>Personal Information</h3>
      <p>We may collect personal information that you voluntarily provide to us when you:</p>
      <ul>
        <li>Fill out contact forms on our website</li>
        <li>Subscribe to our newsletter</li>
        <li>Request a consultation</li>
        <li>Engage with our services</li>
      </ul>
      <p>This information may include:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Company name</li>
        <li>Phone number</li>
        <li>Any other information you choose to provide</li>
      </ul>
      <h3>Automatically Collected Information</h3>
      <p>When you visit our website, we may automatically collect certain information, including:</p>
      <ul>
        <li>IP address</li>
        <li>Browser type and version</li>
        <li>Device type</li>
        <li>Pages visited and time spent</li>
        <li>Referring website</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide and improve our services</li>
        <li>Respond to your inquiries and requests</li>
        <li>Send you marketing communications (with your consent)</li>
        <li>Analyze website usage and optimize user experience</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>Information Sharing</h2>
      <p>We do not sell your personal information. We may share your information with:</p>
      <ul>
        <li>Service providers who assist in our operations</li>
        <li>Professional advisors (lawyers, accountants)</li>
        <li>Law enforcement when required by law</li>
      </ul>

      <h2>Your Rights</h2>
      <p>Depending on your location, you may have the right to:</p>
      <ul>
        <li>Access the personal information we hold about you</li>
        <li>Request correction of inaccurate information</li>
        <li>Request deletion of your information</li>
        <li>Opt out of marketing communications</li>
        <li>Data portability</li>
      </ul>

      <h2>Data Security</h2>
      <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

      <h2>Contact Us</h2>
      <p>If you have questions about this Privacy Policy or our privacy practices, please contact us at <a href="mailto:danny@kirkco.io">danny@kirkco.io</a>.</p>

      <h2>Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.</p>
    </Legal>
  );
}
