import { Game } from '@prisma/client';

/**
 * Computes whether a game passes all safety gate criteria.
 * ALL gates must pass for a game to be eligible for activation.
 *
 * Gates:
 * - hasNoInGameAds: No banners, video ads, or interstitials
 * - hasRespectfulMonetization: No aggressive prompts, pay-to-win, or punishment for non-payers
 * - hasNoContactWithStrangers: No chat or direct contact (leaderboards OK)
 * - hasNoManipulativeDesign: No dark patterns, artificial timers, guilt-tripping, gambling
 * - isAgeAppropriate: No violence, scary content, or mature themes
 */
export function computePassesGateCriteria(game: Partial<Game>): boolean {
  return (
    game.hasNoInGameAds === true &&
    game.hasRespectfulMonetization === true &&
    game.hasNoContactWithStrangers === true &&
    game.hasNoManipulativeDesign === true &&
    game.isAgeAppropriate === true
  );
}

/**
 * Returns an object with passesGateCriteria computed.
 * Use this before any create/update operation.
 */
export function withGateCriteria<T extends Partial<Game>>(game: T): T & { passesGateCriteria: boolean } {
  return {
    ...game,
    passesGateCriteria: computePassesGateCriteria(game),
  };
}

/**
 * Returns which gates are failing for a game.
 * Useful for debugging or showing why a game was rejected.
 */
export function getFailingGates(game: Partial<Game>): string[] {
  const failing: string[] = [];

  if (game.hasNoInGameAds !== true) {
    failing.push('hasNoInGameAds');
  }
  if (game.hasRespectfulMonetization !== true) {
    failing.push('hasRespectfulMonetization');
  }
  if (game.hasNoContactWithStrangers !== true) {
    failing.push('hasNoContactWithStrangers');
  }
  if (game.hasNoManipulativeDesign !== true) {
    failing.push('hasNoManipulativeDesign');
  }
  if (game.isAgeAppropriate !== true) {
    failing.push('isAgeAppropriate');
  }

  return failing;
}
