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
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">API Keys</h1>
              <p className="text-sm md:text-base text-gray-600">
                Manage your API keys for authenticating with the URI Social SDK.
              </p>
            </div>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="text-white shadow-sm self-start" style={{ backgroundColor: '#CD1B78' }}>
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Create Key
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
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0" />
          <AlertDescription className="text-orange-800 text-xs md:text-sm">
            <strong className="font-semibold">Keep your keys secure:</strong> Never share API keys publicly or commit them to version control. Use environment variables instead.
          </AlertDescription>
        </Alert>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="p-3 md:p-4 pb-2">
              <CardTitle className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Keys</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <div className="text-xl md:text-2xl font-bold text-gray-900">{apiKeys.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="p-3 md:p-4 pb-2">
              <CardTitle className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wide">Active</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <div className="text-xl md:text-2xl font-bold text-green-600">
                {apiKeys.filter((k) => k.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="p-3 md:p-4 pb-2">
              <CardTitle className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wide">Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <div className="text-xl md:text-2xl font-bold text-gray-900">12.5k</div>
            </CardContent>
          </Card>
        </div>

        {/* API Keys List */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-base md:text-lg">Your API Keys</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Active API keys for your account. Click to reveal or copy the full key.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="border border-gray-200 rounded-lg p-3 md:p-4 hover:border-pink-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-2 md:gap-3 min-w-0 flex-1">
                    <div
                      className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#CD1B7820' }}
                    >
                      <Key className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#CD1B78' }} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base truncate">{apiKey.name}</h3>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-[10px] px-1.5 py-0.5">
                        {apiKey.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1 md:gap-1.5 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 md:h-8 md:w-8"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                    >
                      {visibleKeys[apiKey.id] ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </Button>
                    <Button variant="outline" size="icon" className="h-7 w-7 md:h-8 md:w-8">
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-7 w-7 md:h-8 md:w-8 text-red-600 hover:text-red-700">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-2.5 md:p-3 mb-2 md:mb-3 overflow-x-auto">
                  <code className="text-[11px] md:text-xs text-gray-100 font-mono whitespace-nowrap">
                    {visibleKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                  </code>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[10px] md:text-xs text-gray-600">
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
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-base md:text-lg">Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ul className="space-y-2 md:space-y-2.5">
              {[
                'Store API keys in environment variables, never in code',
                'Use different keys for development and production',
                'Rotate keys regularly (every 90 days recommended)',
                'Delete unused keys immediately',
                'Monitor key usage for suspicious activity',
                'Never share keys via email, chat, or other insecure channels',
              ].map((practice, i) => (
                <li key={i} className="flex items-start gap-2 md:gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] md:text-xs font-bold text-pink-600">{i + 1}</span>
                  </div>
                  <span className="text-gray-700 text-xs md:text-sm">{practice}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DeveloperLayout>
  );
}
