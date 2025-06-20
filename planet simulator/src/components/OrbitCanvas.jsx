import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Star from './Star';
import Planet from './Planet';

const OrbitCanvas = ({ planets, isPaused, setSelectedPlanetName, speed }) => {
  const center = 500;

  return (
    <TransformWrapper
      options={{ limitToBounds: false, minScale: 0.3, maxScale: 4 }}
      wheel={{ step: 0.1 }}
      doubleClick={{ disabled: true }}
    >
      <TransformComponent>
        <div className="relative w-[1000px] h-[1000px] bg-gradient-radial from-indigo-950 via-purple-950 to-black rounded-full overflow-hidden border-2 border-purple-800/30 shadow-2xl">
          {/* Background stars */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Orbit rings */}
          <svg width="1000" height="1000" className="absolute top-0 left-0 z-0">
            {planets.map((planet, index) => (
              <circle
                key={index}
                cx={center}
                cy={center}
                r={planet.orbitRadius}
                stroke="url(#orbitGradient)"
                strokeOpacity="0.4"
                fill="none"
                strokeWidth="1"
                strokeDasharray="6 4"
              />
            ))}
            <defs>
              <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </svg>

          <Star />

          {planets.map((planet) => (
            <Planet
              key={planet.name}
              {...planet}
              orbitalSpeed={planet.orbitalSpeed * speed}
              isPaused={isPaused}
              setSelectedPlanetName={setSelectedPlanetName}
            />
          ))}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default OrbitCanvas;
