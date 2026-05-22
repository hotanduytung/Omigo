'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer style={styles.footer}>
      <div className="footer-grid">
        <div style={styles.colBrand}>
          <Logo light={false} />
          <p style={styles.brandDesc}>
            {language === 'vi' 
              ? 'Dịch vụ vận chuyển hành khách chuyên nghiệp, uy tín hàng đầu khu vực Đà Nẵng - Quảng Nam. Chúng tôi cam kết mang lại trải nghiệm di chuyển an toàn và tiết kiệm nhất.' 
              : 'Professional, top reputable passenger transport service in Da Nang - Quang Nam area. We are committed to bringing the safest and most economical travel experience.'}
          </p>
          <div style={{ ...styles.socials, marginTop: '8px' }}>
            <a href="https://www.facebook.com/migo.vn/" target="_blank" rel="noopener noreferrer" style={styles.socialLink} title="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a href="https://zalo.me/0961099069" target="_blank" rel="noopener noreferrer" style={styles.socialLink} title="Zalo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                <text x="8.5" y="14.8" fill="currentColor" fontSize="10" fontWeight="900" fontFamily="system-ui, sans-serif">Z</text>
              </svg>
            </a>
            <a href="https://www.instagram.com/migo.vn/" target="_blank" rel="noopener noreferrer" style={styles.socialLink} title="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <li><a href="#" style={styles.link}>{language === 'vi' ? 'Trang chủ' : 'Home'}</a></li>
            <li><a href="#services" style={styles.link}>{language === 'vi' ? 'Dịch vụ' : 'Services'}</a></li>
            <li><a href="#routes" style={styles.link}>{language === 'vi' ? 'Đề xuất' : 'Suggest Route'}</a></li>
          </ul>
        </div>

        <div style={styles.colContact}>
          <h4 style={styles.colTitle}>{language === 'vi' ? 'LIÊN HỆ' : 'CONTACT'}</h4>
          <ul style={styles.contactList}>
            <li style={styles.contactItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#18E299" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>10 Phan Sĩ Thực, Cẩm Lệ, Đà Nẵng</span>
            </li>
            <li style={styles.contactItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#18E299" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>0961099069</span>
            </li>
            <li style={styles.contactItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#18E299" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>{language === 'vi' ? 'Phục vụ 24/7' : '24/7 Service'}</span>
            </li>
          </ul>
        </div>
      </div>
      <div style={styles.bottomBar}>
        <p style={styles.rights}>{language === 'vi' ? '© 2024 Omigo - Dịch vụ xe ghép cao cấp. Tất cả quyền được bảo lưu.' : '© 2024 Omigo - Premium carpool service. All rights reserved.'}</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #f0f0f0',
    paddingTop: '64px',
    color: '#333333',
  },
  colBrand: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    // Remove gridColumn to allow it to be on the same row as others
  },
  brandDesc: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#666666',
    maxWidth: '400px',
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
  colSocial: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  colTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    color: '#0d0d0d',
    margin: 0,
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  link: {
    color: '#555555',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s',
  },
  contactList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#555555',
    fontSize: '14px',
  },
  socials: {
    display: 'flex',
    gap: '12px',
  },
  socialLink: {
    color: '#ffffff',
    backgroundColor: '#009966',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    transition: 'background-color 0.2s, transform 0.2s',
  },
  bottomBar: {
    borderTop: '1px solid #f0f0f0',
    padding: '24px',
    textAlign: 'center' as const,
    backgroundColor: '#fcfcfc',
  },
  rights: {
    fontSize: '13px',
    color: '#888888',
    margin: 0,
  },
};
