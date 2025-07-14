'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/language-context';
import BabyCareForm from '@/components/guidance/baby-care-form';
import FeedingAdviceForm from '@/components/guidance/feeding-advice-form';
import SummarizeAdviceForm from '@/components/guidance/summarize-advice-form';

export default function GuidancePage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('guidance_title')}</h1>
        <p className="text-muted-foreground">{t('guidance_subtitle')}</p>
      </div>

      <Accordion type="single" collapsible className="w-full" defaultValue="care">
        <AccordionItem value="care">
          <AccordionTrigger className="text-lg font-semibold font-headline text-left">{t('guidance_care_title')}</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground mb-4">{t('guidance_care_description')}</p>
            <BabyCareForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="feeding">
          <AccordionTrigger className="text-lg font-semibold font-headline text-left">{t('guidance_feeding_title')}</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground mb-4">{t('guidance_feeding_description')}</p>
            <FeedingAdviceForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="summary">
          <AccordionTrigger className="text-lg font-semibold font-headline text-left">{t('guidance_summary_title')}</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground mb-4">{t('guidance_summary_description')}</p>
            <SummarizeAdviceForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
