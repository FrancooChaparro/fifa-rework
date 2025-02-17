"use client";
import React, { useEffect, useMemo, useState } from "react";
import { data } from " @/models/db";
import { useMyContext } from " @/context/ListContext";
import { Poster } from " @/types/types";

export const Post = () => {
  const { isOpenPost, setOpening, indexPost, isOpenGame } = useMyContext();
  const [currentIndex, setCurrentIndex] = useState<number>(indexPost);

useMemo(()=> {
  setCurrentIndex(indexPost)
}, [indexPost])

  const infoNotice: Poster[] = data.poster
  // Función para moverte a la izquierda
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? infoNotice.length - 1 : prevIndex - 1
    );
  };

  // Función para moverte a la derecha
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === infoNotice.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    document.documentElement.classList.toggle("no-scroll", isOpenPost);
    return () => {
      document.documentElement.classList.remove("no-scroll");
    };
  }, [isOpenPost]);



  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("no-scroll");
    };
  }, []);


  return (
    <div
      className={`${
        isOpenPost
          ? "opacity-100 pointer-events-auto bg-black/80"
          : "opacity-0 pointer-events-none"
      } w-full bg-[grey] h-screen z-20 fixed top-0 left-0 text-white transition-all duration-500`}
    >
      {/* Barra superior */}
      {/* Contenedor del slider */}
      <div className="relative h-full w-full overflow-hidden">
        {/* Botones de navegación */}
        <button
          onClick={handlePrev}
          className="absolute text-lg left-4 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 z-40 hover:bg-hoverCard"
        >
          {`<`}
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4  text-lg top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 z-40 hover:bg-hoverCard"
        >
          {`>`}
        </button>
        <button className="absolute right-4 top-[85px]  bg-bgGames text-white hover:bg-hoverCard px-4 py-2 z-40 rounded-full"
           onClick={()=> setOpening(false, indexPost)} 
        >
          X
        </button>
        <div className="absolute left-1/2  bottom-[75px] -translate-x-1/2 flex gap-1  text-white px-4 py-2 z-40">
          {infoNotice.map((_, index) => (
            <div
              key={index}
              className={`h-4 w-4 rounded-full ${
                index === currentIndex ? "bg-hoverCard" : "bg-bgGames"
              }`}
            ></div>
          ))}
        </div>

        {/* Imágenes del slider */}
        <div
          className="h-full flex transition-transform duration-500 absolute top-[75px]"
          style={{
            transform: `translateX(-${currentIndex * 100}vw)`,
            width: `${infoNotice.length * 100}vw`, // Ajusta el ancho del contenedor
          }}
        >
          {infoNotice.map((notice: Poster, index: number) => (
            <div
              key={index}
              className="h-[calc(100vh-150px)] w-screen flex items-center justify-center bg-gray-800 text-4xl relative"
            >
              <img
                src={notice.image}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-[50px] left-[12px] lg:bottom-[100px] lg:left-[75px] p-2 lg:p-8">
                <div className=" flex flex-col justify-between h-full">
                  <div className="font-geistBold text-[30px] text-white">
                    {notice.title}
                  </div>
                  <div className="font-geistLight text-[22px] text-white">
                    {notice.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
