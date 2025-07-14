// src/components/tracking/reminders.tsx
'use client';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, Syringe, Stethoscope } from 'lucide-react';
import useLocalStorage from '@/hooks/use-local-storage';
import { vaccineSchedule, checkupSchedule, Vaccine, Checkup } from '@/lib/data';
import { addWeeks, addMonths, format, isFuture, differenceInDays } from 'date-fns';
import { useLanguage } from '@/contexts/language-context';

type ProfileData = {
  name: string;
  dob: Date;
};

type Reminder = {
  type: 'Vaccine' | 'Check-up';
  title: string;
  dueDate: Date;
  daysRemaining: number;
};

function parseAge(age: string, dob: Date): Date {
  const [num, unit] = age.split(' ');
  const number = parseInt(num);

  if (unit.toLowerCase().includes('week')) {
    return addWeeks(dob, number);
  }
  if (unit.toLowerCase().includes('month')) {
    const rangeMatch = age.match(/(\d+)-(\d+)\s+Months/);
    if(rangeMatch) {
      // For ranges like "9-12 Months", use the start of the range.
      return addMonths(dob, parseInt(rangeMatch[1]));
    }
    return addMonths(dob, number);
  }
  return dob; // For "At Birth"
}

export function Reminders() {
  const { t } = useLanguage();
  const [profile] = useLocalStorage<ProfileData>('chaiid-baby-profile', {
    name: '',
    dob: new Date(),
  });
  const [checkedVaccines] = useLocalStorage<Record<string, boolean>>('chaiid-vaccine-status', {});

  const upcomingReminders = useMemo((): Reminder[] => {
    if (!profile.dob) return [];
    
    const dob = new Date(profile.dob);

    const upcomingVaccines = vaccineSchedule
      .filter(vaccine => !checkedVaccines[vaccine.id])
      .map(vaccine => ({
        type: 'Vaccine' as const,
        title: vaccine.name,
        dueDate: parseAge(vaccine.age, dob),
      }));

    const upcomingCheckups = checkupSchedule
      .map(checkup => ({
        type: 'Check-up' as const,
        title: checkup.name,
        dueDate: parseAge(checkup.age, dob),
      }));
      
    const allReminders = [...upcomingVaccines, ...upcomingCheckups]
        .filter(reminder => isFuture(reminder.dueDate))
        .map(reminder => ({
            ...reminder,
            daysRemaining: differenceInDays(reminder.dueDate, new Date())
        }))
        .filter(reminder => reminder.daysRemaining <= 60) // Show reminders for the next 60 days
        .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

    return allReminders.slice(0, 5); // Return top 5 upcoming reminders
  }, [profile.dob, checkedVaccines]);

  if (upcomingReminders.length === 0) {
    return null;
  }
  
  const getDaysString = (days: number) => {
    if (days === 0) return t('reminder_due_today');
    if (days === 1) return t('reminder_due_tomorrow');
    return t('reminder_due_in_days', { days });
  }

  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="text-primary" />
          {t('reminders_title')}
        </CardTitle>
        <CardDescription>{t('reminders_subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {upcomingReminders.map((reminder, index) => (
            <li key={index} className="flex items-start gap-4 p-3 bg-background rounded-lg">
                <div className="p-2 bg-secondary rounded-full mt-1">
                 {reminder.type === 'Vaccine' ? <Syringe className="h-5 w-5 text-primary" /> : <Stethoscope className="h-5 w-5 text-primary" />}
                </div>
              <div className="flex-1">
                <p className="font-semibold">{reminder.title}</p>
                <p className="text-sm text-muted-foreground">
                  {t('reminder_due_on')} {format(reminder.dueDate, 'PPP')} 
                  <span className="font-semibold text-primary"> ({getDaysString(reminder.daysRemaining)})</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
