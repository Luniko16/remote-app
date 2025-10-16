// This file is machine-generated - edit with care!
'use server';

/**
 * @fileOverview Generates a professional resume summary based on user-provided job title and key skills.
 *
 * - generateResumeSummary - A function that generates a resume summary.
 * - GenerateResumeSummaryInput - The input type for the generateResumeSummary function.
 * - GenerateResumeSummaryOutput - The return type for the generateResumeSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeSummaryInputSchema = z.object({
  jobTitle: z.string().describe('The job title for the resume.'),
  keySkills: z.string().describe('A comma-separated list of key skills.'),
});

export type GenerateResumeSummaryInput = z.infer<
  typeof GenerateResumeSummaryInputSchema
>;

const GenerateResumeSummaryOutputSchema = z.object({
  summary: z.string().describe('The generated professional resume summary.'),
  progress: z.string().describe('Progress summary of the resume generation.'),
});

export type GenerateResumeSummaryOutput = z.infer<
  typeof GenerateResumeSummaryOutputSchema
>;

export async function generateResumeSummary(
  input: GenerateResumeSummaryInput
): Promise<GenerateResumeSummaryOutput> {
  return generateResumeSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumeSummaryPrompt',
  input: {schema: GenerateResumeSummaryInputSchema},
  output: {schema: GenerateResumeSummaryOutputSchema},
  prompt: `You are a professional resume writer. Generate a compelling resume summary based on the job title and key skills provided.

Job Title: {{{jobTitle}}}
Key Skills: {{{keySkills}}}

Resume Summary:`,
});

const generateResumeSummaryFlow = ai.defineFlow(
  {
    name: 'generateResumeSummaryFlow',
    inputSchema: GenerateResumeSummaryInputSchema,
    outputSchema: GenerateResumeSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      progress: 'Generated a professional summary for the resume.',
    };
  }
);
