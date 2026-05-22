'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeBlock } from './CodeBlock';

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface APIEndpointCardProps {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  path: string;
  description: string;
  parameters?: Parameter[];
  requestExample?: string;
  responseExample?: string;
}

const methodColors: Record<string, string> = {
  GET: 'bg-green-100 text-green-800 border-green-300',
  POST: 'bg-blue-100 text-blue-800 border-blue-300',
  PATCH: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  PUT: 'bg-orange-100 text-orange-800 border-orange-300',
  DELETE: 'bg-red-100 text-red-800 border-red-300',
};

export function APIEndpointCard({
  method,
  path,
  description,
  parameters,
  requestExample,
  responseExample,
}: APIEndpointCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-2 hover:border-pink-300 transition-colors">
      <CardContent className="p-0">
        {/* Header - Always Visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4 flex-1 text-left">
            <Badge className={cn('font-mono font-bold border', methodColors[method])}>{method}</Badge>
            <code className="text-sm font-mono text-gray-900 font-semibold">{path}</code>
            <span className="text-sm text-gray-600 flex-1">{description}</span>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-gray-200 p-6 space-y-6 bg-gray-50">
            {/* Parameters */}
            {parameters && parameters.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3">Parameters</h4>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-2 font-semibold text-gray-700">Name</th>
                        <th className="text-left px-4 py-2 font-semibold text-gray-700">Type</th>
                        <th className="text-left px-4 py-2 font-semibold text-gray-700">Required</th>
                        <th className="text-left px-4 py-2 font-semibold text-gray-700">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parameters.map((param, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0">
                          <td className="px-4 py-3 font-mono text-pink-600">{param.name}</td>
                          <td className="px-4 py-3 font-mono text-blue-600">{param.type}</td>
                          <td className="px-4 py-3">
                            <Badge
                              className={
                                param.required
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }
                            >
                              {param.required ? 'Required' : 'Optional'}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Request Example */}
            {requestExample && (
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3">Request Example</h4>
                <CodeBlock code={requestExample} language="bash" />
              </div>
            )}

            {/* Response Example */}
            {responseExample && (
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3">Response Example</h4>
                <CodeBlock code={responseExample} language="json" />
              </div>
            )}

            {/* Try It Button */}
            <div className="flex justify-end">
              <Button style={{ backgroundColor: '#CD1B78' }}>Try in Playground</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
