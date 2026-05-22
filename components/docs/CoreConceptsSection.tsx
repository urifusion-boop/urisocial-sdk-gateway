import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Users, Link as LinkIcon, Sparkles, Calendar, Webhook } from 'lucide-react';
import Link from 'next/link';

export function CoreConceptsSection() {
  const concepts = [
    {
      icon: Layers,
      title: 'Multi-Tenant Architecture',
      description: 'Isolated workspaces with complete data separation for each customer.',
      details: [
        'Workspace-level isolation',
        'Role-based access control (RBAC)',
        'Team collaboration features',
        'Custom branding per workspace',
      ],
      href: '/dashboard/docs/multi-tenant',
    },
    {
      icon: Users,
      title: 'Workspaces & Teams',
      description: 'Organize users into workspaces with granular permissions.',
      details: [
        'Admin, Editor, Viewer roles',
        'Invite team members via email',
        'Activity logs and audit trails',
        'Workspace switching',
      ],
      href: '/dashboard/docs/workspaces',
    },
    {
      icon: LinkIcon,
      title: 'Social Connections',
      description: 'Connect and manage multiple social media accounts per workspace.',
      details: [
        'OAuth 2.0 authentication',
        'Support for 6+ platforms',
        'Connection health monitoring',
        'Auto-reconnection on token expiry',
      ],
      href: '/dashboard/docs/connections',
    },
    {
      icon: Sparkles,
      title: 'AI Content Generation',
      description: 'Generate engaging content and images with GPT-4 and DALL-E.',
      details: [
        'Platform-optimized content',
        'Custom tone and style',
        'Image generation (1080x1350)',
        'Content templates',
      ],
      href: '/dashboard/docs/ai-generation',
    },
    {
      icon: Calendar,
      title: 'Post Scheduling',
      description: 'Schedule posts with intelligent timezone handling and queuing.',
      details: [
        'Multi-platform scheduling',
        'Timezone-aware delivery',
        'Smart queue management',
        'Bulk scheduling',
      ],
      href: '/dashboard/docs/scheduling',
    },
    {
      icon: Webhook,
      title: 'Webhooks & Events',
      description: 'Receive real-time notifications for all platform events.',
      details: [
        'Post published events',
        'Connection status changes',
        'Workspace updates',
        'Custom retry logic',
      ],
      href: '/dashboard/docs/webhooks',
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Core Concepts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concepts.map((concept, i) => {
          const Icon = concept.icon;
          return (
            <Link key={i} href={concept.href}>
              <Card className="h-full border-2 hover:border-pink-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#CD1B7820' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: '#CD1B78' }} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{concept.title}</CardTitle>
                      <CardDescription className="text-sm">{concept.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {concept.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-pink-600 mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
