'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ClipboardList, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
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
    <nav className={cn('flex flex-col gap-2 p-2', className)} {...props}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            route.active && 'bg-secondary text-primary font-semibold'
          )}
        >
          <route.icon className="h-4 w-4" />
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
