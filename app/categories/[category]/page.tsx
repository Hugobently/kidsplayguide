import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { GameGrid } from '@/components/games/GameGrid';
import { getCategoryInfo } from '@/lib/config/categories';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ category: string }>;
}

async function getGames(categoryKey: string) {
  const category = await db.category.findUnique({
    where: { key: categoryKey },
  });

  if (!category) return [];

  const gameCategories = await db.gameCategory.findMany({
    where: { categoryId: category.id },
    include: {
      game: {
        include: {
          categories: { include: { category: true } },
        },
      },
    },
  });

  return gameCategories
    .map((gc) => gc.game)
    .filter((game) => game.isActive)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo = getCategoryInfo(category);

  if (!categoryInfo) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${categoryInfo.name} Games`,
    description: `Browse safe ${categoryInfo.name.toLowerCase()} games for kids ages 0-10. Parent-approved and ad-free.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryInfo = getCategoryInfo(category);

  if (!categoryInfo) {
    notFound();
  }

  const games = await getGames(category);

  return (
    <div className="container-page py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{categoryInfo.icon}</span>
          <h1 className="text-3xl font-bold text-text">
            {categoryInfo.name} Games
          </h1>
        </div>
        <p className="text-text-muted">
          Safe {categoryInfo.name.toLowerCase()} games for kids of all ages.
        </p>
      </div>

      <GameGrid
        games={games}
        emptyMessage={`No ${categoryInfo.name.toLowerCase()} games found yet`}
        emptyAction={{ label: 'Browse All Games', href: '/games' }}
      />
    </div>
  );
}

