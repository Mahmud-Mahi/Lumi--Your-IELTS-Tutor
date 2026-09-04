import React from 'react';

interface SoundWaveProps {
  active: boolean;
  color?: string;
  barCount?: number;
}

export const SoundWave: React.FC<SoundWaveProps> = ({
  active,
  color = 'bg-[#50fa7b]',
  barCount = 12,
}) => {
  return (
    <div className="flex items-center justify-center gap-1 h-6">
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-full transition-all duration-150 ${color} ${
            active
              ? 'animate-pulse'
              : 'h-1.5 opacity-40'
          }`}
          style={
            active
              ? {
                  height: `${Math.max(6, Math.sin((i + 1) * 0.8) * 18 + 10)}px`,
                  animationDuration: `${0.4 + (i % 5) * 0.15}s`,
                  animationDelay: `${(i % 4) * 0.1}s`,
                }
              : { height: '4px' }
          }
        />
      ))}
    </div>
  );
};
