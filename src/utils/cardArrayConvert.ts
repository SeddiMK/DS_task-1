// [
// 	{ id: 1, imageUrl: 'image1.jpg' },
// 	{ id: 2, imageUrl: 'image2.jpg' },
// 	{ id: 3, imageUrl: 'image3.jpg' },
// 	{ id: 4, imageUrl: 'image4.jpg' },
// 	{ id: 5, imageUrl: 'image5.jpg' },
// 	{ id: 6, imageUrl: 'image6.jpg' }
// ]

// { id: number; imageUrl: string  взять из API images }

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
