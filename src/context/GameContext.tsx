import { GameContextType, GameResult, GameSettings } from "@/types/general";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gamesPlayed, setGamesPlayed] = useState<number>(
    parseInt(sessionStorage.getItem("gamesPlayed") || "0"),
  );
  const [currentScore, setCurrentScore] = useState<number>(
    parseInt(sessionStorage.getItem("currentScore") || "0"),
  );

  const [maxScore, setMaxScore] = useState<number>(
    parseInt(localStorage.getItem("maxScore") || "0"),
  );

  const [settings, setSettings] = useState<{}>(
    parseInt(localStorage.getItem("settings") || "0"),
  );

  const [results, setResults] = useState<GameResult[]>(() => {
    // Загружаем результаты из localStorage, если они есть
    const savedResults = localStorage.getItem("gameResults");
    return savedResults ? JSON.parse(savedResults) : [];
  });

  const [sessionScore, setSessionScore] = useState<number>(0);

  const [mistakes, setMistakes] = useState<number>(0);

  const updateSessionStorageGamesPlayed = (gamesPlayed: number) => {
    sessionStorage.setItem("gamesPlayed", gamesPlayed.toString());
  };

  const updateSessionStorageCurrentScore = (currentScore: number) => {
    sessionStorage.setItem("currentScore", currentScore.toString());
  };

  const updateLocalStorageMaxScore = (maxScore: number) => {
    localStorage.setItem("maxScore", maxScore.toString());
  };

  const updateLocalStorageSettings = (settings: {}) => {
    // localStorage.clear(); // Очистка стор для разработки !!!
    // sessionStorage.clear(); // Очистка стор для разработки !!!
    localStorage.setItem("settingsGame", JSON.stringify(settings));
  };

  // Функция добавления нового результата
  const addResult = (result: GameResult) => {
    const updatedResults = [result, ...results];
    setResults(updatedResults);
    localStorage.setItem("gameResults", JSON.stringify(updatedResults));
  };

  // Загрузка настроек из sessionStorage при загрузке приложения
  useEffect(() => {
    const savedSettings = sessionStorage.getItem("gameSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

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

        currentScore,
        setCurrentScore: (score) => {
          setCurrentScore(score);
          updateSessionStorageCurrentScore(score);
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

        results,
        addResult,
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
