
"use client";

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { GamerBackground } from '@/components/gamer-background';
import { CursorTrail } from '@/components/cursor-trail';
import React, { useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/loading-screen';
import { ParallaxBackground } from '@/components/parallax-background';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  useEffect(() => {
    const handleShowLoading = () => {
      setShowLoadingScreen(true);
    };

    window.addEventListener('show-loading-screen', handleShowLoading);

    return () => {
      window.removeEventListener('show-loading-screen', handleShowLoading);
    };
  }, []);

  // Metadata should be defined statically, but since this is a client component now,
  // we'll manage the title dynamically if needed, or move Metadata to a parent component/file if possible.
  // For now, we'll set the title directly.
  useEffect(() => {
    document.title = 'Portfolio Pro';
  }, []);

  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Audiowide&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {showLoadingScreen && <LoadingScreen onFinished={() => setShowLoadingScreen(false)} />}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          themes={['professional', 'gamer', 'dark']}
        >
          <ParallaxBackground />
          <GamerBackground />
          <CursorTrail />
          <div className="relative z-10">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
