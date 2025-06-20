import React from 'react';
import { useState } from 'react';
const PlanetManager = ({ planets, setPlanets, selectedPlanetName, showForm, setShowForm, setSelectedPlanetName }) => {
  const [newPlanet, setNewPlanet] = useState({
    name: '',
    color: '#3b82f6',
    size: 10,
    orbitRadius: 150,
    orbitalSpeed: 0.02,
  });

  const addPlanet = () => {
    if (!newPlanet.name.trim()) return;
    setPlanets([...planets, newPlanet]);
    setNewPlanet({ name: '', color: '#3b82f6', size: 10, orbitRadius: 150, orbitalSpeed: 0.02 });
    setShowForm(false);
  };

  const deletePlanet = (name) => {
    setPlanets(planets.filter((p) => p.name !== name));
    setShowForm(false);
    setSelectedPlanetName(null);
  };

  const updatePlanet = (index, updated) => {
    const updatedPlanets = [...planets];
    updatedPlanets[index] = { ...updatedPlanets[index], ...updated };
    setPlanets(updatedPlanets);
  };

  const selectedIndex = planets.findIndex(p => p.name === selectedPlanetName);

  return (
    <div className="absolute left-6 top-20 z-30 w-80 max-h-[70vh] bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl text-white p-6 rounded-2xl shadow-2xl border border-gray-700 overflow-y-auto">
      <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🪐 Planet Control
        </h2>
        <button
          onClick={() => {
            setSelectedPlanetName(null);
            setShowForm(false);
          }}
          className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-1 text-sm font-bold transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="space-y-4 border-b border-gray-700 pb-6 mb-6">
          <h3 className="font-semibold text-blue-400">Add New Planet</h3>
          <input 
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors" 
            placeholder="Planet Name" 
            value={newPlanet.name} 
            onChange={(e) => setNewPlanet({ ...newPlanet, name: e.target.value })} 
          />
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Color</label>
            <input 
              type="color" 
              className="w-full h-10 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer" 
              value={newPlanet.color} 
              onChange={(e) => setNewPlanet({ ...newPlanet, color: e.target.value })} 
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-300">Size</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none" 
                value={newPlanet.size} 
                onChange={(e) => setNewPlanet({ ...newPlanet, size: +e.target.value })} 
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Orbit</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none" 
                value={newPlanet.orbitRadius} 
                onChange={(e) => setNewPlanet({ ...newPlanet, orbitRadius: +e.target.value })} 
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-300">Speed</label>
            <input 
              type="number" 
              step="0.001" 
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none" 
              value={newPlanet.orbitalSpeed} 
              onChange={(e) => setNewPlanet({ ...newPlanet, orbitalSpeed: +e.target.value })} 
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={addPlanet} 
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 rounded-lg font-medium transition-all transform hover:scale-105"
            >
              ➕ Add Planet
            </button>
            <button 
              onClick={() => setShowForm(false)} 
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Selected Planet Editor */}
      {selectedIndex !== -1 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-6 h-6 rounded-full border-2 border-white/30" 
              style={{ backgroundColor: planets[selectedIndex].color }}
            />
            <h3 className="font-bold text-lg text-blue-400">{planets[selectedIndex].name}</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Color</label>
              <input 
                type="color" 
                className="w-full h-10 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer"
                value={planets[selectedIndex].color} 
                onChange={(e) => updatePlanet(selectedIndex, { color: e.target.value })} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-300 mb-1 block">Size</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  value={planets[selectedIndex].size} 
                  onChange={(e) => updatePlanet(selectedIndex, { size: +e.target.value })} 
                />
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-1 block">Orbit</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  value={planets[selectedIndex].orbitRadius} 
                  onChange={(e) => updatePlanet(selectedIndex, { orbitRadius: +e.target.value })} 
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Speed</label>
              <input 
                type="number" 
                step="0.001" 
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                value={planets[selectedIndex].orbitalSpeed} 
                onChange={(e) => updatePlanet(selectedIndex, { orbitalSpeed: +e.target.value })} 
              />
            </div>
          </div>
          
          <button 
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white w-full py-2 rounded-lg font-medium transition-all transform hover:scale-105 mt-4" 
            onClick={() => deletePlanet(planets[selectedIndex].name)}
          >
            🗑️ Remove Planet
          </button>
        </div>
      )}
    </div>
  );
};

export default PlanetManager;
