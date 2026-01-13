/**
 * Game category definitions.
 */
export const CATEGORIES = [
  { key: 'learning', name: 'Learning', icon: '📚' },
  { key: 'puzzle', name: 'Puzzles', icon: '🧩' },
  { key: 'creative', name: 'Creative', icon: '🎨' },
  { key: 'adventure', name: 'Adventure', icon: '🗺️' },
  { key: 'music', name: 'Music', icon: '🎵' },
  { key: 'matching', name: 'Matching', icon: '🔍' },
  { key: 'coloring', name: 'Coloring', icon: '🖌️' },
  { key: 'counting', name: 'Counting', icon: '🔢' },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]['key'];

/**
 * Get category info by key.
 */
export function getCategoryInfo(key: string) {
  return CATEGORIES.find((c) => c.key === key);
}

/**
 * Get all category keys.
 */
export function getCategoryKeys(): CategoryKey[] {
  return CATEGORIES.map((c) => c.key);
}
