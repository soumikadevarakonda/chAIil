// src/app/auth/page.tsx
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

export default function AuthPage() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-center min-h-full py-12">
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
