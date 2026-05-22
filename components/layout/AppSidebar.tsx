'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Code,
  Blocks,
  Layers,
  Settings,
  Key,
  BarChart3,
  Sparkles,
  FileText,
  Home,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: 'Dashboard',
    items: [
      { title: 'Overview', href: '/dashboard', icon: Home },
    ],
  },
  {
    title: 'Developer Tools',
    items: [
      { title: 'Documentation', href: '/dashboard/docs', icon: BookOpen },
      { title: 'API Reference', href: '/dashboard/api', icon: Code },
      { title: 'Playground', href: '/dashboard/playground', icon: Blocks },
      { title: 'Widgets', href: '/dashboard/widgets', icon: Layers },
      { title: 'Examples', href: '/dashboard/examples', icon: FileText },
      { title: 'Changelog', href: '/dashboard/changelog', icon: Sparkles },
    ],
  },
  {
    title: 'Account & Settings',
    items: [
      { title: 'API Keys', href: '/dashboard/keys', icon: Key },
      { title: 'Usage & Billing', href: '/dashboard/usage', icon: BarChart3 },
      { title: 'Team', href: '/dashboard/team', icon: Users },
      { title: 'Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-200 bg-white h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
      <nav className="p-4 space-y-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 px-3">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href + '/'));
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-pink-50 text-pink-700'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      )}
                    >
                      <Icon className={cn('w-4 h-4', isActive ? 'text-pink-600' : 'text-gray-500')} />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-pink-100 text-pink-700 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
