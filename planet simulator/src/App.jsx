import React, { useState } from 'react';
import OrbitCanvas from './components/OrbitCanvas';
import Controls from './components/Controls';
import PlanetManager from './components/PlanetManager';

const App = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [selectedPlanetName, setSelectedPlanetName] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [speed, setSpeed] = useState(1);

  const [planets, setPlanets] = useState([
    { name: 'Mercury', color: '#8c7853', size: 8, orbitRadius: 80, orbitalSpeed: 0.015 },
    { name: 'Venus', color: '#ffc649', size: 10, orbitRadius: 120, orbitalSpeed: 0.012 },
    { name: 'Earth', color: '#3b82f6', size: 12, orbitRadius: 160, orbitalSpeed: 0.01 },
    { name: 'Mars', color: '#ef4444', size: 10, orbitRadius: 200, orbitalSpeed: 0.008 },
    { name: 'Jupiter', color: '#fbbf24', size: 22, orbitRadius: 280, orbitalSpeed: 0.006 },
    { name: 'Saturn', color: '#fab96f', size: 18, orbitRadius: 340, orbitalSpeed: 0.004 },
  ]);

  return (
    <div className={`${isDark ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} w-full h-screen overflow-hidden relative transition-all duration-700`}>
      {/* Enhanced Header */}
      <header className="absolute top-6 left-6 z-20">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          🌌 Planet Orbit Simulator
        </h1>
        <p className="text-sm text-gray-400 mt-1">Interactive solar system simulation</p>
      </header>

      {/* Enhanced Theme Toggle */}
      <button
        className="absolute top-6 right-6 z-30 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 border border-gray-600"
        onClick={() => setIsDark(!isDark)}
      >
        <span className="mr-2">{isDark ? '🌞' : '🌙'}</span>
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Enhanced Add Planet Button */}
      {!selectedPlanetName && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="absolute top-24 left-6 z-30 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-xl font-medium shadow-lg transition-all duration-200 transform hover:scale-105 border border-blue-500/50"
        >
          <span className="mr-2">➕</span>
          Add Planet
        </button>
      )}

      {/* Enhanced Controls */}
      <Controls isPaused={isPaused} setIsPaused={setIsPaused} speed={speed} setSpeed={setSpeed} />

      {/* Planet Manager */}
      {(showForm || selectedPlanetName) && (
        <PlanetManager
          planets={planets}
          setPlanets={setPlanets}
          selectedPlanetName={selectedPlanetName}
          setSelectedPlanetName={setSelectedPlanetName}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}

      {/* Enhanced Simulation Area */}
      <main className="w-full h-full flex items-center justify-center p-8">
        <OrbitCanvas
          planets={planets}
          isPaused={isPaused}
          setSelectedPlanetName={setSelectedPlanetName}
          speed={speed}
        />
      </main>

      {/* Instructions */}
      <div className="absolute bottom-6 right-6 z-20 bg-gray-900/80 backdrop-blur-sm text-white p-4 rounded-xl shadow-lg border border-gray-700 max-w-xs">
        <h3 className="font-semibold mb-2 text-blue-400">Controls:</h3>
        <ul className="text-xs space-y-1 text-gray-300">
          <li>• Click planets to edit them</li>
          <li>• Use mouse wheel to zoom</li>
          <li>• Drag to pan around</li>
          <li>• Adjust speed with slider</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
