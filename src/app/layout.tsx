import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

import { PlayerTokenProvider } from '@/contexts/UserTokensContext';
import { ShopItemsTableProvider } from "@/contexts/ShopItemsTableContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RPG Inventory",
  description: "A simple inventory management system for RPGs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Toaster />
        <SessionProvider>
          <PlayerTokenProvider>
            <ShopItemsTableProvider>
              {children}
            </ShopItemsTableProvider>
          </PlayerTokenProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
