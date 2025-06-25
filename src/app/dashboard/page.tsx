import React from 'react'
import Dashboard from './Dashboard'
import Navbar from '@/app/components/Navbar'
import Footer from '../components/Footer'
import Logo from "../../../public/images/logo.png"
import Image from "next/image"

export const metadata = {
  title: 'Dashboard',
  description: 'View your matches and event information.',
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#E6EFFD]">
      <Navbar />
      <Image src={Logo} alt="Logo" className="w-3/5 lg:w-2/5 h-auto mx-auto py-8"/>
      <Dashboard />
      if ()
      <Footer />
    </div>
  )
}

