// src/app/dashboard/page.tsx
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Syringe, UtensilsCrossed, Lightbulb, Hospital, Baby, Star } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { Reminders } from "@/components/tracking/reminders";
import Image from "next/image";

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('dashboard_welcome_title')}</h1>
        <p className="text-muted-foreground">{t('dashboard_welcome_subtitle')}</p>
      </div>
      
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 space-y-4">
                <h2 className="text-2xl font-bold font-headline">{t('dashboard_hero_title')}</h2>
                <p className="text-muted-foreground">{t('dashboard_hero_subtitle')}</p>
                <Button asChild>
                    <Link href="/milestones">{t('dashboard_milestones_button')}</Link>
                </Button>
            </div>
            <div className="h-full hidden md:block bg-secondary/50 relative">
                 <div className="absolute inset-0 h-full w-full opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      className="h-full w-full"
                    >
                      <defs>
                        <pattern
                          id="pattern-hero"
                          x="0"
                          y="0"
                          width="80"
                          height="80"
                          patternUnits="userSpaceOnUse"
                          patternContentUnits="userSpaceOnUse"
                        >
                          <g fill="hsl(var(--primary) / 0.1)">
                            {/* Pacifier */}
                            <path d="M40 20 a 10 10 0 1 0 0.001 0 M40 30 a 5 5 0 1 0 0.001 0 M30 30 h-5 a 5 5 0 0 0 -5 5 v 5 h 20 v-5 a 5 5 0 0 0 -5 -5 h -5" />
                            {/* Bottle */}
                            <path d="M10 60 h 10 v -15 a 5 5 0 0 1 5 -5 h 0 a 5 5 0 0 1 5 5 v 15 h-20 v -5 h 5" transform="translate(50, -20) rotate(15) scale(0.8)" />
                            {/* Teddy */}
                            <path d="M60 60 a 5 5 0 1 0 0.001 0 M70 60 a 5 5 0 1 0 0.001 0 M65 70 a 10 10 0 1 0 0.001 0" transform="translate(-10, 0)" />
                          </g>
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill="url(#pattern-hero)"
                      ></rect>
                    </svg>
                  </div>
            </div>
        </div>
      </Card>

      <Reminders />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow duration-300">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('nav.profile')}</CardTitle>
            <Baby className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription>{t('dashboard_profile_description')}</CardDescription>
             <Button asChild size="sm" className="mt-4">
              <Link href="/profile">{t('dashboard_profile_button')}</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-300">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('nav.milestones')}</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription>{t('dashboard_milestones_description')}</CardDescription>
             <Button asChild size="sm" className="mt-4">
              <Link href="/milestones">{t('dashboard_milestones_button')}</Link>
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
        <Card className="bg-secondary hover:shadow-lg transition-shadow duration-300 lg:col-span-3 xl:col-span-4">
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

       <div className="grid gap-4 md:grid-cols-2">
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
