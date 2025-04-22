"use client"
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useMyContext } from "../../context/ListContext";
import { data } from " @/models/db";
import { Rank } from " @/types/types";


const rankTeams = data.ranking

export const AddTeam = () => {
  const { isOpenAdd, setisOpenAdd } = useMyContext();
  const cartRef = useRef<HTMLDivElement>(null);


  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setisOpenAdd(false); // Cierra el carrito si se hace clic fuera de él
    }
  };
  useEffect(() => {
    if (isOpenAdd) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenAdd]); // eslint-disable-line react-hooks/exhaustive-deps


  const handleAddTeam = async (id: string, teamName: string, ) => {
    try {
      const res = await fetch('/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          teamName,
        }),
      });
  
      if (!res.ok) {
        throw new Error('Error al agregar el team');
      }
  
      const data = await res.json();
      console.log('Team agregado:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div
      className={`${
        isOpenAdd
          ? "opacity-100 pointer-events-auto bg-black/90"
          : "opacity-0 pointer-events-none"
      } w-full h-screen  bg-hoverCard/20 px-3 fixed top-0 left-0 z-20 flex transition-all duration-300 justify-center items-center text-white`}
    >
      <div ref={cartRef} className="w-full xs:w-[400px] md:w-auto xs:min-w-[400px]  xs:min-h-[400px] bg-bgGames p-5 rounded-2xl relative">
        <button
          className="absolute right-4 top-4 bg-black text-white hover:bg-hoverCard px-4 py-2  rounded-full"
          onClick={() => setisOpenAdd(false)}
        >
          X
        </button>
        <div className="w-full flex justify-center">
          <p className="font-geistBold">SELECCIONAR EQUIPO INTERESADO</p>
        </div>

<div className="w-full grid grid-cols-8 gap-3 pt-4" >
        {rankTeams.map((team: Rank, index: number) => {
            return (
                <div
                key={index}
                onClick={() => handleAddTeam("SD-D.STURRIDGE-82-/images/ParisSaintGermain.png", team.logo)} // le pasás también el id
                  className="group hover:cursor-pointer w-full flex h-[56PX] px-2 hover:bg-hoverCard  hover:rounded-[4px] bg-bgGames/95 "
                >
                    {/* Logo */}
                    <div className="min-w-[56PX] flex justify-center items-center group-hover:bg-hoverCard">
                      <Image
                        src={team.logo}
                        alt={team.name}
                        width={46}
                        height={46}
                      />
                    </div>
                </div>
            );
          })}
</div>
    
      </div>
    </div>
  );
};
