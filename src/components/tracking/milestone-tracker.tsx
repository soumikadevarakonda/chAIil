// src/components/tracking/milestone-tracker.tsx
'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Check, PartyPopper } from 'lucide-react';
import { format } from 'date-fns';
import { milestones, Milestone } from '@/lib/data';
import useLocalStorage from '@/hooks/use-local-storage';
import { useLanguage } from '@/contexts/language-context';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { cn } from '@/lib/utils';

type MilestoneState = {
  [key: string]: {
    completed: boolean;
    date?: string;
  };
};

export function MilestoneTracker() {
  const { t } = useLanguage();
  const [milestoneState, setMilestoneState] = useLocalStorage<MilestoneState>('chaiid-milestones', {});

  const handleCheckedChange = (id: string, checked: boolean) => {
    setMilestoneState({
      ...milestoneState,
      [id]: {
        ...milestoneState[id],
        completed: checked,
        date: checked ? new Date().toISOString() : undefined,
      },
    });
  };

  const handleDateChange = (id: string, date?: Date) => {
    setMilestoneState({
      ...milestoneState,
      [id]: {
        ...milestoneState[id],
        date: date?.toISOString(),
      },
    });
  };
  
  const groupedMilestones = milestones(t).reduce((acc, milestone) => {
    (acc[milestone.category] = acc[milestone.category] || []).push(milestone);
    return acc;
  }, {} as Record<string, Milestone[]>);


  return (
    <Card>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible defaultValue={Object.keys(groupedMilestones)[0]}>
            {Object.entries(groupedMilestones).map(([category, items]) => (
                <AccordionItem value={category} key={category}>
                    <AccordionTrigger className="font-headline text-left">{category}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                        <ul className="space-y-4">
                        {items.map((milestone) => {
                            const state = milestoneState[milestone.id] || { completed: false };
                            return (
                                <li key={milestone.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg data-[state=checked]:bg-secondary" data-state={state.completed ? 'checked' : 'unchecked'}>
                                    <div className="flex items-center gap-4">
                                        <Checkbox
                                        id={milestone.id}
                                        checked={state.completed}
                                        onCheckedChange={(checked) => handleCheckedChange(milestone.id, !!checked)}
                                        className="h-6 w-6"
                                        />
                                        <label htmlFor={milestone.id} className="font-medium text-foreground cursor-pointer">
                                            {milestone.title}
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 sm:mt-0 pl-10 sm:pl-0">
                                       {state.completed && (
                                         <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    size="sm"
                                                    className={cn("w-[200px] justify-start text-left font-normal", !state.date && "text-muted-foreground")}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {state.date ? format(new Date(state.date), "PPP") : <span>{t('milestone_date_placeholder')}</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                mode="single"
                                                selected={state.date ? new Date(state.date) : undefined}
                                                onSelect={(date) => handleDateChange(milestone.id, date)}
                                                initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                       )}
                                    </div>
                                </li>
                            )
                        })}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
