// src/app/profile/page.tsx
'use client';
import { useLanguage } from '@/contexts/language-context';
import { ProfileForm } from '@/components/profile/profile-form';

export default function ProfilePage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('profile_title')}</h1>
        <p className="text-muted-foreground">{t('profile_subtitle')}</p>
      </div>
      <ProfileForm />
    </div>
  );
}
