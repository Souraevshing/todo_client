import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import {Toaster} from "sonner";
import {BanIcon, CheckCircle2Icon, InfoIcon, Loader2Icon, ShieldAlertIcon, XIcon} from "lucide-react";

import {ThemeProvider} from "@/lib/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "SSR Todo app developed using next.js",
    category:"website",
    applicationName:"Todo-app",
    classification:"website",
    creator:"Sourav",
    keywords:["next.js", "website", "node.js", "react", "javascript", "typescript", "ssr"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-neutral-900`}
      >
      <ThemeProvider>
          <Navbar />
          <main className="container mx-auto max-w-2xl px-4 py-6">{children}</main>
          <Footer/>
          <Toaster
              richColors position="top-center"
              visibleToasts={2}
              expand
              duration={1500}
              toastOptions={{
                  duration:1500}}
              icons={{
                  success: <CheckCircle2Icon className={`w-4 h-4 text-green-500`}/>,
                  info: <InfoIcon className={`w-4 h-4 text-yellow-500`} />,
                  close: <XIcon className={`w-4 h-4 text-red-500`}/>,
                  loading: <Loader2Icon className={`w-4 h-4 animate-spin transition-all`}/>,
                  error: <BanIcon className={`w-4 h-4 text-red-500`}/>,
                  warning: <ShieldAlertIcon className={`w-4 h-4 text-red-500`}/>}}
          />
      </ThemeProvider>
      </body>
    </html>
  );
}
