'use client';

import { useEffect, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setCredentials } from './store/auth-slice';

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { developer } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is logged in on mount by fetching profile (uses cookies)
    const fetchDeveloperProfile = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://sdk-gateway.urisocial.com'}/api/v1/auth/me`, {
          credentials: 'include', // Use cookies for auth
        });

        if (response.ok) {
          const developerData = await response.json();
          dispatch(setCredentials({ developer: developerData }));
        }
      } catch (error) {
        console.error('Failed to fetch developer profile:', error);
      }
    };

    // Only fetch if we don't have developer data yet
    if (!developer) {
      fetchDeveloperProfile();
    }
  }, [developer, dispatch]);

  return <>{children}</>;
}
