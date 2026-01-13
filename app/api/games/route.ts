import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

const GAMES_PER_PAGE = 12;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || String(GAMES_PER_PAGE), 10), 50);
    const ageGroupsParam = searchParams.get('ageGroups');
    const categoriesParam = searchParams.get('categories');
    const pricing = searchParams.get('pricing');
    const search = searchParams.get('search');

    const ageGroups = ageGroupsParam ? ageGroupsParam.split(',') : [];
    const categories = categoriesParam ? categoriesParam.split(',') : [];

    // Build where clause
    const where: Prisma.GameWhereInput = {
      isActive: true,
    };

    if (ageGroups.length > 0) {
      where.ageGroup = { in: ageGroups };
    }

    if (pricing === 'free') {
      where.pricingModel = 'free';
    } else if (pricing === 'paid') {
      where.pricingModel = { not: 'free' };
    }

    if (search && search.length >= 2) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ];
    }

    // If filtering by categories, we need to filter games that have those categories
    let categoryFilter: string[] | undefined;
    if (categories.length > 0) {
      const categoryRecords = await db.category.findMany({
        where: { key: { in: categories } },
        select: { id: true },
      });
      categoryFilter = categoryRecords.map((c) => c.id);

      where.categories = {
        some: {
          categoryId: { in: categoryFilter },
        },
      };
    }

    // Get total count and fetch games with +1 to check if there's more
    const [total, games] = await Promise.all([
      db.game.count({ where }),
      db.game.findMany({
        where,
        include: {
          categories: { include: { category: true } },
          source: true,
        },
        skip: offset,
        take: limit + 1,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const hasMore = games.length > limit;
    const results = games.slice(0, limit);

    return NextResponse.json({
      games: results,
      hasMore,
      total,
    });
  } catch (error) {
    console.error('Failed to fetch games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}
