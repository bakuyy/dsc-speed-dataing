'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

type Match = {
  id: string;
  name1: string;
  year1: string;
  program1: string;
  pronouns1: string;
  socials1: string;
  name2: string;
  year2: string;
  program2: string;
  pronouns2: string;
  socials2: string;
  emoji: string;
  reach: string;
};

interface DisplayCardProps {
  currentId: string; // This will be the user's email
}

export default function DisplayCard({ currentId }: DisplayCardProps) {
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMatch, setShowMatch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Query the matches table to find a match for the current user
        const { data, error: fetchError } = await supabase
          .from('matches')
          .select('*')
          .or(`socials1.eq.${currentId},socials2.eq.${currentId}`)
          .single();

        if (fetchError) {
          console.error('Error fetching match:', fetchError);
          if (fetchError.code === 'PGRST116') {
            // No match found
            setMatch(null);
          } else {
            setError('Failed to load match data');
          }
        } else if (data) {
          setMatch(data as Match);
        } else {
          setMatch(null);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (currentId) {
      fetchMatch();
    }
  }, [currentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#222949] text-xl">Loading your match...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#222949] text-xl text-center">
          <p>Error: {error}</p>
          <p className="text-sm mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#222949] text-xl text-center">
          <p>No match found yet!</p>
          <p className="text-sm mt-2">Check back later for your speed dating match</p>
        </div>
      </div>
    );
  }

  // Determine which person is the user
  const isPerson1 = match.socials1 === currentId;
  const matchInfo = isPerson1
    ? {
        name: match.name2,
        year: match.year2,
        program: match.program2,
        pronouns: match.pronouns2,
        socials: match.socials2,
      }
    : {
        name: match.name1,
        year: match.year1,
        program: match.program1,
        pronouns: match.pronouns1,
        socials: match.socials1,
      };

  const emoji = match.emoji;

  return (
    <div className="min-h-screen flex flex-col">
      <p className="text-[#222949] text-lg py-6 mx-10 text-center">
        You&apos;ve got a match! Find your pair with the same emoji :)
      </p>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-[15rem] leading-none mb-20 text-white">
            {emoji}
          </div>
          <h2 className="font-bold text-4xl text-[#222949]">
            {matchInfo.name}
          </h2>
          <button 
            onClick={() => setShowMatch(!showMatch)}
            className="mt-20 text-white/60 hover:text-white transition-colors"
            aria-label="Show match details"
          >
            <svg 
              className={`w-8 h-8 transform transition-transform duration-300 ${showMatch ? 'rotate-180' : ''} animate-bounce-subtle`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showMatch ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-[#314077] rounded-lg p-6 mx-4">
              <h3 className="text-white text-lg font-semibold mb-2">Your Match</h3>
              <p className="text-white/80">Name: {matchInfo.name}</p>
              <p className="text-white/80">Year: {matchInfo.year}</p>
              <p className="text-white/80">Program: {matchInfo.program}</p>
              <p className="text-white/80">Pronouns: {matchInfo.pronouns}</p>
              <p className="text-white/80">Socials: {matchInfo.socials}</p>
              <p className="text-white/80">Reason: {match.reach}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}