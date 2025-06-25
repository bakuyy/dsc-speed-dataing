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
      console.log('[Auth Hydration] Starting session validation...');
      try {
        // Get token from js-cookie (more reliable than document.cookie parsing)
        const token = Cookies.get('token');
        console.log('[Auth Hydration] Token from cookies:', token ? 'present' : 'not found');
        
        if (!token) {
          console.log('[Auth Hydration] No token found, logging out');
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
          dispatch(login({
            name: response.data.name,
            token: token,
            role: response.data.role
          }));
          setIsLoading(false);
        } else {
          console.log('[Auth Hydration] Invalid session - no user data');
          dispatch(logout());
          setIsLoading(false);
          // Only redirect if we're not already on the home page
          if (window.location.pathname !== '/') {
            router.push('/');
          }
        }
      } catch (error: any) {
        console.error('[Auth Hydration] Error validating session:', error.response?.status, error.response?.data || error.message);
        dispatch(logout());
        setIsLoading(false);
        // Only redirect if we're not already on the home page
        if (window.location.pathname !== '/') {
          router.push('/');
        }
      }
    };

    validateSession();
  }, [dispatch, router]);

  if (isLoading) {
    return null; // or return a loading spinner if you want
  }

  return null;
} 