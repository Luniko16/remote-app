'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles, Zap, Code, Palette, FileText } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const loadingSteps = [
  { icon: Code, text: "Initializing AI Engine...", duration: 800 },
  { icon: Palette, text: "Loading Templates...", duration: 600 },
  { icon: FileText, text: "Preparing Resume Builder...", duration: 700 },
  { icon: Sparkles, text: "Adding Magic Touch...", duration: 500 },
  { icon: Zap, text: "Ready to Build!", duration: 400 }
];

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let totalTime = 0;
    
    const runLoadingSequence = async () => {
      for (let i = 0; i < loadingSteps.length; i++) {
        setCurrentStep(i);
        
        const step = loadingSteps[i];
        const stepProgress = ((i + 1) / loadingSteps.length) * 100;
        
        // Animate progress for this step
        const startProgress = (i / loadingSteps.length) * 100;
        const progressIncrement = (stepProgress - startProgress) / (step.duration / 50);
        
        for (let p = startProgress; p <= stepProgress; p += progressIncrement) {
          setProgress(Math.min(p, stepProgress));
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        // Wait for step duration
        await new Promise(resolve => setTimeout(resolve, step.duration - (step.duration / 50) * Math.ceil((stepProgress - startProgress) / progressIncrement)));
      }
      
      setProgress(100);
      setIsComplete(true);
      
      // Wait a bit before completing
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    };

    runLoadingSequence();
  }, [onLoadingComplete]);

  const CurrentIcon = loadingSteps[currentStep]?.icon || Loader2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.2),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.2),transparent_50%)] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Matrix-like falling code effect */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono animate-matrix-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {Array.from({ length: 10 }).map((_, j) => (
              <div key={j} className="opacity-50">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Loading Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-spin-slow opacity-20" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin opacity-30" style={{ animationDirection: 'reverse' }} />
            <div className="absolute inset-4 rounded-full bg-slate-900 flex items-center justify-center">
              <CurrentIcon className={`w-8 h-8 text-white ${isComplete ? 'animate-bounce' : 'animate-pulse'}`} />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2 animate-fade-in">
            {loadingSteps[currentStep]?.text || "Loading..."}
          </h2>
          <p className="text-gray-400 text-sm">
            Preparing your resume building experience...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress 
            value={progress} 
            className="h-3 bg-slate-800 border border-slate-700"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>0%</span>
            <span className="font-mono">{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Loading Steps Indicator */}
        <div className="flex justify-center space-x-2">
          {loadingSteps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white scale-110'
                    : 'bg-slate-700 text-gray-400'
                }`}
              >
                <StepIcon className="w-4 h-4" />
              </div>
            );
          })}
        </div>

        {/* Fun Loading Messages */}
        <div className="mt-8 text-xs text-gray-500 animate-pulse">
          {isComplete ? (
            <span className="text-green-400 font-semibold">🎉 Ready to create amazing resumes!</span>
          ) : (
            <span>Brewing some AI magic...</span>
          )}
        </div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
    </div>
  );
}