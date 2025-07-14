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

export default function AppShell({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

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
                <h1 className="text-lg font-semibold">chAIid</h1>
              </div>
            </div>
            {/* LanguageSwitcher removed from here */}
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
