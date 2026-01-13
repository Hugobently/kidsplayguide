import { Game, Category, GameCategory } from '@prisma/client';
import { GameCard } from './GameCard';
import { EmptyState } from '../ui/EmptyState';

type GameWithCategories = Game & {
  categories: (GameCategory & { category: Category })[];
};

interface GameGridProps {
  games: GameWithCategories[];
  emptyMessage?: string;
  emptyAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function GameGrid({
  games,
  emptyMessage = 'No games found',
  emptyAction,
}: GameGridProps) {
  if (games.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title={emptyMessage}
        description="Try adjusting your filters or search terms."
        action={emptyAction}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
