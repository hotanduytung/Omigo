'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function Footer({ 
  onBecomeDriverClick 
}: { 
  onBecomeDriverClick?: () => void;
}) {
  const { language } = useLanguage();

  return (
    <footer style={styles.footer}>
      <div className="footer-grid">
        <div style={styles.colBrand}>
          <Logo light={false} showDomain={true} />
          <p style={styles.brandDesc}>
            {language === 'vi' 
              ? 'Dịch vụ vận chuyển hành khách chuyên nghiệp, kết nối xe ghép và bao xe an toàn, tiết kiệm chặng Đà Nẵng ↔ Tam Kỳ.' 
              : 'Professional passenger transport service connecting safe, economical shared and private rides Da Nang ↔ Tam Ky.'}
          </p>
          <div style={styles.socials}>
            <a href="https://www.facebook.com/migo.vn/" target="_blank" rel="noopener noreferrer" className="footer-social-icon-btn" title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="https://zalo.me/0868801601" target="_blank" rel="noopener noreferrer" className="footer-social-icon-btn" title="Zalo">
              <svg width="24" height="24" viewBox="8.5 6 39 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5632 17H10.8382V19.0853H17.5869L10.9329 27.3317C10.7244 27.635 10.5728 27.9194 10.5728 28.5639V29.0947H19.748C20.203 29.0947 20.5822 28.7156 20.5822 28.2606V27.1421H13.4922L19.748 19.2938C19.8428 19.1801 20.0134 18.9716 20.0893 18.8768L20.1272 18.8199C20.4874 18.2891 20.5632 17.8341 20.5632 17.2844V17Z" />
                <path d="M32.9416 29.0947H34.3255V17H32.2402V28.3933C32.2402 28.7725 32.5435 29.0947 32.9416 29.0947Z" />
                <path d="M25.814 19.6924C23.1979 19.6924 21.0747 21.8156 21.0747 24.4317C21.0747 27.0478 23.1979 29.171 25.814 29.171C28.4301 29.171 30.5533 27.0478 30.5533 24.4317C30.5723 21.8156 28.4491 19.6924 25.814 19.6924ZM25.814 27.2184C24.2785 27.2184 23.0273 25.9672 23.0273 24.4317C23.0273 22.8962 24.2785 21.645 25.814 21.645C27.3495 21.645 28.6007 22.8962 28.6007 24.4317C28.6007 25.9672 27.3685 27.2184 25.814 27.2184Z" />
                <path d="M40.4867 19.6162C37.8516 19.6162 35.7095 21.7584 35.7095 24.3934C35.7095 27.0285 37.8516 29.1707 40.4867 29.1707C43.1217 29.1707 45.2639 27.0285 45.2639 24.3934C45.2639 21.7584 43.1217 19.6162 40.4867 19.6162ZM40.4867 27.2181C38.9322 27.2181 37.681 25.9669 37.681 24.4124C37.681 22.8579 38.9322 21.6067 40.4867 21.6067C42.0412 21.6067 43.2924 22.8579 43.2924 24.4124C43.2924 25.9669 42.0412 27.2181 40.4867 27.2181Z" />
                <path d="M29.4562 29.0944H30.5747V19.957H28.6221V28.2793C28.6221 28.7153 29.0012 29.0944 29.4562 29.0944Z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/omigo_vn/" target="_blank" rel="noopener noreferrer" className="footer-social-icon-btn" title="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
        
        <div style={styles.colLinks}>
          <h4 style={styles.colTitle}>{language === 'vi' ? 'LIÊN KẾT' : 'LINKS'}</h4>
          <ul style={styles.linkList}>
            <li><a href="#services" className="footer-link-item">{language === 'vi' ? 'Dịch vụ' : 'Services'}</a></li>
            <li><a href="#routes" className="footer-link-item">{language === 'vi' ? 'Đóng góp lộ trình' : 'Suggest Route'}</a></li>
            <li>
              <button 
                onClick={onBecomeDriverClick} 
                className="footer-link-item"
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  padding: 0, 
                  cursor: 'pointer', 
                  textAlign: 'left',
                  fontFamily: 'inherit'
                }}
              >
                {language === 'vi' ? 'Trở thành đối tác' : 'Become a Partner'}
              </button>
            </li>
          </ul>
        </div>

        <div style={styles.colContact}>
          <h4 style={styles.colTitle}>{language === 'vi' ? 'LIÊN HỆ' : 'CONTACT'}</h4>
          <ul style={styles.contactList}>
            <li style={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>10 Phan Sĩ Thực, Cẩm Lệ, Đà Nẵng</span>
            </li>
            <li style={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>0868.801.601</span>
            </li>
            <li style={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>{language === 'vi' ? 'Phục vụ 24/7' : '24/7 Service'}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div style={styles.bottomBar}>
        <p style={styles.rights}>
          {language === 'vi' 
            ? '© 2026 Omigo. Tất cả quyền được bảo lưu.' 
            : '© 2026 Omigo. All rights reserved.'}
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'var(--color-canvas)',
    borderTop: '1px solid var(--color-hairline)',
    paddingTop: '64px',
    color: 'var(--color-text-charcoal)',
  },
  colBrand: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  brandDesc: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'var(--color-text-slate)',
    maxWidth: '360px',
    margin: 0,
  },
  colLinks: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  colContact: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  colTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: 'var(--color-text-ink)',
    margin: 0,
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  contactList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: 'var(--color-text-slate)',
    fontSize: '14px',
  },
  socials: {
    display: 'flex',
    gap: '8px',
  },
  bottomBar: {
    borderTop: '1px solid var(--color-hairline-soft)',
    padding: '24px 32px',
    textAlign: 'center' as const,
    backgroundColor: 'var(--color-surface)',
    marginTop: '48px',
  },
  rights: {
    fontSize: '12px',
    color: 'var(--color-text-steel)',
    margin: 0,
    fontWeight: 500,
  },
};
