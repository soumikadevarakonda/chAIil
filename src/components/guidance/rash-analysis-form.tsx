'use client';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { analyzeRash, RashAnalysisOutput } from '@/ai/flows/rash-analysis';
import { useLanguage } from '@/contexts/language-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, AlertCircle, HeartPulse, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const FormSchema = z.object({
  photo: z.any().refine(file => file instanceof File, 'Please upload an image.'),
  description: z.string().min(10, 'Please describe the rash in at least 10 characters.'),
});

type FormData = z.infer<typeof FormSchema>;

export default function RashAnalysisForm() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RashAnalysisOutput | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('photo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const toDataUri = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
      })
  }

  async function onSubmit(data: FormData) {
    setLoading(true);
    setResult(null);
    try {
      const photoDataUri = await toDataUri(data.photo);
      const response = await analyzeRash({
        photoDataUri,
        description: data.description,
      });
      setResult(response);
    } catch (error) {
      console.error('Error analyzing rash:', error);
      setResult({
          severity: 'high',
          assessment: 'Error',
          recommendation: 'Sorry, something went wrong. Please try again or consult a doctor directly.'
      });
    } finally {
      setLoading(false);
    }
  }
  
  const SeverityBadge = ({ severity }: { severity: 'low' | 'medium' | 'high' }) => {
    const severityMap = {
      low: {
        label: t('form_ai_severity_low'),
        icon: CheckCircle,
        className: 'bg-green-100 text-green-800 border-green-200',
      },
      medium: {
        label: t('form_ai_severity_medium'),
        icon: AlertCircle,
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      },
      high: {
        label: t('form_ai_severity_high'),
        icon: HeartPulse,
        className: 'bg-red-100 text-red-800 border-red-200',
      },
    };
    const { label, icon: Icon, className } = severityMap[severity];
    return (
      <Badge variant="outline" className={cn("text-base font-semibold gap-2 py-1 px-3", className)}>
        <Icon className="h-4 w-4" />
        {label}
      </Badge>
    );
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_rash_photo_label')}</FormLabel>
                  <FormControl>
                    <div
                      className="w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {preview ? (
                        <Image src={preview} alt="Rash preview" width={150} height={150} className="max-h-full max-w-full object-contain rounded-md" />
                      ) : (
                        <div className="text-center text-muted-foreground">
                            <Upload className="mx-auto h-10 w-10"/>
                            <p>Click to upload an image</p>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_rash_description_label')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('form_rash_description_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('form_analyze_button')}
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
              <CardTitle className="flex items-center gap-4">{t('form_ai_response_title')}
                <SeverityBadge severity={result.severity} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Assessment</h4>
                 <p className="whitespace-pre-wrap">{result.assessment}</p>
              </div>
              <div>
                <h4 className="font-semibold">Recommendation</h4>
                <p className="whitespace-pre-wrap">{result.recommendation}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
