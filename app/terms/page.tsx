import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for using KidsPlayGuide.',
};

export default function TermsPage() {
  return (
    <div className="container-page py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-text mb-6">Terms of Service</h1>

      <div className="prose prose-lg text-text-muted space-y-6">
        <p className="text-sm">Last updated: January 2026</p>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Acceptance of Terms</h2>
          <p>
            By accessing and using KidsPlayGuide, you agree to be bound by these Terms of
            Service. If you do not agree to these terms, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Description of Service</h2>
          <p>
            KidsPlayGuide is a curated directory of online games suitable for children
            ages 0-10. We provide links to games hosted on third-party websites. We do
            not host or operate these games ourselves.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Our Curation Standards</h2>
          <p>
            While we make every effort to ensure all games listed meet our safety criteria
            (no in-game ads, no chat with strangers, age-appropriate content, etc.),
            third-party websites may change their content at any time.
          </p>
          <p>
            Parents and guardians should always supervise young children&apos;s online
            activities and use their own judgment about what is appropriate for their child.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">External Links</h2>
          <p>
            KidsPlayGuide contains links to external websites. We are not responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The content, privacy practices, or policies of third-party websites</li>
            <li>Changes made to games after we have reviewed them</li>
            <li>Technical issues or downtime on external websites</li>
            <li>Any interactions you have on external websites</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Disclaimer of Warranties</h2>
          <p>
            KidsPlayGuide is provided &quot;as is&quot; without warranties of any kind. We do not
            guarantee that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The service will be uninterrupted or error-free</li>
            <li>All games will meet our criteria at all times</li>
            <li>External links will always be functional</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Limitation of Liability</h2>
          <p>
            KidsPlayGuide and its operators shall not be liable for any damages arising
            from the use or inability to use our service, including damages arising from
            content on third-party websites linked from our site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Reporting Issues</h2>
          <p>
            If you find a game that no longer meets our safety standards, or if you
            encounter any issues, please contact us immediately at:{' '}
            <a href="mailto:report@kidsplayguide.com" className="text-primary hover:text-primary-dark">
              report@kidsplayguide.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the
            website after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Contact</h2>
          <p>
            For questions about these Terms of Service, contact us at:{' '}
            <a href="mailto:legal@kidsplayguide.com" className="text-primary hover:text-primary-dark">
              legal@kidsplayguide.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
