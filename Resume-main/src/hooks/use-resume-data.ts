'use client';

import { useState, useEffect, useCallback } from 'react';
import { type ResumeData, ResumeDataSchema } from '@/lib/types';
import { initialResumeData } from '@/lib/data';

const STORAGE_KEY = 'resumai-data';

const emptyResumeData: ResumeData = {
  personalInfo: { name: '', email: '', phone: '', location: '', website: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
};

export function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        // Safely parse the data with Zod
        const parsed = ResumeDataSchema.safeParse(JSON.parse(storedData));
        if (parsed.success) {
          setResumeData(parsed.data);
        } else {
          // If parsing fails, reset to initial data
          console.warn("Local storage data is invalid, resetting.", parsed.error);
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Failed to load resume data from localStorage, resetting.", error);
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
      } catch (error) {
        console.error("Failed to save resume data to localStorage", error);
      }
    }
  }, [resumeData, isLoaded]);

  const updateResumeData = useCallback((updater: (prev: ResumeData) => ResumeData) => {
    setResumeData(updater);
  }, []);

  const resetResumeData = useCallback(() => {
    setResumeData(emptyResumeData);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyResumeData));
    }
  }, []);

  return { resumeData, updateResumeData, isLoaded, resetResumeData };
}
