import { inter } from '@/components/fonts';
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import '@/app/globals.css';

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
      <body className={`${inter.className} antialiased min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
