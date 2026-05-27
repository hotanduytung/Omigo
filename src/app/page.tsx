'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

interface TimeSlot {
  _id: string;
  departureTime: string;
  arrivalTime: string;
  fixedPrice: number;
  status: string;
}

interface TripConfig {
  _id: string;
  origin: string;
  destination: string;
  status: string;
  timeSlots: TimeSlot[];
}

function generateDateOptions(lang: 'vi' | 'en') {
  const options = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    
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
  return {
    value: `${hourStr}:00`,
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
  
  // API states
  const [tripConfigs, setTripConfigs] = useState<TripConfig[]>([]);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isDriverLoading, setIsDriverLoading] = useState(false);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);

  const getMatchedConfig = () => {
    const isTamKyToDaNang = route === 'tam-ky-da-nang';
    return tripConfigs.find(config => {
      if (isTamKyToDaNang) {
        return config.origin === 'Tam Kỳ' && config.destination === 'Đà Nẵng';
      } else {
        return config.origin === 'Đà Nẵng' && config.destination === 'Tam Kỳ';
      }
    });
  };

  useEffect(() => {
    setMounted(true);
    const options = generateDateOptions(language);
    setDateOptions(options);
    if (options.length > 0) {
      setDate(options[0].value);
    }
    setTime('07:00');

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/v1/public/trip-configs`)
      .then(res => res.json())
      .then(res => {
        if (res?.data?.items) {
          setTripConfigs(res.data.items);
        }
      })
      .catch(err => console.error("Error fetching trip configs:", err));
  }, []);

  useEffect(() => {
    const matched = getMatchedConfig();
    if (matched && matched.timeSlots && matched.timeSlots.length > 0) {
      setTime(matched.timeSlots[0].departureTime);
    } else {
      setTime('07:00');
    }
  }, [route, tripConfigs]);

  useEffect(() => {
    if (mounted) {
      const options = generateDateOptions(language);
      setDateOptions(options);
      if (options.length > 0 && !options.some(opt => opt.value === date)) {
        setDate(options[0].value);
      }
    }
  }, [language]);

  const getPickupPlaceholder = () => {
    if (route === 'tam-ky-da-nang') {
      if (serviceType === 'gui-hang') {
        return language === 'vi' ? 'Gửi từ Tam Kỳ' : 'Send from Tam Ky';
      }
      return language === 'vi' ? 'Đón tại Tam Kỳ' : 'Pickup in Tam Ky';
    } else {
      if (serviceType === 'gui-hang') {
        return language === 'vi' ? 'Gửi từ Đà Nẵng' : 'Send from Da Nang';
      }
      return language === 'vi' ? 'Đón tại Đà Nẵng' : 'Pickup in Da Nang';
    }
  };

  const getDropoffPlaceholder = () => {
    if (route === 'tam-ky-da-nang') {
      if (serviceType === 'gui-hang') {
        return language === 'vi' ? 'Giao tại Đà Nẵng' : 'Deliver to Da Nang';
      }
      return language === 'vi' ? 'Trả tại Đà Nẵng' : 'Dropoff in Da Nang';
    } else {
      if (serviceType === 'gui-hang') {
        return language === 'vi' ? 'Giao tại Tam Kỳ' : 'Deliver to Tam Ky';
      }
      return language === 'vi' ? 'Trả tại Tam Kỳ' : 'Dropoff in Tam Ky';
    }
  };

  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [driverVehicle, setDriverVehicle] = useState('');
  const [driverArea, setDriverArea] = useState('');
  const [driverExperience, setDriverExperience] = useState('');
  const [driverSuccess, setDriverSuccess] = useState(false);

  const [suggestPickup, setSuggestPickup] = useState('');
  const [suggestDropoff, setSuggestDropoff] = useState('');
  const [suggestPhone, setSuggestPhone] = useState('');
  const [suggestNotes, setSuggestNotes] = useState('');
  const [suggestSuccess, setSuggestSuccess] = useState(false);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSwap = (e: React.MouseEvent) => {
    e.preventDefault();
    const temp = pickup;
    setPickup(dropoff);
    setDropoff(temp);
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
    const matchedConfig = getMatchedConfig();
    if (!matchedConfig) {
      alert(language === 'vi' ? 'Không tìm thấy cấu hình tuyến cho chuyến đi này.' : 'Trip configuration not found for this route.');
      return;
    }
    
    const requestedDepartureTime = `${date}T${time}:00Z`;

    setIsBookingLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/v1/public/trip-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: fullName,
        phoneNumber: phone,
        tripConfigId: matchedConfig._id,
        pickupSpecificPoint: pickup,
        dropoffSpecificPoint: dropoff,
        requestedSeatCount: quantity,
        requestedDepartureTime: requestedDepartureTime,
        serviceType: serviceType,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Error booking trip');
        }
        setBookingSuccess(true);
        setTimeout(() => {
          setBookingSuccess(false);
          setIsConfirmModalOpen(false);
          setFullName('');
          setPhone('');
          setPickup('');
          setDropoff('');
          setQuantity(1);
        }, 2500);
      })
      .catch((err) => {
        alert(err.message || (language === 'vi' ? 'Đã xảy ra lỗi khi đặt chuyến. Vui lòng thử lại.' : 'Error booking trip. Please try again.'));
      })
      .finally(() => {
        setIsBookingLoading(false);
      });
  };

  const handleDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDriverLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/v1/public/drivers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: driverName,
        phoneNumber: driverPhone,
        vehicleType: driverVehicle,
        licenseNumber: driverExperience || 'Chưa cập nhật',
        licensePlate: driverArea || 'Chưa cập nhật',
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Error registering driver');
        }
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
      })
      .catch((err) => {
        alert(err.message || (language === 'vi' ? 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.' : 'Error registering. Please try again.'));
      })
      .finally(() => {
        setIsDriverLoading(false);
      });
  };

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuggestLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/v1/public/route-suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: suggestPickup,
        destination: suggestDropoff,
        phoneNumber: suggestPhone,
        note: suggestNotes,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Error sending suggestion');
        }
        setSuggestSuccess(true);
        setTimeout(() => {
          setSuggestSuccess(false);
          setSuggestPickup('');
          setSuggestDropoff('');
          setSuggestPhone('');
          setSuggestNotes('');
        }, 2500);
      })
      .catch((err) => {
        alert(err.message || (language === 'vi' ? 'Đã xảy ra lỗi khi gửi đề xuất. Vui lòng thử lại.' : 'Error sending suggestion. Please try again.'));
      })
      .finally(() => {
        setIsSuggestLoading(false);
      });
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
                <>Di chuyển thông minh cùng <span style={styles.heroHighlight}>Omigo</span></>
              ) : (
                <>Smart travel with <span style={styles.heroHighlight}>Omigo</span></>
              )}
            </h1>
            <p style={styles.heroSubtitle}>
              {language === 'vi' 
                ? 'Xe ghép, bao xe & gửi hàng Đà Nẵng ↔ Tam Kỳ.'
                : 'Carpools, private rides & courier delivery Da Nang ↔ Tam Ky.'
              }
            </p>

            {/* CTA + Contact Inline */}
            <div className="cta-social-row-container">
              <button 
                onClick={handleBookNowClick} 
                className="btn-accent-green hover-highlight-btn" 
                style={{ fontSize: '15px', padding: '13px 32px', fontWeight: 600, boxShadow: '0 6px 24px rgba(0, 212, 164, 0.32)', letterSpacing: '-0.2px' }}
              >
                {language === 'vi' ? 'Đặt chuyến ngay' : 'Book a ride'}
              </button>
              
              <div className="cta-social-links-wrap">
                <span className="cta-social-text-or">
                  {language === 'vi' ? '— hoặc đặt qua' : '— or book via'}
                </span>
                <div className="cta-social-links">
                  <a href="https://www.facebook.com/omigo.vn" target="_blank" rel="noopener noreferrer" className="cta-social-link-item fb" title="Facebook">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2" style={{ marginRight: '4px' }}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </a>
                  <span className="cta-social-separator">/</span>
                  <a href="https://zalo.me/0961099069" target="_blank" rel="noopener noreferrer" className="cta-social-link-item zalo" title="Zalo">
                    <svg width="14" height="14" viewBox="0 0 24 24" style={{ marginRight: '4px', borderRadius: '3.5px' }}><rect width="24" height="24" rx="5" fill="#0068FF"/><text x="3.5" y="16.5" fontFamily="Arial" fontWeight="900" fontSize="8.5" fill="white">zalo</text></svg>
                    Zalo
                  </a>
                  <span className="cta-social-separator">/</span>
                  <a href="tel:0961099069" className="cta-social-link-item phone" title="0961 099 069">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17l.92-.08z"/></svg>
                    {language === 'vi' ? 'Gọi 0961 099 069' : 'Call 0961 099 069'}
                  </a>
                </div>
              </div>
            </div>

            {/* Seamless Pricing Card (Shown Separately) */}
            <div className="promo-pricing-left-banner">
              <div className="promo-left-card">
                <span className="promo-left-label">{language === 'vi' ? 'Xe ghép' : 'Carpool'}</span>
                <div className="promo-left-prices">
                  <span className="promo-left-new">90k</span>
                  <span style={styles.stripPriceUnit}>{language === 'vi' ? '/ghế' : '/seat'}</span>
                </div>
              </div>
              
              <div className="promo-left-divider" />
              
              <div className="promo-left-card">
                <span className="promo-left-label">{language === 'vi' ? 'Bao xe' : 'Private'}</span>
                <div className="promo-left-prices">
                  <span className="promo-left-new">330k</span>
                  <span style={styles.stripPriceUnit}>{language === 'vi' ? '/xe' : '/car'}</span>
                </div>
              </div>
              
              <div className="promo-left-divider" />
              
              <div className="promo-left-card">
                <span className="promo-left-label">{language === 'vi' ? 'Gửi hàng' : 'Delivery'}</span>
                <div className="promo-left-prices">
                  <span className="promo-left-new">50k</span>
                  <span style={styles.stripPriceUnit}>{language === 'vi' ? '/đơn' : '/pkg'}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Booking Form Mockup Card */}
          <div className="hero-right-flex" style={styles.heroRight} id="booking-form">
            <div 
              className={`booking-card ${isHighlighted ? 'pulse-highlight' : ''}`}
              style={styles.bookingCard}
            >
              {/* Service Selection Tabs at the top */}
              <div style={styles.tabsContainer}>
                <button 
                  type="button" 
                  onClick={() => setServiceType('xe-ghep')}
                  style={serviceType === 'xe-ghep' ? styles.tabActive : styles.tabInactive}
                >
                  {t('form.service.shared')}
                </button>
                
                <button 
                  type="button" 
                  onClick={() => setServiceType('bao-xe')}
                  style={serviceType === 'bao-xe' ? styles.tabActive : styles.tabInactive}
                >
                  {t('form.service.private')}
                </button>
                
                <button 
                  type="button" 
                  onClick={() => setServiceType('gui-hang')}
                  style={serviceType === 'gui-hang' ? styles.tabActive : styles.tabInactive}
                >
                  {t('form.service.package')}
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="booking-form-grid">
                
                {/* Route Selector */}
                <div style={styles.formField}>
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

                {/* Pickup and Dropoff Address with Swap inline */}
                <div style={styles.formRowInline}>
                  <div style={styles.formField}>
                    <label className="field-label-compact">
                      {serviceType === 'gui-hang' ? t('form.pickup.delivery') : (language === 'vi' ? 'Địa chỉ đón' : 'Pickup Address')}
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

                  <div style={styles.swapBtnContainer}>
                    <button onClick={handleSwap} style={styles.swapBtn} type="button" aria-label="Swap locations">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8v12M17 20l-4-4M17 20l4-4" />
                      </svg>
                    </button>
                  </div>

                  <div style={styles.formField}>
                    <label className="field-label-compact">
                      {serviceType === 'gui-hang' ? t('form.dropoff.delivery') : (language === 'vi' ? 'Địa chỉ trả' : 'Dropoff Address')}
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

                {/* Date and Time — two columns so date text shows fully */}
                <div className="form-row two-cols">
                  <div className="form-group form-group-date" style={{ ...styles.formField, flex: 1.5 }}>
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

                  <div className="form-group form-group-time" style={{ ...styles.formField, flex: 1 }}>
                    <label className="field-label-compact">
                      {serviceType === 'gui-hang' ? t('form.time.delivery') : t('form.time')}
                    </label>
                    <select 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="select-compact"
                    >
                      {(() => {
                        const matchedConfig = getMatchedConfig();
                        if (matchedConfig && matchedConfig.timeSlots && matchedConfig.timeSlots.length > 0) {
                          return matchedConfig.timeSlots.map((slot) => (
                            <option key={slot._id} value={slot.departureTime}>
                              {slot.departureTime}
                            </option>
                          ));
                        }
                        return timeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ));
                      })()}
                    </select>
                  </div>

                  {serviceType !== 'gui-hang' && (
                    <div className="form-group form-group-qty" style={{ ...styles.formField, flex: 0.9 }}>
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

                {/* Name and Phone */}
                <div className="form-row two-cols">
                  <div style={styles.formField}>
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

                  <div style={styles.formField}>
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

                <button type="submit" className="btn-accent-green" style={{ ...styles.btnSubmit, boxShadow: '0 4px 16px rgba(0, 212, 164, 0.25)', fontWeight: 600 }}>
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
            <h2 style={styles.sectionTitle}>{language === 'vi' ? 'Dịch vụ của chúng tôi' : 'Our Services'}</h2>
          </div>
          
          <div className="pricing-grid-flex" style={styles.pricingGrid}>
            {/* Card 1: Xe ghép (Flat canvas card) */}
            <div className="card-base pricing-card-res" style={styles.pricingCard}>
              <div>
                <div style={styles.iconContainer}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green-deep)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span style={styles.iconTag}>{language === 'vi' ? 'Cá nhân' : 'Individual'}</span>
                </div>
                <h3 style={styles.pricingTitle}>{t('pricing.shared.title')}</h3>
                
                <ul style={styles.featuresList}>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Đón trả tận nơi' : 'Door-to-door pickup'}</span>
                  </li>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Xe đời mới sạch sẽ' : 'Clean modern cars'}</span>
                  </li>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Tiết kiệm tối đa' : 'Maximum savings'}</span>
                  </li>
                </ul>
              </div>

              <div>
                <div style={styles.pricingPriceContainer}>
                  <span style={styles.pricingPriceLabel}>{language === 'vi' ? 'Giá từ' : 'Price from'}</span>
                  <div style={styles.priceRow}>
                    <span className="font-mono" style={styles.pricingPrice}>90k</span>
                    <span style={styles.pricingPriceUnit}>{language === 'vi' ? '/ghế' : '/seat'}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleSelectService('xe-ghep')} 
                  className="btn-secondary" 
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {t('pricing.shared.btn')}
                </button>
              </div>
            </div>

            {/* Card 2: Bao xe (Featured card with mint green border and shadow glow) */}
            <div className="pricing-card-featured pricing-card-res" style={styles.pricingCardFeatured}>
              <div style={styles.discountBadge}>{language === 'vi' ? 'ƯU ĐÃI NHẤT' : 'BEST VALUE'}</div>
              <div>
                <div style={styles.iconContainer}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span style={{ ...styles.iconTag, color: 'var(--color-brand-green)' }}>{language === 'vi' ? 'Gia đình & Nhóm' : 'Family & Group'}</span>
                </div>
                <h3 style={styles.pricingTitle}>{t('pricing.private.title')}</h3>
                
                <ul style={styles.featuresList}>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Không gian riêng tư' : 'Private comfortable space'}</span>
                  </li>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Thời gian linh hoạt' : 'Full schedule flexibility'}</span>
                  </li>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Điểm đón tùy chọn' : 'Customizable pickup points'}</span>
                  </li>
                </ul>
              </div>

              <div>
                <div style={styles.pricingPriceContainer}>
                  <span style={styles.pricingPriceLabel}>{language === 'vi' ? 'Giá từ' : 'Price from'}</span>
                  <div style={styles.priceRow}>
                    <span className="font-mono" style={{ ...styles.pricingPrice, color: 'var(--color-brand-green-deep)' }}>330k</span>
                    <span style={styles.pricingPriceUnit}>{language === 'vi' ? '/xe' : '/car'}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleSelectService('bao-xe')} 
                  className="btn-accent-green" 
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {t('pricing.private.btn')}
                </button>
              </div>
            </div>

            {/* Card 3: Giao hàng (Flat canvas card) */}
            <div className="card-base pricing-card-res" style={styles.pricingCard}>
              <div>
                <div style={styles.iconContainer}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green-deep)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="21 8 21 21 3 21 3 8" />
                    <rect x="1" y="3" width="22" height="5" />
                    <line x1="10" y1="12" x2="14" y2="12" />
                  </svg>
                  <span style={styles.iconTag}>{language === 'vi' ? 'Hàng hóa' : 'Cargo'}</span>
                </div>
                <h3 style={styles.pricingTitle}>{t('pricing.package.title')}</h3>
                
                <ul style={styles.featuresList}>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Giao nhận trong ngày' : 'Same-day delivery'}</span>
                  </li>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Bảo đảm an toàn' : 'Safety guaranteed'}</span>
                  </li>
                  <li style={styles.featureItem}>
                    <svg style={styles.checkIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{language === 'vi' ? 'Cước phí tối ưu' : 'Optimized courier rates'}</span>
                  </li>
                </ul>
              </div>

              <div>
                <div style={styles.pricingPriceContainer}>
                  <span style={styles.pricingPriceLabel}>{language === 'vi' ? 'Cước phí từ' : 'Fee from'}</span>
                  <div style={styles.priceRow}>
                    <span className="font-mono" style={styles.pricingPrice}>50k</span>
                    <span style={styles.pricingPriceUnit}>{language === 'vi' ? '/đơn' : '/order'}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleSelectService('gui-hang')} 
                  className="btn-secondary" 
                  style={{ width: '100%', justifyContent: 'center' }}
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
                  <>Bạn không tìm thấy <span style={{ color: 'var(--color-brand-green)' }}>tuyến đường mình cần?</span></>
                ) : (
                  <>Haven't found the <span style={{ color: 'var(--color-brand-green)' }}>route you need?</span></>
                )}
              </h2>
              <p className="suggest-subtext">
                {language === 'vi'
                  ? 'Cho chúng tôi biết lộ trình của bạn để được hỗ trợ nhanh nhất.'
                  : 'Tell us your route details to get assistance as soon as possible.'}
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
            
            {/* Right Column Form */}
            <div className="suggest-route-right">
              <div className="suggest-form-container">
                {suggestSuccess ? (
                  <div style={styles.successMessage}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#12b77a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <p style={{ color: '#12b77a', fontWeight: 600, textAlign: 'center' }}>
                      {language === 'vi'
                        ? 'Đề xuất thành công! Omigo chân thành cảm ơn đóng góp của bạn.'
                        : 'Proposal submitted successfully! Thank you for your contribution.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSuggestSubmit} className="suggest-form">
                    <div className="suggest-form-row">
                      <div className="suggest-form-group">
                        <label className="suggest-form-label">{t('form.pickup')}</label>
                        <input 
                          type="text" 
                          placeholder={language === 'vi' ? 'Ví dụ: Hội An' : 'e.g. Hoi An'} 
                          value={suggestPickup}
                          onChange={(e) => setSuggestPickup(e.target.value)}
                          required
                          className="suggest-input"
                        />
                      </div>
                      <div className="suggest-form-group">
                        <label className="suggest-form-label">{t('form.dropoff')}</label>
                        <input 
                          type="text" 
                          placeholder={language === 'vi' ? 'Ví dụ: Chu Lai' : 'e.g. Chu Lai'} 
                          value={suggestDropoff}
                          onChange={(e) => setSuggestDropoff(e.target.value)}
                          required
                          className="suggest-input"
                        />
                      </div>
                    </div>
                    
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
                    
                    <button 
                      type="submit" 
                      disabled={isSuggestLoading}
                      className="suggest-submit-btn"
                      style={{ opacity: isSuggestLoading ? 0.7 : 1, cursor: isSuggestLoading ? 'not-allowed' : 'pointer' }}
                    >
                      {isSuggestLoading ? (language === 'vi' ? 'Đang gửi...' : 'Submitting...') : t('suggest.modal.submit')}
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px', alignItems: 'flex-start' }}>
              <span className="suggest-badge" style={{ marginBottom: '8px', textTransform: 'uppercase' }}>
                {t('driver.modal.badge')}
              </span>
              <h3 style={{ fontSize: '24px', fontWeight: 600, margin: 0, color: 'var(--color-text-ink)' }}>
                {t('driver.modal.title')}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-slate)', margin: 0, lineHeight: '1.5' }}>
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
              <form onSubmit={handleDriverSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  <div style={styles.formFieldModal}>
                    <label style={styles.modalFieldLabel}>{t('driver.modal.name')}</label>
                    <input 
                      type="text" 
                      placeholder="Nguyễn Văn A"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      required
                      className="suggest-input"
                      style={{ height: '40px' }}
                    />
                  </div>

                  <div style={styles.formFieldModal}>
                    <label style={styles.modalFieldLabel}>{t('driver.modal.phone')}</label>
                    <input 
                      type="tel" 
                      placeholder="0905.XXX.XXX"
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      required
                      className="suggest-input"
                      style={{ height: '40px' }}
                    />
                  </div>

                  <div style={styles.formFieldModal}>
                    <label style={styles.modalFieldLabel}>{t('driver.modal.vehicle')}</label>
                    <input 
                      type="text" 
                      placeholder="Toyota Vios..."
                      value={driverVehicle}
                      onChange={(e) => setDriverVehicle(e.target.value)}
                      required
                      className="suggest-input"
                      style={{ height: '40px' }}
                    />
                  </div>

                  <div style={styles.formFieldModal}>
                    <label style={styles.modalFieldLabel}>{t('driver.modal.area')}</label>
                    <input 
                      type="text" 
                      placeholder="Tam Kỳ, Đà Nẵng..."
                      value={driverArea}
                      onChange={(e) => setDriverArea(e.target.value)}
                      required
                      className="suggest-input"
                      style={{ height: '40px' }}
                    />
                  </div>
                </div>

                <div style={styles.formFieldModal}>
                  <label style={styles.modalFieldLabel}>{t('driver.modal.experience')}</label>
                  <textarea 
                    placeholder="..."
                    value={driverExperience}
                    onChange={(e) => setDriverExperience(e.target.value)}
                    className="suggest-textarea"
                    rows={3}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isDriverLoading}
                  className="suggest-submit-btn" 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: isDriverLoading ? 0.7 : 1, cursor: isDriverLoading ? 'not-allowed' : 'pointer' }}
                >
                  {isDriverLoading ? (language === 'vi' ? 'Đang gửi...' : 'Submitting...') : t('driver.modal.submit')}
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                <p style={{ color: '#12b77a', fontWeight: 600, textAlign: 'center' }}>
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
                        ? 'var(--color-brand-green-soft)' 
                        : serviceType === 'bao-xe' 
                          ? 'rgba(0, 212, 164, 0.12)' 
                          : 'rgba(59, 130, 246, 0.12)',
                      color: serviceType === 'xe-ghep' 
                        ? 'var(--color-brand-green-deep)' 
                        : serviceType === 'bao-xe' 
                          ? '#008b6b' 
                          : '#1d4ed8',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: 600,
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
                        ? <>Tam Kỳ <span style={{ color: 'var(--color-brand-green-deep)', margin: '0 2px', fontWeight: 600 }}>↔</span> Đà Nẵng</>
                        : <>Đà Nẵng <span style={{ color: 'var(--color-brand-green-deep)', margin: '0 2px', fontWeight: 600 }}>↔</span> Tam Kỳ</>}
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
                      {time} <span style={{ color: 'var(--color-text-steel)', margin: '0 4px' }}>|</span> {dateOptions.find(opt => opt.value === date)?.label || date}
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
                    className="btn-secondary" 
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => setIsConfirmModalOpen(false)}
                  >
                    {t('confirm.modal.edit')}
                  </button>
                   <button 
                    type="button" 
                    className="btn-primary" 
                    style={{ flex: 1, justifyContent: 'center', opacity: isBookingLoading ? 0.7 : 1, cursor: isBookingLoading ? 'not-allowed' : 'pointer' }}
                    onClick={handleConfirmBooking}
                    disabled={isBookingLoading}
                  >
                    {isBookingLoading ? (language === 'vi' ? 'Đang đặt...' : 'Booking...') : t('confirm.modal.submit')}
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
    background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.12) 0%, rgba(0, 212, 164, 0.08) 50%, rgba(224, 242, 254, 0.35) 100%)',
    padding: '80px 0',
    borderBottom: '1px solid var(--color-hairline-soft)',
    position: 'relative' as const,
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
    maxWidth: '560px',
  },
  badge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 600,
    backgroundColor: 'var(--color-brand-green-soft)',
    color: 'var(--color-brand-green-deep)',
    padding: '4px 10px',
    borderRadius: '9999px',
    display: 'inline-block',
    marginBottom: '20px',
    letterSpacing: '0.05em',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: '1.1',
    letterSpacing: '-1.5px',
    marginBottom: '16px',
    color: 'var(--color-text-ink)',
  },
  heroHighlight: {
    color: 'var(--color-brand-green-deep)',
    position: 'relative' as const,
    display: 'inline-block',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: 'var(--color-text-slate)',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  infoStrip: {
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    borderRadius: '18px',
    padding: '12px 16px',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
    gap: '0',
    maxWidth: '520px',
  },
  stripPrices: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  },
  stripPriceItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1px',
    padding: '0 10px',
  },
  stripPriceLabel: {
    fontSize: '10px',
    fontWeight: 700,
    color: '#a0aec0',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.07em',
    lineHeight: 1,
  },
  stripPriceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '1px',
    marginTop: '2px',
  },
  stripPriceAmt: {
    fontSize: '19px',
    fontWeight: 700,
    color: 'var(--color-brand-green-deep)',
    fontFamily: 'var(--font-mono)',
    lineHeight: 1.1,
    letterSpacing: '-0.5px',
  },
  stripPriceUnit: {
    fontSize: '11px',
    color: '#94a3b8',
    fontWeight: 500,
  },
  stripDot: {
    color: 'rgba(0,0,0,0.12)',
    fontSize: '20px',
    lineHeight: 1,
    userSelect: 'none' as const,
    padding: '0 2px',
    flexShrink: 0,
  },
  stripVSep: {
    width: '1px',
    height: '32px',
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    margin: '0 12px',
    flexShrink: 0,
  },
  stripContacts: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  },
  stripIconBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    textDecoration: 'none',
    transition: 'all 0.16s ease',
    flexShrink: 0,
  },
  ctaGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap' as const,
  },
  heroRight: {
    flex: '1 1 420px',
    maxWidth: '480px',
    width: '100%',
  },
  bookingCard: {
    backgroundColor: 'var(--color-canvas)',
    border: '1px solid var(--color-hairline)',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 24px 48px -8px',
    transition: 'all 0.3s ease',
  },
  formField: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    flex: 1,
  },
  formFieldModal: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    flex: 1,
    width: '100%',
  },
  tabsContainer: {
    display: 'flex',
    backgroundColor: 'var(--color-surface-soft)',
    padding: '4px',
    borderRadius: '9999px',
    gap: '2px',
    marginBottom: '20px',
  },
  tabActive: {
    flex: 1,
    border: 'none',
    background: 'var(--color-canvas-dark)',
    color: 'var(--color-text-on-dark)',
    fontWeight: 500,
    fontSize: '13px',
    padding: '8px 4px',
    borderRadius: '9999px',
    cursor: 'pointer',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
  },
  tabInactive: {
    flex: 1,
    border: 'none',
    background: 'none',
    color: 'var(--color-text-steel)',
    fontWeight: 500,
    fontSize: '13px',
    padding: '8px 4px',
    borderRadius: '9999px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
  },
  formRowInline: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    width: '100%',
  },
  swapBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '8px',
  },
  swapBtn: {
    background: 'var(--color-canvas)',
    border: '1px solid var(--color-hairline)',
    borderRadius: '9999px',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--color-brand-green-deep)',
    transition: 'all 0.2s ease',
    boxShadow: 'var(--shadow-sm)',
  },
  stepperInput: {
    height: '48px',
  },
  btnSubmit: {
    width: '100%',
    justifyContent: 'center',
    height: '46px',
    marginTop: '8px',
  },
  servicesSection: {
    backgroundColor: 'var(--color-surface)',
    padding: '80px 0',
    borderBottom: '1px solid var(--color-hairline-soft)',
  },
  sectionHeader: {
    textAlign: 'center' as const,
    marginBottom: '48px',
  },
  sectionBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--color-brand-green-deep)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: 600,
    marginTop: '12px',
    color: 'var(--color-text-ink)',
  },
  pricingGrid: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
    maxWidth: '1200px',
    margin: '0 auto',
  },
  pricingCard: {
    flex: '1 1 300px',
    maxWidth: '360px',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '380px',
    padding: '32px',
    justifyContent: 'space-between',
    backgroundColor: 'var(--color-canvas)',
    border: '1px solid var(--color-hairline)',
    borderRadius: '12px',
  },
  pricingCardFeatured: {
    flex: '1 1 300px',
    maxWidth: '360px',
    backgroundColor: 'var(--color-canvas)',
    border: '2px solid var(--color-brand-green)',
    borderRadius: '12px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '380px',
    position: 'relative' as const,
    boxShadow: 'var(--shadow-brand-glow)',
    justifyContent: 'space-between',
  },
  discountBadge: {
    position: 'absolute' as const,
    top: '16px',
    right: '16px',
    backgroundColor: 'var(--color-brand-green)',
    color: 'var(--color-text-ink)',
    fontFamily: 'var(--font-sans)',
    fontSize: '10px',
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: '9999px',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  iconTag: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--color-text-steel)',
    textTransform: 'uppercase' as const,
  },
  pricingTitle: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '8px',
    color: 'var(--color-text-ink)',
  },
  pricingDesc: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: 'var(--color-text-slate)',
    margin: 0,
  },
  pricingPriceContainer: {
    margin: '24px 0 16px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
  },
  pricingPriceLabel: {
    fontSize: '11px',
    color: 'var(--color-text-steel)',
    textTransform: 'uppercase' as const,
    display: 'block',
    marginBottom: '2px',
    fontWeight: 600,
    letterSpacing: '0.05em',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '2px',
  },
  pricingPrice: {
    fontSize: '36px',
    fontWeight: 600,
    color: 'var(--color-text-ink)',
    lineHeight: 1.1,
  },
  pricingPriceUnit: {
    fontSize: '13px',
    color: 'var(--color-text-slate)',
    fontWeight: 500,
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: '20px 0 0 0',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--color-text-slate)',
    lineHeight: '1.4',
  },
  checkIcon: {
    flexShrink: 0,
  },


  routesSection: {
    backgroundColor: 'var(--color-surface)',
    padding: '80px 0',
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
    backgroundColor: 'var(--color-canvas)',
    border: '1px solid var(--color-hairline)',
    borderRadius: '16px',
    padding: '32px',
    width: '100%',
    maxWidth: '460px',
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 24px 48px -8px',
    position: 'relative' as const,
  },
  modalCloseBtn: {
    position: 'absolute' as const,
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    color: 'var(--color-text-steel)',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    backgroundColor: 'var(--color-surface-soft)',
  },
  modalTitle: {
    fontSize: '22px',
    fontWeight: 600,
    color: 'var(--color-text-ink)',
    marginTop: '12px',
    marginBottom: '24px',
    textAlign: 'center' as const,
    letterSpacing: '-0.5px',
    lineHeight: '1.4',
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
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid var(--color-hairline-soft)',
  },
  confirmRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  confirmLabel: {
    fontSize: '11px',
    color: 'var(--color-text-steel)',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    flexShrink: 0,
  },
  confirmValue: {
    fontSize: '14px',
    color: 'var(--color-text-ink)',
    fontWeight: 600,
    textAlign: 'right' as const,
    wordBreak: 'break-word' as const,
  },
  modalFieldLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-slate)',
    marginBottom: '2px',
    display: 'block',
  }
};
