'use client';

import { DocsSidebar } from './DocsSidebar';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Search, ChevronDown, LayoutDashboard, Key, Shield, Settings, LogOut, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { logout as logoutAction } from '@/lib/store/auth-slice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const { developer } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const getInitials = () => {
    if (developer?.first_name && developer?.last_name) {
      return `${developer.first_name[0]}${developer.last_name[0]}`.toUpperCase();
    }
    return developer?.email?.[0].toUpperCase() || 'U';
  };

  const getDisplayName = () => {
    if (developer?.first_name || developer?.last_name) {
      return `${developer?.first_name || ''} ${developer?.last_name || ''}`.trim();
    }
    return developer?.email?.split('@')[0] || 'User';
  };

  const handleCopyEmail = () => {
    if (developer?.email) {
      navigator.clipboard.writeText(developer.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://sdk-gateway.urisocial.com'}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    dispatch(logoutAction());
    router.push('/login');
  };

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
                {developer ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <div
                          className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full text-white font-bold text-xs md:text-sm"
                          style={{ backgroundColor: '#CD1B78' }}
                        >
                          {getInitials()}
                        </div>
                        <div className="text-left hidden md:block">
                          <div className="text-xs md:text-sm font-semibold text-gray-900">{getDisplayName()}</div>
                          <div className="text-[10px] md:text-xs text-gray-500 truncate max-w-[120px]">{developer.email}</div>
                        </div>
                        <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-500 hidden md:block" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 md:w-64 bg-white border border-gray-200 shadow-xl rounded-xl p-2"
                      sideOffset={8}
                    >
                      <DropdownMenuLabel className="px-3 py-2.5 bg-gray-50 rounded-lg mb-2">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900 text-sm">{getDisplayName()}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 font-normal truncate">{developer.email}</span>
                            <button
                              onClick={handleCopyEmail}
                              className="text-gray-400 hover:text-pink-600 transition-colors flex-shrink-0"
                            >
                              {copied ? (
                                <Check className="w-3 h-3 text-green-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="my-2 bg-gray-200" />
                      <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <Link href="/dashboard" className="flex items-center px-3 py-2 text-gray-700 font-medium text-sm">
                          <LayoutDashboard className="mr-3 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <Link href="/dashboard/keys" className="flex items-center px-3 py-2 text-gray-700 font-medium text-sm">
                          <Key className="mr-3 h-4 w-4" />
                          API Keys
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <Link href="/dashboard/security" className="flex items-center px-3 py-2 text-gray-700 font-medium text-sm">
                          <Shield className="mr-3 h-4 w-4" />
                          Security
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <Link href="/dashboard/settings" className="flex items-center px-3 py-2 text-gray-700 font-medium text-sm">
                          <Settings className="mr-3 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-2 bg-gray-200" />
                      <DropdownMenuItem
                        onClick={logout}
                        className="rounded-lg cursor-pointer hover:bg-red-50 transition-colors text-red-600 font-medium"
                      >
                        <div className="flex items-center px-3 py-2 w-full text-sm">
                          <LogOut className="mr-3 h-4 w-4" />
                          Log out
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Button asChild variant="outline" size="sm" className="hidden md:flex h-9">
                      <a href="/login">Sign In</a>
                    </Button>
                    <Button asChild size="sm" className="text-white shadow-md hover:shadow-lg transition-all h-9 text-xs md:text-sm px-3 md:px-4" style={{ backgroundColor: '#CD1B78' }}>
                      <a href="/signup">Get Started</a>
                    </Button>
                  </>
                )}
              </div>
            </header>
            <main className="flex-1 p-6 md:p-8 lg:p-12">
              <div className="mx-auto max-w-5xl">
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
