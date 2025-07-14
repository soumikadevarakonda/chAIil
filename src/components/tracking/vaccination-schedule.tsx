
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Vaccine, vaccineSchedule } from '@/lib/data';
import useLocalStorage from '@/hooks/use-local-storage';
import { useLanguage } from '@/contexts/language-context';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';

type VaccineState = {
  [key: string]: {
    completed: boolean;
    date?: string;
  };
};

export function VaccinationSchedule() {
  const { t } = useLanguage();
  const [vaccineState, setVaccineState] = useLocalStorage<VaccineState>('chaiid-vaccine-status', {});

  const handleCheckedChange = (id: string, checked: boolean) => {
    setVaccineState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        completed: checked,
        date: checked && !prev[id]?.date ? new Date().toISOString() : (checked ? prev[id]?.date : undefined),
      },
    }));
  };

  const handleDateChange = (id: string, date?: Date) => {
    setVaccineState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        date: date?.toISOString(),
      },
    }));
  };

  const groupedVaccines = vaccineSchedule.reduce((acc, vaccine) => {
    (acc[vaccine.age] = acc[vaccine.age] || []).push(vaccine);
    return acc;
  }, {} as Record<string, Vaccine[]>);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {Object.entries(groupedVaccines).map(([age, vaccines]) => (
            <div key={age}>
              <h3 className="text-lg font-semibold mb-2 font-headline">{age}</h3>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px] sm:w-[100px]">{t('vaccine_status_title')}</TableHead>
                      <TableHead>{t('vaccine_name_title')}</TableHead>
                      <TableHead className="text-right hidden sm:table-cell">{t('milestone_date_placeholder')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vaccines.map((vaccine) => {
                      const state = vaccineState[vaccine.id] || { completed: false };
                      return (
                        <TableRow key={vaccine.id} data-state={state.completed ? 'selected' : ''}>
                          <TableCell>
                            <Checkbox
                              id={vaccine.id}
                              checked={state.completed}
                              onCheckedChange={(checked) => handleCheckedChange(vaccine.id, !!checked)}
                              aria-label={`Mark ${vaccine.name} as done`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <label htmlFor={vaccine.id} className="cursor-pointer flex flex-col">
                              {vaccine.name}
                               <div className="sm:hidden mt-2">
                                {state.completed && (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                size="sm"
                                                className={cn("w-full max-w-[200px] justify-start text-left font-normal", !state.date && "text-muted-foreground")}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {state.date ? format(new Date(state.date), "PPP") : <span>{t('milestone_date_placeholder')}</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={state.date ? new Date(state.date) : undefined}
                                                onSelect={(date) => handleDateChange(vaccine.id, date)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                               </div>
                            </label>
                          </TableCell>
                          <TableCell className="text-right hidden sm:table-cell">
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
                                            onSelect={(date) => handleDateChange(vaccine.id, date)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
