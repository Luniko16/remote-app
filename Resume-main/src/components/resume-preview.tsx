'use client';

import type { ResumeData } from '@/lib/types';
import ClassicTemplate from '@/components/templates/classic';
import ModernTemplate from '@/components/templates/modern';
import CreativeTemplate from '@/components/templates/creative';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

type ResumePreviewProps = {
  resumeData: ResumeData;
  template: 'classic' | 'modern' | 'creative';
};

const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  creative: CreativeTemplate,
};

export function ResumePreview({ resumeData, template }: ResumePreviewProps) {
  const SelectedTemplate = templates[template];

  const resumeContent = (
    // A4 aspect ratio at 794x1123px, scaled down
    <div
      id="resume-preview"
      className="w-[794px] h-[1123px] origin-top transform bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-300 ease-in-out lg:origin-top-left lg:scale-[0.55] xl:scale-[0.6]"
      style={{ 
        // Ensure consistent rendering for PDF generation
        fontFamily: 'system-ui, -apple-system, sans-serif',
        lineHeight: '1.5'
      }}
    >
      <SelectedTemplate data={resumeData} />
    </div>
  );

  return (
    <>
      <div className="fixed bottom-4 right-4 z-20 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
              <Eye className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="w-full h-[90vh] p-0">
            <SheetHeader className="p-4 border-b bg-background">
              <SheetTitle className="font-headline">Preview</SheetTitle>
            </SheetHeader>
            <div className="overflow-auto h-full bg-muted/40 flex justify-center p-4 sm:p-8">
              <div className="w-full max-w-[794px]">
                 <div
                  id="resume-preview-mobile"
                  className="w-full h-auto aspect-[1/1.414] origin-top transform bg-white shadow-2xl ring-1 ring-black/5"
                  style={{ 
                    // Ensure consistent rendering for PDF generation
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    lineHeight: '1.5'
                  }}
                >
                  <SelectedTemplate data={resumeData} />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">
        {resumeContent}
      </div>


    </>
  );
}
