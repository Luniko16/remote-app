'use client';

import { FileText, Download, FileUp, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from '@/hooks/use-toast';
import { generateTextBasedPDF } from '@/lib/pdf-generator';
import { useResumeData } from '@/hooks/use-resume-data';
import { useState } from 'react';

export function Header() {
  const { toast } = useToast();
  const { resumeData } = useResumeData();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handlePDFExport = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateTextBasedPDF(resumeData, 'resume.pdf');
      
      toast({
        title: "Success!",
        description: "Your resume has been exported as a text-based PDF.",
      });
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast({
        title: "Export Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDocx = () => {
    toast({
      title: "Feature Coming Soon",
      description: "DOCX export will be available in a future update.",
    })
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <FileText className="h-7 w-7 text-primary" />
          <h1 className="font-headline text-3xl font-bold tracking-wide text-foreground">
            ResumAI
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handlePDFExport} disabled={isGeneratingPDF}>
                <FileDown className="mr-2 h-4 w-4" />
                <span>{isGeneratingPDF ? 'Generating PDF...' : 'Export to PDF'}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDocx}>
                <FileUp className="mr-2 h-4 w-4" />
                <span>Export to DOCX</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
