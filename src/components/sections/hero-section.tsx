
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowDown, Download } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const { theme } = useTheme();
  const [isGamer, setIsGamer] = useState(false);
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile');

  useEffect(() => {
    setIsGamer(theme === 'gamer');
  }, [theme]);

  return (
    <section id="home" className="container flex flex-col-reverse md:flex-row items-center justify-center min-h-[calc(100vh-56px)] py-12 md:py-24 text-center md:text-left mx-auto">
      <div className="md:w-3/5 text-center md:text-left">
        {!isGamer && (
          <h1 className={cn(
            "text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 text-primary animate-fade-in-up"
          )} style={{ animationDelay: '0.1s' }}>
            Welcome to my digital space!
          </h1>
        )}
        <h2 className={cn(
          "font-bold tracking-tighter mb-4",
          isGamer ? "text-5xl md:text-7xl lg:text-8xl text-primary animate-glitch" : "text-3xl md:text-5xl lg:text-6xl animate-fade-in-up"
        )} style={{ animationDelay: isGamer ? '0.2s' : '0.2s' }}>
          {isGamer ? "LOADING PLAYER ONE..." : "Ntsika Lusindiso Mtshixa"}
        </h2>
        <p className={cn("text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto md:mx-0 mb-8 animate-fade-in-up")} style={{ animationDelay: '0.4s' }}>
          Systems Support Associate & Tech Enthusiast
        </p>
      </div>
      <div className="flex-shrink-0 mb-8 md:mb-0 md:ml-12 md:w-2/5 flex justify-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {profileImage && (
          <div className={cn(isGamer && "animated-gradient-aura")}>
            <Image
              src={profileImage.imageUrl}
              alt={profileImage.description}
              data-ai-hint={profileImage.imageHint}
              width={350}
              height={350}
              className="rounded-full object-cover border-4 border-background"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
