// src/app/milestones/page.tsx
'use client';
import { useLanguage } from '@/contexts/language-context';
import { MilestoneTracker } from '@/components/tracking/milestone-tracker';

export default function MilestonesPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8">
       <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('milestones_title')}</h1>
        <p className="text-muted-foreground">{t('milestones_subtitle')}</p>
      </div>
      <MilestoneTracker />
    </div>
  );
}
