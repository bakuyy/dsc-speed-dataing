import React from 'react'

type StepCardProps = {
  step: string
  title: string
  description: string
}

export default function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="bg-gray-300 p-6 h-120 rounded-lg shadow relative flex flex-col items-center justify-center">
      <div className="absolute top-6 left-6 text-sm font-bold text-gray-500">{step}</div>
      <h3 className="mt-2 font-semibold text-lg text-gray-800 text-center">{title}</h3>
      <p className="absolute bottom-5 left-6 text-xs text-gray-500">{description}</p>
    </div>
  )
}