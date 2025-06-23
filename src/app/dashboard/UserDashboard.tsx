'use client'
import { useRouter } from 'next/navigation'
import CardButton from '../components/CardButton'

interface UserDashboardProps {
  userName: string;
}

export default function UserDashboard({ userName }: UserDashboardProps) {
  const router = useRouter()
  
  type ButtonType = 'start' | 'running' | 'locked'
  const buttonType: ButtonType = 'running' 
  const buttonRoutes: Record<ButtonType, string> = {
    start: '/form',
    running: '/form',
    locked: '/',
  }

  return (
    <div className="mx-4 p-6 lg:p-12 bg-white rounded-t-4xl">
      <header>
        <h1 className="text-xl text-center font-semibold py-5 lg:text-6xl mt-1 text-[#374995] lg:pb-3">
          Welcome to the event, <span className="font-bold animate-pulse">{userName}</span>!
        </h1>
      </header>

      <main className="mt-4 lg:mt-8 grid grid-cols-2 gap-4 lg:gap-8 max-w-4xl mx-auto">
        <div className="flex justify-center">
          <CardButton
            type={buttonType}
            onClick={() => router.push(buttonRoutes[buttonType])}
          />
        </div>
        <div className="flex justify-center">
          <CardButton
            type="match"
            onClick={() => router.push('/display-card')}
          />
        </div>
      </main>

      <div className="mt-6 max-w-4xl mx-auto">
        <div className=" rounded-md bg-gradient-to-b from-[#DCEBFA] to-white shadow-[0_10px_0_0_#496AC7] px-6 py-4 md:py-8 relative">
          <div className="flex justify-center items-center">
            <p className="mt-2 text-center text-sm sm:text-xl md:text-2xl font-medium text-black">
              <span className='font-plus-jakarta-sans italic font-bold'> please wait to view your match...</span>
            </p>
          </div>
        </div>
        <button 
              onClick={() => router.push('/history')}
              className="w-full my-8  h-20 sm:h-24 md:h-28 lg:h-32 rounded-2xl shadow bg-[#A6C3EA] text-white hover:cursor-pointer hover:border-2 hover:border-[#374895] transition-all duration-300 flex items-center justify-center"
            >
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                View Previous Matches
              </span>
            </button>
      </div>
    </div>
  )
} 