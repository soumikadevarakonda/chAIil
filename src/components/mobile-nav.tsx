'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ClipboardList, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const routes = [
    {
      href: '/',
      label: t('nav.dashboard'),
      icon: LayoutDashboard,
      active: pathname === '/',
    },
    {
      href: '/tracking',
      label: t('nav.tracking'),
      icon: ClipboardList,
      active: pathname === '/tracking',
    },
    {
      href: '/guidance',
      label: t('nav.guidance'),
      icon: Sparkles,
      active: pathname === '/guidance',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 hover:bg-muted font-medium',
              route.active ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <route.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{route.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
