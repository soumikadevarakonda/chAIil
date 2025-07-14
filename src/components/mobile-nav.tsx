'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Syringe, UtensilsCrossed, Sparkles, Hospital, Baby, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const mainRoutes = [
    {
      href: '/dashboard',
      label: t('nav.dashboard'),
      icon: LayoutDashboard,
      active: pathname === '/dashboard',
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
      href: '/guidance',
      label: t('nav.guidance'),
      icon: Sparkles,
      active: pathname === '/guidance',
    },
    {
      href: '/profile',
      label: t('nav.profile'),
      icon: Baby,
      active: pathname === '/profile',
    },
  ];

  // Adjusting routes based on active path to ensure 5 items
  let routes = mainRoutes;
  const activeRoute = routes.find(r => r.active);

  const otherRoutes = [
      { href: '/nutrition', label: t('nav.nutrition'), icon: UtensilsCrossed, active: pathname === '/nutrition'},
      { href: '/hospitals', label: t('nav.hospitals'), icon: Hospital, active: pathname === '/hospitals'}
  ];
  
  // If the active route is not in the main set, replace the last item
  if (!activeRoute) {
      const activeOtherRoute = otherRoutes.find(r => r.active);
      if(activeOtherRoute) {
        routes = [mainRoutes[0], mainRoutes[1], mainRoutes[2], mainRoutes[3], activeOtherRoute]
      }
  }


  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'inline-flex flex-col items-center justify-center px-2 hover:bg-muted font-medium text-center',
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
