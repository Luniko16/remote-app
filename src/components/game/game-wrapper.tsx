'use client';

import { useState, useEffect } from 'react';
import { LandingPage } from './landing-page';
import { LoadingScreen } from './loading-screen';
import { ResumeBuilder } from '@/components/resume-builder';
import { Header } from '@/components/header';

type GameState = 'landing' | 'loading' | 'playing';

export function GameWrapper() {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [isVisible, setIsVisible] = useState(true);

  const handleStartGame = () => {
    setIsVisible(false);
    setTimeout(() => {
      setGameState('loading');
      setIsVisible(true);
    }, 500);
  };

  const handleLoadingComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      setGameState('playing');
      setIsVisible(true);
    }, 500);
  };

  return (
    <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {gameState === 'landing' && (
        <LandingPage onStartGame={handleStartGame} />
      )}
      
      {gameState === 'loading' && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      
      {gameState === 'playing' && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
          {/* Subtle background effects for the game */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.05),transparent_50%)]" />
          
          <div className="relative z-10">
            <Header />
            <main>
              <ResumeBuilder />
            </main>
          </div>
        </div>
      )}
    </div>
  );
}