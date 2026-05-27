'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DeveloperNavbar } from './DeveloperNavbar';
import { AppSidebar } from './AppSidebar';
import { useAppSelector } from '@/lib/store/hooks';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function DeveloperLayout({ children }: { children: React.ReactNode }) {
  const { developer } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!developer) {
      router.push('/login');
    }
  }, [developer, router]);

  if (!developer) {
    return null; // Will redirect in useEffect
  }

  // Get page title based on pathname
  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Overview';
    if (pathname?.startsWith('/dashboard/playground')) return 'Playground';
    if (pathname?.startsWith('/dashboard/widgets')) return 'Widgets';
    if (pathname?.startsWith('/dashboard/keys')) return 'API Keys';
    if (pathname?.startsWith('/dashboard/usage')) return 'Usage & Billing';
    if (pathname?.startsWith('/dashboard/team')) return 'Team';
    if (pathname?.startsWith('/dashboard/security')) return 'Security';
    if (pathname?.startsWith('/dashboard/settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-gray-50">
          <AppSidebar />
          <SidebarInset className="bg-gray-50">
            <header className="sticky top-0 z-10 flex h-12 md:h-14 shrink-0 items-center gap-2 border-b border-gray-200 bg-white/80 backdrop-blur-md px-3 md:px-4 shadow-sm">
              <SidebarTrigger className="-ml-1 hover:bg-gray-100 rounded-lg transition-colors size-8" />
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <h1 className="text-sm md:text-base font-bold text-gray-900 truncate">{getPageTitle()}</h1>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                <div className="relative hidden lg:block">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 h-8 w-48 xl:w-56 bg-gray-50 border-gray-200 focus:bg-white focus:border-pink-300 transition-all text-xs"
                  />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100 transition-colors relative">
                  <Bell className="h-4 w-4 text-gray-600" />
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-pink-600 rounded-full"></span>
                </Button>
              </div>
            </header>
            <main className="flex-1 p-3 md:p-4 lg:p-6 w-full">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
