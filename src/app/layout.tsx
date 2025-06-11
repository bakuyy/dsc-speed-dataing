"use client";

import "./globals.css";
import { store } from "@/store/store";
import { AuthHydrator } from "@/app/components/AuthHydrator";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "react-redux";

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
          {children}
        </Provider>
      </body>
    </html>
  );
}