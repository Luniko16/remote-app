'use server';

/**
 * @fileOverview A flow that analyzes a job description and provides suggestions on how to tailor a resume to match.
 *
 * - optimizeJobDescription - A function that handles the job description optimization process.
 * - OptimizeJobDescriptionInput - The input type for the optimizeJobDescription function.
 * - OptimizeJobDescriptionOutput - The return type for the optimizeJobDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeJobDescriptionInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to analyze.'),
  resumeContent: z
    .string()
    .describe('The content of the resume to tailor.'),
});
export type OptimizeJobDescriptionInput = z.infer<typeof OptimizeJobDescriptionInputSchema>;

const OptimizeJobDescriptionOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Suggestions on how to tailor the resume to match the job description.'),
});
export type OptimizeJobDescriptionOutput = z.infer<typeof OptimizeJobDescriptionOutputSchema>;

export async function optimizeJobDescription(input: OptimizeJobDescriptionInput): Promise<OptimizeJobDescriptionOutput> {
  return optimizeJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeJobDescriptionPrompt',
  input: {schema: OptimizeJobDescriptionInputSchema},
  output: {schema: OptimizeJobDescriptionOutputSchema},
  prompt: `You are an expert resume optimizer. Your goal is to analyze a job description and provide suggestions on how to tailor a resume to match the job description.

Job Description: {{{jobDescription}}}

Resume Content: {{{resumeContent}}}

Provide specific and actionable suggestions on how to tailor the resume to match the job description. Focus on skills, experience, and keywords that are relevant to the job description.`,
});

const optimizeJobDescriptionFlow = ai.defineFlow(
  {
    name: 'optimizeJobDescriptionFlow',
    inputSchema: OptimizeJobDescriptionInputSchema,
    outputSchema: OptimizeJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
