'use client'
import { useRouter } from 'next/navigation'
import CardButton from './CardButton'
import StepCard from './StepCard'

export default function Dashboard() {
  const router = useRouter()
  //const { code } = router.query
  const userName = 'Monica'

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <header>
        <p className="text-sm text-gray-600">Welcome to UWDSC Speed‑Friending event!</p>
        <h1 className="text-3xl font-bold mt-1">Good evening, {userName}!</h1>
      </header>

      <main className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <CardButton onClick={() => router.push('/survey')} label="START SURVEY" />
        <CardButton onClick={() => router.push('/matches')} label="VIEW MY PREVIOUS MATCHES" />
      </main>

      <div className="mt-6 relative">
        <button
          onClick={() => router.push('/matches')}
          className="w-full py-3 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800 transition"
        >
          View my matches &lt;3
        </button>
        <span className="absolute right-4 top-1 text-xs text-gray-500">
          Session is running: 00h 00m 00s
        </span>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-center">What is Speed Friending?</h2>
        <div className="mt-4 bg-white h-64 rounded-lg shadow flex items-center justify-center">
          <span className="text-gray-400">[Graphic explaining what it is]</span>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-center">How it works?</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StepCard step="1" title="Submit the survey" />
          <StepCard step="2" title="Algorithm running" />
          <StepCard step="3" title="Find your matches" />
          <StepCard step="4" title="Engage in activity for 10 mins" />
        </div>
      </section>
    </div>
  )
}