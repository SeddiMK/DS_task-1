import { Card, CardsGenerateProps, Settings } from "@/types/general";
import { useState } from "react";
import IconBack from "@public/assets/images/cards/back.svg";

export const CardsGenerate: React.FC<CardsGenerateProps> = ({
  choiceOne,
  choiceTwo,
  cards,
  handleChoice,
}) => {
  // const [settings, setSettings] = useState<Settings | null>(null);
  // const [cardsGener, setCardsGener] = useState<Card[]>([]);
  // const [fetchedCardsImgUrl, setFetchedCardsImgUrl] = useState([]);
  // const [loading, setLoading] = useState(false);

  // console.log(settings, "settings in generate");
  // console.log(cards, "cards in generate");
  // console.log(cards, "cards in generate");

  return (
    <div className="card-grid">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${card === choiceOne || card === choiceTwo || card.matched ? "flipped" : ""}`}
          // className={`card ${card.isFlipped ? "flipped" : ""}`}
          // onClick={() => handleCardFlip(index)} (card.matched ? false :

          onClick={() => handleChoice(card)}
        >
          {/* <img src={card.isFlipped ? card.image : IconBack} alt="card" /> */}
          <img
            src={
              card === choiceOne || card === choiceTwo || card.matched
                ? card.src
                : IconBack
            }
            alt="card game"
          />
        </div>
      ))}
    </div>
  );
};
