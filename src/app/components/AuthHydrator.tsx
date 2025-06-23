'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { login, logout } from '@/store/loginTokenSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuthToken } from '@/hooks/useAuthToken';

export function AuthHydrator() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthToken();

  useEffect(() => {
    if (token === null) {
      // Hook is still determining token status
      return;
    }

    const validateSession = async () => {
      try {
        if (!token) {
          console.log('[Auth Hydration] No token found');
          dispatch(logout());
          setIsLoading(false);
          return;
        }

        console.log('[Auth Hydration] Attempting to fetch user data...');
        const response = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data) {
          console.log('[Auth Hydration] Session restored for:', response.data.name);
          dispatch(login({
            name: response.data.name,
            token: token,
            role: response.data.role
          }));
        } else {
          console.log('[Auth Hydration] Invalid session - no user data');
          dispatch(logout());
          router.push('/');
        }
      } catch (error) {
        console.error('[Auth Hydration] Error validating session:', error);
        dispatch(logout());
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, [token, dispatch, router]);

  if (isLoading) {
    return null; // or return a loading spinner if you want
  }

  return null;
} 