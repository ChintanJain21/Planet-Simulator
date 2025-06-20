import React, { useEffect, useState } from 'react';

const Planet = ({
  name,
  color,
  size,
  orbitRadius,
  orbitalSpeed,
  isPaused,
  setSelectedPlanetName,
}) => {
  const [angle, setAngle] = useState(Math.random() * 2 * Math.PI);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    let frame;
    const animate = () => {
      if (!isPaused) {
        setAngle((prev) => {
          const newAngle = prev + orbitalSpeed * 0.75;
          const x = orbitRadius * Math.cos(newAngle);
          const y = orbitRadius * Math.sin(newAngle);

          setTrail((prevTrail) => {
            const newTrail = [...prevTrail, { x, y }];
            if (newTrail.length > 40) newTrail.shift();
            return newTrail;
          });

          return newAngle;
        });
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [orbitalSpeed, isPaused, orbitRadius]);

  const x = orbitRadius * Math.cos(angle);
  const y = orbitRadius * Math.sin(angle);

  return (
    <>
      {/* Enhanced trail with gradient */}
      {trail.map((pos, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `calc(50% + ${pos.x}px - 1.5px)`,
            top: `calc(50% + ${pos.y}px - 1.5px)`,
            width: '3px',
            height: '3px',
            backgroundColor: color,
            opacity: (index / trail.length) * 0.6,
            boxShadow: `0 0 4px ${color}`,
          }}
        />
      ))}

      {/* Enhanced Planet */}
      <div
        onClick={() => setSelectedPlanetName && setSelectedPlanetName(name)}
        className="absolute group cursor-pointer transform transition-transform duration-200 hover:scale-110"
        style={{
          left: `calc(50% + ${x}px - ${size / 2}px)`,
          top: `calc(50% + ${y}px - ${size / 2}px)`,
          width: size,
          height: size,
        }}
      >
        <div
          className="w-full h-full rounded-full shadow-lg transition-shadow duration-300 hover:shadow-xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${color}AA, ${color})`,
            boxShadow: `0 0 ${size/2}px ${color}44, inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.2)`,
          }}
        />
        
        {/* Enhanced hover tooltip */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 pointer-events-none">
          <div className="bg-gradient-to-r from-gray-900 to-black text-white px-4 py-2 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-sm">
            <p className="font-bold text-sm">{name}</p>
            <p className="text-xs text-gray-300">Size: {size}px</p>
            <p className="text-xs text-gray-300">Orbit: {orbitRadius}px</p>
            <p className="text-xs text-gray-300">Speed: {orbitalSpeed.toFixed(3)}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Planet;
