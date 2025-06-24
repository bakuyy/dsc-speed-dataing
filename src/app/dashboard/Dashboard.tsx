'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { ADMIN_EMAILS } from '@/lib/admins'

import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user.data);
  const isLoading = useSelector((state: RootState) => state.user.loading);
  console.log('[Dashboard] Redux user:', user);

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

  if (!user || !user.name) {
    return <div className="text-center p-12">User data incomplete. Please contact support.</div>;
  }

  const isAdmin = ADMIN_EMAILS.includes(user.email.toLowerCase());

  const processedUserName = user.name.split(' ')[0].toLowerCase().charAt(0).toUpperCase() + 
                            user.name.split(' ')[0].toLowerCase().slice(1);

  return isAdmin 
    ? <AdminDashboard /> 
    : <UserDashboard userName={processedUserName} />;
}