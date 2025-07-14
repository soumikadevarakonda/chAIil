'use server';
/**
 * @fileOverview Analyzes an image of a baby's rash to determine severity.
 *
 * - analyzeRash - A function that handles the rash analysis process.
 * - RashAnalysisInput - The input type for the analyzeRash function.
 * - RashAnalysisOutput - The return type for the analyzeRash function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const RashAnalysisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a skin condition, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('A description of the rash, including when it appeared and any other symptoms.'),
});
export type RashAnalysisInput = z.infer<typeof RashAnalysisInputSchema>;

const RashAnalysisOutputSchema = z.object({
  severity: z.enum(['low', 'medium', 'high']).describe("The assessed severity of the skin condition. 'high' means immediate medical attention is recommended."),
  assessment: z.string().describe("A brief assessment of the skin condition. This is not a diagnosis."),
  recommendation: z.string().describe("The recommended course of action for the parent."),
});
export type RashAnalysisOutput = z.infer<typeof RashAnalysisOutputSchema>;

export async function analyzeRash(input: RashAnalysisInput): Promise<RashAnalysisOutput> {
  return rashAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rashAnalysisPrompt',
  input: {schema: RashAnalysisInputSchema},
  output: {schema: RashAnalysisOutputSchema},
  prompt: `You are a medical AI assistant. Your role is to analyze an image and description of a baby's skin condition and provide a preliminary assessment. You are not a doctor and must not provide a diagnosis. Your goal is to help a parent understand the potential severity and guide them on next steps.

Analyze the provided photo and description of the rash.
- Assess the severity as 'low' (likely benign, monitor at home), 'medium' (consult a doctor soon), or 'high' (seek immediate medical attention).
- Provide a brief, non-diagnostic assessment of what the rash might be (e.g., "appears to be a mild irritation", "shows signs of an allergic reaction").
- Provide a clear recommendation. If severity is 'high', strongly advise seeing a doctor immediately. If 'medium', advise booking an appointment. If 'low', suggest monitoring and simple home care.

Crucially, include a disclaimer in every recommendation that this is not a substitute for professional medical advice.

Description: {{{description}}}
Photo: {{media url=photoDataUri}}`,
});

const rashAnalysisFlow = ai.defineFlow(
  {
    name: 'rashAnalysisFlow',
    inputSchema: RashAnalysisInputSchema,
    outputSchema: RashAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
