'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import Logo from '../../../public/images/logo.png'
import { FaArrowUp } from "react-icons/fa";

const Page = () => {
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
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8">

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
            className="bg-[#4b6cb7] hover:bg-[#3f5cb1] text-white py-3 px-6 rounded-full w-full text-lg font-jakarta"
          >
            Submit Survey
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
