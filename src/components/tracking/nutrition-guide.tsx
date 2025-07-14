'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/language-context';
import { Check } from 'lucide-react';

export function NutritionGuide() {
    const { t } = useLanguage();
    
    const guides = [
        {
            id: '0-6',
            title: t('nutrition_0_6_months_title'),
            content: t('nutrition_0_6_months_content'),
            foods: [
                t('nutrition_0_6_food1'),
                t('nutrition_0_6_food2'),
            ]
        },
        {
            id: '6-8',
            title: t('nutrition_6_8_months_title'),
            content: t('nutrition_6_8_months_content'),
            foods: [
                t('nutrition_6_8_food1'),
                t('nutrition_6_8_food2'),
                t('nutrition_6_8_food3'),
            ]
        },
        {
            id: '9-12',
            title: t('nutrition_9_12_months_title'),
            content: t('nutrition_9_12_months_content'),
            foods: [
                t('nutrition_9_12_food1'),
                t('nutrition_9_12_food2'),
                t('nutrition_9_12_food3'),
            ]
        },
        {
            id: '12-24',
            title: t('nutrition_12_24_months_title'),
            content: t('nutrition_12_24_months_content'),
            foods: [
                t('nutrition_12_24_food1'),
                t('nutrition_12_24_food2'),
                t('nutrition_12_24_food3'),
            ]
        }
    ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('nutrition_guide_title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="6-8">
            {guides.map(guide => (
                <AccordionItem value={guide.id} key={guide.id}>
                    <AccordionTrigger className="font-headline text-left">{guide.title}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                        <p>{guide.content}</p>
                        <h4 className="font-semibold text-foreground">{t('nutrition_foods_to_introduce')}</h4>
                         <ul className="space-y-2">
                            {guide.foods.map((food, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <span>{food}</span>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
