"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const premiumGradients = [
  'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
  'linear-gradient(135deg, #4E65FF 0%, #92EFFD 100%)',
  'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  'linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)',
];

interface NewsItem {
  id: string;
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  gradientIndex?: number;
  date: string;
  category: string;
}

const defaultNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Omigo chính thức khai trương tuyến xe ghép Đà Nẵng - Tam Kỳ',
    excerpt: 'Dịch vụ di chuyển tiện lợi, đón trả tận nơi với mức giá siêu tiết kiệm chỉ từ 90.000đ/ghế, cam kết không trễ giờ.',
    content: 'Chúng tôi vô cùng tự hào thông báo Omigo đã chính thức khai trương dịch vụ xe ghép và bao xe chuyên nghiệp trên tuyến đường huyết mạch Đà Nẵng - Tam Kỳ và ngược lại.\n\nVới mong muốn mang lại trải nghiệm di chuyển chất lượng cao và tiết kiệm nhất cho quý hành khách, Omigo cam kết:\n\n1. **Đón trả tận nơi**: Hành khách không cần di chuyển ra bến xe, chúng tôi hỗ trợ đón trả tại nhà hoặc các điểm hẹn thuận tiện.\n\n2. **Đúng giờ & Đúng lộ trình**: Không bắt khách dọc đường, thời gian di chuyển tối ưu chỉ khoảng 1.5 - 2 giờ.\n\n3. **Xe đời mới & An toàn**: Đội ngũ xe 4 chỗ, 7 chỗ đời mới luôn sạch sẽ, bảo dưỡng định kỳ cùng đội ngũ tài xế tận tâm, lịch sự.\n\n4. **Tiết kiệm chi phí**: Giá vé xe ghép chỉ từ 90k/ghế, giúp bạn tiết kiệm lên tới 50% so với đi taxi truyền thống.\n\nĐặt xe ngay hôm nay qua website hoặc hotline 0868.801.601 để nhận được nhiều ưu đãi hấp dẫn!',
    category: 'Tin tức',
    date: '2026-06-24',
    gradientIndex: 0,
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'news-2',
    title: 'Cẩm nang đi xe ghép an toàn và thoải mái cho người mới',
    excerpt: 'Lưu lại ngay những mẹo nhỏ cực kỳ hữu ích này để có một chuyến đi xe ghép trọn vẹn, an toàn và dễ chịu.',
    content: 'Đi xe ghép (đi chung xe) đang trở thành xu hướng phổ biến nhờ tính tiện lợi và tiết kiệm chi phí. Tuy nhiên, để có một chuyến đi an toàn và thoải mái nhất, hành khách nên lưu ý các điểm sau:\n\n### 1. Đặt xe trước thời gian khởi hành\nNên đặt xe trước ít nhất 2 - 3 tiếng (hoặc từ ngày hôm trước đối với các chuyến đi sớm) để tài xế có thể sắp xếp lộ trình đón trả tối ưu nhất, tránh việc chờ đợi lâu.\n\n### 2. Chuẩn bị hành lý gọn gàng\nVì là chuyến xe đi chung với người khác, không gian cốp xe sẽ được chia sẻ. Bạn nên mang theo hành lý gọn gàng, nếu có đồ cồng kềnh hoặc gửi kèm hàng hóa, hãy thông báo trước cho tổng đài khi đặt xe.\n\n### 3. Xác nhận thông tin tài xế và biển số xe\nTrước khi lên xe, hãy đối chiếu thông tin tài xế, số điện thoại liên hệ và biển số xe khớp với thông tin đã được tổng đài hoặc hệ thống Omigo xác nhận để đảm bảo an toàn tuyệt đối.\n\n### 4. Giữ lịch sự trên xe\nHạn chế nói chuyện điện thoại quá to, sử dụng tai nghe khi xem phim/nghe nhạc và không mang theo thức ăn có mùi nồng để giữ không gian chung luôn dễ chịu cho tất cả hành khách.\n\nChúc bạn có những chuyến đi thật vui vẻ và thoải mái cùng Omigo!',
    category: 'Cẩm nang',
    date: '2026-06-22',
    gradientIndex: 1,
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'news-3',
    title: 'Nhận ưu đãi 20% cho chuyến đi đầu tiên cùng Omigo',
    excerpt: 'Mừng cột mốc 10.000 chuyến đi an toàn, Omigo gửi tặng mã giảm giá đặc biệt cho toàn bộ khách hàng mới trải nghiệm dịch vụ.',
    content: 'Omigo xin gửi lời tri ân sâu sắc đến toàn bộ quý khách hàng đã đồng hành cùng chúng tôi. Để chúc mừng cột mốc 10.000 chuyến đi an toàn, Omigo triển khai chương trình ưu đãi đặc biệt dành riêng cho khách hàng mới:\n\n🎁 **Ưu đãi giảm ngay 20%** cho chuyến đi đầu tiên (tối đa 50.000đ).\n\n**Cách thức nhận ưu đãi vô cùng đơn giản:**\n- Bước 1: Truy cập trang chủ omigo.vn và điền thông tin vào form đặt chuyến.\n- Bước 2: Tại phần ghi chú hoặc khi tổng đài viên gọi điện xác nhận, hãy đọc mã **OMIGO20**.\n- Bước 3: Tận hưởng chuyến đi an toàn, thoải mái và thanh toán mức giá đã giảm trực tiếp cho tài xế.\n\n*Lưu ý: Chương trình áp dụng cho cả dịch vụ xe ghép và bao xe chặng Đà Nẵng - Tam Kỳ đến hết ngày 31/07/2026. Số lượng mã ưu đãi có hạn, hãy nhanh tay đặt chuyến ngay hôm nay!*',
    category: 'Khuyến mãi',
    date: '2026-06-20',
    gradientIndex: 2,
    imageUrl: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=800&q=80',
  }
];

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

function parseParagraphContent(text: string) {
  const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={styles.strong}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('[') && part.includes('](')) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const [_, linkText, url] = match;
        const isFacebook = url.includes('facebook.com') || url.includes('fb.com');
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={isFacebook ? styles.facebookLinkInline : styles.normalLinkInline}
          >
            {isFacebook && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'text-bottom' }}>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            )}
            {linkText}
          </a>
        );
      }
    }
    return part;
  });
}

interface InlineBookingWidgetProps {
  service: string;
  route: string;
  title: string;
  tripConfigs: any[];
  language: 'vi' | 'en';
}

function InlineBookingWidget({ service, route: initialRoute, title, tripConfigs, language }: InlineBookingWidgetProps) {
  const [route, setRoute] = useState(initialRoute || 'tam-ky-da-nang');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dateOptions, setDateOptions] = useState<{ value: string; label: string }[]>([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

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
    const options = generateDateOptions(language);
    setDateOptions(options);
    if (options.length > 0) {
      setDate(options[0].value);
    }
  }, [language]);

  useEffect(() => {
    const matched = getMatchedConfig();
    if (matched && matched.timeSlots && matched.timeSlots.length > 0) {
      setTime(matched.timeSlots[0].departureTime);
    } else {
      setTime('07:00');
    }
  }, [route, tripConfigs]);

  const handleQuantityChange = (val: number) => {
    if (quantity + val >= 1) {
      setQuantity(quantity + val);
    }
  };

  const getPickupPlaceholder = () => {
    if (route === 'tam-ky-da-nang') {
      if (service === 'gui-hang') return language === 'vi' ? 'Gửi từ Tam Kỳ' : 'Send from Tam Ky';
      return language === 'vi' ? 'Đón tại Tam Kỳ' : 'Pickup in Tam Ky';
    } else {
      if (service === 'gui-hang') return language === 'vi' ? 'Gửi từ Đà Nẵng' : 'Send from Da Nang';
      return language === 'vi' ? 'Đón tại Đà Nẵng' : 'Pickup in Da Nang';
    }
  };

  const getDropoffPlaceholder = () => {
    if (route === 'tam-ky-da-nang') {
      if (service === 'gui-hang') return language === 'vi' ? 'Giao tại Đà Nẵng' : 'Deliver to Da Nang';
      return language === 'vi' ? 'Trả tại Đà Nẵng' : 'Dropoff in Da Nang';
    } else {
      if (service === 'gui-hang') return language === 'vi' ? 'Giao tại Tam Kỳ' : 'Deliver to Tam Ky';
      return language === 'vi' ? 'Trả tại Tam Kỳ' : 'Dropoff in Tam Ky';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedConfig = getMatchedConfig();
    if (!matchedConfig) {
      alert(language === 'vi' ? 'Không tìm thấy cấu hình tuyến cho chuyến đi này.' : 'Trip configuration not found.');
      return;
    }

    setIsSubmitLoading(true);
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
        requestedDepartureTime: `${date}T${time}:00Z`,
        serviceType: service,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error booking');
        setBookingSuccess(true);
        setTimeout(() => {
          setBookingSuccess(false);
          setFullName('');
          setPhone('');
          setPickup('');
          setDropoff('');
          setQuantity(1);
        }, 3000);
      })
      .catch((err) => {
        alert(err.message || 'Error booking');
      })
      .finally(() => {
        setIsSubmitLoading(false);
      });
  };

  return (
    <div style={styles.inlineBookingContainer}>
      <h3 style={styles.inlineBookingTitle}>{title}</h3>
      {bookingSuccess ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎉</div>
          <h4 style={{ color: '#10b981', fontWeight: 700, margin: '0 0 8px 0' }}>
            {language === 'vi' ? 'Gửi yêu cầu thành công!' : 'Request sent successfully!'}
          </h4>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            {language === 'vi' ? 'Omigo sẽ liên hệ với bạn trong ít phút.' : 'Omigo will contact you shortly.'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={styles.compactLabel}>{language === 'vi' ? 'Tuyến đường' : 'Route'}</label>
              <select
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                style={styles.compactSelect}
              >
                <option value="tam-ky-da-nang">Tam Kỳ ↔ Đà Nẵng</option>
                <option value="da-nang-tam-ky">Đà Nẵng ↔ Tam Kỳ</option>
              </select>
            </div>
            {service !== 'gui-hang' && (
              <div style={{ width: '110px' }}>
                <label style={styles.compactLabel}>
                  {service === 'xe-ghep' ? (language === 'vi' ? 'Số ghế' : 'Seats') : (language === 'vi' ? 'Số xe' : 'Cars')}
                </label>
                <div style={styles.compactStepper}>
                  <button type="button" onClick={() => handleQuantityChange(-1)} style={styles.stepperButton}>-</button>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>{quantity}</span>
                  <button type="button" onClick={() => handleQuantityChange(1)} style={styles.stepperButton}>+</button>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={styles.compactLabel}>
                {service === 'gui-hang' ? (language === 'vi' ? 'Địa chỉ gửi hàng' : 'Pickup address') : (language === 'vi' ? 'Địa chỉ đón' : 'Pickup address')}
              </label>
              <input
                type="text"
                placeholder={getPickupPlaceholder()}
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
                style={styles.compactInput}
              />
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={styles.compactLabel}>
                {service === 'gui-hang' ? (language === 'vi' ? 'Địa chỉ nhận hàng' : 'Delivery address') : (language === 'vi' ? 'Địa chỉ trả' : 'Dropoff address')}
              </label>
              <input
                type="text"
                placeholder={getDropoffPlaceholder()}
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                required
                style={styles.compactInput}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={styles.compactLabel}>{language === 'vi' ? 'Ngày khởi hành' : 'Date'}</label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={styles.compactSelect}
              >
                {dateOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={styles.compactLabel}>{language === 'vi' ? 'Giờ khởi hành' : 'Time'}</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                style={styles.compactSelect}
              >
                {(() => {
                  const matchedConfig = getMatchedConfig();
                  if (matchedConfig && matchedConfig.timeSlots && matchedConfig.timeSlots.length > 0) {
                    return matchedConfig.timeSlots.map((slot: any) => (
                      <option key={slot._id} value={slot.departureTime}>
                        {slot.departureTime}
                      </option>
                    ));
                  }
                  return timeOptions.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ));
                })()}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={styles.compactLabel}>{language === 'vi' ? 'Họ và tên' : 'Full name'}</label>
              <input
                type="text"
                placeholder={language === 'vi' ? 'Họ tên của bạn' : 'Your name'}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={styles.compactInput}
              />
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={styles.compactLabel}>{language === 'vi' ? 'Số điện thoại' : 'Phone'}</label>
              <input
                type="tel"
                placeholder="0868.801.601"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={styles.compactInput}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitLoading}
            style={styles.inlineBookingSubmit}
          >
            {isSubmitLoading ? (language === 'vi' ? 'Đang gửi...' : 'Sending...') : (language === 'vi' ? 'Gửi yêu cầu đặt ngay' : 'Submit request')}
          </button>
        </form>
      )}
    </div>
  );
}

export default function NewsDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { language } = useLanguage();

  const [news, setNews] = useState<NewsItem | null>(null);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);
  const [tripConfigs, setTripConfigs] = useState<any[]>([]);

  // Fetch news data
  useEffect(() => {
    if (!id) return;

    setLoading(true);

    // Fetch trip configs
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/v1/public/trip-configs`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.data?.items) {
          setTripConfigs(res.data.items);
        }
      })
      .catch((err) => console.error("Error fetching configs:", err));

    // Fetch related articles list concurrently
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/v1/public/news`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.data && Array.isArray(res.data)) {
          const mapped = res.data.map((item: any) => ({
            id: item._id || item.id,
            title: item.title,
            excerpt: item.excerpt,
            content: item.content,
            imageUrl: item.imageUrl,
            gradientIndex: item.gradientIndex,
            date: item.date,
            category: item.category,
          }));
          setAllNews(mapped);
        } else {
          setAllNews(defaultNews);
        }
      })
      .catch(() => {
        setAllNews(defaultNews);
      });

    // Fetch current news details
    if (id.startsWith('news-')) {
      // Direct local fallback match for mock pages
      const item = defaultNews.find(item => item.id === id);
      if (item) {
        setNews(item);
        setLoading(false);
        setError(null);
      } else {
        setError(language === 'vi' ? 'Không tìm thấy bài viết.' : 'Article not found.');
        setLoading(false);
      }
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/v1/public/news/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(language === 'vi' ? 'Không tìm thấy bài viết.' : 'Article not found.');
        }
        return res.json();
      })
      .then((res) => {
        if (res?.data) {
          setNews({
            id: res.data._id || res.data.id,
            title: res.data.title,
            excerpt: res.data.excerpt,
            content: res.data.content,
            imageUrl: res.data.imageUrl,
            gradientIndex: res.data.gradientIndex,
            date: res.data.date,
            category: res.data.category,
          });
          setError(null);
        } else {
          throw new Error(language === 'vi' ? 'Dữ liệu không hợp lệ.' : 'Invalid data format.');
        }
      })
      .catch((err) => {
        // Double fallback if DB fetch fails but ID is actually from mock list
        const localItem = defaultNews.find(item => item.id === id);
        if (localItem) {
          setNews(localItem);
          setError(null);
        } else {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, language]);

  // Extract all headings for the Table of Contents
  const headings = useMemo(() => {
    if (!news?.content) return [];
    return news.content
      .split('\n\n')
      .map((para, index) => {
        const trimmed = para.trim();
        if (trimmed.startsWith('##### ')) {
          return { id: `h-${index}`, text: trimmed.replace('##### ', ''), level: 5 };
        } else if (trimmed.startsWith('#### ')) {
          return { id: `h-${index}`, text: trimmed.replace('#### ', ''), level: 4 };
        } else if (trimmed.startsWith('### ')) {
          return { id: `h-${index}`, text: trimmed.replace('### ', ''), level: 3 };
        } else if (trimmed.startsWith('## ')) {
          return { id: `h-${index}`, text: trimmed.replace('## ', ''), level: 2 };
        } else if (trimmed.startsWith('# ')) {
          return { id: `h-${index}`, text: trimmed.replace('# ', ''), level: 1 };
        }
        return null;
      })
      .filter((item): item is { id: string; text: string; level: number } => item !== null);
  }, [news?.content]);

  // Filter out current article for "Related Articles"
  const relatedArticles = useMemo(() => {
    return allNews
      .filter((item) => item.id !== id)
      .slice(0, 3);
  }, [allNews, id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert(language === 'vi' ? 'Đã sao chép liên kết thành công!' : 'Link copied successfully!');
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div style={styles.pageWrapper}>
        <Header onBecomeDriverClick={() => {}} onBookNowClick={() => router.push('/#search')} />
        <main style={styles.mainContainer}>
          <div style={styles.loadingState}>
            <div style={styles.spinner}></div>
            <p style={{ color: 'var(--color-text-steel)', fontSize: '15px' }}>
              {language === 'vi' ? 'Đang tải bài viết...' : 'Loading article...'}
            </p>
          </div>
        </main>
        <Footer onBecomeDriverClick={() => {}} />
      </div>
    );
  }

  if (error || !news) {
    return (
      <div style={styles.pageWrapper}>
        <Header onBecomeDriverClick={() => {}} onBookNowClick={() => router.push('/#search')} />
        <main style={styles.mainContainer}>
          <div style={styles.errorState}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-rose)' }}>error</span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-ink)', margin: '12px 0 8px 0' }}>
              {language === 'vi' ? 'Đã xảy ra lỗi' : 'An error occurred'}
            </h2>
            <p style={{ color: 'var(--color-text-slate)', fontSize: '15px', marginBottom: '24px' }}>{error}</p>
            <Link href="/" style={styles.backHomeBtn}>
              {language === 'vi' ? 'Quay lại trang chủ' : 'Back to home'}
            </Link>
          </div>
        </main>
        <Footer onBecomeDriverClick={() => {}} />
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <Header onBecomeDriverClick={() => {}} onBookNowClick={() => router.push('/#search')} />
      
      <main style={styles.mainContainer}>
        <article className="container" style={styles.articleWrapper}>
          {/* Back Navigation */}
          <div style={styles.backNavigation}>
            <Link href="/#news" style={styles.backLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              {language === 'vi' ? 'Quay lại Tin tức' : 'Back to News'}
            </Link>
          </div>

          {/* Article Header Details (Travel Blog Inspired) */}
          <div style={styles.articleHeader}>
            <div style={styles.categoryRow}>
              <span style={styles.newsBadgePremium}>{news.category}</span>
            </div>
            
            <h1 style={styles.articleTitle}>{news.title}</h1>
            
            <div style={styles.authorMetaRow}>
              <div style={styles.authorLeft}>
                <div style={styles.avatarCircle}>
                  {news.category === 'Cẩm nang' ? '✈️' : news.category === 'Khuyến mãi' ? '🎁' : '📰'}
                </div>
                <div style={styles.authorText}>
                  <span style={styles.authorName}>Ban biên tập Omigo</span>
                  <div style={styles.authorSubtext}>
                    <span>{news.date}</span>
                    <span style={styles.dotSeparator}>•</span>
                    <span>{language === 'vi' ? '3 phút đọc' : '3 min read'}</span>
                  </div>
                </div>
              </div>
              
              <div style={styles.shareButtons}>
                <button onClick={handleShareFacebook} title="Chia sẻ Facebook" style={styles.shareButton}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button onClick={handleCopyLink} title="Sao chép liên kết" style={styles.shareButton}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Cover Image/Banner */}
          <div 
            style={{
              width: '100%',
              height: news.imageUrl ? '440px' : '180px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(15, 23, 42, 0.08)',
              background: !news.imageUrl ? (premiumGradients[news.gradientIndex ?? 0] || premiumGradients[0]) : undefined,
              marginBottom: '36px',
            }}
          >
            {news.imageUrl && (
              <img 
                src={news.imageUrl} 
                alt={news.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            )}
          </div>

          {/* Table of Contents Widget */}
          {headings.length > 0 && (
            <div style={styles.tocContainer}>
              <div style={styles.tocTitle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                <span>{language === 'vi' ? 'Mục lục bài viết' : 'Table of Contents'}</span>
              </div>
              <ul style={styles.tocList}>
                {headings.map((h) => (
                  <li key={h.id} style={{ ...styles.tocItem, paddingLeft: `${(h.level - 1) * 16}px` }}>
                    <a 
                      href={`#${h.id}`} 
                      style={styles.tocLink}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed Content Body */}
          <div className="news-content-body" style={styles.textContent}>
            {news.content.split('\n\n').map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              // Headings H1, H2, H3, H4, H5
              if (trimmed.startsWith('##### ')) {
                return (
                  <h5 key={index} id={`h-${index}`} style={styles.mdH5}>
                    {trimmed.replace('##### ', '')}
                  </h5>
                );
              }
              if (trimmed.startsWith('#### ')) {
                return (
                  <h4 key={index} id={`h-${index}`} style={styles.mdH4}>
                    {trimmed.replace('#### ', '')}
                  </h4>
                );
              }
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={index} id={`h-${index}`} style={styles.mdH3}>
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('## ')) {
                return (
                  <h2 key={index} id={`h-${index}`} style={styles.mdH2}>
                    {trimmed.replace('## ', '')}
                  </h2>
                );
              }
              if (trimmed.startsWith('# ')) {
                return (
                  <h1 key={index} id={`h-${index}`} style={styles.mdH1}>
                    {trimmed.replace('# ', '')}
                  </h1>
                );
              }

              // Blockquotes: lines starting with >
              if (trimmed.startsWith('> ')) {
                const quoteText = trimmed.substring(2);
                return (
                  <blockquote key={index} style={styles.blockquote}>
                    <p style={{ margin: 0 }}>
                      {parseParagraphContent(quoteText)}
                    </p>
                  </blockquote>
                );
              }

              // Standalone Image: ![alt](url)
              const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)/);
              if (imgMatch) {
                const [_, alt, url] = imgMatch;
                return (
                  <div key={index} style={styles.imageBlock}>
                    <img 
                      src={url} 
                      alt={alt} 
                      style={styles.inlineImage} 
                    />
                    {alt && (
                      <p style={styles.imageCaption}>
                        {alt}
                      </p>
                    )}
                  </div>
                );
              }

              // Video parse pattern: video[Title](Video URL)
              const videoMatch = trimmed.match(/^video\[(.*?)\]\((.*?)\)/);
              if (videoMatch) {
                const [_, videoTitle, videoUrl] = videoMatch;
                const youtubeReg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
                const ytMatch = videoUrl.match(youtubeReg);
                const videoId = ytMatch ? ytMatch[1] : null;

                if (videoId) {
                  const isPlaying = playingVideoUrl === videoUrl;
                  if (isPlaying) {
                    return (
                      <div key={index} style={{ margin: '36px 0' }}>
                        <div style={styles.videoPlayerWrapper}>
                          <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                            title={videoTitle} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            style={{ border: 'none' }}
                          ></iframe>
                        </div>
                        {videoTitle && <p style={styles.imageCaption}>{videoTitle}</p>}
                      </div>
                    );
                  }

                  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                  return (
                    <div key={index} style={{ margin: '36px 0' }}>
                      <div 
                        className="video-thumbnail-card"
                        onClick={() => setPlayingVideoUrl(videoUrl)}
                        style={styles.videoCard}
                      >
                        <img 
                          src={thumbUrl} 
                          alt={videoTitle} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                          }}
                        />
                        <div style={styles.videoOverlay}>
                          <div className="play-button-circle" style={styles.playButtonCircle}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#10b981" style={{ marginLeft: '4px' }}>
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          </div>
                        </div>
                        {videoTitle && (
                          <div style={styles.videoTitleBar}>
                            {videoTitle}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} style={{ margin: '36px 0', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)' }}>
                      <video src={videoUrl} controls style={{ width: '100%', maxHeight: '420px', display: 'block' }} />
                      {videoTitle && (
                        <p style={styles.imageCaption}>
                          {videoTitle}
                        </p>
                      )}
                    </div>
                  );
                }
              }

              // Numbered lists
              const listMatch = trimmed.match(/^(\d+)\.\s(.*)/);
              if (listMatch) {
                const [_, num, text] = listMatch;
                return (
                  <div key={index} style={styles.listRow}>
                    <span style={styles.listNumber}>{num}.</span>
                    <p style={styles.listText}>
                      {parseParagraphContent(text)}
                    </p>
                  </div>
                );
              }

              // Bullet lists
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                const text = trimmed.substring(2);
                return (
                  <div key={index} style={styles.listRow}>
                    <span style={styles.listBullet}>•</span>
                    <p style={styles.listText}>
                      {parseParagraphContent(text)}
                    </p>
                  </div>
                );
              }

              // Booking Widget Match: booking[Title](service?route=...)
              const bookingMatch = trimmed.match(/^booking\[(.*?)\]\((.*?)\)/);
              if (bookingMatch) {
                const [_, bookingTitle, bookingServiceString] = bookingMatch;
                const serviceParts = bookingServiceString.split('?');
                const serviceName = serviceParts[0];
                let defaultRoute = 'tam-ky-da-nang';
                if (serviceParts[1]) {
                  const routeMatch = serviceParts[1].match(/route=([^&]+)/);
                  if (routeMatch) {
                    defaultRoute = routeMatch[1];
                  }
                }
                return (
                  <InlineBookingWidget
                    key={index}
                    service={serviceName}
                    route={defaultRoute}
                    title={bookingTitle}
                    tripConfigs={tripConfigs}
                    language={language}
                  />
                );
              }

              // Standard paragraph with bold and link support
              return (
                <p key={index} style={styles.paragraph}>
                  {parseParagraphContent(trimmed)}
                </p>
              );
            })}
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div style={styles.relatedSection}>
              <h2 style={styles.relatedTitle}>
                {language === 'vi' ? 'Bài viết liên quan' : 'Related Articles'}
              </h2>
              <div style={styles.relatedGrid}>
                {relatedArticles.map((item) => {
                  const bg = premiumGradients[item.gradientIndex ?? 0] || premiumGradients[0];
                  return (
                    <Link href={`/news/${item.id}`} key={item.id} style={styles.relatedCard} className="related-card-hover">
                      <div style={styles.relatedCardImageWrapper}>
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.title} style={styles.relatedCardImage} />
                        ) : (
                          <div style={{ ...styles.relatedCardImage, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg>
                          </div>
                        )}
                        <span style={styles.relatedBadge}>{item.category}</span>
                      </div>
                      <div style={styles.relatedCardContent}>
                        <div style={styles.relatedDate}>{item.date}</div>
                        <h3 style={styles.relatedCardTitle}>{item.title}</h3>
                        <p style={styles.relatedExcerpt}>{item.excerpt}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer onBecomeDriverClick={() => {}} />
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#ffffff',
  },
  mainContainer: {
    flexGrow: 1,
    padding: '120px 0 80px 0',
  },
  loadingState: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    gap: '16px',
  },
  spinner: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '3px solid #f1f5f9',
    borderTopColor: '#10b981',
    animation: 'spin 1s linear infinite',
  },
  errorState: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    textAlign: 'center' as const,
    padding: '0 20px',
  },
  backHomeBtn: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '12px 28px',
    borderRadius: '9999px',
    fontSize: '14px',
    fontWeight: 600,
    textDecoration: 'none',
    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
    transition: 'background-color 0.2s',
  },
  articleWrapper: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '0 20px',
  },
  backNavigation: {
    marginBottom: '28px',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 600,
    color: '#64748b',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  articleHeader: {
    marginBottom: '32px',
  },
  categoryRow: {
    marginBottom: '14px',
  },
  newsBadgePremium: {
    display: 'inline-block',
    backgroundColor: '#f0fdf4',
    color: '#10b981',
    fontWeight: 600,
    fontSize: '13px',
    padding: '4px 12px',
    borderRadius: '9999px',
    letterSpacing: '0.02em',
  },
  articleTitle: {
    fontSize: '36px',
    fontWeight: 800,
    color: '#0f172a',
    lineHeight: '1.3',
    letterSpacing: '-0.02em',
    margin: '0 0 20px 0',
  },
  authorMetaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '20px',
    borderBottom: '1px solid #f1f5f9',
  },
  authorLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatarCircle: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  authorText: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },
  authorName: {
    fontWeight: 600,
    color: '#1e293b',
    fontSize: '14px',
  },
  authorSubtext: {
    color: '#64748b',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  dotSeparator: {
    color: '#cbd5e1',
  },
  shareButtons: {
    display: 'flex',
    gap: '8px',
  },
  shareButton: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  tocContainer: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '40px',
  },
  tocTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 700,
    color: '#0f172a',
    fontSize: '16px',
    marginBottom: '14px',
  },
  tocList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  tocItem: {
    fontSize: '14px',
  },
  tocLink: {
    color: '#475569',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.2s',
  },
  textContent: {
    fontSize: '18px',
    lineHeight: '1.85',
    color: '#334155',
  },
  mdH1: {
    fontSize: '28px',
    fontWeight: 800,
    color: '#0f172a',
    marginTop: '44px',
    marginBottom: '18px',
    lineHeight: '1.3',
  },
  mdH2: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#0f172a',
    marginTop: '38px',
    marginBottom: '16px',
    lineHeight: '1.3',
    paddingLeft: '12px',
    borderLeft: '4px solid #10b981',
  },
  mdH3: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#0f172a',
    marginTop: '32px',
    marginBottom: '12px',
    lineHeight: '1.4',
  },
  blockquote: {
    borderLeft: '4px solid #10b981',
    backgroundColor: '#f0fdf4',
    padding: '20px 24px',
    margin: '32px 0',
    borderRadius: '0 16px 16px 0',
    fontStyle: 'italic' as const,
    color: '#0f766e',
    lineHeight: '1.8',
  },
  imageBlock: {
    margin: '38px 0',
    textAlign: 'center' as const,
  },
  inlineImage: {
    maxWidth: '100%',
    maxHeight: '520px',
    borderRadius: '16px',
    boxShadow: '0 12px 36px rgba(15, 23, 42, 0.06)',
    objectFit: 'contain' as const,
  },
  imageCaption: {
    fontSize: '13px',
    color: '#64748b',
    marginTop: '12px',
    fontStyle: 'italic' as const,
    textAlign: 'center' as const,
  },
  videoPlayerWrapper: {
    position: 'relative' as const,
    width: '100%',
    height: '420px',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
  },
  videoCard: {
    position: 'relative' as const,
    width: '100%',
    height: '420px',
    borderRadius: '20px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.1)',
  },
  videoOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(15, 23, 42, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonCircle: {
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  videoTitleBar: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '24px 20px 20px 20px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '16px',
  },
  listRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
    paddingLeft: '4px',
    alignItems: 'flex-start',
  },
  listNumber: {
    fontWeight: 800,
    color: '#10b981',
    minWidth: '22px',
    fontSize: '17px',
  },
  listBullet: {
    color: '#10b981',
    fontSize: '22px',
    lineHeight: '1',
    marginTop: '-2px',
    minWidth: '20px',
    textAlign: 'center' as const,
  },
  listText: {
    margin: 0,
    fontSize: '17px',
    lineHeight: '1.8',
    color: '#334155',
  },
  paragraph: {
    fontSize: '17px',
    lineHeight: '1.85',
    color: '#334155',
    marginBottom: '24px',
  },
  strong: {
    color: '#0f172a',
  },
  relatedSection: {
    marginTop: '72px',
    paddingTop: '48px',
    borderTop: '1px solid #f1f5f9',
  },
  relatedTitle: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#0f172a',
    marginBottom: '28px',
    letterSpacing: '-0.01em',
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
    gap: '24px',
  },
  relatedCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    border: '1px solid #f1f5f9',
    borderRadius: '16px',
    overflow: 'hidden',
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  relatedCardImageWrapper: {
    position: 'relative' as const,
    width: '100%',
    height: '130px',
    overflow: 'hidden',
  },
  relatedCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  relatedBadge: {
    position: 'absolute' as const,
    top: '12px',
    left: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#10b981',
    fontWeight: 700,
    fontSize: '11px',
    padding: '3px 8px',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  relatedCardContent: {
    padding: '16px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  relatedDate: {
    fontSize: '11px',
    color: '#94a3b8',
    marginBottom: '6px',
  },
  relatedCardTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#1e293b',
    margin: '0 0 6px 0',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  },
  relatedExcerpt: {
    fontSize: '12px',
    color: '#64748b',
    margin: 0,
    lineHeight: '1.5',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  },
  mdH4: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#0f172a',
    marginTop: '28px',
    marginBottom: '10px',
    lineHeight: '1.4',
  },
  mdH5: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#334155',
    marginTop: '24px',
    marginBottom: '8px',
    lineHeight: '1.4',
  },
  facebookLinkInline: {
    color: '#1877F2',
    fontWeight: 600,
    textDecoration: 'underline',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
  },
  normalLinkInline: {
    color: '#10b981',
    fontWeight: 600,
    textDecoration: 'underline',
  },
  inlineBookingContainer: {
    border: '2px solid #10b981',
    borderRadius: '24px',
    padding: '28px',
    backgroundColor: '#f8fafc',
    margin: '40px 0',
    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.06)',
  },
  inlineBookingTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: '20px',
    textAlign: 'center' as const,
  },
  compactLabel: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#475569',
    marginBottom: '6px',
  },
  compactSelect: {
    width: '100%',
    height: '38px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    padding: '0 8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#ffffff',
  },
  compactInput: {
    width: '100%',
    height: '38px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    padding: '0 12px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  compactStepper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '38px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    padding: '0 8px',
    backgroundColor: '#ffffff',
  },
  stepperButton: {
    border: 'none',
    background: 'none',
    fontSize: '16px',
    fontWeight: 600,
    color: '#64748b',
    cursor: 'pointer',
    padding: '0 4px',
  },
  inlineBookingSubmit: {
    width: '100%',
    height: '42px',
    borderRadius: '9999px',
    border: 'none',
    backgroundColor: '#10b981',
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
    transition: 'background-color 0.2s',
  },
};
