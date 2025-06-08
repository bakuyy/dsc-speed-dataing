import React from 'react'
import Image, { StaticImageData } from 'next/image'

type StepCardProps = {
  step: string
  description: React.ReactNode
  opacity?: number 
  icon?: StaticImageData 
}

export default function StepCard({
  step,
  description,
  opacity = 0.9,
  icon,
}: StepCardProps) {
  return (
    <div
      className="relative rounded-[20px] shadow-md p-6 min-h-[220px] flex flex-col"
      style={{
        background: `rgba(255,255,255,${opacity})`,
        backdropFilter: 'blur(2px)',
      }}
    >
      <div className="text-md sm:text-xl md:text-3xl text-[#1F2A44] mb-2">{step}</div>
      {icon ? (
        <div className="absolute top-[-20] lg:top-[-35] right-[-30] w-25 h-25 lg:w-35 lg:h-35 pointer-events-none">
          <Image src={icon} alt="" fill style={{ objectFit: 'contain' }} />
        </div>
      ) : null}
      <div className="mt-2 text-[0.6rem] sm:text-[1.2rem] md:text-xl text-[#1F2A44] leading-relaxed">
        {description}
      </div>
    </div>
  )
}