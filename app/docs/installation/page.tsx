'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, Terminal, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Box, Tab, Tabs, IconButton } from '@mui/material';
import { useState } from 'react';

export default function InstallationPage() {
  const [jsTab, setJsTab] = useState('npm');
  const [pythonTab, setPythonTab] = useState('pip');
  const [verifyTab, setVerifyTab] = useState('javascript');
  const [copiedJs, setCopiedJs] = useState(false);
  const [copiedPython, setCopiedPython] = useState(false);
  const [copiedPhp, setCopiedPhp] = useState(false);
  const [copiedVerify, setCopiedVerify] = useState(false);

  const getJsCode = () => {
    if (jsTab === 'npm') return 'npm install @urisocial/sdk';
    if (jsTab === 'yarn') return 'yarn add @urisocial/sdk';
    return 'pnpm add @urisocial/sdk';
  };

  const getPythonCode = () => {
    if (pythonTab === 'pip') return 'pip install urisocial';
    return 'poetry add urisocial';
  };

  const getVerifyCode = () => {
    if (verifyTab === 'javascript') {
      return `import { URISocialSDK } from '@urisocial/sdk';

console.log('URI Social SDK version:', URISocialSDK.VERSION);
// Output: URI Social SDK version: 2.1.0`;
    }
    if (verifyTab === 'python') {
      return `import urisocial

print(f'URI Social SDK version: {urisocial.__version__}')
# Output: URI Social SDK version: 2.1.0`;
    }
    return `<?php
require 'vendor/autoload.php';

use URISocial\\SDK\\URISocialSDK;

echo 'URI Social SDK version: ' . URISocialSDK::VERSION;
// Output: URI Social SDK version: 2.1.0`;
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
          Installation
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          Install URI Social SDK in your preferred programming language and environment.
          Choose from npm, pip, or Composer based on your stack.
        </p>
      </div>

      {/* JavaScript/TypeScript */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: '#CD1B78' }}>
            <Package className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">JavaScript / TypeScript</h2>
        </div>

        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm mb-6">
          <CardHeader className="pb-3.5">
            <CardTitle className="text-xl font-semibold">Package Manager Installation</CardTitle>
            <CardDescription className="text-gray-600 text-[14px] mt-0.5">
              Install via npm, yarn, or pnpm
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <Tabs
                value={jsTab}
                onChange={(_, v) => setJsTab(v)}
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
                <Tab label="pnpm" value="pnpm" />
              </Tabs>

              <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative', minHeight: '60px' }}>
                <IconButton
                  onClick={() => copyToClipboard(getJsCode(), setCopiedJs)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: copiedJs ? '#10B981' : '#6B7280',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                  }}
                >
                  {copiedJs ? <Check size={18} /> : <Copy size={18} />}
                </IconButton>
                <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', paddingRight: '40px' }}>
                  {getJsCode()}
                </p>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card className="!ring-1 !ring-blue-100 bg-blue-50 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-700 text-[15px] leading-snug mb-2">
                  <strong>Requirements:</strong> Node.js 16.x or higher
                </p>
                <p className="text-gray-600 text-[14px] leading-snug">
                  TypeScript types are included automatically. No need for @types packages.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Python */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: '#CD1B78' }}>
            <Package className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Python</h2>
        </div>

        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm mb-6">
          <CardHeader className="pb-3.5">
            <CardTitle className="text-xl font-semibold">pip Installation</CardTitle>
            <CardDescription className="text-gray-600 text-[14px] mt-0.5">
              Install via pip or poetry
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <Tabs
                value={pythonTab}
                onChange={(_, v) => setPythonTab(v)}
                sx={{
                  borderBottom: '1px solid #E5E7EB',
                  px: 2,
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '14px', minHeight: '48px' },
                  '& .Mui-selected': { color: '#CD1B78' },
                  '& .MuiTabs-indicator': { backgroundColor: '#CD1B78' },
                }}
              >
                <Tab label="pip" value="pip" />
                <Tab label="Poetry" value="poetry" />
              </Tabs>

              <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative', minHeight: '60px' }}>
                <IconButton
                  onClick={() => copyToClipboard(getPythonCode(), setCopiedPython)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: copiedPython ? '#10B981' : '#6B7280',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                  }}
                >
                  {copiedPython ? <Check size={18} /> : <Copy size={18} />}
                </IconButton>
                <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', paddingRight: '40px' }}>
                  {getPythonCode()}
                </p>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card className="!ring-1 !ring-blue-100 bg-blue-50 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-700 text-[15px] leading-snug mb-2">
                  <strong>Requirements:</strong> Python 3.8 or higher
                </p>
                <p className="text-gray-600 text-[14px] leading-snug">
                  Compatible with Python 3.8, 3.9, 3.10, 3.11, and 3.12
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PHP */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: '#CD1B78' }}>
            <Package className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">PHP</h2>
        </div>

        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm mb-6">
          <CardHeader className="pb-3.5">
            <CardTitle className="text-xl font-semibold">Composer Installation</CardTitle>
            <CardDescription className="text-gray-600 text-[14px] mt-0.5">
              Install via Composer package manager
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative', minHeight: '60px' }}>
                <IconButton
                  onClick={() => copyToClipboard('composer require urisocial/sdk', setCopiedPhp)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: copiedPhp ? '#10B981' : '#6B7280',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                  }}
                >
                  {copiedPhp ? <Check size={18} /> : <Copy size={18} />}
                </IconButton>
                <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', paddingRight: '40px' }}>
                  composer require urisocial/sdk
                </p>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card className="!ring-1 !ring-blue-100 bg-blue-50 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-700 text-[15px] leading-snug mb-2">
                  <strong>Requirements:</strong> PHP 7.4 or higher
                </p>
                <p className="text-gray-600 text-[14px] leading-snug">
                  Requires ext-json and ext-curl extensions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verify Installation */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Verify Installation</h2>

        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm">
          <CardHeader className="pb-3.5">
            <CardDescription className="text-gray-600 text-[14px]">
              Run a simple test to ensure the SDK is properly installed
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <Tabs
                value={verifyTab}
                onChange={(_, v) => setVerifyTab(v)}
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
                  onClick={() => copyToClipboard(getVerifyCode(), setCopiedVerify)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: copiedVerify ? '#10B981' : '#6B7280',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                  }}
                >
                  {copiedVerify ? <Check size={18} /> : <Copy size={18} />}
                </IconButton>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
                  {getVerifyCode()}
                </pre>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Next Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Quick Start',
              description: 'Make your first API call',
              href: '/docs/quickstart',
            },
            {
              title: 'Authentication',
              description: 'Set up API authentication',
              href: '/docs/authentication',
            },
            {
              title: 'Examples',
              description: 'View code examples',
              href: '/docs/examples',
            },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="h-full !ring-1 !ring-gray-100 hover:!ring-pink-200 hover:shadow-sm transition-all duration-200 group bg-white cursor-pointer">
                <CardHeader className="p-5">
                  <CardTitle className="text-lg font-semibold mb-1.5 group-hover:text-pink-700 transition-colors flex items-center justify-between">
                    {link.title}
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-pink-600 transition-all duration-200 group-hover:translate-x-0.5" />
                  </CardTitle>
                  <CardDescription className="text-[15px] text-gray-600 leading-snug">
                    {link.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="!ring-1 !ring-pink-100 bg-pink-50 shadow-sm">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Get Your API Key</h2>
          <p className="text-[15px] text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Sign up for a free account to get your API key and start building.
          </p>
          <Button asChild size="lg" className="h-11 px-7 text-[15px] font-semibold shadow-md hover:shadow-lg transition-all" style={{ backgroundColor: '#CD1B78', color: 'white' }}>
            <Link href="/signup">
              Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
