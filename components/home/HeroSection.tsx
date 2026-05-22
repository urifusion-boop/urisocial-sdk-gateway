import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 gradient-radial-primary halftone-bg-light" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200 mb-6">
            <Sparkles size={16} className="text-pink-600" />
            <span className="text-sm font-bold text-pink-600 uppercase tracking-wide">
              Enterprise-Ready SDK
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Build Multi-Tenant
            <br />
            <span className="text-gradient-primary">Social Media Apps</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Embed powerful social media management into your product. Post scheduling, analytics, AI content
            generation, and multi-platform publishing — all in one SDK.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="comic-btn text-base" style={{ backgroundColor: '#CD1B78' }}>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/docs">
                View Documentation
              </Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-600" />
              <span className="font-semibold">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-yellow-600" />
              <span className="font-semibold">5-Minute Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-blue-600" />
              <span className="font-semibold">6+ Platforms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
