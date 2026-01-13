import { Game } from '@prisma/client';

/**
 * Badge definitions with their display info.
 */
export const BADGES = {
  educational: {
    key: 'badgeEducational',
    label: 'Educational',
    icon: '📚',
    description: 'Strong learning value',
  },
  creative: {
    key: 'badgeCreative',
    label: 'Creative',
    icon: '🎨',
    description: 'Encourages creativity',
  },
  popular: {
    key: 'badgePopular',
    label: 'Popular',
    icon: '⭐',
    description: 'Well-known, many positive reviews',
  },
  polished: {
    key: 'badgePolished',
    label: 'Polished',
    icon: '✨',
    description: 'High production quality',
  },
  trustedSource: {
    key: 'badgeTrustedSource',
    label: 'Trusted Source',
    icon: '🏛️',
    description: 'From PBS, CBeebies, or similar',
  },
  offlineFriendly: {
    key: 'badgeOfflineFriendly',
    label: 'Works Offline',
    icon: '✈️',
    description: 'Great for travel',
  },
  quickPlay: {
    key: 'badgeQuickPlay',
    label: 'Quick Play',
    icon: '⚡',
    description: 'Perfect for 1-5 min sessions',
  },
  siblingFriendly: {
    key: 'badgeSiblingFriendly',
    label: 'Sibling Friendly',
    icon: '👨‍👩‍👧‍👦',
    description: 'Multiple profiles or turn-taking',
  },
} as const;

export type BadgeKey = keyof typeof BADGES;

/**
 * Assigns auto-computed badges based on game fields.
 * AI-assigned badges (educational, creative, popular, polished) are preserved.
 */
export function assignBadges<T extends Partial<Game>>(game: T): T {
  return {
    ...game,
    // Auto-assigned based on fields
    badgeTrustedSource: game.trustTier === 'TIER_1',
    badgeOfflineFriendly: game.worksOffline === true,
    badgeQuickPlay: game.sessionLength === 'quick',
    badgeSiblingFriendly: game.supportsMultipleProfiles === true,
    // These remain as set by AI (or keep existing values)
    badgeEducational: game.badgeEducational ?? false,
    badgeCreative: game.badgeCreative ?? false,
    badgePopular: game.badgePopular ?? false,
    badgePolished: game.badgePolished ?? false,
  };
}

/**
 * Get all active badges for a game as an array.
 */
export function getActiveBadges(game: Partial<Game>): Array<(typeof BADGES)[BadgeKey]> {
  const activeBadges: Array<(typeof BADGES)[BadgeKey]> = [];

  if (game.badgeEducational) activeBadges.push(BADGES.educational);
  if (game.badgeCreative) activeBadges.push(BADGES.creative);
  if (game.badgePopular) activeBadges.push(BADGES.popular);
  if (game.badgePolished) activeBadges.push(BADGES.polished);
  if (game.badgeTrustedSource) activeBadges.push(BADGES.trustedSource);
  if (game.badgeOfflineFriendly) activeBadges.push(BADGES.offlineFriendly);
  if (game.badgeQuickPlay) activeBadges.push(BADGES.quickPlay);
  if (game.badgeSiblingFriendly) activeBadges.push(BADGES.siblingFriendly);

  return activeBadges;
}

/**
 * Count the number of badges a game has.
 */
export function countBadges(game: Partial<Game>): number {
  return getActiveBadges(game).length;
}
