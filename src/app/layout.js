import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/ui/Footer/Footer";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sai Satvik Dairy",
  description: "Pure and Organic A2 Dairy Products",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {/* Navbar removed from here so individual pages don't duplicate it */}
          <main style={{ flex: "1 0 auto" }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}