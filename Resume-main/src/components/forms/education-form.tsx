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
import { Button } from '@/components/ui/button';
import { Trash2, PlusCircle } from 'lucide-react';
import type { ResumeData, Education } from '@/lib/types';

type EducationFormProps = {
  education: Education[];
  updateResumeData: (updater: (prev: ResumeData) => ResumeData) => void;
};

export function EducationForm({ education, updateResumeData }: EducationFormProps) {
  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [name]: value } : edu)
    }));
  };

  const addEducation = () => {
    updateResumeData(prev => ({
      ...prev,
      education: [...prev.education, { id: crypto.randomUUID(), institution: '', degree: '', startDate: '', endDate: '' }]
    }));
  };

  const removeEducation = (id: string) => {
    updateResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Education</CardTitle>
        <CardDescription>List your academic achievements.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map((edu, index) => (
          <div key={edu.id} className="p-4 border rounded-lg space-y-4 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                <Input id={`institution-${edu.id}`} name="institution" value={edu.institution} onChange={(e) => handleChange(edu.id, e)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`degree-${edu.id}`}>Degree / Certificate</Label>
                <Input id={`degree-${edu.id}`} name="degree" value={edu.degree} onChange={(e) => handleChange(edu.id, e)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                <Input id={`startDate-${edu.id}`} name="startDate" value={edu.startDate} onChange={(e) => handleChange(edu.id, e)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                <Input id={`endDate-${edu.id}`} name="endDate" value={edu.endDate} onChange={(e) => handleChange(edu.id, e)} />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" onClick={() => removeEducation(edu.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addEducation} className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </CardContent>
    </Card>
  );
}
