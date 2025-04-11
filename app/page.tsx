"use client";
import Banner from " @/components/Banner/Banner";
import TopPlayers from " @/components/Banner/Test";
import ContainerGames from " @/components/ContainerGames/ContainerGames";
import ContactMeComponent from " @/components/Footer/Footer";
import Loader from " @/components/Loader/Loader";
import { News } from " @/components/News/News";
import { Ranking } from " @/components/Ranking/Ranking";
import { useMyContext } from " @/context/ListContext";
import { PadLockIcon } from " @/Icons/Icons";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { market } = useMyContext();
  const [locked, setLocked] = useState(false);
  const [localMarket, setLocalMarket] = useState<any[][]>([]); // array de arrays

  useEffect(() => {
    if (market && market.length > 0) {
      setLocalMarket(market);
    }
  }, [market]);

  console.log(localMarket)
  const scrollToDetails = () => {
    const target = document.getElementById('target-component');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  async function actualizarJugador(id: string) {
    // Evitar doble clic rápido
    if (loadingIds.includes(id)) return;

    setLoadingIds((prev) => [...prev, id]);

    // Encontramos al jugador actual
    const jugadorActual = localMarket.flat().find((player: any) => player.id === id);
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
          hasC: yaTieneC, // 👈 importante
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error desconocido");

      console.log("✅", data.message);

      // Actualizamos el estado local
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



  return (
    <main className="relative min-h-screen bg-bgPrimary text-fontTitle">
      {/* <Banner />
      <div className="hidden md:block md:absolute md:top-[64px] md:right-[5px]">
        <ContainerGames scrollToDetails={scrollToDetails} />
      </div>
      <div className="block md:hidden px-4 pt-10 lg:pt-20 lg:px-20">
        <ContainerGames scrollToDetails={scrollToDetails}
        />
      </div>
      <div className="px-4 lg:px-20 pt-10 lg:pt-20">
        <p className="text-[38px] block md:hidden font-geistBold text-white tracking-[0.10px] border-b-[1px] border-white pb-2 mb-4">
          News
        </p>
        <News />
      </div>
      <div className="md:h-20 h-10 w-full" id={"target-component"} />
      <Ranking />
      <TopPlayers /> */}
      <div className="w-full grid grid-cols-4 gap-2">
        {
          localMarket && localMarket.length > 0 &&
          localMarket.map((team: { id: string; info: string[] }[], index: number) => (
            <ol key={index} className="border-[1px] border-white">
              {team.map((item: any, idx) => (
                <div
                  key={idx}
                  onClick={() => actualizarJugador(item.id)}
                  className="group hover:cursor-pointer w-full flex h-[70px] justify-between gap-2 px-2 font-bold text-sm hover:bg-hoverCard  hover:rounded-[4px] xm:text-sm bg-bgGames/95  text-[#ffffff] "
                >
                  {/* Sección izquierda */}
                  <div className="flex gap-3 items-center hover:cursor-pointer">
                    {/* Rank */}
                    <div className="min-w-[30px] rounded-md h-full justify-center items-center flex group-hover:bg-hoverCard">
                      <span className="text-lg">{`${item.info[0]}`}</span>
                    </div>

                    {/* Logo */}

                    {/* Nombre */}
                    <span className="group-hover:text-hoverText text-[16px]">
                      {`${item.info[1]}`}
                    </span>

                    <span className="min-w-[30px] rounded-md h-full justify-center items-center flex text-[22px] group-hover:bg-hoverCard">
                      {`${item.info[2]}`}
                    </span>
                    <span className="min-w-[30px] rounded-md h-full justify-center items-center flex text-[22px] group-hover:bg-hoverCard">
                      {
                        item.info[3] === "C"
                          ? <PadLockIcon />
                          : ""
                      }
                    </span>
                  </div>

                  {/* Títulos */}
                  <div className="flex justify-center items-center gap-2">
                    <div className="min-w-[40px] flex justify-center items-center group-hover:bg-hoverCard">
                      <Image
                        src={"/images/Ajax.png"}
                        alt={"Ajax"}
                        width={32}
                        height={32}
                      />
                    </div>
                    <p className="text-[22px]">
                      +
                    </p>
                  </div>

                </div>

              ))}
            </ol>
          ))
        }
      </div>
    </main>
  );
}
