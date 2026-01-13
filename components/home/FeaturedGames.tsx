import { GameCardCompact } from '../games/GameCard';
import Link from 'next/link';
import type { GameWithCategories } from '@/types';

interface FeaturedGamesProps {
  games: GameWithCategories[];
}

export function FeaturedGames({ games }: FeaturedGamesProps) {
  if (games.length === 0) return null;

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container-page">
        {/* Section Header - Mobile friendly */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-sunny/20 flex items-center justify-center">
              <span className="text-xl">⭐</span>
            </span>
            <div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-text">
                Featured Games
              </h2>
              <p className="text-sm text-text-muted hidden sm:block">
                Hand-picked favorites
              </p>
            </div>
          </div>
          <Link
            href="/games?featured=true"
            className="text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1"
          >
            <span className="hidden sm:inline">View all</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Games Grid - Simple responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {games.slice(0, 4).map((game) => (
            <GameCardCompact key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}
