"use client"
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useMyContext } from "../../context/ListContext";


export const GameDetails = () => {
  const { isOpenGame, seterGame, detailsGame } = useMyContext();
  const cartRef = useRef<HTMLDivElement>(null);


  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      seterGame(false, detailsGame); // Cierra el carrito si se hace clic fuera de él
    }
  };
  useEffect(() => {
    if (isOpenGame) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenGame]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div
      className={`${
        isOpenGame
          ? "opacity-100 pointer-events-auto bg-black/80"
          : "opacity-0 pointer-events-none"
      } w-full h-screen  bg-hoverCard/20 px-3 fixed top-0 left-0 z-20 flex transition-all duration-300 justify-center items-center text-white`}
    >
      <div ref={cartRef} className="w-full xs:w-[400px] md:w-auto xs:min-w-[400px]  xs:min-h-[400px] bg-bgGames p-5 rounded-2xl relative">
        <button
          className="absolute right-4 top-4 bg-black text-white hover:bg-hoverCard px-4 py-2  rounded-full"
          onClick={() => seterGame(false, detailsGame)}
        >
          X
        </button>
        <div className="w-full flex justify-center">
          <p className="font-geistBold">DETALLES DEL PARTIDO</p>
        </div>

        <div className="flex justify-between items-center gap-3 relative">
          <div className="absolute top-0 left-0 w-full flex justify-center">
            <div className={`mt-4 px-2 ${detailsGame?.isLegit === "L" ? "bg-violet-600 " : "bg-gray-500"} rounded-md`}>
              <p className="text-lg text-white font-geistRegular">{detailsGame?.isLegit === "L" ? "LEGITIMO" : "NO LEGITIMO"}</p>
            </div>
          </div>
         <div className="absolute bottom-0 left-0 w-full flex justify-center">
            <div className={`mt-4 px-2 ${detailsGame?.Result === "Victory" ? "bg-green-600 " : detailsGame?.Result === "Defeat" ? "bg-red-600" : "bg-[#e3d022]"}  rounded-md`}>
              <p className="text-lg text-white font-geistRegular">{detailsGame?.Result}</p>
            </div>
          </div>
          <div className="flex w-[80px] xs:w-[100px] md:w-[180px] items-center gap-2 justify-center text-center ">
            <div className="flex flex-col gap-1">
           {detailsGame.LocalEscudo &&
              <Image
                src={detailsGame.LocalEscudo}
                alt={detailsGame.LocalNombre}
                width={150}
                height={150}
                priority
              />
           }
              <p className="font-geistBold">{detailsGame?.LocalNombre}</p>
            </div>
          </div>

          <div className="h-full flex justify-center items-center ">
            {/* <p className="text-[44px] font-geistBold">
              {detailsGame?.LocalResultado} - {detailsGame?.VisitanteResultado}
            </p> */}
            <div className="flex text-center items-center gap-2">
              <span className={`text-[20px] md:text-[32px] font-geistRegular ${detailsGame?.Penalty ? "" : "bg-red-300 pr-5"}`}>{detailsGame?.Penalty ? `(${detailsGame?.LocalPenalty})` : ""}</span> 
              <span className="text-[26px] md:text-[44px] font-geistBold">    
                {detailsGame?.LocalResultado} - {detailsGame?.VisitanteResultado}
              </span>
               <span className={`text-[20px] md:text-[32px] font-geistRegular ${detailsGame?.Penalty ? "" : "bg-red-300 pl-5"}`}>{detailsGame?.Penalty ?`(${detailsGame?.VisitantePenalty})` : ""}</span> 
            </div>
          </div>

          <div className="flex w-[80px] xs:w-[100px] md:w-[180px] items-center gap-2 justify-center text-center">
            <div className="flex flex-col gap-1">
            {detailsGame.VisitanteEscudo &&
              <Image
                src={detailsGame.VisitanteEscudo}
                alt={detailsGame.VisitanteNombre}
                width={150}
                height={150}
                priority
              />
            }
              <p className="font-geistBold">{detailsGame?.VisitanteNombre}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-6">
          <div className="flex w-[180px] items-center gap-2 justify-center text-center">
            <div className="flex flex-col justify-center gap-2 items-center">
              <div className="w-[60px] h-[60px] overflow-hidden rounded-full ">
            {detailsGame.Player1 &&
                <Image
                  src={detailsGame.Player1 === "M" ? "/images/marcos.jpg" : detailsGame.Player1 === "F" ? "/images/Franco.jpg" : "/images/flakk.jpg"}
                  alt={detailsGame.VisitanteNombre}
                  width={60}
                  height={60}
                  priority
                  className="object-cover object-center"
                />
            }
              </div>
              <p className="font-geistRegular">{detailsGame.Player1 === "M" ? "Marcos Aquino" : detailsGame.Player1 === "F" ? "Franco Chaparro" : "Gaston Chaparro"}</p>
            </div>
          </div>

          <div className="flex w-[180px] items-center gap-2 justify-center text-center">
            <div className="flex flex-col justify-center gap-2 items-center">
              <div className="w-[60px] h-[60px] overflow-hidden rounded-full">
              {detailsGame.Player2 &&
                <Image
                  src={detailsGame.Player2 === "M" ? "/images/marcos.jpg" : detailsGame.Player2 === "F" ? "/images/Franco.jpg" : "/images/flakk.jpg"}
                  alt={detailsGame.VisitanteNombre}
                  width={60}
                  height={60}
                  priority
                  className="object-cover object-center"
                />
              }
              </div>
              <p className="font-geistRegular">{detailsGame.Player2 === "M" ? "Marcos Aquino" : detailsGame.Player2 === "F" ? "Franco Chaparro" : "Gaston Chaparro"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
