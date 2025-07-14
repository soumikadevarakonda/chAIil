'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/language-context';
import { VaccinationSchedule } from '@/components/tracking/vaccination-schedule';
import { NutritionGuide } from '@/components/tracking/nutrition-guide';
import { useSearchParams } from 'next/navigation';

export default function TrackingPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'vaccination';

  return (
    <div className="flex flex-col gap-8">
       <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('tracking_title')}</h1>
        <p className="text-muted-foreground">{t('tracking_subtitle')}</p>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vaccination">{t('tracking_vaccination_tab')}</TabsTrigger>
          <TabsTrigger value="nutrition">{t('tracking_nutrition_tab')}</TabsTrigger>
        </TabsList>
        <TabsContent value="vaccination">
          <VaccinationSchedule />
        </TabsContent>
        <TabsContent value="nutrition">
          <NutritionGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
}
