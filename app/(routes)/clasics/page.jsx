"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { stats_franco, stats_marcos, stats_roma, stats_gaston } from " @/models/db";

const PLAYERS = {
  F: stats_franco,
  M: stats_marcos,
  R: stats_roma,
  G: stats_gaston,
};


export default function ClasicsPage() {
  // Estado para los jugadores seleccionados
  const [player1, setPlayer1] = useState("G");
  const [player2, setPlayer2] = useState("R");

  // Traemos los objetos de datos
  const data1 = PLAYERS[player1];
  const data2 = PLAYERS[player2];

  // Filtramos todos los clásicos entre esos dos jugadores
  const matchups = useMemo(() => {
    const matches1 = data1?.finals?.matchs || [];
    return matches1.filter(
      (m) =>
        (m.Player1 === player1 && m.Player2 === player2) ||
        (m.Player1 === player2 && m.Player2 === player1)
    );
  }, [player1, player2]);

  // Estadísticas resumidas
  const stats = useMemo(() => {
    let wins = 0,
      losses = 0,
      draws = 0,
      goalsFor = 0,
      goalsAgainst = 0;

    matchups.forEach((m) => {
      const isP1 = m.Player1 === player1;
      const gf = isP1 ? m.LocalResultado : m.VisitanteResultado;
      const ga = isP1 ? m.VisitanteResultado : m.LocalResultado;
      goalsFor += gf;
      goalsAgainst += ga;

      if (m.Result === "Victory") wins++;
      else if (m.Result === "Defeat") losses++;
      else draws++;
    });

    return { wins, losses, draws, goalsFor, goalsAgainst };
  }, [matchups, player1]);




  // Filtramos todos los clásicos entre esos dos jugadores
  const matchups_clasics = useMemo(() => {
    const matches1 = data1?.clasics?.matchs || [];
    return matches1.filter(
      (m) =>
        (m.Player1 === player1 && m.Player2 === player2) ||
        (m.Player1 === player2 && m.Player2 === player1)
    );
  }, [player1, player2]);

  // Estadísticas resumidas
  const stats_clasics = useMemo(() => {
    let wins = 0,
      losses = 0,
      draws = 0,
      goalsFor = 0,
      goalsAgainst = 0;

    matchups_clasics.forEach((m) => {
      const isP1 = m.Player1 === player1;
      const gf = isP1 ? m.LocalResultado : m.VisitanteResultado;
      const ga = isP1 ? m.VisitanteResultado : m.LocalResultado;
      goalsFor += gf;
      goalsAgainst += ga;

      if (m.Result === "Victory") wins++;
      else if (m.Result === "Defeat") losses++;
      else draws++;
    });

    return { wins, losses, draws, goalsFor, goalsAgainst };
  }, [matchups_clasics, player1]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bgGames text-white py-20">
      <div className="w-[1224px]  h-[724px] flex">
        <div className="relative h-full w-[320px] flex items-center justify-center">
          <img
            src={"https://wallpapers.com/images/hd/lionel-messi-barcelona-kit-rzhcz7kau48sosh1.png"}
            alt="player1"
            className="bg-transparent h-full w-[320px] object-contain"
          />
          {/* Flecha Izquierda */}
          <button
            onClick={() => {
              const keys = Object.keys(PLAYERS).filter((k) => k !== player2);
              const currentIndex = keys.indexOf(player1);
              const nextIndex = (currentIndex - 1 + keys.length) % keys.length;
              setPlayer1(keys[nextIndex]);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-[54px] font-bold hover:scale-110 transition-transform"
          >
            ‹
          </button>
          {/* Flecha Derecha */}
          <button
            onClick={() => {
              const keys = Object.keys(PLAYERS).filter((k) => k !== player2);
              const currentIndex = keys.indexOf(player1);
              const nextIndex = (currentIndex + 1) % keys.length;
              setPlayer1(keys[nextIndex]);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-[54px] font-bold hover:scale-110 transition-transform"
          >
            ›
          </button>
        </div>


        <div className="w-[584px] flex flex-col gap-5 h-full">

          <div className="w-full flex justify-center flex-col gap-[-10px] items-center relative border-b-[1px] border-b-[white]">
            <div className="absolute top-[8px] left-[43%] translate-x-[43%] font-geistBold text-[40px] tracking-[0.10px]">
              Vs
            </div>
            <p className="font-geistBold text-[38px] tracking-[0.10px] mr-[240px]">{data1.info.name_profile}</p>
            <p className="font-geistBold text-[38px] tracking-[0.10px] ml-[240px]">{data2.info.name_profile}</p>
          </div>

          <div className="flex justify-center gap-10">
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center min-w-[90px] min-h-[90px] max-w-[90px] max-h-[90px]">

                <Image
                  src={data1.info.shield_profile}
                  alt="atl"
                  width={80}
                  height={80}
                />
              </div>

              <p className="text-white font-geistBold text-[39px] tracking-[0.10px]">
                {stats_clasics.wins}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center min-w-[90px] min-h-[90px] max-w-[90px] max-h-[90px]">
                <Image
                  src={"/images/Chelsea.png"}
                  alt="atl"
                  width={80}
                  height={80}
                  className="opacity-0"
                />
              </div>

              <p className="text-white font-geistBold text-[39px] tracking-[0.10px]">
                {stats_clasics.draws}
              </p></div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center min-w-[90px] min-h-[90px] max-w-[90px] max-h-[90px]">
                <Image
                  src={data2.info.shield_profile}
                  alt="atl"
                  width={80}
                  height={80}
                />
              </div>

              <p className="text-white font-geistBold text-[39px] tracking-[0.10px]">
                {stats_clasics.losses}
              </p></div>
          </div>


          <div className="w-full flex justify-between items-center">
            <div className="flex gap-3 justify-center pb-6">
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-white font-geistRegular text-[14px] tracking-[0.10px]">
                  Eficacia
                </p>
                <div className="rounded-full flex justify-center items-center border-[2px] border-white lg:size-[60px] size-[60px] md:size-[60px] xl:size-[60px] 2xl:size-[60px]">
                  <p className="font-geistBold text-[20px] lg:text-[20px] xl:text-[20px] text-white tracking-[0.10px]">
                    {Math.round(parseInt(stats_clasics.wins) / (parseInt(stats_clasics.wins) + parseInt(stats_clasics.losses) + parseInt(stats_clasics.draws)) * 100)}%
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-white font-geistRegular text-[14px] tracking-[0.10px]">
                  Goles
                </p>
                <div className="rounded-full flex justify-center items-center border-[2px] border-white lg:size-[60px] size-[60px] md:size-[60px] xl:size-[60px] 2xl:size-[60px]">
                  <p className="font-geistBold text-[20px] lg:text-[20px] xl:text-[20px] text-white tracking-[0.10px]">
                    {stats_clasics.goalsFor}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 justify-center pb-6">
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-white font-geistRegular text-[14px] tracking-[0.10px]">
                  Eficacia
                </p>
                <div className="rounded-full flex justify-center items-center border-[2px] border-white lg:size-[60px] size-[60px] md:size-[60px] xl:size-[60px] 2xl:size-[60px]">
                  <p className="font-geistBold text-[20px] lg:text-[20px] xl:text-[20px] text-white tracking-[0.10px]">
                    {Math.round(parseInt(stats_clasics.losses) / (parseInt(stats_clasics.wins) + parseInt(stats_clasics.losses) + parseInt(stats_clasics.draws)) * 100)}%
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-white font-geistRegular text-[14px] tracking-[0.10px]">
                  Goles
                </p>
                <div className="rounded-full flex justify-center items-center border-[2px] border-white lg:size-[60px] size-[60px] md:size-[60px] xl:size-[60px] 2xl:size-[60px]">
                  <p className="font-geistBold text-[20px] lg:text-[20px] xl:text-[20px] text-white tracking-[0.10px]">
                    {stats_clasics.goalsAgainst}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="font-geistBold text-[15px] pt-5 tracking-[0.10px] mx-auto">DOMINANCIA COMPLETA</p>



          <div className="flex justify-center gap-10 ">
            <div className="flex flex-col justify-center items-center text-white font-geistBold text-[24px] tracking-[0.10px]">
              <p>
                {stats.wins}
              </p>
              <p className="text-sm">Victorias</p>
            </div>
            <div className="flex flex-col justify-center items-center text-white font-geistBold text-[24px] tracking-[0.10px]">
              <p >
                -
              </p>
              <p className="text-sm">Empates</p>
            </div>
            <div className="flex flex-col justify-center items-center text-white font-geistBold text-[24px] tracking-[0.10px]">
              <p >
                {stats.losses}
              </p>
              <p className="text-sm">Victorias</p>
            </div>
          </div>


          <div className="w-full flex justify-between items-center">
            <div className="flex gap-3 justify-center pb-6">
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-white font-geistRegular text-[14px] tracking-[0.10px]">
                  Eficacia
                </p>
                <div className="rounded-full flex justify-center items-center border-[2px] border-white lg:size-[60px] size-[60px] md:size-[60px] xl:size-[60px] 2xl:size-[60px]">
                  <p className="font-geistBold text-[20px] lg:text-[20px] xl:text-[20px] text-white tracking-[0.10px]">
                    {isNaN(Math.round((parseInt(stats_clasics.losses) / (parseInt(stats_clasics.wins) + parseInt(stats_clasics.losses) + parseInt(stats_clasics.draws)) * 100)))
                      ? 0
                      : Math.round((parseInt(stats_clasics.losses) / (parseInt(stats_clasics.wins) + parseInt(stats_clasics.losses) + parseInt(stats_clasics.draws)) * 100))
                    }%
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-white font-geistRegular text-[14px] tracking-[0.10px]">
                  Goles
                </p>
                <div className="rounded-full flex justify-center items-center border-[2px] border-white lg:size-[60px] size-[60px] md:size-[60px] xl:size-[60px] 2xl:size-[60px]">
                  <p className="font-geistBold text-[20px] lg:text-[20px] xl:text-[20px] text-white tracking-[0.10px]">
                    {stats.goalsFor}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-center pb-6">
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-white font-geistRegular text-[14px] tracking-[0.10px]">
                  Eficacia
                </p>
                <div className="rounded-full flex justify-center items-center border-[2px] border-white lg:size-[60px] size-[60px] md:size-[60px] xl:size-[60px] 2xl:size-[60px]">
                  <p className="font-geistBold text-[20px] lg:text-[20px] xl:text-[20px] text-white tracking-[0.10px]">
                    {isNaN(Math.round((parseInt(stats.losses) / (parseInt(stats.wins) + parseInt(stats.losses)) * 100)))
                      ? 0
                      : Math.round((parseInt(stats.losses) / (parseInt(stats.wins) + parseInt(stats.losses)) * 100))
                    }%
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-white font-geistRegular text-[14px] tracking-[0.10px]">
                  Goles
                </p>
                <div className="rounded-full flex justify-center items-center border-[2px] border-white lg:size-[60px] size-[60px] md:size-[60px] xl:size-[60px] 2xl:size-[60px]">
                  <p className="font-geistBold text-[20px] lg:text-[20px] xl:text-[20px] text-white tracking-[0.10px]">
                    {stats.goalsAgainst}
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div className="relative h-full w-[320px] flex items-center justify-center">
          <img
            src={"https://wallpapers.com/images/hd/lionel-messi-barcelona-kit-rzhcz7kau48sosh1.png"}
            alt="player2"
            className="bg-transparent h-full w-[320px] object-contain"
          />
          {/* Flecha Izquierda */}
          <button
            onClick={() => {
              const keys = Object.keys(PLAYERS).filter((k) => k !== player1);
              const currentIndex = keys.indexOf(player2);
              const nextIndex = (currentIndex - 1 + keys.length) % keys.length;
              setPlayer2(keys[nextIndex]);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-[54px] font-bold hover:scale-110 transition-transform"
          >
            ‹
          </button>
          {/* Flecha Derecha */}
          <button
            onClick={() => {
              const keys = Object.keys(PLAYERS).filter((k) => k !== player1);
              const currentIndex = keys.indexOf(player2);
              const nextIndex = (currentIndex + 1) % keys.length;
              setPlayer2(keys[nextIndex]);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-[54px] font-bold hover:scale-110 transition-transform"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}

//   {
//               false && <div className="w-full flex flex-col items-center justify-center text-lg font-geistBold">
//                 <p className="text-white pb-1">{`EFECTIVIDAD PENALES 2/4`}</p>
//                 <PenaltyRadialChart penalesJugados={4} penalesGanados={2} />
//               </div>
//             }

// "use client";

// import { CheckIcon, DefeatIcon, DrawIcon } from " @/Icons/Icons";
// import { clasics } from " @/models/db";
// import { Match } from " @/types/types";
// import Image from "next/image";
// import { useState } from "react";

// const clasicos = clasics;

// export default function ClasicsPage() {
//     const [year, setYear] = useState<"ventitres" | "venticuatro" | "venticinco">("ventitres");

//     return (
//         <div>
//             <div className="min-h-screen w-full flex justify-center bg-black py-20">
//                 <div className="relative flex flex-col gap-3 text-sm text-white bg-[#18181a] py-2 ">
//                     {/* Selector de año */}
//                     <div className="flex gap-3 justify-center mb-2">
//                         <button onClick={() => setYear("ventitres")} className={year === "ventitres" ? "font-bold text-green-400" : ""}>
//                             2023
//                         </button>
//                         <button onClick={() => setYear("venticuatro")} className={year === "venticuatro" ? "font-bold text-green-400" : ""}>
//                             2024
//                         </button>
//                         <button onClick={() => setYear("venticinco")} className={year === "venticinco" ? "font-bold text-green-400" : ""}>
//                             2025
//                         </button>
//                     </div>

//                     {/* Listado de partidos */}
//                     {clasicos[year].map((game: Match, index: number) => (
//                         <div
//                             key={index}
//                             className="group flex px-2 justify-between gap-[10px] overflow-hidden h-[50px] hover:bg-hoverCard hover:rounded-[4px] hover:cursor-pointer"
//                         >
//                             {/* Local */}
//                             <div className="flex gap-2 items-center overflow-hidden min-w-[180px] group-hover:bg-hoverCard group-hover:rounded-[4px]">
//                                 <Image src={game.LocalEscudo} alt={game.LocalNombre} width={40} height={40} />
//                                 <span className="text-[13px] lg:text-[10px] xl:text-[13px] font-bold hidden md:block">
//                                     {game.LocalSlug}
//                                 </span>
//                                 <span className="text-[10px] xs:text-[13px] lg:text-[10px] xl:text-[13px] font-bold md:hidden">
//                                     {game.LocalSlug || ""}
//                                 </span>
//                             </div>

//                             {/* Resultado */}
//                             <div className="bg-[#313133] relative text-[14px] xs:text-lg py-2 px-3 rounded-md flex justify-center items-center font-bold min-w-[100px] group-hover:bg-hoverCard">
//                                 {game.Penalty ? (
//                                     <>
//                                         <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-200 cursor-pointer">
//                                             {`${game.LocalResultado} - ${game.VisitanteResultado}`}
//                                         </span>
//                                         <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-white transition-opacity duration-200 cursor-pointer">
//                                             {`${game.LocalPenalty} - ${game.VisitantePenalty}`}
//                                         </span>
//                                     </>
//                                 ) : (
//                                     <span className="cursor-pointer">
//                                         {`${game.LocalResultado} - ${game.VisitanteResultado}`}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Visitante */}
//                             <div className="flex gap-2 items-center overflow-hidden justify-end min-w-[180px] group-hover:bg-hoverCard group-hover:rounded-[4px]">
//                                 <span className="text-[13px] lg:text-[10px] xl:text-[13px] font-bold hidden md:block">
//                                     {game.VisitanteSlug}
//                                 </span>
//                                 <span className="text-[10px] xs:text-[13px] lg:text-[10px] xl:text-[13px] font-bold md:hidden">
//                                     {game.VisitanteSlug || ""}
//                                 </span>
//                                 <Image src={game.VisitanteEscudo} alt={game.VisitanteNombre} width={30} height={30} />
//                             </div>
//                             <div className="flex justify-center items-center min-w-[150px] text-center">
//                                 <span className="text-[13px] lg:text-[10px] xl:text-[13px] font-bold hidden md:block">
//                                     {game.Raiz}
//                                 </span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 {/* <PenaltyRadialChart penalesJugados={8} penalesGanados={4} /> */}
//             </div>

//         </div>
//     );
// }
