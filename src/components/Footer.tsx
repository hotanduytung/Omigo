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
            <a href="https://www.facebook.com/migo.vn/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a href="https://zalo.me/0868801601" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Zalo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                <text x="8.5" y="14.8" fill="currentColor" fontSize="10" fontWeight="900" fontFamily="system-ui, sans-serif">Z</text>
              </svg>
            </a>
            <a href="https://www.instagram.com/omigo_vn/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
