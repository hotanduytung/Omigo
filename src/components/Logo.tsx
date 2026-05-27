import React from 'react';

export default function Logo({ 
  light = false, 
  showDomain = false 
}: { 
  light?: boolean;
  showDomain?: boolean;
}) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
    }}>
      <svg viewBox="0 0 100 100" width="30" height="30" style={{ flexShrink: 0 }}>
        <ellipse 
          cx="50" 
          cy="50" 
          rx="38" 
          ry="26" 
          fill="none" 
          stroke="#10B981" 
          strokeWidth="18" 
          transform="rotate(-35 50 50)" 
        />
      </svg>
      {showDomain ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ 
            color: light ? '#ffffff' : '#0d0d0d', 
            fontWeight: 800, 
            fontSize: '28px', 
            lineHeight: '0.9',
            letterSpacing: '-0.04em',
            fontFamily: 'var(--font-inter), sans-serif'
          }}>
            omigo
          </span>
          <span style={{ 
            color: '#8c8c8c', 
            fontWeight: 600, 
            fontSize: '11px',
            letterSpacing: '0.02em',
            marginTop: '3px',
            fontFamily: 'var(--font-inter), sans-serif'
          }}>
            omigo.vn
          </span>
        </div>
      ) : (
        <span style={{ 
          color: light ? '#ffffff' : '#0d0d0d', 
          fontWeight: 800, 
          fontSize: '28px', 
          letterSpacing: '-0.04em',
          fontFamily: 'var(--font-inter), sans-serif'
        }}>
          omigo
        </span>
      )}
    </div>
  );
}
