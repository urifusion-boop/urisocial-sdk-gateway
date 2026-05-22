'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Search, FileText, Code, Blocks, Key } from 'lucide-react';

const searchItems = [
  { title: 'Quick Start', href: '/docs/quickstart', icon: FileText, category: 'Documentation' },
  { title: 'Authentication', href: '/docs/authentication', icon: Key, category: 'Documentation' },
  { title: 'API Reference', href: '/api', icon: Code, category: 'Reference' },
  { title: 'Playground', href: '/playground', icon: Blocks, category: 'Tools' },
  { title: 'Widgets', href: '/widgets', icon: Blocks, category: 'Tools' },
  { title: 'API Keys', href: '/dashboard/keys', icon: Key, category: 'Dashboard' },
];

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-64"
      >
        <Search className="w-4 h-4" />
        <span>Search documentation...</span>
        <kbd className="ml-auto px-2 py-0.5 text-xs bg-white rounded border border-gray-300">⌘K</kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {['Documentation', 'Reference', 'Tools', 'Dashboard'].map((category) => {
            const items = searchItems.filter((item) => item.category === category);
            if (items.length === 0) return null;

            return (
              <CommandGroup key={category} heading={category}>
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.href}
                      onSelect={() => {
                        router.push(item.href);
                        setOpen(false);
                      }}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span>{item.title}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
