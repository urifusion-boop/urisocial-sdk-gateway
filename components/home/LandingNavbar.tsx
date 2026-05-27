'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, BookOpen, Code, Zap, Package, FileCode, User, Settings, LogOut, Copy, Check, ChevronDown, LayoutDashboard, Shield, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { logout as logoutAction } from '@/lib/store/auth-slice';
import { useRouter } from 'next/navigation';

export function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { developer } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const isLoading = false; // Auth is managed globally now

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainLinks = [
    { href: '/docs', label: 'Docs', icon: BookOpen },
    { href: '/api', label: 'API', icon: Code },
    { href: '/playground', label: 'Playground', icon: Zap },
    { href: '/widgets', label: 'Widgets', icon: Package },
    { href: '/examples', label: 'Examples', icon: FileCode },
  ];

  const handleCopyEmail = () => {
    if (developer?.email) {
      navigator.clipboard.writeText(developer.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getInitials = () => {
    if (developer?.first_name && developer?.last_name) {
      return `${developer.first_name[0]}${developer.last_name[0]}`.toUpperCase();
    }
    return developer?.email?.[0]?.toUpperCase() || 'U';
  };

  const getDisplayName = () => {
    if (developer?.first_name && developer?.last_name) {
      return `${developer.first_name} ${developer.last_name}`;
    }
    return developer?.email?.split('@')[0] || 'User';
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200'
          : 'bg-white/75 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/urilogo-nobg.png"
              alt="URI Social SDK"
              width={40}
              height={40}
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  pathname?.startsWith(href)
                    ? 'bg-pink-50 text-pink-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-pink-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {!isLoading && developer ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div
                      className="flex items-center justify-center w-9 h-9 rounded-full text-white font-bold text-sm"
                      style={{ backgroundColor: '#CD1B78' }}
                    >
                      {getInitials()}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-gray-900">{getDisplayName()}</div>
                      <div className="text-xs text-gray-500">{developer.email}</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 bg-white border border-gray-200 shadow-xl rounded-xl p-2"
                  sideOffset={8}
                >
                  <DropdownMenuLabel className="px-3 py-2.5 bg-gray-50 rounded-lg mb-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{getDisplayName()}</span>
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
                    <Link href="/dashboard" className="flex items-center px-3 py-2 text-gray-700 font-medium">
                      <LayoutDashboard className="mr-3 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <Link href="/dashboard/keys" className="flex items-center px-3 py-2 text-gray-700 font-medium">
                      <Key className="mr-3 h-4 w-4" />
                      API Keys
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <Link href="/dashboard/security" className="flex items-center px-3 py-2 text-gray-700 font-medium">
                      <Shield className="mr-3 h-4 w-4" />
                      Security
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <Link href="/dashboard/settings" className="flex items-center px-3 py-2 text-gray-700 font-medium">
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2 bg-gray-200" />
                  <DropdownMenuItem
                    onClick={logout}
                    className="rounded-lg cursor-pointer hover:bg-red-50 transition-colors text-red-600 font-medium"
                  >
                    <div className="flex items-center px-3 py-2 w-full">
                      <LogOut className="mr-3 h-4 w-4" />
                      Log out
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-gray-700 hover:text-pink-700 transition-colors px-3 py-2"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="px-4 py-2.5 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity shadow-sm"
                  style={{ backgroundColor: '#CD1B78', color: 'white' }}
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            style={{ color: 'black' }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-gray-200 bg-white/95">
                {/* Navigation Links */}
                {mainLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors rounded-lg mx-2 ${
                      pathname?.startsWith(href)
                        ? 'bg-pink-50 text-pink-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-pink-700'
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                ))}

                {/* Auth Buttons / Profile */}
                <div className="pt-3 mt-3 border-t border-gray-100 px-2">
                  {!isLoading && developer ? (
                    <div className="space-y-2">
                      {/* User Info */}
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm"
                          style={{ backgroundColor: '#CD1B78' }}
                        >
                          {getInitials()}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">{getDisplayName()}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{developer.email}</span>
                            <button
                              onClick={handleCopyEmail}
                              className="text-gray-400 hover:text-pink-600 transition-colors"
                            >
                              {copied ? (
                                <Check className="w-3 h-3 text-green-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Quick Links */}
                      <Link
                        href="/dashboard"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/keys"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
                      >
                        <Key size={18} />
                        API Keys
                      </Link>
                      <Link
                        href="/dashboard/security"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
                      >
                        <Shield size={18} />
                        Security
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
                      >
                        <Settings size={18} />
                        Settings
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors rounded-lg"
                      >
                        <LogOut size={18} />
                        Log out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/login"
                        className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity shadow-sm"
                        style={{ backgroundColor: '#CD1B78', color: 'white' }}
                        onClick={() => setOpen(false)}
                      >
                        Get Started Free
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
