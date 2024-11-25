import { useGameContext } from "@/context/GameContext";
import { GameResult } from "@/types/general";
import { useState, useMemo } from "react";
import "./style.css";

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
  const [searchQuery, setSearchQuery] = useState("");
  const resultsPerPage = 5; // Количество результатов на странице

  // Функция для сортировки по столбцам
  const handleSort = (key: keyof GameResult) => {
    const newOrder =
      sortOrder.key === key && sortOrder.order === "asc" ? "desc" : "asc";
    setSortOrder({ key, order: newOrder });
  };

  // Фильтрация данных по запросу
  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      const searchText = searchQuery.toLowerCase();
      return (
        result.date.toLowerCase().includes(searchText) ||
        result.duration.toString().includes(searchText) ||
        result.errorsGame.toString().includes(searchText) ||
        result.difficulty.toLowerCase().includes(searchText) ||
        result.score.toString().includes(searchText)
      );
    });
  }, [results, searchQuery]);

  // Мемоизация сортированных данных
  const sortedResults = useMemo(() => {
    return [...filteredResults].sort((a, b) => {
      if (sortOrder.order === "asc") {
        return a[sortOrder.key] > b[sortOrder.key] ? 1 : -1;
      } else {
        return a[sortOrder.key] < b[sortOrder.key] ? 1 : -1;
      }
    });
  }, [filteredResults, sortOrder]);

  // Мемоизация пагинированных данных
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return sortedResults.slice(startIndex, startIndex + resultsPerPage);
  }, [currentPage, sortedResults]);

  // Общее количество страниц
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

  return (
    <main className="results">
      <div className="results__container container">
        <h2 className="results__title">Результаты игры</h2>

        {/* Поле для поиска */}
        <div className="results__search">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по всем колонкам..."
            className="results__search-input"
          />
        </div>

        <table className="results__table">
          <thead className="results__row">
            <tr>
              <th
                className={`sort-head date-time ${sortOrder.order}`}
                onClick={() => handleSort("date")}
              >
                Дата и время
              </th>
              <th
                className={`sort-head passage-time ${sortOrder.order}`}
                onClick={() => handleSort("duration")}
              >
                Время прохождения (с)
              </th>
              <th
                className={`sort-head errors ${sortOrder.order}`}
                onClick={() => handleSort("errorsGame")}
              >
                Ошибки
              </th>
              <th
                className={`sort-head difficulty ${sortOrder.order}`}
                onClick={() => handleSort("difficulty")}
              >
                Сложность
              </th>
              <th
                className={`sort-head score-sort ${sortOrder.order}`}
                onClick={() => handleSort("score")}
              >
                Счет
              </th>
            </tr>
          </thead>
          <tbody className="results__body">
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
        <div className="results__pagination pagination">
          <button
            className="pagination__btn btn btn-pagination btn-prev"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </button>
          <span className="pagination__pages page-span">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination__btn btn btn-pagination btn-next"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
        <a
          className="setting__item item item-back-main btn btn-back-main"
          href="/"
        >
          Вернуться к игре
        </a>
      </div>
    </main>
  );
};
