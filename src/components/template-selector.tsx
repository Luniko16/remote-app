"use client";

import { useTemplate, type Template } from '@/contexts/template-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const templates: { id: Template; name: string; description: string }[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional layout'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean two-column design'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold teal sidebar layout'
  }
];

export function TemplateSelector() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-center">Choose PDF Template</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {templates.map((t) => (
          <Button
            key={t.id}
            variant={template === t.id ? "default" : "outline"}
            onClick={() => setTemplate(t.id)}
            className={cn(
              "flex flex-col items-center p-4 h-auto min-w-[120px]",
              template === t.id && "ring-2 ring-primary"
            )}
          >
            <span className="font-medium">{t.name}</span>
            <span className="text-xs text-muted-foreground mt-1 text-center">
              {t.description}
            </span>
          </Button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground text-center mt-3">
        Selected: <span className="font-medium capitalize">{template}</span> template
      </p>
    </div>
  );
}