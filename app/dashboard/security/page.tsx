'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DeveloperLayout } from '@/components/layout/DeveloperLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, EyeOff, CheckCircle2, AlertCircle, Lock, Mail } from 'lucide-react';
import { authApi } from '@/lib/auth';

export default function SecurityPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Client-side validation
    if (!currentPassword) {
      setError('Current password is required');
      return;
    }

    if (currentPassword.length < 8) {
      setError('Current password must be at least 8 characters');
      return;
    }

    if (!newPassword) {
      setError('New password is required');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }

    // Password strength validation
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      setError('New password must contain at least one uppercase letter, one lowercase letter, and one number');
      return;
    }

    if (!confirmPassword) {
      setError('Please confirm your new password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from current password');
      return;
    }

    setIsLoading(true);

    try {
      await authApi.changePassword(currentPassword, newPassword);
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Redirect to settings after 2 seconds
      setTimeout(() => {
        router.push('/dashboard/settings');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DeveloperLayout>
      <div className="space-y-4 md:space-y-6 max-w-3xl">
        {/* Success Alert */}
        {success && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
            <AlertDescription className="text-green-800 text-sm">
              Password changed successfully! Redirecting...
            </AlertDescription>
          </Alert>
        )}

        {/* Change Password */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="p-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#CD1B7820' }}
              >
                <Lock className="w-4 h-4" style={{ color: '#CD1B78' }} />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-base md:text-lg">Change Password</CardTitle>
                <CardDescription className="text-xs md:text-sm">Update your password to keep your account secure</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              {/* Current Password */}
              <div className="space-y-1.5">
                <Label htmlFor="current-password" className="text-sm font-medium">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-9 md:h-10 pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <Label htmlFor="new-password" className="text-sm font-medium">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Minimum 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-9 md:h-10 pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-9 md:h-10 pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || success}
                size="sm"
                className="w-full text-white font-semibold shadow-sm"
                style={{ backgroundColor: '#CD1B78' }}
              >
                {isLoading ? 'Changing Password...' : 'Change Password'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="p-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#CD1B7820' }}
              >
                <Shield className="w-4 h-4" style={{ color: '#CD1B78' }} />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-base md:text-lg">Security Tips</CardTitle>
                <CardDescription className="text-xs md:text-sm">Keep your account safe</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ul className="space-y-2 md:space-y-2.5">
              {[
                'Use a strong password with at least 8 characters',
                'Include a mix of uppercase, lowercase, numbers, and symbols',
                'Avoid using personal information in your password',
                'Never share your password with anyone',
                'Change your password regularly (every 90 days)',
                'Use a unique password for each account',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 md:gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] md:text-xs font-bold text-pink-600">{i + 1}</span>
                  </div>
                  <span className="text-gray-700 text-xs md:text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DeveloperLayout>
  );
}
