"use client";

import { CheckIcon, DefeatIcon, DrawIcon } from " @/Icons/Icons";
import { clasics } from " @/models/db";
import { Match } from " @/types/types";
import Image from "next/image";
import { useState } from "react";

const clasicos = clasics;

export default function ClasicsPage() {
    const [year, setYear] = useState<"ventitres" | "venticuatro" | "venticinco">("ventitres");

    return (
        <div>
            <div className="min-h-screen w-full flex justify-center bg-black py-20">
                <div className="relative flex flex-col gap-3 text-sm text-white bg-[#18181a] py-2 ">
                    {/* Selector de año */}
                    <div className="flex gap-3 justify-center mb-2">
                        <button onClick={() => setYear("ventitres")} className={year === "ventitres" ? "font-bold text-green-400" : ""}>
                            2023
                        </button>
                        <button onClick={() => setYear("venticuatro")} className={year === "venticuatro" ? "font-bold text-green-400" : ""}>
                            2024
                        </button>
                        <button onClick={() => setYear("venticinco")} className={year === "venticinco" ? "font-bold text-green-400" : ""}>
                            2025
                        </button>
                    </div>

                    {/* Listado de partidos */}
                    {clasicos[year].map((game: Match, index: number) => (
                        <div
                            key={index}
                            className="group flex px-2 justify-between gap-[10px] overflow-hidden h-[50px] hover:bg-hoverCard hover:rounded-[4px] hover:cursor-pointer"
                        >
                            {/* Local */}
                            <div className="flex gap-2 items-center overflow-hidden min-w-[180px] group-hover:bg-hoverCard group-hover:rounded-[4px]">
                                <Image src={game.LocalEscudo} alt={game.LocalNombre} width={40} height={40} />
                                <span className="text-[13px] lg:text-[10px] xl:text-[13px] font-bold hidden md:block">
                                    {game.LocalSlug}
                                </span>
                                <span className="text-[10px] xs:text-[13px] lg:text-[10px] xl:text-[13px] font-bold md:hidden">
                                    {game.LocalSlug || ""}
                                </span>
                            </div>

                            {/* Resultado */}
                            <div className="bg-[#313133] relative text-[14px] xs:text-lg py-2 px-3 rounded-md flex justify-center items-center font-bold min-w-[100px] group-hover:bg-hoverCard">
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

                            {/* Visitante */}
                            <div className="flex gap-2 items-center overflow-hidden justify-end min-w-[180px] group-hover:bg-hoverCard group-hover:rounded-[4px]">
                                <span className="text-[13px] lg:text-[10px] xl:text-[13px] font-bold hidden md:block">
                                    {game.VisitanteSlug}
                                </span>
                                <span className="text-[10px] xs:text-[13px] lg:text-[10px] xl:text-[13px] font-bold md:hidden">
                                    {game.VisitanteSlug || ""}
                                </span>
                                <Image src={game.VisitanteEscudo} alt={game.VisitanteNombre} width={30} height={30} />
                                {/* <div className="flex justify-center items-center text-lg pl-1">
                                {game.Result === "Victory" ? (
                                    <CheckIcon />
                                ) : game.Result === "Defeat" ? (
                                    <DefeatIcon />
                                ) : (
                                    <DrawIcon />
                                )}
                            </div> */}

                            </div>
                            <div className="flex justify-center items-center min-w-[150px] text-center">
                                <span className="text-[13px] lg:text-[10px] xl:text-[13px] font-bold hidden md:block">
                                    {game.Raiz}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <PenaltyRadialChart penalesJugados={8} penalesGanados={4} /> */}
            </div>

        </div>
    );
}
