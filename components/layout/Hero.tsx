'use client';

import Link from 'next/link';
import { AGE_GROUPS, AGE_GROUP_KEYS } from '@/lib/age-groups';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-coral/10">
      {/* Decorative blobs - hidden on mobile for performance */}
      <div className="hidden md:block">
        <div className="blob w-96 h-96 bg-primary-light -top-48 -left-48" />
        <div className="blob w-72 h-72 bg-coral -top-20 right-20" />
        <div className="blob w-64 h-64 bg-sunny bottom-0 left-1/4" />
        <div className="blob w-80 h-80 bg-secondary -bottom-40 -right-40" />
      </div>

      <div className="container-page relative py-10 md:py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          {/* Trust badge - smaller on mobile */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-border-light shadow-soft mb-6 animate-fade-in">
            <span className="text-secondary">✓</span>
            <span className="text-xs md:text-sm font-semibold text-text">Parent-Approved & Ad-Free</span>
          </div>

          {/* Main heading - responsive sizing */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-4 md:mb-6 animate-slide-up">
            Find the{' '}
            <span className="text-gradient">Perfect Game</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            for Your Little One
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-text-muted max-w-xl mx-auto mb-6 md:mb-8 animate-slide-up px-2">
            Curated educational games by age. No ads, no strangers.
          </p>

          {/* Age Group Selector - Main CTA */}
          <div className="animate-slide-up">
            <p className="text-xs md:text-sm font-semibold text-text-muted mb-3 uppercase tracking-wide">
              Pick your child&apos;s age
            </p>
            {/* Scrollable on mobile, wrapped on larger screens */}
            <div className="flex gap-2 md:gap-3 justify-start md:justify-center overflow-x-auto pb-2 px-1 hide-scrollbar md:flex-wrap">
              {AGE_GROUP_KEYS.map((key) => {
                const group = AGE_GROUPS[key];
                return (
                  <Link
                    key={key}
                    href={`/age/${key}`}
                    className={`${group.pillClass} age-pill text-sm md:text-base px-3 md:px-4 py-2 md:py-2.5 shadow-soft hover:shadow-glow hover:scale-105 transition-all duration-300 shrink-0`}
                  >
                    <span className="text-base md:text-lg">{group.emoji}</span>
                    <span className="font-bold">{group.label}</span>
                    <span className="text-2xs md:text-xs opacity-75 hidden sm:inline">({key})</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Secondary CTA - stack on mobile */}
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 justify-center animate-fade-in px-4 sm:px-0">
            <Link
              href="/games"
              className="btn-primary px-6 py-3 text-sm md:text-base"
            >
              Browse All Games
            </Link>
            <Link
              href="/about"
              className="btn-ghost px-6 py-3 text-sm md:text-base"
            >
              How We Pick Games
            </Link>
          </div>
        </div>

        {/* Trust indicators - horizontal scroll on mobile */}
        <div className="flex gap-3 md:gap-6 justify-start md:justify-center mt-8 md:mt-12 animate-fade-in overflow-x-auto pb-2 hide-scrollbar">
          {[
            { icon: '🚫', text: 'No Ads' },
            { icon: '🔒', text: 'No Strangers' },
            { icon: '✅', text: 'Age-Safe' },
            { icon: '👨‍👩‍👧', text: 'Parent Tested' },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/60 border border-border-light text-xs md:text-sm font-medium text-text-muted shrink-0"
            >
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
