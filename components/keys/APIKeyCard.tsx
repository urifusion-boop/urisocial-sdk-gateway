'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Key, Copy, Trash2, Eye, EyeOff } from 'lucide-react';

interface APIKeyCardProps {
  id: string;
  name: string;
  apiKey: string;
  created: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

export function APIKeyCard({ id, name, apiKey, created, lastUsed, status }: APIKeyCardProps) {
  const [visible, setVisible] = useState(false);

  const maskKey = (key: string) => {
    return key.slice(0, 7) + '••••••••••••••••' + key.slice(-4);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
  };

  return (
    <Card className="border-2 hover:border-pink-300 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#CD1B7820' }}
            >
              <Key className="w-5 h-5" style={{ color: '#CD1B78' }} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
              <Badge className={status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {status}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setVisible(!visible)}>
              {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <code className="text-sm text-gray-100 font-mono break-all">
            {visible ? apiKey : maskKey(apiKey)}
          </code>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            Created: <span className="font-medium">{created}</span>
          </div>
          <div>
            Last used: <span className="font-medium">{lastUsed}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
