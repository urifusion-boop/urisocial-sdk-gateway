'use client';

import { LandingNavbar } from '@/components/home/LandingNavbar';
import { useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { developer } = useAppSelector((state) => state.auth);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (developer) {
      router.push('/dashboard');
    }
  }, [developer, router]);

  // Don't render auth pages if already logged in
  if (developer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <LandingNavbar />

      {/* Main Content */}
      <div className="flex min-h-screen items-center justify-center px-4 py-8 pt-24">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Branding/Info */}
            <div className="hidden lg:flex flex-col justify-center space-y-6 pr-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Build Faster with{' '}
                  <span style={{ color: '#CD1B78' }}>URI Social SDK</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Ship powerful social media features in minutes. Join developers building the next generation of social platforms.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-pink-50 flex-shrink-0">
                    <svg className="w-5 h-5" style={{ color: '#CD1B78' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Multi-Platform Support</h3>
                    <p className="text-sm text-gray-600">Connect to Instagram, Twitter, LinkedIn, and Facebook with one API</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-pink-50 flex-shrink-0">
                    <svg className="w-5 h-5" style={{ color: '#CD1B78' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Lightning Fast</h3>
                    <p className="text-sm text-gray-600">Sub-100ms response times with 99.9% uptime SLA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-pink-50 flex-shrink-0">
                    <svg className="w-5 h-5" style={{ color: '#CD1B78' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Enterprise Security</h3>
                    <p className="text-sm text-gray-600">OAuth 2.0, rate limiting, and SOC 2 compliant infrastructure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
