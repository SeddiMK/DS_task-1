import { compressImgToBase64 } from "@/utils/compressImgToBase64";
import React, { useState } from "react";

export interface GameImageUploadProps {
  setImageBase64: (base64: string[]) => void;
}

export const GameImageUpload: React.FC<GameImageUploadProps> = ({
  setImageBase64,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loadImg, setLoadImg] = useState("");

  // // Функция для сжатия и конвертации изображения в base64
  // const compressImageToBase64 = (
  //   file: File,
  //   maxWidth: number,
  //   maxHeight: number,
  // ): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       img.src = reader.result as string;
  //     };

  //     reader.onerror = (err) => reject("Ошибка при чтении файла: " + err);

  //     reader.readAsDataURL(file);

  //     img.onload = () => {
  //       const canvas = document.createElement("canvas");
  //       const ctx = canvas.getContext("2d");

  //       if (!ctx) {
  //         reject("Не удалось создать контекст для холста");
  //         return;
  //       }

  //       let width = img.width;
  //       let height = img.height;

  //       // Сжимаем изображение с учетом максимальной ширины/высоты
  //       if (width > maxWidth || height > maxHeight) {
  //         const aspectRatio = width / height;
  //         if (width > height) {
  //           width = maxWidth;
  //           height = maxWidth / aspectRatio;
  //         } else {
  //           height = maxHeight;
  //           width = maxHeight * aspectRatio;
  //         }
  //       }

  //       canvas.width = width;
  //       canvas.height = height;

  //       ctx.drawImage(img, 0, 0, width, height);

  //       const base64 = canvas.toDataURL("image/jpeg", 0.8); // Сжимаем до 80% качества
  //       resolve(base64);
  //     };
  //   });
  // };

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
        const base64 = await compressImgToBase64(file, 300, 300);

        // Проверяем, есть ли уже это изображение в Set
        if (imageSet.has(base64)) {
          console.log("Это изображение уже было загружено.");
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

    setLoadImg(
      `Изображения успешно загружены - ${newUploadedImages.length}шт!`,
    );
    console.log("Изображения успешно загружены!");
  };

  return (
    <div className="my-cards__wrp">
      <input
        className="my-cards__inp"
        type="file"
        accept="image/*"
        multiple // Разрешаем загрузку нескольких файлов
        onChange={handleFileChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="my-cards__wrp-images">
        <div className="my-cards__title-wrp">
          <h3 className="my-cards__title">Загруженные изображения</h3>
          <p className="my-cards__text">
            Можно загрузить не более 18 изображений.
          </p>
          <p className="my-cards__text">{loadImg}</p>
        </div>

        <div
          className="my-cards__wrp-images"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {uploadedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Загруженная карточка ${index + 1}`}
              className="my-cards__img"
              style={{ width: "50px", height: "50px", margin: "5px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
