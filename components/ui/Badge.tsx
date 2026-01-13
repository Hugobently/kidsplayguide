interface BadgeProps {
  icon: string;
  label: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function Badge({
  icon,
  label,
  description,
  size = 'md',
  showLabel = true,
}: BadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 bg-accent/30 text-text rounded-full font-medium ${sizeClasses[size]}`}
      title={description}
    >
      <span>{icon}</span>
      {showLabel && <span>{label}</span>}
    </span>
  );
}

interface BadgeListProps {
  badges: Array<{
    icon: string;
    label: string;
    description?: string;
  }>;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export function BadgeList({
  badges,
  max = 3,
  size = 'sm',
  showLabels = true,
}: BadgeListProps) {
  const visibleBadges = badges.slice(0, max);
  const remaining = badges.length - max;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visibleBadges.map((badge) => (
        <Badge
          key={`${badge.icon}-${badge.label}`}
          icon={badge.icon}
          label={badge.label}
          description={badge.description}
          size={size}
          showLabel={showLabels}
        />
      ))}
      {remaining > 0 && (
        <span className={`inline-flex items-center text-text-muted ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          +{remaining} more
        </span>
      )}
    </div>
  );
}
