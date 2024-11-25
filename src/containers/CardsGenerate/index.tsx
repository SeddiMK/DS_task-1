import { CardsGenerateProps } from "@/types/general";
import { useState } from "react";
import IconBack from "@public/assets/images/cards/back-3.jpg";
import { Loading } from "@/components/Loading";

export const CardsGenerate: React.FC<CardsGenerateProps> = ({
  rows,
  cols,
  choiceOne,
  choiceTwo,
  cards,
  setErrorsHas,
  handleChoice,
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true); // неудачная загрузка картинки
    setErrorsHas(true);
  };

  const handleLoad = () => {
    setHasError(false); // картинка загрузилась успешно
  };

  // Если настройки ещё не загружены
  if (cards.length === 0) {
    return <Loading />;
  }

  return (
    <div className="game__cards cards">
      <div
        className="cards-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 80px)`,
          gridTemplateRows: `repeat(${rows}, 80px)`,
          gap: "10px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className={`cards__card card card-wrp-image ${card === choiceOne || card === choiceTwo || card.matched ? "flipped" : ""}`}
            onClick={() => handleChoice(card)}
          >
            {hasError ? (
              <p>Ошибка при загрузке изображения.</p> // Сообщение при ошибке
            ) : (
              <div className="card-inner">
                <div className="card-front">
                  <img
                    className="card__img img img-front"
                    onError={handleError} // Обработчик ошибки при загрузке
                    onLoad={handleLoad} // Обработчик успешной загрузки
                    src={IconBack}
                    alt="image card front"
                  />
                </div>
                <div className="card-back">
                  <img
                    onError={handleError} // Обработчик ошибки при загрузке
                    onLoad={handleLoad} // Обработчик успешной загрузки
                    className="card__img img img-front"
                    src={
                      card === choiceOne || card === choiceTwo || card.matched
                        ? card.src
                        : IconBack
                    }
                    alt="image card back"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
