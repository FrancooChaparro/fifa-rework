import React from "react";
import { data } from " @/models/db";
import { useMyContext } from " @/context/ListContext";
import Image from "next/image";

const info = data.poster

export const News = () => {
  const {  setOpening } = useMyContext();
  return (
    <div className="container-all w-full h-[calc(100vh-80px)]">
      {/* Título */}
      {/* Contenedor de imágenes */}
      <div className="container-layout-images grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-2 lg:grid-rows-[auto] h-full">
        {/* Imágenes */}
        <div onClick={() => setOpening(true, 0)} className="one relative flex justify-center items-center col-span-1 row-span-2  lg:row-span-2 group hover:cursor-pointer rounded-md overflow-hidden">
          <Image
            src={info[0].image}
            fill
            alt="Imagen 1"
            className="w-full h-full object-cover object-top lg:object-center"
          />
         <Description title={info[0].title} description={info[0].description}/>
        </div>
        <div onClick={() => setOpening(true, 1)} className="two relative overflow-hidden flex justify-center items-center col-span-1 row-span-2 lg:row-span-2 group hover:cursor-pointer rounded-md">
          <Image
            fill
            src={info[1].image}
            alt="Imagen 2"
            className="w-full h-full object-cover object-top lg:object-center"
          />
           <Description title={info[1].title} description={info[1].description}/>
      
        </div>
        <div onClick={() => setOpening(true, 2)} className="three relative overflow-hidden flex justify-center items-center col-span-1  row-span-2  lg:row-span-4 h-full group hover:cursor-pointer rounded-md">
          <Image
            fill
            src={info[2].image}
            alt="Imagen 3"
            className="w-full h-full object-cover "
          />
           <Description title={info[2].title} description={info[2].description}/>
    
        </div>
        <div onClick={() => setOpening(true, 3)} className="four relative overflow-hidden flex justify-center items-center col-span-1 row-span-2 lg:col-span-2 lg:row-span-2 group hover:cursor-pointer rounded-md">
          <Image
            fill
            src={info[3].image}
            alt="Imagen 4"
            className="w-full h-full object-cover"
          />
           <Description title={info[3].title} description={info[3].description}/>
      
        </div>
      </div>
    </div>
  );
};


const Description = ({title, description }: { title: string, description: string}) => {
  return (
    <div className="container-overlay absolute top-0 left-0 w-full h-full p-8 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <div className="container-overlay-split flex flex-col justify-between h-full">
      <div className="guantes font-geistBold text-[18px] lg:text-[24px] text-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300">
        {title}
      </div>
      <div className="vermas font-geistLight text-white text-[13px] lg:text-lg transform translate-x-full group-hover:translate-x-0 transition-transform duration-300">
        {description}
      </div>
    </div>
  </div>
  )
}