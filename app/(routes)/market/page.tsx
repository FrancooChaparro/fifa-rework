"use client";
import { useMyContext } from " @/context/ListContext";
import { PadLockIcon } from " @/Icons/Icons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { data } from " @/models/db";
import { Rank } from " @/types/types";

const rankTeams = data.ranking;

export default function Home() {
  const { market, isOpenAdd, setisOpenAdd } = useMyContext();
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [localMarket, setLocalMarket] = useState<any[][]>([]);
  const cartRef = useRef<HTMLDivElement>(null);
  const [idPlayer, setIdPlayer] = useState<string>("");

  useEffect(() => {
    if (market && market.length > 0) {
      setLocalMarket(market);
    }
  }, [market]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setisOpenAdd(false);
      }
    };

    if (isOpenAdd) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenAdd]);

  async function actualizarJugador(id: string) {
    if (loadingIds.includes(id)) return;
    setLoadingIds((prev) => [...prev, id]);

    const jugadorActual = localMarket
      .flat()
      .find((player: any) => player.id === id);
    if (!jugadorActual) {
      console.error("Jugador no encontrado");
      setLoadingIds((prev) => prev.filter((x) => x !== id));
      return;
    }

    const yaTieneC = jugadorActual.info[3] === "C";

    try {
      const res = await fetch("/api/sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          hasC: yaTieneC,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error desconocido");

      console.log("✅", data.message);

      setLocalMarket((prevMarket: any) =>
        prevMarket.map((team: any) =>
          team.map((player: any) =>
            player.id === id
              ? {
                  ...player,
                  info: [
                    player.info[0],
                    player.info[1],
                    player.info[2],
                    yaTieneC ? "" : "C",
                  ],
                }
              : player
          )
        )
      );
    } catch (error) {
      console.error("❌ Error actualizando jugador:", error);
    } finally {
      setLoadingIds((prev) => prev.filter((x) => x !== id));
    }
  }

  const handleAddTeam = async (id: string, teamName: string) => {
    let eli = id
    if(idPlayer !== "") {
        eli = idPlayer
    }
    console.log(eli, "eli")
    // Evitamos clics múltiples si ya está cargando este jugador
    if (loadingIds.includes(eli)) return;
  
    setLoadingIds((prev) => [...prev, eli]);
  
    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: eli, teamName }),
      });
  
      if (!res.ok) throw new Error("Error al agregar el team");
  
      const data = await res.json();
      console.log("Team agregado:", data);
  
      // Actualizar el localMarket con el nuevo equipo
      setLocalMarket((prevMarket: any[][]) =>
        prevMarket.map((team: any[]) =>
          team.map((player: any) =>
            player.eli === eli
              ? {
                  ...player,
                  id: `${idPlayer}${teamName}`,
                  teams: player.teams?.includes(teamName)
                    ? player.teams
                    : [...(player.teams || []), teamName],
                }
              : player
          )
        )
      );
      setIdPlayer(`${idPlayer}${teamName}`)
      setisOpenAdd(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Quitamos el jugador de loading
      setLoadingIds((prev) => prev.filter((x) => x !== id));
    }
  };


  const handleRemoveTeam = async (id: string, teamName: string) => {
    if (loadingIds.includes(id)) return;
  
    setLoadingIds((prev) => [...prev, id]);
  
    try {
      const res = await fetch("/api/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, teamName }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al eliminar equipo");
  
      console.log("✅ Team eliminado:", data.message);
  
      // Actualizar el localMarket quitando el team
      setLocalMarket((prevMarket: any[][]) =>
        prevMarket.map((team: any[]) =>
          team.map((player: any) =>
            player.id === id
              ? {
                  ...player,
                  teams: player.teams?.filter((t: string) => t !== teamName),
                }
              : player
          )
        )
      );
    } catch (error) {
      console.error("❌ Error eliminando equipo:", error);
    } finally {
      setLoadingIds((prev) => prev.filter((x) => x !== id));
    }
  };
  
  console.log(idPlayer)
  
  return (
    <main className="relative min-h-screen bg-bgPrimary text-fontTitle overflow-hidden p-4">
      {/* Overlay AddTeam */}
      <div
        className={`${
          isOpenAdd
            ? "opacity-100 pointer-events-auto bg-black/90"
            : "opacity-0 pointer-events-none"
        } fixed top-0 left-0 w-full h-screen z-20 flex items-center justify-center transition-all duration-300`}
      >
        <div
          ref={cartRef}
          className="w-full xs:w-[400px] md:w-auto xs:min-w-[400px] xs:min-h-[400px] bg-bgGames p-5 rounded-2xl relative"
        >
          <button
            className="absolute right-4 top-4 bg-black text-white hover:bg-hoverCard px-4 py-2 rounded-full"
            onClick={() => setisOpenAdd(false)}
          >
            X
          </button>
          <div className="w-full flex justify-center">
            <p className="font-geistBold">SELECCIONAR EQUIPO INTERESADO</p>
          </div>

          <div className="w-full grid grid-cols-8 gap-3 pt-4">
            {rankTeams.map((team: Rank, index: number) => (
              <div
                key={index}
                onClick={() => handleAddTeam(idPlayer, team.logo)}
                className="group hover:cursor-pointer w-full flex h-[56px] px-2 hover:bg-hoverCard hover:rounded-[4px] bg-bgGames/95"
              >
                <div className="min-w-[56px] flex justify-center items-center group-hover:bg-hoverCard">
                  <Image
                    src={team.logo}
                    alt={team.name}
                    width={46}
                    height={46}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de jugadores */}
      <div className="w-full grid grid-cols-4 gap-5">
        {localMarket.map((team, index) => (
          <ol key={index} className="border-[1px] border-white">
            {team.map((item: any, idx: number) => {
              if (!item) return null;

              return (
                <div
                  key={idx}
                  className={`group w-full flex h-[70px] justify-between gap-2 px-2 font-bold text-sm ${
                    item.id
                      ? "hover:bg-hoverCard hover:rounded-[4px] hover:cursor-pointer"
                      : ""
                  } xm:text-sm bg-bgGames/95 text-white`}
                >
                  <div className="flex gap-3 items-center hover:cursor-pointer">
                    <div className="min-w-[30px] rounded-md h-full flex justify-center items-center">
                      <span className="text-lg">{item.info[0]}</span>
                    </div>
                    <span className="group-hover:text-hoverText text-[16px]">
                      {item.info[1]}
                    </span>
                    <span className="min-w-[30px] flex justify-center items-center text-[22px]">
                      {item.info[2]}
                    </span>
                    <span className="min-w-[30px] flex justify-center items-center text-[22px]">
                      {item.info[3] === "C" ? <PadLockIcon /> : ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.teams?.map((team: string, index: number) => (
                      <div
                        key={index}
                        onClick={() => handleRemoveTeam(item.id, team)}
                        className="min-w-[40px] flex justify-center items-center group-hover:bg-hoverCard"
                      >
                        <Image
                          src={team}
                          alt={`team-${index}`}
                          width={32}
                          height={32}
                        />
                      </div>
                    ))}
                    {item.id && (
                      <button
                        onClick={() => {
                          setIdPlayer(item.id);
                          setisOpenAdd(true);
                        }}
                        className="text-[22px]"
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </ol>
        ))}
      </div>
    </main>
  );
}
