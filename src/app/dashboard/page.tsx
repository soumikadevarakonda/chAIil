// src/app/dashboard/page.tsx
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Syringe, UtensilsCrossed, Lightbulb, Hospital } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('dashboard_welcome_title')}</h1>
        <p className="text-muted-foreground">{t('dashboard_welcome_subtitle')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard_vaccine_title')}</CardTitle>
            <Syringe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 {t('dashboard_vaccine_pending')}</div>
            <p className="text-xs text-muted-foreground">{t('dashboard_vaccine_due')}</p>
            <Button asChild size="sm" className="mt-4">
              <Link href="/vaccines">{t('dashboard_vaccine_button')}</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard_nutrition_title')}</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6-9 {t('dashboard_nutrition_months')}</div>
            <p className="text-xs text-muted-foreground">{t('dashboard_nutrition_guidelines')}</p>
             <Button asChild size="sm" className="mt-4">
              <Link href="/nutrition">{t('dashboard_nutrition_button')}</Link>
            </Button>
          </CardContent>
        </Card>
         <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('nav.hospitals')}</CardTitle>
            <Hospital className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription>{t('dashboard_hospitals_description')}</CardDescription>
             <Button asChild size="sm" className="mt-4">
              <Link href="/hospitals">{t('dashboard_hospitals_button')}</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-secondary hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard_tip_title')}</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <CardDescription>{t('dashboard_tip_content')}</CardDescription>
             <Button asChild variant="link" size="sm" className="p-0 h-auto mt-2">
                <Link href="/guidance">{t('dashboard_tip_button')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
            <CardTitle>{t('dashboard_ai_title')}</CardTitle>
            <CardDescription>{t('dashboard_ai_description')}</CardDescription>
        </CardHeader>
        <CardContent>
            <Button asChild>
                <Link href="/guidance">{t('dashboard_ai_button')}</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
