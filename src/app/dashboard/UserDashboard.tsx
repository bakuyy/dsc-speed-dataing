'use client'
import { useRouter } from 'next/navigation'
import CardButton from './CardButton'
import StepCard from './StepCard'

export default function Dashboard() {
  const router = useRouter()
  // USER NAME
  const userName = 'Monica'

  return (
    <div className="min-h-screen p-6 bg-white">
      {/* HEADING */}
      <header>
        <p className="text-sm text-black">Welcome to UWDSC Speed‑Friending event!</p>
        <h1 className="text-4xl font-bold mt-1 text-black">Good evening, {userName}!</h1>
      </header>

      {/* BUTTONS */}
      <main className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* fix link here */}
        <CardButton onClick={() => router.push('/dashboard')}> 
          START
          <br />
          SURVEY
        </ CardButton>
        <CardButton onClick={() => router.push('/dashboard')}>
          VIEW MY 
          <br />
          PREVIOUS 
          <br />
          MATCHES
        </CardButton>
      </main>

      <div className="mt-6 relative">
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full py-5 bg-gray-200 text-black text-lg rounded-lg shadow hover:bg-gray-300 transition"
        >
          View my matches &lt;3
        </button>
        <span className="absolute right-4 top-1 text-xs text-gray-400">
          Session is running: 00h 00m 00s
        </span>
      </div>

      {/* INFO SECTION */}
      <section className="mt-20">
        <h2 className="text-6xl text-center text-black mb-20">What is Speed Friending?</h2>
        {/* graphic holder */}
        <div className="mt-4 bg-gray-300 h-200 rounded-lg shadow flex items-center justify-center">
          <span className="text-gray-400">[Graphic explaining what it is]</span>
        </div>
      </section>

      {/* INSTRUCTION SECTION */}
      <section className="mt-20">
        <h2 className="text-6xl text-center text-black mb-17">How it works?</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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