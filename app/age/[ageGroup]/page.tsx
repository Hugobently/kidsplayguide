import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { GameGrid } from '@/components/games/GameGrid';
import { AGE_GROUPS, isValidAgeGroup, AgeGroupKey } from '@/lib/age-groups';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ ageGroup: string }>;
}

async function getGames(ageGroup: string) {
  return db.game.findMany({
    where: {
      isActive: true,
      ageGroup,
    },
    include: {
      categories: { include: { category: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ageGroup } = await params;

  if (!isValidAgeGroup(ageGroup)) {
    return { title: 'Age Group Not Found' };
  }

  const group = AGE_GROUPS[ageGroup as AgeGroupKey];

  return {
    title: `${group.label} Games (${group.range})`,
    description: `Safe, fun games for ${group.label.toLowerCase()}s (${group.range}). ${group.description}.`,
  };
}

export default async function AgeGroupPage({ params }: Props) {
  const { ageGroup } = await params;

  if (!isValidAgeGroup(ageGroup)) {
    notFound();
  }

  const group = AGE_GROUPS[ageGroup as AgeGroupKey];
  const games = await getGames(ageGroup);

  return (
    <div className="container-page py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: group.colorHex }}
          />
          <h1 className="text-3xl font-bold text-text">
            {group.label} Games
          </h1>
        </div>
        <p className="text-text-muted text-lg">{group.range}</p>
        <p className="text-text-muted mt-2">{group.description}</p>
      </div>

      <GameGrid
        games={games}
        emptyMessage={`No games found for ${group.label.toLowerCase()}s yet`}
        emptyAction={{ label: 'Browse All Games', href: '/games' }}
      />
    </div>
  );
}

