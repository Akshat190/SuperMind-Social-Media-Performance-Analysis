import React from 'react';

type StatsType = 'carousel' | 'reels' | 'static' | 'story';

interface StatsGraphProps {
  activeOption: StatsType;
}

// Define the stats for each type
const statsData: Record<StatsType, { likes: number; comments: number; shares: number; engagement: number }> = {
  carousel: {
    likes: 77.9,
    comments: 89.2,
    shares: 97.4,
    engagement: 78.8,
  },
  reels: {
    likes: 94.9,
    comments: 91.6,
    shares: 80.7,
    engagement: 94.8,
  },
  static: {
    likes: 72.1,
    comments: 83.0,
    shares: 68.5,
    engagement: 82.9,
  },
  story: {
    likes: 98.0,
    comments: 94.1,
    shares: 84.1,
    engagement: 99.99,
  },
};

const StatsGraph = ({ activeOption }: StatsGraphProps) => {
  const getGraphData = () => {
    const data = statsData[activeOption];
    return [
      { label: 'Likes', value: data.likes, color: '#FF7E67' },
      { label: 'Comments', value: data.comments, color: '#00B8A9' },
      { label: 'Shares', value: data.shares, color: '#8A2BE2' },
      { label: 'Engagement', value: data.engagement, color: '#F8B195' },
    ];
  };

  const graphData = getGraphData();

  return (
    <div className="p-6 w-[450px] bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        Metrics Overview
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {graphData.map((item) => (
          <div
            key={item.label}
            className="relative group"
          >
            <div className="hex-container transform hover:scale-105 transition-all duration-300">
              <div
                className="hex-content relative overflow-hidden"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: `linear-gradient(45deg, ${item.color}22, ${item.color}44)`,
                  aspectRatio: '1',
                }}
              >
                <div
                  className="absolute bottom-0 left-0 w-full transition-all duration-500"
                  style={{
                    height: `${item.value}%`,
                    background: `linear-gradient(180deg, ${item.color}88, ${item.color})`,
                  }}
                />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <span className="text-2xl font-bold text-gray-800">
                    {item.value.toFixed(1)}%
                  </span>
                  <span className="text-sm font-medium text-gray-600 mt-1">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-1 -right-1 w-full h-full -z-10"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: item.color,
                opacity: 0.2,
                transform: 'scale(1.02)',
              }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .hex-container {
          width: 100%;
          position: relative;
        }
        .hex-content {
          width: 100%;
          height: 100%;
          transition: all 0.3s ease;
        }
        .hex-container:hover .hex-content {
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
};

export default StatsGraph;
