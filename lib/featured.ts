import { db } from './db';
import { countBadges } from './badges';
import type { Game, Category, Skill, Theme, GameCategory, GameSkill, GameTheme } from '@prisma/client';

type GameWithRelations = Game & {
  categories: (GameCategory & { category: Category })[];
  skills: (GameSkill & { skill: Skill })[];
  themes: (GameTheme & { theme: Theme })[];
};

/**
 * Shuffle an array using Fisher-Yates algorithm.
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get featured games for the homepage.
 * Selects high-quality games (3+ badges) from TIER_1 or TIER_2 sources.
 */
export async function getFeaturedGames(count: number = 4): Promise<GameWithRelations[]> {
  // Get high-quality games (active, TIER_1 or TIER_2)
  const pool = await db.game.findMany({
    where: {
      isActive: true,
      trustTier: { in: ['TIER_1', 'TIER_2'] },
    },
    include: {
      categories: { include: { category: true } },
      skills: { include: { skill: true } },
      themes: { include: { theme: true } },
    },
  });

  // Filter to games with 3+ badges
  const highQuality = pool.filter((game) => countBadges(game) >= 3);

  // If not enough high-quality games, include all active TIER_1/TIER_2
  const candidates = highQuality.length >= count ? highQuality : pool;

  // Random selection
  return shuffleArray(candidates).slice(0, count);
}

/**
 * Get games for a specific age group with pagination.
 */
export async function getGamesByAgeGroup(
  ageGroup: string,
  limit: number = 4
): Promise<GameWithRelations[]> {
  return db.game.findMany({
    where: {
      isActive: true,
      ageGroup,
    },
    include: {
      categories: { include: { category: true } },
      skills: { include: { skill: true } },
      themes: { include: { theme: true } },
    },
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Get related games based on age group and category overlap.
 */
export async function getRelatedGames(
  game: GameWithRelations,
  count: number = 4
): Promise<GameWithRelations[]> {
  const categoryIds = game.categories.map((gc) => gc.categoryId);

  // Get games with same age group
  const related = await db.game.findMany({
    where: {
      isActive: true,
      id: { not: game.id },
      ageGroup: game.ageGroup,
    },
    include: {
      categories: { include: { category: true } },
      skills: { include: { skill: true } },
      themes: { include: { theme: true } },
    },
    take: 20, // Get more to sort by overlap
  });

  // Score by category overlap
  const scored = related.map((g) => {
    const gCategoryIds = g.categories.map((gc) => gc.categoryId);
    const overlap = categoryIds.filter((id) => gCategoryIds.includes(id)).length;
    return { game: g, overlap };
  });

  // Sort by overlap (descending)
  scored.sort((a, b) => b.overlap - a.overlap);

  return scored.slice(0, count).map((s) => s.game);
}
