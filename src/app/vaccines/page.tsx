'use client';
import { useLanguage } from '@/contexts/language-context';
import { VaccinationSchedule } from '@/components/tracking/vaccination-schedule';

export default function VaccinesPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8">
       <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('vaccines_title')}</h1>
        <p className="text-muted-foreground">{t('vaccines_subtitle')}</p>
      </div>
      <VaccinationSchedule />
    </div>
  );
}
