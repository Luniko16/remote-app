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
import type { ResumeData, PersonalInfo } from '@/lib/types';

type PersonalInfoFormProps = {
  personalInfo: PersonalInfo;
  updateResumeData: (updater: (prev: ResumeData) => ResumeData) => void;
};

export function PersonalInfoForm({ personalInfo, updateResumeData }: PersonalInfoFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Personal Information</CardTitle>
        <CardDescription>
          This information will appear at the top of your resume.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={personalInfo.name} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" value={personalInfo.email} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" value={personalInfo.phone} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" value={personalInfo.location} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website / Portfolio</Label>
          <Input id="website" name="website" value={personalInfo.website} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input id="linkedin" name="linkedin" value={personalInfo.linkedin} onChange={handleChange} />
        </div>
      </CardContent>
    </Card>
  );
}
