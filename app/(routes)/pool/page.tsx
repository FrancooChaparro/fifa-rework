"use client"
import React, { useState } from "react";
import { data } from " @/models/db";
import Image from "next/image";
import { useMyContext } from "../../../context/ListContext";
import { useRouter } from "next/navigation";

export default function PoolPage() {
  const { Franco, FrancoBombo, Marcos, MarcosBombo, Gaston, GastonBombo, Roma, RomaBombo } = useMyContext();
  const router = useRouter();

  const [GastonCopy, setGastonCopy] = useState<any>([]);
  const [FrancoCopy, setFrancoCopy] = useState<any>([]);
  const [MarcosCopy, setMarcosCopy] = useState<any>([]);
  const [RomaCopy, setRomaCopy] = useState<any>([]);



  let equipos = [
    { nombre: "Real Madrid", escudo: "/images/RealMadrid.png", rank: "#5" },
    { nombre: "Manchester City", escudo: "/images/mancity.png", rank: "#4" },
    {
      nombre: "Bayern Munich",
      escudo: "/images/BayernMunchen.png",
      rank: "#2",
    },
    { nombre: "Barcelona", escudo: "/images/Barcelona.webp", rank: "#6" },
  ];

  let bombo2 = [
    {
      nombre: "Manchester United",
      escudo: "/images/ManchesterUnited.png",
      rank: "#3",
    },
    { nombre: "Liverpool", escudo: "/images/Liverpool.png", rank: "#19" },
    { nombre: "Inter", escudo: "/images/Internazionale.png", rank: "#15" },
    { nombre: "Dortmund", escudo: "/images/BorussiaDortmund.png", rank: "#22" },
  ];
  let bombo3 = [
    { nombre: "Milan", escudo: "/images/Milan.png", rank: "#23" },
    { nombre: "Tottenham", escudo: "/images/Tottenham.png", rank: "#7" },
    { nombre: "Arsenal", escudo: "/images/arsenalfc.png", rank: "#16" },
    { nombre: "Newcastle", escudo: "/images/newcastlee.png", rank: "#8" },
  ];
  let bombo4 = [
    { nombre: "Napoli", escudo: "/images/SSC_Neapel.svg.png", rank: "#13" },
    { nombre: "Roma", escudo: "/images/ASRoma.png", rank: "#29" },
    { nombre: "Aston Villa", escudo: "/images/AstonVilla.png", rank: "#12" },
    { nombre: "Porto", escudo: "/images/oporto.png", rank: "#9" },
  ];

  let bombo5 = [
    { nombre: "Sevilla", escudo: "/images/sevillaa.png", rank: "#11" },
    {
      nombre: "Bayern 04 Leverkusen",
      escudo: "/images/bayern04.png",
      rank: "#32",
    },
    { nombre: "Zenit", escudo: "/images/Zenit.png", rank: "#21" },
    { nombre: "Valencia", escudo: "/images/valenciafc.png", rank: "#14" },
  ];

  let bombo6 = [
    { nombre: "Benfica", escudo: "/images/Benfica.png", rank: "#25" },
    {
      nombre: "Sporting Lisboa",
      escudo: "/images/SportingLisboa.png",
      rank: "#26",
    },
    { nombre: "Everton", escudo: "/images/evertonfc.png", rank: "#28" },
    { nombre: "Lazio", escudo: "/images/laziofc.png", rank: "#24" },
  ];

  let bombo7 = [
    { nombre: "Villa Real", escudo: "/images/villar.png", rank: "#18" },
    { nombre: "Wolfburgo", escudo: "/images/wolfburgo.png", rank: "#30" },
    { nombre: "Lyon", escudo: "/images/Lyon.png", rank: "#31" },
    { nombre: "Ajax", escudo: "/images/Ajax.png", rank: "#20" },
  ];

  let bombo8 = [
    { nombre: "Chelsea", escudo: "/images/Chelsea.png", rank: "#10" },
    {
      nombre: "Juventus",
      escudo: "/images/da-removebg-preview.png",
      rank: "#17",
    },
    {
      nombre: "Paris Saint Germain",
      escudo: "/images/ParisSaintGermain.png",
      rank: "#1",
    },
    {
      nombre: "Atletico Madrid",
      escudo: "/images/AtleticoMadrid.png",
      rank: "#27",
    },
  ];



  let franco: any = [];
  let gaston: any = [];
  let marcos: any = [];
  let roma: any = [];

  // Asignar un equipo aleatorio a cada arreglo
 // Asignar un equipo aleatorio a cada arreglo
 function alear() {
  if (equipos.length === 0) {
    equipos = bombo2;
  }
  if (equipos.length === 0 && bombo2.length === 0) {
    equipos = bombo3;
  }

  if (equipos.length === 0 && bombo3.length === 0) {
    equipos = bombo4;
  }
  if (equipos.length === 0 && bombo4.length === 0) {
    equipos = bombo5;
  }
  if (equipos.length === 0 && bombo5.length === 0) {
    equipos = bombo6;
  }
  if (equipos.length === 0 && bombo6.length === 0) {
    equipos = bombo7;
  }

  while (equipos.length > 0) {
    
    let indiceAleatorio
    let equipoAleatorio
    // Generar un índice aleatorio dentro del rango de los equipos disponibles

      indiceAleatorio = Math.floor(Math.random() * equipos.length);
      // Extraer el equipo aleatorio y agregarlo al arreglo correspondiente
      equipoAleatorio = equipos.splice(indiceAleatorio, 1)[0];
      marcos.push(equipoAleatorio);
    


    // Repetir el proceso para los otros arreglos
    indiceAleatorio = Math.floor(Math.random() * equipos.length);
    equipoAleatorio = equipos.splice(indiceAleatorio, 1)[0];
    gaston.push(equipoAleatorio);

    indiceAleatorio = Math.floor(Math.random() * equipos.length);
    equipoAleatorio = equipos.splice(indiceAleatorio, 1)[0];
    franco.push(equipoAleatorio);

    
    indiceAleatorio = Math.floor(Math.random() * equipos.length);
    equipoAleatorio = equipos.splice(indiceAleatorio, 1)[0];
    roma.push(equipoAleatorio);
  }

  if (bombo7.length === 0) {

    marcos = [{ nombre: "Chelsea", escudo: "/images/Chelsea.png", rank: "#10" }, ...marcos];

    gaston = [{ nombre: "Juventus", escudo: "/images/da-removebg-preview.png", rank: "#17" }, ...gaston];

    franco = [{ nombre: "Paris Saint Germain", escudo: "/images/ParisSaintGermain.png", rank: "#1" }, ...franco];
    
    roma = [{ nombre: "Atletico Madrid", escudo: "/images/AtleticoMadrid.png" , rank: "#27"}, ...roma];

    // marcos.push();

    Franco(franco)
    Gaston(gaston)
    Marcos(marcos)
    Roma(roma)

    return;
  }
  alear();
}
  // Función para renderizar cada pool
  const renderPool = (poolName: any, bombo: any) => (
    <div className="w-full bg-white text-black rounded-md h-[120px] flex flex-col justify-center font-geistRegular">
      <div className="w-full flex justify-center items-center p-4 font-bold">
        <p>{poolName}</p>
      </div>
      {poolName === "Oficial Pool" || poolName === "Pool 3" ? (
        <div className="w-full flex justify-around">
          {bombo.map((team: any, index: number) => (
            <Image
              src={team.escudo}
              alt={team.nombre}
              width={22}
              height={22}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-around">
          {bombo.map((team: any, index: number) => (
            <Image
              src={team.escudo}
              alt={team.nombre}
              width={30}
              height={30}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full pt-[60px] bg-bgGames  pb-[80px] overflow-hidden">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-5 px-5 py-10">
        {renderPool("Oficial Pool", bombo8)}
        {renderPool("Pool 1", equipos)}
        {renderPool("Pool 2", bombo2)}
        {renderPool("Pool 3", bombo3)}
        {renderPool("Pool 4", bombo4)}
        {renderPool("Pool 5", bombo5)}
        {renderPool("Pool 6", bombo6)}
        {renderPool("Pool 7", bombo7)}
      </div>

      <div className="w-full flex justify-center gap-6 py-5 text-lg text-white">
        <button onClick={()=> alear()} className="w-[160px] h-[60px] relative bg-bgPrimary text-white rounded-[8px] font-geistRegular overflow-hidden group">
          <span className="relative z-10" >START</span>
          <div className="absolute inset-0 bg-hoverCard translate-x-[-100%] transition-transform duration-80 ease-out group-hover:translate-x-0"></div>
        </button>

        <button onClick={()=> router.push("/draft")} className="w-[160px] h-[60px] relative bg-bgPrimary text-white rounded-[8px] font-geistRegular overflow-hidden group">
          <span  className="relative z-10">DRAFT</span>
          <div className="absolute inset-0 bg-hoverCard translate-x-[-100%] transition-transform duration-80 ease-out group-hover:translate-x-0"></div>
        </button>
      </div>

      <div className=" px-5 lg:px-5 xl:px-14 w-full select-none pt-10">
           <div className="grid grid-cols-4 gap-3 md:gap-10 xl:gap-20 font-geistRegular">
             <div className="w-full rounded-[4px] bg-bgPrimary">
             <p className="font-geistBold text-[15px] lg:text-[22px] text-fontTitle  px-4 py-3 lg:px-6 lg:py-6">Franco</p>

               {FrancoBombo.length &&
              FrancoBombo.map((team: any, index: any) => {
                 return (
                   <div
                     key={index}
                     className="bg-bgPrimary group hover:cursor-pointer w-full flex h-[70px] justify-between gap-2 px-2 font-bold text-[12px] hover:bg-hoverCard  hover:rounded-[4px] bg-bgGames/95 text-sm text-[#ffffff] "
                   >
                     {/* Sección izquierda */}
                     <div className="flex gap-[2px] md:gap-3 items-center hover:cursor-pointer">
                       {/* Rank */}
                       <div className="min-w-[30px] rounded-md h-full justify-center items-center flex group-hover:bg-hoverCard">
                         <span className="text-lg">{team.rank}</span>
                       </div>
     
                       {/* Logo */}
                       <div className="min-w-[40px] flex justify-center items-center group-hover:bg-hoverCard">
                         <Image
                           src={team.escudo}
                           alt={team.nombre}
                           width={32}
                           height={32}
                         />
                       </div>
     
                       {/* Nombre */}
                       <span className="group-hover:text-hoverText hidden md:block">
                         {team.nombre}
                       </span>
                     </div>
     
                    
                   </div>
                 );
               })}
             </div>
             <div className="w-full rounded-[4px] bg-bgPrimary">
             <p className="font-geistBold text-[15px] lg:text-[22px] text-fontTitle px-4 py-3 lg:px-6 lg:py-6">Gaston</p>

               {" "}
               {GastonBombo.length &&
              GastonBombo.map((team: any, index: any) => {
                 return (
                   <div
                     key={index}
                     className="bg-bgPrimary group w-full  hover:cursor-pointer flex h-[70px] justify-between gap-2 px-2 font-bold text-[12px] hover:bg-hoverCard hover:rounded-[4px] bg-bgGames/95 text-sm text-[#ffffff] "
                   >
                     {/* Sección izquierda */}
                     <div className="flex gap-[2px] md:gap-3 items-center hover:cursor-pointer">
                       {/* Rank */}
                       <div className="min-w-[30px] rounded-md h-full justify-center items-center flex group-hover:bg-hoverCard">
                         <span className="text-lg">{team.rank}</span>
                       </div>
     
                       {/* Logo */}
                       <div className="min-w-[40px] flex justify-center items-center group-hover:bg-hoverCard">
                         <Image
                           src={team.escudo}
                           alt={team.nombre}
                           width={32}
                           height={32}
                         />
                       </div>
     
                       {/* Nombre */}
                       <span className="group-hover:text-hoverText hidden md:block">
                         {team.nombre}
                       </span>
                     </div>
     
                    
                   </div>
                 );
               })}
             </div>
             <div className="w-full rounded-[4px] bg-bgPrimary">
             <p className="font-geistBold text-[15px] lg:text-[22px] text-fontTitle px-4 py-3 lg:px-6 lg:py-6">Marcos</p>

               {" "}
               {MarcosBombo.length &&
              MarcosBombo.map((team: any, index: any) => {
                 return (
                   <div
                     key={index}
                     className="bg-bgPrimary group w-full hover:cursor-pointer flex h-[70px] justify-between gap-2 px-2 font-bold text-[12px] hover:bg-hoverCard  hover:rounded-[4px] bg-bgGames/95 text-sm text-[#ffffff] "
                   >
                     {/* Sección izquierda */}
                     <div className="flex gap-[2px] md:gap-3 items-center hover:cursor-pointer">
                       {/* Rank */}
                       <div className="min-w-[30px] rounded-md h-full justify-center items-center flex group-hover:bg-hoverCard">
                         <span className="text-lg">{team.rank}</span>
                       </div>
     
                       {/* Logo */}
                       <div className="min-w-[40px] flex justify-center items-center group-hover:bg-hoverCard">
                         <Image
                           src={team.escudo}
                           alt={team.nombre}
                           width={32}
                           height={32}
                         />
                       </div>
     
                       {/* Nombre */}
                       <span className="group-hover:text-hoverText hidden md:block">
                         {team.nombre}
                       </span>
                     </div>
     
                    
                   </div>
                 );
               })}
             </div>
             <div className="w-full rounded-[4px] bg-bgPrimary">
             <p className="font-geistBold text-[15px] lg:text-[22px] text-fontTitle px-4 py-3 lg:px-6 lg:py-6">Rodrigo</p>

               {RomaBombo.length &&
              RomaBombo.map((team: any, index: any) => {
                 return (
                   <div
                     key={index}
                     className="bg-bgPrimary group hover:cursor-pointer w-full flex h-[70px] justify-between gap-2 px-2 font-bold text-[12px] hover:bg-hoverCard  hover:rounded-[4px] bg-bgGames/95 text-sm text-[#ffffff] "
                   >
                     {/* Sección izquierda */}
                     <div className="flex gap-[2px] md:gap-3 items-center hover:cursor-pointer">
                       {/* Rank */}
                       <div className="min-w-[30px] rounded-md h-full justify-center items-center flex group-hover:bg-hoverCard">
                         <span className="text-lg">{team.rank}</span>
                       </div>
     
                       {/* Logo */}
                       <div className="min-w-[40px] flex justify-center items-center group-hover:bg-hoverCard">
                         <Image
                           src={team.escudo}
                           alt={team.nombre}
                           width={32}
                           height={32}
                         />
                       </div>
     
                       {/* Nombre */}
                       <span className="group-hover:text-hoverText hidden md:block">
                         {team.nombre}
                       </span>
                     </div>
     
                    
                   </div>
                 );
               })}
             </div>
           </div>
         </div>
    </div>
  );
}
