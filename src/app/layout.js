import { inter } from "@/app/ui/fonts";
import "@/app/globals.css";

export const metadata = {
  title: "Login | Jahaira Store",
  description: "Aplicación de gestión de tienda",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
