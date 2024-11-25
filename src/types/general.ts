export interface GameResultModalProps {
  isSuccess: boolean;
  errorTime?: boolean;
  errorNum?: boolean;
  score: number;
  duration: number;
  difficulty: string;
  errors?: number;
  onClose?: () => void;
}

export interface SettingsState {
  rows: number;
  cols: number;
  timeLimit: number;
  maxErrors: number;
  username: string;
  avatarImg: string;
}
export interface Images {
  src?: string;
  id?: number;
  matched: boolean;
  flipped: number;
}

export interface GameImageUploadProps {
  setImageBase64: (base64: string[]) => void;
}

export interface CardsGenerateProps {
  rows: number;
  cols: number;
  choiceOne: Card;
  choiceTwo: Card;
  cards: Card[];
  setErrorsHas?: (flag: boolean) => void;
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
  currentScore: number;
  maxScore: number;
  sessionScore: number;
  mistakes: number;
  settings: {};
  results: GameResult[];
  addResult: (result: GameResult) => void;
  setGamesPlayed: (games: number) => void;
  setCurrentScore: (score: number) => void;
  setMaxScore: (score: number) => void;
  setSessionScore: (score: number) => void;
  setMistakes: (mistakes: number) => void;
  setSettings: (settings: object) => void;
}
export interface Settings {
  rows: number;
  cols: number;
  timeLimit: number;
  maxErrors: number;
  username: string;
  avatarImg: string;
}

export type TimerState = {
  time: number;
  isRunning: boolean;
  start: (initialTime: number) => void;
  stop: () => void;
  reset: (initialTime: number) => void;
};
export interface TimerProps {
  startTime: boolean;
  resetTime?: boolean;
  stopTime?: boolean;
  setTimeInTimer: (time: number) => void;
  zeroTimeFunc?: (flag: boolean) => void;
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
