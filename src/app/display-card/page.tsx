"use client"

import { useState, useEffect } from 'react';
import DisplayCard from "./MatchDisplay";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';
import { supabase } from '../../lib/supabase';
import { useAuthToken } from '../../hooks/useAuthToken';

export default function MatchPage() {
  const [userUuid, setUserUuid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthToken();
  
  useEffect(() => {
    // This effect should only execute when the token's status has been determined.
    // The useAuthToken hook returns `null` while it's checking cookies.
    if (token === null) {
      return; // Wait for the hook to finish.
    }

    const fetchUserData = async () => {
      try {
        // No need to set loading to true, it's already the default state.
        setError(null);

        if (!token) {
          setError('Please log in to view your matches');
          setLoading(false); // Stop loading on failure
          return;
        }

        // 2. Get user profile (including email) from our API
        const response = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const user = response.data;

        console.log(`[Display Card Page] Attempting to find UUID for email: ${user.email}`);

        // 3. Use email to get UUID from form_responses (case-insensitive)
        const { data: formData, error: formError } = await supabase
          .from('form_responses')
          .select('id')
          .ilike('email', user.email)
          .single();

        if (formError || !formData) {
          console.error('Error fetching UUID:', formError);
          setError('Could not find your form submission. Please make sure you have submitted the event form.');
          setLoading(false); // Stop loading on failure
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
        // This is the only place loading should be set to false.
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]); // The effect now ONLY depends on the token.

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