import React from 'react'
import { FaRegSmile } from 'react-icons/fa'
import Image from 'next/image'
import Heart from "../../../public/images/dashboard/heart.svg"

type CardButtonProps = {
  onClick: () => void
  type: 'start' | 'running' | 'locked' | 'match' 
  active?: boolean
  disabled?: boolean
}

export default function CardButton({ onClick, type, disabled = false}: CardButtonProps) {
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
    start: disabled ? 'bg-gray-400 text-gray-600' : 'bg-[#A6C3EA] text-white',
    running: 'bg-[#A6C3EA] text-white',
    locked: 'bg-[#4B5563] text-white',
    match: disabled ? 'bg-gray-400 text-gray-600' : 'bg-[#496AC7] text-white justify-between pr-12',
  }

  const icon = <FaRegSmile className={`mr-3 text-7xl sm:text-8xl lg:text-[11rem] ${disabled ? 'text-gray-500' : 'text-[#7CA3DE]'}`}/>

  const labels: Record<typeof type, string> = {
    start: disabled ? 'Form\nLocked' : 'Start\nSurvey',
    running: 'Fill out\n the survey',
    locked: 'Session\nis locked',
    match: disabled ? 'Matches\nNot Ready' : 'View My\n Match',
  }

  const description: Record<typeof type, React.ReactNode> = {
    start: disabled ? 'Please wait for the session to begin' : 'Please wait until the start of the session is announced by execs',
    running: "",
    locked: 'Please wait until the start of the session is announced by execs',
    match: disabled ? 'Matches will be available once released' : '', // ADD NUMBER OF SESSION LOGIC
  }

  const hoverClasses = disabled 
    ? 'cursor-not-allowed opacity-60' 
    : 'hover:cursor-pointer hover:border-2 hover:border-[#374895]'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[type]} ${hoverClasses} transition-all duration-300`}
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
