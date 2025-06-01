'use client'
import React from 'react'
import Image from 'next/image'
import instructionBackground from '../../../public/images/dashboard/InstructionBackground.svg'
import whale1 from '../../../public/images/dashboard/whaleLightBulb.svg'
import whale2 from '../../../public/images/dashboard/whaleCup.svg'
import fancyText from '../../../public/images/dashboard/fancytext1.svg'

export default function InstructionPage() {
  return (
    <section className="w-screen h-screen bg-[#E6EFFD] flex flex-col items-center">
      <Image
        src={fancyText}
        alt="How to participate?"
        className="h-12 md:h-20 w-auto mx-auto"
        priority
      />

      {/* Card with background and steps */}
      <div
        className="relative w-full max-w-4xl aspect-[382/182] rounded-[50px] shadow-xl mx-auto overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `url(${instructionBackground.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Top left whale */}
        <Image
          src={whale1}
          alt="whale 1"
          className="absolute -top-16 -left-10 w-32 md:w-44 z-20 pointer-events-none"
        />
        {/* Bottom right whale */}
        <Image
          src={whale2}
          alt="whale 2"
          className="absolute -bottom-16 -right-10 w-36 md:w-48 z-20 pointer-events-none"
        />

        {/* Steps grid */}
        <div className="relative z-30 w-full h-full flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-[90%] py-10">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className="bg-white/90 backdrop-blur-md rounded-[30px] shadow-md p-4 sm:p-6 flex flex-col min-h-[180px] justify-between"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1F2A44] mb-2">
                  Step {step}:
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-[#1F2A44] leading-relaxed">
                  <span className="font-bold italic">Lorem</span> ipsum that this is a good event or something psum that this is a good
                  event or something psum that this is a good event or something psum that this is a good event or something
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
