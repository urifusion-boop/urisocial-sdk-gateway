'use client';

import { useState } from 'react';
import { DeveloperLayout } from '@/components/layout/DeveloperLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, Copy, Trash2, Eye, EyeOff, Plus, AlertTriangle } from 'lucide-react';

export default function APIKeysPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  const apiKeys = [
    {
      id: '1',
      name: 'Production Key',
      key: 'sk_live_1234567890abcdef',
      created: '2026-05-01',
      lastUsed: '2 hours ago',
      status: 'active',
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'sk_test_abcdef1234567890',
      created: '2026-04-15',
      lastUsed: '5 minutes ago',
      status: 'active',
    },
  ];

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const maskKey = (key: string) => {
    return key.slice(0, 7) + '••••••••••••••••' + key.slice(-4);
  };

  return (
    <DeveloperLayout>
      <div className="max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4" style={{ backgroundColor: '#CD1B78' }}>
            API Keys
          </Badge>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">API Keys</h1>
              <p className="text-xl text-gray-600">
                Manage your API keys for authenticating with the URI Social SDK.
              </p>
            </div>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button style={{ backgroundColor: '#CD1B78' }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Key
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                  <DialogDescription>
                    Give your API key a descriptive name to identify its purpose.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Input
                    placeholder="e.g., Production Key, Development Key"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    style={{ backgroundColor: '#CD1B78' }}
                    onClick={() => {
                      setShowDialog(false);
                      setKeyName('');
                    }}
                  >
                    Create Key
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Security Alert */}
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Keep your keys secure:</strong> Never share API keys publicly or commit them to version
            control. Use environment variables instead.
          </AlertDescription>
        </Alert>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-gray-600">Total Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{apiKeys.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-gray-600">Active Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {apiKeys.filter((k) => k.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-gray-600">API Requests (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">12,547</div>
            </CardContent>
          </Card>
        </div>

        {/* API Keys List */}
        <Card>
          <CardHeader>
            <CardTitle>Your API Keys</CardTitle>
            <CardDescription>
              Active API keys for your account. Click to reveal or copy the full key.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="border-2 rounded-lg p-6 hover:border-pink-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#CD1B7820' }}
                    >
                      <Key className="w-5 h-5" style={{ color: '#CD1B78' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{apiKey.name}</h3>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        {apiKey.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                    >
                      {visibleKeys[apiKey.id] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <code className="text-sm text-gray-100 font-mono">
                    {visibleKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                  </code>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div>
                    Created: <span className="font-medium">{apiKey.created}</span>
                  </div>
                  <div>
                    Last used: <span className="font-medium">{apiKey.lastUsed}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                'Store API keys in environment variables, never in code',
                'Use different keys for development and production',
                'Rotate keys regularly (every 90 days recommended)',
                'Delete unused keys immediately',
                'Monitor key usage for suspicious activity',
                'Never share keys via email, chat, or other insecure channels',
              ].map((practice, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-pink-600">{i + 1}</span>
                  </div>
                  <span className="text-gray-700">{practice}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DeveloperLayout>
  );
}
