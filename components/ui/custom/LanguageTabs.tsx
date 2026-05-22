'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from './CodeBlock';

interface CodeExample {
  language: string;
  label: string;
  code: string;
  filename?: string;
}

interface LanguageTabsProps {
  examples: CodeExample[];
  defaultLanguage?: string;
}

export function LanguageTabs({ examples, defaultLanguage }: LanguageTabsProps) {
  return (
    <Tabs defaultValue={defaultLanguage || examples[0]?.language} className="w-full">
      <TabsList className="bg-gray-100">
        {examples.map((example) => (
          <TabsTrigger key={example.language} value={example.language}>
            {example.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {examples.map((example) => (
        <TabsContent key={example.language} value={example.language} className="mt-4">
          <CodeBlock code={example.code} language={example.language} filename={example.filename} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
