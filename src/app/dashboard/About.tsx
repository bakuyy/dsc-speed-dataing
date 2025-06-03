'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowRight } from 'react-icons/fa'
import Image from 'next/image'
import aboutBackground from '../../../public/images/dashboard/aboutBackground.svg'
import heading from '../../../public/images/dashboard/underLine.svg'
import whaleCup from '../../../public/images/dashboard/whaleCup.svg'
import whaleLightBulb from '../../../public/images/dashboard/whaleLightBulb.svg'
import fancytext from '../../../public/images/dashboard/fancytext.svg'

export default function About() {
  const router = useRouter()

  return (
    <section className="pt-15 md:pt-30 pb-20 md:pb-50 relative bg-white flex flex-col items-center">
      <div className="relative w-[90%] max-w-5xl aspect-[382/182] rounded-[50px] mx-auto">
        {/* WhaleLightBulb behind content */}
        <Image
          src={whaleLightBulb}
          alt="whale"
          width={96}
          className="absolute left-[-80px] sm:left-[-130px] md:left-[-200px] bottom-[-110px] sm:bottom-[-150px] md:bottom-[-270px] w-50 sm:w-80 md:w-100 lg:w-120 z-0 pointer-events-none"
          style={{ zIndex: 0 }}
          priority
        />

        <Image
          src={heading}
          alt="First time to Speed Friending :) ?"
          className="mb-1 md:mb-4 px-1 md:px-15 h-5.5 md:h-10 lg:h-15 w-auto relative z-10"
        />

        <div
          style={{
            backgroundImage: `url(${aboutBackground.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%'
          }}
          className="relative w-full h-full rounded-[50px]"
        >
          <div className="px-6 sm:px-10 md:px-15 lg:px-20 pt-3 sm:pt-5 md:pt-8 md:pt-10">
            <Image
              src={fancytext}
              alt="What is Speed Friending?"
              className="h-12 md:h-25 lg:h-35 w-auto"
              priority
            />
          </div>

          <Image
            src={whaleCup}
            alt="whale"
            width={96}
            className="absolute top-[-70px] md:top-[-90px] lg:top-[-120px] right-[-20px] w-42 sm:w-60 md:w-100 lg:w-120 z-10"
            priority
          />
          
          <p className="pr-33 sm:pr-55 md:pr-90 lg:pr-120 pl-7 md:pl-20 lg:pl-30 text-[0.6rem] sm:text-base md:text-xl text-[#1F2A44] leading-relaxed mb-6">
            <span className="font-bold italic">Lorem</span> ipsum that this is a good event or something psum that this is a good
            event or something psum that this is a good event or something
          </p>

          <div className="absolute bottom-4 md:bottom-15 right-5 md:right-20">
            <button
              onClick={() => router.push('/survey')}
              className="bg-[#5A89FB] hover:bg-[#2E4AA8] transition ease-in-out text-white text-[0.6rem] md:text-2xl py-1 md:py-2 px-2 md:px-4 rounded-full flex items-center gap-2"
            >
              Start Survey <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}