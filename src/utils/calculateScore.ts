// Счет
export const calculateScore = (
  duration: number,
  errors: number,
  rows: number,
  cols: number,
  timeLimit: number,
): number => {
  const totalCells = rows * cols;

  // Изначальный базовый счет, который зависит от сложности (больше ячеек - выше сложность + оставшееся время)
  let score = 0;
  if (duration !== 0) score = duration * 10 + totalCells * 5;

  if (errors > 0) {
    // Если ошибок больше, уменьшаем счет
    score -= errors * 15; // за каждую ошибку уменьшаем на 15
  }

  // За слишком медленную игру уменьшаем счет (не работает если игра заканчивается после открытия всех карт- опционально ???)
  // if (duration > timeLimit) {
  //   score -= (timeLimit - duration) * 5;
  // }

  // Ограничиваем минимальный счет
  return Math.max(score, 0);
};
