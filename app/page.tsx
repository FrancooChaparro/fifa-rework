"use client";
import Banner from " @/components/Banner/Banner";
import TopPlayers from " @/components/Banner/Test";
import ContainerGames from " @/components/ContainerGames/ContainerGames";
import { News } from " @/components/News/News";
import Particles from " @/components/particles";
import { Ranking } from " @/components/Ranking/Ranking";

export default function Home() {

  const scrollToDetails = () => {
    const target = document.getElementById("target-component");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#18181a] text-fontTitle overflow-hidden ">
      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#F7FF9B"}
        refresh
      />
      <Banner />
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
      <TopPlayers />
    </main>
  );
}
