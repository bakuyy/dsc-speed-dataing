'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowRight } from 'react-icons/fa'
import Image from 'next/image'
import aboutBackground from '../../../public/images/dashboard/aboutBackground.svg'
import heading from '../../../public/images/dashboard/underLine.svg'
import whaleCup from '../../../public/images/dashboard/whaleCup.svg'
import whaleLightBulb from '../../../public/images/dashboard/whaleLightBulb.svg'

export default function AboutPage() {
  const router = useRouter()

  return (
    <section className="mt-15 md:mt-30 relative min-h-screen bg-white">
      <Image
        src={whaleLightBulb}
        alt="whale"
        width={96}
        className="absolute left-[-80px] md:left-[0px] bottom-[400px] md:bottom-[-20px] w-50 md:w-120 z-0"
        style={{ zIndex: 0 }}
        priority
      />

      <Image
        src={heading}
        alt="First time to Speed Friending :) ?"
        className="px-1 md:px-15 h-5.5 md:h-15 w-auto"
      />

      <section className="mt-1 md:mt-5 relative mx-auto w-full max-w-6xl aspect-[382/182] rounded-[50px]">
        <div
          style={{
            backgroundImage: `url(${aboutBackground.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%'
          }}
        >
          <Image
            src={whaleCup}
            alt="whale"
            width={96}
            className="absolute top-[-60px] md:top-[-120px] right-[-10px] w-40 md:w-100 z-10"
            priority
          />

          {/* Heading & Subtext */}
          <h3 className="text-[2.5rem] font-bold italic text-white mb-1">W</h3>
          <p className="text-white text-sm italic mb-4">hat is Speed Friending ?</p>
            
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-[#1F2A44] leading-relaxed mb-6">
            <span className="font-bold italic">Lorem</span> ipsum that this is a good event or something psum that this is a good
            event or something psum that this is a good event or something psum that this is a good event or something
          </p>

          <div className="flex justify-end">
            <button
              onClick={() => router.push('/dashboard/survey')}
              className="bg-[#5A89FB] hover:bg-[#2E4AA8] text-white text-sm sm:text-base font-semibold py-2 px-4 rounded-full flex items-center gap-2"
            >
              Start Survey <FaArrowRight />
            </button>
          </div>
        </div>
      </section>
    </section>
  )
}