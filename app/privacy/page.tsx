import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for KidsPlayGuide - how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className="container-page py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-text mb-6">Privacy Policy</h1>

      <div className="prose prose-lg text-text-muted space-y-6">
        <p className="text-sm">Last updated: January 2026</p>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Overview</h2>
          <p>
            KidsPlayGuide is committed to protecting the privacy of our visitors, especially
            children. This policy explains what information we collect and how we use it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Information We Collect</h2>
          <p>
            <strong className="text-text">We do not collect personal information from children.</strong>
          </p>
          <p>
            KidsPlayGuide is a directory website — we link to games hosted on other websites.
            We do not:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Require user accounts or registration</li>
            <li>Collect names, email addresses, or other personal information</li>
            <li>Use tracking cookies for advertising</li>
            <li>Share data with third parties for marketing purposes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Analytics</h2>
          <p>
            We may use privacy-friendly analytics to understand how visitors use our site.
            This data is aggregated and does not identify individual users. We use this
            information to improve our service and ensure our games are meeting the needs
            of families.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">External Links</h2>
          <p>
            KidsPlayGuide contains links to games hosted on third-party websites. When you
            click these links, you leave our site and are subject to the privacy policies
            of those websites.
          </p>
          <p>
            We carefully select games from trusted sources, but we encourage parents to
            review the privacy policies of any site where their children play.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Cookies</h2>
          <p>
            We use minimal, essential cookies to ensure our website functions properly.
            We do not use cookies for advertising or tracking across websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">COPPA Compliance</h2>
          <p>
            KidsPlayGuide is designed with the Children&apos;s Online Privacy Protection Act
            (COPPA) in mind. We do not knowingly collect personal information from children
            under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will post any changes
            on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us at:{' '}
            <a href="mailto:privacy@kidsplayguide.com" className="text-primary hover:text-primary-dark">
              privacy@kidsplayguide.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
