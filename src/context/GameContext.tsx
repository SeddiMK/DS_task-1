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
  const [settings, setSettings] = useState<{}>(
    parseInt(localStorage.getItem("settings") || "0"),
  );

  const [sessionScore, setSessionScore] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);

  const updateSessionStorageGamesPlayed = (gamesPlayed: number) => {
    sessionStorage.setItem("gamesPlayed", gamesPlayed.toString());
  };

  const updateLocalStorageMaxScore = (maxScore: number) => {
    localStorage.setItem("maxScore", maxScore.toString());
  };

  const updateLocalStorageSettings = (settings: {}) => {
    // localStorage.clear();
    localStorage.setItem("settingsGame", JSON.stringify(settings));
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
          updateSessionStorageGamesPlayed(games);
        },

        maxScore,
        setMaxScore: (score) => {
          setMaxScore(score);
          updateLocalStorageMaxScore(score);
        },

        settings,
        setSettings: (obj: {}) => {
          setSettings(obj);
          updateLocalStorageSettings(obj);
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
