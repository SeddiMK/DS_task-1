import { useTimer } from "@/hooks/useTimer";

interface TimerProps {
  btnStartTime: (time: number) => void;
  btnResetTime: (time: number) => void;
}

export const Timer: React.FC<TimerProps> = ({ btnStartTime, btnResetTime }) => {
  const { time, start, stop, reset } = useTimer();

  return (
    <div>
      <p>Времени осталось: {time}s</p>
      <button onClick={stop}>Стоп</button>
      <button onClick={() => start(60)}>Старт</button>
      <button onClick={() => reset(60)}>Сбросить таймер</button>
    </div>
  );
};
