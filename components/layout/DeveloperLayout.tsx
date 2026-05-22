'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DeveloperNavbar } from './DeveloperNavbar';
import { AppSidebar } from './AppSidebar';
import { useAuth } from '@/lib/auth-context';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

export function DeveloperLayout({ children }: { children: React.ReactNode }) {
  const { developer, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !developer) {
      router.push('/login');
    }
  }, [developer, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!developer) {
    return null; // Will redirect in useEffect
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2 flex-1">
              <span className="font-semibold text-gray-900">Dashboard</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {/* Additional header actions can go here */}
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
