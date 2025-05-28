'use client'
import React from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

const page = () => {
  return (
    <div className='bg-[#e1eaf8] w-screen h-screen'>
      <Navbar/>
      <div className='flex items-center justify-center h-screen'>
        information
      </div>

      <Footer/>
      
    </div>
  )
}

export default page
