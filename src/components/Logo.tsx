import React from 'react';

export default function Logo({ 
  light = false, 
  showDomain = false 
}: { 
  light?: boolean;
  showDomain?: boolean;
}) {
  const logoSrc = showDomain ? "/logo-footer.svg" : "/logo.svg";
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
    }}>
      <img 
        src={logoSrc} 
        alt="Omigo Logo" 
        style={{ 
          height: showDomain ? '54px' : '32px', 
          width: 'auto', 
          display: 'block' 
        }} 
      />
    </div>
  );
}
