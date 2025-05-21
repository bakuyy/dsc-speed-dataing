"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { password } from './pw'

export default function Auth() {
  const [code, setCode] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code === password) {
      router.push(`/dashboard?code=${encodeURIComponent(code)}`)
    } else {
      alert('Incorrect access code')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl mb-4 text-black">Enter Access Code:</h1>
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="To find your soulmate </3"
          className="w-full border border-gray-300 text-gray-500 placeholder-gray-300 rounded px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full font-semibold bg-gray-400 text-white py-3 rounded hover:bg-gray-500 transition"
        >
          Join
        </button>
      </form>
    </div>
  )
}