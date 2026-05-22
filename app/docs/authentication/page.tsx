'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Key, Shield, Lock, AlertCircle, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Box, Tab, Tabs, IconButton } from '@mui/material';
import { useState } from 'react';

export default function AuthenticationPage() {
  const [apiKeyTab, setApiKeyTab] = useState('javascript');
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [copiedOAuth, setCopiedOAuth] = useState(false);

  const getApiKeyCode = () => {
    if (apiKeyTab === 'javascript') {
      return `const response = await fetch('https://sdk-gateway.urisocial.com/api/v1/posts', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});`;
    }
    if (apiKeyTab === 'python') {
      return `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://sdk-gateway.urisocial.com/api/v1/posts',
    headers=headers
)`;
    }
    return `curl https://sdk-gateway.urisocial.com/api/v1/posts \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`;
  };

  const oauthCode = `// Step 1: Redirect to authorization URL
const authUrl = \`https://sdk-gateway.urisocial.com/oauth/authorize?client_id=\${CLIENT_ID}&redirect_uri=\${REDIRECT_URI}&response_type=code&scope=posts.read posts.write\`;

window.location.href = authUrl;

// Step 2: Handle callback and exchange code
const code = new URLSearchParams(window.location.search).get('code');

const response = await fetch('https://sdk-gateway.urisocial.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grant_type: 'authorization_code',
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI
  })
});

const { access_token } = await response.json();`;

  const copyToClipboard = async (text: string, setter: (value: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="pb-10">
      {/* Hero Section */}
      <div className="mb-12 pt-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight tracking-tight">
          Authentication
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          Learn how to authenticate your requests using API keys and OAuth 2.0.
          URI Social SDK supports both methods for maximum flexibility.
        </p>
      </div>

      {/* API Key Authentication */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: '#CD1B78' }}>
            <Key className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">API Key Authentication</h2>
        </div>

        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm mb-6">
          <CardHeader className="pb-3.5">
            <CardTitle className="text-xl font-semibold">Getting Your API Key</CardTitle>
            <CardDescription className="text-gray-600 text-[14px] mt-0.5">
              Obtain your API key from the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ol className="space-y-2.5">
              {[
                'Log in to your URI Social dashboard',
                'Navigate to Settings → API Keys',
                'Click "Generate New API Key"',
                'Copy and store your API key securely',
              ].map((step, index) => (
                <li key={index} className="flex items-start gap-2.5 p-2.5 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#CD1B78' }}>
                    <span className="text-white text-[10px] font-bold">{index + 1}</span>
                  </div>
                  <span className="text-gray-700 text-[15px] leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm mb-6">
          <CardHeader className="pb-3.5">
            <CardTitle className="text-xl font-semibold">Using Your API Key</CardTitle>
            <CardDescription className="text-gray-600 text-[14px] mt-0.5">
              Include your API key in the Authorization header
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <Tabs
                value={apiKeyTab}
                onChange={(_, v) => setApiKeyTab(v)}
                sx={{
                  borderBottom: '1px solid #E5E7EB',
                  px: 2,
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '14px', minHeight: '48px' },
                  '& .Mui-selected': { color: '#CD1B78' },
                  '& .MuiTabs-indicator': { backgroundColor: '#CD1B78' },
                }}
              >
                <Tab label="JavaScript" value="javascript" />
                <Tab label="Python" value="python" />
                <Tab label="cURL" value="curl" />
              </Tabs>

              <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative' }}>
                <IconButton
                  onClick={() => copyToClipboard(getApiKeyCode(), setCopiedApiKey)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: copiedApiKey ? '#10B981' : '#6B7280',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                  }}
                >
                  {copiedApiKey ? <Check size={18} /> : <Copy size={18} />}
                </IconButton>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
                  {getApiKeyCode()}
                </pre>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card className="!ring-1 !ring-orange-100 bg-orange-50 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-700 text-[15px] leading-snug mb-2">
                  <strong>Security Best Practices</strong>
                </p>
                <ul className="space-y-1.5 text-gray-600 text-[14px] leading-snug">
                  <li>• Never commit API keys to version control</li>
                  <li>• Use environment variables to store API keys</li>
                  <li>• Rotate API keys regularly</li>
                  <li>• Use different keys for development and production</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* OAuth 2.0 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: '#CD1B78' }}>
            <Shield className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">OAuth 2.0 Authentication</h2>
        </div>

        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm mb-6">
          <CardHeader className="pb-3.5">
            <CardTitle className="text-xl font-semibold">OAuth Flow</CardTitle>
            <CardDescription className="text-gray-600 text-[14px] mt-0.5">
              For applications that need user-specific access
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ol className="space-y-3">
              {[
                {
                  title: 'Create OAuth Application',
                  description: 'Register your app in the dashboard to get client credentials',
                },
                {
                  title: 'Request Authorization',
                  description: 'Redirect users to the OAuth authorization URL',
                },
                {
                  title: 'Handle Callback',
                  description: 'Receive authorization code in the callback URL',
                },
                {
                  title: 'Exchange for Token',
                  description: 'Exchange authorization code for access token',
                },
              ].map((step, index) => (
                <li key={index} className="p-3 rounded-lg bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#CD1B78' }}>
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-gray-900 text-[15px] font-semibold mb-0.5">{step.title}</p>
                      <p className="text-gray-600 text-[14px] leading-snug">{step.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm">
          <CardHeader className="pb-3.5">
            <CardTitle className="text-xl font-semibold">OAuth Implementation</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative' }}>
                <IconButton
                  onClick={() => copyToClipboard(oauthCode, setCopiedOAuth)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: copiedOAuth ? '#10B981' : '#6B7280',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                  }}
                >
                  {copiedOAuth ? <Check size={18} /> : <Copy size={18} />}
                </IconButton>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
                  {oauthCode}
                </pre>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>

      {/* Token Management */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Token Management</h2>

        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm">
          <CardContent className="p-5">
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#CD1B78' }} />
                  <div>
                    <p className="text-gray-900 text-[15px] font-semibold mb-1">Access Tokens</p>
                    <p className="text-gray-600 text-[14px] leading-snug">Valid for 1 hour. Use for authenticating API requests.</p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#CD1B78' }} />
                  <div>
                    <p className="text-gray-900 text-[15px] font-semibold mb-1">Refresh Tokens</p>
                    <p className="text-gray-600 text-[14px] leading-snug">Valid for 30 days. Use to obtain new access tokens without re-authentication.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Next Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Make Your First Request', href: '/docs/quickstart' },
            { title: 'API Reference', href: '/docs/api' },
            { title: 'Rate Limiting', href: '/docs/rate-limiting' },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="h-full !ring-1 !ring-gray-100 hover:!ring-pink-200 hover:shadow-sm transition-all duration-200 group bg-white cursor-pointer">
                <CardHeader className="p-5">
                  <CardTitle className="text-lg font-semibold group-hover:text-pink-700 transition-colors flex items-center justify-between">
                    {link.title}
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-pink-600 transition-all duration-200 group-hover:translate-x-0.5" />
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="!ring-1 !ring-pink-100 bg-pink-50 shadow-sm">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Ready to Authenticate?</h2>
          <p className="text-[15px] text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Sign up for a free account and get your API key in seconds.
          </p>
          <Button asChild size="lg" className="h-11 px-7 text-[15px] font-semibold shadow-md hover:shadow-lg transition-all" style={{ backgroundColor: '#CD1B78', color: 'white' }}>
            <Link href="/signup">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
