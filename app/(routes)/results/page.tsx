"use client";
import { Match } from " @/types/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { History } from " @/models/db";
import { FilterIcon } from " @/Icons/Icons";
import { useMyContext } from " @/context/ListContext";
import Particles from " @/components/particles";

const Games = History.Games;
const bestMatchs = History.best_match;
const torneosNoOficiales = History.torneos;
const Filteres = [
  "PARIS SAINT GERMAIN",
  "BAYERN MUNICH",
  "MANCHESTER CITY",
  "MANCHESTER UNITED",
  "REAL MADRID",
  "CHELSEA",
  "JUVENTUS",
];

export default function ResultsPage() {
  const [isActive, setIsActive] = useState(false); //Active FilterDesktop
  const [allGames] = useState<Match[]>(Games); // Almacena todos los juegos originales
  const [games, setGames] = useState<Match[]>(Games); // Equipos Filtrados
  const [minGoals, setMinGoals] = useState(1); // Valor inicial del slider de Goles
  const [isVisible, setIsVisible] = useState(true); // Controla la animación de opacidad de los partidos
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]); //Filtra los partidos de los jugadores
  const [selectedText, setSelectedText] = useState<string | null>(null); //Filtra por nombre de equipo / torneos / Best Match
  const [filtersMobile, setFiltersMobile] = useState<boolean>(false); // AActive FilterMobile

  {
    /*FILTRA LOS PARTIDOS POR JUGADOR */
  }
  const handleCheckboxChange = (player: string) => {
    setIsVisible(false); // Oculta los juegos antes de actualizar
    setSelectedText("");
    setTimeout(() => {
      setSelectedPlayers((prevSelectedPlayers) => {
        const updatedPlayers = prevSelectedPlayers.includes(player)
          ? prevSelectedPlayers.filter((p) => p !== player)
          : [...prevSelectedPlayers, player];

        let filterGames;

        if (updatedPlayers.length === 1) {
          filterGames = allGames.filter(
            (game) =>
              game.Player1 === updatedPlayers[0] ||
              game.Player2 === updatedPlayers[0]
          );
        } else if (updatedPlayers.length === 2) {
          filterGames = allGames.filter(
            (game) =>
              (game.Player1 === updatedPlayers[0] &&
                game.Player2 === updatedPlayers[1]) ||
              (game.Player1 === updatedPlayers[1] &&
                game.Player2 === updatedPlayers[0])
          );
        } else if (updatedPlayers.length > 2) {
          filterGames = allGames.filter(
            (game) =>
              updatedPlayers.includes(game.Player1) ||
              updatedPlayers.includes(game.Player2)
          );
        } else {
          filterGames = allGames;
        }

        setGames(filterGames);

        setTimeout(() => {
          setIsVisible(true); // Muestra los juegos después de actualizar
        }, 100);

        return updatedPlayers;
      });
    }, 100);
  };

  {
    /*FILTRA LOS PARTIDOS POR GOLES */
  }
  const handlerFilterGoals = (value: number) => {
    setIsVisible(false); // Oculta los juegos antes de actualizar
    setSelectedText("");

    setTimeout(() => {
      setMinGoals(value);
      const filterGames = allGames.filter(
        (game) => game.LocalResultado + game.VisitanteResultado >= value
      );
      setGames(filterGames);

      setTimeout(() => {
        setIsVisible(true); // Muestra los juegos después de actualizar
      }, 100);
    }, 100);
  };

  {
    /*FILTRA LOS PARTIDOS POR BESTMACH O TORNEOS VERANO */
  }
  const handlerOtherGames = (param: Match[]) => {
    setIsVisible(false); // Oculta los juegos antes de actualizar
    setMinGoals(1);
    setTimeout(() => {
      setGames(param);
      setTimeout(() => {
        setIsVisible(true); // Muestra los juegos después de actualizar
      }, 100);
    }, 100);
  };

  {
    /*FILTRA LOS PARTIDOS POR Nombre de equipo */
  }
  const filterByTeamName = (param: string) => {
    setIsVisible(false); // Oculta los juegos antes de actualizar
    setMinGoals(1);
    setTimeout(() => {
      const filterGames = allGames.filter(
        (game) => game.LocalNombre === param || game.VisitanteNombre === param
      );
      setGames(filterGames);
      setTimeout(() => {
        setIsVisible(true); // Muestra los juegos después de actualizar
      }, 100);
    }, 100);
  };

  {
    /*MOBILE BODY-NO-SCROLL-HAMBURGER-MENU*/
  }
  useEffect(() => {
    if (filtersMobile) {
      document.body.style.overflow = "hidden"; // Desactivar scroll
    } else {
      document.body.style.overflow = ""; // Restaurar scroll
    }

    return () => {
      document.body.style.overflow = ""; // Asegurar que se restablezca al desmontar
    };
  }, [filtersMobile]);

  return (
    <div className="w-full relative flex flex-col min-h-screen bg-[#18181a] text-white pt-[90px] px-10">
      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#F7FF9B"}
        refresh
      />
      <p className="text-[34px] lg:text-[38px] font-geistBold text-white tracking-[0.10px] border-b-[1px] border-white pb-2 mb-4">
        Finals & PopularMatchs
      </p>
      {/*HEADER MENU*/}
      <div className="w-full flex justify-between h-20 items-center ">
        <FilterComponent
          styles={"hidden lg:flex gap-2 items-center cursor-pointer"}
          func={() => setIsActive(!isActive)}
        />
        <FilterComponent
          styles={"flex lg:hidden gap-2 items-center cursor-pointer"}
          func={() => setFiltersMobile(true)}
        />
        <p className="font-geistBold text-lg">
          {games?.length ?? "0"} PARTIDOS
        </p>
        <p className="hidden lg:block opacity-0">FILTER</p>
      </div>

      {/* Contenedor principal con flex */}
      <div className="w-full flex pb-5  transition-all duration-300">
        {/* MENU FILTROS DESKTOP */}
        <div
          className={`hidden lg:block h-auto transition-all min-h-[700px] duration-300 rounded-md relative pb-4  overflow-hidden ${isActive ? "w-[400px] " : "w-0 "
            }`}
        >
          <div
            className={`top-0  ${isActive ? "left-0 " : "left-[-400px]"
              } absolute transition-all duration-300 pb-4 z-10 w-full h-full `}
          >
            <FilterPlayersComponent
              {...{ selectedPlayers, handleCheckboxChange }}
            />

            {/* FILTERS GOLES */}
            <h3 className="text-lg font-geistBold text-white mt-4 mb-4 uppercase">
              Filtrar por Goles Totales
            </h3>
            <SliderGoalsComponent {...{ minGoals, handlerFilterGoals }} />
            {/* FILTERS EQUIPO */}
            <h3 className="text-lg font-geistBold uppercase text-white mt-4 mb-4">
              Filtrar por team
            </h3>
            <FilterByNameComponent
              {...{ selectedText, setSelectedText, filterByTeamName }}
            />
            {/* FILTERS best matchs & torneos no oficiales */}
            <FilterBestMatchs
              {...{ selectedText, setSelectedText, handlerOtherGames }}
            />
          </div>
        </div>
        {/* Div de contenido principal que ocupa el resto */}
        <div
          className={`transition-all  duration-500 ${isVisible ? "opacity-100" : "opacity-0"
            } h-full w-full overflow-hidden`}
        >
          <div
            className={`grid ${isActive
              ? "grid-cols-2 lg:grid-cols-3 xm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 2.5xl:grid-cols-7"
              : "grid-cols-2 lg:grid-cols-4 xm:grid-cols-5  xl:grid-cols-5 2xl:grid-cols-7 2.5xl:grid-cols-8"
              } gap-6 py-2  `}
          >
            {games && games.length ? (
              games.map((_, i) => <MatchCard match={_} key={i} />)
            ) : (
              <p className="font-geistRegular text-white text-[24px] tracking-wider">
                No hay partidos.
              </p>
            )}
          </div>
        </div>
      </div>

      {/*MENU FILTROS MOBILE*/}
      <div
        className={`absolute top-0 left-0 w-full h-screen max-h-screen overflow-scroll overflow-y-scroll bg-bgGames z-30 px-7 transition-all duration-300 ${filtersMobile
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="w-full flex justify-end items-center h-[60px]">
          <div
            onClick={() => setFiltersMobile(false)}
            className="rounded-full bg-[#1a1a1a] hover:bg-hoverCard transition-all duration-150 cursor-pointer flex justify-center items-center h-[30px] w-[30px] z-10"
          >
            X
          </div>
        </div>
        <div className={` h-auto  relative pb-4  overflow-hidden `}>
          <FilterPlayersComponent
            {...{ selectedPlayers, handleCheckboxChange }}
          />
          {/* FILTERS GOLES */}
          <h3 className="text-lg font-geistBold  text-white mt-4 mb-4 uppercase">
            Filtrar por Goles Totales
          </h3>
          <SliderGoalsComponent {...{ minGoals, handlerFilterGoals }} />
          {/* FILTERS EQUIPO */}
          <h3 className="text-lg font-geistBold  uppercase text-white mt-4 mb-4">
            Filtrar por team
          </h3>
          <FilterByNameComponent
            {...{ selectedText, setSelectedText, filterByTeamName }}
          />
          {/* FILTERS best matchs & torneos no oficiales */}
          <FilterBestMatchs
            {...{ selectedText, setSelectedText, handlerOtherGames }}
          />
        </div>
        <button
          onClick={() => setFiltersMobile(false)}
          className="w-full h-[50px] text-lg font-geistRegular text-white bg-primaryRed rounded-md"
        >
          APLICAR FILTROS
        </button>
      </div>
    </div>
  );
}

type TeamSlug =
  | "PSG"
  | "BAYERN"
  | "MAN CITY"
  | "MAN UNITED"
  | "REAL MADRID"
  | "INTER"
  | "BARCELONA"
  | "TOTTENHAM"
  | "NEWCASTLE"
  | "PORTO"
  | "CHELSEA"
  | "SEVILLA"
  | "ARSENAL"
  | "LIVERPOOL"
  | "ASTON VILLA"
  | "NAPOLI"
  | "VALENCIA"
  | "JUVENTUS"
  | "VILLA REAL"
  | "AJAX"
  | "BAYERN 04"
  | "DORTMUND"
  | "ZENIT"
  | "AC MILAN"
  | "ATL MADRID"
  | "LAZIO"
  | "BENFICA"
  | "SPORTING"
  | "EVERTON"
  | "ROMA"
  | "SAN LORENZO"
  | "DEFAULT";

const teamColors: Record<TeamSlug, string> = {
  PSG: "bg-blue-500",
  BAYERN: "bg-red-700",
  "MAN CITY": "bg-blue-400",
  "MAN UNITED": "bg-red-600",
  "REAL MADRID": "bg-white",
  INTER: "bg-blue-800",
  BARCELONA: "bg-blue-500",
  TOTTENHAM: "bg-gray-200",
  NEWCASTLE: "bg-slate-800",
  PORTO: "bg-blue-700",
  CHELSEA: "bg-blue-600",
  SEVILLA: "bg-red-500",
  ARSENAL: "bg-red-700",
  LIVERPOOL: "bg-red-600",
  "ASTON VILLA": "bg-blue-300",
  NAPOLI: "bg-blue-500",
  VALENCIA: "bg-orange-500",
  JUVENTUS: "bg-slate-800",
  "VILLA REAL": "bg-yellow-500",
  AJAX: "bg-red-500",
  "BAYERN 04": "bg-red-700",
  DORTMUND: "bg-yellow-500",
  ZENIT: "bg-blue-300",
  "AC MILAN": "bg-red-600",
  "ATL MADRID": "bg-red-400",
  LAZIO: "bg-blue-400",
  BENFICA: "bg-red-600",
  SPORTING: "bg-green-500",
  EVERTON: "bg-blue-700",
  ROMA: "bg-orange-500",
  "SAN LORENZO": "bg-blue-500",
  DEFAULT: "bg-gray-400",
};

const FilterBestMatchs = ({
  selectedText,
  setSelectedText,
  handlerOtherGames,
}: {
  selectedText: string | null;
  setSelectedText: (param: string) => void;
  handlerOtherGames: (param: Match[]) => void;
}) => {
  return (
    <>
      <div className="flex gap-[1px] justify-start items-center mt-4 mb-4 ">
        <h3
          className={`text-lg font-geistBold  uppercase cursor-pointer ${selectedText === "torneos" ? "text-primaryRed" : "text-white"
            } `}
          onClick={() => {
            setSelectedText("torneos");
            handlerOtherGames(torneosNoOficiales);
          }}
        >
          Tornos No oficiales
        </h3>
        {selectedText === "torneos" ? (
          <div className="rounded-full bg-primaryRed cursor-pointer  size-[12px] mb-[2px]" />
        ) : null}
      </div>
      <div className="flex gap-[1px] justify-start items-center mt-4 mb-4">
        <h3
          className={`text-lg font-geistBold  uppercase cursor-pointer ${selectedText === "best" ? "text-primaryRed" : "text-white"
            } `}
          onClick={() => {
            setSelectedText("best");
            handlerOtherGames(bestMatchs);
          }}
        >
          Best Matchs
        </h3>
        {selectedText === "best" ? (
          <div className="rounded-full bg-primaryRed cursor-pointer  size-[12px] mb-[2px]" />
        ) : null}
      </div>
    </>
  );
};

const FilterByNameComponent = ({
  selectedText,
  setSelectedText,
  filterByTeamName,
}: {
  selectedText: string | null;
  setSelectedText: (param: string) => void;
  filterByTeamName: (param: string) => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-3 px-[14px]">
      {Filteres.map((e, index) => (
        <div key={index} className="flex gap-2 justify-start items-center">
          <span
            className={`text-[14px] font-geistLight cursor-pointer ${selectedText === e ? "text-primaryRed" : "text-white"
              }`}
            key={index}
            onClick={() => {
              setSelectedText(e);
              filterByTeamName(e);
            }}
          >
            {e}
          </span>
          {selectedText === e ? (
            <div className="rounded-full bg-primaryRed cursor-pointer  size-[12px] mb-[2px]" />
          ) : null}
        </div>
      ))}
    </div>
  );
};

const SliderGoalsComponent = ({
  minGoals,
  handlerFilterGoals,
}: {
  minGoals: number;
  handlerFilterGoals: (param: any) => void;
}) => {
  return (
    <div className="relative w-full px-[14px] pr-20 flex flex-col items-center">
      {/* Barra numérica */}
      <div className="flex justify-between w-full px-6 text-white text-sm">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <span
            key={num}
            className={`transition-all ${num <= minGoals ? "text-primaryRed font-bold" : "text-white"
              }`}
          >
            {num}
          </span>
        ))}
      </div>
      {/* Slider personalizado */}
      <div className="relative w-full mt-2">
        {/* Barra de fondo */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-700 rounded-full"></div>
        {/* Barra de progreso amarillo */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 bg-primaryRed rounded-full transition-all"
          style={{ width: `calc(${(minGoals / 7) * 100}% - 25px)` }}
        ></div>

        {/* Input range con estilos */}
        <input
          type="range"
          min="1"
          max="7"
          value={minGoals}
          onChange={(e) => handlerFilterGoals(Number(e.target.value))}
          className="relative w-full h-6 bg-transparent cursor-pointer appearance-none z-10 
     [&::-webkit-slider-thumb]:appearance-none 
     [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
     [&::-webkit-slider-thumb]:bg-none [&::-webkit-slider-thumb]:rounded-full 
     [&::-webkit-slider-thumb]:shadow-md"
          style={{
            WebkitAppearance: "none",
            appearance: "none",
            outline: "none",
          }}
        />

        {/* Puntero (pelotita) del slider */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-primaryRed rounded-full transition-all"
          style={{
            left: `calc(${(minGoals / 7) * 100}% - 32px)`, // Ajuste del centro
          }}
        ></div>
      </div>
    </div>
  );
};

const FilterPlayersComponent = ({
  selectedPlayers,
  handleCheckboxChange,
}: {
  selectedPlayers: string[];
  handleCheckboxChange: (param: string) => void;
}) => {
  return (
    <div className="w-full flex flex-col items-start space-y-2">
      <h3 className="text-lg font-geistBold  text-white mt-4 mb-4 uppercase ">
        Filtrar por Jugador
      </h3>
      <label className="flex items-center px-[14px] space-x-2">
        <input
          type="checkbox"
          className="w-5 h-5 accent-primaryRed cursor-pointer"
          checked={selectedPlayers.includes("M")}
          onChange={() => handleCheckboxChange("M")}
        />
        <span className="text-[16px] font-geistRegular">Marcos</span>
      </label>
      <label className="flex items-center px-[14px] space-x-2">
        <input
          type="checkbox"
          className="w-5 h-5 accent-primaryRed cursor-pointer"
          checked={selectedPlayers.includes("F")}
          onChange={() => handleCheckboxChange("F")}
        />
        <span className="text-[16px] font-geistRegular">Franco</span>
      </label>
      <label className="flex items-center px-[14px] space-x-2">
        <input
          type="checkbox"
          className="w-5 h-5 accent-primaryRed cursor-pointer"
          checked={selectedPlayers.includes("G")}
          onChange={() => handleCheckboxChange("G")}
        />
        <span className="text-[16px] font-geistRegular">Gaston</span>
      </label>
    </div>
  );
};

const FilterComponent = ({
  func,
  styles,
}: {
  func: () => void;
  styles: string;
}) => {
  return (
    <div className={styles && styles} onClick={func}>
      <p className=" font-geistBold text-lg">FILTROS</p>
      <FilterIcon />
    </div>
  );
};

const MatchCard: React.FC<{ match: Match }> = ({ match }) => {
  const { seterGame } = useMyContext();
  const localColor = teamColors[(match.LocalSlug as TeamSlug) || "DEFAULT"];
  const visitanteColor =
    teamColors[(match.VisitanteSlug as TeamSlug) || "DEFAULT"];

  return (
    <div
      onClick={() => seterGame(true, match)}
      className="w-full h-[110px] relative overflow-hidden  hover:cursor-pointer border-[1px] border-transparent hover:border-primaryRed rounded-[10px]  transition-all duration-300"
    >
      <div className="relative size-full hover:opacity-0 opacity-100  rounded-[10px]">
        <div
          className={`absolute inset-0 ${localColor} clip-left hover:opacity-0 opacity-100`}
        ></div>
        <div
          className={`absolute inset-0 left-[40%] ${visitanteColor} clip-right hover:opacity-0 opacity-100`}
        ></div>

        <div className="absolute top-0 left-0 w-full h-full flex hover:opacity-0 opacity-100">
          <div className="w-full flex justify-center items-center text-white">
            <Image
              src={match.LocalEscudo}
              alt={match.LocalSlug || "Equipo"}
              width={45}
              height={45}
            />
          </div>
          <div className="w-full flex justify-center items-center text-white">
            <Image
              src={match.VisitanteEscudo}
              alt={match.VisitanteSlug || "Equipo"}
              width={45}
              height={45}
            />
          </div>
        </div>
      </div>

      <div className="absolute top-[0] left-[0] size-full flex gap-2 justify-center items-center  bg-[#18181a] z-10 opacity-0 hover:opacity-100 ">
        <div className="absolute top-2 left-0 w-full flex z-10 justify-center ">
          {match.isLegit === "L" ? (
            <span className="text-white font-geistRegular text-[13px] bg-indigo-700 border-sm py-[2px] px-1 rounded-lg">
              Legitimo
            </span>
          ) : (
            <span className="text-white font-geistRegular text-[13px] bg-slate-500 border-sm py-[2px] px-1 rounded-lg">
              NO Legitimo
            </span>
          )}
        </div>
        <div className="flex gap-[6px] items-center">
          {" "}
          <Image
            src={match.LocalEscudo}
            alt={match.LocalSlug || "Equipo"}
            width={35}
            height={35}
          />{" "}
          <p className="font-geistRegular text-[22px]">
            {match.LocalResultado}
          </p>{" "}
          {match.LocalPenalty ? (
            <p className="font-geistRegular text-lg">{`(${match.LocalPenalty})`}</p>
          ) : null}
        </div>
        <p>-</p>
        <div className="flex gap-[6px] items-center">
          <p className="font-geistRegular text-[22px]">
            {match.VisitanteResultado}
          </p>{" "}
          {match.VisitantePenalty ? (
            <p className="font-geistRegular text-lg">{`(${match.VisitantePenalty})`}</p>
          ) : null}
          <Image
            src={match.VisitanteEscudo}
            alt={match.VisitanteSlug || "Equipo"}
            width={35}
            height={35}
          />{" "}
        </div>
      </div>
    </div>
  );
};
