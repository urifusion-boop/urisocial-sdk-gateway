'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export function UsageChart() {
  // Mock data - in real app, this would come from props
  const data = [
    { day: 'Mon', requests: 1200 },
    { day: 'Tue', requests: 1900 },
    { day: 'Wed', requests: 1500 },
    { day: 'Thu', requests: 2200 },
    { day: 'Fri', requests: 2800 },
    { day: 'Sat', requests: 1600 },
    { day: 'Sun', requests: 1100 },
  ];

  const maxValue = Math.max(...data.map(d => d.requests));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" style={{ color: '#CD1B78' }} />
              API Usage (Last 7 Days)
            </CardTitle>
            <CardDescription>Total API requests per day</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">12.3K</div>
            <div className="text-sm text-gray-600">Total requests</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = (item.requests / maxValue) * 100;
            return (
              <div key={item.day} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.day}</span>
                  <span className="text-gray-600">{item.requests.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: '#CD1B78',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
