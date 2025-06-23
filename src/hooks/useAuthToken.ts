'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  email?: string;
  [key: string]: any;
}

export function useAuthToken(): string | null {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('auth-token'); // or whatever your cookie name is
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setEmail(decoded.email || null);
      } catch (err) {
        console.error('Invalid JWT token', err);
        setEmail(null);
      }
    }
  }, []);

  return email;
}