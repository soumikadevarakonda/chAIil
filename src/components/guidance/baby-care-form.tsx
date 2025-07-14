'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { babyCareGuidance } from '@/ai/flows/baby-care-guidance';
import { useLanguage } from '@/contexts/language-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const FormSchema = z.object({
  query: z.string().min(10, 'Please describe your question in at least 10 characters.'),
  location: z.string().min(2, 'Please enter a valid location.'),
  resourceAccess: z.string().min(10, 'Please describe your available resources.'),
});

type FormData = z.infer<typeof FormSchema>;

export default function BabyCareForm() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: '',
      location: '',
      resourceAccess: '',
    },
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    setResult(null);
    try {
      const response = await babyCareGuidance(data);
      setResult(response.advice);
    } catch (error) {
      console.error('Error getting baby care guidance:', error);
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
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_query_label')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('form_query_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_location_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form_location_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resourceAccess"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_resources_label')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('form_resources_placeholder')} {...field} />
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
