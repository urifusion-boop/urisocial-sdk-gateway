'use client';

import { DocsSidebar } from './DocsSidebar';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <DocsSidebar />
          <SidebarInset>
            <header className="sticky top-0 z-10 flex h-14 md:h-16 shrink-0 items-center gap-2 md:gap-4 border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 md:px-6 shadow-sm">
              <SidebarTrigger className="-ml-1 hover:bg-gray-100 rounded-lg transition-colors" />
              <Separator orientation="vertical" className="h-4 md:h-6" />
              <div className="flex items-center gap-2 md:gap-4 flex-1">
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search docs..."
                    className="pl-8 md:pl-10 h-9 md:h-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-pink-300 transition-all text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Button asChild variant="outline" size="sm" className="hidden md:flex h-9">
                  <a href="/login">Sign In</a>
                </Button>
                <Button asChild size="sm" className="text-white shadow-md hover:shadow-lg transition-all h-9 text-xs md:text-sm px-3 md:px-4" style={{ backgroundColor: '#CD1B78' }}>
                  <a href="/signup">Get Started</a>
                </Button>
              </div>
            </header>
            <main className="flex-1 p-6 md:p-8">
              <div className="mx-auto max-w-4xl">
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
