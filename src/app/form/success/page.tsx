'use client'
import Link from 'next/link'
import Navbar from '../../components/Navbar'

export default function SuccessPage() {
  return (
    <div className="bg-[#e1eaf8] min-h-screen w-screen">
      <Navbar />
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="bg-white p-10 rounded-2xl shadow-md max-w-lg text-center">
          <h1 className="text-3xl font-bold text-[#374995] mb-4">Thank you!</h1>
          <p className="text-[#374995] mb-6">
            Your response has been submitted successfully. We’ll see you at the event!
          </p>
          <Link
            href="/dashboard"
            className="text-white bg-[#4b6cb7] px-5 py-2 rounded-full hover:bg-[#3f5cb1] transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}

