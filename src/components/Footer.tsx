'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.left}>
          <Logo light={true} />
          <p style={styles.rights}>{t('footer.rights')}</p>
        </div>
        
        <div style={styles.right}>
          <h4 style={styles.connectTitle}>{t('footer.connect')}</h4>
          <div style={styles.socials}>
            <a 
              href="https://www.facebook.com/migo.vn/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.socialLink}
              title="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>

            <a 
              href="https://zalo.me/0961099069" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.socialLink}
              title="Zalo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                <text x="8.5" y="14.8" fill="currentColor" fontSize="10" fontWeight="900" fontFamily="system-ui, sans-serif">Z</text>
              </svg>
            </a>

            <a 
              href="https://www.instagram.com/migo.vn/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.socialLink}
              title="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#0d0d0d',
    color: '#ffffff',
    padding: '48px 0',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    flexWrap: 'wrap' as const,
    gap: '24px',
  },
  left: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  rights: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.4)',
    margin: 0,
  },
  right: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  connectTitle: {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0,
  },
  socials: {
    display: 'flex',
    gap: '16px',
  },
  socialLink: {
    color: '#18E299',
    transition: 'color 0.2s ease, transform 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
};
