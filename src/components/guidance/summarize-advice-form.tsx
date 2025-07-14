'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { summarizeMedicalAdvice } from '@/ai/flows/summarize-medical-advice';
import { useLanguage } from '@/contexts/language-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useVoiceInput } from '@/hooks/use-voice-input';
import { VoiceInputButton } from '../voice-input-button';
import { AudioPlayer } from '../audio-player';
import { textToSpeech } from '@/ai/flows/text-to-speech';

const FormSchema = z.object({
  medicalAdvice: z.string().min(20, 'Please enter the full medical advice, at least 20 characters.'),
  childAgeMonths: z.coerce.number().min(0, 'Age must be a positive number.'),
  familyCircumstances: z.string().min(10, 'Please describe your family circumstances.'),
});

type FormData = z.infer<typeof FormSchema>;

export default function SummarizeAdviceForm() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isTtsLoading, setIsTtsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      medicalAdvice: '',
      childAgeMonths: 6,
      familyCircumstances: '',
    },
  });

  const { isListening, startListening, stopListening } = useVoiceInput({
    onTranscript: (text) => form.setValue('medicalAdvice', form.getValues('medicalAdvice') + text),
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    setResult(null);
    setAudioDataUri(null);
    try {
      const response = await summarizeMedicalAdvice(data);
      setResult(response.summary);
    } catch (error) {
      console.error('Error summarizing advice:', error);
      setResult('Sorry, something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleGetAudio = async () => {
    if (!result) return;
    setIsTtsLoading(true);
    try {
      const response = await textToSpeech(result);
      setAudioDataUri(response.audioDataUri);
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setIsTtsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="medicalAdvice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_advice_label')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea placeholder={t('form_advice_placeholder')} {...field} rows={6} />
                       <VoiceInputButton
                        isListening={isListening}
                        onStart={startListening}
                        onStop={stopListening}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="childAgeMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_child_age_label')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t('form_child_age_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyCircumstances"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_family_circumstances_label')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('form_family_circumstances_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('form_submit_button')}
            </Button>
          </form>
        </Form>
        
        {loading && (
          <div className="mt-6 flex items-center justify-center">
            <p className="text-muted-foreground">{t('form_loading_message')}</p>
          </div>
        )}

        {result && (
          <Card className="mt-6 bg-secondary">
            <CardHeader>
              <CardTitle>{t('form_ai_response_title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{result}</p>
              <div className="mt-4">
                 <AudioPlayer
                  audioDataUri={audioDataUri}
                  onGetAudio={handleGetAudio}
                  isLoading={isTtsLoading}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
