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
    'nav.becomeDriver': 'Trở thành đối tác',
    'nav.bookNow': 'Đặt xe nhanh',
    'hero.title': 'Di chuyển thông minh cùng Omigo',
    'hero.subtitle': 'Omigo kết nối bạn với những chuyến xe ghép và bao xe an toàn, tiết kiệm.',
    'hero.call': 'Gọi 0868.801.601',
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
    'pricing.shared.btn': 'Đặt xe ghép',
    'pricing.private.btn': 'Bao xe ngay',
    'pricing.package.btn': 'Gửi hàng ngay',
    'pricing.badge': 'Bảng giá dịch vụ',
    'pricing.heading': 'Lựa chọn giải pháp di chuyển của bạn',
    'routes.title': 'Đóng góp lộ trình mong muốn',
    'routes.suggest': 'Đề xuất lộ trình mới',
    'footer.connect': 'Kết nối với chúng tôi',
    'footer.rights': '© 2026 Omigo. Tất cả các quyền được bảo hộ.',
    'form.route': 'Tuyến đường',
    'form.route.select': 'Chọn tuyến đường...',
    'form.route.custom': 'Tuyến khác (Nhập thủ công)...',
    'driver.modal.badge': 'ĐỐI TÁC',
    'driver.modal.title': 'Trở thành Đối tác Omigo',
    'driver.modal.subtitle': 'Tham gia cộng đồng tài xế Omigo và tối ưu hóa thu nhập của bạn.',
    'driver.modal.name': 'Họ và tên',
    'driver.modal.phone': 'Số điện thoại',
    'driver.modal.vehicle': 'Phương tiện',
    'driver.modal.area': 'Khu vực hoạt động',
    'driver.modal.experience': 'Kinh nghiệm',
    'driver.modal.submit': 'Gửi hồ sơ',
    'driver.modal.success': 'Đăng ký thành công! Omigo sẽ liên hệ lại với bạn sớm nhất.',
    'suggest.modal.title': 'Bạn không tìm thấy tuyến đường mình cần?',
    'suggest.modal.route': 'Ghi chú thêm',
    'suggest.modal.phone': 'Số điện thoại',
    'suggest.modal.submit': 'Gửi đề xuất',
    'suggest.modal.success': 'Đề xuất thành công! Omigo chân thành cảm ơn đóng góp của bạn.',
    'confirm.modal.title': 'Xác nhận thông tin đặt chuyến',
    'confirm.modal.name': 'HỌ VÀ TÊN',
    'confirm.modal.phone': 'SỐ ĐIỆN THOẠI',
    'confirm.modal.service': 'DỊCH VỤ',
    'confirm.modal.route': 'TUYẾN ĐƯỜNG',
    'confirm.modal.pickup': 'ĐỊA CHỈ ĐÓN',
    'confirm.modal.dropoff': 'ĐỊA CHỈ TRẢ',
    'confirm.modal.datetime': 'THỜI GIAN',
    'confirm.modal.details': 'CHI TIẾT',
    'confirm.modal.edit': 'Quay lại / Sửa',
    'confirm.modal.submit': 'Xác nhận đặt',
    'confirm.modal.success': 'Đặt chuyến thành công! Omigo sẽ liên hệ lại với bạn sớm nhất.',
    'confirm.modal.seat': 'ghế',
    'confirm.modal.vehicle': 'xe',
    'form.pickup.delivery': 'Địa chỉ gửi',
    'form.dropoff.delivery': 'Địa chỉ nhận',
    'form.date.delivery': 'Ngày gửi',
    'form.time.delivery': 'Giờ gửi',
    'confirm.modal.pickup.delivery': 'ĐỊA CHỈ GỬI',
    'confirm.modal.dropoff.delivery': 'ĐỊA CHỈ NHẬN',
    'nav.news': 'Tin tức',
    'news.title': 'Tin tức & Khám phá',
    'news.subtitle': 'Cập nhật tin tức mới nhất, cẩm nang di chuyển và các ưu đãi từ Omigo.',
    'news.readMore': 'Xem chi tiết',
    'news.badge': 'TIN TỨC',
    'news.noNews': 'Chưa có tin tức nào được đăng.',
    'news.adminLink': 'Trang Admin',
    'admin.title': 'Bảng Điều Khiển Admin - Omigo News',
    'admin.addBtn': 'Đăng bài viết',
    'admin.backHome': 'Quay lại Trang chủ',
    'admin.deleteBtn': 'Xóa',
  },
  en: {
    'nav.features': 'Features',
    'nav.services': 'Services',
    'nav.routes': 'Suggest Route',
    'nav.becomeDriver': 'Become a Partner',
    'nav.bookNow': 'Book Now',
    'hero.title': 'Smart travel with Omigo',
    'hero.subtitle': 'Omigo connects you with safe and saving carpools and private rides.',
    'hero.call': 'Call 0868.801.601',
    'hero.facebook': 'Contact Facebook',
    'form.pickup': 'Pickup',
    'form.dropoff': 'Dropoff',
    'form.service': 'Service',
    'form.service.shared': 'Shared',
    'form.service.private': 'Private',
    'form.service.package': 'Delivery',
    'form.seats': 'Seats',
    'form.vehicles': 'Vehicle',
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
    'pricing.badge': 'Service Pricing',
    'pricing.heading': 'Choose your travel solution',
    'routes.title': 'Haven\'t found the route you need?',
    'routes.suggest': 'Suggest new route',
    'footer.connect': 'Connect with us',
    'footer.rights': '© 2026 Omigo. All rights reserved.',
    'form.route': 'Route',
    'form.route.select': 'Select route...',
    'form.route.custom': 'Other route (Manual)...',
    'driver.modal.badge': 'PARTNER',
    'driver.modal.title': 'Become an Omigo Partner',
    'driver.modal.subtitle': 'Join the Omigo driver community and maximize your income.',
    'driver.modal.name': 'Full Name',
    'driver.modal.phone': 'Phone',
    'driver.modal.vehicle': 'Vehicle',
    'driver.modal.area': 'Area',
    'driver.modal.experience': 'Experience',
    'driver.modal.submit': 'Submit Profile',
    'driver.modal.success': 'Registration successful! Omigo will contact you as soon as possible.',
    'suggest.modal.title': 'Haven\'t found the route you need?',
    'suggest.modal.route': 'Additional Notes',
    'suggest.modal.phone': 'Phone Number',
    'suggest.modal.submit': 'Submit Proposal',
    'suggest.modal.success': 'Proposal submitted successfully! Thank you for your contribution.',
    'confirm.modal.title': 'Confirm Booking Details',
    'confirm.modal.name': 'FULL NAME',
    'confirm.modal.phone': 'PHONE NUMBER',
    'confirm.modal.service': 'SERVICE',
    'confirm.modal.route': 'ROUTE',
    'confirm.modal.pickup': 'PICKUP ADDRESS',
    'confirm.modal.dropoff': 'DROPOFF ADDRESS',
    'confirm.modal.datetime': 'TIME & DATE',
    'confirm.modal.details': 'DETAILS',
    'confirm.modal.edit': 'Back / Edit',
    'confirm.modal.submit': 'Confirm Booking',
    'confirm.modal.success': 'Booking successful! Omigo will contact you as soon as possible.',
    'confirm.modal.seat': 'seat(s)',
    'confirm.modal.vehicle': 'vehicle(s)',
    'form.pickup.delivery': 'Sender Address',
    'form.dropoff.delivery': 'Recipient Address',
    'form.date.delivery': 'Send Date',
    'form.time.delivery': 'Send Time',
    'confirm.modal.pickup.delivery': 'SENDER ADDRESS',
    'confirm.modal.dropoff.delivery': 'RECIPIENT ADDRESS',
    'nav.news': 'News',
    'news.title': 'News & Exploration',
    'news.subtitle': 'Get the latest news, travel guides, and promotions from Omigo.',
    'news.readMore': 'Read More',
    'news.badge': 'NEWS',
    'news.noNews': 'No news has been posted yet.',
    'news.adminLink': 'Admin Panel',
    'admin.title': 'Admin Dashboard - Omigo News',
    'admin.addBtn': 'Publish Article',
    'admin.backHome': 'Back to Homepage',
    'admin.deleteBtn': 'Delete',
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
