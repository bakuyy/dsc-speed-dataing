'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { login, logout } from '@/store/loginTokenSlice';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';

export function AuthHydrator() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        // Try to get token from both js-cookie and document.cookie
        const token = Cookies.get('token') || document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        console.log('[Auth Hydration] Token from cookies:', token);
        
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
        console.log('[Auth Hydration] User data response:', response.data);
        
        if (response.data) {
          console.log('[Auth Hydration] Session restored for:', response.data.name);
          // Add a small delay to ensure Redux store is ready
          setTimeout(() => {
            dispatch(login({
              name: response.data.name,
              token: token,
              role: response.data.role
            }));
            setIsLoading(false);
          }, 100);
        } else {
          console.log('[Auth Hydration] Invalid session - no user data');
          dispatch(logout());
          setIsLoading(false);
          router.push('/');
        }
      } catch (error) {
        console.error('[Auth Hydration] Error validating session:', error);
        dispatch(logout());
        setIsLoading(false);
        router.push('/');
      }
    };

    validateSession();
  }, [dispatch, router]);

  if (isLoading) {
    return null; // or return a loading spinner if you want
  }

  return null;
} 