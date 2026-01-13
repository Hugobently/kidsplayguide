import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { GameDetail } from '@/components/games/GameDetail';
import { RelatedGames } from '@/components/games/RelatedGames';

// Dynamic rendering - pages fetch from database at request time
export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getGame(slug: string) {
  return db.game.findUnique({
    where: { slug, isActive: true },
    include: {
      source: true,
      categories: { include: { category: true } },
      skills: { include: { skill: true } },
      themes: { include: { theme: true } },
    },
  });
}

async function getRelatedGames(gameId: string, ageGroup: string, categoryIds: string[]) {
  const related = await db.game.findMany({
    where: {
      isActive: true,
      id: { not: gameId },
      ageGroup,
    },
    include: {
      categories: { include: { category: true } },
    },
    take: 20,
  });

  // Sort by category overlap
  const scored = related.map((g) => {
    const gCategoryIds = g.categories.map((gc) => gc.categoryId);
    const overlap = categoryIds.filter((id) => gCategoryIds.includes(id)).length;
    return { game: g, overlap };
  });

  scored.sort((a, b) => b.overlap - a.overlap);
  return scored.slice(0, 4).map((s) => s.game);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGame(slug);

  if (!game) {
    return { title: 'Game Not Found' };
  }

  return {
    title: game.title,
    description: game.shortDescription || game.description || `Play ${game.title} - a safe game for kids`,
    openGraph: {
      title: game.title,
      description: game.shortDescription || game.description || `Play ${game.title} - a safe game for kids`,
      images: game.thumbnailUrl ? [{ url: game.thumbnailUrl }] : undefined,
    },
  };
}

export default async function GameDetailPage({ params }: Props) {
  const { slug } = await params;
  const game = await getGame(slug);

  if (!game) {
    notFound();
  }

  const categoryIds = game.categories.map((gc) => gc.categoryId);
  const relatedGames = await getRelatedGames(game.id, game.ageGroup, categoryIds);

  return (
    <div className="container-page py-8">
      <GameDetail game={game} />
      <RelatedGames games={relatedGames} />
    </div>
  );
}
