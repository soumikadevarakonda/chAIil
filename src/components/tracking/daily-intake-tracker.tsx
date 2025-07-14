'use client'
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Milk, Utensils, Droplets } from 'lucide-react';
import useLocalStorage from '@/hooks/use-local-storage';
import { useLanguage } from '@/contexts/language-context';

type DailyIntake = {
    milk: number;
    solid: number;
    water: number;
}

const GOALS = {
    milk: 750, // ml
    solid: 3, // servings
    water: 200 // ml
}

export default function DailyIntakeTracker() {
    const { t } = useLanguage();
    const [intake, setIntake] = useLocalStorage<DailyIntake>('chaiid-daily-intake', {
        milk: 0,
        solid: 0,
        water: 0
    });

    const handleIntake = (type: keyof DailyIntake, amount: number) => {
        setIntake(prev => ({...prev, [type]: Math.max(0, prev[type] + amount)}));
    }

    const resetIntake = () => {
        setIntake({ milk: 0, solid: 0, water: 0 });
    }

    const milkProgress = (intake.milk / GOALS.milk) * 100;
    const solidProgress = (intake.solid / GOALS.solid) * 100;
    const waterProgress = (intake.water / GOALS.water) * 100;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('nutrition_daily_intake_title')}</CardTitle>
                <CardDescription>{t('nutrition_daily_intake_subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {/* Milk */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="font-medium flex items-center gap-2"><Milk /> {t('nutrition_milk_label')}</span>
                            <span>{intake.milk} / {GOALS.milk} ml</span>
                        </div>
                        <Progress value={milkProgress} />
                        <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="outline" onClick={() => handleIntake('milk', -50)}>-50ml</Button>
                            <Button size="sm" onClick={() => handleIntake('milk', 50)}>+50ml</Button>
                        </div>
                    </div>

                    {/* Solid Food */}
                     <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="font-medium flex items-center gap-2"><Utensils /> {t('nutrition_solid_food_label')}</span>
                            <span>{intake.solid} / {GOALS.solid} {t('nutrition_servings_label')}</span>
                        </div>
                        <Progress value={solidProgress} />
                        <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="outline" onClick={() => handleIntake('solid', -1)}>-1</Button>
                            <Button size="sm" onClick={() => handleIntake('solid', 1)}>+1</Button>
                        </div>
                    </div>

                    {/* Water */}
                     <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="font-medium flex items-center gap-2"><Droplets /> {t('nutrition_water_label')}</span>
                            <span>{intake.water} / {GOALS.water} ml</span>
                        </div>
                        <Progress value={waterProgress} />
                        <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="outline" onClick={() => handleIntake('water', -25)}>-25ml</Button>
                            <Button size="sm" onClick={() => handleIntake('water', 25)}>+25ml</Button>
                        </div>
                    </div>
                </div>

                <Button variant="secondary" onClick={resetIntake} className="w-full">{t('nutrition_reset_button')}</Button>
            </CardContent>
        </Card>
    )
}
