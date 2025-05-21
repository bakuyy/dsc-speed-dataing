import React from 'react'

type StepCardProps = {
  step: string
  title: string
}

export default function StepCard({ step, title }: StepCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="text-sm font-bold text-gray-500">{step}</div>
      <h3 className="mt-2 font-semibold text-gray-800">{title}</h3>
      <p className="mt-1 text-xs text-gray-500">Subtext to explain in further detail</p>
    </div>
  )
}