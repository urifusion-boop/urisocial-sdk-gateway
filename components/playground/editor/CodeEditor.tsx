'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCw, Copy } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  isRunning: boolean;
}

export function CodeEditor({ code, onChange, onRun, isRunning }: CodeEditorProps) {
  const examples = [
    { value: 'create-post', label: 'Create Post' },
    { value: 'ai-content', label: 'Generate AI Content' },
    { value: 'list-workspaces', label: 'List Workspaces' },
    { value: 'connect-account', label: 'Connect Account' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="border-b bg-gray-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700">Code Editor</span>
          <Select defaultValue="create-post">
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Load example" />
            </SelectTrigger>
            <SelectContent>
              {examples.map((example) => (
                <SelectItem key={example.value} value={example.value}>
                  {example.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" onClick={() => onChange('')}>
          <RotateCw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-hidden">
        <Textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="h-full font-mono text-sm border-0 resize-none rounded-none focus-visible:ring-0 bg-gray-900 text-gray-100"
          placeholder="Write your code here..."
          spellCheck={false}
        />
      </div>

      {/* Action Bar */}
      <div className="border-t p-4 flex items-center justify-between bg-gray-50">
        <Button
          onClick={onRun}
          disabled={isRunning}
          style={{ backgroundColor: '#CD1B78' }}
          className="text-white"
        >
          {isRunning ? (
            <>
              <RotateCw className="w-4 h-4 mr-2 animate-spin" />
              Running...
            </>
          ) : (
            'Run Code'
          )}
        </Button>
        <Button variant="outline" size="sm">
          <Copy className="w-4 h-4 mr-2" />
          Copy Code
        </Button>
      </div>
    </div>
  );
}
