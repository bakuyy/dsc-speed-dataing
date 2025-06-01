'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CardButton from './CardButton'
import StepCard from './StepCard'
import SessionTimer from './SessionTimer'
import AboutPage from './About'

export default function Dashboard() {
  const router = useRouter()

  // USER NAME: change here based on database
  const userName = 'Monica'

  type ButtonType = 'start' | 'running' | 'locked'
  const buttonType: ButtonType = 'running' // ADD LOGIC
  const buttonRoutes: Record<ButtonType, string> = {
    start: '/survey', // FIX PATH HERE
    running: '/survey',
    locked: '/',
  }
  const [isTime, setIsTime] = useState(true)

  return (
    <div className="w-screen p-6 lg:p-12 bg-white rounded-4xl">
      <header>
        <h1 className="text-xl lg:text-6xl mt-1 text-[#374995] lg:pb-3">Good evening, <span className="font-bold">{userName}</span>!</h1>
        <p className="text-xs lg:text-xl text-[#374995]">Welcome to our termly Speed Friending event!</p>
      </header>

      <main className="mt-4 lg:mt-8 grid grid-cols-2 gap-4 lg:gap-10">
        <CardButton
          type={buttonType}
          onClick={() => router.push(buttonRoutes[buttonType])}
        />
        <CardButton
          type="match"
          onClick={() => router.push('/matches')} // FIX PATH HERE
        />
      </main>

      <div className="relative mt-6">
        <div className="w-full rounded-[1.5rem] bg-gradient-to-b from-[#DCEBFA] to-white shadow-[0_10px_0_0_#496AC7] px-6 py-4 md:py-8 relative">
          <span className="absolute top-1 md:top-3 right-4 text-xs text-black">
            <SessionTimer onTimeChange={(timeReady) => setIsTime(timeReady)} />
          </span>
          
          <p className="mt-2 text-center text-sm sm:text-xl md:text-2xl font-medium text-black">
            It’s <span className="font-bold">{isTime ? 'Time' : 'Almost Time'}</span> To View Your{' '}
            <span className="font-bold">Matches</span>!
          </p>
        </div>
      </div>

      <AboutPage />

      {/* INSTRUCTION SECTION */}
      <section className="mt-20">
        <h2 className="text-6xl text-center text-black mb-17">How it works?</h2>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <StepCard step="1" title="Submit the survey" description="Subtext to explain in further detail Subtext to explain in further detail 
                                                                    Subtext to explain in further detail Subtext to explain in further detail"/>
          <StepCard step="2" title="Algorithm running" description="Subtext to explain in further detail Subtext to explain in further detail 
                                                                    Subtext to explain in further detail Subtext to explain in further detail"/>
          <StepCard step="3" title="Find your matches" description="Subtext to explain in further detail Subtext to explain in further detail 
                                                                    Subtext to explain in further detail Subtext to explain in further detail"/>
          <StepCard step="4" title="Engage in activity for 10 mins" description="Subtext to explain in further detail Subtext to explain in further detail 
                                                                    Subtext to explain in further detail Subtext to explain in further detail"/>
        </div>
      </section>
    </div>
  )
}