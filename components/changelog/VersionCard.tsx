import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Bug, Zap } from 'lucide-react';

interface Change {
  type: 'feature' | 'fix' | 'improvement';
  text: string;
}

interface VersionCardProps {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  changes: Change[];
}

const typeIcons = {
  feature: <Sparkles className="w-4 h-4 text-green-600" />,
  fix: <Bug className="w-4 h-4 text-red-600" />,
  improvement: <Zap className="w-4 h-4 text-blue-600" />,
};

const typeLabels: Record<string, string> = {
  feature: 'New',
  fix: 'Fixed',
  improvement: 'Improved',
};

const versionBadgeColors: Record<string, string> = {
  major: 'bg-pink-100 text-pink-800',
  minor: 'bg-blue-100 text-blue-800',
  patch: 'bg-gray-100 text-gray-800',
};

export function VersionCard({ version, date, type, changes }: VersionCardProps) {
  return (
    <Card className="border-2">
      <CardHeader className="border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-gray-900">v{version}</h3>
            <Badge className={versionBadgeColors[type]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
          </div>
          <span className="text-sm text-gray-600">{date}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3">
          {changes.map((change, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-1">{typeIcons[change.type]}</div>
              <div className="flex-1">
                <span className="font-semibold text-gray-700 mr-2">{typeLabels[change.type]}:</span>
                <span className="text-gray-600">{change.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
