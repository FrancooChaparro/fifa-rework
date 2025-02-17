"use client";
import { HamburgerMenuIcon, SearchIcon, UserIcon } from " @/Icons/Icons";
import langs from " @/models/langs.json";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { data } from " @/models/db";
import { Rank } from " @/types/types";
import Image from "next/image";

export default function Nav() {
  const router = useRouter();
  const namesArray = data.ranking;
  const pathname = usePathname();
  const [isBlurred, setIsBlurred] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredNames, setFilteredNames] = useState<Rank[]>([]);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShowInput(false);
    setIsOpen(false);
    setIsActive(false);
  }, [pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().trimStart(); // Evita espacios al inicio
    setInputValue(value);

    // Si el input tiene menos de 2 caracteres (sin contar espacios), no muestra sugerencias
    if (value.replace(/\s/g, "").length >= 2) {
      const filtered = namesArray.filter((e) =>
        e.name.toUpperCase().includes(value)
      );
      setFilteredNames(filtered);
    } else {
      setFilteredNames([]); // Oculta la lista si hay menos de 2 caracteres útiles
    }
  };

  const handleSelect = (name: string) => {
    setInputValue(""); // Rellena el input con el nombre seleccionado
    setFilteredNames([]); // Oculta la lista de sugerencias
  };

  const handleSearchClick = () => {
    if (showInput) {
      setInputValue(""); // Rellena el input con el nombre seleccionado
      setFilteredNames([]); // Oculta la lista de sugerencias
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsBlurred(window.scrollY > 0); // Aplica blur si el scroll es mayor a 0
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detectar clic fuera del menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden"; // Desactivar scroll
    } else {
      document.body.style.overflow = ""; // Restaurar scroll
    }
  
    return () => {
      document.body.style.overflow = ""; // Asegurar que se restablezca al desmontar
    };
  }, [isActive]);
  

  return (
    <div
      className={`w-full fixed top-0 left-0  h-[60px] font-geistLight  text-[#ffffff] items-center px-0 lg:px-14 text-lg z-10 transition-all ${
        isBlurred ? "backdrop-blur-md bg-black/70" : "bg-black/95 select-none"
      }`}
    >
      <div className="flex justify-between items-center relative h-full w-full px-6">

        {/*HAMBURGER MENU*/}
        <div className={`absolute top-0 left-0 w-full h-screen max-h-screen overflow-scroll overflow-y-scroll bg-bgGames z-20 px-7 transition-all duration-300 ${isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div className="w-full flex justify-end items-center h-[60px]">
            <div
              onClick={() => setIsActive(false)}
              className="rounded-full bg-[#1a1a1a] hover:bg-hoverCard transition-all duration-150 cursor-pointer flex justify-center items-center h-[30px] w-[30px] z-10"
            >
              X
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {langs.map((item, index) => (
              <Link href={item.path} key={index} className="">
                <p className="text-[22px] font-geistBold text-white tracking-[0.10px] border-b-[1px] border-white pb-2">
                  {item.label}
                </p>
              </Link>
            ))}
          </div>
          <p className="text-[24px] font-geistBold text-white tracking-[0.10px] w-full text-center py-8">
            Trend Teams
          </p>
          <div className="grid grid-cols-2 w-full gap-[10px] gap-y-[10px] ">
            {
             namesArray && namesArray.slice(16,22).map((team, index )=> (
              <Link prefetch={false} href={`/team/${team.name}`} key={index} className="w-full h-[100px] bg-white relative">
              <Image
                src={team.cover || "/images/blur.png"}
                placeholder="blur"
                blurDataURL="/images/blur.png"
                alt="atl"
                fill
                className="h-full w-full object-cover object-center"
              />
            </Link>
             ))
            }
          
          </div>
          <p className="text-[24px] font-geistBold text-white tracking-[0.10px] w-full text-center pt-5 pb-3">
            Last Champions
          </p>
          <div className="w-full flex justify-center">
            <Image
              src={"/images/Liverpool.png"}
              alt="atl"
              width={55}
              height={55}
            />
          </div>
        </div>

        {/*SEARCH MOBILE*/}
        <div
          className={`absolute bottom-[-65px] h-full w-full  right-0 lg:hidden text-sm px-2  ${
            showInput
              ? "opacity-100 pointer-events-auto clip-path-none z-10"
              : "opacity-0 pointer-events-none z-[-10] clip-path-[inset(0_100%_0_0)]"
          }`}
        >
          <div className="block lg:hidden relative  transition-all duration-300 ">
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Escribe un nombre..."
              className={`w-full h-[60px] placeholder:font-geistLight font-geistLight px-6 outline-none border-none focus:ring-0 focus:outline-none active:outline-none hover:outline-none bg-black/95 transition-all duration-300 `}
            />
            {filteredNames.length > 0 && (
              <ul
                className={` absolute w-full bg-black/95  min-h-[90px] top-[60px] shadow-lg z-50 transition-all duration-300   ${
                  showInput
                    ? "opacity-100 pointer-events-auto clip-path-none z-10"
                    : "opacity-0 pointer-events-none z-[-10] clip-path-[inset(0_100%_0_0)]"
                }`}
              >
                {filteredNames.map((team, index) => (
                  <Link
                    key={index}
                    prefetch={false}
                    href={`/team/${team.name}`}
                    onClick={() => handleSelect(team.name)}
                    className="p-2 flex items-center gap-3 cursor-pointer hover:bg-hoverCard text-white"
                  >
                    <Image
                      src={team.logo}
                      alt={team.name}
                      width={30}
                      height={30}
                    />
                    <span className="font-geistRegular">{team.name}</span>
                  </Link>
                ))}
              </ul>
            )}
            <div className="absolute top-0 right-0 flex justify-center items-center h-full pr-6">
              <div
                onClick={() => handleSearchClick()}
                className="rounded-full hover:bg-hoverCard transition-all duration-150 cursor-pointer flex justify-center items-center h-[30px] w-[30px] z-10"
              >
                X
              </div>
            </div>
          </div>
        </div>
        {/*LEFT CONTENT*/}
        <div className="flex lg:hidden hover:cursor-pointer" onClick={()=> setIsActive(true)}>
          <HamburgerMenuIcon />
        </div>
        <span
          className="hover:cursor-pointer overflow-hidden h-[40px] w-[100px] ml-[40px] lg:ml-0 flex justify-center items-center tracking-[0.82px]"
          onClick={() => router.push("/")}
        >
          <img
            className="w-[100px] h-[100px] invert"
            src="https://cdn.iconscout.com/icon/free/png-256/free-espn-logo-icon-download-in-svg-png-gif-file-formats--brand-brands-and-logos-pack-icons-2673814.png?f=webp&w=256"
            alt=""
          />
        </span>
        {/*MID CONTENT*/}
        <div className="xl:flex gap-10 text-sm hidden">
          {langs.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className="relative group p-1 tracking-[0.56px]"
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-hoverCard transition-all duration-100 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        <div className="lg:flex xl:hidden gap-10 text-sm hidden">
          {langs.slice(0, 2).map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className="relative group p-1 tracking-[0.56px]"
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-hoverCard transition-all duration-100 group-hover:w-full"></span>
            </Link>
          ))}

          <div
            className="relative xm:block xl:hidden hidden p-1 h-full tracking-[0.56px] "
            onClick={() => setIsOpen(!isOpen)}
            ref={menuRef}
          >
            {/* Contenedor general que incluye el texto y el menú */}
            <div className="hover:cursor-pointer">
              Players
              <span
                className={`absolute left-0 bottom-0 h-[3px] bg-hoverCard transition-all duration-100 
          ${isOpen ? "w-full" : "w-0"}`}
              ></span>
            </div>

            {/* Menú desplegable */}
            <div
              className={`absolute bottom-[-107px] left-[-12px] flex  px-4  flex-col gap-2 min-h-10 min-w-[90px] py-2 transition-all duration-200    ${
                isBlurred
                  ? "backdrop-blur-md bg-black/70"
                  : "bg-black/95 select-none"
              } ${
                isOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }
      `}
            >
              {langs.slice(2, 5).map((item, index) => (
                <Link
                  href={item.path}
                  key={index}
                  className="relative group tracking-[0.56px]"
                >
                  {item.label}
                  <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-hoverCard transition-all duration-100 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/*SEARCH DESKTOP*/}
        <div className="absolute top-0 h-full right-0 flex gap-[20px] lg:gap-6 text-sm items-center justify-end">
          <div className="hidden lg:flex relative w-64 bg-red-200 transition-all duration-300 ">
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Escribe un nombre..."
              className={`absolute -translate-y-1/2 w-[256px] h-[35px] placeholder:font-geistLight font-geistLight px-2 outline-none border-none focus:ring-0 focus:outline-none active:outline-none hover:outline-none bg-bgGames transition-all duration-300  ${
                showInput
                  ? "opacity-100 pointer-events-auto clip-path-none z-10"
                  : "opacity-0 pointer-events-none z-[-10] clip-path-[inset(0_100%_0_0)]"
              }`}
            />
            {filteredNames.length > 0 && (
              <ul
                className={` absolute w-[256px] bg-bgGames  min-h-[90px] top-[21px] shadow-lg z-50 transition-all duration-300   ${
                  showInput
                    ? "opacity-100 pointer-events-auto clip-path-none z-10"
                    : "opacity-0 pointer-events-none z-[-10] clip-path-[inset(0_100%_0_0)]"
                }`}
              >
                {filteredNames.map((team, index) => (
                  <Link
                    key={index}
                    prefetch={false}
                    href={`/team/${team.name}`}
                    onClick={() => handleSelect(team.name)}
                    className="p-2 flex items-center gap-3 cursor-pointer hover:bg-hoverCard text-white"
                  >
                    <Image
                      src={team.logo}
                      alt={team.name}
                      width={30}
                      height={30}
                    />
                    <span className="font-geistRegular">{team.name}</span>
                  </Link>
                ))}
              </ul>
            )}
            {!showInput ? (
              <div
                onClick={() => handleSearchClick()}
                className="absolute -translate-y-1/2 right-0 rounded-full bg-[#1a1a1a] hover:bg-hoverCard transition-all duration-150 cursor-pointer flex justify-center items-center h-[30px] w-[30px] z-10"
              >
                <SearchIcon />
              </div>
            ) : (
              <div
                onClick={() => handleSearchClick()}
                className="absolute -translate-y-1/2 right-0 rounded-full bg-[#1a1a1a] hover:bg-hoverCard transition-all duration-150 cursor-pointer flex justify-center items-center h-[30px] w-[30px] z-10"
              >
                X
              </div>
            )}
          </div>
          <p className="tracking-[0.56px] lg:block hidden">Sing up</p>
        </div>

        {/*RIGHT MOBILE*/}
        <div className="lg:hidden flex gap-4">
          <div
            onClick={() => setShowInput(true)}
            className="rounded-full bg-[#1a1a1a] hover:bg-hoverCard transition-all duration-150 cursor-pointer flex justify-center items-center h-[30px] w-[30px] z-10"
          >
            <SearchIcon />
          </div>
          <div className="rounded-full bg-[#1a1a1a] hover:bg-hoverCard transition-all duration-150 cursor-pointer lg:hidden flex justify-center items-center h-[30px] w-[30px]">
            <UserIcon />
          </div>
        </div>
        {/*div fantasma*/}
        <span className="hover:cursor-pointer overflow-hidden h-[40px] w-[100px] ml-[40px] lg:ml-0 hidden lg:flex justify-center items-center tracking-[0.82px] opacity-0 pointer-events-none">
          <img
            className="w-[100px] h-[100px] invert"
            src="https://cdn.iconscout.com/icon/free/png-256/free-espn-logo-icon-download-in-svg-png-gif-file-formats--brand-brands-and-logos-pack-icons-2673814.png?f=webp&w=256"
            alt=""
          />
        </span>
      </div>
    </div>
  );
}
