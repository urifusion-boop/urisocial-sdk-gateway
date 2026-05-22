'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import { useSignupMutation } from '@/lib/store/api';
import { useAppDispatch } from '@/lib/store/hooks';
import { setCredentials } from '@/lib/store/auth-slice';

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signup, { isLoading }] = useSignupMutation();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    company_name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Signup - cookies are set automatically by the server
      await signup(formData).unwrap();

      // Fetch developer profile using the cookie
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://sdk-gateway.urisocial.com'}/api/v1/auth/me`, {
        credentials: 'include', // Include cookies
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const developer = await response.json();

      // Store developer in Redux
      dispatch(setCredentials({ developer }));

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.data?.detail || err.message || 'Signup failed');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h1>
        <p className="text-gray-600">Start building with URI Social API</p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First name</Label>
            <Input
              id="first_name"
              type="text"
              placeholder="John"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              disabled={isLoading}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">Last name</Label>
            <Input
              id="last_name"
              type="text"
              placeholder="Doe"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              disabled={isLoading}
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={isLoading}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company_name">Company name (optional)</Label>
          <Input
            id="company_name"
            type="text"
            placeholder="Your company"
            value={formData.company_name}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
            disabled={isLoading}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={isLoading}
            className="h-11"
          />
          <p className="text-xs text-gray-500">Must be at least 8 characters</p>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 text-base font-semibold"
          style={{ backgroundColor: '#CD1B78' }}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-pink-600 hover:text-pink-700 font-semibold">
            Sign in
          </Link>
        </p>
      </div>

      {/* Terms */}
      <p className="mt-6 text-xs text-center text-gray-500">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="underline hover:text-gray-700">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline hover:text-gray-700">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
