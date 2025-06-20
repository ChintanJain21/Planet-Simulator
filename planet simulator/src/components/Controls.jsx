import React from 'react';

const Controls = ({ isPaused, setIsPaused, speed, setSpeed }) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
      <div className="flex items-center gap-4 bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-lg px-6 py-3 rounded-2xl shadow-2xl border border-gray-700">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 font-medium"
        >
          <span className="text-lg">{isPaused ? '▶️' : '⏸️'}</span>
          {isPaused ? 'Play' : 'Pause'}
        </button>
        
        <div className="flex items-center gap-2 text-white">
          <span className="text-sm font-medium">Speed:</span>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-20 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-xs text-gray-300 w-8">{speed}x</span>
        </div>
      </div>
    </div>
  );
};

export default Controls;
