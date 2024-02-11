import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { LocationProvider } from '@quality/providers/LocationProvider/LocationProvider';
import { ThemeProvider } from '@quality/providers/themeProvider';
import { QAMapProvider } from '@quality/providers/mapProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Air Quality Page',
  description: 'Built by Miguel Jardinez',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <LocationProvider>
        <QAMapProvider>
          <ThemeProvider>
            <body className={inter.className}>{children}</body>
          </ThemeProvider>
        </QAMapProvider>
      </LocationProvider>
    </html>
  );
}
