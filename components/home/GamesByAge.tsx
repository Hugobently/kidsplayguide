import Link from 'next/link';
import { Game, Category, GameCategory } from '@prisma/client';
import { AGE_GROUPS, AgeGroupKey } from '@/lib/age-groups';
import { GameCardCompact } from '../games/GameCard';

type GameWithCategories = Game & {
  categories: (GameCategory & { category: Category })[];
};

interface GamesByAgeProps {
  gamesByAge: Record<AgeGroupKey, GameWithCategories[]>;
}

// Get gradient for section backgrounds
function getAgeGradient(ageKey: AgeGroupKey): string {
  const gradients: Record<AgeGroupKey, string> = {
    '0-2': 'from-pink-50/70 to-transparent',
    '2-4': 'from-amber-50/70 to-transparent',
    '4-6': 'from-emerald-50/70 to-transparent',
    '6-8': 'from-blue-50/70 to-transparent',
    '8-10': 'from-purple-50/70 to-transparent',
  };
  return gradients[ageKey];
}

export function GamesByAge({ gamesByAge }: GamesByAgeProps) {
  const ageKeys = Object.keys(AGE_GROUPS) as AgeGroupKey[];

  return (
    <section className="py-8 md:py-12">
      <div className="container-page">
        {/* Section Header - Compact on mobile */}
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 text-primary text-xs md:text-sm font-semibold mb-3">
            <span>🎯</span>
            <span>By Age Group</span>
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-text">
            Games by Age
          </h2>
          <p className="text-sm text-text-muted mt-2 hidden md:block">
            Matched to your child&apos;s developmental stage
          </p>
        </div>

        {/* Age Group Sections */}
        <div className="space-y-6 md:space-y-10">
          {ageKeys.map((ageKey) => {
            const group = AGE_GROUPS[ageKey];
            const games = gamesByAge[ageKey] || [];

            if (games.length === 0) return null;

            return (
              <div
                key={ageKey}
                className={`relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-r ${getAgeGradient(ageKey)} p-4 md:p-6`}
              >
                {/* Age Group Header - Compact on mobile */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${group.pillClass} flex items-center justify-center shadow-soft`}>
                      <span className="text-xl md:text-2xl">{group.emoji}</span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-display font-bold text-text">
                        {group.label}
                      </h3>
                      <p className="text-xs md:text-sm text-text-muted">
                        {group.range}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/age/${ageKey}`}
                    className="text-xs md:text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1"
                  >
                    <span className="hidden sm:inline">See all</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Games Grid - 2 cols on mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                  {games.slice(0, 4).map((game) => (
                    <GameCardCompact key={game.id} game={game} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Browse All CTA - smaller on mobile */}
        <div className="mt-8 md:mt-12 text-center">
          <Link href="/games" className="btn-primary px-6 py-3 text-sm md:text-base">
            Browse All Games
          </Link>
        </div>
      </div>
    </section>
  );
}
