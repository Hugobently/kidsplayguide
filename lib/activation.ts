import { Game } from '@prisma/client';

type SystemMode = 'BOOTSTRAP' | 'REVIEW';

/**
 * Determines if a game should be automatically activated.
 *
 * Rules:
 * - Must pass all gate criteria (non-negotiable)
 * - LOW quality confidence always requires manual review
 * - TIER_3 sources never auto-activate
 * - In BOOTSTRAP mode: TIER_1 and TIER_2 with MEDIUM+ confidence auto-activate
 * - In REVIEW mode: Requires manual approval
 */
export function shouldActivate(game: Game, systemMode: SystemMode = 'BOOTSTRAP'): boolean {
  // Gate criteria are non-negotiable
  if (!game.passesGateCriteria) return false;

  // LOW confidence always requires manual review
  if (game.qualityConfidence === 'LOW') return false;

  // TIER_3 never auto-activates
  if (game.trustTier === 'TIER_3') return false;

  if (systemMode === 'BOOTSTRAP') {
    // In bootstrap mode, TIER_1 and TIER_2 with MEDIUM+ confidence auto-activate
    return true;
  }

  if (systemMode === 'REVIEW') {
    // In review mode, require manual approval
    return game.manuallyApproved === true;
  }

  return false;
}

/**
 * Get system mode from environment variable.
 */
export function getSystemMode(): SystemMode {
  const mode = process.env.SYSTEM_MODE;
  if (mode === 'REVIEW') return 'REVIEW';
  return 'BOOTSTRAP';
}

/**
 * Compute activation status and return updated game data.
 */
export function withActivationStatus<T extends Game>(game: T): T & { isActive: boolean } {
  const systemMode = getSystemMode();
  return {
    ...game,
    isActive: shouldActivate(game, systemMode),
  };
}
