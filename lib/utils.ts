/**
 * Shared utility functions used across components.
 */

/**
 * Safely parse a JSON array from a string value.
 * Returns an empty array if parsing fails.
 */
export function parseJsonArray<T = string>(value: string | null | undefined): T[] {
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

/**
 * Get gradient background class for card based on age group.
 */
export function getAgeGradient(ageGroup: string): string {
  const gradients: Record<string, string> = {
    '0-2': 'from-pink-100 to-rose-50',
    '2-4': 'from-amber-100 to-yellow-50',
    '4-6': 'from-emerald-100 to-green-50',
    '6-8': 'from-blue-100 to-sky-50',
    '8-10': 'from-purple-100 to-violet-50',
  };
  return gradients[ageGroup] || 'from-gray-100 to-gray-50';
}

/**
 * Get age pill CSS class based on age group.
 */
export function getAgePillClass(ageGroup: string): string {
  const pillClasses: Record<string, string> = {
    '0-2': 'age-pill-baby',
    '2-4': 'age-pill-toddler',
    '4-6': 'age-pill-preschool',
    '6-8': 'age-pill-school',
    '8-10': 'age-pill-tween',
  };
  return pillClasses[ageGroup] || 'age-pill-school';
}

/**
 * Pricing configuration for display.
 */
export const PRICING_CONFIG = {
  free: { label: 'Free', class: 'text-secondary font-bold' },
  'one-time': { label: 'Paid', class: 'text-text-muted' },
  subscription: { label: 'Sub', class: 'text-coral' },
  freemium: { label: 'Free+', class: 'text-secondary' },
} as const;

/**
 * Get pricing display config for a pricing model.
 */
export function getPricingConfig(pricingModel: string) {
  return PRICING_CONFIG[pricingModel as keyof typeof PRICING_CONFIG] || {
    label: pricingModel,
    class: 'text-text-muted'
  };
}

/**
 * Category fallback configuration for images.
 */
export const CATEGORY_FALLBACKS: Record<string, { emoji: string; gradient: string }> = {
  learning: { emoji: '📚', gradient: 'from-blue-200 via-indigo-100 to-purple-100' },
  puzzle: { emoji: '🧩', gradient: 'from-purple-200 via-pink-100 to-rose-100' },
  creative: { emoji: '🎨', gradient: 'from-amber-200 via-orange-100 to-yellow-100' },
  adventure: { emoji: '🗺️', gradient: 'from-emerald-200 via-teal-100 to-cyan-100' },
  music: { emoji: '🎵', gradient: 'from-pink-200 via-rose-100 to-red-100' },
  matching: { emoji: '🔍', gradient: 'from-cyan-200 via-sky-100 to-blue-100' },
  coloring: { emoji: '🖌️', gradient: 'from-red-200 via-pink-100 to-orange-100' },
  counting: { emoji: '🔢', gradient: 'from-violet-200 via-purple-100 to-indigo-100' },
};

/**
 * Get fallback config for a category.
 */
export function getCategoryFallback(categoryKey?: string) {
  return CATEGORY_FALLBACKS[categoryKey || ''] || {
    emoji: '🎮',
    gradient: 'from-gray-200 via-gray-100 to-white'
  };
}
