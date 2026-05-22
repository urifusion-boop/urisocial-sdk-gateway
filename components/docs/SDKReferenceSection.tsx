import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/custom/CodeBlock';

export function SDKReferenceSection() {
  const methods = {
    posts: {
      create: `// Create a new post
const post = await sdk.posts.create({
  content: 'Your post content here',
  platforms: ['instagram', 'facebook', 'linkedin'],
  scheduleFor: new Date('2026-05-25T10:00:00Z'),
  images: ['https://example.com/image.jpg'] // optional
});`,
      list: `// List all posts
const posts = await sdk.posts.list({
  limit: 50,
  status: 'scheduled', // 'draft', 'scheduled', 'published', 'failed'
  platform: 'instagram' // optional filter
});`,
      get: `// Get a specific post
const post = await sdk.posts.get('post_id');`,
      update: `// Update a post
const updatedPost = await sdk.posts.update('post_id', {
  content: 'Updated content',
  scheduleFor: new Date('2026-05-26T12:00:00Z')
});`,
      delete: `// Delete a post
await sdk.posts.delete('post_id');`,
    },
    workspaces: {
      create: `// Create a new workspace
const workspace = await sdk.workspaces.create({
  name: 'Acme Corp Marketing',
  plan: 'pro' // 'free', 'pro', 'enterprise'
});`,
      list: `// List all workspaces
const workspaces = await sdk.workspaces.list();`,
      switch: `// Switch active workspace
sdk.setWorkspace('workspace_id');`,
    },
    ai: {
      generateContent: `// Generate AI content
const content = await sdk.ai.generateContent({
  prompt: 'Write an engaging post about sustainable fashion',
  platform: 'instagram',
  tone: 'professional', // 'casual', 'professional', 'playful'
  length: 'medium' // 'short', 'medium', 'long'
});`,
      generateImage: `// Generate AI image
const image = await sdk.ai.generateImage({
  prompt: 'Modern sustainable fashion, eco-friendly',
  size: '1080x1350', // Instagram portrait
  style: 'photographic' // 'photographic', 'digital-art', 'cinematic'
});`,
    },
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">SDK Reference</h2>
      <Card>
        <CardHeader>
          <CardTitle>Common Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
              <TabsTrigger value="ai">AI Generation</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Create Post</h3>
                <CodeBlock code={methods.posts.create} language="typescript" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">List Posts</h3>
                <CodeBlock code={methods.posts.list} language="typescript" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Get Post</h3>
                <CodeBlock code={methods.posts.get} language="typescript" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Update Post</h3>
                <CodeBlock code={methods.posts.update} language="typescript" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Delete Post</h3>
                <CodeBlock code={methods.posts.delete} language="typescript" />
              </div>
            </TabsContent>

            <TabsContent value="workspaces" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Create Workspace</h3>
                <CodeBlock code={methods.workspaces.create} language="typescript" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">List Workspaces</h3>
                <CodeBlock code={methods.workspaces.list} language="typescript" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Switch Workspace</h3>
                <CodeBlock code={methods.workspaces.switch} language="typescript" />
              </div>
            </TabsContent>

            <TabsContent value="ai" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Generate Content</h3>
                <CodeBlock code={methods.ai.generateContent} language="typescript" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Generate Image</h3>
                <CodeBlock code={methods.ai.generateImage} language="typescript" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
