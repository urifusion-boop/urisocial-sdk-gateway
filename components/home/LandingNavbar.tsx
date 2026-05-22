'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, BookOpen, Code, Zap, Package, FileCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-700 hover:text-pink-700 transition-colors px-3 py-2"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="px-4 py-2.5 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity shadow-sm"
              style={{ backgroundColor: '#CD1B78' }}
            >
              Get Started Free
            </Link>
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

                {/* Auth Buttons */}
                <div className="pt-3 mt-3 border-t border-gray-100 space-y-2 px-2">
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
                    style={{ backgroundColor: '#CD1B78' }}
                    onClick={() => setOpen(false)}
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
