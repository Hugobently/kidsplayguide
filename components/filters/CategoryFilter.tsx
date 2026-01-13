'use client';

import { CATEGORIES, CategoryKey } from '@/lib/config/categories';

interface CategoryFilterProps {
  selected: CategoryKey[];
  onChange: (selected: CategoryKey[]) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const toggleCategory = (categoryKey: CategoryKey) => {
    if (selected.includes(categoryKey)) {
      onChange(selected.filter((c) => c !== categoryKey));
    } else {
      onChange([...selected, categoryKey]);
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-text mb-3">Category</h3>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isSelected = selected.includes(category.key);

          return (
            <button
              key={category.key}
              onClick={() => toggleCategory(category.key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-muted hover:bg-gray-200'
              }`}
            >
              {category.icon} {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
