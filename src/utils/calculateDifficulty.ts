// Сложность вычисление
export const calculateDifficulty = (
  rows: number,
  cols: number,
  timeLimit: number,
): string => {
  const totalCells = rows * cols;

  if (totalCells > 36 || timeLimit < 30) {
    return "hard";
  } else if (totalCells > 12 || timeLimit < 60) {
    return "medium";
  } else {
    return "easy";
  }
};
