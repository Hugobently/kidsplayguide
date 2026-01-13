'use client';

import { useState, useEffect, useCallback } from 'react';
import { AGE_GROUPS, AgeGroupKey, AGE_GROUP_KEYS } from '@/lib/age-groups';
import { CategoryKey } from '@/lib/config/categories';
import { GameGrid } from '@/components/games/GameGrid';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { LoadMoreButton } from '@/components/ui/LoadMoreButton';
import { GameGridSkeleton } from '@/components/ui/Skeleton';
import type { GameWithCategories } from '@/types';
import { GAMES_PER_PAGE } from '@/lib/config/constants';

type PricingOption = 'all' | 'free' | 'paid';

export function GamesPageClient() {
  const [games, setGames] = useState<GameWithCategories[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedAge, setSelectedAge] = useState<AgeGroupKey | null>(null);
  const [categories, setCategories] = useState<CategoryKey[]>([]);
  const [pricing, setPricing] = useState<PricingOption>('all');
  const [search, setSearch] = useState('');

  const fetchGames = useCallback(
    async (reset = false) => {
      setError(null);
      const newOffset = reset ? 0 : offset;
      const params = new URLSearchParams();
      params.set('offset', newOffset.toString());
      params.set('limit', GAMES_PER_PAGE.toString());

      if (selectedAge) {
        params.set('ageGroups', selectedAge);
      }
      if (categories.length > 0) {
        params.set('categories', categories.join(','));
      }
      if (pricing !== 'all') {
        params.set('pricing', pricing);
      }
      if (search) {
        params.set('search', search);
      }

      try {
        const response = await fetch(`/api/games?${params.toString()}`);
        const data = await response.json();

        if (reset) {
          setGames(data.games);
          setOffset(GAMES_PER_PAGE);
        } else {
          setGames((prev) => [...prev, ...data.games]);
          setOffset((prev) => prev + GAMES_PER_PAGE);
        }
        setHasMore(data.hasMore);
        setTotalCount(data.total || data.games.length);
      } catch (err) {
        console.error('Failed to fetch games:', err);
        setError('Failed to load games. Please try again.');
      }
    },
    [offset, selectedAge, categories, pricing, search]
  );

  // Initial load and filter changes
  useEffect(() => {
    setLoading(true);
    setOffset(0);
    fetchGames(true).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAge, categories, pricing, search]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await fetchGames(false);
    setLoadingMore(false);
  };

  const clearFilters = () => {
    setSelectedAge(null);
    setCategories([]);
    setPricing('all');
    setSearch('');
  };

  const hasActiveFilters =
    selectedAge !== null || categories.length > 0 || pricing !== 'all' || search !== '';

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-coral/5 border-b border-border-light">
        <div className="container-page py-10 md:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <span>🎮</span>
              <span>Game Library</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-text mb-3">
              All Games
            </h1>
            <p className="text-text-muted text-lg">
              Browse our collection of safe, parent-approved games for kids ages 0-10.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8">
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Search for games..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-border-light text-text placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:border-transparent shadow-soft transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-border-light transition-colors"
                >
                  <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-8">
        {/* Age Filter Pills */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-text">Filter by age:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedAge(null)}
              className={`age-pill transition-all ${
                selectedAge === null
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-border-light text-text-muted hover:bg-border hover:text-text'
              }`}
            >
              <span>🎮</span>
              <span>All Ages</span>
            </button>
            {AGE_GROUP_KEYS.map((key) => {
              const group = AGE_GROUPS[key];
              const isSelected = selectedAge === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAge(isSelected ? null : key)}
                  className={`age-pill transition-all ${
                    isSelected
                      ? `${group.pillClass} shadow-soft`
                      : 'bg-border-light text-text-muted hover:bg-border hover:text-text'
                  }`}
                >
                  <span>{group.emoji}</span>
                  <span>{group.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-text">Pricing:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all' as const, label: 'All', icon: '📦' },
              { value: 'free' as const, label: 'Free', icon: '🆓' },
              { value: 'paid' as const, label: 'Paid', icon: '💳' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPricing(option.value)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  pricing === option.value
                    ? 'bg-secondary text-white shadow-soft'
                    : 'bg-border-light text-text-muted hover:bg-border hover:text-text'
                }`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter selected={categories} onChange={setCategories} />
        </div>

        {/* Active Filters & Results Count */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-border-light">
          <div className="flex items-center gap-4">
            <span className="text-text font-semibold">
              {loading ? 'Loading...' : `${totalCount || games.length} games found`}
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear all filters
              </button>
            )}
          </div>

          {/* Active filter tags */}
          {hasActiveFilters && (
            <div className="hidden md:flex items-center gap-2">
              {selectedAge && (
                <span className={`${AGE_GROUPS[selectedAge].pillClass} age-pill text-xs`}>
                  {AGE_GROUPS[selectedAge].emoji} {AGE_GROUPS[selectedAge].label}
                </span>
              )}
              {pricing !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary/10 text-secondary text-xs font-semibold">
                  {pricing === 'free' ? '🆓 Free' : '💳 Paid'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">Something went wrong</h3>
            <p className="text-text-muted mb-4">{error}</p>
            <button
              onClick={() => fetchGames(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <GameGridSkeleton count={8} />
        ) : !error && (
          <>
            <GameGrid
              games={games}
              emptyMessage="No games found matching your filters"
              emptyAction={{ label: 'Clear Filters', onClick: clearFilters }}
            />
            <LoadMoreButton
              onClick={handleLoadMore}
              loading={loadingMore}
              hasMore={hasMore}
            />
          </>
        )}
      </div>
    </div>
  );
}
