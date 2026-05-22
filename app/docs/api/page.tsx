'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, BookOpen, Zap, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Box, Tab, Tabs, IconButton } from '@mui/material';
import { useState } from 'react';

export default function APIReferencePage() {
  const [authTab, setAuthTab] = useState('curl');
  const [copiedAuth, setCopiedAuth] = useState(false);

  const getAuthCode = () => {
    if (authTab === 'curl') {
      return `curl https://sdk-gateway.urisocial.com/api/v1/posts \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`;
    }
    if (authTab === 'javascript') {
      return `const response = await fetch('https://sdk-gateway.urisocial.com/api/v1/posts', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});`;
    }
    return `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://sdk-gateway.urisocial.com/api/v1/posts', headers=headers)`;
  };

  const copyToClipboard = async (text: string, setter: (value: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };
  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/auth/signup',
      description: 'Create a new developer account',
      category: 'Authentication',
    },
    {
      method: 'POST',
      path: '/api/v1/auth/login',
      description: 'Authenticate and receive access tokens',
      category: 'Authentication',
    },
    {
      method: 'GET',
      path: '/api/v1/posts',
      description: 'Retrieve social media posts across platforms',
      category: 'Social Posts',
    },
    {
      method: 'POST',
      path: '/api/v1/posts',
      description: 'Create and publish posts to multiple platforms',
      category: 'Social Posts',
    },
    {
      method: 'GET',
      path: '/api/v1/analytics',
      description: 'Get analytics and insights for your posts',
      category: 'Analytics',
    },
    {
      method: 'POST',
      path: '/api/v1/webhooks',
      description: 'Register webhook endpoints for real-time events',
      category: 'Webhooks',
    },
  ];

  const methodColors: Record<string, string> = {
    GET: 'bg-green-100 text-green-700',
    POST: 'bg-blue-100 text-blue-700',
    PUT: 'bg-yellow-100 text-yellow-700',
    DELETE: 'bg-red-100 text-red-700',
  };

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="mb-16 pt-8">
        <Badge className="mb-6 px-3 py-1.5 text-xs font-semibold" style={{ backgroundColor: '#CD1B78' }}>
          API Reference
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">API Reference</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
          Complete REST API documentation for URI Social SDK. All endpoints use JSON for requests
          and responses.
        </p>
      </div>

      {/* Base URL */}
      <Card className="mb-8 border-2 border-gray-100 hover:border-pink-200 shadow-sm transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">Base URL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-xl p-5 shadow-md">
            <code className="text-gray-100 font-mono text-base">https://sdk-gateway.urisocial.com</code>
          </div>
          <p className="text-base text-gray-600 mt-4 leading-relaxed">
            All API requests must be made over HTTPS. Requests made over plain HTTP will fail.
          </p>
        </CardContent>
      </Card>

      {/* Authentication */}
      <Card className="mb-8 border-2 border-gray-100 hover:border-pink-200 shadow-sm transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">Authentication</CardTitle>
          <CardDescription className="text-base text-gray-600 mt-2">
            Include your API key in the Authorization header
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
            <Tabs
              value={authTab}
              onChange={(_, v) => setAuthTab(v)}
              sx={{
                borderBottom: '1px solid #E5E7EB',
                px: 2,
                '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '14px', minHeight: '48px' },
                '& .Mui-selected': { color: '#CD1B78' },
                '& .MuiTabs-indicator': { backgroundColor: '#CD1B78' },
              }}
            >
              <Tab label="cURL" value="curl" />
              <Tab label="JavaScript" value="javascript" />
              <Tab label="Python" value="python" />
            </Tabs>

            <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative' }}>
              <IconButton
                onClick={() => copyToClipboard(getAuthCode(), setCopiedAuth)}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  color: copiedAuth ? '#10B981' : '#6B7280',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                }}
              >
                {copiedAuth ? <Check size={18} /> : <Copy size={18} />}
              </IconButton>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
                {getAuthCode()}
              </pre>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Endpoints</h2>
        <div className="space-y-5">
          {endpoints.map((endpoint, index) => (
            <Card key={index} className="border-2 border-gray-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={`${methodColors[endpoint.method]} font-semibold text-xs px-3 py-1`}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm md:text-base font-mono text-gray-700 font-semibold">{endpoint.path}</code>
                    </div>
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {endpoint.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-4 border-2 text-xs font-semibold px-3 py-1">
                    {endpoint.category}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Rate Limiting */}
      <Card className="mb-16 border-2 border-orange-200 bg-orange-50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Rate Limiting</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base text-gray-700 mb-5 leading-relaxed">
            API requests are rate limited to ensure fair usage:
          </p>
          <ul className="space-y-4 text-gray-700 mb-5">
            <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-100 transition-colors">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <span className="text-base"><strong>Free Plan:</strong> 1,000 requests per hour</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-100 transition-colors">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <span className="text-base"><strong>Pro Plan:</strong> 10,000 requests per hour</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-100 transition-colors">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <span className="text-base"><strong>Enterprise Plan:</strong> Custom limits</span>
            </li>
          </ul>
          <p className="text-base text-gray-600 mt-5 leading-relaxed">
            Rate limit information is included in response headers: <code className="text-xs bg-white px-2 py-1 rounded font-mono">X-RateLimit-Limit</code> and <code className="text-xs bg-white px-2 py-1 rounded font-mono">X-RateLimit-Remaining</code>
          </p>
        </CardContent>
      </Card>

      {/* Error Codes */}
      <Card className="border-2 border-gray-100 hover:border-pink-200 shadow-sm transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">Error Codes</CardTitle>
          <CardDescription className="text-base text-gray-600 mt-2">Standard HTTP status codes are used</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { code: '200', desc: 'OK - Request succeeded' },
              { code: '201', desc: 'Created - Resource created successfully' },
              { code: '400', desc: 'Bad Request - Invalid parameters' },
              { code: '401', desc: 'Unauthorized - Invalid or missing API key' },
              { code: '403', desc: 'Forbidden - Insufficient permissions' },
              { code: '404', desc: 'Not Found - Resource not found' },
              { code: '429', desc: 'Too Many Requests - Rate limit exceeded' },
              { code: '500', desc: 'Internal Server Error - Something went wrong' },
            ].map((error) => (
              <div key={error.code} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <code className="text-base font-mono font-bold text-gray-900 min-w-[70px] px-3 py-1 bg-gray-100 rounded">
                  {error.code}
                </code>
                <span className="text-base text-gray-700 leading-relaxed">{error.desc}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
