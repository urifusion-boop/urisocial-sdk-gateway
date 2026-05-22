import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LanguageTabs } from '@/components/ui/custom/LanguageTabs';

export function QuickStartSection() {
  const examples = [
    {
      language: 'npm',
      label: 'npm',
      code: `# Install the SDK
npm install @urisocial/sdk`,
    },
    {
      language: 'yarn',
      label: 'yarn',
      code: `# Install the SDK
yarn add @urisocial/sdk`,
    },
    {
      language: 'pnpm',
      label: 'pnpm',
      code: `# Install the SDK
pnpm add @urisocial/sdk`,
    },
  ];

  const codeExample = {
    language: 'typescript',
    label: 'TypeScript',
    code: `import { URISocialSDK } from '@urisocial/sdk';

// Initialize the SDK
const sdk = new URISocialSDK({
  apiKey: process.env.URISOCIAL_API_KEY,
  workspaceId: 'your-workspace-id',
});

// Create a post
const post = await sdk.posts.create({
  content: 'Hello from URI Social SDK!',
  platforms: ['instagram', 'facebook'],
  scheduleFor: new Date('2026-05-25T10:00:00Z'),
});

console.log('Post created:', post.id);`,
    filename: 'app.ts',
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Get Started in <span className="text-gradient-primary">Minutes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Install the SDK and start building powerful social media features for your users.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Installation */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">1. Install the Package</h3>
            <LanguageTabs examples={examples} />
          </div>

          {/* Usage */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">2. Initialize and Use</h3>
            <LanguageTabs examples={[codeExample]} />
          </div>

          <div className="text-center">
            <Link
              href="/docs/quickstart"
              className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold text-lg"
            >
              View Full Documentation
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
