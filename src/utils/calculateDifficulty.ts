// Сложность вычисление
export const calculateDifficulty = (
  rows: number,
  cols: number,
  timeInGame: number,
): string => {
  const totalCells = rows * cols;

  if (totalCells > 36 && timeInGame < 30) {
    return "hard";
  } else if (totalCells > 16 && timeInGame < 60) {
    return "medium";
  } else {
    return "easy";
  }
};
