"use client";
import Image from "next/image";
import React from "react";
import { News } from " @/components/News/News";
import { CheckIcon, DefeatIcon, DrawIcon } from " @/Icons/Icons";
import { Match } from " @/types/types";
import { useMyContext } from " @/context/ListContext";
import Particles from " @/components/particles";

export default function UserPage({ data } : { data: any}) {
  const { seterGame } = useMyContext();
 
  return (
    <>
      {/* MAIN DATA */}
      <div
        className={`relative w-full min-h-screen h-screen px-5 sm:px-10 lg:px-20 pt-16 flex flex-col gap-7 overflow-hidden`}
      >
    
        {/* BACKGROUND */}
        <div className="absolute top-0 left-0 z-[-10] h-full w-full">
          <Image
            src={data.teamID.cover}
            placeholder="blur"
            blurDataURL="/images/blur.webp"
            alt="atl"
            fill
            priority
            quality={100}
            className="h-full w-full object-cover object-center"
          />
        </div> 
        <div className="flex flex-col gap-4">
          <div className="border-b-[1px] border-white pb-4 w-full md:w-[480px]">
            <p className="text-white font-geistBold text-[28px] tracking-[0.10px]">
              Trophies
            </p>
          </div>
          <p className="text-white font-geistBold text-[48px] tracking-[0.10px]">
            {data.teamID.titles}
          </p>
        </div>
        <div className="w-full md:w-[530px] flex justify-end gap-4">
          <div className="bg-white py-1 px-5">
            <p className="text-bgGames font-geistBold text-[24px] tracking-[0.10px]">
              {`Rank`}
            </p>
          </div>
          <div className="bg-white py-1 px-5">
            <p className="text-bgGames font-geistBold text-[24px] tracking-[0.10px]">
              {`#${data.teamID.rank}`}
            </p>
          </div>
        </div>
        <div className="w-full md:w-[530px] flex justify-center items-center">
          <p className="text-white font-geistBold text-[65px] tracking-[0.24px]">
            {``}
          </p>
        </div>
        <div className="w-full md:w-[700px] flex justify-between">
          <div className="border-b-[1px] border-white pb-2 w-full md:w-[480px] flex flex-col">
            <p className="text-white font-geistBold text-[26px] tracking-[0.10px] ">
              {`Profile`}
            </p>
            <p className="text-white font-geistBold text-[26px] xs:text-[38px] tracking-[0.10px]">
              {data.teamID.name}
            </p>
          </div>
          <div className="flex gap-2 lg:gap-8  ml-[-20px] pb-4 lg:pb-6">
            <div className="flex flex-col gap-3 justify-center items-center">
              <p className="text-white font-geistRegular text-base tracking-[0.10px]">
                Finals
              </p>
              <div className="rounded-full flex justify-center items-center border-[2px] border-white w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]">
                <p className=" font-geistBold text-[30px] lg:text-[38px] text-white tracking-[0.10px]">
                  {data.finales?.length}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <p className="text-white font-geistRegular text-base tracking-[0.10px]">
                Ganadas
              </p>
              <div className="rounded-full flex justify-center items-center border-[2px] border-white w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]">
                <p className=" font-geistBold text-[30px] lg:text-[38px] text-white tracking-[0.10px]">
                  {data.teamID.titles}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[700px] flex justify-between">
          <div className=" flex items-end">
            <p className="md:w-[480px] w-full text-white font-geistBold text-[30px] xs:text-[38px] tracking-[0.10px] border-b-[1px] border-white pb-6">
              Last Final
            </p>
          </div>
          <div className="flex gap-8 ml-[-20px] ">
            <div className="flex flex-col gap-3 justify-center items-center">
              <p className="text-white font-geistRegular text-base tracking-[0.10px]">
                Escudo
              </p>
              <div className="rounded-full flex justify-center items-center border-[2px] border-white w-[80px] h-[80px]">
                <Image
                  src={data.teamID?.logo || "/images/Barcelona.webp"}
                  alt="atl"
                  width={60}
                  height={60}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[480px] flex justify-center items-center">
          {data.finales &&
            data.finales.slice(0, 1).map((game: Match, index: number) => {
              return (
                <div
                  key={index}
                  className="group flex  gap-[10px] font-geistBold"
                >
                  {/* Primer hijo: Local */}
                  <div className="flex justify-end gap-2 items-center overflow-hidden  ">
                    <span className="hidden xs:block  text-lg text-white">{game.LocalSlug}</span>
                    <span className="block xs:hidden text-lg text-white">{game.LocalSlug?.slice(0,3)}</span>

                    <Image
                      src={game.LocalEscudo}
                      alt="alt"
                      width={56}
                      height={56}
                    />
                  </div>

                  {/* Resultado */}
                  <div className="relative text-[28px] xs:text-[38px] text-white py-2 px-3 rounded-md flex justify-center items-center font-bold ">
                    {game.Penalty ? (
                      <>
                        <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-200 cursor-pointer">
                          {`${game.LocalResultado} - ${game.VisitanteResultado}`}
                        </span>
                        <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-white transition-opacity duration-200 cursor-pointer">
                          {`${game.LocalPenalty} - ${game.VisitantePenalty}`}
                        </span>
                      </>
                    ) : (
                      <span className="cursor-pointer">
                        {`${game.LocalResultado} - ${game.VisitanteResultado}`}
                      </span>
                    )}
                  </div>

                  {/* Tercer hijo: Visitante */}
                  <div className="flex gap-2 items-center overflow-hidden justify-start  ">
                    <Image
                      src={game.VisitanteEscudo}
                      alt="alt"
                      width={56}
                      height={56}
                    />
                    <span className="hidden xs:block text-lg text-white">
                      {game.VisitanteSlug}
                    </span>
                    <span className="block xs:hidden text-lg text-white">
                      {game.VisitanteSlug?.slice(0,3)}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="bg-[#18181a] relative w-full  px-4 sm:px-10 lg:px-20 py-10 flex flex-col justify-center items-center lg:items-start lg:flex-row lg:justify-between gap-4 ">
        {/* FIANLS */}
          <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#F7FF9B"}
        refresh
      />
        <div className="flex flex-col gap-1 w-full md:w-[600px] lg:w-[480px] xl:w-[620px] 2xl:w-[680px] mt-2 ">
          <div className="text-[22px] md:text-[38px] lg:text-[22px] xl:text-[38px] font-geistBold w-full text-white flex justify-between items-center tracking-[0.10px] border-b-[1px] border-white pb-2 mb-2">
            <p>Finals</p>
          </div>
          <div>
            <div className="relative flex flex-col gap-3 text-sm text-[#ffffff] bg-transparent w-full">
              {data.finales &&
                data.finales.map((game: Match, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => seterGame(true, game)}
                      className="group flex justify-between gap-[10px] overflow-hidden h-[50px] hover:bg-hoverCard hover:rounded-[4px] hover:cursor-pointer"
                    >
                      {/* Primer hijo: Local */}
                      <div className="flex  gap-2 items-center overflow-hidden w-[280px] group-hover:bg-hoverCard group-hover:rounded-[4px]">
                        <Image
                          src={game.LocalEscudo}
                          alt="alt"
                          width={40}
                          height={40}
                        />
                        <span className="text-[13px] lg:text-[10px] xl:text-[13px] font-bold hidden md:block">
                          {game.LocalNombre}
                        </span>
                        <span className="text-[10px] xs:text-[13px] lg:text-[10px] xl:text-[13px] font-bold md:hidden">
                          {game.LocalSlug || ""}
                        </span>
                      </div>

                      {/* Resultado */}
                      <div className="bg-[#313133] relative text-[14px] xs:text-lg py-2 px-3 rounded-md flex justify-center items-center font-bold w-[100px]  group-hover:bg-hoverCard">
                        {game.Penalty ? (
                          <>
                            <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-200 cursor-pointer">
                              {`${game.LocalResultado} - ${game.VisitanteResultado}`}
                            </span>
                            <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-white transition-opacity duration-200 cursor-pointer">
                              {`${game.LocalPenalty} - ${game.VisitantePenalty}`}
                            </span>
                          </>
                        ) : (
                          <span className="cursor-pointer">
                            {`${game.LocalResultado} - ${game.VisitanteResultado}`}
                          </span>
                        )}
                      </div>
                      {/* Tercer hijo: Visitante */}
                      <div className="flex gap-2 items-center overflow-hidden justify-end w-[280px] group-hover:bg-hoverCard group-hover:rounded-[4px]">
                        <span className="text-[13px] lg:text-[10px] xl:text-[13px] font-bold hidden md:block">
                          {game.VisitanteNombre}
                        </span>
                        <span className="text-[10px] xs:text-[13px] lg:text-[10px] xl:text-[13px] font-bold md:hidden">
                          {game.VisitanteSlug || ""}
                        </span>
                        <Image
                          src={game.VisitanteEscudo}
                          alt="alt"
                          width={30}
                          height={30}
                        />
                        <div className="flex justify-center items-center text-lg pl-1">
                          {game.Result === "Victory" ? (
                            <CheckIcon />
                          ) : game.Result === "Defeat" ? (
                            <DefeatIcon />
                          ) : game.Result === "Defeat" ? (
                            <DrawIcon />
                          ) : (
                            <div className="bg-indigo-600 text-white font-geistRegular flex justify-center text-center items-center size-6 rounded-full">
                              {
                              game.isLegit === "L" 
                               ? <div className="bg-indigo-600 text-white font-geistRegular flex justify-center text-center items-center size-6 rounded-full">L</div>
                               : <div className="bg-gray-600 text-[11px] text-white font-geistRegular flex justify-center text-center items-center size-6 rounded-full">NO</div>
                              }
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* ESTADISCTICAS */}
        <div className="sticky top-[100px] h-[600p] w-full md:w-[600px] xl:w-[500px] 2xl:w-[680px] mt-2 rounded-md">
          <p className="text-[22px] md:text-[38px]  lg:text-[22px] xl:text-[38px] font-geistBold text-white tracking-[0.10px] border-b-[1px] border-white pb-2 mb-2">
            Estadisticas del Equipo
          </p>
          <div className="w-full pt-4 flex flex-col justify-center items-center">
            <div className="flex gap-8 justify-center pb-6">
              <div className="flex flex-col gap-3 justify-center items-center">
                <p className="text-white font-geistRegular lg:text-lg xl:text-[22px] text-[22px] tracking-[0.10px]">
                  Eficacia
                </p>
                <div className="rounded-full flex justify-center items-center border-[2px] border-white lg:size-[70px] size-[90px] md:size-[110px] xl:size-[110px] 2xl:size-[130px]">
                  <p className=" font-geistBold text-[30px] lg:text-[20px] xl:text-[38px] text-white tracking-[0.10px]">
                    {data.por}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 justify-center items-center">
                <p className="text-white font-geistRegular lg:text-lg xl:text-[22px] text-[22px] tracking-[0.10px]">
                  Victory
                </p>
                <div className="rounded-full flex justify-center items-center border-[2px] border-white lg:size-[70px] size-[90px]  md:size-[110px] xl:size-[110px] 2xl:size-[130px]">
                  <p className=" font-geistBold text-[30px] lg:text-[20px] xl:text-[38px] text-white tracking-[0.10px]">
                    {data.teamID.titles}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-center items-center">
                <p className="text-white font-geistRegular lg:text-lg xl:text-[22px] text-[22px] tracking-[0.10px]">
                  Defeat
                </p>
                <div className="rounded-full flex justify-center items-center border-[2px] border-white lg:size-[70px] size-[90px]  md:size-[110px] xl:size-[110px] 2xl:size-[130px]">
                  <p className=" font-geistBold text-[30px] lg:text-[20px] xl:text-[38px] text-white tracking-[0.10px]">
                    {data.finalsLength - data.titles}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-8 justify-center pb-6">
              <div className="flex flex-col gap-3 justify-center items-center">
                <p className="text-white font-geistRegular lg:text-lg xl:text-[22px] text-lg tracking-[0.10px]">
                  Goles a favor
                </p>
                <div className="rounded-full flex justify-center items-center border-[2px] border-white lg:size-[70px] size-[90px]  md:size-[110px] xl:size-[110px] 2xl:size-[130px]">
                  <p className=" font-geistBold text-[30px] lg:text-[20px] xl:text-[38px] text-white tracking-[0.10px]">
                    {data.golesFavor}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-center items-center">
                <p className="text-white font-geistRegular lg:text-lg xl:text-[22px] text-lg tracking-[0.10px]">
                  Goles en Contra
                </p>
                <div className="rounded-full flex justify-center items-center border-[2px] border-white lg:size-[70px] size-[90px]  md:size-[110px] xl:size-[110px] 2xl:size-[130px]">
                  <p className=" font-geistBold text-[30px] lg:text-[20px] xl:text-[38px] text-white tracking-[0.10px]">
                    {data.golesRecibidos}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center text-lg font-geistBold">
              <p className="text-white pb-1">EFECTIVIDAD PENALES</p>
              <div className="grid grid-cols-4 h-[45px] w-200px border-[1px] border-white">
                <PenaltyDiv />
                <PenaltyDiv />
                <PenaltyDiv />
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#18181a] w-full px-4 sm:px-10 lg:px-20 pb-20 flex justify-center">
        <div className="w-full md:w-[600px] lg:w-full">
          <p className="text-[22px] md:text-[38px] lg:text-[22px] xl:text-[38px] font-geistBold text-white tracking-[0.10px] border-b-[1px] border-white pb-2 mb-6">
            Noticias
          </p>
          <News />
        </div>
      </div>
    </>
  );
}

const PenaltyDiv = () => {
  return (
    <div className="w-[30px] border-[1px] border-black h-full bg-green-500"></div>
  );
};
