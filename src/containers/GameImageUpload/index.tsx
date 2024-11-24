import React, { useState } from "react";
import { GameImageUploadProps } from "@/types/general";
import { compressImgToBase64 } from "@/utils/compressImgToBase64";

export const GameImageUpload: React.FC<GameImageUploadProps> = ({
  setImageBase64,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loadImg, setLoadImg] = useState("");
  const [loadingImgFlag, setLoadingImgFlag] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files) return;

    setError(null); // Сбрасываем ошибки

    const newUploadedImages: string[] = [...uploadedImages]; // Копируем уже загруженные изображения

    // Преобразуем массив в Set для проверки уникальности
    const imageSet = new Set(newUploadedImages);

    for (let i = 0; i < files.length; i++) {
      if (newUploadedImages.length >= 18) {
        setError("Можно загрузить не более 18 изображений.");
        break;
      }

      const file = files[i];
      try {
        const base64 = await compressImgToBase64(file, 80, 80);

        // Проверяем, есть ли уже это изображение в Set
        if (imageSet.has(base64)) {
          // console.log("Это изображение уже было загружено.");
          continue; // Пропускаем это изображение, если оно уже есть
        }

        // Добавляем уникальное изображение в Set и массив
        imageSet.add(base64);
        newUploadedImages.push(base64);
      } catch (err) {
        console.error("Ошибка при загрузке изображения:", err);
        setError(
          "Ошибка при загрузке изображения. Пожалуйста, попробуйте снова.",
        );
        break;
      }
    }

    setUploadedImages(newUploadedImages); // Обновляем состояние с новыми изображениями
    setImageBase64(newUploadedImages); // Передаем массив base64 в родительский компонент

    // Сохраняем изображения в localStorage (можно хранить как строку JSON)
    localStorage.setItem("gameImages", JSON.stringify(newUploadedImages));

    setLoadingImgFlag(true);
    setLoadImg(
      `Изображения успешно загружены - ${newUploadedImages.length}шт!`,
    );
    // console.log("Изображения успешно загружены!");
  };

  return (
    <div className="my-cards__wrp">
      <form
        className="my-cards__form form form-my-cards"
        method="post"
        encType="multipart/form-data"
      >
        <label className="form__lbl input-file">
          <input
            id="file-load"
            name="file-load"
            className="my-cards__inp"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <span className="form__file input-file-btn">Выберите файл</span>
          <span className="form__max-mb input-file-text">Максимум 10мб</span>
        </label>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loadingImgFlag && (
        <div className="my-cards__wrp">
          <div className="my-cards__title-wrp">
            <h3 className="my-cards__title">Загруженные изображения</h3>
            <p className="my-cards__text">
              Можно загрузить не более 18 изображений.
            </p>
            <p className="my-cards__text">{loadImg}</p>
          </div>

          <div className="my-cards__wrp-images">
            {uploadedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Загруженная карточка ${index + 1}`}
                className="my-cards__img"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
