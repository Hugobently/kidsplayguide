import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="container-page py-16 flex flex-col items-center justify-center text-center">
      <span className="text-8xl mb-6">🎮</span>
      <h1 className="text-4xl font-bold text-text mb-4">Page Not Found</h1>
      <p className="text-text-muted text-lg mb-8 max-w-md">
        Oops! This page doesn&apos;t exist or has been removed.
        Let&apos;s get you back to finding great games for kids.
      </p>
      <div className="flex gap-4">
        <Button href="/" variant="primary">
          Go Home
        </Button>
        <Button href="/games" variant="outline">
          Browse Games
        </Button>
      </div>
    </div>
  );
}
