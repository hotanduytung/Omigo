'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'vi' | 'en';

type Translations = {
  [key: string]: string;
};

const translations: Record<Language, Translations> = {
  vi: {
    'nav.features': 'Tính năng',
    'nav.services': 'Dịch vụ',
    'nav.routes': 'Đóng góp lộ trình',
    'nav.becomeDriver': 'Trở thành tài xế',
    'nav.bookNow': 'Đặt xe nhanh',
    'hero.title': 'Di chuyển thông minh cùng Migo',
    'hero.subtitle': 'Migo kết nối bạn với những chuyến xe ghép và bao xe an toàn, tiết kiệm.',
    'hero.call': 'Gọi 0961099069',
    'hero.facebook': 'Liên hệ Facebook',
    'form.pickup': 'Điểm đi',
    'form.dropoff': 'Điểm đến',
    'form.service': 'Dịch vụ',
    'form.service.shared': 'Xe ghép',
    'form.service.private': 'Bao xe',
    'form.service.package': 'Giao hàng',
    'form.seats': 'Số lượng ghế',
    'form.vehicles': 'Số lượng xe',
    'form.date': 'Ngày đi',
    'form.time': 'Giờ đi',
    'form.confirm': 'Xác nhận',
    'pricing.shared.title': 'Xe ghép',
    'pricing.shared.desc': 'Di chuyển tiết kiệm bằng cách chia sẻ chuyến đi với hành khách khác.',
    'pricing.shared.price': 'Chỉ từ 90k/ghế',
    'pricing.private.title': 'Bao xe',
    'pricing.private.desc': 'Không gian riêng tư, thoải mái và tự chủ hoàn toàn thời gian hành trình.',
    'pricing.private.price': 'Chỉ từ 330k/xe',
    'pricing.package.title': 'Giao hàng',
    'pricing.package.desc': 'Vận chuyển hàng hóa nhanh chóng, an toàn và tối ưu chi phí giữa các tỉnh thành.',
    'pricing.package.price': 'Chỉ từ 50k/đơn',
    'pricing.shared.btn': 'Tìm xe ghép',
    'pricing.private.btn': 'Bao xe ngay',
    'pricing.package.btn': 'Gửi hàng ngay',
    'routes.title': 'Đóng góp lộ trình mong muốn',
    'routes.suggest': 'Đề xuất lộ trình mới',
    'footer.connect': 'Kết nối với chúng tôi',
    'footer.rights': '© 2026 Migo. Tất cả các quyền được bảo hộ.',
    'form.route': 'Tuyến đường',
    'form.route.select': 'Chọn tuyến đường...',
    'form.route.custom': 'Tuyến khác (Nhập thủ công)...',
    'driver.modal.title': 'Đăng ký trở thành tài xế Migo',
    'driver.modal.name': 'Họ và tên',
    'driver.modal.phone': 'Số điện thoại',
    'driver.modal.vehicle': 'Loại xe',
    'driver.modal.submit': 'Gửi đăng ký',
    'driver.modal.success': 'Đăng ký thành công! Migo sẽ liên hệ lại với bạn sớm nhất.',
    'suggest.modal.title': 'Đề xuất lộ trình bạn mong muốn',
    'suggest.modal.route': 'Lộ trình mong muốn (VD: Tam Kỳ - Đà Nẵng)',
    'suggest.modal.submit': 'Gửi đề xuất',
    'suggest.modal.success': 'Đề xuất thành công! Migo chân thành cảm ơn đóng góp của bạn.',
  },
  en: {
    'nav.features': 'Features',
    'nav.services': 'Services',
    'nav.routes': 'Suggest Route',
    'nav.becomeDriver': 'Become a Driver',
    'nav.bookNow': 'Book Now',
    'hero.title': 'Smart travel with Migo',
    'hero.subtitle': 'Migo connects you with safe and saving carpools and private rides.',
    'hero.call': 'Call 0961099069',
    'hero.facebook': 'Contact Facebook',
    'form.pickup': 'Pickup',
    'form.dropoff': 'Dropoff',
    'form.service': 'Service',
    'form.service.shared': 'Shared',
    'form.service.private': 'Private',
    'form.service.package': 'Delivery',
    'form.seats': 'Seats Quantity',
    'form.vehicles': 'Vehicle Quantity',
    'form.date': 'Date',
    'form.time': 'Time',
    'form.confirm': 'Confirm',
    'pricing.shared.title': 'Shared ride',
    'pricing.shared.desc': 'Travel economically by sharing your ride with other passengers.',
    'pricing.shared.price': 'From 90k/seat',
    'pricing.private.title': 'Private car',
    'pricing.private.desc': 'Private space, comfortable and completely autonomous in travel time.',
    'pricing.private.price': 'From 330k/car',
    'pricing.package.title': 'Delivery',
    'pricing.package.desc': 'Quick, safe and cost-effective package transportation between provinces.',
    'pricing.package.price': 'From 50k/package',
    'pricing.shared.btn': 'Find shared ride',
    'pricing.private.btn': 'Book private car',
    'pricing.package.btn': 'Send package now',
    'routes.title': 'Propose Your Desired Route',
    'routes.suggest': 'Suggest new route',
    'footer.connect': 'Connect with us',
    'footer.rights': '© 2026 Migo. All rights reserved.',
    'form.route': 'Route',
    'form.route.select': 'Select route...',
    'form.route.custom': 'Other route (Manual)...',
    'driver.modal.title': 'Become a Migo Driver',
    'driver.modal.name': 'Full Name',
    'driver.modal.phone': 'Phone Number',
    'driver.modal.vehicle': 'Vehicle Type',
    'driver.modal.submit': 'Submit Application',
    'driver.modal.success': 'Registration successful! Migo will contact you as soon as possible.',
    'suggest.modal.title': 'Propose Your Custom Route',
    'suggest.modal.route': 'Desired Route (e.g. Tam Ky - Da Nang)',
    'suggest.modal.submit': 'Submit Proposal',
    'suggest.modal.success': 'Proposal submitted successfully! Thank you for your contribution.',
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
