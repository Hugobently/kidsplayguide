import { Game, Category, GameCategory } from '@prisma/client';
import { GameCardCompact } from './GameCard';

type GameWithCategories = Game & {
  categories: (GameCategory & { category: Category })[];
};

interface RelatedGamesProps {
  games: GameWithCategories[];
  title?: string;
}

export function RelatedGames({
  games,
  title = 'You Might Also Like',
}: RelatedGamesProps) {
  if (games.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-border-light">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
          <span className="text-xl">🎮</span>
        </span>
        <h2 className="text-2xl font-display font-bold text-text">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {games.map((game) => (
          <GameCardCompact key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
