// Функция для получения изображений с учетом выбранного источника
export const fetchCards = async (imageStyle: string): Promise<string[]> => {
  try {
    const imageUrls: string[] = [];

    // Добавляем 18-max поле 36??(Оптимизация: сделать по выбору(6 карточек-поле 12) для быстрой загрузки) изображений в зависимости от выбранного источника
    for (let i = 0; i < 18; i++) {
      if (imageStyle === "brazil") {
        imageUrls.push(
          `https://loremflickr.com/200/200/brazil,rio?random=${Math.round(Math.random() * 100)}`,
        );
      } else if (imageStyle === "dylan") {
        imageUrls.push(
          `https://api.dicebear.com/9.x/dylan/svg?seed=${Math.random()}`,
        );
      } else if (imageStyle === "icons") {
        imageUrls.push(
          `https://api.dicebear.com/9.x/icons/svg?seed=${Math.random()}`,
        );
      } else if (imageStyle === "personas") {
        imageUrls.push(
          `https://api.dicebear.com/9.x/personas/svg?seed=${Math.random()}`,
        );
      } else if (imageStyle === "pixel-art") {
        imageUrls.push(
          `https://api.dicebear.com/9.x/pixel-art/svg?seed=${Math.random()}`,
        );
      }
    }

    return imageUrls;
  } catch (error) {
    console.error("Ошибка при загрузке карт:", error);
    return [];
  }
};
