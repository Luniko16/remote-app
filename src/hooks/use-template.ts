'use client';

import { useState, useEffect, useCallback } from 'react';

export type Template = 'classic' | 'modern' | 'creative';

const TEMPLATE_STORAGE_KEY = 'resumai-template';

export function useTemplate() {
  const [template, setTemplateState] = useState<Template>('classic');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedTemplate = localStorage.getItem(TEMPLATE_STORAGE_KEY);
      console.log('useTemplate - Loading from localStorage:', storedTemplate);
      if (storedTemplate && ['classic', 'modern', 'creative'].includes(storedTemplate)) {
        console.log('useTemplate - Setting template to:', storedTemplate);
        setTemplateState(storedTemplate as Template);
      } else {
        console.log('useTemplate - Using default template: classic');
      }
    } catch (error) {
      console.error("Failed to load template from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(TEMPLATE_STORAGE_KEY, template);
      } catch (error) {
        console.error("Failed to save template to localStorage", error);
      }
    }
  }, [template, isLoaded]);

  const setTemplate = useCallback((newTemplate: Template) => {
    console.log('useTemplate - Setting new template:', newTemplate);
    setTemplateState(newTemplate);
  }, []);

  return { template, setTemplate, isLoaded };
}