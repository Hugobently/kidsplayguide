import Link from 'next/link';
import { AGE_GROUPS, AGE_GROUP_KEYS } from '@/lib/age-groups';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-background to-primary-50/30 mt-auto">
      <div className="container-page py-8 md:py-12">
        {/* Mobile: Simple 2-column layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section - Full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-soft">
                <span className="text-lg">🎮</span>
              </div>
              <div className="text-base font-bold">
                <span className="text-text">Kids</span>
                <span className="text-primary">Play</span>
                <span className="text-coral">Guide</span>
              </div>
            </Link>
            <p className="text-text-muted text-xs md:text-sm leading-relaxed mb-4 hidden md:block">
              Safe, parent-approved games for kids ages 0-10.
            </p>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/10 text-secondary text-2xs md:text-xs font-semibold">
                ✓ Ad-Free
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-2xs md:text-xs font-semibold">
                🔒 Safe
              </span>
            </div>
          </div>

          {/* Browse by Age - Horizontal scroll on mobile */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-text text-sm mb-3">Browse by Age</h4>
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar md:flex-col md:gap-2 md:overflow-visible">
              {AGE_GROUP_KEYS.map((key) => {
                const group = AGE_GROUPS[key];
                return (
                  <Link
                    key={key}
                    href={`/age/${key}`}
                    className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors shrink-0 md:shrink"
                  >
                    <span>{group.emoji}</span>
                    <span>{group.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-text text-sm mb-3">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/games" className="text-xs text-text-muted hover:text-primary transition-colors">
                  All Games
                </Link>
              </li>
              <li>
                <Link href="/games?free=true" className="text-xs text-text-muted hover:text-primary transition-colors">
                  Free Games
                </Link>
              </li>
              <li className="hidden md:block">
                <Link href="/search" className="text-xs text-text-muted hover:text-primary transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-text text-sm mb-3">Info</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-xs text-text-muted hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-xs text-text-muted hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs text-text-muted hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-6 pt-4 border-t border-border-light">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p className="text-text-muted text-2xs md:text-xs">
              © {currentYear} KidsPlayGuide
            </p>
            <p className="text-text-muted text-2xs md:text-xs">
              100+ curated games • 100% safe
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
