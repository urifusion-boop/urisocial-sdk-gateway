'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/custom/CodeBlock';

interface OutputPanelProps {
  output: string;
  logs: string[];
}

export function OutputPanel({ output, logs }: OutputPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="response" className="h-full flex flex-col">
        <div className="border-b bg-gray-50">
          <TabsList className="w-full justify-start rounded-none bg-transparent p-0 h-12">
            <TabsTrigger
              value="response"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-600 data-[state=active]:bg-transparent"
            >
              Response
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-600 data-[state=active]:bg-transparent"
            >
              Console ({logs.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="response" className="h-full m-0 p-6">
            {output ? (
              <CodeBlock code={output} language="json" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <div className="text-6xl mb-4">▶️</div>
                  <p className="text-lg font-semibold">Run your code to see the output</p>
                  <p className="text-sm mt-2">Results will appear here</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="logs" className="h-full m-0 p-6">
            {logs.length > 0 ? (
              <div className="space-y-2 font-mono text-sm">
                {logs.map((log, i) => (
                  <div key={i} className="text-gray-700">
                    <span className="text-gray-400 mr-2">[{i + 1}]</span>
                    {log}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>No console logs yet</p>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
