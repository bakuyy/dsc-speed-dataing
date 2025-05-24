'use client';

import MatchDisplay from '../components/MatchDisplay';

const DisplayCard = () => {
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

export default DisplayCard;
