'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const ageGroups = [
    { id: '0-2', label: 'Baby', emoji: '👶', color: 'age-pill-baby' },
    { id: '2-4', label: 'Toddler', emoji: '🧒', color: 'age-pill-toddler' },
    { id: '4-6', label: 'Preschool', emoji: '🎨', color: 'age-pill-preschool' },
    { id: '6-8', label: 'School', emoji: '📚', color: 'age-pill-school' },
    { id: '8-10', label: 'Tween', emoji: '🎯', color: 'age-pill-tween' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border-light">
      <div className="container-page">
        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow">
              <span className="text-xl">🎮</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-text">Kids</span>
              <span className="text-lg font-bold text-primary">Play</span>
              <span className="text-lg font-bold text-coral">Guide</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/games"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-text-muted hover:text-text hover:bg-border-light transition-all"
            >
              All Games
            </Link>
            <div className="relative group">
              <button className="px-4 py-2 rounded-xl text-sm font-semibold text-text-muted hover:text-text hover:bg-border-light transition-all flex items-center gap-1">
                By Age
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-2 py-2 bg-white rounded-2xl shadow-soft-lg border border-border-light opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
                {ageGroups.map((age) => (
                  <Link
                    key={age.id}
                    href={`/age/${age.id}`}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-border-light transition-colors"
                  >
                    <span className="text-lg">{age.emoji}</span>
                    <div>
                      <div className="text-sm font-semibold text-text">{age.label}</div>
                      <div className="text-xs text-text-muted">{age.id} years</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/about"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-text-muted hover:text-text hover:bg-border-light transition-all"
            >
              About
            </Link>
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2.5 rounded-xl bg-border-light border-0 text-sm text-text placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl text-text-muted hover:text-text hover:bg-border-light transition-all"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-text-muted hover:text-text hover:bg-border-light transition-all"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border-light animate-slide-up">
          <div className="container-page py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-border-light border-0 text-sm text-text placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:bg-white"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <nav className="space-y-1">
              <Link
                href="/games"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-text font-semibold hover:bg-border-light transition-colors"
              >
                <span className="text-lg">🎮</span>
                All Games
              </Link>

              <div className="pt-2 pb-1 px-4 text-xs font-semibold text-text-muted uppercase tracking-wide">
                Browse by Age
              </div>

              {ageGroups.map((age) => (
                <Link
                  key={age.id}
                  href={`/age/${age.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-border-light transition-colors"
                >
                  <span className="text-lg">{age.emoji}</span>
                  <div>
                    <div className="text-sm font-semibold text-text">{age.label}</div>
                    <div className="text-xs text-text-muted">{age.id} years</div>
                  </div>
                </Link>
              ))}

              <div className="pt-3 border-t border-border-light mt-3">
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted font-semibold hover:bg-border-light hover:text-text transition-colors"
                >
                  <span className="text-lg">ℹ️</span>
                  About Us
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
