'use client';

import { useEffect, useState } from 'react';
//import { supabase } from '@/lib/supabase';

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

export default function DisplayCard() {
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMatch, setShowMatch] = useState(false);

  useEffect(() => {
    // const fetchMatch = async () => {
    //   // Get current user
    //   const { data: { user } } = await supabase.auth.getUser();
    //   if (!user) {
    //     setLoading(false);
    //     return;
    //   }

    //   // Find the match where the user is either person 1 or 2
    //   const { data, error } = await supabase
    //     .from('matches')
    //     .select('*')
    //     .or(`socials1.eq.${user.email},socials2.eq.${user.email}`)
    //     .single();

    //   if (error) {
    //     setLoading(false);
    //     return;
    //   }

    //   setMatch(data as Match);
    //   setLoading(false);
    // };

    // fetchMatch();

      const fakeMatch: Match = {
        id: "1",
        name1: "Alice",
        year1: "2",
        program1: "Computer Science",
        pronouns1: "she/her",
        socials1: "alice@email.com",
        name2: "Bob",
        year2: "3",
        program2: "Mathematics",
        pronouns2: "he/him",
        socials2: "bob@email.com",
        emoji: "🌟",
        reach: "Met at the hackathon!",
      };
      setMatch(fakeMatch);
      setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!match) return <div>No match found.</div>;

  // // Determine which person is the user
  // const userEmail = supabase.auth.getUser().then(res => res.data.user?.email);
  // const isPerson1 = match.socials1 === userEmail;

  // const userInfo = isPerson1
  //   ? {
  //       name: match.name1,
  //       year: match.year1,
  //       program: match.program1,
  //       pronouns: match.pronouns1,
  //       socials: match.socials1,
  //     }
  //   : {
  //       name: match.name2,
  //       year: match.year2,
  //       program: match.program2,
  //       pronouns: match.pronouns2,
  //       socials: match.socials2,
  //     };

  // return (
  //   <div style={{ border: '1px solid #ccc', padding: 24, borderRadius: 8, maxWidth: 400 }}>
  //     <h2>{userInfo.name}</h2>
  //     <p><strong>Year:</strong> {userInfo.year}</p>
  //     <p><strong>Program:</strong> {userInfo.program}</p>
  //     <p><strong>Pronouns:</strong> {userInfo.pronouns}</p>
  //     <p><strong>Socials:</strong> {userInfo.socials}</p>
  //     <div style={{ fontSize: 48, marginTop: 16 }}>{match.emoji}</div>

  const matchName = match.name2;
  const emoji = match.emoji;

  return (
    <div className="min-h-screen flex flex-col bg-[#A6C3EA]">
      <p className="text-[#222949] text-lg py-6 mx-10 text-center">
        You've got a match! Find your pair with the same emoji :)
      </p>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-[15rem] leading-none mb-20 text-white">
            {emoji}
          </div>
          <h2 className="font-bold text-4xl text-[#222949]">
            {matchName}
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
              <p className="text-white/80">Name: {match.name2}</p>
              <p className="text-white/80">Year: {match.year2}</p>
              <p className="text-white/80">Program: {match.program2}</p>
              <p className="text-white/80">Pronouns: {match.pronouns2}</p>
              <p className="text-white/80">Socials: {match.socials2}</p>
              <p className="text-white/80">Reason: {match.reach}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}