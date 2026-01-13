import { Game } from '@prisma/client';

interface ForParentsPanelProps {
  game: Game;
}

export function ForParentsPanel({ game }: ForParentsPanelProps) {
  const platforms = JSON.parse(game.platforms || '["web"]') as string[];

  const getPricingText = () => {
    switch (game.pricingModel) {
      case 'free':
        return 'Free to play';
      case 'one-time':
        return game.pricingNote || 'One-time purchase required';
      case 'subscription':
        return game.pricingNote || 'Subscription required';
      case 'freemium':
        return game.pricingNote || 'Free with optional purchases';
      default:
        return game.pricingNote || game.pricingModel;
    }
  };

  const getConnectivityText = () => {
    if (game.worksOffline) return 'Works offline';
    if (game.requiresInternet) return 'Requires internet connection';
    return 'Internet may be required';
  };

  const getLanguageText = () => {
    switch (game.audioLanguage) {
      case 'none':
        return 'No language needed';
      case 'english':
        return 'English audio';
      case 'multiple':
        return 'Multiple languages available';
      default:
        return game.requiresLanguageUnderstanding ? 'Language understanding needed' : 'No language needed';
    }
  };

  const getSessionText = () => {
    switch (game.sessionLength) {
      case 'quick':
        return 'Quick sessions (1-5 min)';
      case 'medium':
        return 'Medium sessions (5-15 min)';
      case 'long':
        return 'Longer sessions (15+ min)';
      default:
        return 'Varies';
    }
  };

  const infoItems = [
    {
      icon: '💰',
      label: 'Price',
      value: getPricingText(),
      highlight: game.pricingModel === 'free',
    },
    {
      icon: '🔑',
      label: 'Account',
      value: game.requiresAccount
        ? game.accountNote || 'Account required'
        : 'No account needed',
    },
    {
      icon: '📱',
      label: 'Platforms',
      value: platforms.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(', '),
    },
    {
      icon: '🌐',
      label: 'Connectivity',
      value: getConnectivityText(),
    },
    {
      icon: '🗣️',
      label: 'Language',
      value: getLanguageText(),
    },
    {
      icon: '⏱️',
      label: 'Session Length',
      value: getSessionText(),
    },
  ];

  // Add optional items
  if (game.supportsMultipleProfiles) {
    infoItems.push({
      icon: '👨‍👩‍👧‍👦',
      label: 'Profiles',
      value: 'Supports multiple child profiles',
      highlight: false,
    });
  }

  if (game.hasLeaderboards) {
    infoItems.push({
      icon: '🏆',
      label: 'Leaderboards',
      value: 'Has leaderboards (anonymous)',
      highlight: false,
    });
  }

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
        <span>👨‍👩‍👧</span>
        For Parents
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {infoItems.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <span className="text-xl">{item.icon}</span>
            <div>
              <p className="text-sm text-text-muted">{item.label}</p>
              <p className={`font-medium ${item.highlight ? 'text-success' : 'text-text'}`}>
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {game.parentTip && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-text-muted">
            <span className="font-medium">Tip:</span> {game.parentTip}
          </p>
        </div>
      )}
    </div>
  );
}
