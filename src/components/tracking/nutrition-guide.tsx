'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/language-context';

export function NutritionGuide() {
    const { t } = useLanguage();
    
    const guides = [
        {
            id: '6-8',
            title: t('nutrition_6_8_months_title'),
            content: t('nutrition_6_8_months_content')
        },
        {
            id: '9-12',
            title: t('nutrition_9_12_months_title'),
            content: t('nutrition_9_12_months_content')
        },
        {
            id: '12-24',
            title: t('nutrition_12_24_months_title'),
            content: t('nutrition_12_24_months_content')
        }
    ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('nutrition_title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="6-8">
            {guides.map(guide => (
                <AccordionItem value={guide.id} key={guide.id}>
                    <AccordionTrigger className="font-headline text-left">{guide.title}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        {guide.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
