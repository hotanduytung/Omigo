import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://omigo.vn'),
  title: 'Omigo.vn - Nền tảng đặt xe ghép thông minh',
  description: 'omigo.vn kết nối dịch vụ đặt xe ghép, xe đi chung, bao xe chặng ngắn và vận chuyển hàng hóa nhanh chóng, an toàn, tiết kiệm chi phí di chuyển tối đa.',
  keywords: 'xe ghép, xe đi chung, đặt xe ghép, omigo, omigo.vn, xe ghép miền trung, xe ghép đà nẵng tam kỳ, đi chung xe',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Omigo.vn - Nền tảng đặt xe ghép thông minh',
    description: 'omigo.vn kết nối dịch vụ đặt xe ghép, xe đi chung, bao xe chặng ngắn và vận chuyển hàng hóa nhanh chóng, an toàn, tiết kiệm chi phí di chuyển tối đa.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'omigo.vn Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${geistMono.variable}`}>
      <body className={inter.className} style={{ margin: 0, backgroundColor: '#ffffff', color: '#0d0d0d' }}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
