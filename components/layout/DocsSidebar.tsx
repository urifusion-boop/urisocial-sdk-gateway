'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Code,
  FileText,
  Sparkles,
  Home,
  Blocks,
  Zap,
  Shield,
  Users,
  Terminal,
  GitBranch,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';

interface NavSubItem {
  title: string;
  href: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  items?: NavSubItem[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/docs',
        icon: Home,
      },
      {
        title: 'Quick Start',
        href: '/docs/quickstart',
        icon: Zap,
      },
      {
        title: 'Installation',
        href: '/docs/installation',
        icon: Terminal,
      },
    ],
  },
  {
    title: 'API Reference',
    items: [
      {
        title: 'API Overview',
        href: '/docs/api',
        icon: BookOpen,
      },
      {
        title: 'Authentication',
        href: '/docs/authentication',
        icon: Shield,
      },
      {
        title: 'Endpoints',
        href: '/docs/endpoints',
        icon: Code,
      },
      {
        title: 'Rate Limits',
        href: '/docs/rate-limiting',
        icon: Blocks,
      },
    ],
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'Code Examples',
        href: '/docs/examples',
        icon: FileText,
      },
      {
        title: 'Changelog',
        href: '/docs/changelog',
        icon: Sparkles,
        badge: 'v2.1',
      },
      {
        title: 'Support',
        href: '/docs/support',
        icon: Users,
      },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="border-r border-gray-200 bg-white">
      <SidebarHeader className="border-b border-gray-100 pb-4 bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
              <Link href="/" className="flex items-center gap-3 px-2">
                <Image
                  src="/images/urilogo-nobg.png"
                  alt="URI Social"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-base font-bold text-gray-900">
                    URI Social
                  </span>
                  <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                    Documentation
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4 bg-white">
        {navigation.map((section, index) => (
          <SidebarGroup key={section.title} className={index > 0 ? 'mt-6' : ''}>
            <SidebarGroupLabel className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className={`
                          relative px-3 py-2.5 rounded-lg transition-all duration-200
                          ${isActive
                            ? 'bg-pink-50 text-[#CD1B78] font-semibold shadow-sm border border-pink-100'
                            : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                          }
                        `}
                      >
                        <Link href={item.href} className="flex items-center gap-3 w-full">
                          <Icon className={`size-4 ${isActive ? 'text-[#CD1B78]' : 'text-gray-500'}`} />
                          <span className="text-sm flex-1">{item.title}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full text-white shadow-sm" style={{ backgroundColor: '#CD1B78' }}>
                              {item.badge}
                            </span>
                          )}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full" style={{ backgroundColor: '#CD1B78' }} />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 p-4 bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-auto p-0 hover:bg-transparent">
              <Link
                href="/signup"
                className="w-full px-4 py-3 rounded-xl font-semibold text-sm text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: '#CD1B78' }}
              >
                <div className="flex items-center justify-center gap-2 w-full">
                  <Zap className="size-4" />
                  <span>Get Started Free</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
