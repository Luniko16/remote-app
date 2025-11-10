import { z } from 'zod';

export const PersonalInfoSchema = z.object({
  name: z.string().default(''),
  email: z.string().email({ message: "Invalid email address" }).or(z.literal('')).default(''),
  phone: z.string().default(''),
  location: z.string().default(''),
  website: z.string().url({ message: "Invalid URL" }).or(z.literal('')).default(''),
  linkedin: z.string().url({ message: "Invalid LinkedIn URL" }).or(z.literal('')).default(''),
});

export const ExperienceSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  company: z.string().default(''),
  role: z.string().default(''),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  description: z.string().default(''),
});

export const EducationSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  institution: z.string().default(''),
  degree: z.string().default(''),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
});

export const SkillSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  name: z.string().default(''),
});

export const ProjectSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  name: z.string().default(''),
  description: z.string().default(''),
  url: z.string().url({ message: "Invalid URL" }).or(z.literal('')).default(''),
});

export const ReferenceSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  name: z.string().default(''),
  title: z.string().default(''),
  company: z.string().default(''),
  email: z.string().email({ message: "Invalid email address" }).or(z.literal('')).default(''),
  phone: z.string().default(''),
  relationship: z.string().default(''),
});

export const ResumeDataSchema = z.object({
  personalInfo: PersonalInfoSchema.default({}),
  summary: z.string().default(''),
  experience: z.array(ExperienceSchema).default([]),
  education: z.array(EducationSchema).default([]),
  skills: z.array(SkillSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  references: z.array(ReferenceSchema).default([]),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Reference = z.infer<typeof ReferenceSchema>;
export type ResumeData = z.infer<typeof ResumeDataSchema>;
