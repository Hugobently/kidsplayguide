import { db } from '@/lib/db';
import { Hero } from '@/components/layout/Hero';
import { FeaturedGames } from '@/components/home/FeaturedGames';
import { GamesByAge } from '@/components/home/GamesByAge';
import { AGE_GROUP_KEYS, AgeGroupKey } from '@/lib/age-groups';
import { countBadges } from '@/lib/badges';
import type { GameWithCategories } from '@/types';

export const dynamic = 'force-dynamic';

async function getFeaturedGames(): Promise<GameWithCategories[]> {
  const games = await db.game.findMany({
    where: {
      isActive: true,
      trustTier: { in: ['TIER_1', 'TIER_2'] },
    },
    include: {
      categories: { include: { category: true } },
    },
  });

  // Filter to games with 3+ badges, then shuffle
  const highQuality = games.filter((g) => countBadges(g) >= 3);
  const candidates = highQuality.length >= 4 ? highQuality : games;

  // Simple shuffle
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
}

async function getGamesByAge(): Promise<Record<AgeGroupKey, GameWithCategories[]>> {
  const result: Record<AgeGroupKey, GameWithCategories[]> = {
    '0-2': [],
    '2-4': [],
    '4-6': [],
    '6-8': [],
    '8-10': [],
  };

  for (const ageGroup of AGE_GROUP_KEYS) {
    result[ageGroup] = await db.game.findMany({
      where: {
        isActive: true,
        ageGroup,
      },
      include: {
        categories: { include: { category: true } },
      },
      take: 4,
      orderBy: { createdAt: 'desc' },
    });
  }

  return result;
}

export default async function HomePage() {
  const [featuredGames, gamesByAge] = await Promise.all([
    getFeaturedGames(),
    getGamesByAge(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedGames games={featuredGames} />
      <GamesByAge gamesByAge={gamesByAge} />
    </>
  );
}
