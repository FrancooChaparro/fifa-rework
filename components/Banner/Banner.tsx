import Image from 'next/image';
import React from 'react';
import img from "../../public/images/pogbaaa.jpg"

const Banner = () => {
  return (
    <div className='w-full h-screen relative bg-no-repeat bg-center overflow-hidden'>
      <Image
        src={img}
        alt={"alt"}
        loading="lazy"
        placeholder="blur" 
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