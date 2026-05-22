'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Shield, Zap, Code, Database, AlertTriangle, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';

export default function BestPracticesPage() {
  const [copied, setCopied] = useState(false);

  const productionCode = `import { URISocialSDK } from '@urisocial/sdk';

// Initialize with environment variable
const client = new URISocialSDK({
  apiKey: process.env.URISOCIAL_API_KEY,
  baseURL: process.env.URISOCIAL_BASE_URL,
  timeout: 30000,
  retries: 3,
});

// Production-ready post creation with error handling
async function createPost(data) {
  // Validate input
  if (!data.content || data.content.length === 0) {
    throw new Error('Content is required');
  }

  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      const post = await client.posts.create({
        content: data.content,
        platforms: data.platforms,
        scheduled_at: data.scheduledAt,
      });

      // Log success
      console.log(\`Post created successfully: \${post.id}\`);
      return post;

    } catch (error) {
      // Handle rate limiting
      if (error.status === 429) {
        const resetTime = error.headers['x-ratelimit-reset'];
        const waitTime = Math.max(resetTime - Date.now(), 1000);

        console.log(\`Rate limit hit. Waiting \${waitTime}ms\`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        retries++;
        continue;
      }

      // Handle authentication errors
      if (error.status === 401) {
        console.error('Authentication failed. Check API key.');
        throw new Error('Invalid API credentials');
      }

      // Handle server errors with retry
      if (error.status >= 500 && retries < maxRetries) {
        const backoff = Math.pow(2, retries) * 1000;
        console.log(\`Server error. Retrying in \${backoff}ms\`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        retries++;
        continue;
      }

      // Re-throw other errors
      throw error;
    }
  }

  throw new Error('Max retries exceeded');
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
          Best Practices
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          Follow these recommended patterns and best practices to build robust,
          efficient, and secure applications with URI Social SDK.
        </p>
      </div>

      {[
        {
          icon: Shield,
          title: 'Security',
          color: '#CD1B78',
          practices: [
            'Store API keys in environment variables, never in code',
            'Use different API keys for development and production',
            'Rotate API keys regularly (every 90 days recommended)',
            'Never expose API keys in client-side code',
            'Implement proper access controls for API keys',
            'Use HTTPS for all API communications',
          ],
        },
        {
          icon: Zap,
          title: 'Performance',
          color: '#CD1B78',
          practices: [
            'Cache responses where appropriate to reduce API calls',
            'Use batch endpoints when processing multiple items',
            'Implement request debouncing for user-triggered actions',
            'Monitor and respect rate limit headers',
            'Use webhooks instead of polling for real-time updates',
            'Compress request/response bodies when possible',
          ],
        },
        {
          icon: Code,
          title: 'Error Handling',
          color: '#CD1B78',
          practices: [
            'Always wrap API calls in try-catch blocks',
            'Implement exponential backoff for retry logic',
            'Log errors with sufficient context for debugging',
            'Provide user-friendly error messages',
            'Handle network timeouts gracefully',
            'Validate input before making API requests',
          ],
        },
        {
          icon: Database,
          title: 'Data Management',
          color: '#CD1B78',
          practices: [
            'Validate data before sending to the API',
            'Handle pagination properly for large datasets',
            'Store webhook payloads for audit trails',
            'Implement idempotency for critical operations',
            'Use appropriate data types and formats',
            'Clean up old data regularly to optimize performance',
          ],
        },
      ].map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.title} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: section.color }}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
            </div>

            <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm">
              <CardContent className="p-5">
                <ul className="space-y-2.5">
                  {section.practices.map((practice, index) => (
                    <li key={index} className="flex items-start gap-2.5 p-2.5 rounded-md hover:bg-gray-50 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-[15px] leading-snug">{practice}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        );
      })}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Example: Production-Ready Code</h2>
        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm">
          <CardContent className="p-5">
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative' }}>
                <IconButton
                  onClick={() => copyToClipboard(productionCode, setCopied)}
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
                  {productionCode}
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
                <strong>Common Pitfalls to Avoid</strong>
              </p>
              <ul className="space-y-1.5 text-gray-600 text-[14px] leading-snug">
                <li>• Don't hardcode API keys in your source code</li>
                <li>• Don't ignore rate limit headers</li>
                <li>• Don't make synchronous blocking calls in production</li>
                <li>• Don't skip error handling</li>
                <li>• Don't poll when webhooks are available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Authentication', href: '/docs/authentication' },
            { title: 'Rate Limiting', href: '/docs/rate-limiting' },
            { title: 'Error Handling', href: '/docs/errors' },
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

      <Card className="!ring-1 !ring-pink-100 bg-pink-50 shadow-sm">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Ready to Build?</h2>
          <p className="text-[15px] text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Start building with these best practices in mind for a robust integration.
          </p>
          <Button asChild size="lg" className="h-11 px-7 text-[15px] font-semibold shadow-md hover:shadow-lg transition-all" style={{ backgroundColor: '#CD1B78', color: 'white' }}>
            <Link href="/docs/quickstart">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
