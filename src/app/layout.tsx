"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthHydrator } from "@/components/AuthHydrator";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <AuthHydrator />
          <Providers>{children}</Providers>
        </Provider>
      </body>
    </html>
  );
}