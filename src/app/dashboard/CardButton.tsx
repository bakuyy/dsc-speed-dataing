import React from 'react'

type CardButtonProps = {
  onClick: () => void
  children: React.ReactNode
}

export default function CardButton({ children, onClick }: CardButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-200 px-10 pt-15 pb-50 rounded-lg shadow hover:shadow-md hover:bg-gray-300 transition text-left flex whitespace-pre-line"
    >
      <span className="text-5xl text-gray-800 leading-normal">{children}</span>
    </button>
  )
}