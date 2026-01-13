import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn how KidsPlayGuide curates safe, ad-free games for children ages 0-10.',
};

export default function AboutPage() {
  return (
    <div className="container-page py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-text mb-6">About KidsPlayGuide</h1>

      <div className="prose prose-lg text-text-muted space-y-6">
        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Our Promise</h2>
          <p>
            <strong className="text-text">If a game appears on KidsPlayGuide, it is safe for children aged 0-10.</strong>
          </p>
          <p>
            Parents don&apos;t need to evaluate safety — if it&apos;s on our site, it&apos;s already been vetted.
            Simply choose based on your child&apos;s age, interests, and what categories appeal to them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">How We Pick Games</h2>
          <p>Every game on KidsPlayGuide must pass <strong className="text-text">all five safety gates</strong>:</p>

          <div className="bg-surface rounded-xl border border-border p-6 my-4 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">🚫</span>
              <div>
                <p className="font-semibold text-text">No In-Game Ads</p>
                <p className="text-sm">No banners, video ads, or interstitials that interrupt play.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">💰</span>
              <div>
                <p className="font-semibold text-text">Respectful Monetization</p>
                <p className="text-sm">No aggressive purchase prompts, pay-to-win mechanics, or punishment for non-payers.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">🔒</span>
              <div>
                <p className="font-semibold text-text">No Contact with Strangers</p>
                <p className="text-sm">No chat features or direct contact with other players. Leaderboards are OK.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">🛡️</span>
              <div>
                <p className="font-semibold text-text">No Manipulative Design</p>
                <p className="text-sm">No dark patterns, artificial wait timers, guilt-tripping, or gambling mechanics.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-semibold text-text">Age-Appropriate Content</p>
                <p className="text-sm">No violence, scary content, or mature themes inappropriate for children.</p>
              </div>
            </div>
          </div>

          <p>
            If <strong className="text-text">any</strong> of these gates fail, the game is not included on our site.
            There are no exceptions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">What IS Allowed</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Paid games (one-time purchase or subscription)</li>
            <li>Required accounts (Microsoft, Apple ID, etc.)</li>
            <li>Optional cosmetic purchases</li>
            <li>Anonymous leaderboards</li>
            <li>Local multiplayer</li>
            <li>Viewing other players&apos; creations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Our Sources</h2>
          <p>
            We primarily feature games from trusted educational sources like:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>PBS Kids</li>
            <li>CBeebies (BBC)</li>
            <li>Sesame Street</li>
            <li>Nick Jr</li>
            <li>ABCya</li>
            <li>Starfall</li>
            <li>National Geographic Kids</li>
          </ul>
          <p className="mt-4">
            Games from these sources have already been designed with children&apos;s safety in mind,
            making them excellent candidates for our collection.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mt-8 mb-4">Contact Us</h2>
          <p>
            Have a question or suggestion? Found an issue with one of our listed games?
            We&apos;d love to hear from you.
          </p>
          <p>
            Email us at: <a href="mailto:hello@kidsplayguide.com" className="text-primary hover:text-primary-dark">hello@kidsplayguide.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
