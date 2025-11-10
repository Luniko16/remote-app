"use client";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { TemplateProvider } from '@/contexts/template-context';
import { GamerBackground } from '@/components/gamer-background';
import { CursorTrail } from '@/components/cursor-trail';
import React, { useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/loading-screen';
import { ParallaxBackground } from '@/components/parallax-background';
import './globals.css';

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

  // Set the title dynamically
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
          <TemplateProvider>
            <ParallaxBackground />
            <GamerBackground />
            <CursorTrail />
            <div className="relative z-10">
              {children}
            </div>
            <Toaster />
          </TemplateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
