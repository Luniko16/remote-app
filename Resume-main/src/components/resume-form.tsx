'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  RotateCcw,
  BookUser,
  Lightbulb,
  Users
} from 'lucide-react';
import type { ResumeData } from '@/lib/types';
import { PersonalInfoForm } from './forms/personal-info-form';
import { SummaryForm } from './forms/summary-form';
import { ExperienceForm } from './forms/experience-form';
import { EducationForm } from './forms/education-form';
import { SkillsForm } from './forms/skills-form';
import { ProjectForm } from './forms/project-form';
import { ReferencesForm } from './forms/references-form';

type ResumeFormProps = {
  resumeData: ResumeData;
  updateResumeData: (updater: (prev: ResumeData) => ResumeData) => void;
  resetResumeData: () => void;
};

export function ResumeForm({ resumeData, updateResumeData, resetResumeData }: ResumeFormProps) {
    return (
        <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-7 h-auto flex-wrap sm:h-10">
                <TabsTrigger value="personal"><User className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Personal</span></TabsTrigger>
                <TabsTrigger value="summary"><BookUser className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Summary</span></TabsTrigger>
                <TabsTrigger value="experience"><Briefcase className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Experience</span></TabsTrigger>
                <TabsTrigger value="education"><GraduationCap className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Education</span></TabsTrigger>
                <TabsTrigger value="skills"><Sparkles className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Skills</span></TabsTrigger>
                <TabsTrigger value="projects"><Lightbulb className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Projects</span></TabsTrigger>
                <TabsTrigger value="references"><Users className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">References</span></TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
                <PersonalInfoForm personalInfo={resumeData.personalInfo} updateResumeData={updateResumeData} />
            </TabsContent>
            <TabsContent value="summary">
                <SummaryForm summary={resumeData.summary} resumeData={resumeData} updateResumeData={updateResumeData} />
            </TabsContent>
            <TabsContent value="experience">
                <ExperienceForm experience={resumeData.experience} resumeData={resumeData} updateResumeData={updateResumeData} />
            </TabsContent>
            <TabsContent value="education">
                <EducationForm education={resumeData.education} updateResumeData={updateResumeData} />
            </TabsContent>
            <TabsContent value="skills">
                <SkillsForm skills={resumeData.skills} updateResumeData={updateResumeData} />
            </TabsContent>
            <TabsContent value="projects">
                <ProjectForm projects={resumeData.projects} updateResumeData={updateResumeData} />
            </TabsContent>
            <TabsContent value="references">
                <ReferencesForm references={resumeData.references} updateResumeData={updateResumeData} />
            </TabsContent>

            <Card className="mt-6 border-destructive/50">
              <CardHeader>
                <CardTitle className="font-headline text-destructive">Clear All Data</CardTitle>
                <CardDescription>
                  Start over with a blank slate. This will permanently clear all your current edits.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="destructive" onClick={resetResumeData}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Clear All Data
                </Button>
              </CardFooter>
            </Card>
        </Tabs>
    )
}
