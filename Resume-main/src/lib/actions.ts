'use server';

import { generateResumeSummary, type GenerateResumeSummaryInput } from '@/ai/flows/generate-resume-summary';
import { suggestRelevantSkills, type SuggestRelevantSkillsInput } from '@/ai/flows/suggest-relevant-skills';
import { optimizeJobDescription, type OptimizeJobDescriptionInput } from '@/ai/flows/optimize-job-description';

export async function generateSummaryAction(input: GenerateResumeSummaryInput): Promise<{ summary: string } | { error: string }> {
  try {
    if (!input.jobTitle || !input.keySkills) {
      return { error: 'Job title and skills are required to generate a summary.' };
    }
    const result = await generateResumeSummary(input);
    return { summary: result.summary };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Failed to generate summary: ${errorMessage}` };
  }
}

export async function suggestSkillsAction(input: SuggestRelevantSkillsInput): Promise<{ skills: string[] } | { error: string }> {
  try {
    if (!input.jobTitle) {
      return { error: 'A job title is required to suggest skills.' };
    }
    const result = await suggestRelevantSkills(input);
    return { skills: result.skills };
  } catch(e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Failed to suggest skills: ${errorMessage}` };
  }
}

export async function optimizeDescriptionAction(input: OptimizeJobDescriptionInput): Promise<{ suggestions: string } | { error: string }> {
  try {
    if (!input.jobDescription || !input.resumeContent) {
      return { error: 'Job description and resume content are required.' };
    }
    const result = await optimizeJobDescription(input);
    return { suggestions: result.suggestions };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Failed to optimize description: ${errorMessage}` };
  }
}
