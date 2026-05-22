import React from 'react';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '2px', 
      fontWeight: 800, 
      fontSize: '28px', 
      letterSpacing: '-0.03em',
      fontFamily: 'var(--font-inter), sans-serif'
    }}>
      <svg viewBox="0 0 100 100" width="30" height="30" style={{ flexShrink: 0, marginRight: '2px' }}>
        <ellipse 
          cx="50" 
          cy="50" 
          rx="38" 
          ry="26" 
          fill="none" 
          stroke="#18E299" 
          strokeWidth="18" 
          transform="rotate(-35 50 50)" 
        />
      </svg>
      <span style={{ color: light ? '#ffffff' : '#0d0d0d' }}>Omigo</span>
    </div>
  );
}
