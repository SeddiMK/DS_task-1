export interface CardsGenerateProps {
  choiceOne: Card;
  choiceTwo: Card;
  cards: Card[];
  handleChoice: (card: Card) => void;
}
export interface Settings {
  rows: number;
  cols: number;
  timeLimit: number;
  maxErrors: number;
  username: string;
  avatarImg: string;
}
export interface GameSettings {
  rows: number;
  cols: number;
  timeLimit: number;
  maxErrors: number;
  username: string;
  avatarImg: string;
}
export interface GameResult {
  date: string;
  duration: number; // время прохождения игры в секундах
  errorsGame: number; // количество ошибок
  difficulty: string; // сложность (например, 'easy', 'medium', 'hard')
  score: number; // результат игры
}
export interface GameContextType {
  gamesPlayed: number;
  maxScore: number;
  sessionScore: number;
  mistakes: number;
  settings: {};
  results: GameResult[];
  addResult: (result: GameResult) => void;
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
