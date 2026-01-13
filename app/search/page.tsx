import { Metadata } from 'next';
import { db } from '@/lib/db';
import { GameGrid } from '@/components/games/GameGrid';
import { EmptyState } from '@/components/ui/EmptyState';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

async function searchGames(query: string) {
  if (!query || query.length < 2) return [];

  // Search in games
  const games = await db.game.findMany({
    where: {
      isActive: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { shortDescription: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: {
      categories: { include: { category: true } },
    },
    take: 50,
    orderBy: { title: 'asc' },
  });

  // Also search by category name
  const categories = await db.category.findMany({
    where: {
      name: { contains: query, mode: 'insensitive' },
    },
  });

  if (categories.length > 0) {
    const categoryIds = categories.map((c) => c.id);
    const categoryGames = await db.game.findMany({
      where: {
        isActive: true,
        categories: {
          some: {
            categoryId: { in: categoryIds },
          },
        },
        id: { notIn: games.map((g) => g.id) },
      },
      include: {
        categories: { include: { category: true } },
      },
      take: 20,
    });
    games.push(...categoryGames);
  }

  return games;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: ${q}` : 'Search Games',
    description: q
      ? `Search results for "${q}" - safe games for kids`
      : 'Search for safe, parent-approved games for kids',
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() || '';
  const games = query ? await searchGames(query) : [];

  return (
    <div className="container-page py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">
          {query ? `Search Results for "${query}"` : 'Search Games'}
        </h1>
        {query && (
          <p className="text-text-muted">
            Found {games.length} game{games.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {!query ? (
        <EmptyState
          icon="🔍"
          title="Enter a search term"
          description="Use the search bar above to find games by name, category, or description."
        />
      ) : games.length === 0 ? (
        <EmptyState
          icon="🔍"
          title={`No games found for "${query}"`}
          description="Try a different search term or browse all games."
          action={{ label: 'Browse All Games', href: '/games' }}
        />
      ) : (
        <GameGrid games={games} />
      )}
    </div>
  );
}
