'use client';

import MatchDisplay from '@/app/components/MatchDisplay';

const DisplayPage = () => {
  return (
    <MatchDisplay 
      emoji="🥕"
      name="Sophie Y"
      matchData={{
        name: "Sophie Y",
        location: "Waterloo, ON",
        interests: "Sleeping, Hiking"
      }}
    />
  );
};

export default DisplayPage;
