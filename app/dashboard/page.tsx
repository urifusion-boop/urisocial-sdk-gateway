import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, Code, Blocks, Key, BarChart3, Sparkles, ArrowRight, Zap } from 'lucide-react';

export default function DashboardPage() {
  const quickLinks = [
    {
      title: 'Documentation',
      description: 'Learn how to integrate the SDK',
      icon: BookOpen,
      href: '/dashboard/docs',
      color: 'bg-blue-500',
    },
    {
      title: 'API Reference',
      description: 'Complete API endpoints reference',
      icon: Code,
      href: '/dashboard/api',
      color: 'bg-purple-500',
    },
    {
      title: 'Playground',
      description: 'Test the SDK with live code',
      icon: Blocks,
      href: '/dashboard/playground',
      color: 'bg-green-500',
    },
    {
      title: 'Widgets',
      description: 'Embeddable UI components',
      icon: Sparkles,
      href: '/dashboard/widgets',
      color: 'bg-pink-500',
    },
  ];

  const stats = [
    { label: 'API Requests', value: '12,547', change: '+12.3%', icon: Zap },
    { label: 'Active Keys', value: '3', change: 'Healthy', icon: Key },
    { label: 'Workspaces', value: '5', change: '+2 this month', icon: Blocks },
    { label: 'Posts Published', value: '1,234', change: '+45 today', icon: BarChart3 },
  ];

  return (
    <div className="max-w-7xl space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          Welcome to <span style={{ color: '#CD1B78' }}>URI Social SDK</span>
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Everything you need to build powerful social media management features.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</span>
                  <Icon className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 bg-green-50 text-green-700 border-green-200">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <Link key={i} href={link.href}>
                <Card className="bg-white border border-gray-200 hover:border-pink-300 hover:shadow-md transition-all duration-200 h-full cursor-pointer">
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${link.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-semibold">{link.title}</CardTitle>
                        <CardDescription className="text-xs">{link.description}</CardDescription>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Getting Started */}
      <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl">Get Started in Minutes</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Follow our quick start guide to integrate the SDK
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <Button asChild size="sm" className="text-white shadow-sm" style={{ backgroundColor: '#CD1B78' }}>
              <Link href="/dashboard/docs">
                <BookOpen className="w-4 h-4 mr-2" />
                Read Documentation
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="border-gray-300 hover:bg-gray-50">
              <Link href="/dashboard/playground">
                <Blocks className="w-4 h-4 mr-2" />
                Try Playground
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
