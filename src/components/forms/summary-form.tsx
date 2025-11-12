'use client';
import { useState, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import type { ResumeData } from '@/lib/types';
import { generateSummaryAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

type SummaryFormProps = {
  summary: string;
  resumeData: ResumeData;
  updateResumeData: (updater: (prev: ResumeData) => ResumeData) => void;
};

export function SummaryForm({ summary, resumeData, updateResumeData }: SummaryFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    updateResumeData(prev => ({ ...prev, summary: value }));
  };

  const handleGenerateSummary = () => {
    startTransition(async () => {
      const jobTitle = resumeData.experience[0]?.role || '';
      const keySkills = resumeData.skills.map(s => s.name).join(', ');

      if (!jobTitle || !keySkills) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please add at least one job role and some skills to generate a summary.",
        });
        return;
      }

      const result = await generateSummaryAction({ jobTitle, keySkills });
      if ('summary' in result) {
        updateResumeData(prev => ({ ...prev, summary: result.summary }));
        toast({
          title: "Summary Generated!",
          description: "The AI has created a new professional summary for you.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-xl">Professional Summary</CardTitle>
            <CardDescription>
              A brief 2-3 sentence summary of your career.
            </CardDescription>
          </div>
          <Button onClick={handleGenerateSummary} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Generate with AI
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="summary" className="sr-only">Summary</Label>
          <Textarea
            id="summary"
            name="summary"
            value={summary}
            onChange={handleChange}

            rows={5}
          />
        </div>
      </CardContent>
    </Card>
  );
}
