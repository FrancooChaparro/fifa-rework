"use client";
import React, { useRef, useState } from "react";
import { top20 } from " @/models/db";
import Image from "next/image";

export const CarruselTeam: React.FC = () => {
  const carruselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1); // Índice de la imagen central

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const carrusel = carruselRef.current;
    if (!carrusel) return;

    setIsDragging(true);
    setStartX(e.pageX - carrusel.offsetLeft);
    setScrollLeft(carrusel.scrollLeft);
  };

  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const carrusel = carruselRef.current;
    if (!carrusel) return;

    const x = e.pageX - carrusel.offsetLeft;
    const walk = (x - startX) * 1.5; // Ajusta la sensibilidad del arrastre
    carrusel.scrollLeft = scrollLeft - walk;

    // Actualiza el índice central basado en el desplazamiento
    const newIndex = Math.round(carrusel.scrollLeft / (carrusel.offsetWidth / 3));
    setActiveIndex(newIndex);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={carruselRef}
      className="w-full overflow-x-auto  h-[850px] bg-red-300 overflow-y-hidden whitespace-nowrap flex items-center cursor-pointer no-scrollbar"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      {top20.players.map((team:any, index:any) => {
        const isActive = index === activeIndex;
        const isAdjacent = index === activeIndex - 1 || index === activeIndex + 1;

        return (
          <div
            className={`flex-shrink-0 px-4 mx-2 flex justify-center items-center rounded-md transition-transform duration-300 ${
              isActive ? "scale-125" : isAdjacent ? "scale-100" : "scale-75"
            }`}
            key={index}
          >
            <div
              className={`relative w-[650px] h-[650px] ${
                isActive ? "filter-none" : "filter grayscale"
              }`}
            >
              <Image
                src={team.image}
                alt={`Escudo de ${team.name}`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
