import { useTimer } from "@/hooks/useTimer";
import { useEffect } from "react";

interface TimerProps {
  startTime?: boolean;
  resetTime?: boolean;
}

export const Timer: React.FC<TimerProps> = ({ startTime, resetTime }) => {
  const { time, start, stop, reset } = useTimer();

  useEffect(() => {
    if (startTime) {
      start(60);
    }
  }, [startTime]);

  return (
    <div>
      <p>Времени осталось: {time}s</p>
      <button onClick={stop}>Стоп</button>
      <button onClick={() => start(60)}>Старт</button>
      <button onClick={() => reset(60)}>Сбросить таймер</button>
    </div>
  );
};
