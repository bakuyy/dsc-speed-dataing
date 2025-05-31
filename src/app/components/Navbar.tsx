"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Logo from '../../../public/images/dscLogo.png'
import { FaRegSmile } from "react-icons/fa";
import { FaRegSmileWink } from "react-icons/fa";

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { logout } from '@/store/loginTokenSlice';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    router.push("/home");
  }

  const handleSignOut = () => {
    console.log('[Sign Out] User signed out');
    dispatch(logout());
    router.push('/');
  };


  return (
    <nav className="w-full flex items-center justify-between px-6 py-6 bg-white shadow-sm relative z-20 rounded-b-2xl font-jakarta">
      <div className="flex items-center">
        <Image src={Logo} onClick={handleClick} alt="Logo" className="w-8 h-8 md:w-12 md:h-12 cursor-pointer" />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <span className="text-lg md:text-2xl font-bold tracking-wide text-[#374995] italic font-jakarta">
          Speed-<span className='text-[#5989fc] font-jakarta'>Friend</span>ing Social
        </span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <a href="/home" className="text-[#374995] cursor-pointer font-semibold hover:text-blue-500 font-medium transition font-jakarta">Dashboard</a>
        <a href="/information" className="text-[#374995] cursor-pointer font-semibold hover:text-blue-500 font-medium transition font-jakarta">How it works</a>
        <button onClick={handleSignOut} className="rounded-xl cursor-pointer font-semibold p-2 hover:bg-[#e1eaf8] transition font-jakarta">Log Out</button>
      </div>
      

      <button
        className='md:hidden flex items-center text-3xl focus:outline-none z-30 font-jakarta'
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open menu"
      >
        {
            menuOpen ? <FaRegSmileWink/> : <FaRegSmile/>
        }
      </button>

      <div
        className={
          `fixed inset-0 bg-[#e1eaf8] flex flex-col items-center justify-center gap-4
          transition-transform duration-500 ease-in-out
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
          z-20 font-jakarta`
        }
      >
        <button
          className="absolute top-6 right-6 text-3xl text-[#374995] focus:outline-none font-jakarta"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
        </button>
        <a href="/" className="text-2xl text-jakarta text-[#374995] hover:text-blue-500 font-bold transition font-jakarta" onClick={() => setMenuOpen(false)}>Dashboard</a>
        <a href="/about" className="text-2xl text-[#374995] hover:text-blue-500 font-bold transition font-jakarta" onClick={() => setMenuOpen(false)}>How it works</a>
        <button onClick={handleSignOut} className="rounded-xl p-2 text-[#374995] hover:bg-[#374995] hover:text-white transition font-jakarta">Log Out</button>

      </div>
    </nav>
  )
}

export default Navbar
