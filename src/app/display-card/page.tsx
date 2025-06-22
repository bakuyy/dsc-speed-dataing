"use client"

import { useState, useEffect } from 'react';
import DisplayCard from "./MatchDisplay";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
}

export default function MatchPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        
        // Get token from cookies (same as AuthHydrator)
        const token = Cookies.get('token') || document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        
        console.log('[Display Card] Token from cookies:', token);
        console.log('[Display Card] All cookies:', document.cookie);
        
        if (!token) {
          setError('Please log in to view your matches');
          setCurrentUser(null);
          return;
        }

        console.log('[Display Card] Making API request with token:', token);
        const response = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setCurrentUser(response.data);
        setError(null);
      } catch (err: unknown) {
        console.error('Error fetching user:', err);
        const error = err as { response?: { status?: number } };
        if (error.response?.status === 401) {
          setError('Please log in to view your matches');
        } else {
          setError('Failed to load user data');
        }
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#A6C3EA]">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-[#222949] text-xl">Loading...</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#A6C3EA]">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-[#222949] text-xl text-center">
            <p>{error}</p>
            <p className="text-sm mt-2">Please make sure you&apos;re logged in</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#A6C3EA]">
      <Navbar />
      {currentUser && <DisplayCard currentId={currentUser.email} />}
      <Footer />
    </main>
  );
}