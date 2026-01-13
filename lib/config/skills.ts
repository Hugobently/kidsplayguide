/**
 * Skill definitions - what children learn from games.
 */
export const SKILLS = [
  { key: 'math', name: 'Math' },
  { key: 'reading', name: 'Reading' },
  { key: 'logic', name: 'Logic' },
  { key: 'motor', name: 'Motor Skills' },
  { key: 'memory', name: 'Memory' },
  { key: 'creativity', name: 'Creativity' },
  { key: 'language', name: 'Language' },
] as const;

export type SkillKey = (typeof SKILLS)[number]['key'];

/**
 * Theme definitions - topics that appeal to children.
 */
export const THEMES = [
  { key: 'animals', name: 'Animals' },
  { key: 'dinosaurs', name: 'Dinosaurs' },
  { key: 'princess', name: 'Princess' },
  { key: 'vehicles', name: 'Vehicles' },
  { key: 'space', name: 'Space' },
  { key: 'nature', name: 'Nature' },
  { key: 'fantasy', name: 'Fantasy' },
  { key: 'superheroes', name: 'Superheroes' },
] as const;

export type ThemeKey = (typeof THEMES)[number]['key'];

/**
 * Get skill info by key.
 */
export function getSkillInfo(key: string) {
  return SKILLS.find((s) => s.key === key);
}

/**
 * Get theme info by key.
 */
export function getThemeInfo(key: string) {
  return THEMES.find((t) => t.key === key);
}
