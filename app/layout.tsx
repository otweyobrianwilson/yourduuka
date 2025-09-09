import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Noto_Sans, Inter } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import CartSidebar from '@/components/cart-sidebar';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'YourDuuka - Premium Footwear Collection in Uganda',
  description: 'Discover the finest collection of premium footwear in Uganda. Shop men\'s, women\'s, and kids\' shoes from top brands. Free delivery on orders over UGX 200,000.',
  keywords: 'footwear, shoes, Uganda, premium, men, women, kids, sneakers, boots, sandals',
  authors: [{ name: 'YourDuuka Team' }],
  openGraph: {
    title: 'YourDuuka - Premium Footwear Collection',
    description: 'Premium footwear collection in Uganda',
    url: 'https://yourduuka.com',
    siteName: 'YourDuuka',
    type: 'website',
  },
};

export const viewport: Viewport = {
  maximumScale: 1
};

const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '700'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${notoSans.className} ${inter.variable}`}
    >
      <body className="min-h-[100dvh] bg-brand-cream text-brand-primary">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartSidebar />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#1a1a1a',
                border: '1px solid #e9ecef',
                borderRadius: '0',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#d63384',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}
