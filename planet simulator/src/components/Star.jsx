import React from 'react';

const Star = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 rounded-full shadow-2xl animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-transparent rounded-full opacity-60"></div>
        <div className="absolute inset-2 bg-gradient-to-br from-white to-transparent rounded-full opacity-30"></div>
      </div>
      {/* Sun rays */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" style={{animationDuration: '20s'}}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-8 bg-gradient-to-t from-yellow-400 to-transparent opacity-40"
            style={{
              transform: `rotate(${i * 45}deg)`,
              transformOrigin: '50% 24px'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Star;
