/**
 * Trust tier definitions.
 */
export const TRUST_TIERS = {
  TIER_1: {
    key: 'TIER_1',
    label: 'Tier 1 - Trusted',
    description: 'PBS Kids, CBeebies, Sesame Street, Nick Jr, Disney Junior',
    autoActivate: true,
  },
  TIER_2: {
    key: 'TIER_2',
    label: 'Tier 2 - Educational',
    description: 'ABCya, Starfall, National Geographic Kids, Fun Brain',
    autoActivate: true, // Only in Bootstrap mode
  },
  TIER_3: {
    key: 'TIER_3',
    label: 'Tier 3 - Review Required',
    description: 'Poki, CrazyGames, unknown sources',
    autoActivate: false,
  },
} as const;

export type TrustTier = keyof typeof TRUST_TIERS;

/**
 * Quality confidence levels.
 */
export const QUALITY_CONFIDENCE = {
  HIGH: {
    key: 'HIGH',
    label: 'High',
    description: 'TIER_1 source OR manually verified',
    autoActivate: true,
  },
  MEDIUM: {
    key: 'MEDIUM',
    label: 'Medium',
    description: 'TIER_2 source, looks good',
    autoActivate: true, // Only in Bootstrap mode
  },
  LOW: {
    key: 'LOW',
    label: 'Low',
    description: 'Uncertain, needs review',
    autoActivate: false,
  },
} as const;

export type QualityConfidence = keyof typeof QUALITY_CONFIDENCE;
