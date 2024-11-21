import { useGameContext } from "@/context/GameContext";
import { GameResult } from "@/types/general";
import { useState, useMemo } from "react";

// export interface GameResult {
//   date: string;
//   duration: number; // время прохождения игры в секундах
//   errors: number; // количество ошибок
//   difficulty: string; // сложность (например, 'easy', 'medium', 'hard')
//   score: number; // результат игры
// }

export interface SortOrder {
  key: keyof GameResult;
  order: "asc" | "desc";
}

export const GameResults: React.FC = () => {
  const { results } = useGameContext();
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    key: "date",
    order: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5; // Количество результатов на странице

  // Функция для сортировки по столбцам
  const handleSort = (key: keyof GameResult) => {
    const newOrder =
      sortOrder.key === key && sortOrder.order === "asc" ? "desc" : "asc";
    setSortOrder({ key, order: newOrder });
  };

  // Мемоизация сортированных данных
  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => {
      if (sortOrder.order === "asc") {
        return a[sortOrder.key] > b[sortOrder.key] ? 1 : -1;
      } else {
        return a[sortOrder.key] < b[sortOrder.key] ? 1 : -1;
      }
    });
  }, [results, sortOrder]);

  // Мемоизация пагинированных данных
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return sortedResults.slice(startIndex, startIndex + resultsPerPage);
  }, [currentPage, sortedResults]);

  // Общее количество страниц
  const totalPages = Math.ceil(results.length / resultsPerPage);

  return (
    <div>
      <h2>Game Results</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("date")}>Дата и время</th>
            <th onClick={() => handleSort("duration")}>
              Время прохождения (с)
            </th>
            <th onClick={() => handleSort("errorsGame")}>Ошибки</th>
            <th onClick={() => handleSort("difficulty")}>Сложность</th>
            <th onClick={() => handleSort("score")}>Счет</th>
          </tr>
        </thead>
        <tbody>
          {paginatedResults.map((result, index) => (
            <tr key={index}>
              <td>{new Date(result.date).toLocaleString()}</td>
              <td>{result.duration}</td>
              <td>{result.errorsGame}</td>
              <td>{result.difficulty}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Пагинация */}
      <div>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};
