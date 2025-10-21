
"use client";

import { useState, useEffect, useRef } from 'react';

export function useActiveSection(sectionIds: string[], threshold = 0.5) {
  const [activeSection, setActiveSection] = useState<string>('home');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0, 
      }
    );

    const elements = sectionIds.map(id => document.getElementById(id)).filter(el => el);
    elements.forEach(el => {
      if(observer.current) {
        observer.current.observe(el);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [sectionIds, threshold]);

  return activeSection;
}
