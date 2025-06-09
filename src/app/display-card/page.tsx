"use client"

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import DisplayCard from "./MatchDisplay";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MatchPage() {
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUuid = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // Fetch uuid from form_responses using email or watiam
      const { data } = await supabase
        .from('form_responses')
        .select('uuid')
        .eq('email', user.email) // or .eq('watiam', user.user_metadata.watiam)
        .single();
      if (data?.uuid) setCurrentId(data.uuid);
    };
    fetchUuid();
  }, []);

  return (
    <main className="min-h-screen bg-[#A6C3EA]">
      <Navbar />
      {currentId && <DisplayCard currentId={currentId} />}
      <Footer />
    </main>
  );
}