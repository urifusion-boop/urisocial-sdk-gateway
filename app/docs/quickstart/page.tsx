'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Terminal, Code, Zap, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Box, Tab, Tabs, IconButton } from '@mui/material';
import { useState } from 'react';

export default function QuickStartPage() {
  const [installTab, setInstallTab] = useState('npm');
  const [initTab, setInitTab] = useState('javascript');
  const [requestTab, setRequestTab] = useState('javascript');
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedInit, setCopiedInit] = useState(false);
  const [copiedRequest, setCopiedRequest] = useState(false);

  const getInstallCode = () => {
    if (installTab === 'npm') return 'npm install @urisocial/sdk';
    if (installTab === 'yarn') return 'yarn add @urisocial/sdk';
    if (installTab === 'pip') return 'pip install urisocial-sdk';
    return 'composer require urisocial/sdk';
  };

  const getInitCode = () => {
    if (initTab === 'javascript') {
      return `import { URISocialSDK } from '@urisocial/sdk';

const client = new URISocialSDK({
  apiKey: process.env.URISOCIAL_API_KEY
});`;
    }
    if (initTab === 'python') {
      return `from urisocial import URISocialSDK
import os

client = URISocialSDK(
    api_key=os.environ.get('URISOCIAL_API_KEY')
)`;
    }
    return `<?php
require 'vendor/autoload.php';

use URISocial\\SDK\\URISocialSDK;

$client = new URISocialSDK([
    'apiKey' => getenv('URISOCIAL_API_KEY')
]);`;
  };

  const getRequestCode = () => {
    if (requestTab === 'javascript') {
      return `async function publishPost() {
  try {
    const post = await client.posts.create({
      content: 'Hello from URI Social SDK! 🚀',
      platforms: ['instagram', 'twitter', 'facebook']
    });

    console.log('Success! Post ID:', post.id);
    console.log('Status:', post.status);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

publishPost();`;
    }
    if (requestTab === 'python') {
      return `def publish_post():
    try:
        post = client.posts.create(
            content='Hello from URI Social SDK! 🚀',
            platforms=['instagram', 'twitter', 'facebook']
        )

        print(f'Success! Post ID: {post.id}')
        print(f'Status: {post.status}')
    except Exception as error:
        print(f'Error: {error}')

publish_post()`;
    }
    return `try {
    $post = $client->posts->create([
        'content' => 'Hello from URI Social SDK! 🚀',
        'platforms' => ['instagram', 'twitter', 'facebook']
    ]);

    echo "Success! Post ID: {$post->id}\\n";
    echo "Status: {$post->status}\\n";
} catch (Exception $error) {
    echo "Error: {$error->getMessage()}\\n";
}`;
  };

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
          Quick Start Guide
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          Get up and running with URI Social SDK in under 5 minutes. This guide will walk you through
          installation, authentication, and making your first API call.
        </p>
      </div>

      {/* Prerequisites */}
      <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm mb-8">
        <CardHeader className="pb-3.5">
          <CardTitle className="text-xl font-semibold">Prerequisites</CardTitle>
          <CardDescription className="text-gray-600 text-[14px] mt-0.5">
            Before you begin, ensure you have the following
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2.5">
            {[
              'A URI Social account (sign up for free)',
              'Node.js 16+ or Python 3.8+ installed',
              'Your API key from the dashboard',
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2.5 p-2.5 rounded-md hover:bg-gray-50 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-[15px] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Step 1: Installation */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: '#CD1B78' }}>
            <span className="text-white text-base font-bold">1</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Installation</h2>
        </div>

        <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
          <Tabs
            value={installTab}
            onChange={(_, v) => setInstallTab(v)}
            sx={{
              borderBottom: '1px solid #E5E7EB',
              px: 2,
              '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '14px', minHeight: '48px' },
              '& .Mui-selected': { color: '#CD1B78' },
              '& .MuiTabs-indicator': { backgroundColor: '#CD1B78' },
            }}
          >
            <Tab label="npm" value="npm" />
            <Tab label="Yarn" value="yarn" />
            <Tab label="Python" value="pip" />
            <Tab label="PHP" value="composer" />
          </Tabs>

          <Box sx={{ p: 3, backgroundColor: '#FAFAFA', minHeight: '60px', position: 'relative' }}>
            <IconButton
              onClick={() => copyToClipboard(getInstallCode(), setCopiedInstall)}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                color: copiedInstall ? '#10B981' : '#6B7280',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
              }}
            >
              {copiedInstall ? <Check size={18} /> : <Copy size={18} />}
            </IconButton>
            <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', paddingRight: '40px' }}>
              {getInstallCode()}
            </p>
          </Box>
        </Box>
      </div>

      {/* Step 2: Initialize SDK */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: '#CD1B78' }}>
            <span className="text-white text-base font-bold">2</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Initialize the SDK</h2>
        </div>

        <p className="text-gray-600 text-[15px] mb-4 leading-relaxed">
          Import the SDK and initialize it with your API key
        </p>

        <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
          <Tabs
            value={initTab}
            onChange={(_, v) => setInitTab(v)}
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
              onClick={() => copyToClipboard(getInitCode(), setCopiedInit)}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                color: copiedInit ? '#10B981' : '#6B7280',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
              }}
            >
              {copiedInit ? <Check size={18} /> : <Copy size={18} />}
            </IconButton>
            <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
              {getInitCode()}
            </pre>
          </Box>
        </Box>
      </div>

      {/* Step 3: Make Your First Request */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: '#CD1B78' }}>
            <span className="text-white text-base font-bold">3</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Make Your First Request</h2>
        </div>

        <p className="text-gray-600 text-[15px] mb-4 leading-relaxed">
          Let's publish a simple post to multiple social platforms
        </p>

        <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
          <Tabs
            value={requestTab}
            onChange={(_, v) => setRequestTab(v)}
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
              onClick={() => copyToClipboard(getRequestCode(), setCopiedRequest)}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                color: copiedRequest ? '#10B981' : '#6B7280',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
              }}
            >
              {copiedRequest ? <Check size={18} /> : <Copy size={18} />}
            </IconButton>
            <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
              {getRequestCode()}
            </pre>
          </Box>
        </Box>
      </div>

      {/* Next Steps */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Next Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Authentication',
              description: 'Learn about API keys and OAuth 2.0',
              href: '/docs/authentication',
              icon: Terminal,
            },
            {
              title: 'API Reference',
              description: 'Explore all available endpoints',
              href: '/docs/api',
              icon: Code,
            },
            {
              title: 'Examples',
              description: 'View real-world code examples',
              href: '/docs/examples',
              icon: Zap,
            },
            {
              title: 'Best Practices',
              description: 'Production-ready patterns',
              href: '/docs/best-practices',
              icon: CheckCircle2,
            },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="h-full !ring-1 !ring-gray-100 hover:!ring-2 hover:!ring-pink-200 hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: '#CD1B78' }}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-pink-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-snug">{item.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Help CTA */}
      <Card className="!ring-2 !ring-pink-200 bg-pink-50 shadow-sm">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help?</h3>
          <p className="text-base text-gray-600 mb-6 max-w-xl mx-auto leading-relaxed">
            Join our developer community or reach out to our support team for assistance.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button asChild className="h-11 px-6 text-base font-semibold" style={{ backgroundColor: '#CD1B78', color: 'white' }}>
              <a href="https://discord.gg/urisocial" target="_blank" rel="noopener noreferrer">
                Join Discord
              </a>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6 text-base font-semibold border-gray-300">
              <a href="mailto:support@urisocial.com">
                Contact Support
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
