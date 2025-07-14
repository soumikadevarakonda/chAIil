'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { vaccineSchedule, Vaccine } from '@/lib/data';
import useLocalStorage from '@/hooks/use-local-storage';
import { useLanguage } from '@/contexts/language-context';

type CheckedState = {
  [key: string]: boolean;
};

export function VaccinationSchedule() {
  const { t } = useLanguage();
  const [checked, setChecked] = useLocalStorage<CheckedState>('chaiid-vaccine-status', {});

  const handleCheckedChange = (id: string, value: boolean) => {
    setChecked({ ...checked, [id]: value });
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
                    <TableHead className="w-[100px]">{t('vaccine_status_title')}</TableHead>
                    <TableHead>{t('vaccine_name_title')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vaccines.map((vaccine) => (
                    <TableRow key={vaccine.id} data-state={checked[vaccine.id] ? 'selected' : ''}>
                      <TableCell>
                        <Checkbox
                          id={vaccine.id}
                          checked={checked[vaccine.id] || false}
                          onCheckedChange={(value) => handleCheckedChange(vaccine.id, !!value)}
                          aria-label={`Mark ${vaccine.name} as done`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <label htmlFor={vaccine.id} className="cursor-pointer flex flex-col">
                            {vaccine.name}
                            <Badge variant={checked[vaccine.id] ? 'default' : 'secondary'} className="w-fit mt-1">
                            {checked[vaccine.id] ? t('vaccine_status_done') : t('vaccine_status_pending')}
                            </Badge>
                        </label>
                      </TableCell>
                    </TableRow>
                  ))}
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
