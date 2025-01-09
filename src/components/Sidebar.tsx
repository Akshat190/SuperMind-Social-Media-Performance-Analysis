import React, { useState } from 'react';
import { LayoutGrid, Image, Film, Images } from 'lucide-react';

interface SidebarProps {
  setActiveOption: (option: string) => void;
}

const Sidebar = ({ setActiveOption }: SidebarProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const options = [
    { id: 'reels', icon: Film, label: 'Reels', gradient: 'from-rose-500 to-orange-500' },
    { id: 'static', icon: Image, label: 'Static Image', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'story', icon: LayoutGrid, label: 'Story', gradient: 'from-emerald-500 to-teal-500' },
    { id: 'carousel', icon: Images, label: 'Carousel', gradient: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="w-64 bg-gray-50/50 backdrop-blur-xl p-4 rounded-2xl border border-gray-100">
      <div className="space-y-2">
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = activeId === option.id;

          return (
            <button
              key={option.id}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300
                ${isActive ? `bg-gradient-to-r ${option.gradient} shadow-lg scale-105` : 'hover:bg-white hover:shadow-md'}`}
              onMouseEnter={() => {
                setActiveId(option.id);
                setActiveOption(option.id);
              }}
              onMouseLeave={() => setActiveId(null)}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-700'}`} />
              <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;