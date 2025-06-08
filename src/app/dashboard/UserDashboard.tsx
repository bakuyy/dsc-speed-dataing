'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { login } from '@/store/loginTokenSlice'
import CardButton from '../components/CardButton'
import SessionTimer from '../components/SessionTimer'
import axios from 'axios'


export default function Dashboard() {
  const router = useRouter()
  const dispatch = useDispatch()
  const fullName = useSelector((state: RootState) => state.auth.name)
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Force refresh user data on mount
  useEffect(() => {
    const refreshUserData = async () => {
      try {
        const response = await axios.get('/api/user')
        if (response.data) {
          dispatch(login({
            name: response.data.name,
            token: response.data.token,
            role: response.data.role
          }))
        }
      } catch (error) {
        console.error('Error refreshing user data:', error)
      }
    }

    refreshUserData()
  }, [dispatch, router])

  useEffect(() => {
    if (fullName) {
      const timer = setTimeout(() => {
        const processedName = fullName.split(' ')[0].toLowerCase().charAt(0).toUpperCase() + 
                            fullName.split(' ')[0].toLowerCase().slice(1)
        setUserName(processedName)
        setIsLoading(false)
      }, 1000) 

      return () => clearTimeout(timer)
    }
  }, [fullName])

  type ButtonType = 'start' | 'running' | 'locked'
  const buttonType: ButtonType = 'running' 
  const buttonRoutes: Record<ButtonType, string> = {
    start: '/form',
    running: '/form',
    locked: '/',
  }
  const [isTime, setIsTime] = useState(true)

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="mt-4 text-[#374995] text-lg">Loading your dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-4 p-6 lg:p-12 bg-white rounded-t-4xl">
      <header>
        <h1 className="text-xl lg:text-6xl mt-1 text-[#374995] lg:pb-3">
          Welcome to the event, <span className="font-bold">{userName}</span>!
        </h1>
        <p className="text-xs lg:text-xl text-[#374995]">Thanks for joining :P</p>
      </header>

      <main className="mt-4 lg:mt-8 grid grid-cols-2 gap-4 lg:gap-10">
        <CardButton
          type={buttonType}
          onClick={() => router.push(buttonRoutes[buttonType])}
        />
        <CardButton
          type="match"
          onClick={() => router.push('/matches')}
        />
      </main>

      <div className="relative mt-6">
        <div className="w-full rounded-[1.5rem] bg-gradient-to-b from-[#DCEBFA] to-white shadow-[0_10px_0_0_#496AC7] px-6 py-4 md:py-8 relative">
          <span className="absolute top-1 md:top-3 right-4 text-xs text-black">
            <SessionTimer onTimeChange={(timeReady) => setIsTime(timeReady)} />
          </span>
          
          <p className="mt-2 text-center text-sm sm:text-xl md:text-2xl font-medium text-black">
            It's <span className="font-bold">{isTime ? 'Time' : 'Almost Time'}</span> To View Your{' '}
            <span className="font-bold">Matches</span>!
          </p>
        </div>
      </div>
    </div>
  )
}