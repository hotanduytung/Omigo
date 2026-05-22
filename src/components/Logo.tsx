import React from 'react';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '24px', letterSpacing: '-0.5px' }}>
      <span style={{ color: light ? '#ffffff' : '#0d0d0d' }}>mi</span>
      <span style={{ color: '#18E299', padding: '2px 8px', backgroundColor: light ? 'rgba(24, 226, 153, 0.15)' : 'rgba(24, 226, 153, 0.1)', borderRadius: '6px' }}>go</span>
    </div>
  );
}
