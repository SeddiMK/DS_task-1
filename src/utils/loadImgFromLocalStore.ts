// Функция для извлечения изображений из localStorage
export const loadImagesFromLocalStorage = (
  setImageBase64: any,
  setErrorLocalStoreImages?: (flag: boolean) => void,
) => {
  const storedImages = localStorage.getItem("gameImages");
  if (storedImages) {
    try {
      // Преобразуем строку JSON обратно в массив
      const imagesArray: string[] = JSON.parse(storedImages);
      return setImageBase64(imagesArray); // Обновляем состояние с изображениями
    } catch (err) {
      console.error("Ошибка при извлечении изображений из localStorage:", err);
    }
  } else {
    return setErrorLocalStoreImages(true);
  }
};
