import '@/app/globals.css';
import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s - Jahaira Store',
    default: 'Jahaira Store',
  },
  description: 'Aplicación de gestión de tienda',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
