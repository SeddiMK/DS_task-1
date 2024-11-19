import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Извлечь элемент из локального хранилища
  const storedValue = localStorage.getItem(key);

  // Если элемент существует в localStorage, проанализируйте его и используйте в качестве начального значения.
  // В противном случае вернитесь к исходному значению, переданному в аргументе.
  const [value, setValue] = useState<T>(() => {
    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        console.warn(`Error parsing localStorage key "${key}":`, error);
        return initialValue;
      }
    }
    return initialValue;
  });

  const setStoredValue = (newValue: T) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting value to localStorage:", error);
    }
  };

  return [value, setStoredValue] as const;
}

// const GameField: React.FC = () => {
//   const [maxScore, setMaxScore] = useLocalStorage<number>("maxScore", 0);
//   const [score, setScore] = React.useState<number>(0);

//   useEffect(() => {
//     if (score > maxScore) {
//       setMaxScore(score); // Update maxScore if the current score exceeds it
//     }
//   }, [score, maxScore, setMaxScore]);

//   return (
//     <div>
//       <h1>Memory Game</h1>
//       <p>Current Score: {score}</p>
//       <p>Max Score: {maxScore}</p>
//       <button onClick={() => setScore(score + 10)}>Increase Score</button>
//     </div>
//   );
// };

// export default GameField;
