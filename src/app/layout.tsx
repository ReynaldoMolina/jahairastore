import { inter } from '@/components/fonts';
import '@/app/globals.css';
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata = {
  title: {
    template: '%s - Jahaira Store',
    default: 'Jahaira Store',
  },
  description: 'Aplicación de gestión de tienda',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-Es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
