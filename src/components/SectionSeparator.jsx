import React from 'react';

export const WaveSeparator = () => (
  <div className="w-full py-16 overflow-hidden">
    <svg
      className="w-full h-16"
      viewBox="0 0 1200 60"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
          <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
          <stop offset="75%" stopColor="#8b5cf6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path
        d="M0,30 Q150,10 300,30 T600,30 T900,30 T1200,30"
        stroke="url(#waveGradient)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M0,35 Q200,15 400,35 T800,35 T1200,35"
        stroke="url(#waveGradient)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  </div>
);

export default WaveSeparator;
