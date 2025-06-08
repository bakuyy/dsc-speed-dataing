import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const page = () => {
  return (
    <div>
        <Navbar />
        <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-4xl font-bold'>Previous Matches</h1>
        </div>
        <Footer />
    </div>
  )
}

export default page
