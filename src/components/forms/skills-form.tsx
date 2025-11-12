'use client';
import { useState, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Sparkles, Loader2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ResumeData, Skill } from '@/lib/types';
import { suggestSkillsAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';

type SkillsFormProps = {
  skills: Skill[];
  updateResumeData: (updater: (prev: ResumeData) => ResumeData) => void;
};

export function SkillsForm({ skills, updateResumeData }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const addSkill = () => {
    if (newSkill.trim() !== '') {
      updateResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, { id: crypto.randomUUID(), name: newSkill.trim() }]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (id: string) => {
    updateResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };
  
  const handleSuggestSkills = () => {
    if (!jobTitle) {
      toast({ variant: "destructive", title: "Job Title Required", description: "Please enter a job title to get AI suggestions." });
      return;
    }
    startTransition(async () => {
      const result = await suggestSkillsAction({ jobTitle });
      if ('skills' in result) {
        const newSkills = result.skills.map(s => ({ id: crypto.randomUUID(), name: s }));
        // Add only skills that are not already in the list
        const uniqueNewSkills = newSkills.filter(ns => !skills.some(os => os.name.toLowerCase() === ns.name.toLowerCase()));
        
        updateResumeData(prev => ({
          ...prev,
          skills: [...prev.skills, ...uniqueNewSkills]
        }));
        toast({ title: "Skills Suggested!", description: `${uniqueNewSkills.length} new skills added.` });
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Skills</CardTitle>
        <CardDescription>Highlight your key abilities.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Get AI Suggestions</Label>
          <div className="flex gap-2">
            <Input 
 
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <Button onClick={handleSuggestSkills} disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Suggest
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Add a Skill</Label>
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}

            />
            <Button onClick={addSkill}><Plus className="mr-2 h-4 w-4" />Add</Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? skills.map(skill => (
            <Badge key={skill.id} variant="secondary" className="text-sm">
              {skill.name}
              <button onClick={() => removeSkill(skill.id)} className="ml-2 rounded-full p-0.5 hover:bg-destructive/20 text-muted-foreground hover:text-destructive-foreground">
                <Trash2 className="h-3 w-3" />
              </button>
            </Badge>
          )) : <p className="text-sm text-muted-foreground">No skills added yet.</p>}
        </div>
      </CardContent>
    </Card>
  );
}
