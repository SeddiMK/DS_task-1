import React, { useEffect, useState } from "react";
import { useGameContext } from "@/context/GameContext";
import { useTimer } from "@/hooks/useTimer";
import { generateCards, shuffleCards } from "@/utils/generateCards";
import IconAlarm from "@public/assets/images/alarm.svg";
import IconAlert from "@public/assets/images/alert.svg";
import IconCalendar from "@public/assets/images/calendar.svg";
import IconCrown from "@public/assets/images/crown.svg";
import IconBack from "@public/assets/images/back.svg";
import { Card } from "@/types/general";
import { handleCardFlip } from "@/utils/handleCardFlip3333";
import { Timer } from "@/containers/Timer";
import { Link } from "react-router-dom";
// import { handleCardFlip } from "@/utils/handleCardFlip";

// const GameField: React.FC = () => {
//   const [maxScore, setMaxScore] = useLocalStorage<number>("maxScore", 0);
//   const [score, setScore] = React.useState<number>(0);

//   useEffect(() => {
//     if (score > maxScore) {
//       setMaxScore(score); // Update maxScore if the current score exceeds it
//     }
//   }, [score, maxScore, setMaxScore]);

//   return (
//     <div>
//       <h1>Memory Game</h1>
//       <p>Current Score: {score}</p>
//       <p>Max Score: {maxScore}</p>
//       <button onClick={() => setScore(score + 10)}>Increase Score</button>
//     </div>
//   );
// };

export interface Images {
  src?: string;
  id?: number;
  matched: boolean;
  flipped: number;
}

// const cardImages: Images[] = [
//   { src: "../../public/assets/images/alarm.svg" },
//   { src: "../../public/assets/images/alert.svg" },
//   { src: "../../public/assets/images/calendar.svg" },
//   { src: "../../public/assets/images/crown.svg" },
// ]; //!!!
const cardImages: Images[] = [
  { src: IconAlarm, matched: false, flipped: 0 },
  { src: IconAlert, matched: false, flipped: 0 },
  { src: IconCalendar, matched: false, flipped: 0 },
  { src: IconCrown, matched: false, flipped: 0 },
]; //!!!
// const images = [IconAlarm, IconAlert, IconCalendar, IconCrown]; //!!!

export const GameField: React.FC = () => {
  const { time, start, stop, reset } = useTimer();
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [startTime, setStartTime] = useState(false);
  const [resetTime, setResetTime] = useState(false);

  // ---------------------------------------------
  // const startTime = (time: number) => {
  //   console.log(`Таймер стартует с времени: ${time}`);
  //   // start(60);
  // };

  // const resetTime = (time: number) => {
  //   console.log(`Таймер сбрасывается на: ${time}`);
  // };
  // Перемешиваем карточки
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card: any) => {
    setStartTime(true);
    // start(60);
    // !!!
    console.log(card, "card ------ handleChoice ");
    // Эта карточка перевернулась столько раз
    card.flipped += 1;

    if (card.matched === false) {
      if (choiceOne !== null && choiceOne !== card) {
        setChoiceTwo(card);
      } else {
        setChoiceOne(card);
      }
    }

    // choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Сброс
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prefTurns) => prefTurns + 1);
    setDisabled(false);
  };

  // Открыли 2 карточки
  useEffect(() => {
    console.log(choiceOne, "------choiceOne", choiceTwo, "-------choiceTwo");

    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        console.log("choiceOne === choiceTwo");

        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Новая игра
  useEffect(() => {
    shuffleCards();
  }, []);
  // ---------------------------------------------
  // ---------------------------------------------
  const { mistakes, setMistakes, sessionScore, setSessionScore } =
    useGameContext();

  const [rows, setRows] = React.useState(4);
  const [cols, setCols] = React.useState(4);
  const [flippedCards, setFlippedCards] = React.useState([]);
  const [isGameOver, setIsGameOver] = React.useState(false);

  useEffect(() => {
    // const initialCards = generateCards(rows, cols, images);
    // setCards(initialCards);
    // start(1111160); //!!!
  }, []);

  // useEffect(() => {
  //   // if (time === 0) {
  //   //   console.log(time, "----- time === 0 -----");
  //   //   setIsGameOver(true);
  //   //   stop();
  //   // }
  //   // console.log("223256565");
  // }, [time, stop]);

  // ----------------------------------------------------------

  // const handleCardFlip = (index: number) => {
  //   if (isGameOver || cards[index].isFlipped || cards[index].isMatched) return;

  //   const newCards = [...cards];
  //   newCards[index].isFlipped = true;
  //   setCards(newCards);

  //   // Обновление flippedCards только в ответ на событие
  //   setFlippedCards((prevFlippedCards) => {
  //     const updatedFlippedCards = [...prevFlippedCards, newCards[index]];

  //     // Когда перевернуты 2 карты, проверяем совпадение
  //     if (updatedFlippedCards.length === 2) {
  //       // Нужно использовать setTimeout для асинхронной логики
  //       setTimeout(() => {
  //         const firstCard = updatedFlippedCards[0];
  //         const secondCard = updatedFlippedCards[1];
  //         const updatedCards = [...newCards]; // Это обновление для карт

  //         if (firstCard.image === secondCard.image) {
  //           console.log(
  //             firstCard.image === secondCard.image,
  //             "firstCard.image === secondCard.image",
  //           );

  //           // Обновляем состояние после того как обе карты перевернуты
  //           setSessionScore(sessionScore + 10);
  //           updatedCards[firstCard.id].isMatched = true;
  //           updatedCards[secondCard.id].isMatched = true;
  //         } else {
  //           setMistakes(mistakes + 1);
  //           updatedCards[firstCard.id].isFlipped = false;
  //           updatedCards[secondCard.id].isFlipped = false;
  //         }

  //         // Устанавливаем обновленные карты
  //         setCards(updatedCards);
  //         setFlippedCards([]); // После проверки очищаем flippedCards
  //       }, 200);
  //     }

  //     return updatedFlippedCards; // Возвращаем обновленный массив перевернутых карт
  //   });
  // };

  // useEffect(() => {
  //   handleCardFlip(1, cards, isGameOver);
  // }, []);

  // console.log(newCards, "newCards");
  console.log(cards, "cards");
  console.log(flippedCards, "flippedCards");

  return (
    <div>
      <h1>Запомни пары</h1>
      <Timer startTime={startTime} resetTime={resetTime} />
      <p>Score: {sessionScore}</p>
      <p>Mistakes: {mistakes}</p>
      <button
        // onClick={() => generateCards(rows, cols, images)}
        onClick={shuffleCards}
      >
        Новая игра
      </button>

      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
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
              alt="card"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
