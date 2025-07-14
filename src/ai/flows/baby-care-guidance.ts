// src/ai/flows/baby-care-guidance.ts
'use server';
/**
 * @fileOverview Provides AI-driven baby care guidance, tailored for Indian parents with limited resources.
 *
 * - babyCareGuidance - A function to get baby care advice.
 * - BabyCareGuidanceInput - The input type for the babyCareGuidance function.
 * - BabyCareGuidanceOutput - The return type for the babyCareGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BabyCareGuidanceInputSchema = z.object({
  query: z.string().describe('The specific question or concern about baby care.'),
  location: z.string().describe('The location of the user (e.g., city, state in India).'),
  resourceAccess: z.string().describe('Description of the resources available to the user (e.g., limited, moderate, ample).'),
});
export type BabyCareGuidanceInput = z.infer<typeof BabyCareGuidanceInputSchema>;

const BabyCareGuidanceOutputSchema = z.object({
  advice: z.string().describe('AI-generated advice tailored to the user query, location, and resource access.'),
});
export type BabyCareGuidanceOutput = z.infer<typeof BabyCareGuidanceOutputSchema>;

export async function babyCareGuidance(input: BabyCareGuidanceInput): Promise<BabyCareGuidanceOutput> {
  return babyCareGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'babyCareGuidancePrompt',
  input: {schema: BabyCareGuidanceInputSchema},
  output: {schema: BabyCareGuidanceOutputSchema},
  prompt: `You are an AI-powered baby care assistant for Indian parents, especially those with limited resources. Provide concise, practical, and affordable advice based on the user's query, location, and resource access. Focus on solutions that are easily accessible in India.

User Query: {{{query}}}
Location: {{{location}}}
Resource Access: {{{resourceAccess}}}

Response:`, // DO NOT use Handlebars await
});

const babyCareGuidanceFlow = ai.defineFlow(
  {
    name: 'babyCareGuidanceFlow',
    inputSchema: BabyCareGuidanceInputSchema,
    outputSchema: BabyCareGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
