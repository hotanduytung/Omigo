'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function Header({ 
  onBecomeDriverClick,
  onBookNowClick 
}: { 
  onBecomeDriverClick?: () => void;
  onBookNowClick?: () => void;
}) {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  const handleScrollToBooking = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onBookNowClick) {
      onBookNowClick();
    } else {
      const bookingForm = document.getElementById('booking-form');
      if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <Link href="/" style={styles.logoLink}>
          <Logo />
        </Link>
        
        <nav style={styles.nav} className="nav-menu">
          <a href="#services" style={styles.navLink}>
            {t('nav.services')}
          </a>
          <a href="#routes" style={styles.navLink}>
            {t('nav.routes')}
          </a>
          <button 
            onClick={onBecomeDriverClick} 
            style={styles.navLinkHighlightBtn}
          >
            {t('nav.becomeDriver')}
          </button>
        </nav>

        <div style={styles.rightActions}>
          <button 
            onClick={handleLanguageChange} 
            style={styles.langBtn}
            aria-label="Toggle language"
          >
            {language === 'vi' ? 'EN' : 'VN'}
          </button>
          
          <button 
            onClick={handleScrollToBooking}
            style={styles.bookBtn}
          >
            {t('nav.bookNow')}
          </button>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(13, 13, 13, 0.05)',
    padding: '16px 0',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  logoLink: {
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  navLink: {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#666',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  navLinkHighlightBtn: {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#0d0d0d',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'none',
    transition: 'opacity 0.2s ease',
  },
  rightActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  langBtn: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '12px',
    fontWeight: 600,
    color: '#0d0d0d',
    cursor: 'pointer',
    padding: '6px 10px',
    borderRadius: '9999px',
    backgroundColor: 'rgba(13, 13, 13, 0.04)',
    transition: 'background-color 0.2s ease',
  },
  bookBtn: {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#0d0d0d',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '9999px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.1s ease',
  },
};
