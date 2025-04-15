"use client";
import { useMyContext } from " @/context/ListContext";
import { ArrowIcon, EyeIcon, EyeOffIcon, PadLockIcon } from " @/Icons/Icons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { data } from " @/models/db";
import { Rank } from " @/types/types";
import Loader from " @/components/Loader/Loader";

const rankTeams = data.ranking;

export default function Home() {
  const { market, isOpenAdd, setisOpenAdd, setMarket, lastMarketItem } = useMyContext();
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const cartRef = useRef<HTMLDivElement>(null);
  const [idPlayer, setIdPlayer] = useState<string>("");
  const [deletedTeam, setDeletedTeam] = useState<string>("");
  const [positionFilter, setPositionFilter] = useState<string>("");
  const [filterPlayers, setFilterPlayers] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(true); // 🔹 Controla la animación de opacidad de los partidos
  const [isActive, setIsActive] = useState(false); //Active FilterDesktop
  const [loading, setLoading] = useState(false); //Active FilterDesktop
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (filterPlayers.length > 0) {
      setFadeIn(false); // reiniciamos animación
      const timeout = setTimeout(() => setFadeIn(true), 10); // volvemos a aplicar fadeIn
  
      return () => clearTimeout(timeout); // limpiamos si cambia antes
    } else {
      setFadeIn(false);
    }
  }, [filterPlayers]);
  


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





  async function handleTransferPlayer(id: string) {
    console.log("Transfiriendo jugador:", id);
  
    // Evitamos duplicados mientras está en loading
    if (loadingIds.includes(id)) return;
  
    setLoadingIds((prev) => [...prev, id]);
  
    try {
      const res = await fetch("/api/tranfers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: id }),
      });
  
      if (!res.ok) throw new Error("Error al transferir el jugador");
  
      const data = await res.json();
      console.log("Transferencia exitosa:", data);
 
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingIds((prev) => prev.filter((x) => x !== id));
    }
  }
  






  const handleAddTeam = async (id: string, teamName: string) => {
    setLoading(true);
    let eli = id;

    if (idPlayer !== "") {
      eli = idPlayer;
    }

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

      // Actualizar el market con el nuevo equipo
      setMarket((prevMarket: any[][]) =>
        prevMarket.map((team: any[]) =>
          team.map((player: any) =>
            player.id === eli
              ? {
                ...player,
                id: `${idPlayer}-${teamName}`,
                teams: player.teams?.includes(teamName)
                  ? player.teams
                  : [...(player.teams || []), teamName],
              }
              : player
          )
        )
      );

      // Solo actualizamos idPlayer si el fetch fue exitoso
      setIdPlayer(`${idPlayer}${teamName}`);
      setLoading(false);
      setisOpenAdd(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Quitamos el jugador de loading
      setLoading(false);
      setLoadingIds((prev) => prev.filter((x) => x !== id));
    }
  };


  const handleRemoveTeam = async (id: string, teamName: string) => {
    setLoading(true);
    let eli = id;
    if (deletedTeam !== "") {
      eli = deletedTeam;
    }

    if (loadingIds.includes(eli)) return;

    setLoadingIds((prev) => [...prev, eli]);

    try {
      const res = await fetch("/api/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: eli, teamName }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al eliminar equipo");

      setIdPlayer(data.updatedValue);
      // Actualizar el market quitando el team
      setMarket((prevMarket: any[][]) =>
        prevMarket.map((team: any[]) =>
          team.map((player: any) =>
            player.id === eli
              ? {
                ...player,
                id: data.updatedValue,
                teams: player.teams?.filter((t: string) => t !== teamName),
              }
              : player
          )
        )
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(" Error eliminando equipo:", error);
    } finally {
      setLoading(false);
      setLoadingIds((prev) => prev.filter((x) => x !== eli));
    }
  };


  const getTextColor = (type: string): string => {
    const colorMap: Record<string, string> = {
      SD: "text-red-600",
      CD: "text-red-600",
      EXD: "text-red-600",
      EXI: "text-red-600",
      MC: "text-green-600",
      MCD: "text-green-600",
      MO: "text-green-600",
      MDI: "text-green-600",
      MDD: "text-green-600",
      MD: "text-green-600",
      MDC: "text-green-600",
      LI: "text-blue-400",
      LD: "text-blue-400",
      DEC: "text-blue-400",
      PT: "text-orange-400",
    };

    return colorMap[type] || "";
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setPositionFilter(selected);

    // Aplana el array de arrays
    const flatMarket = market.flat();

    if (selected === "") {
      setFilterPlayers([]);
    } else {
      const filtered = flatMarket
        .filter((item: any) => {
          return (
            Array.isArray(item.info) &&
            typeof item.info[0] === 'string' &&
            item.info[0].trim() !== '' &&
            item.info[0] === selected
          );
        })
        .sort((a: any, b: any) => {
          const ratingA = parseInt(a.info[2], 10);
          const ratingB = parseInt(b.info[2], 10);
          return ratingB - ratingA;
        });

      setFilterPlayers(filtered);
    }
  };


  return (
    <main className={`relative min-h-screen pt-[90px] bg-bgPrimary text-fontTitle overflow-hidden p-4`}>
      {/* Overlay AddTeam */}
      <div
        className={`${loading
          ? "opacity-100 pointer-events-auto bg-black/50"
          : "opacity-0 pointer-events-none"
          } fixed top-0 left-0 w-full min-h-screen max-h-screen z-50 flex items-center justify-center transition-all duration-300`}
      >
        <div className="loader flex justify-between w-[60px] gap-2">
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
      </div>
      </div>

      <div
        className={`${isOpenAdd
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
      <div className="flex justify-between font-geistRegular">
        <div className="flex gap-2 mb-4 items-center">
          <label htmlFor="position" className="font-geistRegular text-white">
            ORDENAR
          </label>
          <select
            id="position-select"
            value={positionFilter}
            onChange={handlePositionChange}
            className="p-1 bg-bgGames/95 text-white border border-gray-600/90 cursor-pointer"
          >
            <option className="hover:bg-primaryRed" value="SD">SD</option>
            <option className="hover:bg-primaryRed" value="CD">CD</option>
            <option className="hover:bg-primaryRed" value="EXD">EXD</option>
            <option className="hover:bg-primaryRed" value="EXI">EXI</option>
            <option className="hover:bg-primaryRed" value="MC">MC</option>
            <option className="hover:bg-primaryRed" value="MCD">MCD</option>
            <option className="hover:bg-primaryRed" value="MO">MO</option>
            <option className="hover:bg-primaryRed" value="MDI">MDI</option>
            <option className="hover:bg-primaryRed" value="MDD">MDD</option>
            <option className="hover:bg-primaryRed" value="LI">LI</option>
            <option className="hover:bg-primaryRed" value="LD">LD</option>
            <option className="hover:bg-primaryRed" value="DEC">DEC</option>
            <option className="hover:bg-primaryRed" value="PT">PT</option>
          </select>
          {
            filterPlayers.length > 0
              ? <button className="text-white text-lg min-w-[30px] h-[30px] rounded-full hover:bg-primaryRed  bg-bgGames/95" onClick={() => setFilterPlayers([])}>X</button>
              : null
          }
        </div>
        <button onClick={() => setIsActive(!isActive)} className="w-[320px]  flex justify-center items-center">
          <span className="flex gap-2 hover:bg-primaryRed rounded-md p-2">
            <span >TRANFERENCIAS COMPLETADAS</span>
            {
              isActive
                ? <EyeIcon />
                : <EyeOffIcon />
            }
          </span>
        </button>
      </div>

      {filterPlayers.length > 0 && (
        <div className={`
          mt-4 grid grid-cols-6 gap-4 pb-6
          transition-all duration-500 ease-in-out
          ${fadeIn ? "opacity-100" : "opacity-0"}
        `}>
          {filterPlayers.map((item: any, idx: number) => (
            <div
              key={idx}
              className={`group w-full flex h-[45px] justify-between gap-2 px-2 font-bold text-sm ${item.id
                ? "hover:bg-hoverCard hover:rounded-[4px] hover:cursor-pointer"
                : ""
                } xm:text-sm bg-bgGames/95 text-white`}
            >
              <div className="flex gap-3 items-center hover:cursor-pointer">
                <div className="min-w-[30px] rounded-md h-full flex justify-center items-center">
                  <span className={`text-[16px] ${getTextColor(item.info[0])}`}>{item.info[0]}</span>
                </div>
                <span className="group-hover:text-hoverText text-[14px] uppercase">
                  {item.info[1]}
                </span>
                <span className="min-w-[30px] flex justify-center items-center text-[16px]">
                  {item.info[2]}
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
                      width={24}
                      height={24}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}





      <div className="w-full flex pb-5 transition-all duration-300">
        <div
          className={`transition-all  duration-500 ${isVisible ? "opacity-100" : "opacity-0"
            } h-full w-full overflow-hidden`}
        >
          {
            market.length
              ? <div
                className={`grid w-full ${isActive
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
                  } gap-6 py-2`}
              >
                {market.slice(0, -1).map((team: any, index: any) => (
                  <ol key={index} className="border-[1px] rounded-sm border-gray-700 bg-bgGames/95 overflow-hidden">
                    {team.map((item: any, idx: number) => {
                      if (!item) return null;
                      if (idx === 0) {
                        return (
                          <div
                            key={idx}
                            className={`group w-full flex h-[45px] justify-center gap-2 px-2 font-bold text-sm xm:text-sm text-white`}
                          >
                            <div className="flex gap-1">
                              <div
                                key={index}
                                onClick={() => handleRemoveTeam(item.id, team)}
                                className="min-w-[40px] flex justify-center items-center"
                              >
                                <Image
                                  src={item?.teams[0]}
                                  alt={`team-${item?.teams[0]}`}
                                  width={32}
                                  height={32}
                                />
                              </div>
                              <div className="min-w-[40px] rounded-md h-full flex justify-center items-center">
                                <span className={`text-[16px] ${getTextColor(item.info[0])}`}>{item.info[0]}</span>
                              </div>
                            </div>

                          </div>
                        )
                      } else {
                        return (
                          <div
                            key={idx}
                            className={`group w-full flex h-[45px] justify-between gap-2 px-2 font-bold text-sm ${item.id
                              ? "hover:bg-hoverCard hover:rounded-[4px] hover:cursor-pointer"
                              : ""
                              } xm:text-sm  text-white`}
                          >
                            <div className="flex gap-3 items-center hover:cursor-pointer">
                              <div onClick={()=> handleTransferPlayer(item.id)} className="min-w-[40px] rounded-md h-full flex justify-center items-center">
                                <span className={`text-[16px] ${getTextColor(item.info[0])}`}>{item.info[0]}</span>
                              </div>
                              <span className="group-hover:text-hoverText text-[16px] uppercase">
                                {item.info[1]}
                              </span>
                              <span className="min-w-[30px] flex justify-center items-center text-[18px]">
                                {item.info[2]}
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
                      }
                    })}
                  </ol>
                ))
                }
              </div>
              : <div className="flex items-center justify-center h-[400px]">
                <div className="w-12 h-12 border-4 border-bgPrimary border-t-primaryRed rounded-full animate-spin">
                </div>
              </div>
          }
        </div>
        <div
          className={`hidden lg:block h-auto transition-all min-h-[700px] duration-300 rounded-md relative pb-4 ${isActive ? "w-[400px]" : "w-0"
            }`}
        >
          <div
            className={`top-0 ${isActive ? "right-0 " : "right-[-400px]"
              } absolute transition-all duration-300 pb-4 z-10 w-full h-full`}
          >
            <ol className="">
              {lastMarketItem?.length && lastMarketItem?.map((item: any, idx: number) => {
                if (!item.id) return null;
                return (
                  <div
                    key={idx}
                    className={`group w-full flex h-[40px] justify-between gap-2 px-2 font-bold text-sm xm:text-sm text-white`}
                  >
                    <div className="flex gap-3 items-center hover:cursor-pointer">
                      <div className="min-w-[30px] max-w-[30px]  rounded-md h-full flex justify-center items-center">
                        <span className={`text-[13px] ${getTextColor(item.info[0])}`}>{item.info[0]}</span>
                      </div>
                      <span className="text-[12px] min-w-[100px] max-w-[100px] xl:min-w-[120px] xl:max-w-[120px] truncate uppercase">
                        {item.info[1]}
                      </span>
                      <span className="min-w-[26px] flex justify-center items-center text-[13px]">
                        {item.info[2]}
                      </span>
                    </div>
                    <div className="flex items-center xl:gap-0">
                      <div
                        className="min-w-[34px] flex justify-center items-center"
                      >
                        <Image
                          src={item.teams[0]}
                          alt={item.teams[0]}
                          width={28}
                          height={28}
                        />
                      </div>
                      <span className="min-w-[28px] flex justify-center items-center text-[14px]">
                        <ArrowIcon />
                      </span>

                      <div
                        className="min-w-[34px] flex justify-center items-center"
                      >
                        <Image
                          src={item.teams[1]}
                          alt={item.teams[1]}
                          width={28}
                          height={28}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </ol>














          </div>
        </div>


      </div>


    </main>
  );
}
