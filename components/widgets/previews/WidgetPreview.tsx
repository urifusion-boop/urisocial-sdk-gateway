'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Code } from 'lucide-react';

interface WidgetPreviewProps {
  widgetId: string;
  primaryColor: string;
  borderRadius: string;
}

export function WidgetPreview({ widgetId, primaryColor, borderRadius }: WidgetPreviewProps) {
  return (
    <Card className="border-2">
      <CardContent className="p-8">
        <div
          className="border-2 border-dashed rounded-lg p-8 min-h-[400px] flex items-center justify-center transition-all"
          style={{
            borderRadius: `${borderRadius}px`,
            borderColor: `${primaryColor}40`,
          }}
        >
          <div className="text-center">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}20` }}
            >
              <Code className="w-10 h-10" style={{ color: primaryColor }} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {widgetId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </h3>
            <p className="text-gray-600 mb-4">Live widget preview</p>
            <div
              className="inline-block px-4 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: primaryColor }}
            >
              Interactive Demo
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
