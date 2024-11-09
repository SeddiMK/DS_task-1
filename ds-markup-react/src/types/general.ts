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
  name: string;
  nameSpriteSrc: string;
  width?: number;
  height?: number;
  className?: string;
  bgColorIcon?: string;
}