import { Card } from "@/types/general";

// Перемешиваем карты
export const shuffleCards = (array: Card[]): Card[] => {
  let shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // const shuffled = [...array]
  //   .sort(() => Math.random() - 0.5)
  //   .map((card) => ({ ...card, id: Math.random() }));

  // return shuffled;
  return shuffled;
};

export const generateCards = (rows: number, cols: number, images: string[]) => {
  let totalCards = rows * cols;
  const pairs = images.slice(0, totalCards / 2);

  console.log(pairs, "pairs+++++++generateCards");

  const cards: Card[] = [];

  // Шаг 1: Создаем пары карт из изображений
  // const pairs = images.slice(0, images.length / 2); // Получаем только половину для пар

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
  // console.log(cards, "cards+++++++generateCards");

  return shuffleCards(cards);
};
