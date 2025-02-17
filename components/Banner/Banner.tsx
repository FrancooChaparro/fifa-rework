import Image from 'next/image';
import React from 'react';


const Banner = () => {
  return (
    <div className='w-full h-screen relative bg-no-repeat bg-center overflow-hidden'>
      <Image
        src={"/images/pogbaaa.jpg"}
        alt={"alt"}
        fill
        loading="lazy"
        placeholder="blur" 
        blurDataURL='/images/blur.png'
        className='w-full h-full object-cover 2xl:h-auto'
      />
       <div className="absolute md:w-full w-[385px] xs:w-[480px] bottom-[100px] left-[40px] lg:left-[100px] text-white">
        <p className="font-bold text-[1.75rem] mb-[0.8rem] font-geistRegular">KING POGBA</p>
        <span className="text-[0.875rem] mb-[0.75rem] font-geistLight overflow-ellipsis">Paul Pogba consigue ser tricampeon con 3 equipos diferentes, sin dudas es el jugador del momento!</span>
      </div> 
    </div>
  )
}


export default Banner;