export interface GameContextType {
  gamesPlayed: number;
  maxScore: number;
  sessionScore: number;
  mistakes: number;
  setGamesPlayed: (games: number) => void;
  setMaxScore: (score: number) => void;
  setSessionScore: (score: number) => void;
  setMistakes: (mistakes: number) => void;
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
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}
