import './globals.css';
import { Inter } from 'next/font/google';
import { CartProviderWrapper } from "./providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s | Zain Wireless',
    default: 'Zain Wireless',
  },
  description: 'Your one-stop shop for phone repairs and accessories',
  keywords: ['phone repair', 'accessories', 'smartphone', 'repair services'],
  authors: [{ name: 'Zain Wireless' }],
  creator: 'Zain Wireless',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProviderWrapper>
          {children}
        </CartProviderWrapper>
      </body>
    </html>
  );
}
