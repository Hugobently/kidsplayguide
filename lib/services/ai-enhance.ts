import Anthropic from '@anthropic-ai/sdk';
import { Game, GameSource, Category, Skill, Theme, GameCategory, GameSkill, GameTheme } from '@prisma/client';
import { db } from '../db';

type GameWithRelations = Game & {
  source: GameSource | null;
  categories: (GameCategory & { category: Category })[];
  skills: (GameSkill & { skill: Skill })[];
  themes: (GameTheme & { theme: Theme })[];
};

interface EnhancementResult {
  shortDescription: string;
  whyWePicked: string;
  badgeEducational: boolean;
  badgeCreative: boolean;
  badgePopular: boolean;
  badgePolished: boolean;
}

const anthropic = new Anthropic();

const SYSTEM_PROMPT = `You are a content writer for KidsPlayGuide, a website that curates safe games for children ages 0-10.

Your task is to write parent-friendly descriptions for games. Follow these rules:

STYLE GUIDELINES:
- Write like a friend recommending a game to another parent
- Be specific about what the child actually DOES in the game
- Mention concrete gameplay ("drag animals to their homes", "tap to make music")
- Keep descriptions short and scannable
- Mention any caveats (requires subscription, needs an account, etc.)

ANTI-SLOP RULES - NEVER use:
- Empty superlatives: "amazing", "incredible", "best ever", "fantastic"
- Buzzwords: "engaging", "interactive", "immersive", "fun-filled", "delightful"
- Marketing speak: "Kids will love...", "Hours of entertainment..."
- Generic claims: "Educational and fun!", "Perfect for learning!"

GOOD EXAMPLE:
"Kids help Elmo sort shapes and colors. Simple touch controls that work well for small fingers. No text needed - perfect for pre-readers."

BAD EXAMPLE:
"This amazing educational game offers hours of interactive fun! Kids will love helping their favorite Sesame Street characters in this engaging learning adventure!"

For the "Why We Picked" section:
- Max 2-3 sentences
- Explain what makes this specific game good
- Mention the age suitability
- Include any practical notes (subscription required, works offline, etc.)

For badges, analyze the game and suggest which apply:
- Educational: Strong learning value, teaches specific skills
- Creative: Encourages creativity, open-ended play, art/music creation
- Popular: Well-known characters or highly regarded in the genre
- Polished: High production quality, smooth experience

Return your response as JSON only.`;

export async function enhanceGame(game: GameWithRelations): Promise<EnhancementResult | null> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('ANTHROPIC_API_KEY not set, skipping AI enhancement');
    return null;
  }

  const categories = game.categories.map((gc) => gc.category.name).join(', ');
  const skills = game.skills.map((gs) => gs.skill.name).join(', ');
  const themes = game.themes.map((gt) => gt.theme.name).join(', ');

  const prompt = `Enhance this game listing:

TITLE: ${game.title}
SOURCE: ${game.source?.name || 'Unknown'}
AGE RANGE: ${game.minAge}-${game.maxAge} years
CATEGORIES: ${categories || 'None specified'}
SKILLS: ${skills || 'None specified'}
THEMES: ${themes || 'None specified'}
CURRENT DESCRIPTION: ${game.description || 'No description'}
PRICING: ${game.pricingModel}${game.pricingNote ? ` (${game.pricingNote})` : ''}
REQUIRES ACCOUNT: ${game.requiresAccount ? 'Yes' : 'No'}
WORKS OFFLINE: ${game.worksOffline ? 'Yes' : 'No'}

Provide:
1. shortDescription: 1-2 sentences for the game card (max 150 chars)
2. whyWePicked: 2-3 sentences explaining why this game is included
3. badgeEducational: true/false
4. badgeCreative: true/false
5. badgePopular: true/false
6. badgePolished: true/false

Return ONLY valid JSON, no markdown, no explanation:
{"shortDescription": "...", "whyWePicked": "...", "badgeEducational": bool, "badgeCreative": bool, "badgePopular": bool, "badgePolished": bool}`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    // Parse JSON from response
    const result = JSON.parse(content.text) as EnhancementResult;

    // Validate result
    if (
      typeof result.shortDescription !== 'string' ||
      typeof result.whyWePicked !== 'string' ||
      typeof result.badgeEducational !== 'boolean' ||
      typeof result.badgeCreative !== 'boolean' ||
      typeof result.badgePopular !== 'boolean' ||
      typeof result.badgePolished !== 'boolean'
    ) {
      throw new Error('Invalid response structure');
    }

    return result;
  } catch (error) {
    console.error(`Failed to enhance game ${game.title}:`, error);
    return null;
  }
}

export async function enhanceAllGames(): Promise<{ enhanced: number; failed: number }> {
  const games = await db.game.findMany({
    where: {
      OR: [
        { shortDescription: null },
        { whyWePicked: null },
      ],
    },
    include: {
      source: true,
      categories: { include: { category: true } },
      skills: { include: { skill: true } },
      themes: { include: { theme: true } },
    },
  });

  let enhanced = 0;
  let failed = 0;

  for (const game of games) {
    console.log(`Enhancing: ${game.title}...`);

    const result = await enhanceGame(game);

    if (result) {
      await db.game.update({
        where: { id: game.id },
        data: {
          shortDescription: result.shortDescription,
          whyWePicked: result.whyWePicked,
          badgeEducational: result.badgeEducational,
          badgeCreative: result.badgeCreative,
          badgePopular: result.badgePopular,
          badgePolished: result.badgePolished,
        },
      });

      await db.curationLog.create({
        data: {
          gameId: game.id,
          action: 'enhanced',
          source: 'ai',
          details: JSON.stringify(result),
          success: true,
        },
      });

      enhanced++;
      console.log(`  ✓ Enhanced`);
    } else {
      failed++;
      console.log(`  ✗ Failed`);
    }

    // Rate limiting - wait 1 second between requests
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return { enhanced, failed };
}
