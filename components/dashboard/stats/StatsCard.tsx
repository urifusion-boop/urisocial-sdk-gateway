import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatsCard({ label, value, change, icon: Icon, trend = 'neutral' }: StatsCardProps) {
  const trendColors = {
    up: 'text-green-600 bg-green-100',
    down: 'text-red-600 bg-red-100',
    neutral: 'text-gray-600 bg-gray-100',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{label}</span>
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', 'bg-pink-50')}>
            <Icon className="w-5 h-5" style={{ color: '#CD1B78' }} />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
        {change && (
          <Badge variant="outline" className={cn('text-xs font-semibold', trendColors[trend])}>
            {change}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
