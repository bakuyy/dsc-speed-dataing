'use client'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import Logo from '../../../public/images/logo.png'
import { FaArrowUp, FaSync, FaLock } from "react-icons/fa";
import axios from 'axios';

const Page = () => {
  const watiam_user = useSelector((state: RootState) => state.user.data?.email || null);
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

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col w-full">
              <label className="mb-1 text-[#374995] font-jakarta">DSC Email</label>
              {watiam_user ? (
                <input
                  type="email"
                  name="watiam_user_display"
                  value={watiam_user}
                  disabled
                  className="p-3 rounded-full w-full bg-gray-100 text-black placeholder-[#aabbd7] outline-none font-jakarta cursor-not-allowed"
                />
              ) : (
                <input
                  type="email"
                  name="watiam_user_display"
                  placeholder="Loading your email..."
                  disabled
                  className="p-3 rounded-full w-full bg-gray-100 text-gray-400 placeholder-[#aabbd7] outline-none font-jakarta italic cursor-not-allowed"
                />
              )}
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
                name="social_media_links"
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
              { name: "self_desc", label: "What would your friends describe you as?" },
              { name: "goal", label: "What do you hope to gain out of this experience?" },
              { name: "fun", label: "What do you like to do for fun?" },
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
              {[
                { value: "a", label: "Sit in the front of class and try to absorb as much info as I can." },
                { value: "b", label: "Sit in the back and play Clash Royale." },
                { value: "c", label: "Sit somewhere in the middle, with my friends." },
                { value: "d", label: "I do not go to class ;-;" },
                { value: "e", label: "Lowkey I be the professor bro." }
              ].map(({ value, label }, idx) => (
                <label key={idx} className="flex items-center gap-3 mb-2 text-[#374995]">
                  <input type="radio" name="class_seat" value={value} className="accent-[#4b6cb7]" />
                  {label}
                </label>
              ))}
            </div>

            {/* Question 2 */}
              <div>
                <p className="text-[#374995] font-jakarta mb-2">Pick your favourite evil hobby:</p>
                {[
                  { value: "a", label: "Gossiping the latest tea" },
                  { value: "b", label: "Splurging money on (useless?) items" },
                  { value: "c", label: "Mukbanging food" },
                  { value: "d", label: "Entering a ranked match in Valorant" },
                  { value: "e", label: "Going down Wikipedia rabbit holes" }
                ].map(({ value, label }, idx) => (
                  <label key={idx} className="flex items-center gap-3 mb-2 text-[#374995]">
                    <input type="radio" name="evil_hobby" value={value} className="accent-[#4b6cb7]" />
                    {label}
                  </label>
                ))}
              </div>

            {/* Question 3 */}
            <div>
              <p className="text-[#374995] font-jakarta mb-2">I am most likely to...</p>
              {[
                { value: "a", label: "Become a UW blogger on Instagram reels" },
                { value: "b", label: "Eat a Lazeeza (Lazeez pizza)" },
                { value: "c", label: "Disappear from campus and not tell anyone" },
                { value: "d", label: "Sleep through a midterm" },
                { value: "e", label: "Start a business" }
              ].map(({ value, label }, idx) => (
                <label key={idx} className="flex items-center gap-3 mb-2 text-[#374995]">
                  <input type="radio" name="most_likely_to" value={value} className="accent-[#4b6cb7]" />
                  {label}
                </label>
              ))}
            </div>

            {/* Question 4 */}
            <div>
              <p className="text-[#374995] font-jakarta mb-2">You&apos;re most likely to catch me watching...</p>
              {[
                { value: "a", label: "Wooden soup ASMR" },
                { value: "b", label: "1-hour mock SWE interview + solutions LEAKED!!!!" },
                { value: "c", label: "How to recover from a bad exam" },
                { value: "d", label: "Can 100,000 Elephants defeat 1 MILLION Ostriches?"},
                { value: "e", label: "How to make a matcha strawberry latte"}
              ].map(({ value, label }, idx) => (
                <label key={idx} className="flex items-center gap-3 mb-2 text-[#374995]">
                  <input type="radio" name="caught_watching" value={value} className="accent-[#4b6cb7]" />
                  {label}
                </label>
              ))}
            </div>
            </div>
          {/* Submit Button */}
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