// src/components/profile/profile-form.tsx
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/contexts/language-context';
import useLocalStorage from '@/hooks/use-local-storage';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon, Edit, FileText } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { format, subMonths, differenceInMonths, differenceInYears } from 'date-fns';

const FormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  weight: z.coerce.number().positive('Weight must be a positive number.').optional(),
  height: z.coerce.number().positive('Height must be a positive number.').optional(),
  bloodType: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

export function ProfileForm() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useLocalStorage<FormData>('chaiid-baby-profile', {
    name: 'Aarav',
    dob: subMonths(new Date(), 6), // Set default DOB to 6 months ago
    weight: 7.5,
    height: 68,
    bloodType: 'O+',
  });

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    values: profile, // Use `values` to ensure the form is controlled and updates with localStorage changes
  });

  function onSubmit(data: FormData) {
    setProfile(data);
    setIsEditing(false);
    toast({
      title: t('profile_saved_title'),
      description: t('profile_saved_description'),
    });
  }

  const getAge = (dob: Date) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const years = differenceInYears(today, birthDate);
    const months = differenceInMonths(today, birthDate) % 12;
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}, ${months} month${months > 1 ? 's' : ''} old`;
    }
    return `${months} month${months !== 1 ? 's' : ''} old`;
  }

  if (!isEditing) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>{getAge(profile.dob)}</CardDescription>
            </div>
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            {t('profile_edit_button')}
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-4 rounded-lg border p-4">
                <div className="bg-secondary p-3 rounded-md mt-1">
                    <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">{t('profile_weight_label')}</h3>
                    <p className="text-muted-foreground">{profile.weight ? `${profile.weight} kg` : 'N/A'}</p>
                </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border p-4">
                <div className="bg-secondary p-3 rounded-md mt-1">
                    <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">{t('profile_height_label')}</h3>
                    <p className="text-muted-foreground">{profile.height ? `${profile.height} cm` : 'N/A'}</p>
                </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border p-4">
                <div className="bg-secondary p-3 rounded-md mt-1">
                    <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">{t('profile_dob_label')}</h3>
                    <p className="text-muted-foreground">{format(new Date(profile.dob), "PPP")}</p>
                </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border p-4">
                <div className="bg-secondary p-3 rounded-md mt-1">
                    <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">{t('profile_blood_type_label')}</h3>
                    <p className="text-muted-foreground">{profile.bloodType || 'N/A'}</p>
                </div>
            </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile_title')}</CardTitle>
        <CardDescription>{t('profile_subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile_name_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('profile_name_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('profile_dob_label')}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>{t('profile_dob_placeholder')}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile_weight_label')}</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" placeholder={t('profile_weight_placeholder')} {...field} value={field.value ?? ''}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile_height_label')}</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" placeholder={t('profile_height_placeholder')} {...field} value={field.value ?? ''}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile_blood_type_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('profile_blood_type_placeholder')} {...field} value={field.value ?? ''}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
                <Button type="submit">{t('profile_save_button')}</Button>
                <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
