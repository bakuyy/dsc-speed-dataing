import React from 'react'
import Dashboard from './UserDashboard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function DashPage() {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  )
}

