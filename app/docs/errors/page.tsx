'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertCircle, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Box, Tab, Tabs, IconButton } from '@mui/material';
import { useState } from 'react';

export default function ErrorHandlingPage() {
  const [handlingTab, setHandlingTab] = useState('javascript');
  const [copiedFormat, setCopiedFormat] = useState(false);
  const [copiedHandling, setCopiedHandling] = useState(false);

  const formatCode = `{
  "error": {
    "code": "invalid_request",
    "message": "Missing required parameter: content",
    "details": {
      "field": "content",
      "requirement": "Content is required for post creation"
    }
  }
}`;

  const getHandlingCode = () => {
    if (handlingTab === 'javascript') {
      return `try {
  const post = await client.posts.create({
    content: 'Hello World',
    platforms: ['instagram']
  });
  console.log('Success:', post);
} catch (error) {
  if (error.status === 401) {
    console.error('Authentication failed. Check your API key.');
  } else if (error.status === 429) {
    console.error('Rate limit exceeded. Please retry later.');
  } else if (error.status >= 500) {
    console.error('Server error. Please try again.');
  } else {
    console.error('Error:', error.message);
  }
}`;
    }
    return `try:
    post = client.posts.create(
        content='Hello World',
        platforms=['instagram']
    )
    print('Success:', post)
except URISocialError as error:
    if error.status_code == 401:
        print('Authentication failed. Check your API key.')
    elif error.status_code == 429:
        print('Rate limit exceeded. Please retry later.')
    elif error.status_code >= 500:
        print('Server error. Please try again.')
    else:
        print('Error:', error.message)`;
  };

  const copyToClipboard = async (text: string, setter: (value: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="pb-10">
      <div className="mb-12 pt-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight tracking-tight">
          Error Handling
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          Learn how to handle errors gracefully in your URI Social SDK integration.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">HTTP Status Codes</h2>
        <div className="space-y-3">
          {[
            { code: '200', type: 'Success', desc: 'OK - Request succeeded' },
            { code: '201', type: 'Success', desc: 'Created - Resource created successfully' },
            { code: '400', type: 'Client Error', desc: 'Bad Request - Invalid parameters' },
            { code: '401', type: 'Client Error', desc: 'Unauthorized - Invalid or missing API key' },
            { code: '403', type: 'Client Error', desc: 'Forbidden - Insufficient permissions' },
            { code: '404', type: 'Client Error', desc: 'Not Found - Resource not found' },
            { code: '429', type: 'Client Error', desc: 'Too Many Requests - Rate limit exceeded' },
            { code: '500', type: 'Server Error', desc: 'Internal Server Error - Something went wrong' },
          ].map((error) => (
            <Card key={error.code} className="!ring-1 !ring-gray-100 hover:!ring-pink-200 hover:shadow-sm transition-all duration-200 bg-white">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <code className="text-base font-mono font-bold px-3 py-1 bg-gray-100 rounded min-w-[70px] text-center" style={{ color: '#CD1B78' }}>
                    {error.code}
                  </code>
                  <div className="flex-1">
                    <p className="text-gray-900 font-semibold text-[15px] mb-0.5">{error.type}</p>
                    <p className="text-gray-600 text-[14px] leading-snug">{error.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Error Response Format</h2>
        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm">
          <CardContent className="p-5">
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative' }}>
                <IconButton
                  onClick={() => copyToClipboard(formatCode, setCopiedFormat)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: copiedFormat ? '#10B981' : '#6B7280',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                  }}
                >
                  {copiedFormat ? <Check size={18} /> : <Copy size={18} />}
                </IconButton>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
                  {formatCode}
                </pre>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Handling Errors</h2>
        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm">
          <CardContent className="p-5">
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <Tabs
                value={handlingTab}
                onChange={(_, v) => setHandlingTab(v)}
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
              </Tabs>

              <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative' }}>
                <IconButton
                  onClick={() => copyToClipboard(getHandlingCode(), setCopiedHandling)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: copiedHandling ? '#10B981' : '#6B7280',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                  }}
                >
                  {copiedHandling ? <Check size={18} /> : <Copy size={18} />}
                </IconButton>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
                  {getHandlingCode()}
                </pre>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>

      <Card className="!ring-1 !ring-blue-100 bg-blue-50 shadow-sm mb-8">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-700 text-[15px] leading-snug mb-2">
                <strong>Error Handling Best Practices</strong>
              </p>
              <ul className="space-y-1.5 text-gray-600 text-[14px] leading-snug">
                <li>• Always wrap API calls in try-catch blocks</li>
                <li>• Log errors for debugging purposes</li>
                <li>• Provide user-friendly error messages</li>
                <li>• Implement retry logic for transient errors</li>
                <li>• Monitor error rates in production</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="!ring-1 !ring-pink-100 bg-pink-50 shadow-sm">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Need Help?</h2>
          <p className="text-[15px] text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            If you're experiencing persistent errors, contact our support team for assistance.
          </p>
          <Button asChild size="lg" className="h-11 px-7 text-[15px] font-semibold shadow-md hover:shadow-lg transition-all" style={{ backgroundColor: '#CD1B78', color: 'white' }}>
            <Link href="/support">
              Contact Support <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
