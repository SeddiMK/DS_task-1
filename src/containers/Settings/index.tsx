import { useGameContext } from "@/context/GameContext";
import { SettingsState } from "@/types/general";
import React, { useEffect, useState } from "react";
import "./style.css";

export const Settings: React.FC = () => {
  const [avatar, setAvatar] = useState<string>("");
  const [saveSettings, setSaveSettings] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { settings, setSettings } = useGameContext();

  // Начальные значения настроек
  const [settingsBase, setSettingsBase] = useState<SettingsState>({
    rows: 4,
    cols: 4,
    timeLimit: 60, // 60 секунд
    maxErrors: 10, // 10 ошиб
    username: "",
    avatarImg: "",
  });

  // При первом рендере задаем базовые настройки
  useEffect(() => {
    if (!settings) {
      setSettings(settingsBase);
    }
  }, []);

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
    }
  };

  // Конвертируем и отправляем в local store
  useEffect(() => {}, [avatar]);

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
    setSaveSettings(true);
    setSettings(settingsBase);
  };

  useEffect(() => {
    setSaveSettings(false);
  }, []);

  // Исчезновени попапа
  useEffect(() => {
    if (saveSettings) {
      setShowPopup(true);

      const timer = setTimeout(() => {
        setShowPopup(false);
        setSaveSettings(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [saveSettings]);

  return (
    <main className="settings">
      <div className="settings__container container">
        <h2 className="settings__title">Настройки игры</h2>

        <div className="setting__item item item-username">
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={settingsBase.username}
            onChange={handleChange}
          />
        </div>

        <div className="setting__item item item-form-avatar">
          <form
            className="setting__form form form-settings"
            method="post"
            encType="multipart/form-data"
          >
            <label className="form__lbl input-file" htmlFor="avatarImg">
              <input
                type="file"
                id="avatarImg"
                name="avatarImg"
                accept="image/*"
                onChange={handleFileChange}
              />
              <span className="form__file input-file-btn">
                Выберите файл аватара:
              </span>
              <span className="form__max-mb input-file-text">
                Максимум 10мб
              </span>{" "}
            </label>
          </form>

          {avatar && (
            <img
              src={avatar}
              alt="Avatar"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          )}
        </div>

        <div className="setting__item item item-rows">
          <label htmlFor="rows">Количество строк:</label>
          <input
            type="number"
            id="rows"
            name="rows"
            value={settingsBase.rows}
            onChange={handleNumberChange}
            min="2"
            max="6"
            step="1"
          />
        </div>

        <div className="setting__item item item-cols">
          <label htmlFor="cols">Количество колонок:</label>
          <input
            type="number"
            id="cols"
            name="cols"
            value={settingsBase.cols}
            onChange={handleNumberChange}
            min="2"
            max="6"
            step="1"
          />
        </div>

        <div className="setting__item item item-time">
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

        <div className="setting__item item item-errors">
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

        <div className="setting__item item item-save">
          <div
            className={`item-save__popup ${showPopup ? "visible" : "hidden"}`}
          >
            {saveSettings ? "Настройки сохранены" : ""}
          </div>
          <button
            className="item__btn btn btn-save"
            onClick={handleSaveSettings}
          >
            Сохранить настройки
          </button>
        </div>
        <a
          className="setting__item item item-back-main btn btn-back-main"
          href="/"
        >
          Вернуться к игре
        </a>
      </div>
    </main>
  );
};
