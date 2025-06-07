'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import instructionBackground from '../../../public/images/dashboard/InstructionBackground.svg'
import whale1 from '../../../public/images/dashboard/whaleLightBulb.svg'
import whale2 from '../../../public/images/dashboard/whaleCup.svg'
import fancyText from '../../../public/images/dashboard/fancytext1.svg'
import StepCard from './StepCard'

export default function InstructionPage() {
  const [showBg, setShowBg] = useState(true)

  useEffect(() => {
    // Function to check screen size
    const checkScreen = () => {
      setShowBg(window.innerWidth < 1024) 
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  return (
  <section>
    {/*mobile view*/}
    {showBg ? (
    <div className="w-full bg-[#E6EFFD] flex flex-col items-center pb-30 sm:pb-40 md:pb-45"> {/*FIXXX*/}
      <div className="relative w-[90%] max-w-6xl aspect-[2/3] rounded-[50px] mx-auto">
        <Image
          src={fancyText}
          alt="How to participate?"
          className="h-15 sm:h-19 md:h-24 lg:h-30 w-auto mx-auto mt-2 md:mt-5 mb-4 md:mb-6"
          priority
        />
        <div
          className="relative w-full h-full rounded-[20px]"
          style={{
            ...(showBg
              ? {
                  backgroundImage: `url(${instructionBackground.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }
              : {}),
            width: '100%',
            height: '100%',
          }}
        >
          <div className="relative z-30 w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-2 gap-6 w-[90%] -mt-6 -mb-6">
              <StepCard
                step="Step 1:"
                description={
                  <>
                    <span className="font-bold italic">Lorem</span> ipsum that this is a good event or something psum that this is a good
                    event or something psum that this is a good event or something psum that this is a good event or something
                  </>
                }
                opacity={0.8}
                icon={whale2}
              />
              <StepCard
                step="Step 2:"
                description={
                  <>
                    <span className="font-bold italic">Lorem</span> ipsum that this is a good event or something psum that this is a good
                    event or something psum that this is a good event or something psum that this is a good event or something
                  </>
                }
                opacity={0.4}
              />
              <StepCard
                step="Step 3:"
                description={
                  <>
                    <span className="font-bold italic">Lorem</span> ipsum that this is a good event or something psum that this is a good
                    event or something psum that this is a good event or something psum that this is a good event or something
                  </>
                }
                opacity={0.4}
              />
              <StepCard
                step="Step 4:"
                description={
                  <>
                    <span className="font-bold italic">Lorem</span> ipsum that this is a good event or something psum that this is a good
                    event or something psum that this is a good event or something psum that this is a good event or something
                  </>
                }
                opacity={0.8}
                icon={whale1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    ) : ( 
    <div className="w-full bg-[#E6EFFD] flex flex-col items-center"> {/*desktop view*/}
      <Image
        src={fancyText}
        alt="How to participate?"
        className="h-15 sm:h-19 md:h-24 lg:h-30 w-auto mx-auto mt-2 md:mt-5 mb-4 md:mb-6"
        priority
      />
      <div className="relative z-30 w-full h-full flex items-center justify-center py-10">
        <div className="grid grid-cols-2 gap-6 w-[90%] -mt-6 -mb-6">
          <StepCard
            step="Step 1:"
            description={
              <>
              <span className="font-bold italic">Lorem</span> ipsum that this is a good event or something psum that this is a good
                event or something psum that this is a good event or something psum that this is a good event or something
              </>
            }
            opacity={0.8}
            icon={whale2}
          />
          <StepCard
            step="Step 2:"
            description={
              <>
              <span className="font-bold italic">Lorem</span> ipsum that this is a good event or something psum that this is a good
              event or something psum that this is a good event or something psum that this is a good event or something
              </>
            }
            opacity={0.4}
          />            
          <StepCard
            step="Step 3:"
            description={
              <>
              <span className="font-bold italic">Lorem</span> ipsum that this is a good event or something psum that this is a good
              event or something psum that this is a good event or something psum that this is a good event or something
              </>
            }
            opacity={0.4}
          />
          <StepCard
            step="Step 4:"
            description={
              <>
              <span className="font-bold italic">Lorem</span> ipsum that this is a good event or something psum that this is a good
              event or something psum that this is a good event or something psum that this is a good event or something
              </>
            }
            opacity={0.8}
            icon={whale1}
          />
        </div>
      </div>
    </div>
    )}
  </section>
  )
}
