'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { login, logout } from '@/store/loginTokenSlice';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';

export function AuthHydrator() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const validateSession = async () => {
      const token = Cookies.get('token');
      
      if (!token) {
        console.log('[Auth Hydration] No token found');
        dispatch(logout());
        return;
      }

      try {
        const response = await axios.get('/api/dsc/validate-session', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          console.log('[Auth Hydration] Session restored for:', response.data.name);
          dispatch(login({
            name: response.data.name,
            token: token,
            role: response.data.role
          }));
        } else {
          console.log('[Auth Hydration] Invalid session');
          dispatch(logout());
          router.push('/');
        }
      } catch (error) {
        console.error('[Auth Hydration] Error validating session:', error);
        dispatch(logout());
        router.push('/');
      }
    };

    validateSession();
  }, [dispatch, router]);

  return null;
} 