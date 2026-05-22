'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

const routeAddressMap: Record<string, Record<'vi' | 'en', { pickup: string; dropoff: string }>> = {
  'tam-ky-da-nang': {
    vi: {
      pickup: 'Tam Kỳ',
      dropoff: 'Đà Nẵng'
    },
    en: {
      pickup: 'Tam Ky',
      dropoff: 'Da Nang'
    }
  },
  'da-nang-tam-ky': {
    vi: {
      pickup: 'Đà Nẵng',
      dropoff: 'Tam Kỳ'
    },
    en: {
      pickup: 'Da Nang',
      dropoff: 'Tam Ky'
    }
  }
};

function generateDateOptions(lang: 'vi' | 'en') {
  const options = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    
    // Format YYYY-MM-DD
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const value = `${yyyy}-${mm}-${dd}`;
    
    let label = '';
    if (i === 0) {
      label = lang === 'vi' ? `Hôm nay (${dd}/${mm})` : `Today (${dd}/${mm})`;
    } else if (i === 1) {
      label = lang === 'vi' ? `Ngày mai (${dd}/${mm})` : `Tomorrow (${dd}/${mm})`;
    } else {
      // Show day of the week
      const dayNamesVi = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      const dayNamesEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = lang === 'vi' ? dayNamesVi[d.getDay()] : dayNamesEn[d.getDay()];
      label = `${dayName}, ${dd}/${mm}`;
    }
    
    options.push({ value, label });
  }
  
  return options;
}

const timeOptions = Array.from({ length: 15 }, (_, i) => {
  const hour = 5 + i;
  const hourStr = String(hour).padStart(2, '0');
  const value = `${hourStr}:00`;
  return {
    value,
    label: `${hour}:00`
  };
});

export default function Home() {
  const { t, language } = useLanguage();
  
  // Form states
  const [route, setRoute] = useState('tam-ky-da-nang');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<'xe-ghep' | 'bao-xe' | 'gui-hang'>('xe-ghep');
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);
  const [dateOptions, setDateOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    setMounted(true);
    const options = generateDateOptions(language);
    setDateOptions(options);
    if (options.length > 0) {
      setDate(options[0].value);
    }
    setTime('07:00');
  }, []);

  // Update dateOptions labels if language changes
  useEffect(() => {
    if (mounted) {
      const options = generateDateOptions(language);
      setDateOptions(options);
      if (options.length > 0 && !options.some(opt => opt.value === date)) {
        setDate(options[0].value);
      }
    }
  }, [language]);

  // Dynamic placeholders helper
  const getPickupPlaceholder = () => {
    if (route === 'tam-ky-da-nang') {
      if (serviceType === 'gui-hang') {
        return language === 'vi' ? 'Gửi từ Tam Kỳ' : 'Send from Tam Ky';
      }
      return language === 'vi' 
        ? 'Đón tại Tam Kỳ' 
        : 'Pickup in Tam Ky';
    } else {
      if (serviceType === 'gui-hang') {
        return language === 'vi' ? 'Gửi từ Đà Nẵng' : 'Send from Da Nang';
      }
      return language === 'vi' 
        ? 'Đón tại Đà Nẵng' 
        : 'Pickup in Da Nang';
    }
  };

  const getDropoffPlaceholder = () => {
    if (route === 'tam-ky-da-nang') {
      if (serviceType === 'gui-hang') {
        return language === 'vi' ? 'Giao tại Đà Nẵng' : 'Deliver to Da Nang';
      }
      return language === 'vi' 
        ? 'Trả tại Đà Nẵng' 
        : 'Dropoff in Da Nang';
    } else {
      if (serviceType === 'gui-hang') {
        return language === 'vi' ? 'Giao tại Tam Kỳ' : 'Deliver to Tam Ky';
      }
      return language === 'vi' 
        ? 'Trả tại Tam Kỳ' 
        : 'Dropoff in Tam Ky';
    }
  };

  // UI animation and popup states
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [driverVehicle, setDriverVehicle] = useState('');
  const [driverArea, setDriverArea] = useState('');
  const [driverExperience, setDriverExperience] = useState('');
  const [driverSuccess, setDriverSuccess] = useState(false);

  // Suggest Route states (embedded in page)
  const [suggestPickup, setSuggestPickup] = useState('');
  const [suggestDropoff, setSuggestDropoff] = useState('');
  const [suggestPhone, setSuggestPhone] = useState('');
  const [suggestNotes, setSuggestNotes] = useState('');
  const [suggestSuccess, setSuggestSuccess] = useState(false);

  // Booking confirmation modal states
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSwap = (e: React.MouseEvent) => {
    e.preventDefault();
    const temp = pickup;
    setPickup(dropoff);
    setDropoff(temp);
    // Swap selected route as well
    setRoute((prev) => (prev === 'tam-ky-da-nang' ? 'da-nang-tam-ky' : 'tam-ky-da-nang'));
  };

  const handleQuantityChange = (val: number) => {
    if (quantity + val >= 1) {
      setQuantity(quantity + val);
    }
  };

  const triggerHighlight = () => {
    setIsHighlighted(true);
    setTimeout(() => setIsHighlighted(false), 2000);
  };

  const handleBookNowClick = () => {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      triggerHighlight();
      setTimeout(() => {
        const nameInput = bookingForm.querySelector('input[type="text"]');
        if (nameInput) {
          (nameInput as HTMLInputElement).focus();
        }
      }, 500);
    }
  };

  const handleSelectService = (service: 'xe-ghep' | 'bao-xe' | 'gui-hang') => {
    setServiceType(service);
    handleBookNowClick();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleConfirmBooking = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsConfirmModalOpen(false);
      // Reset form fields
      setFullName('');
      setPhone('');
      setPickup('');
      setDropoff('');
      setQuantity(1);
    }, 2500);
  };

  const handleDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDriverSuccess(true);
    setTimeout(() => {
      setDriverSuccess(false);
      setIsDriverModalOpen(false);
      setDriverName('');
      setDriverPhone('');
      setDriverVehicle('');
      setDriverArea('');
      setDriverExperience('');
    }, 2500);
  };

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestSuccess(true);
    setTimeout(() => {
      setSuggestSuccess(false);
      setSuggestPickup('');
      setSuggestDropoff('');
      setSuggestPhone('');
      setSuggestNotes('');
    }, 2500);
  };

  return (
    <div style={styles.pageWrapper}>
      <Header 
        onBecomeDriverClick={() => setIsDriverModalOpen(true)}
        onBookNowClick={handleBookNowClick}
      />
      
      {/* Hero Section */}
      <section style={styles.heroSection} className="hero-section">
        <div className="container hero-container-flex" style={styles.heroContainer}>
          
          {/* Left Column: Heading & CTAs */}
          <div className="hero-left-flex" style={styles.heroLeft}>
            <span style={styles.badge}>OMIGO.VN</span>
            <h1 style={styles.heroTitle}>
              {language === 'vi' ? (
                <>
                  Di chuyển thông minh cùng <span style={{ color: '#12b77a' }}>Omigo</span>
                </>
              ) : (
                <>
                  Smart travel with <span style={{ color: '#12b77a' }}>Omigo</span>
                </>
              )}
            </h1>
            <p style={{ ...styles.heroSubtitle, marginBottom: '24px' }}>
              {language === 'vi' 
                ? <>Dịch vụ xe ghép uy tín, an toàn và tiết kiệm.<br />Chuyên tuyến Tam Kỳ - Đà Nẵng.</>
                : <>Reliable, safe and saving carpool service.<br />Specializing in Tam Ky - Da Nang route.</>
              }
            </p>

            {/* Promo Pricing Banner */}
            <div className="promo-pricing-left-banner animate-fade-in">
              <div className="promo-left-card shared-card">
                <div className="promo-left-info">
                  <span className="promo-left-label">{t('form.service.shared')}</span>
                  <div className="promo-left-prices">
                    <strong className="promo-left-new">90k</strong>
                  </div>
                </div>
              </div>
              
              <div className="promo-left-divider"></div>

              <div className="promo-left-card private-card">
                <div className="promo-left-info">
                  <span className="promo-left-label">{t('form.service.private')}</span>
                  <div className="promo-left-prices">
                    <strong className="promo-left-new">330k</strong>
                  </div>
                </div>
              </div>

              <div className="promo-left-divider"></div>

              <div className="promo-left-card package-card">
                <div className="promo-left-info">
                  <span className="promo-left-label">{t('form.service.package')}</span>
                  <div className="promo-left-prices">
                    <strong className="promo-left-new">50k</strong>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={styles.ctaGroup} className="cta-group-center">
              <a href="tel:0961099069" className="hover-highlight-btn" style={styles.btnCall}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {t('hero.call')}
              </a>
              <a 
                href="https://www.facebook.com/migo.vn/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover-highlight-secondary"
                style={styles.btnFacebook}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
                {t('hero.facebook')}
              </a>
            </div>
          </div>
          
          {/* Right Column: Booking Form */}
          <div className="hero-right-flex" style={styles.heroRight} id="booking-form">
            <div 
              className={`booking-card ${isHighlighted ? 'pulse-highlight' : ''}`}
            >
              {/* Dynamic Form Heading */}
              <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px', textAlign: 'center', color: '#0d0d0d', letterSpacing: '-0.5px' }}>
                {serviceType === 'xe-ghep' 
                  ? (language === 'vi' ? 'Đặt xe ghép ngay' : 'Book Shared Ride Now') 
                  : serviceType === 'bao-xe' 
                    ? (language === 'vi' ? 'Đặt bao xe ngay' : 'Book Private Ride Now') 
                    : (language === 'vi' ? 'Tạo đơn giao hàng ngay' : 'Create Delivery Order Now')}
              </h3>
              
              {/* Service Selection Tabs at the top */}
              <div className="tabs-compact">
                <button 
                  type="button" 
                  onClick={() => setServiceType('xe-ghep')}
                  className={`tab-compact-btn ${serviceType === 'xe-ghep' ? 'active' : ''}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {t('form.service.shared')}
                </button>
                
                <button 
                  type="button" 
                  onClick={() => setServiceType('bao-xe')}
                  className={`tab-compact-btn ${serviceType === 'bao-xe' ? 'active' : ''}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {t('form.service.private')}
                </button>
                
                <button 
                  type="button" 
                  onClick={() => setServiceType('gui-hang')}
                  className={`tab-compact-btn ${serviceType === 'gui-hang' ? 'active' : ''}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                    <polyline points="21 8 21 21 3 21 3 8" />
                    <rect x="1" y="3" width="22" height="5" />
                    <line x1="10" y1="12" x2="14" y2="12" />
                  </svg>
                  {t('form.service.package')}
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="booking-form-grid">
                
                {/* Row 1: Route Selector (Full width) */}
                <div className="form-group">
                  <label className="field-label-compact">{t('form.route')}</label>
                  <select
                    value={route}
                    onChange={(e) => {
                      setRoute(e.target.value);
                      setPickup('');
                      setDropoff('');
                    }}
                    className="select-compact"
                  >
                    <option value="tam-ky-da-nang">{language === 'vi' ? 'Tam Kỳ ↔ Đà Nẵng' : 'Tam Ky ↔ Da Nang'}</option>
                    <option value="da-nang-tam-ky">{language === 'vi' ? 'Đà Nẵng ↔ Tam Kỳ' : 'Da Nang ↔ Tam Ky'}</option>
                  </select>
                </div>

                <div className="form-row two-cols">
                  <div className="form-group">
                    <label className="field-label-compact">
                      {serviceType === 'gui-hang' ? t('form.pickup.delivery') : (language === 'vi' ? 'Địa chỉ đi' : 'Pickup Address')}
                    </label>
                    <input 
                      type="text" 
                      placeholder={getPickupPlaceholder()} 
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      required
                      className="input-compact"
                    />
                  </div>

                  {/* Swap Button inline */}
                  <div className="swap-btn-container-inline">
                    <button onClick={handleSwap} className="swap-btn-inline" type="button" aria-label="Swap locations">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8v12M17 20l-4-4M17 20l4-4" />
                      </svg>
                    </button>
                  </div>

                  <div className="form-group">
                    <label className="field-label-compact">
                      {serviceType === 'gui-hang' ? t('form.dropoff.delivery') : (language === 'vi' ? 'Địa chỉ đến' : 'Dropoff Address')}
                    </label>
                    <input 
                      type="text" 
                      placeholder={getDropoffPlaceholder()} 
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      required
                      className="input-compact"
                    />
                  </div>
                </div>

                {/* Row 3: Date, Time, and Quantity (3 columns or 2 columns if Gửi hàng) */}
                <div className="form-row three-cols">
                  <div className="form-group form-group-date">
                    <label className="field-label-compact">
                      {serviceType === 'gui-hang' ? t('form.date.delivery') : t('form.date')}
                    </label>
                    <select 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="select-compact"
                    >
                      {mounted ? (
                        dateOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))
                      ) : (
                        <option value="">{t('form.date')}</option>
                      )}
                    </select>
                  </div>

                  <div className="form-group form-group-time">
                    <label className="field-label-compact">
                      {serviceType === 'gui-hang' ? t('form.time.delivery') : t('form.time')}
                    </label>
                    <select 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="select-compact"
                    >
                      {timeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {serviceType !== 'gui-hang' && (
                    <div className="form-group form-group-qty">
                      <label className="field-label-compact">
                        {serviceType === 'xe-ghep' ? t('form.seats') : t('form.vehicles')}
                      </label>
                      <div className="stepper-compact">
                        <button type="button" onClick={() => handleQuantityChange(-1)} className="stepper-btn">-</button>
                        <span className="stepper-value">{quantity}</span>
                        <button type="button" onClick={() => handleQuantityChange(1)} className="stepper-btn">+</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Row 4: Name and Phone (2 columns) */}
                <div className="form-row two-cols">
                  <div className="form-group">
                    <label className="field-label-compact">{language === 'vi' ? 'Họ và tên' : 'Full Name'}</label>
                    <input 
                      type="text" 
                      placeholder={language === 'vi' ? 'Họ và tên' : 'Full Name'} 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="input-compact"
                    />
                  </div>

                  <div className="form-group">
                    <label className="field-label-compact">{language === 'vi' ? 'Số điện thoại' : 'Phone Number'}</label>
                    <input 
                      type="tel" 
                      placeholder="0961 099 069" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="input-compact"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={styles.btnSubmit}>
                  {t('form.confirm')}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Services/Pricing Section */}
      <section id="services" style={styles.servicesSection}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadge}>{t('pricing.badge')}</span>
            <h2 style={styles.sectionTitle}>{t('pricing.heading')}</h2>
          </div>
          
          <div className="pricing-grid-flex" style={styles.pricingGrid}>
            {/* Card 1: Xe ghép (White background) */}
            <div className="card-premium pricing-card-res" style={styles.pricingCardLight}>
              <div>
                <div style={styles.iconContainer}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#12b77a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span style={styles.iconTag}>{language === 'vi' ? 'Cá nhân' : 'Individual'}</span>
                </div>
                <h3 style={styles.pricingTitle}>{t('pricing.shared.title')}</h3>
                <p style={styles.pricingDesc}>{t('pricing.shared.desc')}</p>
                
                <ul className="pricing-features-list" style={styles.featuresList}>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#12b77a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Đón trả tận nơi theo yêu cầu' : 'Door-to-door pickup & dropoff'}</span>
                  </li>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#12b77a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Tiết kiệm chi phí hành trình' : 'Save travel costs'}</span>
                  </li>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#12b77a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Xe đời mới sạch sẽ, không mùi' : 'Clean, odorless modern cars'}</span>
                  </li>
                </ul>
              </div>

              <div>
                <div style={styles.pricingPriceContainer}>
                  <span style={styles.pricingPriceLabel}>{language === 'vi' ? 'Giá vé chỉ từ' : 'Ticket price from'}</span>
                  <span style={styles.pricingPrice}>90k</span>
                  <span style={styles.pricingPriceUnit}>{language === 'vi' ? '/ghế' : '/seat'}</span>
                </div>
                <button 
                  onClick={() => handleSelectService('xe-ghep')} 
                  className="btn-secondary" 
                  style={styles.pricingBtnLight}
                >
                  {t('pricing.shared.btn')}
                </button>
              </div>
            </div>

            {/* Card 2: Bao xe (Black background) */}
            <div className="card-premium pricing-card-res" style={styles.pricingCardDark}>
              <div style={styles.discountBadge}>{language === 'vi' ? 'ƯU ĐÃI NHẤT' : 'BEST VALUE'}</div>
              <div>
                <div style={styles.iconContainer}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#18E299" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span style={{ ...styles.iconTag, color: '#18E299' }}>{language === 'vi' ? 'Gia đình & Nhóm' : 'Family & Group'}</span>
                </div>
                <h3 style={{ ...styles.pricingTitle, color: '#ffffff' }}>{t('pricing.private.title')}</h3>
                <p style={{ ...styles.pricingDesc, color: 'rgba(255, 255, 255, 0.6)' }}>{t('pricing.private.desc')}</p>
                
                <ul className="pricing-features-list" style={styles.featuresList}>
                  <li style={{ ...styles.featureItem, color: 'rgba(255, 255, 255, 0.8)' }}>
                    <svg style={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#18E299" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Không gian riêng tư thoải mái' : 'Private & comfortable space'}</span>
                  </li>
                  <li style={{ ...styles.featureItem, color: 'rgba(255, 255, 255, 0.8)' }}>
                    <svg style={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#18E299" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Tự chủ hoàn toàn thời gian đi' : 'Full control over travel time'}</span>
                  </li>
                  <li style={{ ...styles.featureItem, color: 'rgba(255, 255, 255, 0.8)' }}>
                    <svg style={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#18E299" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Không dừng bắt khách dọc đường' : 'No stops to pick up other passengers'}</span>
                  </li>
                </ul>
              </div>

              <div>
                <div style={styles.pricingPriceContainer}>
                  <span style={{ ...styles.pricingPriceLabel, color: 'rgba(255, 255, 255, 0.5)' }}>{language === 'vi' ? 'Giá bao xe chỉ từ' : 'Private ride from'}</span>
                  <span style={{ ...styles.pricingPrice, color: '#18E299' }}>330k</span>
                  <span style={{ ...styles.pricingPriceUnit, color: 'rgba(255, 255, 255, 0.6)' }}>{language === 'vi' ? '/chuyến' : '/trip'}</span>
                </div>
                <button 
                  onClick={() => handleSelectService('bao-xe')} 
                  className="btn-primary" 
                  style={styles.pricingBtnDark}
                >
                  {t('pricing.private.btn')}
                </button>
              </div>
            </div>

            {/* Card 3: Giao hàng (White background) */}
            <div className="card-premium pricing-card-res" style={styles.pricingCardLight}>
              <div>
                <div style={styles.iconContainer}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#12b77a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="21 8 21 21 3 21 3 8" />
                    <rect x="1" y="3" width="22" height="5" />
                    <line x1="10" y1="12" x2="14" y2="12" />
                  </svg>
                  <span style={styles.iconTag}>{language === 'vi' ? 'Hàng hóa' : 'Cargo'}</span>
                </div>
                <h3 style={styles.pricingTitle}>{t('pricing.package.title')}</h3>
                <p style={styles.pricingDesc}>{t('pricing.package.desc')}</p>
                
                <ul className="pricing-features-list" style={styles.featuresList}>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#12b77a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Giao nhận hàng nhanh trong ngày' : 'Same-day quick delivery'}</span>
                  </li>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#12b77a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Bảo đảm an toàn hàng hóa 100%' : '100% cargo safety guaranteed'}</span>
                  </li>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#12b77a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Hỗ trợ giao nhận tận tay' : 'Door-to-door handover support'}</span>
                  </li>
                </ul>
              </div>

              <div>
                <div style={styles.pricingPriceContainer}>
                  <span style={styles.pricingPriceLabel}>{language === 'vi' ? 'Cước phí chỉ từ' : 'Delivery fee from'}</span>
                  <span style={styles.pricingPrice}>50k</span>
                  <span style={styles.pricingPriceUnit}>{language === 'vi' ? '/đơn' : '/order'}</span>
                </div>
                <button 
                  onClick={() => handleSelectService('gui-hang')} 
                  className="btn-secondary" 
                  style={styles.pricingBtnLight}
                >
                  {t('pricing.package.btn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Route Proposal Section */}
      <section id="routes" style={styles.routesSection}>
        <div className="container">
          <div className="suggest-route-card">
            {/* Left Column */}
            <div className="suggest-route-left">
              <span className="suggest-badge">{language === 'vi' ? 'Đề xuất lộ trình' : 'Route Proposal'}</span>
              <h2 className="suggest-heading">
                {language === 'vi' ? (
                  <>Bạn không tìm thấy <span style={{ color: '#18E299' }}>tuyến đường mình cần?</span></>
                ) : (
                  <>Haven't found the <span style={{ color: '#18E299' }}>route you need?</span></>
                )}
              </h2>
              <p className="suggest-subtext">
                {language === 'vi'
                  ? 'Hãy cho chúng tôi biết lộ trình bạn mong muốn. Chúng tôi sẽ ghi nhận và phản hồi sớm nhất để sắp xếp chuyến đi phù hợp cho bạn.'
                  : 'Let us know your desired route. We will record and respond as soon as possible to arrange a suitable trip for you.'}
              </p>
              
              <div className="feedback-time-badge">
                <div className="check-circle-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="feedback-time-text">
                  {language === 'vi' ? 'Phản hồi trong vòng 15 phút' : 'Response within 15 minutes'}
                </span>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="suggest-route-right">
              <div className="suggest-form-container">
                {suggestSuccess ? (
                  <div style={styles.successMessage}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#12b77a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <p style={{ color: '#12b77a', fontWeight: 600, textAlign: 'center', fontFamily: 'var(--font-inter), sans-serif' }}>
                      {language === 'vi'
                        ? 'Đề xuất thành công! Omigo chân thành cảm ơn đóng góp của bạn.'
                        : 'Proposal submitted successfully! Thank you for your contribution.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSuggestSubmit} className="suggest-form">
                    <div className="suggest-form-group">
                      <label className="suggest-form-label">{t('suggest.modal.phone')}</label>
                      <input 
                        type="tel" 
                        placeholder={language === 'vi' ? 'Nhập số điện thoại của bạn' : 'Enter your phone number'} 
                        value={suggestPhone}
                        onChange={(e) => setSuggestPhone(e.target.value)}
                        required
                        className="suggest-input"
                      />
                    </div>
                    
                    <div className="suggest-form-group">
                      <label className="suggest-form-label">{t('suggest.modal.route')}</label>
                      <textarea 
                        placeholder={language === 'vi' ? 'Thời gian mong muốn, số người...' : 'Desired time, number of people...'} 
                        value={suggestNotes}
                        onChange={(e) => setSuggestNotes(e.target.value)}
                        rows={3}
                        className="suggest-textarea"
                      />
                    </div>
                    
                    <button type="submit" className="btn-primary suggest-submit-btn">
                      {t('suggest.modal.submit')}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Driver Registration Modal Popup */}
      {isDriverModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard} className="animate-fade-in modal-card-small">
            <button 
              style={styles.modalCloseBtn} 
              onClick={() => setIsDriverModalOpen(false)}
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px', alignItems: 'flex-start' }}>
              <span className="suggest-badge" style={{ marginBottom: '8px', textTransform: 'uppercase' }}>
                {t('driver.modal.badge')}
              </span>
              <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, textAlign: 'left', color: '#0d0d0d', letterSpacing: '-0.5px' }}>
                {t('driver.modal.title')}
              </h3>
              <p style={{ fontSize: '16px', color: '#666', margin: 0, textAlign: 'left', lineHeight: '1.5' }}>
                {t('driver.modal.subtitle')}
              </p>
            </div>

            {driverSuccess ? (
              <div style={styles.successMessage}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#12b77a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p style={{ color: '#12b77a', fontWeight: 600, textAlign: 'center' }}>
                  {t('driver.modal.success')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleDriverSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={styles.formField}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#444', marginBottom: '8px', display: 'block' }}>{t('driver.modal.name')}</label>
                    <input 
                      type="text" 
                      placeholder="Nguyễn Văn A"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      required
                      className="suggest-input"
                    />
                  </div>

                  <div style={styles.formField}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#444', marginBottom: '8px', display: 'block' }}>{t('driver.modal.phone')}</label>
                    <input 
                      type="tel" 
                      placeholder="0905.XXX.XXX"
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      required
                      className="suggest-input"
                    />
                  </div>

                  <div style={styles.formField}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#444', marginBottom: '8px', display: 'block' }}>{t('driver.modal.vehicle')}</label>
                    <input 
                      type="text" 
                      placeholder="Toyota Vios..."
                      value={driverVehicle}
                      onChange={(e) => setDriverVehicle(e.target.value)}
                      required
                      className="suggest-input"
                    />
                  </div>

                  <div style={styles.formField}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#444', marginBottom: '8px', display: 'block' }}>{t('driver.modal.area')}</label>
                    <input 
                      type="text" 
                      placeholder="Tam Kỳ, Hội An..."
                      value={driverArea}
                      onChange={(e) => setDriverArea(e.target.value)}
                      required
                      className="suggest-input"
                    />
                  </div>
                </div>

                <div style={styles.formField}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#444', marginBottom: '8px', display: 'block' }}>{t('driver.modal.experience')}</label>
                  <textarea 
                    placeholder="..."
                    value={driverExperience}
                    onChange={(e) => setDriverExperience(e.target.value)}
                    className="suggest-textarea"
                    rows={4}
                  />
                </div>

                <button type="submit" className="suggest-submit-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {t('driver.modal.submit')}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      )}



      {/* Booking Confirmation Modal Popup */}
      {isConfirmModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard} className="animate-fade-in modal-card-small">
            <button 
              style={styles.modalCloseBtn} 
              onClick={() => setIsConfirmModalOpen(false)}
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h3 style={styles.modalTitle}>{t('confirm.modal.title')}</h3>

            {bookingSuccess ? (
              <div style={styles.successMessage}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#12b77a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p style={{ color: '#12b77a', fontWeight: 600, textAlign: 'center', fontFamily: 'var(--font-inter), sans-serif' }}>
                  {t('confirm.modal.success')}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={styles.confirmDetailsContainer}>
                  <div style={styles.confirmRow}>
                    <span style={styles.confirmLabel}>{t('confirm.modal.name')}</span>
                    <span style={styles.confirmValue}>{fullName}</span>
                  </div>
                  <div style={styles.confirmRow}>
                    <span style={styles.confirmLabel}>{t('confirm.modal.phone')}</span>
                    <span style={styles.confirmValue}>{phone}</span>
                  </div>
                  <div style={styles.confirmRow}>
                    <span style={styles.confirmLabel}>{t('confirm.modal.service')}</span>
                    <span style={{
                      backgroundColor: serviceType === 'xe-ghep' 
                        ? 'rgba(24, 226, 153, 0.12)' 
                        : serviceType === 'bao-xe' 
                          ? 'rgba(10, 186, 181, 0.12)' 
                          : 'rgba(59, 130, 246, 0.12)',
                      color: serviceType === 'xe-ghep' 
                        ? '#0fa36d' 
                        : serviceType === 'bao-xe' 
                          ? '#08807d' 
                          : '#1d4ed8',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                    }}>
                      {serviceType === 'xe-ghep' 
                        ? t('form.service.shared') 
                        : serviceType === 'bao-xe' 
                          ? t('form.service.private') 
                          : t('form.service.package')}
                    </span>
                  </div>
                  <div style={styles.confirmRow}>
                    <span style={styles.confirmLabel}>{t('confirm.modal.route')}</span>
                    <span style={styles.confirmValue}>
                      {route === 'tam-ky-da-nang' 
                        ? <>Tam Kỳ <span style={{ color: '#12b77a', margin: '0 2px', fontWeight: 800 }}>↔</span> Đà Nẵng</>
                        : <>Đà Nẵng <span style={{ color: '#12b77a', margin: '0 2px', fontWeight: 800 }}>↔</span> Tam Kỳ</>}
                    </span>
                  </div>
                  <div style={styles.confirmRow}>
                    <span style={styles.confirmLabel}>
                      {serviceType === 'gui-hang' ? t('confirm.modal.pickup.delivery') : t('confirm.modal.pickup')}
                    </span>
                    <span style={styles.confirmValue}>{pickup}</span>
                  </div>
                  <div style={styles.confirmRow}>
                    <span style={styles.confirmLabel}>
                      {serviceType === 'gui-hang' ? t('confirm.modal.dropoff.delivery') : t('confirm.modal.dropoff')}
                    </span>
                    <span style={styles.confirmValue}>{dropoff}</span>
                  </div>
                  <div style={styles.confirmRow}>
                    <span style={styles.confirmLabel}>{t('confirm.modal.datetime')}</span>
                    <span style={styles.confirmValue}>
                      {time} <span style={{ color: '#94a3b8', margin: '0 4px', fontWeight: 400 }}>|</span> {dateOptions.find(opt => opt.value === date)?.label || date}
                    </span>
                  </div>
                  {serviceType !== 'gui-hang' && (
                    <div style={styles.confirmRow}>
                      <span style={styles.confirmLabel}>{t('confirm.modal.details')}</span>
                      <span style={styles.confirmValue}>
                        {quantity} {serviceType === 'xe-ghep' ? t('confirm.modal.seat') : t('confirm.modal.vehicle')}
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                  <button 
                    type="button" 
                    className="hover-highlight-secondary" 
                    style={{ ...styles.btnSubmit, backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '9999px', fontWeight: 700, flex: 1, marginTop: 0 }}
                    onClick={() => setIsConfirmModalOpen(false)}
                  >
                    {t('confirm.modal.edit')}
                  </button>
                  <button 
                    type="button" 
                    className="btn-primary" 
                    style={{ ...styles.btnSubmit, flex: 1, marginTop: 0, borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={handleConfirmBooking}
                  >
                    {t('confirm.modal.submit')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  heroSection: {
    backgroundColor: '#ffffff',
    padding: '80px 0',
    borderBottom: '1px solid rgba(13, 13, 13, 0.05)',
  },
  heroContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '64px',
    flexWrap: 'wrap' as const,
  },
  heroLeft: {
    flex: '1.2 1 400px',
    maxWidth: '640px',
  },
  badge: {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '12px',
    fontWeight: 700,
    backgroundColor: 'rgba(24, 226, 153, 0.15)',
    color: '#12b77a',
    padding: '6px 12px',
    borderRadius: '9999px',
    display: 'inline-block',
    marginBottom: '24px',
    letterSpacing: '1px',
  },
  heroTitle: {
    fontSize: '56px',
    fontWeight: 800,
    lineHeight: '1.1',
    letterSpacing: '-0.03em',
    marginBottom: '24px',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  ctaGroup: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap' as const,
  },
  btnCall: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#18E299',
    color: '#0d0d0d',
    fontFamily: 'var(--font-inter), sans-serif',
    fontWeight: 700,
    fontSize: '15px',
    padding: '14px 28px',
    borderRadius: '9999px',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  btnFacebook: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'transparent',
    color: '#0d0d0d',
    fontFamily: 'var(--font-inter), sans-serif',
    fontWeight: 600,
    fontSize: '15px',
    padding: '14px 28px',
    borderRadius: '9999px',
    border: '1px solid rgba(13, 13, 13, 0.1)',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  heroRight: {
    flex: '1 1 420px',
    maxWidth: '520px',
    width: '100%',
  },
  bookingCard: {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(13, 13, 13, 0.08)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 16px 48px rgba(13, 13, 13, 0.05)',
    transition: 'all 0.3s ease',
  },
  cardHeader: {
    fontSize: '24px',
    fontWeight: 800,
    marginBottom: '24px',
    textAlign: 'center' as const,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  formField: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    flex: 1,
  },
  fieldLabel: {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    color: '#888',
    letterSpacing: '0.5px',
  },
  inputWrapper: {
    position: 'relative' as const,
    width: '100%',
  },
  inputPillOverride: {
    padding: '10px 18px',
    fontSize: '14px',
    border: '1px solid rgba(13, 13, 13, 0.08)',
    height: '42px',
  },
  selectPillOverride: {
    padding: '10px 18px',
    fontSize: '14px',
    border: '1px solid rgba(13, 13, 13, 0.08)',
    height: '42px',
    width: '100%',
    borderRadius: '9999px',
    backgroundColor: '#fafafa',
    fontFamily: 'var(--font-sans)',
    cursor: 'pointer',
  },
  swapButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '-8px 0',
    zIndex: 2,
    position: 'relative' as const,
  },
  swapBtn: {
    background: '#ffffff',
    border: '1px solid rgba(13, 13, 13, 0.08)',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#18E299',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  tabsContainer: {
    display: 'flex',
    backgroundColor: 'rgba(13, 13, 13, 0.04)',
    padding: '4px',
    borderRadius: '9999px',
    gap: '2px',
  },
  tabActive: {
    flex: 1,
    border: 'none',
    background: '#ffffff',
    color: '#0d0d0d',
    fontWeight: 600,
    fontSize: '12px',
    padding: '8px 4px',
    borderRadius: '9999px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  tabInactive: {
    flex: 1,
    border: 'none',
    background: 'none',
    color: '#666',
    fontWeight: 500,
    fontSize: '12px',
    padding: '8px 4px',
    borderRadius: '9999px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  bottomRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
  },
  stepperCol: {
    flex: 1,
  },
  dateCol: {
    flex: 1,
  },
  timeCol: {
    flex: 1,
  },
  stepper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    border: '1px solid rgba(13, 13, 13, 0.08)',
    borderRadius: '9999px',
    height: '42px',
    padding: '0 8px',
  },
  stepBtn: {
    background: 'none',
    border: 'none',
    fontWeight: 'bold' as const,
    fontSize: '16px',
    color: '#666',
    cursor: 'pointer',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepValue: {
    fontWeight: 600,
    fontSize: '14px',
    color: '#0d0d0d',
  },
  priceNotice: {
    backgroundColor: 'rgba(24, 226, 153, 0.1)',
    border: '1px solid rgba(24, 226, 153, 0.2)',
    padding: '8px 16px',
    borderRadius: '12px',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  oldPrice: {
    textDecoration: 'line-through',
    color: '#888',
    marginLeft: '4px',
    fontSize: '11px',
  },
  btnSubmit: {
    width: '100%',
    justifyContent: 'center',
    height: '46px',
    marginTop: '8px',
  },
  servicesSection: {
    backgroundColor: '#fafafa',
    padding: '80px 0',
    borderBottom: '1px solid rgba(13, 13, 13, 0.05)',
  },
  sectionHeader: {
    textAlign: 'center' as const,
    marginBottom: '48px',
  },
  sectionBadge: {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '12px',
    fontWeight: 700,
    color: '#12b77a',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  sectionTitle: {
    fontSize: '36px',
    marginTop: '12px',
  },
  pricingGrid: {
    display: 'flex',
    gap: '32px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
    maxWidth: '1200px',
    margin: '0 auto',
  },
  pricingCardLight: {
    flex: '1 1 320px',
    maxWidth: '360px',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '520px',
    padding: '32px',
    justifyContent: 'space-between',
  },
  pricingCardDark: {
    flex: '1 1 320px',
    maxWidth: '360px',
    backgroundColor: '#0d0d0d',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '520px',
    position: 'relative' as const,
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
    justifyContent: 'space-between',
  },
  discountBadge: {
    position: 'absolute' as const,
    top: '16px',
    right: '16px',
    backgroundColor: '#18E299',
    color: '#0d0d0d',
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '10px',
    fontWeight: 700,
    padding: '4px 8px',
    borderRadius: '4px',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  iconTag: {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    color: '#666',
    textTransform: 'uppercase' as const,
  },
  pricingTitle: {
    fontSize: '28px',
    marginBottom: '12px',
  },
  pricingDesc: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#666',
  },
  pricingPriceContainer: {
    margin: '16px 0',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
  },
  pricingPriceLabel: {
    fontSize: '11px',
    color: '#888',
    textTransform: 'uppercase' as const,
    display: 'block',
    marginBottom: '2px',
    fontWeight: 600,
    letterSpacing: '0.5px',
  },
  pricingPrice: {
    fontSize: '36px',
    fontWeight: 800,
    color: '#0d0d0d',
    lineHeight: 1.1,
  },
  pricingPriceUnit: {
    fontSize: '13px',
    color: '#666',
    fontWeight: 500,
    marginTop: '2px',
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: '20px 0 0 0',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    textAlign: 'left' as const,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#444',
    lineHeight: '1.4',
  },
  checkIcon: {
    flexShrink: 0,
  },
  pricingBtnLight: {
    width: '100%',
    justifyContent: 'center',
  },
  pricingBtnDark: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#18E299',
    color: '#0d0d0d',
    border: 'none',
  },
  routesSection: {
    backgroundColor: '#fafafa',
    padding: '80px 0',
  },
  routeDetailsBox: {
    backgroundColor: 'rgba(13, 13, 13, 0.02)',
    border: '1px solid rgba(13, 13, 13, 0.06)',
    borderRadius: '12px',
    padding: '12px 16px',
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    alignItems: 'flex-start',
  },
  routeDetailsRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '13px',
    lineHeight: '1.4',
    textAlign: 'left' as const,
  },
  routeDetailsDotGreen: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#18E299',
    marginTop: '6px',
    flexShrink: 0,
  },
  routeDetailsDotRed: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#ff4d4d',
    marginTop: '6px',
    flexShrink: 0,
  },
  routeDetailsLabel: {
    fontWeight: 600,
    color: '#888',
    whiteSpace: 'nowrap' as const,
  },
  routeDetailsVal: {
    color: '#333',
  },
  promoPricingBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'rgba(24, 226, 153, 0.08)',
    border: '1px solid rgba(24, 226, 153, 0.15)',
    borderRadius: '12px',
    padding: '8px 12px',
    marginBottom: '20px',
    flexWrap: 'wrap' as const,
  },
  promoPriceItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
  },
  promoPriceLabel: {
    color: '#666',
    fontWeight: 500,
    fontFamily: 'var(--font-inter), sans-serif',
  },
  promoPriceVal: {
    color: '#12b77a',
    fontWeight: 700,
    fontFamily: 'var(--font-inter), sans-serif',
  },
  promoOldPrice: {
    textDecoration: 'line-through',
    color: '#aaa',
    fontSize: '11px',
    fontFamily: 'var(--font-inter), sans-serif',
  },
  promoPriceDivider: {
    width: '1px',
    height: '14px',
    backgroundColor: 'rgba(13, 13, 13, 0.1)',
  },
  routesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    marginTop: '32px',
  },
  routeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 24px',
    border: '1px solid rgba(13, 13, 13, 0.08)',
    borderRadius: '9999px',
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '15px',
    fontWeight: 600,
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
  },
  routePrice: {
    color: '#12b77a',
    fontWeight: 700,
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalCard: {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(241, 245, 249, 0.8)',
    borderRadius: '28px',
    padding: '32px',
    width: '100%',
    maxWidth: '460px',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.12)',
    position: 'relative' as const,
  },
  modalCloseBtn: {
    position: 'absolute' as const,
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    backgroundColor: '#f1f5f9',
  },
  modalTitle: {
    fontSize: '22px',
    fontWeight: 800,
    color: '#0f172a',
    marginBottom: '24px',
    textAlign: 'center' as const,
    letterSpacing: '-0.02em',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  successMessage: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0',
  },
  confirmDetailsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px',
    backgroundColor: '#f8fafc',
    borderRadius: '20px',
    padding: '20px',
    border: '1px solid #e2e8f0',
  },
  confirmRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  confirmLabel: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    flexShrink: 0,
  },
  confirmValue: {
    fontSize: '14px',
    color: '#0f172a',
    fontWeight: 600,
    textAlign: 'right' as const,
    wordBreak: 'break-word' as const,
  },
};
