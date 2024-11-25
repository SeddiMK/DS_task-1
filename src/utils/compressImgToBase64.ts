// Функция для сжатия и конвертации изображения в base64
export const compressImgToBase64 = (
  file: File,
  maxWidth: number,
  maxHeight: number,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    reader.onerror = (err) => reject("Ошибка при чтении файла: " + err);

    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject("Не удалось создать контекст для холста");
        return;
      }

      let width = img.width;
      let height = img.height;

      // Сжимаем изображение с учетом максимальной ширины/высоты
      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        if (width > height) {
          width = maxWidth;
          height = maxWidth / aspectRatio;
        } else {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const base64 = canvas.toDataURL("image/jpeg", 0.8); // Сжимаем до 80% качества
      resolve(base64);
    };
  });
};
