import { GameContextType } from "@/types/general";
import React, { createContext, useState, useContext, ReactNode } from "react";

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gamesPlayed, setGamesPlayed] = useState<number>(
    parseInt(sessionStorage.getItem("gamesPlayed") || "0"),
  );
  const [maxScore, setMaxScore] = useState<number>(
    parseInt(localStorage.getItem("maxScore") || "0"),
  );
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);

  const updateSessionStorage = (gamesPlayed: number) => {
    sessionStorage.setItem("gamesPlayed", gamesPlayed.toString());
  };

  const updateLocalStorage = (maxScore: number) => {
    localStorage.setItem("maxScore", maxScore.toString());
  };

  return (
    <GameContext.Provider
      value={{
        sessionScore,
        setSessionScore,

        mistakes,
        setMistakes,

        gamesPlayed,
        setGamesPlayed: (games) => {
          setGamesPlayed(games);
          updateSessionStorage(games);
        },

        maxScore,
        setMaxScore: (score) => {
          setMaxScore(score);
          updateLocalStorage(score);
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
