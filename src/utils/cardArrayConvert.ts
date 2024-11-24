// Преобразуем карты в нужный формат
export const cardArrayConvert = (data: any) => {
  return data
    .concat(data) // Дублируем массив для пар
    .map((item: string[], index: number) => ({
      id: index,
      src: item,
      matched: false,
      flipped: 0,
    }));
};
