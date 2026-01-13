interface SkeletonProps {
  className?: string;
  variant?: 'pulse' | 'shimmer' | 'wave';
}

export function Skeleton({ className = '', variant = 'shimmer' }: SkeletonProps) {
  const variantClasses = {
    pulse: 'animate-pulse bg-gray-200',
    shimmer: 'skeleton-shimmer',
    wave: 'skeleton-wave bg-gray-200',
  };

  return (
    <div
      className={`rounded ${variantClasses[variant]} ${className}`}
    />
  );
}

export function GameCardSkeleton() {
  return (
    <div className="bg-surface rounded-2xl shadow-card border border-border-light overflow-hidden animate-fade-in">
      {/* Image area with age pill placeholder */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50">
        <Skeleton className="absolute inset-0 rounded-none" variant="shimmer" />
        {/* Age pill skeleton */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-7 w-20 rounded-full" variant="shimmer" />
        </div>
        {/* Badge skeleton */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-8 w-8 rounded-full" variant="shimmer" />
        </div>
      </div>

      {/* Content area */}
      <div className="p-4 space-y-3">
        {/* Title and rating row */}
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-3/4" variant="shimmer" />
          <Skeleton className="h-5 w-10 rounded-md" variant="shimmer" />
        </div>

        {/* Developer name */}
        <Skeleton className="h-3 w-1/3" variant="shimmer" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" variant="shimmer" />
          <Skeleton className="h-4 w-4/5" variant="shimmer" />
        </div>

        {/* Category icons */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-8 rounded-lg" variant="shimmer" />
          <Skeleton className="h-8 w-8 rounded-lg" variant="shimmer" />
          <Skeleton className="h-8 w-8 rounded-lg" variant="shimmer" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border-light">
          <div className="flex gap-1">
            <Skeleton className="h-5 w-5 rounded" variant="shimmer" />
            <Skeleton className="h-5 w-5 rounded" variant="shimmer" />
          </div>
          <Skeleton className="h-5 w-14 rounded-md" variant="shimmer" />
        </div>
      </div>
    </div>
  );
}

export function GameCardCompactSkeleton() {
  return (
    <div className="bg-surface rounded-2xl shadow-card border border-border-light overflow-hidden animate-fade-in">
      {/* Square image area */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-50">
        <Skeleton className="absolute inset-0 rounded-none" variant="shimmer" />
        {/* Age pill */}
        <div className="absolute top-2 left-2">
          <Skeleton className="h-6 w-16 rounded-full" variant="shimmer" />
        </div>
        {/* Rating overlay */}
        <div className="absolute bottom-2 right-2">
          <Skeleton className="h-6 w-12 rounded-lg" variant="shimmer" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" variant="shimmer" />
        <Skeleton className="h-3 w-1/2" variant="shimmer" />
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-1">
            <Skeleton className="h-5 w-5 rounded" variant="shimmer" />
            <Skeleton className="h-5 w-5 rounded" variant="shimmer" />
          </div>
          <Skeleton className="h-4 w-10 rounded" variant="shimmer" />
        </div>
      </div>
    </div>
  );
}

export function GameGridSkeleton({ count = 8, compact = false }: { count?: number; compact?: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        compact ? <GameCardCompactSkeleton key={i} /> : <GameCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function GameDetailSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image */}
        <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
          <Skeleton className="absolute inset-0 rounded-none" variant="shimmer" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* Title */}
          <Skeleton className="h-10 w-3/4" variant="shimmer" />

          {/* Badges row */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-24 rounded-full" variant="shimmer" />
            <Skeleton className="h-7 w-20 rounded-full" variant="shimmer" />
            <Skeleton className="h-7 w-16 rounded-full" variant="shimmer" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-32" variant="shimmer" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" variant="shimmer" />
            <Skeleton className="h-4 w-full" variant="shimmer" />
            <Skeleton className="h-4 w-3/4" variant="shimmer" />
          </div>

          {/* CTA Button */}
          <Skeleton className="h-12 w-40 rounded-xl mt-6" variant="shimmer" />
        </div>
      </div>

      {/* Info sections */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" variant="shimmer" />
          <Skeleton className="h-4 w-full" variant="shimmer" />
          <Skeleton className="h-4 w-full" variant="shimmer" />
          <Skeleton className="h-4 w-2/3" variant="shimmer" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" variant="shimmer" />
          <Skeleton className="h-4 w-full" variant="shimmer" />
          <Skeleton className="h-4 w-full" variant="shimmer" />
          <Skeleton className="h-4 w-2/3" variant="shimmer" />
        </div>
      </div>
    </div>
  );
}
