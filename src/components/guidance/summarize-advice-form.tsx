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

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      medicalAdvice: '',
      childAgeMonths: 6,
      familyCircumstances: '',
    },
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    setResult(null);
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
                    <Textarea placeholder={t('form_advice_placeholder')} {...field} rows={6} />
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
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
