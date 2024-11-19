import { Card } from "@/types/general";

export const handleCardFlip = (
  index: number,
  cards: Card[],
  isGameOver: boolean,
) => {
  const newCards = [...cards];
  let sessionScore = 0;
  let sessionMistakes = 0;

  console.log(cards, "cards----handle");

  console.log(
    isGameOver,
    cards[index].isFlipped,
    cards[index].isMatched,
    "isGameOver, cards[index].isFlipped, cards[index].isMatched",
  );

  if (isGameOver || cards[index].isFlipped || cards[index].isMatched) return;

  newCards[index].isFlipped = true;

  console.log(newCards[index], "newCards[index]");

  const updFlippedCards = (prevFlippedCards: Card[]) => {
    const updatedFlippedCards = [...prevFlippedCards, newCards[index]];

    if (updatedFlippedCards.length === 2) {
      const firstCard = updatedFlippedCards[0];
      const secondCard = updatedFlippedCards[1];

      if (firstCard.image === secondCard.image) {
        // Обновляем состояние только после проверки карт
        sessionScore += 10; // Увеличиваем счет
        newCards[firstCard.id].isMatched = true;
        newCards[secondCard.id].isMatched = true;
        // setCards(newCards);
      } else {
        sessionMistakes += 1;
        setTimeout(() => {
          newCards[firstCard.id].isFlipped = false;
          newCards[secondCard.id].isFlipped = false;
          // setCards(newCards);
        }, 1000);
      }

      // После проверки карт очищаем flippedCards
      return [];
    }

    return [updatedFlippedCards, sessionMistakes, sessionScore];
  };

  // console.log(newCards, "newCards");
  // console.log(cards, "cards");

  return updFlippedCards;
};
