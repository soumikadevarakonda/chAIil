'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Syringe, UtensilsCrossed, Hospital, Sparkles, Baby, Star, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you would clear the user session here.
    router.push('/');
  };

  const routes = [
    {
      href: '/dashboard',
      label: t('nav.dashboard'),
      icon: LayoutDashboard,
      active: pathname === '/dashboard',
    },
    {
      href: '/profile',
      label: t('nav.profile'),
      icon: Baby,
      active: pathname === '/profile',
    },
    {
      href: '/milestones',
      label: t('nav.milestones'),
      icon: Star,
      active: pathname === '/milestones',
    },
    {
      href: '/vaccines',
      label: t('nav.vaccines'),
      icon: Syringe,
      active: pathname === '/vaccines',
    },
    {
      href: '/nutrition',
      label: t('nav.nutrition'),
      icon: UtensilsCrossed,
      active: pathname === '/nutrition',
    },
    {
      href: '/hospitals',
      label: t('nav.hospitals'),
      icon: Hospital,
      active: pathname === '/hospitals',
    },
    {
      href: '/guidance',
      label: t('nav.guidance'),
      icon: Sparkles,
      active: pathname === '/guidance',
    },
  ];

  return (
    <nav className={cn('flex flex-col justify-between h-full p-2', className)} {...props}>
      <div className='flex flex-col gap-2'>
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
      </div>
      <div>
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-3 h-4 w-4" />
          {t('auth_log_out_button')}
        </Button>
      </div>
    </nav>
  );
}
