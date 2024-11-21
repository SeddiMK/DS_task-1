import { Card } from "@/types/general";
import { useState, useEffect } from "react";
import { Images } from "../GameField";
import IconBack from "@public/assets/images/cards/back.svg";
import IconCrown from "@public/assets/images/cards/crown.svg";
import { fetchCards } from "@/utils/fetchCards3333";
import { shuffleCards } from "@/utils/generateCards";
import { cardArrayConvert } from "@/utils/cardArrayConvert";

export interface Settings {
  rows: number;
  cols: number;
  timeLimit: number;
  maxErrors: number;
  username: string;
  avatarImg: string;
}

export interface CardsGenerateProps {
  choiceOne: Card;
  choiceTwo: Card;
  cards: Card[];
  handleChoice: (card: Card) => void;
}

export const CardsGenerate: React.FC<CardsGenerateProps> = ({
  choiceOne,
  choiceTwo,
  cards,
  handleChoice,
}) => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [cardsGener, setCardsGener] = useState<Card[]>([]);
  const [fetchedCardsImgUrl, setFetchedCardsImgUrl] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log(settings, "settings in generate");
  // console.log(cards, "cards in generate");
  console.log(cards, "cards in generate");

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
