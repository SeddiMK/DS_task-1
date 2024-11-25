import React, { useEffect, useState } from "react";
import { useGameContext } from "@/context/GameContext";
import { useTimer } from "@/hooks/useTimer";
import { shuffleCards } from "@/utils/generateCards";
import { Card, GameResult, Settings, SettingsState } from "@/types/general";
import { Timer } from "@/containers/Timer";
import { CardsGenerate } from "@/containers/CardsGenerate";
import { fetchCards } from "@/utils/fetchCards";
import { cardArrayConvert } from "@/utils/cardArrayConvert";
import { Loading } from "@/components/Loading";
import { GameResultModal } from "@/containers/GameResultModal";
import { calculateDifficulty } from "@/utils/calculateDifficulty";
import { calculateScore } from "@/utils/calculateScore";
import { loadImagesFromLocalStorage } from "@/utils/loadImgFromLocalStore";
import { GameImageUpload } from "@/containers/GameImageUpload";
import { bgImgUrlFetch } from "@/utils/bgImgUrlFetch";
import BgMainImg from "@public/assets/images/bg/dylan_3.jpg";
import "./style.css";

export const GameField: React.FC = () => {
  const [bgMain, setBgMain] = useState<string>(`url(${BgMainImg})`);

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [startTime, setStartTime] = useState(false);
  const [stopTime, setStopTime] = useState(false);
  const [resetTime, setResetTime] = useState(false);
  // const [scoreСomplexity, setScoreСomplexity] = useState(5);
  const [zeroTime, setZeroTime] = useState(false);

  // --------- context data ------------------------------------
  const {
    mistakes,
    setMistakes,

    sessionScore,
    setSessionScore,

    maxScore,
    setMaxScore,

    gamesPlayed,
    setGamesPlayed,

    currentScore,
    setCurrentScore,

    results,
    addResult,
  } = useGameContext();

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
  const [errorsHas, setErrorsHas] = useState(false);
  const [imageBase64, setImageBase64] = useState<string[]>([]);
  const [errorLocalStoreImages, setErrorLocalStoreImages] = useState(false);
  const [styleImage, setStyleImage] = useState<string>("dylan"); // Стиль по умолчанию
  const [errorTime, setErrorTime] = useState(true); // Стиль по умолчанию
  const [errorNum, setErrorNum] = useState(true); // Стиль по умолчанию

  const [settingsBase, setSettingsBase] = useState<SettingsState>({
    rows: 4,
    cols: 4,
    timeLimit: 60, // 60 секунд
    maxErrors: 3, // 3 ошибки
    username: "",
    avatarImg: "",
  });
  // При первом рендере задаем базовые настройки если их нет в local store ----

  // Получаем настройки из localStorage при первом рендере
  useEffect(() => {
    const savedSettings = localStorage.getItem("settingsGame");

    if (savedSettings) {
      const parsedSettings: Settings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
    } else {
      setSettings(settingsBase);
    }
  }, []);

  // Загрузка изображений с учетом выбранного стиля ---------------------------
  // Функция для обновления карт с выбранным стилем
  const updateCards = async (styleImg: string) => {
    const newCards = await fetchCards(styleImg);

    if (!errorLocalStoreImages) setCards(newCards);
  };

  // Функция для изменения фона -----------------------------------------------
  const changeBackground = (bgStyleName: string) => {
    setBgMain(`url(${bgImgUrlFetch(bgStyleName)})`);
  };

  useEffect(() => {
    if (styleImage) {
      document.body.style.backgroundImage = bgMain;
    }

    // Возвращаем функцию очистки, чтобы сбросить стили, когда компонент размонтируется или состояние изменится
    return () => {
      document.body.style.backgroundImage = "";
    };
  }, [styleImage]);

  // Загружаем карты при монтировании компонента и при изменении стиля --------
  useEffect(() => {
    updateCards(styleImage);
  }, [styleImage, bgMain]);

  // Функция для переключения стиля при клике на кнопку -----------------------
  const handleStyleChange = (newStyle: string) => {
    changeBackground(newStyle);
    setErrorLocalStoreImages(false);
    setStyleImage(newStyle);
  };

  // Функция для переключения стиля при клике на кнопку -----------------------
  const handleStyleChangeMyImage = (newStyle?: string) => {
    // Проверка local store. Если пустой, то ранее карточки не загружали. Выводить сообщение.
    loadImagesFromLocalStorage(setCards, setErrorLocalStoreImages);
  };

  // Применяем настройки к картам ---------------------------------------------
  useEffect(() => {
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

  // Открыли карточку ---------------------------------------------------------
  const handleChoice = (card: any) => {
    if (!errorsHas && card) {
      card.flipped += 1;
      setStartTime(true);
      setStopTime(false);
      setResetTime(false);
    }

    if (card.matched === false && !disabled) {
      if (choiceOne !== null && choiceOne !== card) {
        setChoiceTwo(card);
      } else {
        setChoiceOne(card);
      }
    }
  };

  // Карточкам ставим matched при совпадении ----------------------------------
  const matchedCards = (prevCards: Card[]) => {
    return prevCards.map((card: Card) => {
      if (card.src === choiceOne.src) {
        return { ...card, matched: true };
      } else {
        return card;
      }
    });
  };

  // Карточкам убираем matched при совпадении ---------------------------------
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

  // Открыли 2 карточки, проверка совпадений ----------------------------------
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (
        choiceOne.src !== choiceTwo.src &&
        (choiceOne.flipped > 1 || choiceTwo.flipped > 1) &&
        choiceOne.matched === false
      ) {
        setMistakes(mistakes + 1); //  Каждая повторно открытая и не разгаданная карточка уменьшает счет.
      }

      if (choiceOne.src === choiceTwo.src) {
        setFetchedCards(matchedCards);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 400);
      }
    }
  }, [choiceOne, choiceTwo, fetchedCards]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (
        choiceOne.src === choiceTwo.src &&
        choiceOne.flipped < 2 &&
        choiceOne.matched === false &&
        mistakes > 0
      ) {
        setMistakes(mistakes - 1); // Если карточку угадали, то уменьшаем ошибку
      }
    }
  }, [choiceOne, choiceTwo, mistakes]);

  // Сброс -------------------------------------========-----------------------
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prefTurns) => prefTurns + 1);
    setDisabled(false);
  };

  // Новая игра Сброс ---------------------------------------------------------
  const handleNewGame = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setDisabled(false);

    notMatchedCards(fetchedCards);

    // setSessionScore(0); //!!!
    setMistakes(0);

    setAllCardsOpen(false);

    setStartTime(false);
    setStopTime(true);
    setResetTime(true);

    setZeroTime(false);

    setIsGameFall(false); // модальное окно

    setFetchedCards(shuffleCards(fetchedCards)); // Перемешиваем карты
  };

  // Проверка. Узнаем что время вышло = 0s ------------------------------------
  const zeroTimeFunc = (flag: boolean) => {
    setZeroTime(flag);
  };

  useEffect(() => {
    if (startTime && zeroTime) zeroTimeFunc(false);
  }, [startTime, zeroTime]);

  // Проверка. Все выбранные карточки с matched = true -----------------------
  const allMatchedCards = () => {
    return fetchedCards.filter((card) => card.matched).length;
  };

  // Проверка. Все карточки открыты ------------------------------------------
  useEffect(() => {
    if (startTime && !zeroTime && allMatchedCards() === fetchedCards.length) {
      setIsSuccess(true);
      setIsGameFall(true);
      setAllCardsOpen(true);
    }
  }, [startTime, allMatchedCards(), zeroTime, cards]);

  // Вычисляем сложность -----------------------------------------------------
  const gameDifficulty = () => {
    if (settings)
      return calculateDifficulty(
        settings.rows,
        settings.cols,
        settings.timeLimit - timeInTimer,
      );
  };

  // Подсчет выигрышных партий и отправка в Local Session store --------------
  const winningGame = () => {
    if (startTime) {
      if (allCardsOpen && !zeroTime) {
        if (allMatchedCards() === fetchedCards.length) {
          setIsGame(isGame + 1);
          setIsGameWinner(isGameWinner + 1);

          setStopTime(true);
          setIsSuccess(true);
          setIsGameFall(true);
          setErrorTime(false);
          setErrorNum(false);
          setDifficulty(gameDifficulty());
        }

        // console.log("--------- !!!winner!!! --------");
        return true;
      }

      if (zeroTime) {
        setIsGame(isGame + 1);
        setIsGameOver(isGameOver + 1);
        setDisabled(true);
        setIsSuccess(false);
        setIsGameFall(true);
        setErrorTime(true);
        setErrorNum(false);
        setDifficulty(gameDifficulty());

        // console.log("--------- )))game over((( --------");
        return false;
      }
    }
  };

  // winner game -------------------------------------------------------------
  useEffect(() => {
    winningGame();
  }, [startTime, zeroTime, allCardsOpen]);

  // Отправка setGamesPlayed in sessionStorage and setMaxScore in localStore
  useEffect(() => {
    if (isGame > 0 && allCardsOpen) {
      setGamesPlayed(isGame);
    }
  }, [isGame, isGameWinner, isGameOver, isGameFall, allCardsOpen]);

  // Сохраняем продолжительность игры и ошибки -------------------------------
  useEffect(() => {
    if (settings && allCardsOpen) {
      setDuration(settings.timeLimit - timeInTimer);

      setSessionScore(
        calculateScore(
          timeInTimer, //  duration продолжительность
          mistakes,
          settings.rows,
          settings.cols,
          settings.timeLimit,
        ),
      );
    }
  }, [timeInTimer, isGameFall]);

  useEffect(() => {
    if (allCardsOpen) {
      setErrorsGame(mistakes);
      setCurrentScore(currentScore + sessionScore); // session store
    }
  }, [allCardsOpen]);

  // Открываем модальное окно если ошибо больше чем в настройках -------------
  useEffect(() => {
    if (settings) {
      if (mistakes > settings.maxErrors) {
        setDuration(settings.timeLimit - timeInTimer);
        setStopTime(true);
        setErrorsGame(mistakes);
        setIsSuccess(false);
        setIsGameFall(true);
        setErrorTime(false);
        setErrorNum(true);
      }
    }
  }, [mistakes]);

  // Завершить игру ----------------------------------------------------------
  const handleGameEnd = () => {
    setStopTime(true);
    setDisabled(true);

    if (duration !== 0) {
      // Добавляем результат в контекст и localStorage
      const result: GameResult = {
        date: new Date().toISOString(),
        duration,
        errorsGame,
        difficulty: gameDifficulty(),
        score: sessionScore,
      };

      addResult(result);
    }

    setMaxScore(maxScore + currentScore); // local store

    sessionStorage.clear(); // очистка session store по завершению игры

    handleNewGame(); // сброс
    setCurrentScore(0);

    if (isSuccess) {
      setIsGameFall(true);
      setErrorTime(false);
      setErrorNum(false);
    }
  };

  console.log(mistakes, "mistakes ---- main");
  console.log(fetchedCards, "fetchedCards ---- main");

  // Если настройки ещё не загружены -----------------------------------------
  if (!settings) {
    return <Loading />;
  }

  return (
    <main className={`game ${styleImage}`}>
      <div className="game__container container">
        <h1 className="game__title">Запомни пары</h1>
        <div className="game__score score">
          <p className="score__text games-played">
            Количество сыгранных игр в текущей сессии: {gamesPlayed}
          </p>

          <p className="score__text games-played-max-score">
            Общий счет: {currentScore}
          </p>
          <p className="score__text percent">
            Количество верно открытых пар/ всего пар (процент прохождения
            текущей игры): {allMatchedCards() / 2}/{fetchedCards.length / 2} (
            {Math.ceil(
              (allMatchedCards() / 2 / (fetchedCards.length / 2)) * 100,
            )}
            %)
          </p>

          <p className="score__text max-score">
            Счет в текущей сессии: {sessionScore}
          </p>
          <p className="score__text turns">Количество ходов: {turns}</p>
          <p className="score__text mistakes">Ошибки: {mistakes}</p>
        </div>

        <div className="game__style-cards style-cards">
          <h3 className="style-cards__title">
            Вы можете выбрать изображения карточек здесь:
          </h3>

          {/* Кнопки для переключения стилей */}
          <div className="style-cards__buttons">
            <button
              className="style-cards__btn btn btn-style-cards"
              onClick={() => handleStyleChange("brazil")}
            >
              brazil
            </button>
            <button
              className="style-cards__btn btn btn-style-cards"
              onClick={() => handleStyleChange("dylan")}
            >
              dylan
            </button>
            <button
              className="style-cards__btn btn btn-style-cards"
              onClick={() => handleStyleChange("personas")}
            >
              Personas
            </button>
            <button
              className="style-cards__btn btn btn-style-cards"
              onClick={() => handleStyleChange("icons")}
            >
              icons
            </button>
            <button
              className="style-cards__btn btn btn-style-cards"
              onClick={() => handleStyleChange("pixel-art")}
            >
              Pixel Art
            </button>
          </div>

          <div className="game__my-cards my-cards">
            <button
              className="style-cards__btn btn btn-style-cards btn-my-cards"
              onClick={() => handleStyleChangeMyImage()}
            >
              {errorLocalStoreImages
                ? "Пользовательские изображения не были загружены."
                : "Мои изображения загруженные ранее. Повторно загружать не требуется."}
            </button>

            <GameImageUpload setImageBase64={setImageBase64} />
          </div>
        </div>
        <div className="game__setting-links">
          <div className="game__setting-link-wrp settings-link">
            <a
              className="game__setting-link btn btn-settings btn-settings-link"
              href="/settings"
            >
              Настройки
            </a>
          </div>
          <div className="game__setting-link-wrp results-link">
            <a
              className="game__setting-link btn btn-settings btn-results-link"
              href="/results"
            >
              Результаты
            </a>
          </div>

          <button
            className="game__end-game  btn btn-settings"
            onClick={handleGameEnd}
          >
            Завершить игру
          </button>
          <button
            className="game__new-game btn btn-new-game btn-settings"
            onClick={handleNewGame}
          >
            Новая игра
          </button>
        </div>
        <div>
          <p>
            {settings.username ? `Имя пользователя: ${settings.username}` : ""}
          </p>
          <Timer
            startTime={startTime}
            stopTime={stopTime}
            resetTime={resetTime}
            setTimeInTimer={setTimeInTimer}
            zeroTimeFunc={zeroTimeFunc}
          />
        </div>

        {/* карточки */}
        <CardsGenerate
          rows={settings.rows}
          cols={settings.cols}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          cards={fetchedCards}
          setErrorsHas={setErrorsHas}
          handleChoice={handleChoice}
        />

        {/* Расчет сложности игры */}
        <div className="game__difficulty difficulty-section">
          <p className="difficulty-section__text">
            Каждая повторно открытая и не разгаданная карточка уменьшает счет.
          </p>
          <p className="difficulty-section__text">
            Чтобы занести данные в таблицу результаты не забудьте нажать на
            "Завершить игру".
          </p>
          <p className="difficulty-section__text">
            Сложность рассчитывается так:
          </p>
          <p className="difficulty-section__text">
            <span className="difficulty-span">"hard"</span> = количество
            карточек <span>больше</span> 36 и время открытия всех карточек{" "}
            <span>меньше</span> 30c
          </p>
          <p className="difficulty-section__text">
            <span className="difficulty-span">"medium"</span> = количество
            карточек <span>больше</span> 16 и время открытия всех карточек{" "}
            <span>меньше</span> 60c
          </p>
          <p className="difficulty-section__text">
            <span className="difficulty-span">"easy"</span> = количество
            карточек <span>меньше</span> 16 и время открытия всех карточек{" "}
            <span>больше</span> 60c
          </p>
        </div>
        {/* Модальное окно с результатом */}
        <div className="game__modal modal">
          {isGameFall && (
            <GameResultModal
              isSuccess={isSuccess}
              errorTime={errorTime}
              errorNum={errorNum}
              score={score ? score : sessionScore}
              duration={duration}
              difficulty={difficulty}
              errors={errorsGame}
              onClose={handleNewGame}
            />
          )}
        </div>
      </div>
    </main>
  );
};
