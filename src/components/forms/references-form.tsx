'use client';
import React from 'react';
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
import type { ResumeData, Reference } from '@/lib/types';

type ReferencesFormProps = {
  references: Reference[];
  updateResumeData: (updater: (prev: ResumeData) => ResumeData) => void;
};

export function ReferencesForm({ references, updateResumeData }: ReferencesFormProps) {
  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateResumeData(prev => ({
      ...prev,
      references: prev.references.map(ref => ref.id === id ? { ...ref, [name]: value } : ref)
    }));
  };

  const addReference = () => {
    updateResumeData(prev => ({
      ...prev,
      references: [...prev.references, { 
        id: crypto.randomUUID(), 
        name: '', 
        title: '', 
        company: '', 
        email: '', 
        phone: '', 
        relationship: '' 
      }]
    }));
  };

  const removeReference = (id: string) => {
    updateResumeData(prev => ({
      ...prev,
      references: prev.references.filter(ref => ref.id !== id)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">References</CardTitle>
        <CardDescription>Add professional references who can vouch for your work.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {references.map((ref) => (
          <div key={ref.id} className="p-4 border rounded-lg space-y-4 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`name-${ref.id}`}>Full Name</Label>
                <Input 
                  id={`name-${ref.id}`} 
                  name="name" 
                  value={ref.name} 
                  onChange={(e) => handleChange(ref.id, e)} 
                  placeholder="John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`title-${ref.id}`}>Job Title</Label>
                <Input 
                  id={`title-${ref.id}`} 
                  name="title" 
                  value={ref.title} 
                  onChange={(e) => handleChange(ref.id, e)} 
                  placeholder="Senior Manager"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`company-${ref.id}`}>Company</Label>
                <Input 
                  id={`company-${ref.id}`} 
                  name="company" 
                  value={ref.company} 
                  onChange={(e) => handleChange(ref.id, e)} 
                  placeholder="ABC Corporation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`relationship-${ref.id}`}>Relationship</Label>
                <Input 
                  id={`relationship-${ref.id}`} 
                  name="relationship" 
                  value={ref.relationship} 
                  onChange={(e) => handleChange(ref.id, e)} 
                  placeholder="Former supervisor"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`email-${ref.id}`}>Email</Label>
                <Input 
                  id={`email-${ref.id}`} 
                  name="email" 
                  type="email"
                  value={ref.email} 
                  onChange={(e) => handleChange(ref.id, e)} 
                  placeholder="john.smith@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`phone-${ref.id}`}>Phone</Label>
                <Input 
                  id={`phone-${ref.id}`} 
                  name="phone" 
                  value={ref.phone} 
                  onChange={(e) => handleChange(ref.id, e)} 
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" 
              onClick={() => removeReference(ref.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addReference} className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Reference
        </Button>
      </CardContent>
    </Card>
  );
}