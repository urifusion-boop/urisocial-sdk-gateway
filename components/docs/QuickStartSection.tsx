import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/custom/CodeBlock';
import { LanguageTabs } from '@/components/ui/custom/LanguageTabs';
import { Terminal, Key, Rocket } from 'lucide-react';
import Link from 'next/link';

export function QuickStartSection() {
  return (
    <div className="space-y-8">
      {/* Installation */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <span className="text-pink-600 font-bold text-lg">1</span>
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Install the SDK
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Choose your preferred package manager</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <LanguageTabs
            examples={[
              { language: 'npm', label: 'npm', code: 'npm install @urisocial/sdk' },
              { language: 'yarn', label: 'yarn', code: 'yarn add @urisocial/sdk' },
              { language: 'pnpm', label: 'pnpm', code: 'pnpm add @urisocial/sdk' },
            ]}
          />
        </CardContent>
      </Card>

      {/* Get API Key */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <span className="text-pink-600 font-bold text-lg">2</span>
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Get Your API Keys
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Create API keys from your dashboard</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Navigate to{' '}
            <Link href="/dashboard/keys" className="text-pink-600 font-semibold hover:underline">
              Dashboard → API Keys
            </Link>{' '}
            and create a new key. Store it securely in your environment variables.
          </p>
          <CodeBlock
            code={`# .env.local
URISOCIAL_API_KEY=sk_live_your_api_key_here
URISOCIAL_WORKSPACE_ID=ws_your_workspace_id`}
            filename=".env.local"
          />
        </CardContent>
      </Card>

      {/* Initialize SDK */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <span className="text-pink-600 font-bold text-lg">3</span>
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Initialize and Use
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Create your first post</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <LanguageTabs
            examples={[
              {
                language: 'typescript',
                label: 'TypeScript',
                code: `import { URISocialSDK } from '@urisocial/sdk';

// Initialize the SDK
const sdk = new URISocialSDK({
  apiKey: process.env.URISOCIAL_API_KEY!,
  workspaceId: process.env.URISOCIAL_WORKSPACE_ID!,
});

// Create and schedule a post
async function createPost() {
  const post = await sdk.posts.create({
    content: 'Hello from URI Social SDK! 🚀',
    platforms: ['instagram', 'facebook', 'linkedin'],
    scheduleFor: new Date('2026-05-25T10:00:00Z'),
  });

  console.log('✅ Post created:', post.id);
  return post;
}`,
                filename: 'app.ts',
              },
              {
                language: 'javascript',
                label: 'JavaScript',
                code: `const { URISocialSDK } = require('@urisocial/sdk');

// Initialize the SDK
const sdk = new URISocialSDK({
  apiKey: process.env.URISOCIAL_API_KEY,
  workspaceId: process.env.URISOCIAL_WORKSPACE_ID,
});

// Create and schedule a post
async function createPost() {
  const post = await sdk.posts.create({
    content: 'Hello from URI Social SDK! 🚀',
    platforms: ['instagram', 'facebook', 'linkedin'],
    scheduleFor: new Date('2026-05-25T10:00:00Z'),
  });

  console.log('✅ Post created:', post.id);
  return post;
}`,
                filename: 'app.js',
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
