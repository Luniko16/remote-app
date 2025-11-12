'use client';


import { ResumeForm } from '@/components/resume-form';
import { ResumePreview } from '@/components/resume-preview';
import { useResumeData } from '@/hooks/use-resume-data';
import { useTemplate, type Template } from '@/contexts/template-context';
import { Skeleton } from '@/components/ui/skeleton';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const templatePreviews = {
  classic: '/images/template-classic.png',
  modern: '/images/template-modern.png',
  creative: '/images/template-creative.png',
};


export function ResumeBuilder() {
  const { resumeData, updateResumeData, isLoaded, resetResumeData } = useResumeData();
  const { template, setTemplate } = useTemplate();
  
  console.log('ResumeBuilder - Current template:', template);
  console.log('ResumeBuilder - Template type:', typeof template);
  console.log('ResumeBuilder - Is creative?', template === 'creative');
  console.log('ResumeBuilder - About to render ResumePreview with template:', template);

  if (!isLoaded) {
    return (
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 p-4 md:grid-cols-[1fr_450px] md:p-6">
        <div className="space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div>
          <Skeleton className="h-[636px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-start gap-8 p-4 md:container md:mx-auto md:max-w-7xl md:grid-cols-[1fr_auto] md:p-6">
      <div className="space-y-6">
        <Card className="relative overflow-hidden border-2 border-gradient-to-r from-purple-200 to-cyan-200">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-cyan-50/50" />
          <CardHeader className="relative">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <CardTitle className="font-headline text-xl bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Choose Your Template
                </CardTitle>
                <CardDescription>Select a template to instantly change your resume's look and unlock new possibilities!</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={template}
              onValueChange={(value: Template) => {
                console.log('RadioGroup - Template changing from', template, 'to', value);
                setTemplate(value);
              }} 
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {(['classic', 'modern', 'creative'] as Template[]).map((t) => (
                <div key={t}>
                  <RadioGroupItem value={t} id={t} className="peer sr-only" />
                  <Label
                    htmlFor={t}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="w-full aspect-[1/1.41] overflow-hidden rounded-sm mb-2 border">
                      <Image 
                        src={`https://picsum.photos/seed/${t}/200/282`} 
                        alt={`${t} template preview`}
                        width={200}
                        height={282}
                        className="w-full h-full object-cover"
                        data-ai-hint="resume layout"
                      />
                    </div>
                    <span className="capitalize font-medium">{t}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
        <ResumeForm resumeData={resumeData} updateResumeData={updateResumeData} resetResumeData={resetResumeData} />
      </div>

      <div className="sticky top-24 hidden lg:block">
        <ResumePreview resumeData={resumeData} template={template} />
      </div>
    </div>
  );
}
