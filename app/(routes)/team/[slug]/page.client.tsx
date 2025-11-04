"use client";
import Image from "next/image";
import React from "react";
import { News } from " @/components/News/News";
import { CheckIcon, DefeatIcon, DrawIcon } from " @/Icons/Icons";
import { DataSlug, Match } from " @/types/types";
import { useMyContext } from " @/context/ListContext";
import Particles from " @/components/particles";
import { PenaltyRadialChart } from " @/components/graphis";

export default function UserPage({ data }: { data: DataSlug }) {
  
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
            blurDataURL="data:image/webp;base64,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"
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
                    <span className="block xs:hidden text-lg text-white">{game.LocalSlug?.slice(0, 3)}</span>

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
                      {game.VisitanteSlug?.slice(0, 3)}
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
            {
              data.penalesJugados &&  <div className="w-full flex flex-col items-center justify-center text-lg font-geistBold">
              <p className="text-white pb-1">{`EFECTIVIDAD PENALES ${data.penalesGanados}/${data.penalesJugados}`}</p>
              <PenaltyRadialChart penalesJugados={data.penalesJugados} penalesGanados={data.penalesGanados} />
            </div>
            }
           
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

