'use client';
import React, { useState, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, PlusCircle, Sparkles, Loader2 } from 'lucide-react';
import type { ResumeData, Experience } from '@/lib/types';
import { optimizeDescriptionAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ExperienceFormProps = {
  experience: Experience[];
  resumeData: ResumeData;
  updateResumeData: (updater: (prev: ResumeData) => ResumeData) => void;
};

export function ExperienceForm({ experience, resumeData, updateResumeData }: ExperienceFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [jobDescToOptimize, setJobDescToOptimize] = useState('');
  const [optimizingExperienceId, setOptimizingExperienceId] = useState<string | null>(null);

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [name]: value } : exp)
    }));
  };

  const addExperience = () => {
    updateResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: crypto.randomUUID(), company: '', role: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const removeExperience = (id: string) => {
    updateResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const handleOptimize = (experienceId: string) => {
    setOptimizingExperienceId(experienceId);
    startTransition(async () => {
        const resumeContent = JSON.stringify(resumeData);
        const result = await optimizeDescriptionAction({ jobDescription: jobDescToOptimize, resumeContent });
        
        if ('suggestions' in result) {
            updateResumeData(prev => ({
                ...prev,
                experience: prev.experience.map(exp => exp.id === experienceId ? { ...exp, description: result.suggestions } : exp)
            }));
            toast({ title: "Description Optimized!", description: "AI suggestions have been applied." });
        } else {
            toast({ variant: "destructive", title: "Error", description: result.error });
        }
        setOptimizingExperienceId(null);
        setJobDescToOptimize('');
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Work Experience</CardTitle>
        <CardDescription>Detail your professional history.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {experience.map((exp, index) => (
          <div key={exp.id} className="p-4 border rounded-lg space-y-4 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`role-${exp.id}`}>Role / Title</Label>
                <Input id={`role-${exp.id}`} name="role" value={exp.role} onChange={(e) => handleChange(exp.id, e)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`company-${exp.id}`}>Company</Label>
                <Input id={`company-${exp.id}`} name="company" value={exp.company} onChange={(e) => handleChange(exp.id, e)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                <Input id={`startDate-${exp.id}`} name="startDate" value={exp.startDate} onChange={(e) => handleChange(exp.id, e)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                <Input id={`endDate-${exp.id}`} name="endDate" value={exp.endDate} onChange={(e) => handleChange(exp.id, e)} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor={`description-${exp.id}`}>Description</Label>
                 <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Sparkles className="mr-2 h-4 w-4" /> Optimize with AI
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle className="font-headline">Optimize for a Job</DialogTitle>
                      <DialogDescription>
                        Paste the job description you're applying for. The AI will tailor this experience entry to match.
                      </DialogDescription>
                    </DialogHeader>
                    <Textarea 
 
                      rows={10} 
                      value={jobDescToOptimize}
                      onChange={(e) => setJobDescToOptimize(e.target.value)}
                    />
                    <DialogFooter>
                      <Button onClick={() => handleOptimize(exp.id)} disabled={isPending && optimizingExperienceId === exp.id}>
                        {isPending && optimizingExperienceId === exp.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Optimize
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Textarea id={`description-${exp.id}`} name="description" value={exp.description} onChange={(e) => handleChange(exp.id, e)} rows={4} />
            </div>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" onClick={() => removeExperience(exp.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addExperience} className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
        </Button>
      </CardContent>
    </Card>
  );
}
