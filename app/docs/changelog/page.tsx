import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Plus, Bug, Zap, Shield } from 'lucide-react';

export default function ChangelogPage() {
  const releases = [
    {
      version: '2.1.0',
      date: 'May 20, 2026',
      isNew: true,
      changes: [
        { type: 'feature', text: 'Added support for Instagram Reels API' },
        { type: 'feature', text: 'New webhook event types for story posts' },
        { type: 'improvement', text: 'Improved rate limiting with automatic retry logic' },
        { type: 'improvement', text: 'Enhanced error messages with detailed context' },
        { type: 'fix', text: 'Fixed video upload timeout issues for large files' },
      ],
    },
    {
      version: '2.0.5',
      date: 'May 10, 2026',
      changes: [
        { type: 'feature', text: 'Added LinkedIn carousel post support' },
        { type: 'improvement', text: 'Optimized media upload performance (40% faster)' },
        { type: 'fix', text: 'Fixed Twitter thread ordering inconsistency' },
        { type: 'security', text: 'Updated OAuth 2.0 token refresh mechanism' },
      ],
    },
    {
      version: '2.0.0',
      date: 'April 28, 2026',
      changes: [
        { type: 'feature', text: 'Complete API redesign with RESTful endpoints' },
        { type: 'feature', text: 'Added batch operations for bulk posting' },
        { type: 'feature', text: 'New analytics API with advanced metrics' },
        { type: 'improvement', text: 'Reduced API response times by 60%' },
        { type: 'breaking', text: 'Deprecated v1 API endpoints (migration guide available)' },
      ],
    },
    {
      version: '1.9.2',
      date: 'April 15, 2026',
      changes: [
        { type: 'improvement', text: 'Added support for Facebook video posts' },
        { type: 'fix', text: 'Resolved Instagram caption character limit bug' },
        { type: 'fix', text: 'Fixed timezone handling in scheduled posts' },
      ],
    },
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'fix':
        return <Bug className="w-4 h-4 text-red-600" />;
      case 'improvement':
        return <Zap className="w-4 h-4 text-blue-600" />;
      case 'security':
        return <Shield className="w-4 h-4 text-purple-600" />;
      case 'breaking':
        return <Sparkles className="w-4 h-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const getChangeBadge = (type: string) => {
    const badges: Record<string, { label: string; className: string }> = {
      feature: { label: 'New', className: 'bg-green-100 text-green-700 border-green-200' },
      fix: { label: 'Fix', className: 'bg-red-100 text-red-700 border-red-200' },
      improvement: { label: 'Improved', className: 'bg-blue-100 text-blue-700 border-blue-200' },
      security: { label: 'Security', className: 'bg-purple-100 text-purple-700 border-purple-200' },
      breaking: { label: 'Breaking', className: 'bg-orange-100 text-orange-700 border-orange-200' },
    };

    const badge = badges[type];
    return (
      <Badge className={`${badge.className} text-[11px] font-semibold px-2 py-0.5`} variant="outline">
        {badge.label}
      </Badge>
    );
  };

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="mb-12 pt-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight tracking-tight">
          Changelog
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          Stay up to date with the latest features, improvements, and bug fixes to URI Social SDK.
        </p>
      </div>

      {/* Releases */}
      <div className="space-y-6 mb-12">
        {releases.map((release) => (
          <Card
            key={release.version}
            className={
              release.isNew
                ? '!ring-2 !ring-pink-200 bg-white shadow-md hover:shadow-lg transition-all duration-200'
                : '!ring-1 !ring-gray-100 bg-white shadow-sm hover:!ring-pink-200 hover:shadow-md transition-all duration-200'
            }
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl font-semibold text-gray-900">v{release.version}</CardTitle>
                  {release.isNew && (
                    <Badge className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm" style={{ backgroundColor: '#CD1B78' }}>
                      <Sparkles className="w-3.5 h-3.5" />
                      Latest
                    </Badge>
                  )}
                </div>
                <span className="text-[14px] text-gray-500 font-medium">{release.date}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2.5">
                {release.changes.map((change, index) => (
                  <li key={index} className="flex items-start gap-3 p-2.5 rounded-md hover:bg-gray-50 transition-colors">
                    <div className="mt-0.5 flex-shrink-0">
                      {getChangeIcon(change.type)}
                    </div>
                    <div className="flex-1 flex items-center justify-between gap-3">
                      <span className="text-[15px] text-gray-700 leading-snug">{change.text}</span>
                      <div className="flex-shrink-0">
                        {getChangeBadge(change.type)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscribe CTA */}
      <Card className="!ring-1 !ring-pink-100 bg-pink-50 shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center shadow-md" style={{ backgroundColor: '#CD1B78' }}>
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Stay Updated</h3>
          <p className="text-[15px] text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Get notified about new releases, features, and important updates delivered straight to your inbox.
          </p>
          <div className="flex gap-3 max-w-lg mx-auto flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-[15px]"
            />
            <button
              className="px-6 py-2.5 text-white rounded-lg font-semibold text-[15px] shadow-md hover:shadow-lg transition-all hover:scale-105 whitespace-nowrap"
              style={{ backgroundColor: '#CD1B78' }}
            >
              Subscribe
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
