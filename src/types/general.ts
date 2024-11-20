export interface GameContextType {
  gamesPlayed: number;
  maxScore: number;
  sessionScore: number;
  mistakes: number;
  settings: object;
  setGamesPlayed: (games: number) => void;
  setMaxScore: (score: number) => void;
  setSessionScore: (score: number) => void;
  setMistakes: (mistakes: number) => void;
  setSettings: (settings: object) => void;
}

export interface IconProps {
  name?: string;
  nameIconSrc: string;
  width?: number;
  height?: number;
  className?: string;
  fellIcon?: string;
}

export interface Card {
  src?: string;
  id?: number;
  matched?: boolean;
  flipped?: number;

  image?: string;
  isFlipped?: boolean;
  isMatched?: boolean;
}
