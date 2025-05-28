'use client'
import React from 'react'
import FooterImage from "../../../public/images/footerDark.png"
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='absolute bottom-0 py-2 left-0 right-0 text-center text-sm text-[#374995] font-varela-round z-10'>
        <Image src={FooterImage} alt="Footer" className='w-full h-[60px] absolute bottom-0 z-0'/>
        <div className='relative z-10 text-center flex items-center text-white justify-center gap-2'>
        made w 💙 by UWDSC © 2025
    </div>
    </div>

  )
}

export default Footer
