'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from "../../../../public/images/logo.png";
import Image from "next/image";
import Cookies from 'js-cookie';

const AdminVerifyPage = () => {
  const router = useRouter();
  const { name, role } = useSelector((state: RootState) => state.auth);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAdminAccess = () => {
      const cookieRole = Cookies.get('role');
      const reduxRole = role;
      
      console.log('[Admin Verify] Checking admin access:', { cookieRole, reduxRole });
      
      if (cookieRole === 'admin' || reduxRole === 'admin') {
        console.log('[Admin Verify] Admin access confirmed');
        setIsCheckingAuth(false);
      } else if (cookieRole && cookieRole !== 'admin') {
        console.log('[Admin Verify] User is not admin, redirecting to dashboard');
        router.push('/dashboard');
      } else if (!cookieRole && !reduxRole) {
        console.log('[Admin Verify] Still loading authentication state');
        setTimeout(checkAdminAccess, 500);
      } else {
        console.log('[Admin Verify] No authentication found, redirecting to login');
        router.push('/');
      }
    };

    checkAdminAccess();
  }, [role, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Use server-side API for admin password verification
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        console.log('[Admin Verify] Password correct, redirecting to admin panel');
        router.push('/admin');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Incorrect admin password');
        setPassword('');
      }
    } catch (error) {
      console.error('[Admin Verify] Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="mt-4 text-[#374995] text-lg">Verifying admin access</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E6EFFD] p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src={Logo} alt="Logo" className="w-3/4 h-auto mx-auto mb-6"/>
          <h1 className="text-3xl font-bold text-[#374995] mb-2">Admin Verification</h1>
          <p className="text-gray-600">
            Welcome, <span className="font-semibold text-[#374995]">{name}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please enter the admin password to continue
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-[#374995]">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-[#374995] rounded-full p-4">
              <FaLock className="text-white text-2xl" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#374995] rounded-lg pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-[#374995] focus:ring-opacity-50 transition-all"
                  placeholder="Enter admin password"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-[#374995] text-lg" />
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-[#374995] text-lg cursor-pointer" />
                  ) : (
                    <FaEye className="text-[#374995] text-lg cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#374995] text-white py-3 px-4 rounded-lg hover:bg-[#5989fc] focus:outline-none focus:ring-2 focus:ring-[#374995] focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Access Admin Panel'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-[#374995] hover:text-[#5989fc] font-medium transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            This is an additional security measure for admin access
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminVerifyPage; 