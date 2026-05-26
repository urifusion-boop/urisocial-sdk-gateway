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
  ChevronDown,
  LifeBuoy,
  CreditCard,
  Shield,
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
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/lib/auth-context';

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
      { title: 'Playground', href: '/dashboard/playground', icon: Blocks },
      { title: 'Widgets', href: '/dashboard/widgets', icon: Layers },
    ],
  },
  {
    title: 'Account & Settings',
    items: [
      { title: 'API Keys', href: '/dashboard/keys', icon: Key },
      { title: 'Usage & Billing', href: '/dashboard/usage', icon: BarChart3 },
      { title: 'Team', href: '/dashboard/team', icon: Users },
      { title: 'Security', href: '/dashboard/security', icon: Shield },
      { title: 'Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { developer, logout } = useAuth();

  const getInitials = () => {
    if (developer?.first_name && developer?.last_name) {
      return `${developer.first_name[0]}${developer.last_name[0]}`.toUpperCase();
    }
    return developer?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground"
                  style={{ backgroundColor: '#CD1B78' }}
                >
                  <Code className="size-4 text-white" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold" style={{ color: '#CD1B78' }}>URI Social</span>
                  <span className="text-xs text-muted-foreground">SDK Gateway</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                        <Link href={item.href}>
                          <Icon />
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto px-1.5 py-0.5 text-xs font-semibold rounded-md bg-pink-100 text-pink-700">
                              {item.badge}
                            </span>
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <div
                    className="flex aspect-square size-8 items-center justify-center rounded-lg text-white font-bold text-sm"
                    style={{ backgroundColor: '#CD1B78' }}
                  >
                    {getInitials()}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {developer?.first_name && developer?.last_name
                        ? `${developer.first_name} ${developer.last_name}`
                        : 'Developer'}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {developer?.email || 'developer@example.com'}
                    </span>
                  </div>
                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div
                      className="flex aspect-square size-8 items-center justify-center rounded-lg text-white font-bold text-sm"
                      style={{ backgroundColor: '#CD1B78' }}
                    >
                      {getInitials()}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {developer?.first_name && developer?.last_name
                          ? `${developer.first_name} ${developer.last_name}`
                          : 'Developer'}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {developer?.email || 'developer@example.com'}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/billing" className="cursor-pointer">
                    <CreditCard className="mr-2 size-4" />
                    Billing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 size-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="https://support.urisocial.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                    <LifeBuoy className="mr-2 size-4" />
                    Support
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
