"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Image from "next/image";
import { top20 } from " @/models/db";

const players = top20.players;

export default function TopPlayers() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <div className="px-4 lg:px-20 w-full overflow-hidden pb-20 pt-20">
      <p className="text-[38px] font-geistBold text-white tracking-[0.10px] border-b-[1px] border-white pb-2">
        Top 20 Players
      </p>
      <div className="w-full flex flex-col items-center gap-[30px] pt-[30px]">
        <p className="border-plum border-[1px] rounded-full  flex justify-center items-center font-jjannon-italic italic lg:w-[48px] lg:h-[48px] w-[58px] h-[58px] lg:text-[29px] text-[40px] lg:leading-[48px] tracking-[1.92px] lg:tracking-[1.16px] pt-1 lg:pt-0 ">
          {currentSlide + 1}
        </p>
        {/* carrusel */}
        <div className=" w-full max-w-full flex justify-end overflow-visible">
          <div className="w-full lg:max-w-[calc(50%+200px)] max-w-[calc(50%+128px)] relative custom-carousel-sustainability">
            {/* MAX-W-CAL => 50% + LA MITAD DEL WIDTH DE LA TARJETA */}

            <div className="lg:max-w-[430px]">
              {/* maximo de slider para simular el gap  => gap real (30px) + width de la card 400px*/}

              <Slider
                {...settings}
                // className="w-full max-w-full !overflow-visible [&>div>div]:flex [&>div>div]:xxl:gap-28 [&>div>div]:lg:gap-8 [&>div>div]:gap-10"
              >
                {players &&
                  players.map((data, index) => {
                    return (
                      // relative xxl:left-[110px] lg:left-[27px] left-[40px]

                      <div
                        className={`${
                          index !== 0 ? "" : ""
                        } w-full text-white cursor-pointer`}
                        key={index}
                      >
                        <div
                          className={`relative w-[256px] h-[291px] lg:w-[399px] lg:h-[452px] !rounded-none flex flex-col gap-[12px] items-center justify-end ${
                            index === currentSlide
                              ? "border-[1px] border-wine"
                              : ""
                          } p-[26px] lg:p-[40px] transition-all `}
                        >
                          {/* <div className="font-jjannon-italic italic lg:text-[24px] text-[20px] text-wine tracking-[0.80px] lg:tracking-[0.96px] leading-[24px]">
                          TITULO
                        </div>
                        <div className="text-[13px] font-gotham-bold  leading-[14.37px] tracking-[0.52px] text-wine">
                          subtitulo
                        </div> */}
                        
                          <Image
                            src={data.image || "/images/blur.webp"}
                            alt="atl"
                            fill
                            placeholder="blur"
                            blurDataURL="/images/blur.webp"
                            quality={100}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[480px] lg:px-0 px-[25px]">
          <p className="text-center text-lg font-geistRegular font-medium leading-[20px]">
            {players[currentSlide].name}
          </p>
          <p className="text-center text-[13px] tracking-[0.52px] font-gotham-bold mt-2">
            {`${currentSlide + 1} / ${players.length}`}
          </p>
        </div>
      </div>
    </div>
  );
}
