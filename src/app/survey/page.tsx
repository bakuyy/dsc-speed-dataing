'use client'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import Logo from '../../../public/images/logo.png'
import { FaArrowUp, FaSync, FaLock } from "react-icons/fa";
import axios from 'axios';

const Page = () => {
  const [isFormActive, setIsFormActive] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkFormStatus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/form-status');
      setIsFormActive(response.data.isActive);
      console.log('[Survey Page] Form status:', response.data);
    } catch (error) {
      console.error('[Survey Page] Error checking form status:', error);
      setError('Failed to check form status');
      setIsFormActive(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkFormStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormActive) {
      alert('Form is currently locked. Please wait for the session to begin.');
      return;
    }

    // Add your form submission logic here
    console.log('Form submitted');
  };

  if (isLoading) {
    return (
      <div className="bg-[#e1eaf8] min-h-screen w-screen">
        <Navbar />
        <div className="pt-12 max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="mt-4 text-[#374995] text-lg">Checking form status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#e1eaf8] min-h-screen w-screen">
      <Navbar />
      {/* Back to Top Button */}
      {/* test */}

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#374995] text-white shadow-md hover:bg-[#2c3d85] transition"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
      <main className="pt-12 max-w-4xl mx-auto px-4 flex flex-col gap-8">
        {/* Form Status Banner */}
        <div className={`p-4 rounded-lg border-2 ${
          isFormActive 
            ? 'bg-green-50 border-green-300 text-green-800' 
            : 'bg-red-50 border-red-300 text-red-800'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isFormActive ? (
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              ) : (
                <FaLock className="text-red-500" />
              )}
              <span className="font-medium">
                {isFormActive ? 'Form is Active' : 'Form is Locked'}
              </span>
            </div>
            <button
              onClick={checkFormStatus}
              disabled={isLoading}
              className="bg-[#374995] text-white px-3 py-1 rounded text-sm hover:bg-[#5989fc] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <FaSync className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
          <p className="text-sm mt-1">
            {isFormActive 
              ? 'You can now submit your survey responses.' 
              : 'Please wait for the session to begin. The form will be unlocked by administrators.'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          {/* Logo and Header */}
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <Image src={Logo} alt="Logo" className="w-2/5 h-auto" />
            <h1 className="text-3xl md:text-4xl font-bold text-[#374995]">Speed Friending</h1>
          </div>

          {/* Name and Pronouns */}
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div className="flex flex-col w-full">
              <label className="mb-1 text-[#374995] font-jakarta">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="First and Last Name"
                className="p-3 rounded-full w-full bg-white text-[#374995] placeholder-[#aabbd7] outline-none font-jakarta"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-1 text-[#374995] font-jakarta">Pronouns</label>
              <select
                name="pronouns"
                className="p-3 rounded-full w-full bg-[#4b6cb7] text-white placeholder-white outline-none font-jakarta"
              >
                <option>Select from the following</option>
                <option>She/Her</option>
                <option>He/Him</option>
                <option>They/Them</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Email, program, year, social Media Links */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col w-full">
              <label className="mb-1 text-[#374995] font-jakarta">UWaterloo Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your @uwaterloo.ca email"
                className="p-3 rounded-full w-full bg-white text-[#374995] placeholder-[#aabbd7] outline-none"
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="mb-1 text-[#374995] font-jakarta">Program</label>
              <input
                type="text"
                name="program"
                placeholder="Enter your program (e.g., Computer Science)"
                className="p-3 rounded-full w-full bg-white text-[#374995] placeholder-[#aabbd7] outline-none"
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="mb-1 text-[#374995] font-jakarta">Year</label>
              <input
                type="text"
                name="year"
                placeholder="Enter your year (e.g., 2A)"
                className="p-3 rounded-full w-full bg-white text-[#374995] placeholder-[#aabbd7] outline-none"
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="mb-1 text-[#374995] font-jakarta">
                Social Media Links <span className="text-sm text-[#aabbd7]">(optional)</span>
              </label>
              <input
                type="text"
                name="socials"
                placeholder="Add your Instagram, Discord, etc."
                className="p-3 rounded-full w-full bg-white text-[#374995] placeholder-[#aabbd7] outline-none"
              />
            </div>
          </div>

          {/* Open-Ended Questions */}
          <div className="flex flex-col gap-6 mt-8">
            {[
              { name: "career", label: "What career are you aiming for? (e.g., data scientist, SWE, quant...)" },
              { name: "friend_traits", label: "You will meet a new friend today. What personality traits do you hope this new friend possesses?" },
              { name: "self_description", label: "What would your friends describe you as?" },
              { name: "experience_goals", label: "What do you hope to gain out of this experience?" },
              { name: "fun_activities", label: "What do you like to do for fun?" },
              { name: "music", label: "What genre of music do you listen to? List some of your favourite artists." }
            ].map((q, index) => (
              <div key={index} className="flex flex-col">
                <label htmlFor={q.name} className="mb-1 text-[#374995] font-jakarta">{q.label}</label>
                <textarea
                  id={q.name}
                  name={q.name}
                  rows={4}
                  placeholder="Type your response here..."
                  className="p-4 rounded-2xl w-full bg-white text-[#374995] placeholder-[#aabbd7] resize-none outline-none"
                />
              </div>
            ))}
          </div>

          {/* Multiple Choice Questions */}
          <div className="flex flex-col gap-8 mt-12">

            {/* Question 1 */}
            <div>
              <p className="text-[#374995] font-jakarta mb-2">In class, I...</p>
              {["front", "back", "middle", "dont_go", "professor"].map((value, idx) => (
                <label key={idx} className="flex items-center gap-3 mb-2 text-[#374995]">
                  <input type="radio" name="in_class" value={value} className="accent-[#4b6cb7]" />
                  {{
                    front: "Sit in the front of class and try to absorb as much info as I can.",
                    back: "Sit in the back and play Clash Royale.",
                    middle: "Sit somewhere in the middle, with my friends.",
                    dont_go: "I do not go to class ;-;",
                    professor: "Lowkey I be the professor bro."
                  }[value]}
                </label>
              ))}
            </div>

            {/* Question 2 */}
            <div>
              <p className="text-[#374995] font-jakarta mb-2">Pick your favourite evil hobby:</p>
              {["gossip", "splurge", "mukbang", "valorant", "wiki"].map((value, idx) => (
                <label key={idx} className="flex items-center gap-3 mb-2 text-[#374995]">
                  <input type="radio" name="evil_hobby" value={value} className="accent-[#4b6cb7]" />
                  {{
                    gossip: "Gossiping the latest tea",
                    splurge: "Splurging money on (useless?) items",
                    mukbang: "Mukbanging food",
                    valorant: "Entering a ranked match in Valorant",
                    wiki: "Going down Wikipedia rabbit holes"
                  }[value]}
                </label>
              ))}
            </div>

            {/* Question 3 */}
            <div>
              <p className="text-[#374995] font-jakarta mb-2">I am most likely to...</p>
              {["blogger", "lazeeza", "disappear", "sleep", "startup"].map((value, idx) => (
                <label key={idx} className="flex items-center gap-3 mb-2 text-[#374995]">
                  <input type="radio" name="likely_to" value={value} className="accent-[#4b6cb7]" />
                  {{
                    blogger: "Become a UW blogger on Instagram reels",
                    lazeeza: "Eat a Lazeeza (Lazeez pizza)",
                    disappear: "Disappear from campus and not tell anyone",
                    sleep: "Sleep through a midterm",
                    startup: "Start a business"
                  }[value]}
                </label>
              ))}
            </div>

            {/* Question 4 */}
            <div>
              <p className="text-[#374995] font-jakarta mb-2">Which of the following do you find the most funny?</p>
              {["tralaleo", "bread", "dogs"].map((value, idx) => (
                <label key={idx} className="flex items-center gap-3 mb-2 text-[#374995]">
                  <input type="radio" name="funny" value={value} className="accent-[#4b6cb7]" />
                  {{
                    tralaleo: "Tralaleo tralala",
                    bread: "Bread tastes better than key",
                    dogs: "Seeing small dogs fail to complete simple obstacle courses"
                  }[value]}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormActive}
            className={`py-3 px-6 rounded-full w-full text-lg font-jakarta transition-colors ${
              isFormActive
                ? 'bg-[#4b6cb7] hover:bg-[#3f5cb1] text-white cursor-pointer'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            {isFormActive ? 'Submit Survey' : 'Form is Locked'}
          </button>
          
          <footer className="text-center text-[#374995] text-sm mt-10">
            Speed Friending, an UWDSC event <br />
            © Copyright 2025
          </footer>

        </form>
      </main>
    </div>
  )
}

export default Page
