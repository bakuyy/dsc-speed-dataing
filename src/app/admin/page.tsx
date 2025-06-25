'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logo from "../../../public/images/logo.png";
import Image from "next/image";
import Cookies from 'js-cookie';

const AdminPage = () => {
  const router = useRouter();
  const { name, role } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAccess = () => {
      // Check both Redux store and cookies for admin role
      const cookieRole = Cookies.get('role');
      const reduxRole = role;
      const adminVerified = Cookies.get('adminVerified');
      
      console.log('[Admin Page] Checking admin access:', { cookieRole, reduxRole, adminVerified });
      
      // If we have admin role in either place and admin is verified, allow access
      if ((cookieRole === 'admin' || reduxRole === 'admin') && adminVerified === 'true') {
        console.log('[Admin Page] Admin access confirmed');
        setIsAdmin(true);
        setIsLoading(false);
      } else if (cookieRole === 'admin' || reduxRole === 'admin') {
        // Admin but not verified, redirect to verification
        console.log('[Admin Page] Admin not verified, redirecting to verification');
        router.push('/admin/verify');
      } else if (cookieRole && cookieRole !== 'admin') {
        // User is logged in but not admin
        console.log('[Admin Page] User is not admin, redirecting to dashboard');
        router.push('/dashboard');
      } else if (!cookieRole && !reduxRole) {
        // Still loading authentication state
        console.log('[Admin Page] Still loading authentication state');
        // Wait a bit more for auth to load
        setTimeout(checkAdminAccess, 500);
      } else {
        // No authentication found
        console.log('[Admin Page] No authentication found, redirecting to login');
        router.push('/');
      }
    };

    checkAdminAccess();
  }, [role, router]);

  const handleAdminLogout = () => {
    console.log('[Admin Page] Admin logout - clearing verification');
    Cookies.remove('adminVerified', { path: '/' });
    router.push('/admin/verify');
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="mt-4 text-[#374995] text-lg">Loading admin panel</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#E6EFFD]">
      <Navbar />
      <Image src={Logo} alt="Logo" className="w-3/5 lg:w-2/5 h-auto mx-auto py-8"/>
      
      <main className="flex-1 p-6 lg:p-16">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl lg:text-5xl font-bold text-[#374995] text-center mb-4">
              Admin Dashboard
            </h1>
            <p className="text-lg text-center text-gray-600">
              Welcome, <span className="font-semibold text-[#374995]">{name}</span>! 
              You have admin privileges.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Management Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#374995] hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#374995] mb-4">User Management</h3>
              <p className="text-gray-600 mb-4">Manage user accounts and permissions</p>
              <button 
                onClick={() => router.push('/admin/users')}
                className="w-full bg-[#374995] text-white py-2 px-4 rounded-lg hover:bg-[#5989fc] transition-colors"
              >
                Manage Users
              </button>
            </div>

            {/* Event Management Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#374995] hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#374995] mb-4">Event Management</h3>
              <p className="text-gray-600 mb-4">Configure event settings and data</p>
              <button 
                onClick={() => router.push('/admin/events')}
                className="w-full bg-[#374995] text-white py-2 px-4 rounded-lg hover:bg-[#5989fc] transition-colors"
              >
                Manage Events
              </button>
            </div>

            {/* Analytics Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#374995] hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#374995] mb-4">Analytics</h3>
              <p className="text-gray-600 mb-4">View event statistics and reports</p>
              <button 
                onClick={() => router.push('/admin/analytics')}
                className="w-full bg-[#374995] text-white py-2 px-4 rounded-lg hover:bg-[#5989fc] transition-colors"
              >
                View Analytics
              </button>
            </div>

            {/* System Settings Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#374995] hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#374995] mb-4">System Settings</h3>
              <p className="text-gray-600 mb-4">Configure system preferences</p>
              <button 
                onClick={() => router.push('/admin/settings')}
                className="w-full bg-[#374995] text-white py-2 px-4 rounded-lg hover:bg-[#5989fc] transition-colors"
              >
                System Settings
              </button>
            </div>

            {/* Match Management Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#374995] hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#374995] mb-4">Match Management</h3>
              <p className="text-gray-600 mb-4">Manage speed dating matches</p>
              <button 
                onClick={() => router.push('/admin/matches')}
                className="w-full bg-[#374995] text-white py-2 px-4 rounded-lg hover:bg-[#5989fc] transition-colors"
              >
                Manage Matches
              </button>
            </div>

            {/* Back to Dashboard Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#374995] hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#374995] mb-4">User Dashboard</h3>
              <p className="text-gray-600 mb-4">Return to regular user interface</p>
              <button 
                onClick={() => router.push('/dashboard')}
                className="w-full bg-[#A6C3EA] text-white py-2 px-4 rounded-lg hover:bg-[#8BB3E8] transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>

          {/* Admin Info Section */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6 border-2 border-[#374995]">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-[#374995]">Admin Information</h3>
              <button
                onClick={handleAdminLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Admin Logout
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Name:</p>
                <p className="font-semibold">{name}</p>
              </div>
              <div>
                <p className="text-gray-600">Role:</p>
                <p className="font-semibold text-[#374995]">{role}</p>
              </div>
              <div>
                <p className="text-gray-600">Access Level:</p>
                <p className="font-semibold text-green-600">Full Administrative Access</p>
              </div>
              <div>
                <p className="text-gray-600">Session Status:</p>
                <p className="font-semibold text-green-600">Verified & Active</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Security Note:</strong> You are currently in admin mode. Use the "Admin Logout" button to exit admin mode and return to the verification page.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;
