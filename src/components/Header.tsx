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

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link href="/" style={styles.logoLink} onClick={handleLogoClick}>
          <Logo />
        </Link>
        
        <nav className="nav-menu" style={styles.nav}>
          <a href="#services" className="header-nav-link">
            {t('nav.services')}
          </a>
          <a href="#routes" className="header-nav-link">
            {t('nav.routes')}
          </a>
          <button 
            onClick={onBecomeDriverClick} 
            className="header-nav-link"
          >
            {t('nav.becomeDriver')}
          </button>
        </nav>

        <div style={styles.rightActions}>
          <button 
            onClick={handleLanguageChange} 
            className="header-lang-btn"
            aria-label="Toggle language"
          >
            {language === 'vi' ? 'EN' : 'VN'}
          </button>
          
          <button 
            onClick={handleScrollToBooking}
            className="btn-primary"
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
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid var(--color-hairline-soft)',
    padding: '14px 0',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 32px',
  },
  logoLink: {
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  rightActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  bookBtn: {
    fontSize: '13px',
    fontWeight: 500,
    padding: '8px 16px',
  }
};
