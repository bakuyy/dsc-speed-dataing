'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

type MatchData = {
  id: string;
  person1_id: string;
  person2_id: string;
  emoji: string;
};

type PersonDetails = {
  name: string;
  year: string;
  program: string;
  pronouns: string;
  social_media_links: string;
};

interface DisplayCardProps {
  currentId: string; // This is the user's UUID
}

export default function DisplayCard({ currentId }: DisplayCardProps) {
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [matchedPerson, setMatchedPerson] = useState<PersonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMatch, setShowMatch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchAndPersonDetails = async () => {
      if (!currentId) return;

      try {
        setLoading(true);
        setError(null);

        // 1. Find the match in curr_matches using the current user's UUID
        const { data: match, error: matchError } = await supabase
          .from('curr_matches')
          .select('*')
          .or(`person1_id.eq.${currentId},person2_id.eq.${currentId}`)
          .single();

        if (matchError) {
          if (matchError.code === 'PGRST116') { // Specific code for no rows found
            setMatchData(null);
          } else {
            throw new Error(`Failed to load match data: ${matchError.message}`);
          }
          return;
        }

        if (!match) {
          setMatchData(null);
          return;
        }
        
        setMatchData(match);

        // 2. Determine the matched person's UUID
        const matchedPersonUuid = match.person1_id === currentId
          ? match.person2_id
          : match.person1_id;

        // 3. Fetch the matched person's details from form_responses
        const { data: personDetails, error: personError } = await supabase
          .from('form_responses')
          .select('name, year, program, pronouns, social_media_links')
          .eq('id', matchedPersonUuid)
          .single();
        
        if (personError) {
          throw new Error(`Could not find your match's details: ${personError.message}`);
        }

        setMatchedPerson(personDetails);

      } catch (err: unknown) {
        console.error('Error fetching match details:', err);
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchAndPersonDetails();
  }, [currentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#222949] text-xl">Searching for your match...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#222949] text-xl text-center">
          <p>{error}</p>
          <p className="text-sm mt-2">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  if (!matchData || !matchedPerson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#222949] text-xl text-center">
          <p>No match found yet!</p>
          <p className="text-sm mt-2">Check back later for your speed dating match.</p>
        </div>
      </div>
    );
  }

  const { name, year, program, pronouns, social_media_links} = matchedPerson;
  const { emoji } = matchData;

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
            {name}
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
              <p className="text-white/80">Name: {name}</p>
              <p className="text-white/80">Year: {year}</p>
              <p className="text-white/80">Program: {program}</p>
              <p className="text-white/80">Pronouns: {pronouns}</p>
              <p className="text-white/80">Socials: {social_media_links}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}