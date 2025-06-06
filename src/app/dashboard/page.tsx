import React from 'react'
import Dashboard from '../components/UserDashboard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Logo from "../../../public/images/logo.png"
import Image from "next/image"
import About from '../components/About'

export default function DashPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#E6EFFD]">
      <Navbar />
      <Image src={Logo} alt="Logo" className="w-3/5 lg:w-2/5 h-auto mx-auto py-8"/>
      <Dashboard />
      <Footer />
    </div>
  )
}

