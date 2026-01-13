import Image from 'next/image';
import Link from 'next/link';
import { formatAgeRange, getAgeGroupInfo } from '@/lib/age-groups';
import { parseJsonArray, getAgeGradient } from '@/lib/utils';
import { BadgeWithDescription } from './BadgeDisplay';
import type { GameWithRelations } from '@/types';

interface GameDetailProps {
  game: GameWithRelations;
}

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-2xl ${
              i < Math.floor(rating)
                ? 'text-sunny'
                : i < rating
                ? 'text-sunny/50'
                : 'text-border'
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-xl font-bold text-text">{rating.toFixed(1)}</span>
    </div>
  );
}

export function GameDetail({ game }: GameDetailProps) {
  const ageLabel = formatAgeRange(game.minAge, game.maxAge);
  const ageInfo = getAgeGroupInfo(game.ageGroup);
  const ageGradient = getAgeGradient(game.ageGroup);

  const pros = parseJsonArray<string>(game.pros);
  const cons = parseJsonArray<string>(game.cons);
  const platforms = parseJsonArray<string>(game.platforms);

  const pricingLabel = {
    free: 'Free',
    'one-time': 'One-time Purchase',
    subscription: 'Subscription',
    freemium: 'Free with In-App Purchases',
  }[game.pricingModel] || game.pricingModel;

  return (
    <div className="space-y-10">
      {/* Breadcrumbs */}
      <nav className="text-sm">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="text-text-muted hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li className="text-text-light">/</li>
          <li>
            <Link href="/games" className="text-text-muted hover:text-primary transition-colors">
              Games
            </Link>
          </li>
          <li className="text-text-light">/</li>
          <li>
            <Link
              href={`/age/${game.ageGroup}`}
              className={`${ageInfo?.pillClass || ''} age-pill text-xs`}
            >
              <span>{ageInfo?.emoji}</span>
              <span>{ageInfo?.label}</span>
            </Link>
          </li>
          <li className="text-text-light">/</li>
          <li className="text-text font-medium truncate max-w-[200px]">{game.title}</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left - Image */}
        <div className="space-y-6">
          {/* Main Image */}
          <div className={`relative aspect-square rounded-4xl overflow-hidden shadow-soft-lg bg-gradient-to-br ${ageGradient}`}>
            {game.thumbnailUrl ? (
              <Image
                src={game.thumbnailUrl}
                alt={game.title}
                fill
                className="object-contain p-10"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-9xl animate-bounce-gentle">🎮</span>
              </div>
            )}

            {/* Editor's Choice Badge */}
            {game.editorChoice && (
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sunny to-coral text-white font-bold shadow-glow text-sm animate-float">
                  <span>⭐</span>
                  Editor&apos;s Choice
                </span>
              </div>
            )}

            {/* Featured Badge */}
            {game.featured && !game.editorChoice && (
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-white font-bold shadow-soft text-sm">
                  <span>✨</span>
                  Featured
                </span>
              </div>
            )}

            {/* Age Pill */}
            <div className="absolute top-6 left-6">
              <div className={`${ageInfo?.pillClass || 'age-pill-school'} age-pill px-4 py-2 shadow-soft`}>
                <span className="text-lg">{ageInfo?.emoji}</span>
                <span className="font-bold">{ageLabel}</span>
              </div>
            </div>
          </div>

          {/* Play Button */}
          <a
            href={game.gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-lg w-full justify-center text-lg"
          >
            <span className="text-xl">🎮</span>
            Play Now
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {/* Quick Stats - Mobile */}
          <div className="lg:hidden grid grid-cols-2 gap-3">
            <div className="card p-4 text-center">
              <span className="text-2xl mb-1 block">{ageInfo?.emoji}</span>
              <span className="text-xs text-text-muted">Age Group</span>
              <span className="block font-bold text-text">{ageLabel}</span>
            </div>
            <div className="card p-4 text-center">
              <span className="text-2xl mb-1 block">⭐</span>
              <span className="text-xs text-text-muted">Rating</span>
              <span className="block font-bold text-sunny">{game.rating.toFixed(1)}/5</span>
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className="space-y-6">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {game.categories.map(({ category }) => (
              <span
                key={category.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-50 text-primary text-sm font-semibold"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </span>
            ))}
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text mb-2">
              {game.title}
            </h1>
            {game.developerName && (
              <p className="text-text-muted text-lg">
                by <span className="font-semibold">{game.developerName}</span>
              </p>
            )}
          </div>

          {/* Rating - Desktop */}
          <div className="hidden lg:block">
            <StarRating rating={game.rating} />
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            <p className="text-text leading-relaxed">
              {game.description}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="card p-4">
              <span className="text-2xl mb-2 block">💰</span>
              <span className="text-xs text-text-muted block">Pricing</span>
              <span className={`font-bold ${game.pricingModel === 'free' ? 'text-secondary' : 'text-text'}`}>
                {pricingLabel}
              </span>
            </div>
            <div className="card p-4">
              <span className="text-2xl mb-2 block">⏱️</span>
              <span className="text-xs text-text-muted block">Session</span>
              <span className="font-bold text-text capitalize">{game.sessionLength}</span>
            </div>
            <div className="card p-4">
              <span className="text-2xl mb-2 block">📱</span>
              <span className="text-xs text-text-muted block">Platforms</span>
              <span className="font-bold text-text">{platforms.length} available</span>
            </div>
            <div className="card p-4">
              <span className="text-2xl mb-2 block">🎓</span>
              <span className="text-xs text-text-muted block">Skills</span>
              <span className="font-bold text-text">{game.skills.length} skills</span>
            </div>
          </div>

          {/* Platforms */}
          {platforms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-border-light text-text-muted text-sm font-medium"
                >
                  {platform === 'ios' && '📱 iOS'}
                  {platform === 'android' && '🤖 Android'}
                  {platform === 'web' && '🌐 Web'}
                  {platform === 'windows' && '💻 Windows'}
                  {platform === 'mac' && '🍎 Mac'}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* What Parents Should Know */}
          {game.parentInfo && (
            <div className="card p-6 bg-sky/5 border-sky/20">
              <h2 className="text-xl font-display font-bold text-text mb-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-sky/20 flex items-center justify-center">
                  <span className="text-xl">👨‍👩‍👧</span>
                </span>
                What Parents Should Know
              </h2>
              <p className="text-text-muted leading-relaxed">{game.parentInfo}</p>
            </div>
          )}

          {/* Pros & Cons */}
          {(pros.length > 0 || cons.length > 0) && (
            <div className="grid sm:grid-cols-2 gap-4">
              {pros.length > 0 && (
                <div className="card p-6 bg-secondary/5 border-secondary/20">
                  <h3 className="font-display font-bold text-secondary mb-4 flex items-center gap-2 text-lg">
                    <span className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                      👍
                    </span>
                    Pros
                  </h3>
                  <ul className="space-y-3">
                    {pros.map((pro, i) => (
                      <li key={`pro-${i}-${pro.slice(0, 20)}`} className="flex items-start gap-3 text-text">
                        <span className="text-secondary mt-0.5 text-lg">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {cons.length > 0 && (
                <div className="card p-6 bg-coral/5 border-coral/20">
                  <h3 className="font-display font-bold text-coral mb-4 flex items-center gap-2 text-lg">
                    <span className="w-8 h-8 rounded-lg bg-coral/20 flex items-center justify-center">
                      👎
                    </span>
                    Cons
                  </h3>
                  <ul className="space-y-3">
                    {cons.map((con, i) => (
                      <li key={`con-${i}-${con.slice(0, 20)}`} className="flex items-start gap-3 text-text">
                        <span className="text-coral mt-0.5 text-lg">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Why We Picked This Game */}
          {game.whyWePicked && (
            <div className="card p-6 bg-primary/5 border-primary/20">
              <h2 className="text-xl font-display font-bold text-text mb-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <span className="text-xl">💡</span>
                </span>
                Why We Picked This Game
              </h2>
              <p className="text-text-muted leading-relaxed">{game.whyWePicked}</p>
            </div>
          )}
        </div>

        {/* Sidebar - 1 col */}
        <div className="space-y-6">
          {/* Parent Tip */}
          {game.parentTip && (
            <div className="card p-6 bg-sunny/10 border-sunny/30">
              <h3 className="font-display font-bold text-sunny-dark mb-3 flex items-center gap-2">
                <span className="text-xl">💡</span>
                Parent Tip
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">{game.parentTip}</p>
            </div>
          )}

          {/* Skills Developed */}
          {game.skills.length > 0 && (
            <div className="card p-6">
              <h3 className="font-display font-bold text-text mb-4">Skills Developed</h3>
              <div className="flex flex-wrap gap-2">
                {game.skills.map(({ skill }) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary-50 text-primary text-sm font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Themes */}
          {game.themes.length > 0 && (
            <div className="card p-6">
              <h3 className="font-display font-bold text-text mb-4">Themes</h3>
              <div className="flex flex-wrap gap-2">
                {game.themes.map(({ theme }) => (
                  <span
                    key={theme.id}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium"
                  >
                    {theme.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Source */}
          {game.source && (
            <div className="card p-6">
              <h3 className="font-display font-bold text-text mb-2">Source</h3>
              <p className="text-text-muted text-sm">{game.source.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Badges Section */}
      <BadgeWithDescription game={game} />
    </div>
  );
}
