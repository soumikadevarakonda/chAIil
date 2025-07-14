'use server';

/**
 * @fileOverview Summarizes medical advice for parents with limited literacy.
 *
 * - summarizeMedicalAdvice - A function that summarizes medical advice.
 * - SummarizeMedicalAdviceInput - The input type for the summarizeMedicalAdvice function.
 * - SummarizeMedicalAdviceOutput - The return type for the summarizeMedicalAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMedicalAdviceInputSchema = z.object({
  medicalAdvice: z
    .string()
    .describe('The medical advice received from a doctor.'),
  childAgeMonths: z
    .number()
    .describe('The age of the child in months.'),
  familyCircumstances: z
    .string()
    .describe('A brief description of the family circumstances, including literacy level and access to resources.'),
});
export type SummarizeMedicalAdviceInput = z.infer<typeof SummarizeMedicalAdviceInputSchema>;

const SummarizeMedicalAdviceOutputSchema = z.object({
  summary: z
    .string()
    .describe('A simplified summary of the medical advice with actionable steps.'),
});
export type SummarizeMedicalAdviceOutput = z.infer<typeof SummarizeMedicalAdviceOutputSchema>;

export async function summarizeMedicalAdvice(input: SummarizeMedicalAdviceInput): Promise<SummarizeMedicalAdviceOutput> {
  return summarizeMedicalAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeMedicalAdvicePrompt',
  input: {schema: SummarizeMedicalAdviceInputSchema},
  output: {schema: SummarizeMedicalAdviceOutputSchema},
  prompt: `You are a helpful AI assistant that summarizes medical advice for parents with limited literacy.

  Given the following medical advice, child's age, and family circumstances, create a simplified summary with actionable steps that the parent can easily understand and follow.

  Medical Advice: {{{medicalAdvice}}}
  Child's Age (months): {{{childAgeMonths}}}
  Family Circumstances: {{{familyCircumstances}}}

  Summary:`,
});

const summarizeMedicalAdviceFlow = ai.defineFlow(
  {
    name: 'summarizeMedicalAdviceFlow',
    inputSchema: SummarizeMedicalAdviceInputSchema,
    outputSchema: SummarizeMedicalAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
