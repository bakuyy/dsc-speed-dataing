"use client"

import { useState, useEffect } from 'react';
import DisplayCard from "./MatchDisplay";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';
import { supabase } from '../../lib/supabase';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function MatchPage() {
  const [userUuid, setUserUuid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userEmail = useSelector((state: RootState) => state.user.data?.email || null);
  
  useEffect(() => {
    if (userEmail === null) {
      return;
    }

    const fetchUserData = async () => {
      try {
        setError(null);

        if (!userEmail) {
          setError('Please log in to view your matches');
          setLoading(false); // Stop loading on failure
          return;
        }

        const response = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${userEmail}` }
        });
        const user = response.data;

        console.log(`[Display Card Page] Attempting to find UUID for email: ${user.email}`);

        const { data: formData, error: formError } = await supabase
          .from('form_responses')
          .select('id')
          .ilike('email', user.email)
          .single();

        if (formError || !formData) {
          console.error('Error fetching UUID:', formError);
          setError('Could not find your form submission. Please make sure you have submitted the event form.');
          setLoading(false);
          return;
        }
        
        setUserUuid(formData.id);

      } catch (err: unknown) {
        console.error('Error fetching user:', err);
        const typedError = err as { response?: { status?: number } };
        if (typedError.response?.status === 401) {
          setError('Please log in to view your matches');
        } else {
          setError('Failed to load your user data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userEmail]); 

  if (loading) {
    return (
      <main className="min-h-screen bg-[#A6C3EA]">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-[#222949] text-xl">Loading your data...</div>
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
            <p className="text-sm mt-2">Please make sure you&apos;re logged in and have submitted the form.</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#A6C3EA]">
      <Navbar />
      {userUuid && <DisplayCard currentId={userUuid} />}
      <Footer />
    </main>
  );
}