import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Metric {
  label: string;
  current: number;
  limit: number;
  unit: string;
}

interface UsageMetricsProps {
  metrics: Metric[];
  planName: string;
}

export function UsageMetrics({ metrics, planName }: UsageMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Current Usage</CardTitle>
          <Badge style={{ backgroundColor: '#CD1B78' }}>{planName} Plan</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, i) => {
          const percentage = (metric.current / metric.limit) * 100;
          const isNearLimit = percentage > 80;

          return (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">{metric.label}</span>
                <span className="text-sm text-gray-600">
                  {metric.current.toLocaleString()} / {metric.limit.toLocaleString()} {metric.unit}
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
              {isNearLimit && (
                <p className="text-xs text-orange-600">⚠️ Approaching limit - consider upgrading</p>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
