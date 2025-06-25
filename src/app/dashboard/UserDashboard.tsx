'use client'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { login } from '@/store/loginTokenSlice'
import { useState, useEffect } from 'react'
import CardButton from '../components/CardButton'
import axios from 'axios'
import MatchComponent from './DefaultMatch'
import Cookies from 'js-cookie'

export default function UserDashboard() {
  const router = useRouter()
  const dispatch = useDispatch()
  const fullName = useSelector((state: RootState) => state.auth.name)
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isViewMatch, setIsViewMatch] = useState(false)

  useEffect(() => {
    const refreshUserData = async () => {
      try {
        const token = Cookies.get('token')
        if (!token) {
          console.log('No token found, skipping user data refresh')
          return
        }

        const response = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (response.data) {
          dispatch(login({
            name: response.data.name,
            token: token,
            role: response.data.role
          }))
        }
      } catch (error) {
        console.error('Error refreshing user data:', error)
        // Don't redirect on error, just log it
      }
    }

    refreshUserData()
  }, [dispatch])

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

  return (
    <div className="w-screen p-6 lg:p-16 bg-white rounded-t-4xl">
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
        {/* <div className=" rounded-md bg-gradient-to-b from-[#DCEBFA] to-white shadow-[0_10px_0_0_#496AC7] px-6 py-4 md:py-8 relative"> */}

          <MatchComponent isViewMatch={isViewMatch} />
          
        {/* </div> */}
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