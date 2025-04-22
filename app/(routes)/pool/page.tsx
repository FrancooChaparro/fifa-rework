"use client"
import React from "react";
import Image from "next/image";
import { useMyContext } from "../../../context/ListContext";
import { useRouter } from "next/navigation";
import { Team } from " @/types/types";

export default function PoolPage() {
  const { Franco, FrancoBombo, Marcos, MarcosBombo, Gaston, GastonBombo, Roma, RomaBombo } = useMyContext();
  const router = useRouter();

  let equiposT = [
    { nombre: "Real Madrid", escudo: "/images/RealMadrid.png", rank: "#6" },
    { nombre: "Manchester City", escudo: "/images/mancity.png", rank: "#3" },
    {
      nombre: "Bayern Munich",
      escudo: "/images/BayernMunchen.png",
      rank: "#2",
    },
    { nombre: "Barcelona", escudo: "/images/Barcelona.webp", rank: "#7" },
  ];

  let bombo2T = [
    {
      nombre: "Manchester United",
      escudo: "/images/ManchesterUnited.png",
      rank: "#5",
    },
    { nombre: "Liverpool", escudo: "/images/Liverpool.png", rank: "#14" },
    { nombre: "Inter", escudo: "/images/Internazionale.png", rank: "#14" },
    { nombre: "Dortmund", escudo: "/images/BorussiaDortmund.png", rank: "#22" },
  ];
  let bombo3T = [
    { nombre: "Milan", escudo: "/images/Milan.png", rank: "#24" },
    { nombre: "Tottenham", escudo: "/images/Tottenham.png", rank: "#9" },
    { nombre: "Arsenal", escudo: "/images/arsenalfc.png", rank: "#13" },
    { nombre: "Newcastle", escudo: "/images/newcastlee.png", rank: "#10" },
  ];
  let bombo4T = [
    { nombre: "Napoli", escudo: "/images/SSC_Neapel.svg.png", rank: "#16" },
    { nombre: "Roma", escudo: "/images/ASRoma.png", rank: "#30" },
    { nombre: "Aston Villa", escudo: "/images/AstonVilla.png", rank: "#15" },
    { nombre: "Porto", escudo: "/images/oporto.png", rank: "#11" },
  ];

  let bombo5T = [
    { nombre: "Sevilla", escudo: "/images/sevillaa.png", rank: "#12" },
    {
      nombre: "Bayern 04 Leverkusen",
      escudo: "/images/bayern04.png",
      rank: "#21",
    },
    { nombre: "Zenit", escudo: "/images/Zenit.png", rank: "#23" },
    { nombre: "Valencia", escudo: "/images/valenciafc.png", rank: "#17" },
  ];

  let bombo6T = [
    { nombre: "Benfica", escudo: "/images/Benfica.png", rank: "#28" },
    {
      nombre: "Sporting Lisboa",
      escudo: "/images/SportingLisboa.png",
      rank: "#26",
    },
    { nombre: "Everton", escudo: "/images/evertonfc.png", rank: "#29" },
    { nombre: "Lazio", escudo: "/images/laziofc.png", rank: "#27" },
  ];

  let bombo7T = [
    { nombre: "Villa Real", escudo: "/images/villar.png", rank: "#19" },
    { nombre: "Wolfburgo", escudo: "/images/wolfburgo.png", rank: "#31" },
    { nombre: "Lyon", escudo: "/images/Lyon.png", rank: "#32" },
    { nombre: "Ajax", escudo: "/images/Ajax.png", rank: "#20" },
  ];

  let bombo8T = [
    { nombre: "Chelsea", escudo: "/images/Chelsea.png", rank: "#8" },
    {
      nombre: "Juventus",
      escudo: "/images/juventud.png",
      rank: "#18",
    },
    {
      nombre: "Paris Saint Germain",
      escudo: "/images/ParisSaintGermain.png",
      rank: "#1",
    },
    {
      nombre: "Atletico Madrid",
      escudo: "/images/AtleticoMadrid.png",
      rank: "#25",
    },
  ];

  let equipos = [
    { nombre: "Real Madrid", escudo: "/images/RealMadrid.png", rank: "#6" },
    { nombre: "Manchester City", escudo: "/images/mancity.png", rank: "#3" },
    { nombre: "Bayern Munich", escudo: "/images/BayernMunchen.png", rank: "#2" },
    { nombre: "Barcelona", escudo: "/images/Barcelona.webp", rank: "#7" },
  ];

  let bombo2 = [
    { nombre: "Manchester United", escudo: "/images/ManchesterUnited.png", rank: "#5" },
    { nombre: "Liverpool", escudo: "/images/Liverpool.png", rank: "#14" },
    { nombre: "Inter", escudo: "/images/Internazionale.png", rank: "#4" },
    { nombre: "Dortmund", escudo: "/images/BorussiaDortmund.png", rank: "#22" },
  ];

  let bombo3 = [
    { nombre: "Milan", escudo: "/images/milan_test.png", rank: "#24" },
    { nombre: "Tottenham", escudo: "/images/Tottenham.png", rank: "#9" },
    { nombre: "Arsenal", escudo: "/images/arsenalfc.png", rank: "#13" },
    { nombre: "Newcastle", escudo: "/images/newcastlee.png", rank: "#10" },
  ];

  let bombo4 = [
    { nombre: "Napoli", escudo: "/images/SSC_Neapel.svg.png", rank: "#16" },
    { nombre: "Roma", escudo: "/images/ASRoma.png", rank: "#30" },
    { nombre: "Aston Villa", escudo: "/images/AstonVilla.png", rank: "#15" },
    { nombre: "Porto", escudo: "/images/oporto.png", rank: "#11" },
  ];

  let bombo5 = [
    { nombre: "Sevilla", escudo: "/images/sevillaa.png", rank: "#12" },
    { nombre: "Bayern 04 Leverkusen", escudo: "/images/bayern04.png", rank: "#21" },
    { nombre: "Zenit", escudo: "/images/Zenit.png", rank: "#23" },
    { nombre: "Valencia", escudo: "/images/valenciafc.png", rank: "#17" },
  ];

  let bombo6 = [
    { nombre: "Benfica", escudo: "/images/Benfica.png", rank: "#28" },
    { nombre: "Sporting Lisboa", escudo: "/images/SportingLisboa.png", rank: "#26" },
    { nombre: "Everton", escudo: "/images/evertonfc.png", rank: "#29" },
    { nombre: "Lazio", escudo: "/images/laziofc.png", rank: "#27" }

  ];

  let bombo7 = [
    { nombre: "Villa Real", escudo: "/images/villar.png", rank: "#19" },
    { nombre: "Wolfburgo", escudo: "/images/wolfburgo.png", rank: "#31" },
    { nombre: "Lyon", escudo: "/images/Lyon.png", rank: "#32" },
    { nombre: "Ajax", escudo: "/images/Ajax.png", rank: "#20" }
  ];


  let franco: Team[] = [];
  let gaston: Team[] = [];
  let marcos: Team[] = [];
  let roma: Team[] = [];

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

      gaston = [{ nombre: "Juventus", escudo: "/images/juventud.png", rank: "#17" }, ...gaston];

      franco = [{ nombre: "Paris Saint Germain", escudo: "/images/ParisSaintGermain.png", rank: "#1" }, ...franco];

      roma = [{ nombre: "Atletico Madrid", escudo: "/images/AtleticoMadrid.png", rank: "#27" }, ...roma];


      Franco(franco)
      Gaston(gaston)
      Marcos(marcos)
      Roma(roma)

      return;
    }
    alear();
  }


  // Función para renderizar cada pool
  const renderPool = (poolName: string, bombo: Team[]) => (
    <div className="w-full bg-white text-black rounded-md h-[120px] flex flex-col justify-center font-geistRegular">
      <div className="w-full flex justify-center items-center p-4 font-bold">
        <p>{poolName}</p>
      </div>
      {poolName === "Pool 3" ? (
        <div className="w-full flex justify-around">
          {bombo.map((team: Team, index: number) => (
            <Image
              src={team.escudo}
              alt={team.nombre}
              width={23}
              height={23}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-around">
          {bombo.map((team: Team, index: number) => (
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
        {renderPool("Oficial Pool", bombo8T)}
        {renderPool("Pool 1", equiposT)}
        {renderPool("Pool 2", bombo2T)}
        {renderPool("Pool 3", bombo3T)}
        {renderPool("Pool 4", bombo4T)}
        {renderPool("Pool 5", bombo5T)}
        {renderPool("Pool 6", bombo6T)}
        {renderPool("Pool 7", bombo7T)}
      </div>

      <div className="w-full flex justify-center gap-6 py-5 text-lg text-white">
        <button onClick={() => alear()} className="w-[160px] h-[60px] relative bg-bgPrimary text-white rounded-[8px] font-geistRegular overflow-hidden group">
          <span className="relative z-10" >START</span>
          <div className="absolute inset-0 bg-hoverCard translate-x-[-100%] transition-transform duration-80 ease-out group-hover:translate-x-0"></div>
        </button>

        <button onClick={() => router.push("/draft")} className="w-[160px] h-[60px] relative bg-bgPrimary text-white rounded-[8px] font-geistRegular overflow-hidden group">
          <span className="relative z-10">DRAFT</span>
          <div className="absolute inset-0 bg-hoverCard translate-x-[-100%] transition-transform duration-80 ease-out group-hover:translate-x-0"></div>
        </button>
      </div>

      <div className=" px-5 lg:px-5 xl:px-14 w-full select-none pt-10">
        <div className="grid grid-cols-4 gap-3 md:gap-10 xl:gap-20 font-geistRegular">
          <div className="w-full rounded-[4px] bg-bgPrimary">
            <p className="font-geistBold text-[15px] lg:text-[22px] text-fontTitle  px-4 py-3 lg:px-6 lg:py-6">Franco</p>

            {FrancoBombo.length &&
              FrancoBombo.map((team: Team, index: number) => {
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
              GastonBombo.map((team: Team, index: number) => {
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
              MarcosBombo.map((team: Team, index: number) => {
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
              RomaBombo.map((team: Team, index: number) => {
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
