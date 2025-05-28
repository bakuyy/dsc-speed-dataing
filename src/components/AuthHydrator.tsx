import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { login, logout } from '@/store/loginTokenSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';

export function AuthHydrator() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams(); // Get query parameters

  useEffect(() => {
    const validateSession = async () => {
      const isLogout = searchParams.get('logout') === 'true';
      if (isLogout) {
        console.log('[AuthHydrator] Skipping validation due to logout');
        dispatch(logout());
        return;
      }

      const token = Cookies.get('token');
      console.log('[AuthHydrator] Token:', token);

      if (!token) {
        console.log('[Auth Hydration] No token found');
        dispatch(logout());
        router.push('/');
        return;
      }

      try {
        const response = await axios.get('/api/dsc/validate-session', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          console.log('[Auth Hydration] Session restored for:', response.data.name);
          dispatch(login({
            name: response.data.name,
            token: token,
            role: response.data.role,
          }));
        } else {
          console.log('[Auth Hydration] Invalid session');
          Cookies.remove('token', { path: '/' });
          dispatch(logout());
          router.push('/');
        }
      } catch (error) {
        console.error('[Auth Hydration] Error validating session:', error);
        Cookies.remove('token', { path: '/' });
        dispatch(logout());
        router.push('/');
      }
    };

    validateSession();
  }, [dispatch, router, searchParams]);

  return null;
}