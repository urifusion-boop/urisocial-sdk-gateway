'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, AlertTriangle, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';

export default function RateLimitingPage() {
  const [copied, setCopied] = useState(false);

  const code = `async function makeRequestWithRetry() {
  try {
    const response = await client.posts.create({ /* ... */ });
    return response;
  } catch (error) {
    if (error.status === 429) {
      const resetTime = error.headers['x-ratelimit-reset'];
      const waitTime = resetTime - Date.now();

      console.log(\`Rate limit exceeded. Retrying in \${waitTime}ms\`);
      await new Promise(resolve => setTimeout(resolve, waitTime));

      return makeRequestWithRetry();
    }
    throw error;
  }
}`;

  const copyToClipboard = async (text: string, setter: (value: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="pb-10">
      <div className="mb-12 pt-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight tracking-tight">
          Rate Limiting
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          Understand how rate limiting works in URI Social SDK and how to handle rate limit errors effectively.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: '#CD1B78' }}>
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Rate Limits by Plan</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {[
            { plan: 'Free', limit: '1,000', color: 'gray' },
            { plan: 'Pro', limit: '10,000', color: 'blue' },
            { plan: 'Enterprise', limit: 'Custom', color: 'purple' },
          ].map((tier) => (
            <Card key={tier.plan} className="!ring-1 !ring-gray-100 bg-white shadow-sm">
              <CardHeader className="pb-3.5">
                <CardTitle className="text-xl font-semibold">{tier.plan}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold mb-2" style={{ color: '#CD1B78' }}>{tier.limit}</div>
                <p className="text-gray-600 text-[14px]">requests per hour</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Response Headers</h2>
        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm">
          <CardContent className="p-5">
            <div className="space-y-3">
              {[
                { header: 'X-RateLimit-Limit', description: 'Maximum number of requests allowed per hour' },
                { header: 'X-RateLimit-Remaining', description: 'Number of requests remaining in current window' },
                { header: 'X-RateLimit-Reset', description: 'Unix timestamp when the rate limit resets' },
              ].map((item) => (
                <div key={item.header} className="p-3 rounded-lg bg-gray-50">
                  <code className="text-sm font-mono font-semibold" style={{ color: '#CD1B78' }}>{item.header}</code>
                  <p className="text-gray-600 text-[14px] mt-1 leading-snug">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Handling Rate Limits</h2>
        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm">
          <CardContent className="p-5">
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative' }}>
                <IconButton
                  onClick={() => copyToClipboard(code, setCopied)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: copied ? '#10B981' : '#6B7280',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                  }}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </IconButton>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
                  {code}
                </pre>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>

      <Card className="!ring-1 !ring-orange-100 bg-orange-50 shadow-sm mb-8">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-700 text-[15px] leading-snug mb-2">
                <strong>Best Practices</strong>
              </p>
              <ul className="space-y-1.5 text-gray-600 text-[14px] leading-snug">
                <li>• Implement exponential backoff for retries</li>
                <li>• Cache responses when possible</li>
                <li>• Monitor rate limit headers proactively</li>
                <li>• Use batch endpoints to reduce request count</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="!ring-1 !ring-pink-100 bg-pink-50 shadow-sm">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Need Higher Limits?</h2>
          <p className="text-[15px] text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Upgrade to Pro or Enterprise for higher rate limits and priority support.
          </p>
          <Button asChild size="lg" className="h-11 px-7 text-[15px] font-semibold shadow-md hover:shadow-lg transition-all" style={{ backgroundColor: '#CD1B78', color: 'white' }}>
            <Link href="/pricing">
              View Pricing <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
