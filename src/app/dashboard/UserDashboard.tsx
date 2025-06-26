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
import { FaSync } from 'react-icons/fa'

export default function UserDashboard() {
  const router = useRouter()
  const dispatch = useDispatch()
  const fullName = useSelector((state: RootState) => state.auth.name)
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isViewMatch, setIsViewMatch] = useState(false)
  const [sessionState, setSessionState] = useState<string>('idle')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const checkSessionState = async () => {
    try {
      setIsRefreshing(true)
      const response = await axios.get('/api/form-status')
      setSessionState(response.data.sessionState || 'idle')
      console.log('[User Dashboard] Session state:', response.data.sessionState)
    } catch (error) {
      console.error('[User Dashboard] Error checking session state:', error)
      setSessionState('idle')
    } finally {
      setIsRefreshing(false)
    }
  }

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
    checkSessionState()
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
  const getButtonType = (): ButtonType => {
    if (sessionState === 'form_active') return 'running'
    if (sessionState === 'matches_released') return 'start'
    return 'locked'
  }
  
  const buttonType: ButtonType = getButtonType()
  const isFormClickable = sessionState === 'form_active'
  
  const handleFormClick = () => {
    if (isFormClickable) {
      router.push('/survey')
    } else {
      // Show alert or notification that form is not available
      alert(`Form is currently ${sessionState === 'idle' ? 'not started' : sessionState === 'matching_in_progress' ? 'locked while matching is in progress' : 'locked'}. Please wait for the session to begin.`)
    }
  }

  const handleMatchClick = () => {
    if (sessionState === 'matches_released') {
      router.push('/match')
    } else {
      alert('Matches have not been released yet. Please wait for the matching process to complete.')
    }
  }

  return (
    <div className="w-screen p-6 lg:p-16 bg-white rounded-t-4xl">
      <header>
        <h1 className="text-xl text-center font-semibold py-5 lg:text-6xl mt-1 text-[#374995] lg:pb-3">
          Welcome to the event, <span className="font-bold animate-pulse">{userName}</span>!
        </h1>
        <button 
          onClick={checkSessionState}
          disabled={isRefreshing}
          className="text-sm text-[#374995] hover:text-[#374895] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto mt-2"
        >
          <FaSync className={`inline-block mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </header>

      <main className="mt-4 lg:mt-8 grid grid-cols-2 gap-4 lg:gap-8 max-w-4xl mx-auto">
        <div className="flex justify-center">
          <CardButton
            type={buttonType}
            onClick={handleFormClick}
            disabled={!isFormClickable}
          />
        </div>
        <div className="flex justify-center">
          <CardButton
            type="match"
            onClick={handleMatchClick}
            disabled={sessionState !== 'matches_released'}
          />
        </div>
      </main>

      <div className="mt-6 max-w-4xl mx-auto">
        {/* Show match component only when matches are released */}
        {sessionState === 'matches_released' && (
          <MatchComponent isViewMatch={isViewMatch} />
        )}
        
        {/* Show session status when not in matches_released state */}
        {sessionState !== 'matches_released' && (
          <div className="rounded-md bg-gradient-to-b from-[#DCEBFA] to-white shadow-[0_10px_0_0_#496AC7] px-6 py-4 md:py-8 relative">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#374995] mb-2">
                {sessionState === 'idle' && 'Session Not Started'}
                {sessionState === 'form_active' && 'Form is Active'}
                {sessionState === 'matching_in_progress' && 'Matching in Progress'}
              </h3>
              <p className="text-[#374995] mb-3">
                {sessionState === 'idle' && 'Please wait for the session to begin.'}
                {sessionState === 'form_active' && 'You can now submit your survey responses.'}
                {sessionState === 'matching_in_progress' && 'The matching algorithm is running. Please wait for matches to be released.'}
              </p>
              <div className="text-sm text-[#374995] opacity-75">
                {sessionState === 'idle' && 'Administrators will start the session when ready.'}
                {sessionState === 'form_active' && 'Click the "Fill out the survey" button to begin.'}
                {sessionState === 'matching_in_progress' && 'This may take a few minutes. You can refresh to check for updates.'}
              </div>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => router.push('/history')}
          className="w-full my-8  h-20 sm:h-24 md:h-28 lg:h-32 rounded-2xl shadow bg-[#A6C3EA] text-white hover:cursor-pointer hover:border-2 hover:border-[#374895] transition-all duration-300 flex items-center justify-center"
        >
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
            {sessionState === 'matches_released' ? 'View Previous Matches' : 'View History'}
          </span>
        </button>
      </div>
      
    </div>
  )
} 