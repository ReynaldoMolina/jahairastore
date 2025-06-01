import { inter } from "@/app/ui/fonts";
import "@/app/globals.css";

export const metadata = {
  title: {
    template: '%s - Jahaira Store',
    default: 'Jahaira Store'
  },
  description: 'Aplicación de gestión de tienda',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased h-[100dvh]`}
      >
        {children}
      </body>
    </html>
  );
}
