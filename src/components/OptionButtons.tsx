import React, { useState } from 'react';
import { Film, Image, LayoutGrid, Images } from 'lucide-react';

type StatsType = 'carousel' | 'reels' | 'static' | 'story';
type ColorType = 'rose' | 'blue' | 'emerald' | 'purple';

interface OptionButtonsProps {
  setActiveOption: (option: StatsType) => void;
}

const OptionButtons: React.FC<OptionButtonsProps> = ({ setActiveOption }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const options = [
    { id: 'reels', icon: Film, label: 'Reels', color: 'rose' as ColorType },
    { id: 'static', icon: Image, label: 'Static Image', color: 'blue' as ColorType },
    { id: 'story', icon: LayoutGrid, label: 'Story', color: 'emerald' as ColorType },
    { id: 'carousel', icon: Images, label: 'Carousel', color: 'purple' as ColorType },
  ];

  return (
    <>
      <div className="flex flex-col space-y-3">
        {options.map((option) => {
          const Icon = option.icon;
          const isHovered = hoveredId === option.id;
          const colorClasses: Record<ColorType, string> = {
            rose: `hover:bg-rose-50 hover:border-rose-500 hover:text-rose-600 ${isHovered ? 'scale-105 -translate-x-1' : ''}`,
            blue: `hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 ${isHovered ? 'scale-105 -translate-x-1' : ''}`,
            emerald: `hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-600 ${isHovered ? 'scale-105 -translate-x-1' : ''}`,
            purple: `hover:bg-purple-50 hover:border-purple-500 hover:text-purple-600 ${isHovered ? 'scale-105 -translate-x-1' : ''}`
          };

          return (
            <button
              key={option.id}
              className={`w-48 px-4 py-3 border-2 border-gray-200 rounded-lg shadow-sm transition-all duration-300 ease-in-out flex items-center space-x-3 font-medium bg-white hover:shadow-md ${colorClasses[option.color]}`}
              onMouseEnter={() => {
                setHoveredId(option.id);
                setActiveOption(option.id as StatsType);
              }}
              onMouseLeave={() => setHoveredId(null)}
              suppressHydrationWarning
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`} />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default OptionButtons;