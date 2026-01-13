'use client';

type PricingOption = 'all' | 'free' | 'paid';

interface PricingFilterProps {
  selected: PricingOption;
  onChange: (selected: PricingOption) => void;
}

const OPTIONS: { value: PricingOption; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
];

export function PricingFilter({ selected, onChange }: PricingFilterProps) {
  return (
    <div>
      <h3 className="font-semibold text-text mb-3">Pricing</h3>
      <div className="flex rounded-lg border border-border overflow-hidden">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-all ${
              selected === option.value
                ? 'bg-primary text-white'
                : 'bg-surface text-text-muted hover:bg-gray-50'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
