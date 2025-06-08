'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

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
  const [flipped, setFlipped] = useState(false);

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

  const matchInfo = (
    <div style={{ padding: 16 }}>
      <h2>{match.name2}</h2>
      <p><strong>Year:</strong> {match.year2}</p>
      <p><strong>Program:</strong> {match.program2}</p>
      <p><strong>Pronouns:</strong> {match.pronouns2}</p>
      <p><strong>Socials:</strong> {match.socials2}</p>
      <div style={{ fontSize: 32, marginTop: 8 }}>{match.emoji}</div>
      <p><em>{match.reach}</em></p>
    </div>
  );

  return (
    <div
      style={{
        perspective: '1000px',
        width: 320,
        height: 220,
        margin: '40px auto',
        cursor: 'pointer',
      }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'none',
        }}
      >
        {/* Front */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ fontWeight: 600 }}>{matchName}</div>
          <div style={{ fontSize: 64, marginTop: 12 }}>{emoji}</div>
          <div style={{ fontSize: 14, color: '#888', marginTop: 8 }}>Click to flip</div>
        </div>
        {/* Back */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: '#f9f9f9',
            border: '1px solid #ccc',
            borderRadius: 12,
            transform: 'rotateY(180deg)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {matchInfo}
        </div>
      </div>
    </div>
  );
}