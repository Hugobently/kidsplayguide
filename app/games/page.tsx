import { Metadata } from 'next';
import { GamesPageClient } from './GamesPageClient';

export const metadata: Metadata = {
  title: 'All Games',
  description: 'Browse all safe, parent-approved games for kids ages 0-10. Filter by age group, category, and pricing.',
};

export default function GamesPage() {
  return <GamesPageClient />;
}
