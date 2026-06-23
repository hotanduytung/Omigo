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
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header style={{
      ...styles.header,
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--color-hairline-soft)' : '1px solid transparent',
      padding: isScrolled ? '12px 0' : '20px 0',
    }}>
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
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease, padding 0.3s ease',
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
