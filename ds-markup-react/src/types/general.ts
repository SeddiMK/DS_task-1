export interface MarqueeProps {
  tickerClass: string;
  tickerText: string;
  tickerColor: string;
}

export interface MaskedImageProps {
  src: string;
  alt: string;
  maskShape?: string;
  maskSrcMiniCardAvatar?: string;
  maskType?: "circle" | "square" | "arch" | "rounded";
  className?: string;
  width?: string;
  height?: string;
}
export interface StickerImageProps {
  word: string;
  type: string;
  position: string;
}

export interface IconProps {
  name?: string;
  nameIconSrc: string;
  width?: number;
  height?: number;
  className?: string;
  fellIcon?: string;
}

export interface ImageComponentProps {
  iconUrl: string;
  className?: string;
}

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}
export interface ThemeProviderProps {
  children: React.ReactNode;
}
