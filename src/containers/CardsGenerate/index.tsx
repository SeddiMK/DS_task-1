import { Card, CardsGenerateProps, Settings } from "@/types/general";
import { useState } from "react";
import IconBack from "@public/assets/images/cards/back.svg";
import { Loading } from "@/components/Loading";
import { GameImageUpload } from "../GameImageUpload";

export const CardsGenerate: React.FC<CardsGenerateProps> = ({
  choiceOne,
  choiceTwo,
  cards,
  setErrorsHas,
  handleChoice,
}) => {
  // const [settings, setSettings] = useState<Settings | null>(null);
  // const [cardsGener, setCardsGener] = useState<Card[]>([]);
  // const [fetchedCardsImgUrl, setFetchedCardsImgUrl] = useState([]);
  // const [loading, setLoading] = useState(false);

  const [imageBase64, setImageBase64] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true); // неудачная загрузка картинки
    setErrorsHas(true);
  };

  const handleLoad = () => {
    setHasError(false); // картинка загрузилась успешно
  };

  // console.log(settings, "settings in generate");
  // console.log(cards, "cards in generate");

  // Если настройки ещё не загружены
  if (cards.length === 0) {
    return <Loading />;
  }
  // imageBase64;
  return (
    <div className="game__cards cards">
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`cards__card card card-wrp-image ${card === choiceOne || card === choiceTwo || card.matched ? "flipped" : ""}`}
            // className={`card ${card.isFlipped ? "flipped" : ""}`}
            // onClick={() => handleCardFlip(index)} (card.matched ? false :

            onClick={() => handleChoice(card)}
          >
            {/* <img src={card.isFlipped ? card.image : IconBack} alt="card" /> */}

            {/* {hasError ? (
            <p>Ошибка при загрузке изображения.</p> // Сообщение при ошибке
          ) : ( */}
            <img
              onError={handleError} // Обработчик ошибки при загрузке
              onLoad={handleLoad} // Обработчик успешной загрузки
              src={
                card === choiceOne || card === choiceTwo || card.matched
                  ? card.src
                  : IconBack
              }
              alt="card__img"
            />
            {/* )} */}
          </div>
        ))}
      </div>
    </div>
  );
};
