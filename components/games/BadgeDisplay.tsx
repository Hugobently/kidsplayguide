import { Game } from '@prisma/client';
import { getActiveBadges } from '@/lib/badges';
import { Badge, BadgeList } from '../ui/Badge';

interface BadgeDisplayProps {
  game: Partial<Game>;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  variant?: 'list' | 'inline';
}

export function BadgeDisplay({
  game,
  max = 3,
  size = 'sm',
  showLabels = true,
  variant = 'list',
}: BadgeDisplayProps) {
  const badges = getActiveBadges(game);

  if (badges.length === 0) return null;

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-1">
        {badges.slice(0, max).map((badge) => (
          <Badge
            key={badge.key}
            icon={badge.icon}
            label={badge.label}
            description={badge.description}
            size={size}
            showLabel={showLabels}
          />
        ))}
      </div>
    );
  }

  return (
    <BadgeList
      badges={badges}
      max={max}
      size={size}
      showLabels={showLabels}
    />
  );
}

interface BadgeWithDescriptionProps {
  game: Partial<Game>;
}

export function BadgeWithDescription({ game }: BadgeWithDescriptionProps) {
  const badges = getActiveBadges(game);

  if (badges.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-text">Badges</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.key}
            className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg"
          >
            <span className="text-2xl">{badge.icon}</span>
            <div>
              <p className="font-medium text-text">{badge.label}</p>
              <p className="text-sm text-text-muted">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
