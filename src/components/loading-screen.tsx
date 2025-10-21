
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  onFinished: () => void;
}

const videoUrl = "/VVV.mp4";

export function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [loadingStep, setLoadingStep] = useState(0); // 0: loading, 1: press start, 2: fading out
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoadingStep(1);
    }, 2000); // Duration of the loading bar animation

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (loadingStep < 1) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        setLoadingStep(2);
      }
    };
    const handleClick = () => {
      setLoadingStep(2);
    }

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
    };
  }, [loadingStep]);

  useEffect(() => {
    if (loadingStep === 2) {
      const fadeOutTimer = setTimeout(() => {
        setIsVisible(false);
        onFinished();
      }, 500); // Duration of the fade-out animation

      return () => clearTimeout(fadeOutTimer);
    }
  }, [loadingStep, onFinished]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn("loading-screen", loadingStep === 2 ? 'opacity-0' : 'opacity-100')}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        key="gamer-video"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="loading-screen-content relative z-10">
        {loadingStep === 0 && (
          <>
            <div className="mb-4 text-primary text-6xl font-bold animate-pulse">⚡ CPU LOADING ⚡</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8">INITIALIZING SYSTEM...</h1>
            <div className="loading-bar-container">
              <div className="loading-bar"></div>
            </div>
          </>
        )}
        {loadingStep === 1 && (
          <>
            <div className="mb-6 text-green-400 text-3xl font-bold">✓ SYSTEM READY</div>
            <h2 className="text-xl md:text-3xl font-bold mb-4">Hello, User!</h2>
            <h2 className="text-2xl md:text-4xl font-bold press-start">PRESS START TO CONTINUE</h2>
          </>
        )}
      </div>
    </div>
  );
}
