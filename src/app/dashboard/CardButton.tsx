import React from 'react'

type CardButtonProps = {
  label: string
  onClick: () => void
}

export default function CardButton({ label, onClick }: CardButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-8 rounded-lg shadow hover:shadow-md transition flex items-center justify-center"
    >
      <span className="text-lg font-medium text-gray-800">{label}</span>
    </button>
  )
}