// src/app/page.tsx (new auth page)
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from '@/components/auth/sign-in-form';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { useLanguage } from '@/contexts/language-context';
import { Logo } from '@/components/logo';

export default function AuthPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-muted/40">
        <div className="mb-8">
            <Logo />
        </div>
      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">{t('auth_sign_in_tab')}</TabsTrigger>
          <TabsTrigger value="sign-up">{t('auth_sign_up_tab')}</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <Card>
            <CardHeader>
              <CardTitle>{t('auth_sign_in_title')}</CardTitle>
              <CardDescription>{t('auth_sign_in_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sign-up">
          <Card>
            <CardHeader>
              <CardTitle>{t('auth_sign_up_title')}</CardTitle>
              <CardDescription>{t('auth_sign_up_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <SignUpForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
