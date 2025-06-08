import React from 'react'
import { FaRegSmile } from 'react-icons/fa'
import Image from 'next/image'
import Heart from "../../../public/images/dashboard/heart.svg"
import SessionTimer from './SessionTimer'

type CardButtonProps = {
  onClick: () => void
  type: 'start' | 'running' | 'locked' | 'match'
  active?: boolean
}

export default function CardButton({ onClick, type}: CardButtonProps) {
  const baseClasses = `
    w-full max-w-[300px]
    sm:max-w-[360px]
    md:max-w-[400px]
    lg:max-w-[42rem]
    h-55 sm:h-80 md:h-[20rem] lg:h-[33rem]
    rounded-2xl shadow 
    transition relative overflow-hidden
    flex items-start text-left 
    px-5 sm:px-6 lg:px-10 py-5 sm:py-6 lg:py-10
  `

  const variants: Record<typeof type, string> = {
    start: 'bg-[#A6C3EA] text-white',
    running: 'bg-[#A6C3EA] text-white',
    locked: 'bg-[#4B5563] text-white',
    match: 'bg-[#496AC7] text-white justify-between pr-12',
  }

  const icon = <FaRegSmile className="mr-3 text-7xl sm:text-8xl lg:text-[11rem] text-[#7CA3DE]"/>

  const labels: Record<typeof type, string> = {
    start: 'Start\nSurvey',
    running: 'Session is\nrunning',
    locked: 'Session\nis locked',
    match: 'View My\n Previous Matches',
  }

  const description: Record<typeof type, React.ReactNode> = {
    start: 'Please wait until the start of the session is announced by execs',
    running: <span className='text-white'><SessionTimer /></span>,
    locked: 'Please wait until the start of the session is announced by execs',
    match: '2 Sessions Has Started', // ADD NUMBER OF SESSION LOGIC
  }


  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[type]} hover:cursor-pointer hover:border-2 hover:border-[#374895] transition-all duration-300`}
    >
    
    <div className="flex flex-col justify-between items-start h-full z-10">
      <span className="text-lg sm:text-xl md:text-2xl lg:text-5xl font-semibold whitespace-pre-line leading-snug">
        {labels[type]}
      </span>
      {type !== 'match' && (
        <div> {icon} </div>
      )}
      <span className="text-[0.5rem] sm:text-base md:text-md lg:text-xl">
        {description[type]}
      </span>
    </div>

    {type === 'match' && (
      <Image
        src={Heart}
        alt="heart"
        aria-hidden="true"
        width={96} 
        height={96}
        className="
          absolute 
          right-0 
          bottom-6
          w-40 h-40
          sm:w-50 sm:h-50
          md:w-60 md:h-60
          lg:w-100 lg:h-100
          opacity-30 
          pointer-events-none
        "
      />
    )}
    </button>
  )
}
