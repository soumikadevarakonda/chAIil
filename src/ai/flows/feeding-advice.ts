'use server';

/**
 * @fileOverview Provides feeding advice to parents based on the child's age, region, and family circumstances, focusing on locally available foods.
 *
 * - getFeedingAdvice - A function that provides feeding advice.
 * - FeedingAdviceInput - The input type for the getFeedingAdvice function.
 * - FeedingAdviceOutput - The return type for the getFeedingAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FeedingAdviceInputSchema = z.object({
  childAgeMonths: z
    .number()
    .describe('The age of the child in months.'),
  region: z
    .string()
    .describe('The region where the family lives.'),
  familyCircumstances: z
    .string()
    .describe('Description of the family circumstances, including income and access to resources.'),
  locallyAvailableFoods: z
    .string()
    .describe('A list of foods that are locally available to the family.'),
});
export type FeedingAdviceInput = z.infer<typeof FeedingAdviceInputSchema>;

const FeedingAdviceOutputSchema = z.object({
  advice: z.string().describe('Feeding advice tailored to the family circumstances, child age, and available foods.'),
});
export type FeedingAdviceOutput = z.infer<typeof FeedingAdviceOutputSchema>;

export async function getFeedingAdvice(input: FeedingAdviceInput): Promise<FeedingAdviceOutput> {
  return feedingAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'feedingAdvicePrompt',
  input: {schema: FeedingAdviceInputSchema},
  output: {schema: FeedingAdviceOutputSchema},
  prompt: `You are a helpful AI assistant that provides feeding advice to parents.

  Provide feeding advice tailored to the family circumstances, child age, and available foods.

  Child Age: {{childAgeMonths}} months
  Region: {{region}}
  Family Circumstances: {{familyCircumstances}}
  Locally Available Foods: {{locallyAvailableFoods}}
  `,
});

const feedingAdviceFlow = ai.defineFlow(
  {
    name: 'feedingAdviceFlow',
    inputSchema: FeedingAdviceInputSchema,
    outputSchema: FeedingAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
