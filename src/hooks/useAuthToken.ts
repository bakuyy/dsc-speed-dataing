"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

/**
 * A custom hook to retrieve the authentication token from cookies.
 * It encapsulates the logic of checking both js-cookie and document.cookie.
 * @returns The authentication token string, or null if not found.
 */

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromCookie = Cookies.get('token');
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
      return;
    }

    // Fallback for when js-cookie might not be available or the cookie is httpOnly
    const tokenFromDocument = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
      
    setToken(tokenFromDocument || null);
  }, []);

  return token;
} 