"use client";
import Image from "next/image";
import React from "react";
import { History, data } from " @/models/db";
import { Match, Rank } from " @/types/types";
import { useMyContext } from " @/context/ListContext";
import Link from "next/link";

const ContainerGames = ({
  scrollToDetails,
}: {
  scrollToDetails: () => void;
}) => {
  const games = History.Games.slice(0, 5);
  const rank = data.ranking.slice(0, 5);
  return (
    <div className="font-geistLight">
      <Games ultimateGames={games} />
      <TopFive rank={rank} scrollToDetails={scrollToDetails} />
    </div>
  );
};

const Games = ({ ultimateGames }: { ultimateGames: Match[] }) => {
  const { seterGame } = useMyContext();

  return (
    <div className=" flex flex-col gap-2 w-full md:w-[345px] mt-2">
      <div className="p-4 flex flex-col  gap-3 text-sm text-[#ffffff] bg-bgGames/95 w-full">
        <div className="w-full flex justify-center">
          <p>Results</p>
        </div>

        {ultimateGames.map((game: Match, index) => {
          return (
            <div
              onClick={() => seterGame(true, game)}
              key={index}
              className="group flex justify-between gap-[10px] hover:bg-hoverCard hover:rounded-[4px] hover:cursor-pointer"
            >
              {/* Primer hijo: Local */}
              <div className="flex justify-end gap-2 items-center overflow-hidden w-[130px] group-hover:bg-hoverCard group-hover:rounded-[4px]">
                <span className="text-[11px] font-bold">{game.LocalSlug}</span>
                <Image
                  src={game.LocalEscudo}
                  alt="alt"
                  width={26}
                  height={20}
                />
              </div>

              {/* Resultado */}
              <div className="bg-bgPrimary relative text-sm py-2 px-3 rounded-md flex justify-center items-center font-bold w-[60px]  group-hover:bg-hoverCard">
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
              <div className="flex gap-2 items-center overflow-hidden justify-start w-[130px] group-hover:bg-hoverCard group-hover:rounded-[4px]">
                <Image
                  src={game.VisitanteEscudo}
                  alt="alt"
                  width={26}
                  height={20}
                />
                <span className="text-[11px] font-bold">
                  {game.VisitanteSlug}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-bgGames/95 flex justify-center items-center p-4 w-full">
        <p className="text-[11px] cursor-pointer relative tracking-[0.48px] group p-1 font-geistRegular">
          VIEW ALL RESULTS
          <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-hoverCard transition-all duration-200 group-hover:w-full"></span>
        </p>
      </div>
    </div>
  );
};

const TopFive = ({
  rank,
  scrollToDetails,
}: {
  rank: Rank[];
  scrollToDetails?: () => void;
}) => {
  return (
    <>
      <div className="hidden md:flex flex-col gap-3 w-full md:w-[345px] p-4 mt-8 z-20 bg-bgGames/95 text-sm text-[#ffffff]">
        <div className="w-full flex justify-center">
          <p>TOP FIVE</p>
        </div>

        {rank.map((team: Rank, index) => {
          return (
            <Link key={`${index} - top`} href={`/team/${team.name}`} prefetch={false}>
              <div
                className="group w-full flex h-[40px] justify-between gap-2 px-2 font-bold text-[12px] hover:bg-hoverCard  hover:rounded-[4px]"
              >
                {/* Sección izquierda */}
                <div className="flex gap-3 items-center hover:cursor-pointer">
                  {/* Rank */}
                  <div className="min-w-[30px] rounded-md h-full justify-center items-center flex group-hover:bg-hoverCard">
                    <span className="text-sm">{team.rank}</span>
                  </div>

                  {/* Logo */}
                  <div className="min-w-[40px] flex justify-center items-center group-hover:bg-hoverCard">
                    <Image
                      src={team.logo}
                      alt={team.name}
                      width={26}
                      height={20}
                    />
                  </div>

                  {/* Nombre */}
                  <span className="group-hover:text-hoverText">
                    {team.name}
                  </span>
                </div>

                {/* Títulos */}
                <div>
                  <span className="min-w-[30px] rounded-md h-full justify-center items-center flex bg-bgPrimary text-lg group-hover:bg-hoverCard">
                    {team.titles}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="bg-bgGames/95 hidden md:flex justify-center items-center p-4 w-full md:w-[345px] mt-2">
        <p
          onClick={scrollToDetails}
          className="text-[11px] cursor-pointer relative group p-1 font-geistRegular tracking-[0.48px]"
        >
          VIEW ALL TEAM
          <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-hoverCard transition-all duration-200 group-hover:w-full"></span>
        </p>
      </div>
    </>
  );
};

export default ContainerGames;
