"use client";
import { Match, TeamMarket } from " @/types/types";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type MyContextType = {
  Franco: (newValue: any[]) => void;
  Gaston: (newValue: any[]) => void;
  Marcos: (newValue: any[]) => void;
  FrancoBombo: any[];
  GastonBombo: any[];
  MarcosBombo: any[];
  FrancoCopy: any[];
  GastonCopy: any[];
  MarcosCopy: any[];

  Roma: (newValue: any[]) => void;
  RomaBombo: any[];
  RomaCopy: any[];
  isOpenPost: boolean;
  setOpening: (param: boolean, index: number) => void;
  indexPost: number;

  isOpenGame: boolean;
  seterGame: (param: boolean, index: Match) => void;
  detailsGame: Match;
  setDetailsGame: (Match: Match) => void;

  market: TeamMarket[][] | [];
  setMarket: Dispatch<SetStateAction<TeamMarket[][]>>;

  // lastMarketItem: TeamMarket[] | [];

  isOpenAdd: boolean;
  setisOpenAdd: Dispatch<SetStateAction<boolean>>;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};

export { MyContext };
