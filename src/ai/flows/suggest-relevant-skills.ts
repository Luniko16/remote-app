'use server';

/**
 * @fileOverview Suggests relevant skills for a given job title using AI.
 *
 * - suggestRelevantSkills - A function that suggests relevant skills for a job title.
 * - SuggestRelevantSkillsInput - The input type for the suggestRelevantSkills function.
 * - SuggestRelevantSkillsOutput - The return type for the suggestRelevantSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantSkillsInputSchema = z.object({
  jobTitle: z.string().describe('The job title to suggest skills for.'),
});
export type SuggestRelevantSkillsInput = z.infer<typeof SuggestRelevantSkillsInputSchema>;

const SuggestRelevantSkillsOutputSchema = z.object({
  skills: z.array(z.string()).describe('An array of relevant skills for the job title.'),
});
export type SuggestRelevantSkillsOutput = z.infer<typeof SuggestRelevantSkillsOutputSchema>;

export async function suggestRelevantSkills(input: SuggestRelevantSkillsInput): Promise<SuggestRelevantSkillsOutput> {
  return suggestRelevantSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantSkillsPrompt',
  input: {schema: SuggestRelevantSkillsInputSchema},
  output: {schema: SuggestRelevantSkillsOutputSchema},
  prompt: `Suggest relevant skills for the job title: {{{jobTitle}}}. Return them as a list.

Skills:`, 
});

const suggestRelevantSkillsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantSkillsFlow',
    inputSchema: SuggestRelevantSkillsInputSchema,
    outputSchema: SuggestRelevantSkillsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
