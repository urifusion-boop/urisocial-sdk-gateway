'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Code, Search, User, LogOut, Settings, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/lib/auth-context';

export function DeveloperNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { developer, logout } = useAuth();

  const getInitials = () => {
    if (developer?.first_name && developer?.last_name) {
      return `${developer.first_name[0]}${developer.last_name[0]}`.toUpperCase();
    }
    return developer?.email?.[0]?.toUpperCase() || 'U';
  };

  const mainLinks = [
    { href: '/docs', label: 'Docs' },
    { href: '/api', label: 'API' },
    { href: '/playground', label: 'Playground' },
    { href: '/widgets', label: 'Widgets' },
    { href: '/examples', label: 'Examples' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav h-16">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: '#CD1B78' }}
            >
              <Code className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span
                className="text-base font-light tracking-wide lowercase italic"
                style={{
                  color: '#CD1B78',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  letterSpacing: '0.5px',
                }}
              >
                social
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">SDK</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  pathname?.startsWith(href)
                    ? 'bg-pink-50 text-pink-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: '#CD1B78', color: 'white' }}
                  >
                    {getInitials()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {developer?.first_name && developer?.last_name
                        ? `${developer.first_name} ${developer.last_name}`
                        : 'Developer Account'}
                    </span>
                    <span className="text-xs text-gray-500">{developer?.email || 'developer@example.com'}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/keys" className="flex items-center gap-2 cursor-pointer">
                    <Key className="w-4 h-4" />
                    API Keys
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center gap-2 text-red-600 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              asChild
              className="comic-btn text-sm"
              style={{ backgroundColor: 'hsl(340, 74%, 42%)', color: 'white' }}
            >
              <Link href="https://dashboard.urisocial.com">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 mt-8">
                {mainLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-semibold transition-colors ${
                      pathname?.startsWith(href) ? 'text-pink-700' : 'text-gray-700 hover:text-pink-700'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <div className="pt-6 border-t">
                  <Button
                    asChild
                    className="w-full"
                    style={{ backgroundColor: 'hsl(340, 74%, 42%)', color: 'white' }}
                  >
                    <Link href="https://dashboard.urisocial.com">Get Started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
