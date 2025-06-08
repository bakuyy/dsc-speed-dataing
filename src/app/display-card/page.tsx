'use client';

import MatchDisplay from '@/app/display-card/MatchDisplay';

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
