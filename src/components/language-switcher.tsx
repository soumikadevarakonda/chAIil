'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/language-context';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage();

  const languageNames = {
    en: 'English',
    hi: 'हिंदी',
    te: 'తెలుగు'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-start", className)}>
          <Languages className="mr-2 h-4 w-4" />
          <span>{languageNames[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-full">
        <DropdownMenuItem onClick={() => setLanguage('en')} disabled={language === 'en'}>
          {t('english')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi')} disabled={language === 'hi'}>
          {t('hindi')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('te')} disabled={language === 'te'}>
          {t('telugu')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
