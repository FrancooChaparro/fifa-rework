import React from "react";
import { data } from " @/models/db";
import Image from "next/image";
import { Rank } from " @/types/types";
import Link from "next/link";

const rankTeams = data.ranking

export const Ranking = () => {
  return (
    <div className="px-4 lg:px-20 w-full select-none ">
      <p className="text-[38px] font-geistBold text-white tracking-[0.10px] border-b-[1px] border-white pb-2 mb-4">
        Rankings
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-20  font-geistRegular">
        <div className="w-full rounded-[4px]">
          {rankTeams.slice(0, 10).map((team: Rank, index: number) => {
            return (
              <Link  key={index} href={`/team/${team.name}`} prefetch={false}>
                <div
                  className="group hover:cursor-pointer w-full flex h-[70px] justify-between gap-2 px-2 font-bold text-sm active:bg-hoverCard lg:hover:bg-hoverCard  hover:rounded-[4px] xm:text-sm bg-[#313133]  text-[#ffffff] "
                >
                  {/* Sección izquierda */}
                  <div className="flex gap-3 items-center hover:cursor-pointer">
                    {/* Rank */}
                    <div className="min-w-[30px] rounded-md h-full justify-center items-center flex ">
                      <span className="text-lg">{team.rank}</span>
                    </div>

                    {/* Logo */}
                    <div className="min-w-[40px] flex justify-center items-center ">
                      <Image
                        src={team.logo}
                        alt={team.name}
                        width={32}
                        height={32}
                      />
                    </div>
                    {/* Nombre */}
                    <span className="group-hover:text-hoverText ">
                      {team.name}
                    </span>
                  </div>

                  {/* Títulos */}
                  <div>
                    <span className="min-w-[30px] rounded-md h-full justify-center items-center flex text-[22px] ">
                      {team.titles}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="w-full rounded-[4px]">
          {" "}
          {rankTeams.slice(10, 20).map((team: Rank, index: number) => {
            return (
              <Link  key={`${index} - a`} href={`/team/${team.name}`} prefetch={false}>
                <div
                  className="group w-full hover:cursor-pointer flex h-[70px] justify-between gap-2 px-2 font-bold text-sm active:bg-hoverCard lg:hover:bg-hoverCard hover:rounded-[4px] xm:text-sm bg-[#313133] text-[#ffffff] "
                >
                  {/* Sección izquierda */}
                  <div className="flex gap-3 items-center hover:cursor-pointer">
                    {/* Rank */}
                    <div className="min-w-[30px] rounded-md h-full justify-center items-center flex ">
                      <span className="text-lg">{team.rank}</span>
                    </div>

                    {/* Logo */}
                    <div className="min-w-[40px] flex justify-center items-center ">
                      <Image
                        src={team.logo}
                        alt={team.name}
                        width={32}
                        height={32}
                      />
                    </div>

                    {/* Nombre */}
                    <span className="group-hover:text-hoverText">
                      {team.name}
                    </span>
                  </div>

                  {/* Títulos */}
                  <div>
                    <span className="min-w-[30px] rounded-md h-full justify-center items-center flex text-[22px]  ">
                      {team.titles}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="w-full rounded-[4px]">
          {" "}
          {rankTeams.slice(20, 30).map((team: Rank, index: number) => {
            return (
              <Link key={`${index} - b`} href={`/team/${team.name}`} prefetch={false}>
                <div
                  className="group w-full hover:cursor-pointer flex h-[70px] justify-between gap-2 px-2 font-bold text-sm active:bg-hoverCard lg:hover:bg-hoverCard  hover:rounded-[4px] xm:text-sm bg-[#313133] text-[#ffffff] "
                >
                  {/* Sección izquierda */}
                  <div className="flex gap-3 items-center hover:cursor-pointer">
                    {/* Rank */}
                    <div className="min-w-[30px] rounded-md h-full justify-center items-center flex ">
                      <span className="text-lg">{team.rank}</span>
                    </div>

                    {/* Logo */}
                    <div className="min-w-[40px] flex justify-center items-center ">
                      <Image
                        src={team.logo}
                        alt={team.name}
                        width={32}
                        height={32}
                      />
                    </div>

                    {/* Nombre */}
                    <span className="group-hover:text-hoverText">
                      {team.name}
                    </span>
                  </div>

                  {/* Títulos */}
                  <div>
                    <span className="min-w-[30px] rounded-md h-full justify-center items-center flex  text-[22px] ">
                      {team.titles}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
