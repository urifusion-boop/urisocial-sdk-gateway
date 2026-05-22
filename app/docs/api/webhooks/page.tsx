'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Webhook, Shield, AlertCircle, CheckCircle2, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Box, Tab, Tabs, IconButton } from '@mui/material';
import { useState } from 'react';

export default function WebhooksPage() {
  const [createTab, setCreateTab] = useState('javascript');
  const [verifyTab, setVerifyTab] = useState('javascript');
  const [copiedCreate, setCopiedCreate] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedVerify, setCopiedVerify] = useState(false);
  const [copiedTest, setCopiedTest] = useState(false);

  const getCreateCode = () => {
    if (createTab === 'javascript') {
      return `const webhook = await client.webhooks.create({
  url: 'https://your-app.com/webhooks/urisocial',
  events: ['post.created', 'post.published', 'post.failed'],
  secret: 'your_webhook_secret'
});

console.log('Webhook created:', webhook.id);`;
    }
    if (createTab === 'python') {
      return `webhook = client.webhooks.create(
    url='https://your-app.com/webhooks/urisocial',
    events=['post.created', 'post.published', 'post.failed'],
    secret='your_webhook_secret'
)

print(f'Webhook created: {webhook.id}')`;
    }
    return `curl -X POST https://sdk-gateway.urisocial.com/api/v1/webhooks \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.com/webhooks/urisocial",
    "events": ["post.created", "post.published"],
    "secret": "your_webhook_secret"
  }'`;
  };

  const getVerifyCode = () => {
    if (verifyTab === 'javascript') {
      return `import crypto from 'crypto';

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

// In your webhook endpoint
app.post('/webhooks/urisocial', (req, res) => {
  const signature = req.headers['x-urisocial-signature'];
  const payload = JSON.stringify(req.body);

  if (!verifyWebhookSignature(payload, signature, WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }

  // Process webhook
  console.log('Valid webhook:', req.body);
  res.status(200).send('OK');
});`;
    }
    return `import hmac
import hashlib

def verify_webhook_signature(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(signature, expected)

# In your webhook endpoint
@app.route('/webhooks/urisocial', methods=['POST'])
def webhook():
    signature = request.headers.get('X-URISocial-Signature')
    payload = request.get_data(as_text=True)

    if not verify_webhook_signature(payload, signature, WEBHOOK_SECRET):
        return 'Invalid signature', 401

    # Process webhook
    data = request.json
    print('Valid webhook:', data)
    return 'OK', 200`;
  };

  const payloadCode = `{
  "id": "evt_1234567890",
  "type": "post.published",
  "created_at": "2026-05-22T10:30:00Z",
  "data": {
    "post_id": "post_abc123",
    "content": "Hello from URI Social!",
    "platforms": ["instagram", "twitter"],
    "status": "published",
    "published_at": "2026-05-22T10:30:00Z"
  }
}`;

  const testCode = `await client.webhooks.test('webhook_id', {
  event: 'post.published'
});

// Your endpoint will receive a test payload`;

  const copyToClipboard = async (text: string, setter: (value: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="pb-10">
      <div className="mb-12 pt-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight tracking-tight">
          Webhooks
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          Set up webhooks to receive real-time notifications when events occur in your URI Social account.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Available Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { event: 'post.created', description: 'Triggered when a new post is created' },
            { event: 'post.published', description: 'Triggered when a post is successfully published' },
            { event: 'post.failed', description: 'Triggered when post publishing fails' },
            { event: 'post.deleted', description: 'Triggered when a post is deleted' },
            { event: 'account.connected', description: 'Triggered when a social account is connected' },
            { event: 'account.disconnected', description: 'Triggered when a social account is removed' },
          ].map((item) => (
            <Card key={item.event} className="!ring-1 !ring-gray-100 hover:!ring-pink-200 hover:shadow-sm transition-all duration-200 bg-white">
              <CardContent className="p-4">
                <code className="text-sm font-mono font-semibold block mb-1.5" style={{ color: '#CD1B78' }}>
                  {item.event}
                </code>
                <p className="text-gray-600 text-[14px] leading-snug">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Creating a Webhook</h2>
        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm">
          <CardContent className="p-5">
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <Tabs
                value={createTab}
                onChange={(_, v) => setCreateTab(v)}
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
                  onClick={() => copyToClipboard(getCreateCode(), setCopiedCreate)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: copiedCreate ? '#10B981' : '#6B7280',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                  }}
                >
                  {copiedCreate ? <Check size={18} /> : <Copy size={18} />}
                </IconButton>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
                  {getCreateCode()}
                </pre>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Webhook Payload</h2>
        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm">
          <CardHeader className="pb-3.5">
            <CardDescription className="text-gray-600 text-[14px]">
              Example payload structure sent to your webhook endpoint
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative' }}>
                <IconButton
                  onClick={() => copyToClipboard(payloadCode, setCopiedPayload)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: copiedPayload ? '#10B981' : '#6B7280',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                  }}
                >
                  {copiedPayload ? <Check size={18} /> : <Copy size={18} />}
                </IconButton>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
                  {payloadCode}
                </pre>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: '#CD1B78' }}>
            <Shield className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Verifying Webhooks</h2>
        </div>

        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm mb-6">
          <CardHeader className="pb-3.5">
            <CardTitle className="text-xl font-semibold">Signature Verification</CardTitle>
            <CardDescription className="text-gray-600 text-[14px] mt-0.5">
              Always verify webhook signatures to ensure authenticity
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

        <Card className="!ring-1 !ring-orange-100 bg-orange-50 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-700 text-[15px] leading-snug mb-2">
                  <strong>Security Best Practices</strong>
                </p>
                <ul className="space-y-1.5 text-gray-600 text-[14px] leading-snug">
                  <li>• Always verify webhook signatures</li>
                  <li>• Use HTTPS for webhook URLs</li>
                  <li>• Store webhook secrets securely</li>
                  <li>• Implement replay attack prevention</li>
                  <li>• Return 200 status quickly to avoid retries</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Retry Logic</h2>
        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm">
          <CardContent className="p-5">
            <p className="text-gray-700 text-[15px] leading-snug mb-4">
              If your endpoint fails to respond with a 2xx status code, URI Social will retry with exponential backoff:
            </p>
            <ul className="space-y-2.5">
              {[
                'Immediate retry',
                'Retry after 5 minutes',
                'Retry after 30 minutes',
                'Retry after 2 hours',
                'Final retry after 6 hours',
              ].map((retry, index) => (
                <li key={index} className="flex items-start gap-2.5 p-2.5 rounded-md bg-gray-50">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#CD1B78' }}>
                    <span className="text-white text-[10px] font-bold">{index + 1}</span>
                  </div>
                  <span className="text-gray-700 text-[15px] leading-snug">{retry}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">Testing Webhooks</h2>
        <Card className="!ring-1 !ring-gray-100 bg-white shadow-sm">
          <CardHeader className="pb-3.5">
            <CardTitle className="text-xl font-semibold">Send Test Event</CardTitle>
            <CardDescription className="text-gray-600 text-[14px] mt-0.5">
              Trigger a test webhook to verify your endpoint
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <Box sx={{ p: 3, backgroundColor: '#FAFAFA', position: 'relative' }}>
                <IconButton
                  onClick={() => copyToClipboard(testCode, setCopiedTest)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: copiedTest ? '#10B981' : '#6B7280',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                  }}
                >
                  {copiedTest ? <Check size={18} /> : <Copy size={18} />}
                </IconButton>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#1a1a1a', whiteSpace: 'pre-wrap', paddingRight: '40px' }}>
                  {testCode}
                </pre>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>

      <Card className="!ring-1 !ring-pink-100 bg-pink-50 shadow-sm">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Ready to Set Up Webhooks?</h2>
          <p className="text-[15px] text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Start receiving real-time notifications for your social media activities.
          </p>
          <Button asChild size="lg" className="h-11 px-7 text-[15px] font-semibold shadow-md hover:shadow-lg transition-all" style={{ backgroundColor: '#CD1B78', color: 'white' }}>
            <Link href="/dashboard/webhooks">
              Configure Webhooks <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
