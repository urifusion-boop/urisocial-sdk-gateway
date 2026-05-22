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
    <div className="max-w-7xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Welcome to <span className="text-gradient-primary">URI Social SDK</span>
        </h1>
        <p className="text-xl text-gray-600">
          Everything you need to build powerful social media management features.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600">{stat.label}</span>
                  <Icon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <Badge variant="outline" className="text-xs">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <Link key={i} href={link.href}>
                <Card className="border-2 hover:border-pink-300 hover:shadow-lg transition-all duration-300 h-full cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{link.title}</CardTitle>
                        <CardDescription>{link.description}</CardDescription>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Getting Started */}
      <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200">
        <CardHeader>
          <CardTitle className="text-2xl">Get Started in Minutes</CardTitle>
          <CardDescription className="text-base">
            Follow our quick start guide to integrate the SDK
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button asChild size="lg" style={{ backgroundColor: '#CD1B78' }}>
              <Link href="/dashboard/docs">
                <BookOpen className="w-5 h-5 mr-2" />
                Read Documentation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard/playground">
                <Blocks className="w-5 h-5 mr-2" />
                Try Playground
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
