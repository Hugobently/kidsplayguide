import type {
  Game,
  GameSource,
  Category,
  Skill,
  Theme,
  GameCategory,
  GameSkill,
  GameTheme,
} from '@prisma/client';

/**
 * Game with all relations included.
 */
export type GameWithRelations = Game & {
  source: GameSource | null;
  categories: (GameCategory & { category: Category })[];
  skills: (GameSkill & { skill: Skill })[];
  themes: (GameTheme & { theme: Theme })[];
};

/**
 * Game with minimal relations for listing pages.
 */
export type GameForCard = Game & {
  categories: (GameCategory & { category: Category })[];
};

/**
 * Pricing model options.
 */
export type PricingModel = 'free' | 'one-time' | 'subscription' | 'freemium';

/**
 * Session length options.
 */
export type SessionLength = 'quick' | 'medium' | 'long';

/**
 * Link status options.
 */
export type LinkStatus = 'ok' | 'broken' | 'redirected' | 'unknown';

/**
 * Audio language options.
 */
export type AudioLanguage = 'none' | 'english' | 'multiple';

/**
 * API response wrapper.
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Paginated response.
 */
export interface PaginatedResponse<T> {
  items: T[];
  hasMore: boolean;
  total?: number;
}

/**
 * Game filter params.
 */
export interface GameFilterParams {
  offset?: number;
  limit?: number;
  ageGroups?: string[];
  categories?: string[];
  pricing?: 'free' | 'paid' | 'all';
  search?: string;
}
