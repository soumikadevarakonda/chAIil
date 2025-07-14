'use client';
import { useLanguage } from '@/contexts/language-context';
import { NutritionGuide } from '@/components/tracking/nutrition-guide';
import DailyIntakeTracker from '@/components/tracking/daily-intake-tracker';

export default function NutritionPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8">
       <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('nutrition_title')}</h1>
        <p className="text-muted-foreground">{t('nutrition_subtitle')}</p>
      </div>
      <DailyIntakeTracker />
      <NutritionGuide />
    </div>
  );
}
