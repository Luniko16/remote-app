"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ResumeSection } from '@/components/sections/resume-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ChatbotWidget } from '@/components/chatbot-widget';
import { MatrixRain } from '@/components/matrix-rain';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home() {
  const { theme } = useTheme();
  const [isGamer, setIsGamer] = useState(false);

  useEffect(() => {
    setIsGamer(theme === 'gamer');
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen">
      {isGamer && <MatrixRain />}
      <Header />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
