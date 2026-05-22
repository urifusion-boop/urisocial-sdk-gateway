import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Zap, Shield, Users, BookOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const features = [
    {
      icon: Zap,
      title: 'Quick Start',
      description: 'Get up and running with URI Social SDK in minutes',
      href: '/docs/quickstart',
    },
    {
      icon: Code,
      title: 'API Reference',
      description: 'Complete API documentation with examples',
      href: '/docs/api',
    },
    {
      icon: Shield,
      title: 'Authentication',
      description: 'Secure your app with OAuth 2.0 authentication',
      href: '/docs/authentication',
    },
    {
      icon: BookOpen,
      title: 'Examples',
      description: 'Real-world code examples in multiple languages',
      href: '/docs/examples',
    },
  ];

  return (
    <div className="pb-10">
      {/* Hero Section */}
      <div className="mb-12 pt-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight tracking-tight">
          Welcome to URI Social SDK
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          Build powerful social media integrations with ease. Our SDK provides a unified API to
          connect with Instagram, Twitter, Facebook, LinkedIn, and more.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="h-11 px-6 text-[15px] font-semibold shadow-md hover:shadow-lg transition-all" style={{ backgroundColor: '#CD1B78', color: 'white' }}>
            <Link href="/docs/quickstart">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-11 px-6 text-[15px] font-semibold border hover:bg-gray-50 transition-all">
            <Link href="/docs/api">
              API Reference
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.href} href={feature.href}>
              <Card className="h-full !ring-1 !ring-gray-100 hover:!ring-pink-200 hover:shadow-md transition-all duration-200 cursor-pointer group bg-white">
                <CardHeader className="p-5">
                  <div className="flex items-start gap-3.5">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 duration-200"
                      style={{ backgroundColor: '#CD1B7815' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: '#CD1B78' }} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold mb-1.5 group-hover:text-pink-700 transition-colors">{feature.title}</CardTitle>
                      <CardDescription className="text-[15px] text-gray-600 leading-snug">{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* What's New */}
      <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm mb-12">
        <CardHeader className="pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#CD1B78' }}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">What's New</CardTitle>
              <CardDescription className="text-gray-600 text-[14px] mt-0.5">
                Latest features and improvements in v2.1.0
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2.5 mb-5">
            <li className="flex items-start gap-2.5 p-2.5 rounded-md hover:bg-pink-50 transition-colors">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#CD1B78' }}>
                <span className="text-white text-[10px] font-bold">1</span>
              </div>
              <span className="text-gray-700 text-[15px] leading-snug">Added support for Instagram Reels API</span>
            </li>
            <li className="flex items-start gap-2.5 p-2.5 rounded-md hover:bg-pink-50 transition-colors">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#CD1B78' }}>
                <span className="text-white text-[10px] font-bold">2</span>
              </div>
              <span className="text-gray-700 text-[15px] leading-snug">Improved rate limiting with automatic retry</span>
            </li>
            <li className="flex items-start gap-2.5 p-2.5 rounded-md hover:bg-pink-50 transition-colors">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#CD1B78' }}>
                <span className="text-white text-[10px] font-bold">3</span>
              </div>
              <span className="text-gray-700 text-[15px] leading-snug">New webhook event types for real-time updates</span>
            </li>
          </ul>
          <Button asChild variant="outline" className="border hover:border-pink-300 hover:bg-pink-50 h-9 text-[14px]" size="default">
            <Link href="/docs/changelog">
              View Full Changelog <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Popular Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: 'Installation Guide', href: '/docs/installation' },
            { title: 'Authentication Flow', href: '/docs/authentication' },
            { title: 'Rate Limiting', href: '/docs/rate-limiting' },
            { title: 'Error Handling', href: '/docs/errors' },
            { title: 'Webhooks Setup', href: '/docs/api/webhooks' },
            { title: 'Best Practices', href: '/docs/best-practices' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between p-4 rounded-lg !ring-1 !ring-gray-100 hover:!ring-pink-200 hover:shadow-sm transition-all duration-200 group bg-white"
            >
              <span className="text-gray-700 group-hover:text-pink-700 font-medium text-[15px] transition-colors">
                {link.title}
              </span>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-pink-600 transition-all duration-200 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="!ring-1 !ring-pink-100 bg-pink-50 shadow-sm">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Ready to build?</h2>
          <p className="text-[15px] text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Sign up now and get instant access to your API keys. Start integrating social media
            features into your application today.
          </p>
          <Button asChild size="lg" className="h-11 px-7 text-[15px] font-semibold shadow-md hover:shadow-lg transition-all" style={{ backgroundColor: '#CD1B78', color: 'white' }}>
            <Link href="/signup">
              Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
