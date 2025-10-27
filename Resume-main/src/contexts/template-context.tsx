'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Template = 'classic' | 'modern' | 'creative';

interface TemplateContextType {
  template: Template;
  setTemplate: (template: Template) => void;
  isLoaded: boolean;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

const TEMPLATE_STORAGE_KEY = 'resumai-template';

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [template, setTemplateState] = useState<Template>('classic');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedTemplate = localStorage.getItem(TEMPLATE_STORAGE_KEY);
      console.log('TemplateProvider - Loading from localStorage:', storedTemplate);
      console.log('TemplateProvider - Is creative?', storedTemplate === 'creative');
      
      if (storedTemplate && ['classic', 'modern', 'creative'].includes(storedTemplate)) {
        console.log('TemplateProvider - ✅ Valid template, setting to:', storedTemplate);
        setTemplateState(storedTemplate as Template);
        
        if (storedTemplate === 'creative') {
          console.log('TemplateProvider - 🎨 CREATIVE TEMPLATE LOADED SUCCESSFULLY');
        }
      } else {
        console.log('TemplateProvider - ❌ Invalid or missing template, using default: classic');
      }
    } catch (error) {
      console.error("Failed to load template from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        console.log('TemplateProvider - Saving template to localStorage:', template);
        localStorage.setItem(TEMPLATE_STORAGE_KEY, template);
      } catch (error) {
        console.error("Failed to save template to localStorage", error);
      }
    }
  }, [template, isLoaded]);

  const setTemplate = useCallback((newTemplate: Template) => {
    console.log('TemplateProvider - Setting new template:', newTemplate);
    console.log('TemplateProvider - Is new template creative?', newTemplate === 'creative');
    
    if (newTemplate === 'creative') {
      console.log('TemplateProvider - 🎨 SWITCHING TO CREATIVE TEMPLATE');
    }
    
    setTemplateState(newTemplate);
  }, []);

  return (
    <TemplateContext.Provider value={{ template, setTemplate, isLoaded }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
}