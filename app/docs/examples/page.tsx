'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, ArrowRight, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Box, Tab, Tabs, IconButton } from '@mui/material';
import { useState } from 'react';

export default function ExamplesPage() {
  const [quickStartTab, setQuickStartTab] = useState('javascript');
  const [copiedQuickStart, setCopiedQuickStart] = useState(false);
  const [copiedReact, setCopiedReact] = useState(false);

  const getQuickStartCode = () => {
    if (quickStartTab === 'javascript') {
      return `import { URISocialSDK } from '@urisocial/sdk';

const client = new URISocialSDK({
  apiKey: process.env.URISOCIAL_API_KEY
});

async function publishPost() {
  const post = await client.posts.create({
    content: 'Hello from URI Social SDK! 🚀',
    platforms: ['instagram', 'twitter', 'facebook'],
    media: [{
      url: 'https://example.com/image.jpg',
      type: 'image'
    }]
  });

  console.log('Post published:', post.id);
  console.log('Status:', post.status);
}

publishPost();`;
    }
    if (quickStartTab === 'python') {
      return `from urisocial import URISocialSDK
import os

client = URISocialSDK(
    api_key=os.environ.get('URISOCIAL_API_KEY')
)

def publish_post():
    post = client.posts.create(
        content='Hello from URI Social SDK! 🚀',
        platforms=['instagram', 'twitter', 'facebook'],
        media=[{
            'url': 'https://example.com/image.jpg',
            'type': 'image'
        }]
    )

    print(f'Post published: {post.id}')
    print(f'Status: {post.status}')

publish_post()`;
    }
    return `<?php
require 'vendor/autoload.php';

use URISocial\\SDK\\URISocialSDK;

$client = new URISocialSDK([
    'apiKey' => getenv('URISOCIAL_API_KEY')
]);

$post = $client->posts->create([
    'content' => 'Hello from URI Social SDK! 🚀',
    'platforms' => ['instagram', 'twitter', 'facebook'],
    'media' => [[
        'url' => 'https://example.com/image.jpg',
        'type' => 'image'
    ]]
]);

echo "Post published: {$post->id}\\n";
echo "Status: {$post->status}\\n";`;
  };

  const reactCode = `import { useState } from 'react';
import { URISocialSDK } from '@urisocial/sdk';

const client = new URISocialSDK({
  apiKey: process.env.NEXT_PUBLIC_URISOCIAL_API_KEY
});

export default function SocialPostForm() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [platforms, setPlatforms] = useState(['instagram', 'twitter']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const post = await client.posts.create({
        content,
        platforms
      });

      alert(\`Post published successfully! ID: \${post.id}\`);
      setContent('');
    } catch (error) {
      alert(\`Error: \${error.message}\`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-3 border rounded"
        rows={4}
      />

      <div className="flex gap-2">
        {['instagram', 'twitter', 'facebook'].map(platform => (
          <label key={platform} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={platforms.includes(platform)}
              onChange={(e) => {
                if (e.target.checked) {
                  setPlatforms([...platforms, platform]);
                } else {
                  setPlatforms(platforms.filter(p => p !== platform));
                }
              }}
            />
            {platform}
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading || !content}
        className="px-4 py-2 bg-pink-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Publishing...' : 'Publish Post'}
      </button>
    </form>
  );
}`;

  const copyToClipboard = async (text: string, setter: (value: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="mb-12 pt-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight tracking-tight">
          Code Examples
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          Real-world code examples to help you integrate URI Social SDK into your application.
        </p>
      </div>

      {/* Quick Start Example */}
      <Card className="mb-8 !ring-1 !ring-gray-100 hover:!ring-pink-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="pb-3.5">
          <CardTitle className="text-xl font-semibold">Quick Start - Post to Multiple Platforms</CardTitle>
          <CardDescription className="text-gray-600 text-[14px] mt-0.5">
            Publish a post to Instagram, Twitter, and Facebook simultaneously
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
            <Tabs
              value={quickStartTab}
              onChange={(_, v) => setQuickStartTab(v)}
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
              <Tab label="PHP" value="php" />
            </Tabs>

            <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative' }}>
              <IconButton
                onClick={() => copyToClipboard(getQuickStartCode(), setCopiedQuickStart)}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  color: copiedQuickStart ? '#10B981' : '#6B7280',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                }}
              >
                {copiedQuickStart ? <Check size={18} /> : <Copy size={18} />}
              </IconButton>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
                {getQuickStartCode()}
              </pre>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* React Integration */}
      <Card className="mb-8 !ring-1 !ring-gray-100 hover:!ring-pink-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="pb-3.5">
          <CardTitle className="text-xl font-semibold">React Integration</CardTitle>
          <CardDescription className="text-gray-600 text-[14px] mt-0.5">
            Complete React component for social posting
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
            <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative' }}>
              <IconButton
                onClick={() => copyToClipboard(reactCode, setCopiedReact)}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  color: copiedReact ? '#10B981' : '#6B7280',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                }}
              >
                {copiedReact ? <Check size={18} /> : <Copy size={18} />}
              </IconButton>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
                {reactCode}
              </pre>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* More Examples */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">More Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Webhook Setup',
              description: 'Configure webhooks for real-time event notifications',
              href: '/docs/api/webhooks',
            },
            {
              title: 'Analytics Dashboard',
              description: 'Build a dashboard to track post performance',
              href: '/docs/examples/analytics',
            },
            {
              title: 'Scheduled Posts',
              description: 'Schedule posts for future publishing',
              href: '/docs/examples/scheduling',
            },
            {
              title: 'Multi-Account Management',
              description: 'Manage multiple social accounts in one app',
              href: '/docs/examples/multi-account',
            },
          ].map((example) => (
            <Link key={example.href} href={example.href}>
              <Card className="h-full !ring-1 !ring-gray-100 hover:!ring-pink-200 hover:shadow-sm transition-all duration-200 cursor-pointer group bg-white">
                <CardHeader className="p-5">
                  <CardTitle className="text-lg font-semibold flex items-center justify-between mb-1.5 group-hover:text-pink-700 transition-colors">
                    {example.title}
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-pink-600 transition-all duration-200 group-hover:translate-x-0.5" />
                  </CardTitle>
                  <CardDescription className="text-[15px] text-gray-600 leading-snug">{example.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* GitHub Repository CTA */}
      <Card className="!ring-1 !ring-pink-100 bg-pink-50 shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center shadow-md" style={{ backgroundColor: '#CD1B78' }}>
            <Code className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Full Example Repository</h3>
          <p className="text-[15px] text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Check out our GitHub repository for complete, production-ready examples and templates to accelerate your development.
          </p>
          <Button asChild size="lg" className="h-11 px-7 text-[15px] font-semibold shadow-md hover:shadow-lg transition-all" style={{ backgroundColor: '#CD1B78', color: 'white' }}>
            <a href="https://github.com/urisocial/examples" target="_blank" rel="noopener noreferrer">
              <Code className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
