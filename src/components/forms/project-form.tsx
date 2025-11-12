'use client';
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
import { Trash2, PlusCircle } from 'lucide-react';
import type { ResumeData, Project } from '@/lib/types';

type ProjectFormProps = {
  projects: Project[];
  updateResumeData: (updater: (prev: ResumeData) => ResumeData) => void;
};

export function ProjectForm({ projects, updateResumeData }: ProjectFormProps) {
  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => proj.id === id ? { ...proj, [name]: value } : proj)
    }));
  };

  const addProject = () => {
    updateResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: crypto.randomUUID(), name: '', description: '', url: '' }]
    }));
  };

  const removeProject = (id: string) => {
    updateResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Projects</CardTitle>
        <CardDescription>Showcase your personal or professional projects.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((proj) => (
          <div key={proj.id} className="p-4 border rounded-lg space-y-4 relative">
            <div className="space-y-2">
              <Label htmlFor={`name-${proj.id}`}>Project Name</Label>
              <Input id={`name-${proj.id}`} name="name" value={proj.name} onChange={(e) => handleChange(proj.id, e)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`url-${proj.id}`}>Project URL</Label>
              <Input id={`url-${proj.id}`} name="url" value={proj.url} onChange={(e) => handleChange(proj.id, e)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${proj.id}`}>Description</Label>
              <Textarea id={`description-${proj.id}`} name="description" value={proj.description} onChange={(e) => handleChange(proj.id, e)} rows={3} />
            </div>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" onClick={() => removeProject(proj.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addProject} className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </CardContent>
    </Card>
  );
}
