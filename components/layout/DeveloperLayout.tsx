'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DeveloperNavbar } from './DeveloperNavbar';
import { AppSidebar } from './AppSidebar';
import { useAuth } from '@/lib/auth-context';

export function DeveloperLayout({ children }: { children: React.ReactNode }) {
  const { developer, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !developer) {
      router.push('/login');
    }
  }, [developer, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!developer) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DeveloperNavbar />
      <div className="pt-16 flex">
        <AppSidebar />
        <main className="flex-1 p-8 max-w-[1400px]">{children}</main>
      </div>
    </div>
  );
}
