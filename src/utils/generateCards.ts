import { Card, Settings } from "@/types/general";
import { useState } from "react";

// Перемешиваем карты
export const shuffleCards = (array: Card[]): Card[] => {
  let shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const generateCards = (rows: number, cols: number, images: string[]) => {
  const [settings, setSettings] = useState<Settings | null>(null);

  let totalCards = rows * cols;
  const pairs = images.slice(0, totalCards / 2);

  const cards: Card[] = [];

  //  Создаем пары карт из изображений
  pairs.forEach((image, index) => {
    cards.push({
      id: index * 2,
      image,
      isFlipped: false,
      isMatched: false,
    });
    cards.push({
      id: index * 2 + 1,
      image,
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffleCards(cards);
};
