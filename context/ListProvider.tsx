"use client";
import React, { useState, FC, ReactNode, useEffect } from "react";
import { MyContext, MyContextType } from "./ListContext";
import { Match } from " @/types/types";


interface MyProviderProps {
  children: ReactNode;
}

const MyProvider: FC<MyProviderProps> = ({ children }) => {
  const [market, setMarket] = useState([]);

  // useEffect(() => {
  //   const fetchSheetData = async () => {
  //     try {
  //       const res = await fetch("/api/sheet");
  //       const data = await res.json();
  //       setMarket(data);
  //     } catch (error) {
  //       console.error("Error cargando datos del sheet:", error);
  //     }
  //   };

  //   fetchSheetData();
  // }, []);
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const res = await fetch("/api/sheet");
        const data = await res.json(); // data: string[][]
  
        const transformed = data.map((row: string[]) =>
          row.map((item: string) => {
            const parts = item?.split("-").map((p) => p.trim()) ?? [];
  
            return {
              id: item || "",
              info: [parts[0], parts[1], parts[2]] as [string, string, string],
            };
          })
        );
  
        setMarket(transformed);
      } catch (error) {
        console.error("Error cargando datos del sheet:", error);
      }
    };
  
    fetchSheetData();
  }, []);
  
  

  const [FrancoBombo, setFrancoBombo] = useState<any>([]);
  const [MarcosBombo, setMarcosBombo] = useState<any>([]);
  const [GastonBombo, setGastonBombo] = useState<any>([]);

  const [GastonCopy, setGastonCopy] = useState<any>([]);
  const [FrancoCopy, setFrancoCopy] = useState<any>([]);
  const [MarcosCopy, setMarcosCopy] = useState<any>([]);

  const [RomaBombo, setRomaBombo] = useState<any>([]);
  const [RomaCopy, setRomaCopy] = useState<any>([]);

  const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
  const [indexPost, setIndexPost] = useState<number>(1);

  const [isOpenGame, setisOpenGame] = useState<boolean>(false);
  const [indexGame, setIndexGame ] = useState<number>(1);

  const [detailsGame, setDetailsGame] = useState<Match>({
      isLegit: "",
      Player1: "",
      Player2: "",
      Result: "",
      LocalEscudo: "",
      LocalNombre: "",
      LocalSlug: "",
      LocalResultado: 2,
      VisitanteEscudo: "",
      VisitanteNombre: "",
      VisitanteSlug: "",
      VisitanteResultado: 1,
      Penalty: false,
  })

  const Franco = (newValue: any[]) => {
    setFrancoCopy(newValue);
    setFrancoBombo(newValue);
  };

  const Gaston = (newValue: any[]) => {
    setGastonCopy(newValue);
    setGastonBombo(newValue);
  };

  const Marcos = (newValue: any[]) => {
    setMarcosCopy(newValue);
    setMarcosBombo(newValue);
  };
  
  const Roma = (newValue: any[]) => {
    setRomaCopy(newValue);
    setRomaBombo(newValue);
  };

  const setOpening = (param: boolean, index: number) => {
    setIndexPost(index);
    if (param) {
      setTimeout(() => {
        setIsOpenPost(true);
      }, 200);
    } else {
      setIsOpenPost(false);
    }
  };
  
const seterGame = (param: boolean, index: Match) => {
  setDetailsGame(index);
  if (param) {
    setTimeout(() => {
      setisOpenGame(true);
    }, 350);
  } else {
    setisOpenGame(false);
  }
}

  const contextValue: MyContextType = {
    Franco,
    Gaston,
    Marcos,
    FrancoBombo,
    GastonBombo,
    MarcosBombo,
    FrancoCopy,
    GastonCopy,
    MarcosCopy,

    Roma, 
    RomaBombo,
    RomaCopy,
    isOpenPost,
    setOpening,
    indexPost,
    isOpenGame,
    seterGame,
    detailsGame, 
    setDetailsGame,

    market,
    setMarket
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default MyProvider;
