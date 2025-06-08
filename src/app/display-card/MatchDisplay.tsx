'use client';

import { useState } from 'react';

interface MatchDisplayProps {
  emoji: string;
  name: string;
  matchData?: {
    name: string;
    location: string;
    interests: string;
  };
}

const MatchDisplay = ({ emoji, name, matchData = {
  name: "Alex K",
  location: "San Francisco",
  interests: "Photography, Hiking"
} }: MatchDisplayProps) => {
  const [showMatch, setShowMatch] = useState(false);

  return (
    <div 
      className="min-h-screen flex flex-col bg-black"
    >
      <p className="text-white/80 text-md py-6 mx-10 text-center">
        You've got a match! Find your pair with the same emoji :)
      </p>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-[15rem] leading-none mb-6 text-white">
            {emoji}
          </div>
          <h2 className="text-md text-white">
            {name}
          </h2>
          <button 
            onClick={() => setShowMatch(!showMatch)}
            className="mt-8 text-white/60 hover:text-white transition-colors"
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
            <div className="bg-white/10 rounded-lg p-6 mx-4">
              <h3 className="text-white text-lg font-semibold mb-2">Your Match</h3>
              <p className="text-white/80">Name: {matchData.name}</p>
              <p className="text-white/80">Location: {matchData.location}</p>
              <p className="text-white/80">Interests: {matchData.interests}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDisplay; 