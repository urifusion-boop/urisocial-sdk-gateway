import { LandingNavbar } from '@/components/home/LandingNavbar';
import { HeroSection } from '@/components/home/HeroSection';
import { QuickStartSection } from '@/components/home/QuickStartSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import Link from 'next/link';
import { ArrowRight, Code } from 'lucide-react';

export default function Home() {
  return (
    <>
      <LandingNavbar />
      <main className="min-h-screen">
        <HeroSection />
        <QuickStartSection />
        <FeaturesSection />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join developers building the next generation of social media management tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs"
                className="comic-btn px-10 py-5 rounded-xl text-lg flex items-center justify-center gap-2"
                style={{ backgroundColor: 'hsl(340, 74%, 42%)', color: 'white' }}
              >
                Read Documentation
                <ArrowRight size={22} />
              </Link>
              <Link
                href="https://dashboard.urisocial.com"
                className="px-10 py-5 rounded-xl text-lg font-bold bg-white border-2 border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
              >
                Get API Keys
                <Code size={22} />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} URI Social. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
