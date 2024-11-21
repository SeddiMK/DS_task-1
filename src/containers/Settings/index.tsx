import { useGameContext } from "@/context/GameContext";
import React, { useState } from "react";

export interface SettingsState {
  rows: number;
  cols: number;
  timeLimit: number;
  maxErrors: number;
  username: string;
  avatarImg: string;
}

export const Settings: React.FC = () => {
  const [avatar, setAvatar] = useState<string>("");

  const {
    mistakes,
    setMistakes,
    sessionScore,
    setSessionScore,

    maxScore,
    setMaxScore,
    gamesPlayed,
    setGamesPlayed,

    settings,
    setSettings,
  } = useGameContext();

  // Начальные значения настроек
  const [settingsBase, setSettingsBase] = useState<SettingsState>({
    rows: 4,
    cols: 4,
    timeLimit: 60, // 60 секунд
    maxErrors: 3, // 3 ошибки
    username: "",
    avatarImg: "",
  });

  // Обработчик изменений настроек
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettingsBase((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  // Обработчик загрузки изображения аватара
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Получаем первый выбранный файл

    if (file) {
      const fileUrl = URL.createObjectURL(file);

      setAvatar(fileUrl);
      // settingsBase.avatarImg = fileUrl;
    }
  };

  // Обработчик ввода числовых значений
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettingsBase((prevSettings) => ({
      ...prevSettings,
      [name]: parseInt(value),
    }));
  };

  // Обработчик изменения числовых значений (например, для строк и колонок)
  const handleSaveSettings = () => {
    console.log(settingsBase);
    setSettings(settingsBase);
  };

  // !!!
  // // Чтение объекта из localStorage
  // const savedSettings = localStorage.getItem("gameSettings");

  // if (savedSettings) {
  //   const parsedSettings = JSON.parse(savedSettings);
  //   console.log(parsedSettings); // объект с сохраненными настройками
  // }

  // console.log(settingsBase.avatarImg, "settingsBase.avatarImg");
  // console.log(avatar, "avatar");

  return (
    <div className="settings-container">
      <h2>Настройки игры</h2>

      <div className="setting-item">
        <label htmlFor="username">Имя пользователя:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={settingsBase.username}
          onChange={handleChange}
        />
      </div>

      <div className="setting-item">
        <label htmlFor="avatarImg">Аватар:</label>
        <input
          type="file"
          id="avatarImg"
          name="avatarImg"
          accept="image/*"
          onChange={handleFileChange}
        />

        {avatar && (
          <img
            src={avatar}
            alt="Avatar"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        )}
      </div>

      <div className="setting-item">
        <label htmlFor="rows">Количество строк:</label>
        <input
          type="number"
          id="rows"
          name="rows"
          value={settingsBase.rows}
          onChange={handleNumberChange}
          min="2"
        />
      </div>

      <div className="setting-item">
        <label htmlFor="cols">Количество колонок:</label>
        <input
          type="number"
          id="cols"
          name="cols"
          value={settingsBase.cols}
          onChange={handleNumberChange}
          min="2"
        />
      </div>

      <div className="setting-item">
        <label htmlFor="timeLimit">Время на разгадывание (сек):</label>
        <input
          type="number"
          id="timeLimit"
          name="timeLimit"
          value={settingsBase.timeLimit}
          onChange={handleNumberChange}
          min="10"
        />
      </div>

      <div className="setting-item">
        <label htmlFor="maxErrors">Максимальное количество ошибок:</label>
        <input
          type="number"
          id="maxErrors"
          name="maxErrors"
          value={settingsBase.maxErrors}
          onChange={handleNumberChange}
          min="0"
        />
      </div>

      <div className="setting-item">
        <button onClick={handleSaveSettings}>Сохранить настройки</button>
      </div>
      <a href="/">Вернуться в игру</a>
    </div>
  );
};
