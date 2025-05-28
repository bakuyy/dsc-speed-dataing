'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import LogoWhite from '../../../public/images/logoNoText.png';
import { FaRegSmile, FaRegSmileWink } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { logout } from '@/store/loginTokenSlice';
import FooterImage from '../../../public/images/login/footer.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    router.push('/home');
  };

  const handleSignOut = async () => {
    console.log('[Sign Out] User signed out');
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      dispatch(logout());
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
      dispatch(logout());
      window.location.href = '/?logout=true';
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm relative z-20 rounded-b-2xl font-varela-round">
      <div className="flex items-center">
        <Image
          src={LogoWhite}
          onClick={handleClick}
          alt="Logo"
          className="w-auto h-12 md:w-auto md:h-14 cursor-pointer"
        />
      </div>

      <div className="hidden md:flex items-center gap-6">
        <a
          href="/home"
          className="text-[#5e8aff] cursor-pointer font-semibold hover:text-[#374995] font-medium transition duration-300 font-varela-round"
        >
          dashboard
        </a>
        <a
          href="/home/information"
          className="text-[#5e8aff] cursor-pointer font-semibold hover:text-[#374995] font-medium transition font-varela-round"
        >
          how it works
        </a>
        <button
          onClick={handleSignOut}
          className="rounded-xl cursor-pointer font-semibold p-2 hover:bg-[#e1eaf8] transition font-varela-round"
        >
          logout
        </button>
      </div>

      <button
        className="md:hidden text-[#374995] flex items-center text-3xl focus:outline-none z-30 font-varela-round"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open menu"
      >
        {menuOpen ? <FaRegSmileWink /> : <FaRegSmile />}
      </button>

      <div
        className={`fixed inset-0 bg-[#e1eaf8] flex flex-col items-center justify-center gap-4 transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-20 font-varela-round`}
      >
        <button
          className="absolute top-6 right-6 text-3xl text-[#374995] focus:outline-none font-varela-round"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <FaRegSmileWink />
        </button>
        <a
          href="/home"
          className="text-2xl text-varela-round text-[#374995] hover:text-blue-500 transition font-varela-round"
          onClick={() => setMenuOpen(false)}
        >
          dashboard
        </a>
        <a
          href="/home/information"
          className="text-2xl text-[#374995] hover:text-blue-500 transition font-varela-round"
          onClick={() => setMenuOpen(false)}
        >
          how it works
        </a>
        <button
          onClick={handleSignOut}
          className="rounded-xl p-2 text-2xl text-[#374995] hover:bg-[#374995] hover:text-white transition font-varela-round"
        >
          logout
        </button>
        {menuOpen ? (
          <Image src={FooterImage} alt="Logo" className="absolute bottom-0 w-full" />
        ) : (
          ''
        )}
      </div>
    </nav>
  );
};

export default Navbar;