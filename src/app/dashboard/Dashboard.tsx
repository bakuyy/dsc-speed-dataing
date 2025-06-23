'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuthToken } from '@/hooks/useAuthToken'
import { ADMIN_EMAILS } from '@/lib/admins'

import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'

interface User {
  name: string;
  email: string;
}

export default function Dashboard() {
  const token = useAuthToken();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token === null) {
      return; // Wait for token to be loaded
    }

    if (!token) {
      // If no token, stop loading and maybe redirect or show a message.
      // For now, we'll just show nothing.
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null); // Clear user on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="mt-4 text-[#374995] text-lg">Loading your dashboard</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // This can be a login prompt or a redirect
    return <div className="text-center p-12">Please log in to view the dashboard.</div>
  }

  const isAdmin = ADMIN_EMAILS.includes(user.email.toLowerCase());

  const processedUserName = user.name.split(' ')[0].toLowerCase().charAt(0).toUpperCase() + 
                            user.name.split(' ')[0].toLowerCase().slice(1);

  return isAdmin 
    ? <AdminDashboard /> 
    : <UserDashboard userName={processedUserName} />;
}