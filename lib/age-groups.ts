/**
 * Age group definitions with display info.
 */
export const AGE_GROUPS = {
  '0-2': {
    key: '0-2',
    label: 'Baby',
    range: '0-2 years',
    description: 'Sensory, cause-effect, simple touch',
    color: 'bg-pink-200',
    colorHex: '#FFB5C5',
    emoji: '👶',
    pillClass: 'age-pill-baby',
  },
  '2-4': {
    key: '2-4',
    label: 'Toddler',
    range: '2-4 years',
    description: 'Simple interaction, exploration, no rules',
    color: 'bg-yellow-200',
    colorHex: '#FFD93D',
    emoji: '🧒',
    pillClass: 'age-pill-toddler',
  },
  '4-6': {
    key: '4-6',
    label: 'Preschool',
    range: '4-6 years',
    description: 'Basic rules, letters, numbers, colors',
    color: 'bg-green-200',
    colorHex: '#98D8AA',
    emoji: '🎨',
    pillClass: 'age-pill-preschool',
  },
  '6-8': {
    key: '6-8',
    label: 'School',
    range: '6-8 years',
    description: 'Reading, math, logic, creativity',
    color: 'bg-blue-200',
    colorHex: '#87CEEB',
    emoji: '📚',
    pillClass: 'age-pill-school',
  },
  '8-10': {
    key: '8-10',
    label: 'Tween',
    range: '8-10 years',
    description: 'Complex games, strategy, challenges',
    color: 'bg-purple-200',
    colorHex: '#DDA0DD',
    emoji: '🎯',
    pillClass: 'age-pill-tween',
  },
} as const;

export type AgeGroupKey = keyof typeof AGE_GROUPS;

/**
 * All valid age group keys in order.
 */
export const AGE_GROUP_KEYS: AgeGroupKey[] = ['0-2', '2-4', '4-6', '6-8', '8-10'];

/**
 * Compute the age group based on minAge and maxAge.
 * Uses the midpoint to determine the primary age group.
 */
export function computeAgeGroup(minAge: number, maxAge: number): AgeGroupKey {
  const midpoint = (minAge + maxAge) / 2;

  if (midpoint < 2) return '0-2';
  if (midpoint < 4) return '2-4';
  if (midpoint < 6) return '4-6';
  if (midpoint < 8) return '6-8';
  return '8-10';
}

/**
 * Get the age group info for a given key.
 */
export function getAgeGroupInfo(key: string): (typeof AGE_GROUPS)[AgeGroupKey] | undefined {
  return AGE_GROUPS[key as AgeGroupKey];
}

/**
 * Format an age range for display.
 * e.g., "Ages 2-4" or "Ages 4+"
 */
export function formatAgeRange(minAge: number, maxAge: number): string {
  if (minAge === maxAge) {
    return `Age ${minAge}`;
  }
  if (maxAge >= 10) {
    return `Ages ${minAge}+`;
  }
  return `Ages ${minAge}-${maxAge}`;
}

/**
 * Check if an age group key is valid.
 */
export function isValidAgeGroup(key: string): key is AgeGroupKey {
  return AGE_GROUP_KEYS.includes(key as AgeGroupKey);
}
