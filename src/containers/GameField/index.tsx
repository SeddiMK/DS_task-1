import React, { useEffect, useState } from "react";
import { useGameContext } from "@/context/GameContext";
import { useTimer } from "@/hooks/useTimer";
import { generateCards, shuffleCards } from "@/utils/generateCards";
import IconAlarm from "@public/assets/images/cards/alarm.svg";
import IconAlert from "@public/assets/images/cards/alert.svg";
import IconCalendar from "@public/assets/images/cards/calendar.svg";
import IconCrown from "@public/assets/images/cards/crown.svg";
import IconBack from "@public/assets/images/cards/back.svg";
import { Card, GameResult, Settings } from "@/types/general";
import { handleCardFlip } from "@/utils/handleCardFlip3333";
import { Timer } from "@/containers/Timer";
import { Link } from "react-router-dom";
import { CardsGenerate } from "../CardsGenerate";
import { fetchCards } from "@/utils/fetchCards3333";
import { cardArrayConvert } from "@/utils/cardArrayConvert";
import { imagesUrl } from "@/store/db";
import { Loading } from "@/components/Loading";
import { GameResultModal } from "../GameResultModal";
import { calculateDifficulty } from "@/utils/calculateDifficulty";
import { calculateScore } from "@/utils/calculateScore";

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
  // { src: IconAlarm, matched: false, flipped: 0 },
  // { src: IconAlert, matched: false, flipped: 0 },
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
  const [stopTime, setStopTime] = useState(false);
  const [resetTime, setResetTime] = useState(false);
  const [scoreСomplexity, setScoreСomplexity] = useState(5);
  const [zeroTime, setZeroTime] = useState(false);

  // ---------------------------------------------
  const {
    mistakes,
    setMistakes,

    sessionScore,
    setSessionScore,

    maxScore,
    setMaxScore,

    gamesPlayed,
    setGamesPlayed,

    addResult,
  } = useGameContext();

  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isGame, setIsGame] = useState(0);
  const [isGameOver, setIsGameOver] = useState(0);
  const [isGameWinner, setIsGameWinner] = useState(0);
  const [allCardsOpen, setAllCardsOpen] = useState(false);
  const [fetchedCards, setFetchedCards] = useState([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // ---------------------------------------------
  const [duration, setDuration] = useState(0);
  const [errorsGame, setErrorsGame] = useState(0);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [isGameFall, setIsGameFall] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeInTimer, setTimeInTimer] = useState(0);
  // ---------------------------------------------

  // Получаем настройки из localStorage при первом рендере
  useEffect(() => {
    const savedSettings = localStorage.getItem("settingsGame");

    if (savedSettings) {
      const parsedSettings: Settings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
    }
  }, []);

  // Кладем карточки из db в state
  useEffect(() => {
    setCards(imagesUrl);

    // const loadCards = async () => {
    //   try {
    //     const fetchedCards = await fetchCards();
    //     if (fetchedCards) {
    //       setCards(fetchedCards); // -------------------------------- загрузка cards !!!
    //     }
    //     setLoading(false);
    //   } catch (err) {
    //     // setError("Не удалось загрузить карты");
    //     console.error("Не удалось загрузить карты");
    //     setLoading(false);
    //   }
    // };

    // loadCards();
  }, []);

  // Применяем настройки к картам
  useEffect(() => {
    // console.log(cards, "cards in //");
    // console.log(settings, "settings in //");

    // Чтобы при первом рендере не было ошибки
    if (settings && cards) {
      if (settings && cards) {
        const totalCardsDuble: number = (settings.rows * settings.cols) / 2;

        const convertedCards = cardArrayConvert(
          cards.slice(0, totalCardsDuble),
        );

        setFetchedCards(shuffleCards(convertedCards));
      } else {
        setError("Не удалось загрузить карты");
        console.error("Не удалось загрузить карты");
      }
    }
  }, [settings, cards]);

  // Открыли карточку -----------------------------------------------------------
  const handleChoice = (card: any) => {
    // console.log(card, "card ------ handleChoice ");

    card.flipped += 1;
    setStartTime(true);
    setResetTime(false);

    if (card.matched === false && !disabled) {
      if (choiceOne !== null && choiceOne !== card) {
        setChoiceTwo(card);
      } else {
        setChoiceOne(card);
      }
    }

    // choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Карточкам ставим matched при совпадении
  const matchedCards = (prevCards: Card[]) => {
    return prevCards.map((card: Card) => {
      if (card.src === choiceOne.src) {
        return { ...card, matched: true };
      } else {
        return card;
      }
    });
  };

  // Карточкам убираем matched при совпадении
  const notMatchedCards = (cards: Card[]) => {
    return cards.map((card: Card) => {
      if (card.matched) {
        card.matched = false;
        card.flipped = 0;

        return;
      } else {
        return card;
      }
    });
  };

  // Открыли 2 карточки, проверка совпадений ------------------------------------
  useEffect(() => {
    // console.log(choiceOne, "------choiceOne", choiceTwo, "-------choiceTwo");

    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setFetchedCards(matchedCards);

        resetTurn();
      } else {
        if (sessionScore > scoreСomplexity) {
        }
        setSessionScore(sessionScore - scoreСomplexity);
        setMistakes(mistakes + 1);
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Сброс -----------------------------------------------------------------------
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prefTurns) => prefTurns + 1);
    setDisabled(false);
  };

  // Новая игра Сброс ------------------------------------------------------------
  const handleNewGame = () => {
    // !!!
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setDisabled(false);

    notMatchedCards(fetchedCards);

    setSessionScore(0);
    setMistakes(0);

    setAllCardsOpen(false);
    setStartTime(false);
    setStopTime(false);
    setResetTime(true);

    setFetchedCards(shuffleCards(fetchedCards)); // Перемешиваем карты
  };

  // Проверка. Узнаем что время вышло = 0s
  const zeroTimeFunc = (flag: boolean) => {
    setZeroTime(flag);
  };

  // Проверка. Все выбранные карточки с matched = true
  const allMatchedCards = () => {
    return fetchedCards.filter((card) => card.matched).length;
  };

  // Все карточки открыты ???
  // const allCardsOpenFunc = () => {
  //   if (
  //     startTime &&
  //     cards.filter((card) => card.matched).length === cards.length
  //   ) {
  //     setAllCardsOpen(true);
  //   }
  // };

  // Сохраняем продолжительность игры и ошибки
  useEffect(() => {
    setDuration(timeInTimer);
    setErrorsGame(mistakes);
    if (settings && allCardsOpen) {
      setSessionScore(
        calculateScore(
          timeInTimer,
          errorsGame,
          settings.rows,
          settings.cols,
          settings.timeLimit,
        ),
      );
    }
  }, [timeInTimer, mistakes, allMatchedCards(), allCardsOpen]);

  // Проверка. Все карточки открыты
  useEffect(() => {
    // console.log(
    //   allMatchedCards(),
    //   fetchedCards.length,
    //   "allMatchedCards() === fetchedCards.length",
    // );

    if (startTime && !zeroTime && allMatchedCards() === fetchedCards.length) {
      setIsSuccess(true);
      setAllCardsOpen(true);
    }
  }, [startTime, allCardsOpen, allMatchedCards(), zeroTime, cards]);

  // Подсчет выигрышных партий и отправка в Local Session store --------------------
  const winningGame = () => {
    if (startTime) {
      if (allCardsOpen && !zeroTime) {
        if (allMatchedCards() === fetchedCards.length) {
          setIsGame(isGame + 1);
          setIsGameWinner(isGameWinner + 1);
        }

        setStopTime(true);

        console.log("--------- !!!winner!!! --------");
        return true;
      }

      if (zeroTime) {
        setIsGame(isGame + 1);
        setIsGameOver(isGameOver + 1);
        setDisabled(true);

        console.log("--------- )))game over((( --------");
        return false;
      }
    }
  };

  // winner game
  useEffect(() => {
    winningGame();
  }, [startTime, zeroTime, allCardsOpen]);

  // Отправка setGamesPlayed in sessionStorage and setMaxScore in localStore
  useEffect(() => {
    if (isGame > 0) {
      console.log(
        "--------- setGamesPlayed in sessionStorage and setMaxScore in localStore ------------",
      );
      setGamesPlayed(isGame);
      setMaxScore(isGame);
    }
  }, [isGame, isGameWinner, isGameOver, allCardsOpen, allMatchedCards()]);

  // Завершить игру --------------------

  const handleGameEnd = () => {
    // Вычисляем сложность
    const gameDifficulty = calculateDifficulty(
      settings.rows,
      settings.cols,
      settings.timeLimit,
    );
    setDifficulty(gameDifficulty);

    // Вычисляем итоговый счет
    const finalScore = calculateScore(
      duration,
      errorsGame,
      settings.rows,
      settings.cols,
      settings.timeLimit,
    );

    if (duration !== 0) setScore(finalScore);

    // Добавляем результат в контекст и localStorage
    const result: GameResult = {
      date: new Date().toISOString(),
      duration,
      errorsGame,
      difficulty: gameDifficulty,
      score: finalScore,
    };
    addResult(result);

    if (isSuccess) setIsGameFall(true);
  };

  console.log(score, "score");

  // Сохранение результата -------------------------------------------
  // Пример добавления результата
  // const result: GameResult = {
  //   date: new Date().toISOString(),
  //   duration: 45, // например, игра длилась 45 секунд
  //   errors: 1,
  //   difficulty: "medium",
  //   score: 100,
  // };
  // useEffect(() => {
  //   // Добавление результата
  //   addResult(result);
  // },[])

  // const handleCardFlip = (index: number) => {
  //   if (isGameOver || cards[index].isFlipped || cards[index].isMatched) return;

  //   const newCards = [...cards];
  //   newCards[index].isFlipped = true;
  //   setFetchedCards(newCards);

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
  //         setFetchedCards(updatedCards);
  //         setFlippedCards([]); // После проверки очищаем flippedCards
  //       }, 200);
  //     }

  //     return updatedFlippedCards; // Возвращаем обновленный массив перевернутых карт
  //   });
  // };

  // useEffect(() => {
  //   handleCardFlip(1, cards, isGameOver);
  // }, []);

  console.log(fetchedCards, "************* fetchedCards *************");

  // console.log(newCards, "newCards");
  // console.log(cards, "cards");
  // console.log(turns, "turns");
  // console.log(flippedCards, "flippedCards");

  // console.log(isGame, "isGame");
  // console.log(isGameWinner, "isGameWinner");
  // console.log(isGameOver, "isGameOver");

  // console.log(allCardsOpen, "allCardsOpen");
  // console.log(allMatchedCards(), "allMatchedCards()");
  // console.log(winningGame(), "winningGame()");

  console.log(settings, "`````settings`````");

  // Если настройки ещё не загружены
  if (!settings) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Запомни пары</h1>
      <p>Количество сыгранных игр в текущей сессии: {gamesPlayed}</p>
      <p>Счет в текущей сессии: {maxScore}</p>
      <p>Общий и счет: {gamesPlayed + maxScore} </p>
      <p>
        Количество верно открытых пар/ всего пар (процент прохождения текущей
        игры): {allMatchedCards() / 2}/{fetchedCards.length / 2} (
        {(allMatchedCards() / 2 / (fetchedCards.length / 2)) * 100}
        %)
      </p>
      <Timer
        startTime={startTime}
        stopTime={stopTime}
        resetTime={resetTime}
        setTimeInTimer={setTimeInTimer}
        zeroTime={zeroTimeFunc}
      />
      <p>Счет: {sessionScore}</p>
      <p>Количество ходов: {turns}</p>
      <p>Ошибки: {mistakes}</p>
      <button
        // onClick={() => generateCards(rows, cols, images)}
        onClick={handleNewGame}
      >
        Новая игра
      </button>
      {/* <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${card === choiceOne || card === choiceTwo || card.matched ? "flipped" : ""}`}
            // className={`card ${card.isFlipped ? "flipped" : ""}`}
            // onClick={() => handleCardFlip(index)} (card.matched ? false :
            onClick={() => handleChoice(card)}
          >
            {/* <img src={card.isFlipped ? card.image : IconBack} alt="card" /> 
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
      */}
      <div className="settings-link">
        <a href="/settings">Настройки</a>
      </div>
      <CardsGenerate
        choiceOne={choiceOne}
        choiceTwo={choiceTwo}
        cards={fetchedCards}
        handleChoice={handleChoice}
      />
      {/* ------------------------------ */}
      <button onClick={handleGameEnd}>Завершить игру</button>
      <div>
        <p>Сложность рассчитывается так:</p>
        <p>
          <span>"hard"</span> = количество карточек <span>больше</span> 36 и
          время открытия всех карточек <span>меньше</span> 30
        </p>
        <p>
          <span>"medium"</span> = количество карточек <span>больше</span> 12 и
          время открытия всех карточек <span>меньше</span> 60
        </p>
        <p>
          <span>"easy"</span> = количество карточек <span>меньше</span> 12 и
          время открытия всех карточек <span>больше</span> 60
        </p>
      </div>
      <div>
        {/* Модальное окно с результатом */}
        {isGameFall && (
          <GameResultModal
            isSuccess={isSuccess}
            score={score}
            difficulty={difficulty}
            errors={errorsGame}
            onClose={() => setIsGameFall(false)}
          />
        )}
      </div>
    </div>
  );
};
