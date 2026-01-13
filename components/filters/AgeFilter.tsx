'use client';

import { AGE_GROUPS, AgeGroupKey } from '@/lib/age-groups';

interface AgeFilterProps {
  selected: AgeGroupKey[];
  onChange: (selected: AgeGroupKey[]) => void;
}

export function AgeFilter({ selected, onChange }: AgeFilterProps) {
  const toggleAge = (ageKey: AgeGroupKey) => {
    if (selected.includes(ageKey)) {
      onChange(selected.filter((a) => a !== ageKey));
    } else {
      onChange([...selected, ageKey]);
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-text mb-3">Age Group</h3>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(AGE_GROUPS) as AgeGroupKey[]).map((key) => {
          const group = AGE_GROUPS[key];
          const isSelected = selected.includes(key);

          return (
            <button
              key={key}
              onClick={() => toggleAge(key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? 'text-text ring-2 ring-text'
                  : 'text-text-muted hover:ring-1 hover:ring-gray-300'
              }`}
              style={{
                backgroundColor: isSelected ? group.colorHex : `${group.colorHex}40`,
              }}
            >
              {group.label} ({group.key})
            </button>
          );
        })}
      </div>
    </div>
  );
}
