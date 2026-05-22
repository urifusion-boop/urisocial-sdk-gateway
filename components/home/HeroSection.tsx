import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-gradient-to-br from-white via-pink-50/30 to-purple-50/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200/50 mb-6 sm:mb-8 shadow-sm">
            <Sparkles size={16} className="text-pink-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-pink-600 uppercase tracking-wide whitespace-nowrap">
              Enterprise-Ready SDK
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight mb-6 sm:mb-8 leading-[1.1]">
            <span className="block text-gray-900">Build Multi-Tenant</span>
            <span className="block bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
              Social Media Apps
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Embed powerful social media management into your product. Post scheduling, analytics, AI content generation, and multi-platform publishing — all in one SDK.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#CD1B78' }}
            >
              <Link href="/signup" className="flex items-center justify-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
            >
              <Link href="/docs" className="flex items-center justify-center">
                View Documentation
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base text-gray-600 px-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-50">
                <Shield size={16} className="text-green-600 flex-shrink-0" />
              </div>
              <span className="font-semibold whitespace-nowrap">Enterprise Security</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-50">
                <Zap size={16} className="text-yellow-600 flex-shrink-0" />
              </div>
              <span className="font-semibold whitespace-nowrap">5-Minute Setup</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50">
                <Globe size={16} className="text-blue-600 flex-shrink-0" />
              </div>
              <span className="font-semibold whitespace-nowrap">6+ Platforms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
