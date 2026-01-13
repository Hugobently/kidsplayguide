'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Game, Category, GameCategory } from '@prisma/client';
import { formatAgeRange, getAgeGroupInfo } from '@/lib/age-groups';

type GameWithCategories = Game & {
  categories: (GameCategory & { category: Category })[];
};

interface GameCardProps {
  game: GameWithCategories;
  size?: 'default' | 'large';
}

// Get age pill class based on age group
function getAgePillClass(ageGroup: string): string {
  const pillClasses: Record<string, string> = {
    '0-2': 'age-pill-baby',
    '2-4': 'age-pill-toddler',
    '4-6': 'age-pill-preschool',
    '6-8': 'age-pill-school',
    '8-10': 'age-pill-tween',
  };
  return pillClasses[ageGroup] || 'age-pill-school';
}

// Get gradient background for card based on age group
function getAgeGradient(ageGroup: string): string {
  const gradients: Record<string, string> = {
    '0-2': 'from-pink-100 to-rose-50',
    '2-4': 'from-amber-100 to-yellow-50',
    '4-6': 'from-emerald-100 to-green-50',
    '6-8': 'from-blue-100 to-sky-50',
    '8-10': 'from-purple-100 to-violet-50',
  };
  return gradients[ageGroup] || 'from-gray-100 to-gray-50';
}

// Helper to parse JSON arrays
function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

// Category-aware fallback with beautiful gradients
function FallbackImage({ categoryKey, size = 'default' }: { categoryKey?: string; size?: 'default' | 'compact' }) {
  const fallbacks: Record<string, { emoji: string; gradient: string }> = {
    learning: { emoji: '📚', gradient: 'from-blue-200 via-indigo-100 to-purple-100' },
    puzzle: { emoji: '🧩', gradient: 'from-purple-200 via-pink-100 to-rose-100' },
    creative: { emoji: '🎨', gradient: 'from-amber-200 via-orange-100 to-yellow-100' },
    adventure: { emoji: '🗺️', gradient: 'from-emerald-200 via-teal-100 to-cyan-100' },
    music: { emoji: '🎵', gradient: 'from-pink-200 via-rose-100 to-red-100' },
    matching: { emoji: '🔍', gradient: 'from-cyan-200 via-sky-100 to-blue-100' },
    coloring: { emoji: '🖌️', gradient: 'from-red-200 via-pink-100 to-orange-100' },
    counting: { emoji: '🔢', gradient: 'from-violet-200 via-purple-100 to-indigo-100' },
  };

  const fallback = fallbacks[categoryKey || ''] || { emoji: '🎮', gradient: 'from-gray-200 via-gray-100 to-white' };
  const emojiSize = size === 'compact' ? 'text-4xl' : 'text-6xl';

  return (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${fallback.gradient}`}>
      <div className="relative">
        <span className={`${emojiSize} animate-bounce-gentle drop-shadow-lg`}>{fallback.emoji}</span>
        <div className="absolute -inset-6 bg-white/30 rounded-full blur-2xl" />
      </div>
    </div>
  );
}

// Loading shimmer placeholder
function ImageShimmer() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-20 h-20 skeleton-shimmer rounded-2xl" />
    </div>
  );
}

export function GameCard({ game, size = 'default' }: GameCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const ageLabel = formatAgeRange(game.minAge, game.maxAge);
  const ageInfo = getAgeGroupInfo(game.ageGroup);
  const agePillClass = getAgePillClass(game.ageGroup);
  const ageGradient = getAgeGradient(game.ageGroup);
  const platforms = parseJsonArray(game.platforms);
  const primaryCategory = game.categories[0]?.category?.key;

  const pricingConfig = {
    free: { label: 'Free', class: 'text-secondary font-bold' },
    'one-time': { label: 'Paid', class: 'text-text-muted' },
    subscription: { label: 'Sub', class: 'text-coral' },
    freemium: { label: 'Free+', class: 'text-secondary' },
  };
  const pricing = pricingConfig[game.pricingModel as keyof typeof pricingConfig] || { label: game.pricingModel, class: 'text-text-muted' };

  const isLarge = size === 'large';

  return (
    <Link href={`/games/${game.slug}`} className="block group h-full">
      <article className={`card-interactive h-full flex flex-col hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-300 ${isLarge ? 'md:flex-row' : ''}`}>
        {/* Thumbnail Section */}
        <div className={`relative overflow-hidden bg-gradient-to-br ${ageGradient} ${isLarge ? 'md:w-2/5' : ''}`}>
          <div className={`aspect-[4/3] ${isLarge ? 'md:aspect-square' : ''} relative`}>
            {/* Loading shimmer */}
            {!imageLoaded && !imageError && game.thumbnailUrl && (
              <ImageShimmer />
            )}

            {/* Image or Fallback */}
            {game.thumbnailUrl && !imageError ? (
              <Image
                src={game.thumbnailUrl}
                alt={game.title}
                fill
                className={`object-contain p-6 transition-all duration-500 ${
                  imageLoaded
                    ? 'opacity-100 group-hover:scale-110'
                    : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <FallbackImage categoryKey={primaryCategory} />
            )}
          </div>

          {/* Age Pill - Top Left */}
          <div className={`absolute top-3 left-3 ${agePillClass} age-pill shadow-soft`}>
            <span>{ageInfo?.emoji || '🎮'}</span>
            <span>{ageLabel}</span>
          </div>

          {/* Editor's Choice Badge - Top Right */}
          {game.editorChoice && (
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sunny to-coral flex items-center justify-center shadow-soft animate-float group-hover:animate-wiggle">
                <span className="text-sm">⭐</span>
              </div>
            </div>
          )}

          {/* Featured Badge */}
          {game.featured && !game.editorChoice && (
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center shadow-soft group-hover:shadow-glow-sm transition-shadow">
                <span className="text-sm">✨</span>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className={`p-5 flex flex-col flex-grow ${isLarge ? 'md:w-3/5 md:p-6' : ''}`}>
          {/* Title Row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className={`font-display font-semibold text-text group-hover:text-primary transition-colors line-clamp-2 ${isLarge ? 'text-xl' : 'text-base'}`}>
              {game.title}
            </h3>
            {game.rating > 0 && (
              <div className="flex items-center gap-1 shrink-0 bg-sunny/20 px-2 py-1 rounded-lg group-hover:bg-sunny/30 transition-colors">
                <span className="text-sunny text-sm">★</span>
                <span className="text-sm font-bold text-text">{game.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Developer */}
          {game.developerName && (
            <p className="text-xs text-text-muted mb-3 font-medium">
              by {game.developerName}
            </p>
          )}

          {/* Description - Only show on large cards or limit on small */}
          <p className={`text-sm text-text-muted mb-4 flex-grow ${isLarge ? 'line-clamp-3' : 'line-clamp-2'}`}>
            {game.shortDescription || 'A fun learning adventure for kids!'}
          </p>

          {/* Categories as subtle icons */}
          {game.categories.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              {game.categories.slice(0, 3).map(({ category }) => (
                <span
                  key={category.id}
                  className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center text-sm hover:bg-primary-100 hover:scale-110 transition-all cursor-default"
                  title={category.name}
                >
                  {category.icon}
                </span>
              ))}
              {game.categories.length > 3 && (
                <span className="text-xs text-text-muted font-medium">
                  +{game.categories.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer - Clean and minimal */}
          <div className="flex items-center justify-between pt-3 border-t border-border-light">
            {/* Platform Icons */}
            <div className="flex items-center gap-1.5">
              {platforms.slice(0, 3).map((platform) => (
                <span
                  key={platform}
                  className="text-xs text-text-muted hover:scale-110 transition-transform"
                  title={platform}
                >
                  {platform === 'ios' && '📱'}
                  {platform === 'android' && '🤖'}
                  {platform === 'web' && '🌐'}
                  {platform === 'windows' && '💻'}
                  {platform === 'mac' && '🍎'}
                </span>
              ))}
            </div>

            {/* Pricing */}
            <span className={`text-xs font-semibold ${pricing.class}`}>
              {pricing.label}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Compact version for grids - mobile optimized
export function GameCardCompact({ game }: { game: GameWithCategories }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const ageGradient = getAgeGradient(game.ageGroup);
  const primaryCategory = game.categories[0]?.category?.key;

  return (
    <Link href={`/games/${game.slug}`} className="block group">
      <article className="card-interactive hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
        <div className={`relative aspect-square overflow-hidden bg-gradient-to-br ${ageGradient} rounded-t-2xl`}>
          {/* Loading shimmer */}
          {!imageLoaded && !imageError && game.thumbnailUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 skeleton-shimmer rounded-xl" />
            </div>
          )}

          {game.thumbnailUrl && !imageError ? (
            <Image
              src={game.thumbnailUrl}
              alt={game.title}
              fill
              className={`object-contain p-3 md:p-4 transition-all duration-300 ${
                imageLoaded
                  ? 'opacity-100 group-hover:scale-105'
                  : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <FallbackImage categoryKey={primaryCategory} size="compact" />
          )}

          {/* Rating overlay */}
          {game.rating > 0 && (
            <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 bg-white/90 backdrop-blur-sm px-1 py-0.5 rounded text-2xs md:text-xs shadow-sm group-hover:bg-white transition-colors">
              <span className="text-sunny">★</span>
              <span className="font-bold">{game.rating.toFixed(1)}</span>
            </div>
          )}

          {/* Editor's Choice */}
          {game.editorChoice && (
            <div className="absolute top-1.5 right-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-sunny to-coral flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <span className="text-2xs md:text-xs">⭐</span>
            </div>
          )}
        </div>

        <div className="p-2 md:p-3">
          <h3 className="font-semibold text-xs md:text-sm text-text group-hover:text-primary transition-colors line-clamp-1">
            {game.title}
          </h3>
          <p className="text-2xs md:text-xs text-text-muted mt-0.5">
            {game.pricingModel === 'free' ? (
              <span className="text-secondary font-semibold">Free</span>
            ) : (
              <span className="line-clamp-1">{game.developerName || 'Fun for kids'}</span>
            )}
          </p>
        </div>
      </article>
    </Link>
  );
}
