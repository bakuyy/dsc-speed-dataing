'use client';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { logout } from '@/store/loginTokenSlice';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSignOut = () => {
    console.log('[Sign Out] User signed out');
    dispatch(logout());
    router.push('/');
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-white rounded p-2 hover:bg-red-700"
    >
      Log Out
    </button>
  );
} 