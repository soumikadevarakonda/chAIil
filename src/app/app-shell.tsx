'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Logo } from '@/components/logo';
import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { useRouter } from 'next/navigation';
import { LanguageSwitcher } from '@/components/language-switcher';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you would clear the user session here.
    router.push('/');
  };


  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="hidden md:flex md:flex-col">
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset>
           <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
        </SidebarInset>

        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background md:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <div className="hidden md:block">
                <Logo showTagline />
              </div>
              <div className="md:hidden">
                <Logo />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher className="w-auto" />
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label={t('auth_log_out_button')}>
                  <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
      {isMobile && <MobileNav />}
    </SidebarProvider>
  );
}
