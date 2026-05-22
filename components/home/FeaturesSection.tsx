import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Zap, Shield, Globe, Boxes, Sparkles } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Boxes,
      title: 'Multi-Tenant Architecture',
      description: 'Isolated workspaces with role-based access control and team collaboration.',
    },
    {
      icon: Globe,
      title: 'Multi-Platform Publishing',
      description: 'Post to Facebook, Instagram, LinkedIn, Twitter/X, WhatsApp, and more.',
    },
    {
      icon: Sparkles,
      title: 'AI Content Generation',
      description: 'Generate engaging posts and images with GPT-4 and DALL-E integration.',
    },
    {
      icon: Zap,
      title: 'Post Scheduling',
      description: 'Schedule posts across platforms with intelligent timezone handling.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'OAuth 2.0, rate limiting, audit logs, and SOC 2 compliance ready.',
    },
    {
      icon: Code,
      title: 'Developer-First',
      description: 'TypeScript support, webhooks, REST & GraphQL APIs, extensive docs.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Everything You Need to <span className="text-gradient-primary">Scale</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built for developers who need enterprise-grade social media infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card
                key={i}
                className="border-2 border-gray-200 hover:border-pink-300 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'hsl(340, 74%, 42%, 0.1)' }}
                  >
                    <Icon size={28} style={{ color: '#CD1B78' }} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
