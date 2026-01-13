import { db } from './db';

/**
 * Generate a URL-friendly slug from a title.
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Ensure a slug is unique by appending a number if necessary.
 */
export async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await db.game.findUnique({
      where: { slug },
      select: { id: true },
    });

    // If no existing game with this slug, or it's the same game we're updating
    if (!existing || existing.id === excludeId) {
      return slug;
    }

    // Try next slug
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

/**
 * Generate and ensure a unique slug from a title.
 */
export async function generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
  const baseSlug = generateSlug(title);
  return ensureUniqueSlug(baseSlug, excludeId);
}
